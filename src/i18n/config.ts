// src/i18n/config.ts
export const defaultLocale = 'fr';
export const locales = ['en', 'fr'] as const;
export type ValidLocale = typeof locales[number];

// Structure type definition for our translations
export interface Dictionary {
  auth: {
    signIn: string;
    tryFree: string;
  };
  hero: {
    title: string;
    highlight: string;
    description: string;
    cta: {
      primary: string;
      secondary: string;
    };
  };
  features: {
    heading: string;
    subheading: string;
    crossPlatform: {
      title: string;
      description: string;
    };
    scheduling: {
      title: string;
      description: string;
    };
    analytics: {
      title: string;
      description: string;
    };
  };
  cta: {
    heading: string;
    subheading: string;
    button: string;
  };
}

// Dictionary definitions
export const dictionaries: Record<ValidLocale, Dictionary> = {
  en: {
    auth: {
      signIn: "Sign in",
      tryFree: "Try for free"
    },
    hero: {
      title: "Social media management",
      highlight: "simplified",
      description: "Publify brings all your social networks together in one intuitive interface. Create, schedule, and analyze your content in just a few clicks.",
      cta: {
        primary: "Get started now",
        secondary: "Learn more"
      }
    },
    features: {
      heading: "All the features you need",
      subheading: "Powerful tools to optimize your social media presence and save time every day",
      crossPlatform: {
        title: "Cross-platform Publishing",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore."
      },
      scheduling: {
        title: "Smart Scheduling",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore."
      },
      analytics: {
        title: "Real-time Analytics",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore."
      }
    },
    cta: {
      heading: "Ready to transform your social presence?",
      subheading: "Join thousands of users who trust Publify for their social media management.",
      button: "Get started for free"
    }
  },
  fr: {
    auth: {
      signIn: "Se connecter",
      tryFree: "Essayer gratuitement"
    },
    hero: {
      title: "La gestion des réseaux sociaux",
      highlight: "simplifiée",
      description: "Publify réunit tous vos réseaux sociaux dans une seule interface intuitive. Créez, planifiez et analysez votre contenu en quelques clics.",
      cta: {
        primary: "Commencer maintenant",
        secondary: "En savoir plus"
      }
    },
    features: {
      heading: "Toutes les fonctionnalités dont vous avez besoin",
      subheading: "Des outils puissants pour optimiser votre présence sur les réseaux sociaux et gagner du temps au quotidien",
      crossPlatform: {
        title: "Publication multiplateforme",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore."
      },
      scheduling: {
        title: "Planification intelligente",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore."
      },
      analytics: {
        title: "Analytics en temps réel",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore."
      }
    },
    cta: {
      heading: "Prêt à transformer votre présence sociale ?",
      subheading: "Rejoignez des milliers d'utilisateurs qui font confiance à Publify pour leur gestion des réseaux sociaux.",
      button: "Commencer gratuitement"
    }
  }
};

export async function getDictionary(locale: ValidLocale): Promise<Dictionary> {
  return dictionaries[locale];
}