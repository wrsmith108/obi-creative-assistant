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
  Workflow,
  X,
  Minus,
  Square
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
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
        <View 
          backgroundColor="gray-50" 
          borderRadius="large"
          width="95vw"
          height="90vh"
          maxWidth="1400px"
          UNSAFE_className="bg-card/95 backdrop-blur-xl border border-border/50 shadow-elegant animate-scale-in ring-1 ring-white/10 overflow-hidden"
        >
          {/* macOS-style Header with Traffic Lights */}
          <div className="flex items-center justify-between p-4 bg-muted/20 border-b border-border/30">
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group"
                aria-label="Close"
              >
                <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors" />
              <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors" />
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
              <View 
                backgroundColor="blue-600" 
                borderRadius="medium" 
                padding="size-100"
                UNSAFE_className="bg-primary/10"
              >
                <Sparkles className="h-5 w-5 text-primary" />
              </View>
              <Flex direction="column">
                <Text UNSAFE_style={{ fontSize: '16px', fontWeight: '600', color: 'var(--foreground)' }}>
                  Obi Assistant
                </Text>
                <Text UNSAFE_style={{ fontSize: '12px', color: 'var(--muted-foreground)' }}>
                  Adobe Firefly Services
                </Text>
              </Flex>
            </div>

            <div className="flex items-center gap-3">
              <PersonaSwitcher 
                currentPersona={currentPersona}
                onPersonaChange={setCurrentPersona}
              />
            </div>
          </div>

          {/* Main Content */}
          <View 
            padding="size-300"
            UNSAFE_className="flex-1 overflow-hidden"
          >
            <Flex direction="column" gap="size-200" height="100%"
                  UNSAFE_className="h-full"
            >

            <Flex flex={1} gap="size-300" UNSAFE_className="overflow-hidden">
              {/* Tabbed Interface */}
              <Flex direction="column" flex={1} UNSAFE_className="min-w-0">
                <Tabs 
                  selectedKey={selectedTab}
                  onSelectionChange={(key) => setSelectedTab(String(key))}
                  height="100%"
                  UNSAFE_className="flex-1 flex flex-col"
                >
                  <TabList UNSAFE_className="flex-shrink-0 bg-muted/10 rounded-lg p-1 mb-4">
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
                  
                  <TabPanels height="100%" UNSAFE_className="flex-1 overflow-hidden">
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
              <View width="280px" UNSAFE_className="border-l border-border/20 pl-4 flex-shrink-0">
                <Flex direction="column" gap="size-300" height="100%">
                  <View>
                    <Flex alignItems="center" gap="size-100" marginBottom="size-200">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <Heading level={4} UNSAFE_style={{ fontSize: '14px', fontWeight: '600', color: 'var(--foreground)' }}>
                        Firefly Quick Actions
                      </Heading>
                    </Flex>
                    <Flex direction="column" gap="size-75">
                      {fireflySuggestions.map((suggestion, index) => (
                        <ActionButton
                          key={index}
                          onPress={() => setActiveWorkflow(suggestion.label.toLowerCase())}
                          UNSAFE_className="w-full justify-start p-3 h-auto text-left bg-muted/30 hover:bg-muted/50 rounded-lg border border-border/30 transition-all"
                        >
                          <Flex alignItems="center" gap="size-150">
                            <View 
                              backgroundColor="gray-200" 
                              borderRadius="medium" 
                              padding="size-75"
                              UNSAFE_className="bg-primary/10"
                            >
                              <suggestion.icon className="h-4 w-4 text-primary" />
                            </View>
                            <Flex direction="column" alignItems="start">
                              <Text UNSAFE_style={{ fontSize: '13px', fontWeight: '500', color: 'var(--foreground)' }}>
                                {suggestion.label}
                              </Text>
                              <Text UNSAFE_style={{ fontSize: '11px', color: 'var(--muted-foreground)' }}>
                                {suggestion.count}
                              </Text>
                            </Flex>
                          </Flex>
                        </ActionButton>
                      ))}
                    </Flex>
                  </View>

                  <Well UNSAFE_className="bg-muted/20 border border-border/30 rounded-lg p-4">
                    <Flex direction="column" gap="size-200">
                      <Flex alignItems="center" gap="size-100">
                        <View 
                          backgroundColor="gray-300" 
                          borderRadius="medium" 
                          padding="size-75"
                          UNSAFE_className="bg-muted/50"
                        >
                          <Settings className="h-4 w-4 text-foreground/70" />
                        </View>
                        <Heading level={5} UNSAFE_style={{ fontSize: '13px', fontWeight: '600', color: 'var(--foreground)' }}>
                          System Status
                        </Heading>
                      </Flex>
                      <Flex direction="column" gap="size-100">
                        <Flex justifyContent="space-between" alignItems="center">
                          <Text UNSAFE_style={{ fontSize: '12px', color: 'var(--muted-foreground)' }}>Firefly API</Text>
                          <StatusLight variant="positive" UNSAFE_className="text-xs">Active</StatusLight>
                        </Flex>
                        <Flex justifyContent="space-between" alignItems="center">
                          <Text UNSAFE_style={{ fontSize: '12px', color: 'var(--muted-foreground)' }}>Custom Models</Text>
                          <Text UNSAFE_style={{ fontSize: '12px', color: 'var(--foreground)' }}>3 trained</Text>
                        </Flex>
                        <Flex justifyContent="space-between" alignItems="center">
                          <Text UNSAFE_style={{ fontSize: '12px', color: 'var(--muted-foreground)' }}>Queue</Text>
                          <Text UNSAFE_style={{ fontSize: '12px', color: 'var(--foreground)' }}>2 processing</Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Well>
                </Flex>
              </View>
            </Flex>
            </Flex>
          </View>
        </View>
      </div>
    </Provider>
  );
}