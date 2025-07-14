import { useEffect, useCallback } from 'react';

interface ShortcutHandler {
  key: string;
  metaKey?: boolean;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  handler: () => void;
  description: string;
}

export const useKeyboardShortcuts = (shortcuts: ShortcutHandler[]) => {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const { key, metaKey, ctrlKey, shiftKey } = event;
    
    const matchingShortcut = shortcuts.find(shortcut => {
      return (
        shortcut.key.toLowerCase() === key.toLowerCase() &&
        !!shortcut.metaKey === metaKey &&
        !!shortcut.ctrlKey === ctrlKey &&
        !!shortcut.shiftKey === shiftKey
      );
    });

    if (matchingShortcut) {
      event.preventDefault();
      matchingShortcut.handler();
    }
  }, [shortcuts]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return shortcuts;
};

// Predefined shortcuts for the app
export const createAppShortcuts = (handlers: {
  onOpenCommandPalette: () => void;
  onTogglePersona: () => void;
  onShowHelp: () => void;
  onCloseModal: () => void;
}) => [
  {
    key: 'k',
    metaKey: true,
    handler: handlers.onOpenCommandPalette,
    description: 'Open Command Palette'
  },
  {
    key: 'p',
    metaKey: true,
    shiftKey: true,
    handler: handlers.onTogglePersona,
    description: 'Switch Persona'
  },
  {
    key: '/',
    metaKey: true,
    handler: handlers.onShowHelp,
    description: 'Show Help'
  },
  {
    key: 'Escape',
    handler: handlers.onCloseModal,
    description: 'Close Modal'
  }
];