
import { 
  Picker, 
  Item, 
  Text, 
  Flex, 
  View 
} from '@adobe/react-spectrum';
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
    description: "Brand scaling & Custom Models"
  },
  campaign_manager: {
    label: "Campaign Manager", 
    icon: Target,
    description: "Multi-channel optimization"
  },
  designer: {
    label: "Designer",
    icon: Palette,
    description: "Creative workflows & PS integration"
  },
  developer: {
    label: "Developer",
    icon: Code,
    description: "API integration & automation"
  }
};

export function PersonaSwitcher({ currentPersona, onPersonaChange }: PersonaSwitcherProps) {
  return (
    <Picker
      selectedKey={currentPersona}
      onSelectionChange={(key) => onPersonaChange(key as UserPersona)}
      width="280px"
      minWidth="280px"
      label="Select Persona"
      labelPosition="side"
      UNSAFE_className="bg-muted/50 border-border/50 [&_[data-testid='picker-button']]:!pr-6 [&_.react-spectrum-Picker-popover]:!bg-card [&_.react-spectrum-Picker-popover]:!border-border/50 [&_.react-spectrum-Picker-popover]:!backdrop-blur-xl [&_.react-spectrum-Menu-item]:!py-2 [&_.react-spectrum-Menu-item]:!px-3 [&_.react-spectrum-Menu-item]:!mb-1 [&_.react-spectrum-Menu-item:last-child]:!mb-0 [&_.react-spectrum-Menu-item]:!rounded-md [&_.react-spectrum-Menu-item]:!transition-all [&_.react-spectrum-Menu-item]:!border-transparent [&_.react-spectrum-Menu-item]:!border [&_.react-spectrum-Menu]:!gap-1 [&_.react-spectrum-Menu]:!p-2"
    >
      {Object.entries(personaConfig).map(([key, config]) => {
        const Icon = config.icon;
        return (
          <Item key={key} textValue={config.label}>
            <Flex alignItems="center" gap="size-150" UNSAFE_className="w-full">
              <View 
                backgroundColor="gray-300" 
                borderRadius="medium" 
                padding="size-75"
                UNSAFE_className="bg-muted/50 flex-shrink-0"
              >
                <Icon className="h-4 w-4" />
              </View>
              <Text UNSAFE_style={{ fontSize: '14px', fontWeight: '600', whiteSpace: 'nowrap', color: 'var(--foreground)' }}>
                {config.label}
              </Text>
            </Flex>
          </Item>
        );
      })}
    </Picker>
  );
}
