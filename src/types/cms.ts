export interface ReassuranceMetric {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
}

export interface CategoryCardItem {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description?: string;
  badge?: string;
}

export interface EngagementPillar {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface CmsContent {
  lastUpdated: string;
  publishedAt?: string;
  hasUnpublishedChanges?: boolean;

  header: {
    reassuranceItems: string[];
    phoneDisplay: string;
    whatsappNumber: string;
    email: string;
    tagline: string;
  };

  hero: {
    headline: string;
    highlightWord: string;
    subheadline: string;
    backgroundImage: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    metrics: ReassuranceMetric[];
  };

  categoryCards: CategoryCardItem[];

  pillars: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: EngagementPillar[];
  };

  ctaBanner: {
    title: string;
    subtitle: string;
    buttonText: string;
    whatsappText: string;
  };

  footer: {
    aboutText: string;
    addressCasablanca: string;
    phoneCasablanca: string;
    addressAgadir: string;
    phoneAgadir: string;
    email: string;
    hours: string;
    copyrightText: string;
  };

  servicesPage?: {
    title: string;
    subtitle: string;
    bannerImage: string;
  };

  aboutPage?: {
    title: string;
    subtitle: string;
    missionText: string;
  };
}

export const DEFAULT_CMS_CONTENT: CmsContent = {
  lastUpdated: "2026-11-26T12:00:00.000Z",
  publishedAt: "2026-11-26T12:00:00.000Z",
  hasUnpublishedChanges: false,

  header: {
    reassuranceItems: [
      "2 500+ Références en catalogue",
      "ISO & CE Certificats & Traçabilité",
      "24 / 48h Livraison partout au Maroc"
    ],
    phoneDisplay: "06 79 70 62 24",
    whatsappNumber: "212679706224",
    email: "commercial@robolab-tech.com",
    tagline: "Votre partenaire en solutions de laboratoire"
  },

  hero: {
    headline: "Votre partenaire en solutions",
    highlightWord: "de laboratoire",
    subheadline:
      "Innovation, fiabilité et performance au service des laboratoires de contrôle qualité, recherche et industrie au Maroc.",
    backgroundImage: "/images/hero-robolab-lab.jpg",
    primaryButtonText: "Découvrir notre catalogue",
    primaryButtonLink: "/catalogue",
    secondaryButtonText: "Nous contacter",
    secondaryButtonLink: "/contact",
    metrics: [
      {
        id: "m1",
        icon: "Package",
        title: "2 500+",
        subtitle: "Références en catalogue"
      },
      {
        id: "m2",
        icon: "ShieldCheck",
        title: "ISO & CE",
        subtitle: "Certificats & Traçabilité"
      },
      {
        id: "m3",
        icon: "Truck",
        title: "24 / 48h",
        subtitle: "Livraison partout au Maroc"
      }
    ]
  },

  categoryCards: [
    {
      id: "balances",
      name: "Balances & Pesage de Précision",
      slug: "balances",
      icon: "Scale",
      description: "Analytiques, semi-micro et industrielles",
      badge: "Garantie 2 ans"
    },
    {
      id: "appareils",
      name: "Instruments & Appareils de Mesure",
      slug: "appareils",
      icon: "Gauge",
      description: "pH-mètres, réfractomètres, viscosimètres",
      badge: "Haute Précision"
    },
    {
      id: "optique",
      name: "Équipements & Appareils de Laboratoire",
      slug: "optique",
      icon: "Microscope",
      description: "Microscopes, hottes, centrifugeuses",
      badge: "Certifié CE"
    },
    {
      id: "consommables",
      name: "Verrerie & Consommables Scientifiques",
      slug: "consommables",
      icon: "FlaskConical",
      description: "Béchers, fioles borosilicaté 3.3, embouts",
      badge: "Stock Permanent"
    },
    {
      id: "chimie",
      name: "Produits Chimiques & Réactifs Analytiques",
      slug: "chimie",
      icon: "Atom",
      description: "Étalons certifiés, solvants purs, réactifs",
      badge: "Qualité Certifiée"
    }
  ],

  pillars: {
    sectionTitle: "Pourquoi Choisir ROBOLAB TECHNOLOGY ?",
    sectionSubtitle:
      "Un partenaire d'excellence au service des laboratoires scientifiques, pharmaceutiques et industriels partout au Maroc.",
    items: [
      {
        id: "p1",
        title: "Instruments Certifiés & Traçables",
        description:
          "Tous nos équipements sont conformes aux normes internationales ISO, BPF et CE avec certificats de conformité d'usine.",
        icon: "Award"
      },
      {
        id: "p2",
        title: "Service Après-Vente & Métrologie",
        description:
          "Nos ingénieurs basés à Casablanca et Agadir assurent l'installation, la qualification IQ/OQ et l'étalonnage sur site.",
        icon: "Wrench"
      },
      {
        id: "p3",
        title: "Disponibilité Immédiate & Stock",
        description:
          "Plus de 2 500 références stockées localement garantissant une expédition express sous 24 à 48 heures ouvrées.",
        icon: "Clock"
      },
      {
        id: "p4",
        title: "Devis Officiel sous 24h",
        description:
          "Traitement rapide de vos demandes de prix avec accompagnement personnalisé et conseils techniques dédiés.",
        icon: "FileCheck"
      }
    ]
  },

  ctaBanner: {
    title: "Un Projet d'Équipement ou Besoin d'un Devis Urgent ?",
    subtitle:
      "Transmettez-nous votre cahier des charges ou contactez directement nos spécialistes par WhatsApp pour une offre sur-mesure sous 24h ouvrées.",
    buttonText: "Demande de Devis en Ligne",
    whatsappText: "WhatsApp Direct : 06 79 70 62 24"
  },

  footer: {
    aboutText:
      "Leader au Maroc dans la fourniture de solutions complètes de laboratoire, instruments de mesure scientifique, balances de haute précision et réactifs analytiques.",
    addressCasablanca: "15 Bd Abdelmoumen, 2ème étage, Casablanca",
    phoneCasablanca: "+212 (0) 522 35 06 66",
    addressAgadir: "Parc Industriel Agadir, Agadir",
    phoneAgadir: "+212 (0) 528 28 88 44",
    email: "commercial@robolab-tech.com",
    hours: "Lun - Ven : 08h30 - 18h00 | Sam : 09h00 - 13h00",
    copyrightText: "© 2026 ROBOLAB TECHNOLOGY. Tous droits réservés. Devis officiel sous 24h."
  },

  servicesPage: {
    title: "Nos Services & Expertise Technique",
    subtitle: "Métrologie, Maintenance Préventive, Qualification IQ/OQ & Aménagement Clé en Main.",
    bannerImage: "/images/hero-lab-tech.jpg"
  },

  aboutPage: {
    title: "À Propos de ROBOLAB TECHNOLOGY",
    subtitle: "Votre référence nationale en équipements de mesure scientifique et matériel de laboratoire.",
    missionText: "Notre mission est d'accompagner les scientifiques, ingénieurs et chercheurs marocains avec du matériel de classe mondiale."
  }
};
