import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Mic, MicOff, Volume2, VolumeX, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Declare global types for speech recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface VoiceControlsProps {
  onVoiceInput?: (text: string) => void;
  onSpeakText?: (text: string) => void;
  isListening?: boolean;
  onListeningChange?: (listening: boolean) => void;
  isSpeechEnabled?: boolean;
  onSpeechEnabledChange?: (enabled: boolean) => void;
}

// ElevenLabs voice options
const ELEVENLABS_VOICES = [
  { id: '9BWtsMINqrJLrRacOk9x', name: 'Aria' },
  { id: 'CwhRBWXzGAHq8TQ4Fs17', name: 'Roger' },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah' },
  { id: 'FGY2WhTYpPnrIDTdsKH5', name: 'Laura' },
  { id: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie' },
  { id: 'JBFqnCBsd6RMkjVDRZzb', name: 'George' },
  { id: 'N2lVS1w4EtoT3dr4eOWO', name: 'Callum' },
  { id: 'SAz9YHcvj6GT2YYXdXww', name: 'River' },
];

export function VoiceControls({
  onVoiceInput,
  onSpeakText,
  isListening = false,
  onListeningChange,
  isSpeechEnabled = false,
  onSpeechEnabledChange,
}: VoiceControlsProps) {
  const [recognition, setRecognition] = useState<any>(null);
  const [selectedVoice, setSelectedVoice] = useState(ELEVENLABS_VOICES[0].id);
  const [elevenLabsKey, setElevenLabsKey] = useState<string>('');
  const [showSettings, setShowSettings] = useState(false);
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognitionClass();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        
        if (event.results[event.results.length - 1].isFinal) {
          onVoiceInput?.(transcript);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        toast({
          title: "Speech Recognition Error",
          description: `Error: ${event.error}`,
          variant: "destructive",
        });
        onListeningChange?.(false);
      };

      recognitionInstance.onend = () => {
        if (isListening) {
          // Restart if we're supposed to be listening
          setTimeout(() => {
            try {
              recognitionInstance.start();
            } catch (error) {
              console.error('Error restarting recognition:', error);
            }
          }, 100);
        }
      };

      setRecognition(recognitionInstance);
    } else {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive",
      });
    }
  }, [isListening, onVoiceInput, onListeningChange, toast]);

  // Handle listening toggle
  const toggleListening = async () => {
    if (!recognition) return;

    try {
      if (isListening) {
        recognition.stop();
        onListeningChange?.(false);
      } else {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        recognition.start();
        onListeningChange?.(true);
        toast({
          title: "Voice Listening Enabled",
          description: "Obi is now listening for your voice commands.",
        });
      }
    } catch (error) {
      console.error('Error toggling speech recognition:', error);
      toast({
        title: "Microphone Access Required",
        description: "Please allow microphone access to use voice features.",
        variant: "destructive",
      });
    }
  };

  // Text-to-speech with ElevenLabs or fallback
  const speakText = async (text: string) => {
    if (!isSpeechEnabled || !text.trim()) return;

    try {
      if (elevenLabsKey) {
        // Use ElevenLabs API
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice}`, {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': elevenLabsKey,
          },
          body: JSON.stringify({
            text: text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
            },
          }),
        });

        if (response.ok) {
          const audioBlob = await response.blob();
          const audioUrl = URL.createObjectURL(audioBlob);
          
          if (audioRef.current) {
            audioRef.current.src = audioUrl;
            audioRef.current.play();
          }
        } else {
          throw new Error('ElevenLabs API call failed');
        }
      } else {
        // Fallback to Web Speech API
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error('Error with text-to-speech:', error);
      // Fallback to Web Speech API
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  // Expose speakText function to parent
  useEffect(() => {
    onSpeakText?.(speakText as any);
  }, [isSpeechEnabled, elevenLabsKey, selectedVoice, onSpeakText]);

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Voice Controls</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        {/* Voice Listening Toggle */}
        <div className="flex items-center space-x-2">
          <Button
            variant={isListening ? "default" : "outline"}
            size="sm"
            onClick={toggleListening}
            disabled={!recognition}
          >
            {isListening ? (
              <>
                <Mic className="h-4 w-4 mr-2" />
                Listening
              </>
            ) : (
              <>
                <MicOff className="h-4 w-4 mr-2" />
                Start Listening
              </>
            )}
          </Button>
        </div>

        {/* Speech Output Toggle */}
        <div className="flex items-center space-x-2">
          <Switch
            id="speech-enabled"
            checked={isSpeechEnabled}
            onCheckedChange={onSpeechEnabledChange}
          />
          <Label htmlFor="speech-enabled" className="flex items-center">
            {isSpeechEnabled ? (
              <Volume2 className="h-4 w-4 mr-1" />
            ) : (
              <VolumeX className="h-4 w-4 mr-1" />
            )}
            Obi Speech
          </Label>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="space-y-3 pt-3 border-t">
          <div className="space-y-2">
            <Label htmlFor="elevenlabs-key">ElevenLabs API Key (Optional)</Label>
            <input
              id="elevenlabs-key"
              type="password"
              placeholder="Enter your ElevenLabs API key for better voice quality"
              value={elevenLabsKey}
              onChange={(e) => setElevenLabsKey(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>

          {elevenLabsKey && (
            <div className="space-y-2">
              <Label htmlFor="voice-select">Voice</Label>
              <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a voice" />
                </SelectTrigger>
                <SelectContent>
                  {ELEVENLABS_VOICES.map((voice) => (
                    <SelectItem key={voice.id} value={voice.id}>
                      {voice.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      )}

      {/* Hidden audio element for ElevenLabs playback */}
      <audio ref={audioRef} style={{ display: 'none' }} />
    </Card>
  );
}