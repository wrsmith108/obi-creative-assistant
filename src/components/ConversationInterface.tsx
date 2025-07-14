import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Loader2, 
  Sparkles, 
  User, 
  CheckCircle, 
  Clock,
  AlertCircle,
  Zap
} from 'lucide-react';
import { UserPersona } from './FlariModal';
import { getPersonaContext, generateFireflyResponse, FireflyWorkflow } from '../lib/firefly-simulation';

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  workflow?: FireflyWorkflow;
  metadata?: {
    apiEndpoint?: string;
    estimatedTime?: string;
    status?: 'processing' | 'completed' | 'error';
  };
}

interface ConversationInterfaceProps {
  persona: UserPersona;
  onWorkflowStart: (workflow: string) => void;
  brandContext: any;
}

export function ConversationInterface({ 
  persona, 
  onWorkflowStart, 
  brandContext 
}: ConversationInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: getPersonaContext(persona).welcomeMessage,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const response = generateFireflyResponse(input, persona, brandContext);
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: response.message,
      timestamp: new Date(),
      workflow: response.workflow,
      metadata: response.metadata
    };

    setMessages(prev => [...prev, assistantMessage]);
    
    if (response.workflow) {
      onWorkflowStart(response.workflow.name);
    }
    
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = getPersonaContext(persona).quickActions;

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.type === 'assistant' && (
                <div className="p-2 rounded-xl bg-gradient-primary shadow-glow shrink-0">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              
              <div
                className={`max-w-2xl p-4 rounded-xl ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground ml-12'
                    : 'bg-card border border-border/50 mr-12'
                }`}
              >
                <div className="prose prose-sm max-w-none text-inherit">
                  {message.content}
                </div>
                
                {message.workflow && (
                  <div className="mt-3 p-3 rounded-lg bg-muted/50 border border-border/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <span className="font-medium text-sm">Firefly Workflow</span>
                      <Badge variant="secondary" className="text-xs">
                        {message.workflow.type}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">API Endpoint:</span>
                        <code className="text-primary text-xs">{message.workflow.api_endpoint}</code>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Estimated Time:</span>
                        <span className="text-foreground">{message.workflow.estimated_time}</span>
                      </div>
                      {message.workflow.status && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <div className="flex items-center gap-1">
                            {message.workflow.status === 'processing' && <Loader2 className="h-3 w-3 animate-spin" />}
                            {message.workflow.status === 'completed' && <CheckCircle className="h-3 w-3 text-creative-success" />}
                            {message.workflow.status === 'error' && <AlertCircle className="h-3 w-3 text-destructive" />}
                            <span className="text-xs capitalize">{message.workflow.status}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
              
              {message.type === 'user' && (
                <div className="p-2 rounded-xl bg-muted border border-border/50 shrink-0">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3">
              <div className="p-2 rounded-xl bg-gradient-primary shadow-glow shrink-0">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="bg-card border border-border/50 p-4 rounded-xl mr-12">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing your request...
                </div>
              </div>
            </div>
          )}
          
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Quick Actions */}
      <div className="p-4 border-t border-border/30">
        <div className="flex gap-2 mb-3 flex-wrap">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs h-7"
              onClick={() => setInput(action)}
            >
              {action}
            </Button>
          ))}
        </div>

        {/* Input Area */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Ask Flari about ${getPersonaContext(persona).focusArea}...`}
            className="flex-1 bg-muted/50 border-border/50"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="bg-gradient-primary hover:opacity-90 shadow-glow"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}