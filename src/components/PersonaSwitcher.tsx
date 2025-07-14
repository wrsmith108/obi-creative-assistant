import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Crown, 
  Target, 
  Palette, 
  Code
} from 'lucide-react';
import { UserPersona } from './ObiModal';

interface PersonaSwitcherProps {
  currentPersona: UserPersona;
  onPersonaChange: (persona: UserPersona) => void;
}

const personaConfig = {
  creative_director: {
    label: "Creative Director",
    icon: Crown,
    color: "bg-creative-primary/20 text-creative-primary border-creative-primary/30",
    description: "Brand scaling & Custom Models"
  },
  campaign_manager: {
    label: "Campaign Manager", 
    icon: Target,
    color: "bg-creative-secondary/20 text-creative-secondary border-creative-secondary/30",
    description: "Multi-channel optimization"
  },
  designer: {
    label: "Designer",
    icon: Palette,
    color: "bg-creative-success/20 text-creative-success border-creative-success/30", 
    description: "Creative workflows & PS integration"
  },
  developer: {
    label: "Developer",
    icon: Code,
    color: "bg-creative-warning/20 text-creative-warning border-creative-warning/30",
    description: "API integration & automation"
  }
};

export function PersonaSwitcher({ currentPersona, onPersonaChange }: PersonaSwitcherProps) {
  const currentConfig = personaConfig[currentPersona];
  const CurrentIcon = currentConfig.icon;

  return (
    <Select
      value={currentPersona}
      onValueChange={(value: UserPersona) => onPersonaChange(value)}
    >
      <SelectTrigger className="w-48 bg-muted/50 border-border/50">
        <div className="flex items-center gap-2">
          <CurrentIcon className="h-4 w-4" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent className="w-64">
        {Object.entries(personaConfig).map(([key, config]) => {
          const Icon = config.icon;
          return (
            <SelectItem key={key} value={key} className="p-3">
              <div className="flex items-start gap-3 w-full">
                <div className="p-1.5 rounded-lg bg-muted">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{config.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {config.description}
                  </div>
                </div>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}