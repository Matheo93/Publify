// src/i18n/config.ts
export const defaultLocale = "fr";
export const locales = ["en", "fr"] as const;
export type ValidLocale = (typeof locales)[number];

export interface Dictionary {
  auth: {
    tryFree: string;
    signInWithLinkedIn: string;
    signIn: {
      title: string;
      email: string;
      username: string;
      password: string;
      button: string;
      socialText: string;
    };
    signUp: {
      title: string;
      name: string;
      username: string;
      email: string;
      password: string;
      button: string;
      socialText: string;
    };
    panels: {
      left: {
        title: string;
        description: string;
        button: string;
      };
      right: {
        title: string;
        description: string;
        button: string;
      };
    };
    social: {
      linkedin: string;
      facebook: string;
      google: string;
      twitter: string;
    };
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
 components: {
   progress: {
     uploading: string;
     processing: string;
     completed: string;
     failed: string;
   };
 };
 preview: {
  title: string;
  demoMode: string;
  scheduledFor: string;
  immediatePublication: string;
  publishingOn: string;
  networks: {
    linkedin: string;
    twitter: string;
    facebook: string;
    instagram: string;
    plural: string;
    singular: string;
  };
  devices: {
    mobile: string;
    desktop: string;
  };
  interactions: {
    like: string;
    comment: string;
    share: string;
    save: string;
    reactions: {
      like: string;
      love: string;
      haha: string;
      wow: string;
      sad: string;
      angry: string;
    };
  };
  actions: {
    close: string;
    backToEditor: string;
  };
};
 drafts: {
  header: {
    title: string;
    description: string;
    newDraft: string;
  };
  filters: {
    all: string;
    drafts: string;
    scheduled: string;
  };
  post: {
    scheduledFor: string;
    timeLeft: {
      days: string;
      hours: string;
    };
    networks: string;
    actions: {
      edit: string;
      reschedule: string;
      duplicate: string;
      delete: string;
    };
    status: {
      draft: string;
      scheduled: string;
      modifiedOn: string;
    };
  };
  empty: {
    title: {
      all: string;
      drafts: string;
      scheduled: string;
    };
    description: {
      drafts: string;
      scheduled: string;
    };
    action: {
      drafts: string;
      scheduled: string;
    };
  };
 };
 pricing: {
  header: {
    title: string;
    description: string;
  };
  plans: {
    premium: {
      name: string;
      price: string;
      period: string;
      features: string[];
      cta: string;
      popular?: boolean;
    };
    pro: {
      name: string;
      price: string;
      period: string;
      features: string[];
      cta: string;
      badge: string;
    };
    enterprise: {
      name: string;
      price: string;
      features: string[];
      cta: string;
    };
  };
  faq: {
    title: string;
    contactEmail: string;
    contactPrefix: string;
    contactAction: string;
    consultFaq: string;
  };
};
 terms: {
  header: {
    title: string;
    description: string;
  };
  platforms: {
    title: string;
  };
  tabs: {
    privacy: string;
    terms: string;
  };
  privacy: {
    title: string;
    highlights: string[];
    viewFull: string;
  };
  api: {
    title: string;
    compliance: string[];
    documentation: string;
  };
  usage: {
    title: string;
    general: {
      title: string;
      content: string;
    };
    responsibilities: {
      title: string;
      content: string;
    };
  };
  compliance: {
    title: string;
    api: {
      title: string;
      content: string;
    };
    security: {
      title: string;
      content: string;
    };
  };
  contact: {
    question: string;
    action: string;
  };
};
 support: {
  header: {
    title: string;
    description: string;
  };
  channels: {
    chat: {
      title: string;
      description: string;
      action: string;
    };
    email: {
      title: string;
      description: string;
      action: string;
    };
    phone: {
      title: string;
      description: string;
      action: string;
    };
  };
  faq: {
    title: string;
    searchPlaceholder: string;
    scheduling: {
      question: string;
      answer: string;
    };
    networks: {
      question: string;
      answer: string;
    };
    media: {
      question: string;
      answer: string;
    };
    manage: {
      question: string;
      answer: string;
    };
  };
  tickets: {
    title: string;
    newTicket: string;
    linkedinIssue: string;
    schedulingQuestion: string;
    resolved: string;
    pending: string;
  };
};
 common: {
   loading: string;
 };
 dashboard: {
   navigation: {
     compose: string;
     scheduled: string;
     networks: string;
   };
   scheduled: {
     title: string;
     empty: string;
   };
 };
 cta: {
   heading: string;
   subheading: string;
   button: string;
 };
 navigation: {
   publisher: string;
   drafts: string;
   upgrade: string;
   new: string;
   support: string;
   terms: string;
   notifications: string;
 };
 uploader: {
   selectFile: {
     initial: string;
     selected: string;
     noFile: string;
   };
 };
 networks: {
   title: string;
   description: string;
   status: {
     connected: string;
     disconnected: string;
   };
   actions: {
     connect: string;
     disconnect: string;
   };
 };
 errors: {
   connectionError: string;
 };
 editor: {
   socialNetworks: {
     title: string;
     notConnected: string;
   };
   content: {
     placeholder: string;
   };
   media: {
     selected: string;
     selectedMultiple: string;
     fileSelect: string;
     noFileSelected: string;
     videoLimitError: string;
     videoSizeError: string;
     videoAloneError: string;
     removeMedia: string;
   };
   scheduling: {
     enable: string;
     date: string;
     time: string;
   };
   networks: {
     publishOn: string;
     publishOnMultiple: string;
   };
   actions: {
     saveDraft: string;
     publish: string;
     schedule: string;
     publishing: string;
     preview: string;
     saveAsDraft: string;
   };
   alerts: {
    error: string;
    selectNetwork: string;
    scheduleTimeRequired: string;
    schedulingSuccess: string;
    publishingSuccess: string;
    draftSoon: string;
    connectNetwork: string;
    uploadFailed: string;
    invalidFormat: string;
    publishFailed: string;
    publishSuccess: string;
    unknownError: string;
    publishError: string;
    generalError: string;
    emptyContent: string;
    saveDraftError: string;
  };
 };
}

export const dictionaries: Record<ValidLocale, Dictionary> = {
 en: {
   editor: {
     socialNetworks: {
       title: "Social Networks",
       notConnected: "(Not connected)"
     },
     content: {
       placeholder: "What would you like to share?"
     },
     media: {
       selected: "1 media selected",
       selectedMultiple: "media selected",
       fileSelect: "Select files",
       noFileSelected: "No file selected",
       videoLimitError: "Only MP4 videos are supported",
       videoSizeError: "Videos must be less than 200MB",
       videoAloneError: "A video must be published alone, without other media",
       removeMedia: "Remove media"
     },
     scheduling: {
       enable: "Schedule post",
       date: "Date",
       time: "Time"
     },
     networks: {
       publishOn: "Publishing on 1 network",
       publishOnMultiple: "Publishing on {count} networks"
     },
     actions: {
       saveDraft: "Save as draft",
       publish: "Publish",
       schedule: "Schedule",
       publishing: "Publishing...",
       preview: "Preview",
       saveAsDraft: "Save as draft"
     },
     alerts: {
      error: "Error:",
      selectNetwork: "Please select at least one social network",
      scheduleTimeRequired: "Please set a date and time for the scheduled post",
      schedulingSuccess: "Posts scheduled successfully!",
      publishingSuccess: "Successfully published on {count} network(s)!",
      draftSoon: "Coming soon",
      connectNetwork: "Please connect to this social network first",
      uploadFailed: "Upload failed",
      invalidFormat: "Invalid response format",
      publishFailed: "Failed to publish on",
      publishSuccess: "Successfully published on",
      unknownError: "Unknown error",
      publishError: "Publishing error",
      generalError: "An error occurred during publication",
      emptyContent: "Content cannot be empty",
      saveDraftError: "Failed to save draft"
     }
   },
   common: {
     loading: "Loading..."
   },
   networks: {
     title: "Social Networks",
     description: "Connect your social networks to publish content from Publisher",
     status: {
       connected: "Connected",
       disconnected: "Not connected"
     },
     actions: {
       connect: "Connect",
       disconnect: "Disconnect"
     }
   },
   errors: {
     connectionError: "Connection error:"
   },
   components: {
     progress: {
       uploading: 'Uploading...',
       processing: 'Processing video...',
       completed: 'Completed!',
       failed: 'Failed'
     }
   },
   preview: {
    title: "Post Preview",
    demoMode: "Demo mode enabled",
    scheduledFor: "Scheduled for",
    immediatePublication: "Immediate publication",
    publishingOn: "Publishing on",
    networks: {
      linkedin: "LinkedIn",
      twitter: "Twitter",
      facebook: "Facebook",
      instagram: "Instagram",
      plural: "networks",
      singular: "network"
    },
    devices: {
      mobile: "Mobile",
      desktop: "Desktop"
    },
    interactions: {
      like: "Like",
      comment: "Comment",
      share: "Share",
      save: "Save",
      reactions: {
        like: "Like",
        love: "Love",
        haha: "Haha",
        wow: "Wow",
        sad: "Sad",
        angry: "Angry"
      }
    },
    actions: {
      close: "Close preview",
      backToEditor: "Back to editor"
    }
  },
   drafts: {
    header: {
      title: "My Drafts",
      description: "Manage your drafts and scheduled posts",
      newDraft: "New draft"
    },
    filters: {
      all: "All",
      drafts: "Drafts",
      scheduled: "Scheduled"
    },
    post: {
      scheduledFor: "Scheduled for",
      timeLeft: {
        days: "In {count} day(s)",
        hours: "In {count} hour(s)"
      },
      networks: "{count} network(s)",
      actions: {
        edit: "Edit",
        reschedule: "Reschedule",
        duplicate: "Duplicate",
        delete: "Delete"
      },
      status: {
        draft: "Draft",
        scheduled: "Scheduled",
        modifiedOn: "Modified on"
      }
    },
    empty: {
      title: {
        all: "No content",
        drafts: "No drafts",
        scheduled: "No scheduled posts"
      },
      description: {
        drafts: "Start creating your first post",
        scheduled: "Schedule your first post"
      },
      action: {
        drafts: "Create a draft",
        scheduled: "Schedule a post"
      }
    }
   },
   pricing: {
    header: {
      title: "Choose the plan that works for you",
      description: "All our offers include a 14-day free trial. No credit card required."
    },
    plans: {
      premium: {
        name: "Premium",
        price: "19",
        period: "/month",
        features: [
          "Publish on 2 social networks",
          "5 scheduled posts",
          "Basic analytics",
          "Email support",
          "1 user"
        ],
        cta: "Start free trial"
      },
      pro: {
        name: "Pro",
        price: "49",
        period: "/month",
        features: [
          "Publish on 4 social networks",
          "Unlimited scheduled posts",
          "Advanced analytics",
          "Priority support",
          "3 users",
          "Advanced customization",
          "Export statistics",
          "Hashtag suggestions"
        ],
        cta: "Start free trial",
        badge: "MOST POPULAR"
      },
      enterprise: {
        name: "Enterprise",
        price: "Custom",
        features: [
          "Publish on all networks",
          "Unlimited scheduled posts",
          "Real-time analytics",
          "24/7 dedicated support",
          "Unlimited users",
          "Custom API",
          "Custom training",
          "Dedicated account manager",
          "Guaranteed SLA"
        ],
        cta: "Contact sales team"
      }
    },
    faq: {
      title: "Questions?",
      contactEmail: "support@publify.com",
      contactPrefix: "Or contact us directly at",
      contactAction: "Check our FAQ",
      consultFaq: "Check our FAQ"
    }
  }, 
   terms: {
    header: {
      title: "Security & Compliance",
      description: "Our commitment to protecting your data and respecting industry standards"
    },
    platforms: {
      title: "Official and Certified Integrations with"
    },
    tabs: {
      privacy: "Privacy Policy",
      terms: "Terms of Use"
    },
    privacy: {
      title: "Data Protection",
      highlights: [
        "GDPR-compliant data protection",
        "End-to-end encryption of sensitive data",
        "No data sharing with unauthorized third parties",
        "Complete control over your personal data",
        "Transparency in data usage"
      ],
      viewFull: "View full policy"
    },
    api: {
      title: "API Usage",
      compliance: [
        "Strict compliance with API terms of use",
        "Secure OAuth 2.0 authentication",
        "Rate limits respected",
        "Secure access token storage",
        "Regular permissions audit"
      ],
      documentation: "Technical documentation"
    },
    usage: {
      title: "Service Usage",
      general: {
        title: "1. General Terms",
        content: "By using Publify, you agree to comply with our terms of use and those of connected social media platforms. Our service acts as an intermediary to facilitate content publishing on these platforms."
      },
      responsibilities: {
        title: "2. Responsibilities",
        content: "Users are responsible for the content they publish through our platform. We reserve the right to suspend or terminate accounts that do not comply with our terms of use."
      }
    },
    compliance: {
      title: "Compliance & Security",
      api: {
        title: "3. API Usage",
        content: "We use official social network APIs in strict compliance with their terms of use. This includes rate limits, access permissions, and data storage practices."
      },
      security: {
        title: "4. Data Security",
        content: "We implement robust security measures to protect your data and access tokens. All communications are encrypted, and we follow industry best practices for security."
      }
    },
    contact: {
      question: "Questions about our terms of use or privacy policy?",
      action: "Contact our legal team"
    }
  },
   support: {
    header: {
      title: "How can we help you?",
      description: "Explore our help center or contact our support team with any questions."
    },
    channels: {
      chat: {
        title: "Live Chat",
        description: "Chat with our support team in real time.",
        action: "Start a conversation"
      },
      email: {
        title: "Email Support",
        description: "We respond within 24 hours.",
        action: "Send an email"
      },
      phone: {
        title: "Phone Support",
        description: "For our Premium and Enterprise clients.",
        action: "View number"
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      searchPlaceholder: "Search in FAQ...",
      scheduling: {
        question: "How do I schedule a post?",
        answer: "To schedule a post, create your content then click 'Schedule' at the bottom of the editor. You can then choose your desired publication date and time."
      },
      networks: {
        question: "How do I connect my social networks?",
        answer: "Go to the 'Social Networks' tab in your dashboard. Click 'Connect' for each social network you want to add and follow the authentication steps."
      },
      media: {
        question: "What are the maximum media sizes?",
        answer: "Images can be up to 10MB and videos up to 200MB. We support JPG, PNG, and MP4 formats."
      },
      manage: {
        question: "How do I manage my scheduled posts?",
        answer: "All your scheduled posts are visible in the 'Scheduled' tab. You can edit or cancel them until their publication time."
      }
    },
    tickets: {
      title: "Your Recent Tickets",
      newTicket: "New ticket",
      linkedinIssue: "LinkedIn Connection Issue",
      schedulingQuestion: "Question about scheduling",
      resolved: "Resolved",
      pending: "Pending"
    }
  },
   uploader: {
     selectFile: {
       initial: "Select files",
       selected: "File selected",
       noFile: "No file chosen"
     }
   },
   navigation: {
     publisher: "Publisher",
     drafts: "My Drafts",
     upgrade: "Upgrade",
     new: "New", 
     support: "Support",
     terms: "Terms",
     notifications: "Notifications"
   },
   auth: {
    tryFree: "Try for free",
    signInWithLinkedIn: "Sign in with LinkedIn",
    signIn: {
      title: "Sign in",
      email: "Email",
      username: "Username",
      password: "Password",
      button: "Sign in",
      socialText: "Or Sign in with social platforms"
    },
    signUp: {
      title: "Sign up",
      name: "Name",
      username: "Username",
      email: "Email",
      password: "Password",
      button: "Sign up",
      socialText: "Or Sign up with social platforms"
    },
    panels: {
      left: {
        title: "New here?",
        description: "Join our community and start sharing your content across multiple platforms with ease!",
        button: "Sign up"
      },
      right: {
        title: "One of us?",
        description: "Welcome back! Sign in to continue managing your social media presence.",
        button: "Sign in"
      }
    },
    social: {
      linkedin: "Sign in with LinkedIn",
      facebook: "Sign in with Facebook",
      google: "Sign in with Google",
      twitter: "Sign in with Twitter"
    }
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
   dashboard: {
     navigation: {
       compose: "Compose",
       scheduled: "Scheduled",
       networks: "Social Networks"
     },
     scheduled: {
       title: "Scheduled Posts",
       empty: "No scheduled posts"
     }
   },
   cta: {
     heading: "Ready to transform your social presence?",
     subheading: "Join thousands of users who trust Publify for their social media management.",
     button: "Get started for free"
   }
 },
 fr: {
   editor: {
     socialNetworks: {
       title: "Réseaux sociaux",
       notConnected: "(Non connecté)"
     },
     content: {
       placeholder: "Que souhaitez-vous partager ?"
     },
     media: {
       selected: "1 média sélectionné",
       selectedMultiple: "médias sélectionnés",
       fileSelect: "Sélect. fichiers",
       noFileSelected: "Aucun fichier sélectionné",
       videoLimitError: "Seules les vidéos MP4 sont supportées",
       videoSizeError: "Les vidéos doivent faire moins de 200MB",
       videoAloneError: "Une vidéo doit être publiée seule, sans autres médias",
       removeMedia: "Supprimer le média"
     },
     scheduling: {
       enable: "Programmer la publication",
       date: "Date",
       time: "Heure"
     },
     networks: {
       publishOn: "Publication sur 1 réseau",
       publishOnMultiple: "Publication sur {count} réseaux"
     },
     actions: {
       saveDraft: "Enregistrer comme brouillon",
       publish: "Publier",
       schedule: "Programmer",
       publishing: "Publication en cours...",
       preview: "Prévisualiser",
       saveAsDraft: "Enregistrer comme brouillon"
     },
     alerts: {
      error: "Erreur :",
      selectNetwork: "Veuillez sélectionner au moins un réseau social",
      scheduleTimeRequired: "Veuillez définir une date et une heure pour la publication programmée",
      schedulingSuccess: "Publications programmées avec succès !",
      publishingSuccess: "Publications réussies sur {count} réseau(x) !",
      draftSoon: "Fonctionnalité à venir",
      connectNetwork: "Veuillez d'abord vous connecter à ce réseau social",
      uploadFailed: "Échec de l'upload",
      invalidFormat: "Format de réponse invalide",
      publishFailed: "Échec de la publication sur",
      publishSuccess: "Publication réussie sur",
      unknownError: "Erreur inconnue",
      publishError: "Erreur de publication",
      generalError: "Une erreur est survenue lors de la publication",
      emptyContent: "Le contenu ne peut pas être vide",
      saveDraftError: "Échec de l'enregistrement du brouillon"
     }
   },
   common: {
     loading: "Chargement..."
   },
   networks: {
     title: "Réseaux sociaux",
     description: "Connectez vos réseaux sociaux pour publier du contenu depuis Publisher",
     status: {
       connected: "Connecté",
       disconnected: "Non connecté"
     },
     actions: {
       connect: "Se connecter",
       disconnect: "Se déconnecter"
     }
   },
   errors: {
     connectionError: "Erreur de connexion:"
   },
   components: {
     progress: {
       uploading: 'Upload en cours...',
       processing: 'Traitement de la vidéo...',
       completed: 'Terminé !',
       failed: 'Échec'
     }
   },
   preview: {
    title: "Prévisualisation du post",
    demoMode: "Mode démonstration activé",
    scheduledFor: "Programmé pour le",
    immediatePublication: "Publication immédiate",
    publishingOn: "Publication sur",
    networks: {
      linkedin: "LinkedIn",
      twitter: "Twitter",
      facebook: "Facebook",
      instagram: "Instagram",
      plural: "réseaux",
      singular: "réseau"
    },
    devices: {
      mobile: "Mobile",
      desktop: "Bureau"
    },
    interactions: {
      like: "J'aime",
      comment: "Commenter",
      share: "Partager",
      save: "Enregistrer",
      reactions: {
        like: "J'aime",
        love: "J'adore",
        haha: "Haha",
        wow: "Wow",
        sad: "Triste",
        angry: "Grr"
      }
    },
    actions: {
      close: "Fermer la prévisualisation",
      backToEditor: "Retour à l'éditeur"
    }
  },
   drafts: {
    header: {
      title: "Mes Brouillons",
      description: "Gérez vos brouillons et publications programmées",
      newDraft: "Nouveau brouillon"
    },
    filters: {
      all: "Tous",
      drafts: "Brouillons",
      scheduled: "Programmés"
    },
    post: {
      scheduledFor: "Programmé pour le",
      timeLeft: {
        days: "Dans {count} jour(s)",
        hours: "Dans {count} heure(s)"
      },
      networks: "{count} réseau(x)",
      actions: {
        edit: "Modifier",
        reschedule: "Reprogrammer",
        duplicate: "Dupliquer", 
        delete: "Supprimer"
      },
      status: {
        draft: "Brouillon",
        scheduled: "Programmé",
        modifiedOn: "Modifié le"
      }
    },
    empty: {
      title: {
        all: "Aucun contenu",
        drafts: "Aucun brouillon",
        scheduled: "Aucune publication programmée"
      },
      description: {
        drafts: "Commencez à créer votre première publication",
        scheduled: "Programmez votre première publication"
      },
      action: {
        drafts: "Créer un brouillon",
        scheduled: "Programmer une publication"
      }
    }
  },
   pricing: {
    header: {
      title: "Choisissez le plan qui vous correspond",
      description: "Toutes nos offres incluent 14 jours d'essai gratuit. Pas de carte bancaire requise."
    },
    plans: {
      premium: {
        name: "Premium",
        price: "19",
        period: "/mois",
        features: [
          "Publication sur 2 réseaux sociaux",
          "5 publications programmées",
          "Analytics basiques",
          "Support email",
          "1 utilisateur"
        ],
        cta: "Commencer l'essai gratuit"
      },
      pro: {
        name: "Pro",
        price: "49",
        period: "/mois",
        features: [
          "Publication sur 4 réseaux sociaux",
          "Publications programmées illimitées",
          "Analytics avancés",
          "Support prioritaire",
          "3 utilisateurs",
          "Personnalisation avancée",
          "Export des statistiques",
          "Suggestions d'hashtags"
        ],
        cta: "Commencer l'essai gratuit",
        badge: "PLUS POPULAIRE"
      },
      enterprise: {
        name: "Entreprise",
        price: "Sur mesure",
        features: [
          "Publication sur tous les réseaux",
          "Publications programmées illimitées",
          "Analytics en temps réel",
          "Support dédié 24/7",
          "Utilisateurs illimités",
          "API personnalisée",
          "Formation personnalisée",
          "Account manager dédié",
          "SLA garanti"
        ],
        cta: "Contacter l'équipe commerciale"
      }
    },
    faq: {
      title: "Des questions ?",
      contactEmail: "support@publify.com",
      contactPrefix: "Ou contactez-nous directement à",
      contactAction: "Consultez notre FAQ",
      consultFaq: "Consultez notre FAQ"
    }
  },
   terms: {
    header: {
      title: "Sécurité & Conformité",
      description: "Notre engagement pour la protection de vos données et le respect des standards de l'industrie"
    },
    platforms: {
      title: "Intégrations officielles et certifiées avec"
    },
    tabs: {
      privacy: "Politique de confidentialité",
      terms: "Conditions d'utilisation"
    },
    privacy: {
      title: "Protection des données",
      highlights: [
        "Protection des données conformément au RGPD",
        "Chiffrement de bout en bout des données sensibles",
        "Aucun partage de données avec des tiers non autorisés",
        "Contrôle total sur vos données personnelles",
        "Transparence sur l'utilisation des données"
      ],
      viewFull: "Voir la politique complète"
    },
    api: {
      title: "Utilisation des APIs",
      compliance: [
        "Respect strict des conditions d'utilisation des APIs",
        "Authentification sécurisée OAuth 2.0",
        "Limites de taux respectées",
        "Stockage sécurisé des tokens d'accès",
        "Audit régulier des permissions"
      ],
      documentation: "Documentation technique"
    },
    usage: {
      title: "Utilisation du service",
      general: {
        title: "1. Conditions générales",
        content: "En utilisant Publify, vous acceptez de respecter nos conditions d'utilisation ainsi que celles des plateformes de médias sociaux connectées. Notre service agit comme un intermédiaire pour faciliter la publication de contenu sur ces plateformes."
      },
      responsibilities: {
        title: "2. Responsabilités",
        content: "Les utilisateurs sont responsables du contenu qu'ils publient via notre plateforme. Nous nous réservons le droit de suspendre ou de résilier les comptes qui ne respectent pas nos conditions d'utilisation."
      }
    },
    compliance: {
      title: "Conformité & Sécurité",
      api: {
        title: "3. Utilisation des APIs",
        content: "Nous utilisons les APIs officielles des réseaux sociaux dans le strict respect de leurs conditions d'utilisation. Cela inclut les limites de taux, les permissions d'accès et les pratiques de stockage des données."
      },
      security: {
        title: "4. Sécurité des données",
        content: "Nous mettons en œuvre des mesures de sécurité robustes pour protéger vos données et vos tokens d'accès. Toutes les communications sont chiffrées et nous suivons les meilleures pratiques de l'industrie en matière de sécurité."
      }
    },
    contact: {
      question: "Des questions sur nos conditions d'utilisation ou notre politique de confidentialité ?",
      action: "Contactez notre équipe juridique"
    }
  },
   support: {
    header: {
      title: "Comment pouvons-nous vous aider ?",
      description: "Explorez notre centre d'aide ou contactez notre équipe de support pour toute question."
    },
    channels: {
      chat: {
        title: "Chat en direct",
        description: "Discutez avec notre équipe de support en temps réel.",
        action: "Démarrer une conversation"
      },
      email: {
        title: "Support email",
        description: "Nous répondons sous 24h.",
        action: "Envoyer un email"
      },
      phone: {
        title: "Support téléphonique",
        description: "Pour nos clients Premium et Entreprise.",
        action: "Voir le numéro"
      }
    },
    faq: {
      title: "Questions fréquentes",
      searchPlaceholder: "Rechercher dans la FAQ...",
      scheduling: {
        question: "Comment programmer une publication ?",
        answer: "Pour programmer une publication, créez d'abord votre contenu puis cliquez sur 'Programmer' en bas de l'éditeur. Vous pourrez alors choisir la date et l'heure de publication souhaitées."
      },
      networks: {
        question: "Comment connecter mes réseaux sociaux ?",
        answer: "Rendez-vous dans l'onglet 'Réseaux sociaux' de votre tableau de bord. Cliquez sur 'Connecter' pour chaque réseau social que vous souhaitez ajouter et suivez les étapes d'authentification."
      },
      media: {
        question: "Quelle est la taille maximale des médias ?",
        answer: "Les images peuvent faire jusqu'à 10MB et les vidéos jusqu'à 200MB. Nous supportons les formats JPG, PNG, et MP4."
      },
      manage: {
        question: "Comment gérer mes publications programmées ?",
        answer: "Toutes vos publications programmées sont visibles dans l'onglet 'Programmés'. Vous pouvez les modifier ou les annuler jusqu'à leur publication."
      }
    },
    tickets: {
      title: "Vos tickets récents",
      newTicket: "Nouveau ticket",
      linkedinIssue: "Problème de connexion LinkedIn",
      schedulingQuestion: "Question sur la programmation",
      resolved: "Résolu",
      pending: "En attente"
    }
  },
   navigation: {
     publisher: "Publisher",
     drafts: "Mes Brouillons",
     upgrade: "Upgrade",
     new: "New",
     support: "Support", 
     terms: "Termes",
     notifications: "Notifications"
   },
   auth: {
    tryFree: "Essayer gratuitement",
    signInWithLinkedIn: "Se connecter avec LinkedIn",
    signIn: {
      title: "Connexion",
      email: "Email",
      username: "Nom d'utilisateur",
      password: "Mot de passe",
      button: "Se connecter",
      socialText: "Ou se connecter avec"
    },
    signUp: {
      title: "Inscription",
      name: "Nom",
      username: "Nom d'utilisateur",
      email: "Email",
      password: "Mot de passe",
      button: "S'inscrire",
      socialText: "Ou s'inscrire avec"
    },
    panels: {
      left: {
        title: "Nouveau ici ?",
        description: "Rejoignez notre communauté et commencez à partager votre contenu sur plusieurs plateformes en toute simplicité !",
        button: "S'inscrire"
      },
      right: {
        title: "Déjà membre ?",
        description: "Bienvenue ! Connectez-vous pour continuer à gérer votre présence sur les réseaux sociaux.",
        button: "Se connecter"
      }
    },
    social: {
      linkedin: "Se connecter avec LinkedIn",
      facebook: "Se connecter avec Facebook",
      google: "Se connecter avec Google",
      twitter: "Se connecter avec Twitter"
    }
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
   uploader: {
     selectFile: {
       initial: "Sélectionner fichiers",
       selected: "Fichier sélectionné",
       noFile: "Aucun fichier choisi"
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
   dashboard: {
     navigation: {
       compose: "Composer",
       scheduled: "Programmés",
       networks: "Réseaux sociaux"
     },
     scheduled: {
       title: "Publications programmées",
       empty: "Aucune publication programmée"
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