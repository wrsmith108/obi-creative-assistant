import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sparkles, 
  Palette, 
  Settings, 
  Zap, 
  Image as ImageIcon,
  Video,
  Layers,
  Target,
  Brain,
  Workflow
} from 'lucide-react';
import { ConversationInterface } from './ConversationInterface';
import { WorkflowVisualization } from './WorkflowVisualization';
import { BrandContextManager } from './BrandContextManager';
import { PersonaSwitcher } from './PersonaSwitcher';

export type UserPersona = 'creative_director' | 'campaign_manager' | 'designer' | 'developer';

interface ObiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ObiModal({ isOpen, onClose }: ObiModalProps) {
  const [currentPersona, setCurrentPersona] = useState<UserPersona>('creative_director');
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(null);
  const [brandContext, setBrandContext] = useState<any>(null);

  const fireflySuggestions = [
    { icon: ImageIcon, label: "Generate Campaign Assets", count: "12 variations" },
    { icon: Layers, label: "Custom Model Training", count: "Brand ready" },
    { icon: Video, label: "Multi-Channel Optimization", count: "8 platforms" },
    { icon: Target, label: "Localization Workflow", count: "5 markets" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] bg-gradient-glass border-border/50 shadow-creative">
        <DialogHeader className="border-b border-border/30 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-primary shadow-glow">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Obi
                </DialogTitle>
                <p className="text-sm text-muted-foreground">
                  Adobe Firefly Services Automation Assistant
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-creative-success/20 text-creative-success border-creative-success/30">
                <Zap className="h-3 w-3 mr-1" />
                API Connected
              </Badge>
              <PersonaSwitcher 
                currentPersona={currentPersona}
                onPersonaChange={setCurrentPersona}
              />
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 flex gap-6 overflow-hidden">
          {/* Main Conversation Area */}
          <div className="flex-1 flex flex-col">
            <Tabs defaultValue="conversation" className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-3 bg-muted/50">
                <TabsTrigger value="conversation" className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  Conversation
                </TabsTrigger>
                <TabsTrigger value="workflow" className="flex items-center gap-2">
                  <Workflow className="h-4 w-4" />
                  Workflow
                </TabsTrigger>
                <TabsTrigger value="brand" className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Brand Context
                </TabsTrigger>
              </TabsList>

              <TabsContent value="conversation" className="flex-1 mt-4">
                <ConversationInterface 
                  persona={currentPersona}
                  onWorkflowStart={setActiveWorkflow}
                  brandContext={brandContext}
                />
              </TabsContent>

              <TabsContent value="workflow" className="flex-1 mt-4">
                <WorkflowVisualization 
                  activeWorkflow={activeWorkflow}
                  persona={currentPersona}
                />
              </TabsContent>

              <TabsContent value="brand" className="flex-1 mt-4">
                <BrandContextManager 
                  brandContext={brandContext}
                  onBrandContextChange={setBrandContext}
                  persona={currentPersona}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="w-80 border-l border-border/30 pl-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Firefly Quick Actions
                </h3>
                <div className="space-y-2">
                  {fireflySuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start p-3 h-auto hover:bg-muted/70 transition-smooth"
                      onClick={() => setActiveWorkflow(suggestion.label.toLowerCase())}
                    >
                      <suggestion.icon className="h-4 w-4 mr-3 text-primary" />
                      <div className="text-left">
                        <div className="font-medium text-sm">{suggestion.label}</div>
                        <div className="text-xs text-muted-foreground">{suggestion.count}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-creative/10 border border-creative-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-creative-primary/20">
                    <Settings className="h-4 w-4 text-creative-primary" />
                  </div>
                  <h4 className="font-medium text-sm">System Status</h4>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Firefly API</span>
                    <Badge variant="secondary" className="bg-creative-success/20 text-creative-success text-xs px-2 py-0">
                      Active
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Custom Models</span>
                    <span className="text-creative-secondary">3 trained</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Queue</span>
                    <span className="text-foreground">2 processing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}