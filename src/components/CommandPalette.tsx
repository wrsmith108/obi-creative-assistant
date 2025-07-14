import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Crown, Target, Palette, Code, Zap, Image, Video, Layers } from 'lucide-react';
import { MacOSWindowFrame } from './MacOSWindowFrame';
import { cn } from '@/lib/utils';

interface Command {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  action: () => void;
  category: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onPersonaChange: (persona: string) => void;
  onWorkflowStart: (workflow: string) => void;
}

export const CommandPalette = ({ 
  isOpen, 
  onClose, 
  onPersonaChange, 
  onWorkflowStart 
}: CommandPaletteProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: Command[] = [
    // Personas
    {
      id: 'persona-creative-director',
      title: 'Switch to Creative Director',
      description: 'Brand scaling & Custom Models',
      icon: Crown,
      action: () => onPersonaChange('creative_director'),
      category: 'Personas'
    },
    {
      id: 'persona-campaign-manager',
      title: 'Switch to Campaign Manager',
      description: 'Multi-channel optimization',
      icon: Target,
      action: () => onPersonaChange('campaign_manager'),
      category: 'Personas'
    },
    {
      id: 'persona-designer',
      title: 'Switch to Designer',
      description: 'Creative workflows & PS integration',
      icon: Palette,
      action: () => onPersonaChange('designer'),
      category: 'Personas'
    },
    {
      id: 'persona-developer',
      title: 'Switch to Developer',
      description: 'API integration & automation',
      icon: Code,
      action: () => onPersonaChange('developer'),
      category: 'Personas'
    },
    // Workflows
    {
      id: 'workflow-generate-images',
      title: 'Generate Images',
      description: 'Create brand-consistent visuals',
      icon: Image,
      action: () => onWorkflowStart('image-generation'),
      category: 'Workflows'
    },
    {
      id: 'workflow-video-editing',
      title: 'Video Enhancement',
      description: 'AI-powered video workflows',
      icon: Video,
      action: () => onWorkflowStart('video-enhancement'),
      category: 'Workflows'
    },
    {
      id: 'workflow-background-removal',
      title: 'Background Removal',
      description: 'Remove & replace backgrounds',
      icon: Layers,
      action: () => onWorkflowStart('background-removal'),
      category: 'Workflows'
    },
    {
      id: 'workflow-batch-processing',
      title: 'Batch Processing',
      description: 'Process multiple assets',
      icon: Zap,
      action: () => onWorkflowStart('batch-processing'),
      category: 'Workflows'
    }
  ];

  const filteredCommands = commands.filter(command =>
    command.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    command.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedCommands = filteredCommands.reduce((acc, command) => {
    if (!acc[command.category]) {
      acc[command.category] = [];
    }
    acc[command.category].push(command);
    return acc;
  }, {} as Record<string, Command[]>);

  const executeCommand = (command: Command) => {
    command.action();
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            executeCommand(filteredCommands[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <MacOSWindowFrame
        title="Command Palette"
        onClose={onClose}
        className="w-full max-w-2xl mx-4 max-h-96"
        showTrafficLights={false}
      >
        <div className="p-4">
          {/* Search Input */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search commands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-muted/50 border border-border/50 rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              autoFocus
            />
          </div>

          {/* Commands */}
          <div className="max-h-80 overflow-y-auto space-y-3">
            {Object.entries(groupedCommands).map(([category, categoryCommands]) => (
              <div key={category}>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {category}
                </h3>
                <div className="space-y-1">
                  {categoryCommands.map((command, index) => {
                    const globalIndex = filteredCommands.indexOf(command);
                    return (
                      <button
                        key={command.id}
                        onClick={() => executeCommand(command)}
                        className={cn(
                          "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all",
                          "hover:bg-muted/50",
                          globalIndex === selectedIndex && "bg-primary/10 ring-1 ring-primary/30"
                        )}
                      >
                        <div className="p-2 rounded-md bg-muted/30">
                          <command.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-foreground">
                            {command.title}
                          </div>
                          <div className="text-sm text-muted-foreground truncate">
                            {command.description}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ⏎
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {filteredCommands.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No commands found</p>
            </div>
          )}
        </div>
      </MacOSWindowFrame>
    </div>
  );
};