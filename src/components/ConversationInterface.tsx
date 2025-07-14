import { useState, useRef, useEffect } from 'react';
import { 
  Button, 
  TextField, 
  View, 
  Flex, 
  Text, 
  StatusLight,
  ActionButton,
  ButtonGroup
} from '@adobe/react-spectrum';
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
import { UserPersona } from './ObiModal';
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
    <Flex direction="column" height="100%">
      <View flex={1} padding="size-200" UNSAFE_style={{ overflowY: 'auto' }}>
        <Flex direction="column" gap="size-300">
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
                      <StatusLight variant="neutral">
                        {message.workflow.type}
                      </StatusLight>
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
        </Flex>
      </View>

      {/* Quick Actions */}
      <View padding="size-200" UNSAFE_className="border-t border-border/30">
        <Flex gap="size-100" marginBottom="size-150" wrap>
          {quickActions.map((action, index) => (
            <ActionButton
              key={index}
              onPress={() => setInput(action)}
              UNSAFE_className="text-xs"
            >
              {action}
            </ActionButton>
          ))}
        </Flex>

        {/* Input Area */}
        <Flex gap="size-150">
          <TextField
            value={input}
            onChange={setInput}
            onKeyDown={handleKeyPress}
            placeholder={`Ask Obi about ${getPersonaContext(persona).focusArea}...`}
            flex={1}
            isDisabled={isLoading}
            UNSAFE_className="bg-muted/50 border-border/50"
          />
          <Button 
            onPress={handleSendMessage}
            isDisabled={!input.trim() || isLoading}
            variant="accent"
            UNSAFE_className="bg-gradient-primary hover:opacity-90 shadow-glow"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </Flex>
      </View>
    </Flex>
  );
}