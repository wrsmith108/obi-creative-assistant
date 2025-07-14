import React from 'react';
import { Keyboard, Sparkles } from 'lucide-react';
import { MacOSWindowFrame } from './MacOSWindowFrame';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal = ({ isOpen, onClose }: HelpModalProps) => {
  const shortcuts = [
    {
      category: 'General',
      items: [
        { key: '⌘K', description: 'Open Command Palette' },
        { key: '⌘/', description: 'Show this help' },
        { key: 'Esc', description: 'Close modal or dialog' },
        { key: '⌘T', description: 'Toggle theme' }
      ]
    },
    {
      category: 'Navigation',
      items: [
        { key: '⌘⇧P', description: 'Switch persona' },
        { key: '⌘⇧S', description: 'Toggle sidebar' },
        { key: '⌃⌘F', description: 'Toggle fullscreen' }
      ]
    },
    {
      category: 'Workflows',
      items: [
        { key: '⌘N', description: 'New workflow' },
        { key: '⌘S', description: 'Save workflow' },
        { key: '⌘R', description: 'Run workflow' },
        { key: '⌘⇧R', description: 'Run workflow with options' }
      ]
    },
    {
      category: 'Editing',
      items: [
        { key: '⌘Z', description: 'Undo' },
        { key: '⌘⇧Z', description: 'Redo' },
        { key: '⌘C', description: 'Copy' },
        { key: '⌘V', description: 'Paste' }
      ]
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <MacOSWindowFrame
        title="Keyboard Shortcuts"
        onClose={onClose}
        className="w-full max-w-2xl max-h-[80vh] overflow-hidden"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Keyboard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Keyboard Shortcuts</h2>
              <p className="text-muted-foreground">Speed up your workflow with these shortcuts</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-h-96 overflow-y-auto">
            {shortcuts.map((category) => (
              <div key={category.category} className="space-y-3">
                <h3 className="font-medium text-foreground border-b border-border/50 pb-2">
                  {category.category}
                </h3>
                <div className="space-y-2">
                  {category.items.map((shortcut, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <span className="text-muted-foreground text-sm">
                        {shortcut.description}
                      </span>
                      <kbd className="px-2 py-1 bg-muted/50 border border-border/50 rounded text-xs font-mono text-foreground">
                        {shortcut.key}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground mb-1">Pro Tip</h4>
                <p className="text-sm text-muted-foreground">
                  Use ⌘K to quickly access any command or workflow. You can also navigate using arrow keys and press Enter to execute.
                </p>
              </div>
            </div>
          </div>
        </div>
      </MacOSWindowFrame>
    </div>
  );
};