import { UserPersona } from '@/components/ObiModal';

export interface FireflyWorkflow {
  name: string;
  type: 'generation' | 'processing' | 'training' | 'optimization';
  api_endpoint: string;
  estimated_time: string;
  status?: 'processing' | 'completed' | 'error';
  steps?: WorkflowStep[];
}

export interface WorkflowStep {
  id: string;
  name: string;
  type: string;
  api_endpoint: string;
  config: any;
  estimated_time: string;
  dependencies?: string[];
  status?: 'pending' | 'processing' | 'completed' | 'error';
}

export interface PersonaContext {
  welcomeMessage: string;
  focusArea: string;
  quickActions: string[];
  expertise: string[];
  commonWorkflows: string[];
}

export function getPersonaContext(persona: UserPersona): PersonaContext {
  const contexts = {
    creative_director: {
      welcomeMessage: "Hi! I'm Obi, your Firefly Services automation assistant. I'll help you scale brand content generation and manage Custom Model workflows. What campaign are you working on?",
      focusArea: "brand scaling and Custom Models",
      quickActions: [
        "Train a Custom Model for our brand",
        "Generate 50 campaign variations",
        "Set up brand compliance checks",
        "Optimize for multiple channels"
      ],
      expertise: ["Custom Model training", "Brand consistency", "Campaign scaling", "Quality control"],
      commonWorkflows: ["Brand asset generation", "Custom Model deployment", "Campaign scaling"]
    },
    campaign_manager: {
      welcomeMessage: "Hello! I'm Obi, ready to help you automate campaign scaling and localization with Firefly Services. Let's optimize your content for multiple markets and channels!",
      focusArea: "campaign optimization and localization",
      quickActions: [
        "Localize campaign for APAC markets",
        "Resize for all social platforms",
        "Create video variations",
        "Bulk process campaign assets"
      ],
      expertise: ["Multi-channel optimization", "Localization", "Asset variations", "Campaign automation"],
      commonWorkflows: ["Multi-channel scaling", "Localization workflows", "Video optimization"]
    },
    designer: {
      welcomeMessage: "Hey! I'm Obi, here to enhance your creative workflow with Firefly + Photoshop integration. I can help you master AI-enhanced design techniques!",
      focusArea: "creative workflows and Photoshop integration",
      quickActions: [
        "Learn Generative Fill techniques",
        "Optimize background replacement",
        "Batch process product photos",
        "Explore creative possibilities"
      ],
      expertise: ["Generative Fill", "Background replacement", "Creative enhancement", "Workflow optimization"],
      commonWorkflows: ["Photoshop integration", "Creative enhancement", "Batch processing"]
    },
    developer: {
      welcomeMessage: "Hi! I'm Obi, your technical guide for Firefly Services API integration. I'll help you build robust creative automation systems and handle complex workflows.",
      focusArea: "API integration and technical implementation",
      quickActions: [
        "Debug API rate limiting",
        "Optimize batch processing",
        "Handle error recovery",
        "Set up webhook integration"
      ],
      expertise: ["API integration", "Error handling", "Performance optimization", "Webhook setup"],
      commonWorkflows: ["API optimization", "Error handling", "Custom integrations"]
    }
  };

  return contexts[persona];
}

