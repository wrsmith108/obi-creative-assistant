import React from 'react';
import { Sparkles, Command, HelpCircle, Settings, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MacOSMenuBarProps {
  onOpenCommandPalette: () => void;
  onShowHelp: () => void;
  onToggleTheme: () => void;
  isDark: boolean;
}

export const MacOSMenuBar = ({ 
  onOpenCommandPalette, 
  onShowHelp, 
  onToggleTheme, 
  isDark 
}: MacOSMenuBarProps) => {
  const menuItems = [
    {
      label: 'Obi',
      items: [
        { label: 'About Obi', shortcut: '', action: () => {} },
        { label: 'Preferences...', shortcut: '⌘,', action: () => {} },
        { type: 'separator' },
        { label: 'Quit Obi', shortcut: '⌘Q', action: () => {} }
      ]
    },
    {
      label: 'Edit',
      items: [
        { label: 'Undo', shortcut: '⌘Z', action: () => {} },
        { label: 'Redo', shortcut: '⌘⇧Z', action: () => {} },
        { type: 'separator' },
        { label: 'Cut', shortcut: '⌘X', action: () => {} },
        { label: 'Copy', shortcut: '⌘C', action: () => {} },
        { label: 'Paste', shortcut: '⌘V', action: () => {} }
      ]
    },
    {
      label: 'View',
      items: [
        { label: 'Command Palette', shortcut: '⌘K', action: onOpenCommandPalette },
        { label: 'Toggle Theme', shortcut: '⌘T', action: onToggleTheme },
        { type: 'separator' },
        { label: 'Show Sidebar', shortcut: '⌘⇧S', action: () => {} },
        { label: 'Full Screen', shortcut: '⌃⌘F', action: () => {} }
      ]
    },
    {
      label: 'Help',
      items: [
        { label: 'Keyboard Shortcuts', shortcut: '⌘/', action: onShowHelp },
        { label: 'Documentation', shortcut: '', action: () => {} },
        { type: 'separator' },
        { label: 'Report Issue', shortcut: '', action: () => {} }
      ]
    }
  ];

  return (
    <div className="h-7 bg-muted/30 backdrop-blur-xl border-b border-border/30 flex items-center justify-between px-4 text-sm">
      {/* Left side - Menu items */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="font-semibold text-foreground">Obi</span>
        </div>
        {menuItems.map((menu) => (
          <div key={menu.label} className="relative group">
            <button className="px-2 py-1 rounded text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-colors">
              {menu.label}
            </button>
            {/* Dropdown menu would go here */}
          </div>
        ))}
      </div>

      {/* Right side - System controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onOpenCommandPalette}
          className="p-1 rounded hover:bg-muted/50 transition-colors"
          title="Command Palette (⌘K)"
        >
          <Command className="h-4 w-4 text-foreground/60" />
        </button>
        <button
          onClick={onToggleTheme}
          className="p-1 rounded hover:bg-muted/50 transition-colors"
          title="Toggle Theme"
        >
          {isDark ? (
            <Sun className="h-4 w-4 text-foreground/60" />
          ) : (
            <Moon className="h-4 w-4 text-foreground/60" />
          )}
        </button>
        <button
          onClick={onShowHelp}
          className="p-1 rounded hover:bg-muted/50 transition-colors"
          title="Help (⌘/)"
        >
          <HelpCircle className="h-4 w-4 text-foreground/60" />
        </button>
        <div className="text-xs text-foreground/40 ml-2">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};