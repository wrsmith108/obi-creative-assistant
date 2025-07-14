import React from 'react';
import { Minus, Square, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MacOSWindowFrameProps {
  children: React.ReactNode;
  title?: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  className?: string;
  showTrafficLights?: boolean;
}

export const MacOSWindowFrame = ({
  children,
  title,
  onClose,
  onMinimize,
  onMaximize,
  className,
  showTrafficLights = true
}: MacOSWindowFrameProps) => {
  return (
    <div className={cn(
      "bg-card/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-elegant overflow-hidden",
      "ring-1 ring-white/10",
      className
    )}>
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-muted/20 border-b border-border/30">
        {/* Traffic Light Buttons */}
        {showTrafficLights && (
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group"
              aria-label="Close"
            >
              <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={onMinimize}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors flex items-center justify-center group"
              aria-label="Minimize"
            >
              <Minus className="w-2 h-2 text-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={onMaximize}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center group"
              aria-label="Maximize"
            >
              <Square className="w-2 h-2 text-green-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        )}

        {/* Title */}
        {title && (
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h2 className="text-sm font-medium text-foreground/80">{title}</h2>
          </div>
        )}

        {/* Spacer for balance */}
        <div className="w-16" />
      </div>

      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
};