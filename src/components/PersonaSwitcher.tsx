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
      width="240px"
      minWidth="240px"
      label="Select Persona"
      labelPosition="side"
      UNSAFE_className="bg-muted/50 border-border/50"
    >
      {Object.entries(personaConfig).map(([key, config]) => {
        const Icon = config.icon;
        return (
          <Item key={key} textValue={config.label}>
            <Flex alignItems="start" gap="size-150">
              <View 
                backgroundColor="gray-300" 
                borderRadius="medium" 
                padding="size-75"
              >
                <Icon className="h-4 w-4" />
              </View>
              <Flex direction="column">
                <Text UNSAFE_style={{ fontSize: '14px', fontWeight: 'bold' }}>
                  {config.label}
                </Text>
                <Text UNSAFE_style={{ fontSize: '12px', color: 'var(--muted-foreground)' }}>
                  {config.description}
                </Text>
              </Flex>
            </Flex>
          </Item>
        );
      })}
    </Picker>
  );
}