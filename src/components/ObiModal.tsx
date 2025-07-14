import { useState } from 'react';
import { 
  Provider, 
  defaultTheme, 
  DialogTrigger, 
  Dialog, 
  Heading, 
  Content,
  Button,
  Text,
  Flex,
  View,
  TabList,
  TabPanels,
  Tabs,
  Item,
  StatusLight,
  ActionButton,
  Well
} from '@adobe/react-spectrum';
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
  const [selectedTab, setSelectedTab] = useState('conversation');

  const fireflySuggestions = [
    { icon: ImageIcon, label: "Generate Campaign Assets", count: "12 variations" },
    { icon: Layers, label: "Custom Model Training", count: "Brand ready" },
    { icon: Video, label: "Multi-Channel Optimization", count: "8 platforms" },
    { icon: Target, label: "Localization Workflow", count: "5 markets" }
  ];

  if (!isOpen) return null;

  return (
    <Provider theme={defaultTheme} colorScheme="dark">
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
        <View 
          backgroundColor="gray-100" 
          borderRadius="large"
          width="95vw"
          height="90vh"
          maxWidth="1400px"
          padding="size-400"
          UNSAFE_className="bg-gradient-glass border border-border/50 shadow-creative"
        >
          {/* Header */}
          <Flex direction="column" gap="size-300" height="100%">
            <Flex justifyContent="space-between" alignItems="center" marginBottom="size-300" wrap="wrap" minHeight="size-800">
              <Flex alignItems="center" gap="size-300" minWidth="300px">
                <View 
                  backgroundColor="blue-600" 
                  borderRadius="large" 
                  padding="size-150"
                  UNSAFE_className="bg-gradient-primary shadow-glow"
                >
                  <Sparkles className="h-6 w-6 text-white" />
                </View>
                <Flex direction="column">
                  <Heading level={1} marginBottom="size-0" UNSAFE_className="bg-gradient-primary bg-clip-text text-transparent">
                    Obi
                  </Heading>
                  <Text UNSAFE_style={{ fontSize: '14px', color: 'var(--muted-foreground)' }}>
                    Adobe Firefly Services Automation Assistant
                  </Text>
                </Flex>
              </Flex>
              
              <Flex alignItems="center" gap="size-300" wrap="wrap">
                <View padding="size-100">
                  <StatusLight variant="positive">API Connected</StatusLight>
                </View>
                <View padding="size-100">
                  <PersonaSwitcher 
                    currentPersona={currentPersona}
                    onPersonaChange={setCurrentPersona}
                  />
                </View>
                <View padding="size-100">
                  <ActionButton onPress={onClose}>
                    ✕
                  </ActionButton>
                </View>
              </Flex>
            </Flex>

            {/* Main Content */}
            <Flex flex={1} gap="size-300">
              {/* Tabbed Interface */}
              <Flex direction="column" flex={1}>
                <Tabs 
                  selectedKey={selectedTab}
                  onSelectionChange={(key) => setSelectedTab(String(key))}
                  height="100%"
                >
                  <TabList>
                    <Item key="conversation">
                      <Flex alignItems="center" gap="size-100">
                        <Brain className="h-4 w-4" />
                        <Text>Conversation</Text>
                      </Flex>
                    </Item>
                    <Item key="workflow">
                      <Flex alignItems="center" gap="size-100">
                        <Workflow className="h-4 w-4" />
                        <Text>Workflow</Text>
                      </Flex>
                    </Item>
                    <Item key="brand">
                      <Flex alignItems="center" gap="size-100">
                        <Palette className="h-4 w-4" />
                        <Text>Brand Context</Text>
                      </Flex>
                    </Item>
                  </TabList>
                  
                  <TabPanels height="100%">
                    <Item key="conversation">
                      <ConversationInterface 
                        persona={currentPersona}
                        onWorkflowStart={setActiveWorkflow}
                        brandContext={brandContext}
                      />
                    </Item>
                    <Item key="workflow">
                      <WorkflowVisualization 
                        activeWorkflow={activeWorkflow}
                        persona={currentPersona}
                      />
                    </Item>
                    <Item key="brand">
                      <BrandContextManager 
                        brandContext={brandContext}
                        onBrandContextChange={setBrandContext}
                        persona={currentPersona}
                      />
                    </Item>
                  </TabPanels>
                </Tabs>
              </Flex>

              {/* Quick Actions Sidebar */}
              <View width="300px" UNSAFE_className="border-l border-border/30 pl-6">
                <Flex direction="column" gap="size-300">
                  <View>
                    <Flex alignItems="center" gap="size-100" marginBottom="size-200">
                      <Sparkles className="h-4 w-4 text-blue-600" />
                      <Heading level={3}>Firefly Quick Actions</Heading>
                    </Flex>
                    <Flex direction="column" gap="size-100">
                      {fireflySuggestions.map((suggestion, index) => (
                        <ActionButton
                          key={index}
                          onPress={() => setActiveWorkflow(suggestion.label.toLowerCase())}
                          UNSAFE_className="w-full justify-start p-3 h-auto text-left"
                        >
                          <Flex alignItems="center" gap="size-150">
                            <suggestion.icon className="h-4 w-4 text-blue-600" />
                            <Flex direction="column" alignItems="start">
                              <Text UNSAFE_style={{ fontSize: '14px', fontWeight: 'bold' }}>{suggestion.label}</Text>
                              <Text UNSAFE_style={{ fontSize: '12px', color: 'var(--muted-foreground)' }}>{suggestion.count}</Text>
                            </Flex>
                          </Flex>
                        </ActionButton>
                      ))}
                    </Flex>
                  </View>

                  <Well>
                    <Flex direction="column" gap="size-200">
                      <Flex alignItems="center" gap="size-100">
                        <View 
                          backgroundColor="blue-400" 
                          borderRadius="medium" 
                          padding="size-75"
                        >
                          <Settings className="h-4 w-4 text-blue-800" />
                        </View>
                        <Heading level={4}>System Status</Heading>
                      </Flex>
                      <Flex direction="column" gap="size-100">
                        <Flex justifyContent="space-between">
                          <Text UNSAFE_style={{ fontSize: '14px', color: 'var(--muted-foreground)' }}>Firefly API</Text>
                          <StatusLight variant="positive">Active</StatusLight>
                        </Flex>
                        <Flex justifyContent="space-between">
                          <Text UNSAFE_style={{ fontSize: '14px', color: 'var(--muted-foreground)' }}>Custom Models</Text>
                          <Text UNSAFE_style={{ fontSize: '14px' }}>3 trained</Text>
                        </Flex>
                        <Flex justifyContent="space-between">
                          <Text UNSAFE_style={{ fontSize: '14px', color: 'var(--muted-foreground)' }}>Queue</Text>
                          <Text UNSAFE_style={{ fontSize: '14px' }}>2 processing</Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Well>
                </Flex>
              </View>
            </Flex>
          </Flex>
        </View>
      </div>
    </Provider>
  );
}