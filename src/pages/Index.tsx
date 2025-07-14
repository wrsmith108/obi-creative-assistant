import { useState } from 'react';
import { 
  Provider, 
  defaultTheme, 
  Button, 
  Flex, 
  Heading, 
  Text, 
  View,
  StatusLight,
  Grid
} from '@adobe/react-spectrum';
import { 
  Sparkles, 
  Palette, 
  Zap, 
  Image as ImageIcon,
  Video,
  Layers,
  ArrowRight,
  Crown,
  Target,
  Code,
  Play
} from 'lucide-react';
import { ObiModal } from '@/components/ObiModal';

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const features = [
    {
      icon: ImageIcon,
      title: "Creative Generation",
      description: "Generate brand-consistent assets using Custom Models and Firefly APIs",
      color: "text-creative-primary"
    },
    {
      icon: Layers,
      title: "Photoshop Integration", 
      description: "Seamless Generative Fill and background replacement workflows",
      color: "text-creative-secondary"
    },
    {
      icon: Video,
      title: "Campaign Scaling",
      description: "Multi-channel optimization and localization automation",
      color: "text-creative-success"
    },
    {
      icon: Target,
      title: "Brand Management",
      description: "Custom Model training and brand compliance automation",
      color: "text-creative-warning"
    }
  ];

  const personas = [
    { icon: Crown, label: "Creative Director", focus: "Brand scaling & Custom Models" },
    { icon: Target, label: "Campaign Manager", focus: "Multi-channel optimization" },
    { icon: Palette, label: "Designer", focus: "Creative workflows & PS integration" },
    { icon: Code, label: "Developer", focus: "API integration & automation" }
  ];

  return (
    <Provider theme={defaultTheme} colorScheme="dark">
      <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-gradient-primary shadow-glow">
              <Sparkles className="h-12 w-12 text-primary-foreground" />
            </div>
            <div className="text-left">
              <h1 className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Obi
              </h1>
              <p className="text-lg text-muted-foreground">
                Adobe Firefly Services Automation
              </p>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Conversational Creative Automation
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Streamline your creative workflows with AI-powered automation. Generate brand-consistent content, 
            scale campaigns across channels, and optimize creative production with Adobe Firefly Services.
          </p>

          <Flex justifyContent="center" gap="size-200" marginBottom="size-300" wrap>
            <StatusLight variant="positive">
              <Zap className="h-3 w-3 mr-1" />
              Firefly Services Ready
            </StatusLight>
            <StatusLight variant="info">
              Custom Models Supported
            </StatusLight>
            <StatusLight variant="neutral">
              Real-time Workflows
            </StatusLight>
          </Flex>

          <Button 
            variant="accent"
            onPress={() => setIsModalOpen(true)}
            UNSAFE_className="bg-gradient-primary hover:opacity-90 shadow-glow text-lg px-8 py-6 h-auto"
          >
            <Play className="h-5 w-5 mr-2" />
            Launch Obi Assistant
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Creative Workflow Automation
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Obi integrates with Adobe Firefly Services to automate creative production, 
            from content generation to campaign scaling and brand management.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl bg-card border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg group"
            >
              <div className="mb-4">
                <div className="p-3 rounded-xl bg-muted/50 w-fit">
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
              </div>
              <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* User Personas */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Built for Creative Professionals
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Obi adapts to your role and expertise, providing personalized automation 
            assistance for every creative workflow scenario.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {personas.map((persona, index) => (
            <div 
              key={index}
              className="p-4 rounded-xl bg-gradient-glass border border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer group"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-colors">
                  <persona.icon className="h-5 w-5 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{persona.label}</h4>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{persona.focus}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center p-12 rounded-2xl bg-gradient-creative/10 border border-creative-primary/20">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Ready to Automate Your Creative Workflows?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the power of conversational creative automation. 
            Generate content, scale campaigns, and optimize workflows with Adobe Firefly Services.
          </p>
          <Button 
            variant="accent"
            onPress={() => setIsModalOpen(true)}
            UNSAFE_className="bg-gradient-creative hover:opacity-90 shadow-creative text-lg px-8 py-6 h-auto"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Start Creative Automation
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>

        <ObiModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </Provider>
  );
};

export default Index;