export function generateFireflyResponse(
  input: string, 
  persona: UserPersona, 
  brandContext: any
): { message: string; workflow?: FireflyWorkflow; metadata?: any } {
  const lowerInput = input.toLowerCase();
  
  // Custom Model Training
  if (lowerInput.includes('custom model') || lowerInput.includes('train') || lowerInput.includes('brand model')) {
    return {
      message: "I'll help you set up Custom Model training for your brand! For optimal results, I recommend curating 100-150 diverse brand images that represent your visual style, including various lighting conditions, product angles, and brand colors.\n\nWould you like me to guide you through the asset curation process, or do you have your training dataset ready?",
      workflow: {
        name: "Custom Model Training",
        type: "training",
        api_endpoint: "/v1/models/train",
        estimated_time: "45-90 minutes",
        status: "processing"
      }
    };
  }

  // Campaign Generation
  if (lowerInput.includes('generate') || lowerInput.includes('campaign') || lowerInput.includes('variations')) {
    return {
      message: "Perfect! I'll set up automated campaign asset generation using your Custom Model. This workflow will create multiple variations while maintaining brand consistency.\n\nI can generate assets for different platforms, aspect ratios, and messaging variations. How many assets do you need, and for which channels?",
      workflow: {
        name: "Campaign Asset Generation",
        type: "generation",
        api_endpoint: "/v2/images/generate",
        estimated_time: "8-15 seconds per asset",
        status: "processing"
      }
    };
  }

  // Photoshop Integration
  if (lowerInput.includes('photoshop') || lowerInput.includes('generative fill') || lowerInput.includes('background')) {
    return {
      message: "I'll walk you through Photoshop + Firefly integration! Generative Fill works best when you clearly define the area to modify and use specific, descriptive prompts.\n\nFor background replacement, I recommend using Photoshop's Background Removal API first, then applying Firefly-generated backgrounds with Generative Fill for seamless integration.",
      workflow: {
        name: "Photoshop Integration",
        type: "processing",
        api_endpoint: "/photoshop/generateFill",
        estimated_time: "15-30 seconds per image",
        status: "processing"
      }
    };
  }

  // Localization
  if (lowerInput.includes('localize') || lowerInput.includes('international') || lowerInput.includes('markets')) {
    return {
      message: "I'll help you localize your campaign for international markets! This involves using region-specific Custom Models for cultural authenticity, translating text elements, and adapting visual elements for local preferences.\n\nWhich markets are you targeting? I can recommend the best approach for each region and set up automated localization workflows.",
      workflow: {
        name: "Campaign Localization",
        type: "optimization",
        api_endpoint: "/v1/localization/batch",
        estimated_time: "3-5 minutes per market",
        status: "processing"
      }
    };
  }

  // Multi-channel optimization
  if (lowerInput.includes('platform') || lowerInput.includes('channel') || lowerInput.includes('resize') || lowerInput.includes('social')) {
    return {
      message: "I'll optimize your creative for multiple platforms automatically! Using Firefly Creative Production, I can resize, crop intelligently, and use Generative Expand for larger formats while maintaining your focal points.\n\nI'll create versions for Instagram (1:1, 4:5, 9:16), Facebook (1.91:1, 4:5), Twitter (16:9, 2:1), LinkedIn (1.91:1), and TikTok (9:16). This typically takes 2-4 minutes for all variations.",
      workflow: {
        name: "Multi-Channel Optimization",
        type: "optimization",
        api_endpoint: "/v1/production/batch",
        estimated_time: "2-4 minutes",
        status: "processing"
      }
    };
  }

  // Default persona-specific responses
  const context = getPersonaContext(persona);
  
  if (persona === 'creative_director') {
    return {
      message: "As a Creative Director, I can help you establish scalable brand workflows. My specialty is Custom Model training and brand consistency automation. Would you like to explore setting up your first Custom Model, or do you need help with campaign scaling strategies?"
    };
  }

  if (persona === 'campaign_manager') {
    return {
      message: "I understand the pressure of campaign deadlines! I can automate your asset variations, handle localization workflows, and optimize for multiple channels simultaneously. What's your biggest campaign challenge right now?"
    };
  }

  if (persona === 'designer') {
    return {
      message: "Let's enhance your creative process! I can teach you advanced Generative Fill techniques, help optimize your Photoshop + Firefly workflow, and show you creative possibilities you might not have considered. What type of design work are you focusing on?"
    };
  }

  if (persona === 'developer') {
    return {
      message: "I can help you build robust Firefly Services integrations. From handling API rate limits to implementing error recovery and optimizing batch processing - what technical challenge can I help you solve?"
    };
  }

  return {
    message: "I can help you with Firefly Services automation, Custom Model training, creative workflow optimization, and campaign scaling. What would you like to explore first?"
  };
}

export const sampleWorkflows: FireflyWorkflow[] = [
  {
    name: "Brand Campaign Generation",
    type: "generation",
    api_endpoint: "/v2/images/generate",
    estimated_time: "8-12 seconds per asset",
    steps: [
      {
        id: "validate_model",
        name: "Validate Custom Model",
        type: "validation",
        api_endpoint: "/v1/models/brand_holiday_v2/status",
        config: { model_id: "brand_holiday_v2" },
        estimated_time: "200ms"
      },
      {
        id: "generate_assets",
        name: "Generate Base Assets",
        type: "generation", 
        api_endpoint: "/v2/images/generate",
        config: {
          prompt: "Holiday shopping scene with brand aesthetics",
          custom_model: "brand_holiday_v2",
          num_variations: 4
        },
        estimated_time: "8-15 seconds",
        dependencies: ["validate_model"]
      },
      {
        id: "optimize_channels",
        name: "Multi-Channel Optimization",
        type: "processing",
        api_endpoint: "/v1/production/batch",
        config: {
          operations: ["resize", "smart_crop", "generative_expand"],
          target_formats: ["instagram_post", "facebook_ad", "twitter_header"]
        },
        estimated_time: "2-4 minutes",
        dependencies: ["generate_assets"]
      }
    ]
  },
  {
    name: "Product Background Replacement",
    type: "processing",
    api_endpoint: "/photoshop/generateFill",
    estimated_time: "15-30 seconds per image",
    steps: [
      {
        id: "remove_bg",
        name: "Remove Background",
        type: "processing",
        api_endpoint: "/photoshop/removeBackground",
        config: { optimize_for: "product_photography" },
        estimated_time: "30-60 seconds"
      },
      {
        id: "generate_bg",
        name: "Generate New Background",
        type: "generation",
        api_endpoint: "/v2/images/generate",
        config: {
          prompt: "Professional studio background, soft lighting",
          style: "photography"
        },
        estimated_time: "8-12 seconds"
      },
      {
        id: "composite",
        name: "Composite Final Image",
        type: "processing",
        api_endpoint: "/photoshop/generateFill",
        config: { fill_area: "background_area" },
        estimated_time: "15-30 seconds",
        dependencies: ["remove_bg", "generate_bg"]
      }
    ]
  }
];