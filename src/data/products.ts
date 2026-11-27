import { Product, Category } from "@/types";

export const CATEGORIES: Category[] = [
  {
    id: "balances",
    name: "Balances & Pesage de Précision",
    slug: "balances",
    description: "Balances analytiques, de précision, dessiccateurs, industrielles et masses étalons certifiées.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    iconName: "Scale",
    itemCount: 42,
    subcategories: [
      "Balances Analytiques (0.1 mg)",
      "Balances de Précision (1 mg / 0.01 g)",
      "Dessiccateurs d'humidité",
      "Balances Industrielles & Plateformes",
      "Masses Étalons & Poids de Contrôle (M1, F1, E2)"
    ]
  },
  {
    id: "mesure",
    name: "Instruments & Appareils de Mesure",
    slug: "mesure",
    description: "Thermomètres, pH-mètres, conductimètres, réfractomètres, spectrophotomètres et luxmètres.",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
    iconName: "Gauge",
    itemCount: 58,
    subcategories: [
      "Thermomètres & Enregistreurs de T°",
      "pH-mètres & Électrodes",
      "Conductimètres & EC-mètres",
      "Réfractomètres numériques & optiques",
      "Spectrophotomètres UV-VIS",
      "Hygromètres & Manomètres"
    ]
  },
  {
    id: "appareils",
    name: "Équipements & Appareils de Laboratoire",
    slug: "appareils",
    description: "Agitateurs, centrifugeuses, étuves de séchage, autoclaves, bains-marie et microscopes.",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80",
    iconName: "Cpu",
    itemCount: 36,
    subcategories: [
      "Agitateurs Magnétiques & Vortex",
      "Centrifugeuses de paillasse",
      "Étuves & Fours de laboratoire",
      "Autoclaves de stérilisation",
      "Bains-marie & Thermostats",
      "Microscopes optiques & digitaux"
    ]
  },
  {
    id: "verrerie",
    name: "Verrerie & Consommables Scientifiques",
    slug: "verrerie",
    description: "Béchers, fioles jaugées, éprouvettes, flacons Duran, micropipettes et embouts stériles.",
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80",
    iconName: "FlaskConical",
    itemCount: 95,
    subcategories: [
      "Béchers & Erlenmeyers Borosilicaté 3.3",
      "Fioles jaugées Classe A",
      "Éprouvettes & Pipettes graduées",
      "Flacons Duran & Col Large",
      "Micropipettes & Embouts",
      "Boîtes de Pétri & Consommables Plastique"
    ]
  },
  {
    id: "chimie",
    name: "Produits Chimiques & Réactifs",
    slug: "chimie",
    description: "Solvants de haute pureté, acides purs, réactifs d'analyse et milieux de culture microbiologiques.",
    image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=800&q=80",
    iconName: "Atom",
    itemCount: 64,
    subcategories: [
      "Solvants purs (Méthanol, Éthanol, Acétone HPLC)",
      "Acides & Bases de laboratoire",
      "Solutions étalons & tampons pH certifiés",
      "Milieux de culture déshydratés & prêts à l'emploi",
      "Colorants & Indicateurs colorimétriques"
    ]
  },
  {
    id: "mobilier",
    name: "Mobilier Technique & Sécurité",
    slug: "mobilier",
    description: "Paillasses modulaires de laboratoire, hottes aspirantes, armoires de sécurité coupe-feu.",
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80",
    iconName: "ShieldCheck",
    itemCount: 22,
    subcategories: [
      "Armoires de sécurité pour produits inflammables (EN 14470-1)",
      "Hottes aspirantes & Sorbonnes à flux laminaire",
      "Paillasses sèches & humides en grès ou résine",
      "Douches de sécurité & Laveurs d'yeux"
    ]
  }
];

export const PRODUCTS: Product[] = [
  // --- BALANCES ---
  {
    id: "bal-01",
    name: "Balance Analytique Semi-Micro Robolab Pro 220g / 0.0001g",
    slug: "balance-analytique-semi-micro-robolab-pro-220g",
    brand: "Robolab Pro",
    category: "balances",
    categoryLabel: "Balances & Pesage",
    subcategory: "Balances Analytiques (0.1 mg)",
    reference: "RB-BAL-220AM",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Balance analytique haute précision avec chambre de pesée vitrée motorisée et calibrage interne automatique.",
    description: "La balance analytique Robolab Pro 220g offre une précision au dixième de milligramme (0,1 mg) adaptée aux laboratoires pharmaceutiques, de recherche et de contrôle qualité. Équipée d'un calibrage interne automatique en fonction des variations de température ambiante (isoCAL) et d'un écran tactile couleur interactif avec interface USB et RS232 pour raccordement direct GLP/GMP.",
    specifications: [
      { name: "Portée maximale", value: "220 g" },
      { name: "Précision de lecture (d)", value: "0.0001 g (0.1 mg)" },
      { name: "Répétabilité", value: "0.0001 g" },
      { name: "Diamètre du plateau", value: "Ø 90 mm en acier inoxydable" },
      { name: "Temps de stabilisation", value: "≤ 2.5 secondes" },
      { name: "Calibrage", value: "Interne motorisé automatique" },
      { name: "Connectivité", value: "RS232, USB Type B, conformité BPF/GLP" }
    ],
    features: [
      "Étalonnage automatique interne avec capteur de température",
      "Chambre de pesée en verre antistatique avec portes coulissantes",
      "Conformité pharmacopée européenne et normes ISO 9001",
      "Garantie 2 ans avec certificat d'étalonnage traçable inclus"
    ],
    inStock: true,
    isPopular: true,
    applications: ["Pharmaceutique", "Recherche & Universités", "Contrôle Qualité", "Chimie"],
    variants: [
      { label: "Modèle 120g / 0.1mg", sku: "RB-BAL-120AM" },
      { label: "Modèle 220g / 0.1mg", sku: "RB-BAL-220AM" },
      { label: "Modèle Double Portée 80g/220g", sku: "RB-BAL-DUAL" }
    ]
  },
  {
    id: "bal-02",
    name: "Dessiccateur d'Humidité Halogène 110g / 1mg",
    slug: "dessiccateur-humidite-halogene-110g",
    brand: "Robolab Analytics",
    category: "balances",
    categoryLabel: "Balances & Pesage",
    subcategory: "Dessiccateurs d'humidité",
    reference: "RB-MOIST-110",
    image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Analyseur d'humidité rapide à lampe halogène circulaire pour l'industrie agroalimentaire et minérale.",
    description: "Appareil indispensable pour la détermination rapide et précise du taux d'humidité et de matière sèche dans les échantillons alimentaires (farine, huiles, céréales, épices) et industriels. Chauffage homogène par quartz halogène jusqu'à 200°C avec enregistrement de courbes de dessiccation.",
    specifications: [
      { name: "Capacité maximale", value: "110 g" },
      { name: "Résolution humidité", value: "0.01 %" },
      { name: "Précision de pesage", value: "0.001 g (1 mg)" },
      { name: "Plage de température", value: "40°C à 200°C (pas de 1°C)" },
      { name: "Source de chauffe", value: "Lampe halogène circulaire 400W" },
      { name: "Modes d'arrêt", value: "Automatique (perte constante), Temporisé, Manuel" }
    ],
    features: [
      "Calcul automatique % Humidité, % Matière sèche, Rapport",
      "Mémoire intégrée de 20 méthodes de séchage programmables",
      "Livré avec 50 coupelles d'échantillonnage en aluminium",
      "Rapport conforme aux normes HACCP et ISO 17025"
    ],
    inStock: true,
    isPopular: true,
    applications: ["Agroalimentaire", "Céréales & Minoterie", "Plasturgie", "Contrôle Qualité"]
  },
  {
    id: "bal-03",
    name: "Balance Industrielle de Table Inox Étanche IP68",
    slug: "balance-industrielle-inox-ip68",
    brand: "Robolab HeavyDuty",
    category: "balances",
    categoryLabel: "Balances & Pesage",
    subcategory: "Balances Industrielles & Plateformes",
    reference: "RB-IP68-30K",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Balance industrielle tout inox étanche nettoyable à grande eau pour conserveries, abattoirs et ateliers.",
    description: "Structure en acier inoxydable 304L avec indice de protection IP68 intégrale contre les projections d'eau à haute pression et les poussières. Conçue pour les milieux agroalimentaires exigeants au Maroc (conditionnement fruits/légumes, conserveries de poisson, produits laitiers).",
    specifications: [
      { name: "Portée", value: "15 kg / 30 kg au choix" },
      { name: "Précision", value: "1 g (version 15kg) / 2 g (version 30kg)" },
      { name: "Dimensions plateau", value: "300 x 230 mm Inox poli" },
      { name: "Protection", value: "IP68 Totalement submersible et étanche" },
      { name: "Alimentation", value: "Batterie interne rechargeable (autonomie 80h)" }
    ],
    features: [
      "Écran double affichage LED haute luminosité (Opérateur & Client)",
      "Fonction pesée de contrôle avec signal sonore (Hi-Ok-Lo)",
      "Pieds réglables antidérapants avec niveau à bulle",
      "Résistance aux agents de nettoyage corrosifs"
    ],
    inStock: true,
    applications: ["Agroalimentaire", "Industrie de la Pêche", "Logistique", "Ateliers Chimiques"],
    variants: [
      { label: "Portée 15 kg (précision 1g)", sku: "RB-IP68-15K" },
      { label: "Portée 30 kg (précision 2g)", sku: "RB-IP68-30K" }
    ]
  },
  {
    id: "bal-04",
    name: "Coffret de Poids Étalons Métrologiques Classe F1 (1mg à 1kg)",
    slug: "coffret-poids-etalons-classe-f1",
    brand: "Robolab Metrology",
    category: "balances",
    categoryLabel: "Balances & Pesage",
    subcategory: "Masses Étalons & Poids de Contrôle (M1, F1, E2)",
    reference: "RB-MASS-F1-BOX",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Jeu complet de masses étalons certifiées en acier inoxydable poli miroir antimagnétique.",
    description: "Coffret de précision indispensable pour l'étalonnage, la vérification périodique et le contrôle quotidien de vos balances de laboratoire. Conforme à la recommandation OIML R111. Livré avec certificat d'étalonnage d'origine traçable aux étalons nationaux/internationaux.",
    specifications: [
      { name: "Classe de précision", value: "F1 (OIML R111)" },
      { name: "Composition", value: "24 pièces de 1 mg à 1000 g" },
      { name: "Matériau", value: "Acier inoxydable austénitique poli miroir" },
      { name: "Magnétisme", value: "Perméabilité magnétique µ < 0.05" },
      { name: "Écrin", value: "Bois noble capitonné avec gants et pinces brucelles" }
    ],
    features: [
      "Certificat d'étalonnage officiel COFRAC/DAkkS/ONSSA compatible",
      "Pince brucelle à embouts protégés pour éviter les dépôts d'oxydes",
      "Traçabilité métrologique complète pour audits ISO 17025 et ISO 9001"
    ],
    inStock: true,
    applications: ["Laboratoires Accrédités", "Métrologie", "Pharmacie", "Industrie"]
  },

  // --- MESURE ---
  {
    id: "mes-01",
    name: "pH-Mètre de Paillasse Multiparamètre Professionnel (pH / mV / °C)",
    slug: "ph-metre-paillasse-multiparametre-pro",
    brand: "Robolab Instruments",
    category: "mesure",
    categoryLabel: "Mesure & Analyse",
    subcategory: "pH-mètres & Électrodes",
    reference: "RB-PH-850",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
    shortDescription: "pH-mètre de paillasse tactile haute précision avec compensation automatique de température et porte-électrode articulé.",
    description: "Le système de mesure pH Robolab 850 offre une résolution au millième de pH (0,001 pH) avec reconnaissance automatique jusqu'à 5 tampons pH standard. Livré prêt à l'emploi avec une électrode combinée en verre rechargeable haute réponse, une sonde de température inox PT1000 et son bras support articulé.",
    specifications: [
      { name: "Plage pH", value: "-2.000 à 20.000 pH" },
      { name: "Résolution pH", value: "0.01 / 0.001 pH commutable" },
      { name: "Plage mV", value: "-2000.0 à +2000.0 mV (Redox/ORP)" },
      { name: "Plage Température", value: "-10.0°C à 110.0°C" },
      { name: "Points d'étalonnage", value: "1 à 5 points avec 3 jeux de tampons mémorisés" },
      { name: "Compensation T°", value: "Automatique (ATC) ou manuelle (MTC)" }
    ],
    features: [
      "Écran LCD graphique rétroéclairé affichant simultanément pH, mV et T°",
      "Indicateur d'état de l'électrode et rappels d'étalonnage",
      "Mémoire 1000 séries de données avec horodatage GLP",
      "Porte-électrode lesté multi-positions inclus"
    ],
    inStock: true,
    isPopular: true,
    applications: ["Agroalimentaire", "Traitement des Eaux", "Chimie", "Cosmétique", "Recherche"]
  },
  {
    id: "mes-02",
    name: "Thermomètre Digital Agroalimentaire de Pénétration Étanche IP67",
    slug: "thermometre-agroalimentaire-penetration-ip67",
    brand: "Robolab Thermo",
    category: "mesure",
    categoryLabel: "Mesure & Analyse",
    subcategory: "Thermomètres & Enregistreurs de T°",
    reference: "RB-THERM-PRO",
    image: "https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Thermomètre à sonde fixe robuste spécial chaîne du froid et contrôles HACCP avec alarme sonore.",
    description: "Conçu pour résister aux environnements exigeants de l'industrie agroalimentaire marocaine (viandes, poissons, produits laitiers, plats préparés). Sonde de pénétration inox fine et robuste pour une mesure instantanée à cœur en moins de 3 secondes.",
    specifications: [
      { name: "Plage de mesure", value: "-50.0°C à +275.0°C" },
      { name: "Précision", value: "± 0.5°C (-30 à +100°C), ± 1°C au-delà" },
      { name: "Indice de protection", value: "IP67 (lavable sous le robinet)" },
      { name: "Temps de réponse (t99)", value: "< 4 secondes dans l'eau" },
      { name: "Longueur de sonde", value: "105 mm en acier inox alimentaire" }
    ],
    features: [
      "Conforme à la norme européenne EN 13485 et démarche HACCP",
      "Alarmes de seuils Mini / Maxi programmables",
      "Fonction Auto-Hold pour figer la valeur stabilisée",
      "Livré avec étui de protection ceinture et certificat d'usine"
    ],
    inStock: true,
    isPopular: true,
    applications: ["Agroalimentaire", "Chambre Froide", "Restauration Collective", "Audit Qualité"]
  },
  {
    id: "mes-03",
    name: "Spectrophotomètre UV-Visible Double Faisceau 190-1100 nm",
    slug: "spectrophotometre-uv-visible-double-faisceau",
    brand: "Robolab Optics",
    category: "mesure",
    categoryLabel: "Mesure & Analyse",
    subcategory: "Spectrophotomètres UV-VIS",
    reference: "RB-SPEC-UV800",
    image: "https://images.unsplash.com/photo-1581093806997-124204d9fa9d?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Spectrophotomètre d'analyse spectrale complet pour dosages quantitatifs, cinétiques et balayage spectral.",
    description: "Système de photométrie de haute performance pour laboratoires de recherche, universités et contrôle qualité industriel. Doté d'une bande passante de 1,8 nm, d'un grand écran couleur tactile autonome et d'un passeur automatique de 4 cuves.",
    specifications: [
      { name: "Plage de longueurs d'onde", value: "190 à 1100 nm" },
      { name: "Bande passante spectrale", value: "1.8 nm" },
      { name: "Précision longueur d'onde", value: "± 0.3 nm" },
      { name: "Gamme photométrique", value: "-0.3 à 3.0 Abs / 0 à 200 %T" },
      { name: "Sources lumineuses", value: "Lampe Deutérium (UV) & Lampe Tungstène-Halogène (Visible)" },
      { name: "Modes", value: "Absorbance, Transmittance, Concentration, Balayage, Cinétique" }
    ],
    features: [
      "Passeur automatique 4 cuves standard 10 mm inclus",
      "Logiciel PC Windows fourni pour traitement avancé des spectres",
      "Stockage direct sur clé USB des courbes et résultats",
      "Contrôle automatique des longueurs d'onde à la mise sous tension"
    ],
    inStock: true,
    applications: ["Biochimie", "Pharmacie", "Analyse des Eaux", "Enseignement Supérieur"]
  },
  {
    id: "mes-04",
    name: "Réfractomètre Numérique Brix / Salinité / Indice de Réfraction",
    slug: "refractometre-numerique-brix-salinite",
    brand: "Robolab OptiBrix",
    category: "mesure",
    categoryLabel: "Mesure & Analyse",
    subcategory: "Réfractomètres numériques & optiques",
    reference: "RB-REF-DIGI",
    image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Réfractomètre de poche étanche avec prisme en saphir et compensation automatique de température (ATC).",
    description: "Mesure instantanée du sucre (Brix), de la densité ou de la salinité en 1 seconde à partir de 2 à 3 gouttes d'échantillon. Idéal pour jus de fruits, miels, confitures, sauces, huiles et fluides d'usinage.",
    specifications: [
      { name: "Échelle de mesure", value: "0.0 à 85.0 % Brix / 1.3330 à 1.5040 nD" },
      { name: "Résolution", value: "0.1 % Brix" },
      { name: "Précision", value: "± 0.2 % Brix" },
      { name: "Compensation T°", value: "ATC intégrée de 10°C à 40°C" },
      { name: "Volume d'échantillon", value: "0.3 ml (2-3 gouttes)" },
      { name: "Prisme", value: "Saphir artificiel avec cuve en inox résistant à l'usure" }
    ],
    features: [
      "Calibrage en 1 touche avec de l'eau distillée",
      "Boîtier étanche IP65 lavable sous l'eau",
      "Écran digital rétroéclairé à double affichage (Brix & T°)",
      "Arrêt automatique après 3 minutes d'inactivité"
    ],
    inStock: true,
    applications: ["Agroalimentaire", "Sucreries & Sodas", "Apiculture", "Contrôle Usinage"]
  },

  // --- APPAREILS DE LABO ---
  {
    id: "app-01",
    name: "Agitateur Magnétique Chauffant Numérique avec Sonde PT1000",
    slug: "agitateur-magnetique-chauffant-numerique-pt1000",
    brand: "Robolab StirTech",
    category: "appareils",
    categoryLabel: "Équipements & Appareils",
    subcategory: "Agitateurs Magnétiques & Vortex",
    reference: "RB-STIR-500D",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Plaque chauffante vitrocéramique résistante aux acides avec contrôle précis de température jusqu'à 380°C.",
    description: "Agitateur professionnel pour solutions jusqu'à 20 Litres. Plaque en vitrocéramique blanche offrant une transmission thermique exceptionnelle et une résistance parfaite contre les solvants et acides agressifs. Livré avec sonde externe PT1000 et statif complet.",
    specifications: [
      { name: "Volume d'agitation max.", value: "20 Litres (H2O)" },
      { name: "Plage de vitesse", value: "100 à 1500 tr/min (RPM)" },
      { name: "Plage de température", value: "Ambiante à 380°C" },
      { name: "Précision de régulation", value: "± 0.5°C avec sonde externe PT1000" },
      { name: "Plaque de chauffe", value: "Vitrocéramique 184 x 184 mm" },
      { name: "Puissance de chauffe", value: "600 W" }
    ],
    features: [
      "Afficheur digital double LCD pour température et vitesse de consigne/réelle",
      "Voyant de sécurité 'Hot Plate' avertissant si la surface dépasse 50°C",
      "Circuit de sécurité indépendant de coupure thermique",
      "Fourni avec statif, pince, sonde PT1000 et barreau magnétique PTFE"
    ],
    inStock: true,
    isPopular: true,
    applications: ["Synthèse Chimique", "Préparation Échantillons", "Biochimie", "Enseignement"]
  },
  {
    id: "app-02",
    name: "Centrifugeuse Universelle de Paillasse 4000 RPM (Capacité 8 x 15ml)",
    slug: "centrifugeuse-universelle-paillasse-4000-rpm",
    brand: "Robolab SpinPro",
    category: "appareils",
    categoryLabel: "Équipements & Appareils",
    subcategory: "Centrifugeuses de paillasse",
    reference: "RB-CENT-4000",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Centrifugeuse clinique et industrielle silencieuse avec moteur sans charbon (brushless) et verrouillage de sécurité.",
    description: "Appareil compact dédié aux séparations d'échantillons sanguins, urinaires, suspensions cellulaires et précipités chimiques. Fonctionnement ultra silencieux (< 56 dB), programmation simple en vitesse (RPM) ou force centrifuge relative (RCF).",
    specifications: [
      { name: "Vitesse maximale", value: "300 à 4000 tr/min (pas de 10 tr/min)" },
      { name: "Accélération max. (RCF)", value: "2200 x g" },
      { name: "Capacité du rotor", value: "8 tubes de 15 ml ou 12 tubes de 10ml / 7ml / 5ml" },
      { name: "Minuterie", value: "1 à 99 minutes ou fonctionnement continu (Hold)" },
      { name: "Moteur", value: "Induction sans balai sans entretien (Brushless)" }
    ],
    features: [
      "Verrouillage électronique sécurisé du couvercle pendant la rotation",
      "Détection automatique de balourd avec arrêt immédiat",
      "Bouton 'Short Spin' pour des impulsions rapides de centrifugation",
      "Livrée complète avec rotor angulaire et adaptateurs pour tubes"
    ],
    inStock: true,
    isPopular: true,
    applications: ["Analyses Médicales", "Vétérinaire", "Biologie Moléculaire", "Recherche"]
  },
  {
    id: "app-03",
    name: "Étuve de Séchage & Stérilisation Universelle à Convection Forcée 53L",
    slug: "etuve-sechage-sterilisation-universelle-53l",
    brand: "Robolab ThermoLab",
    category: "appareils",
    categoryLabel: "Équipements & Appareils",
    subcategory: "Étuves & Fours de laboratoire",
    reference: "RB-OVEN-53L",
    image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Étuve de laboratoire à régulation PID microprocesseur pour séchage, traitement thermique et stérilisation.",
    description: "Chambre interne tout inox 304 résistant à la corrosion avec angles arrondis faciles à nettoyer. Convection d'air forcée assurant une homogénéité thermique remarquable dans tout le volume utile. Régulateur numérique programmable avec temporisation et sécurités de surchauffe.",
    specifications: [
      { name: "Volume utile", value: "53 Litres" },
      { name: "Plage de température", value: "Ambiante +10°C jusqu'à 300°C" },
      { name: "Homogénéité spatiale", value: "± 1.5°C à 150°C" },
      { name: "Régulation", value: "PID microprocesseur avec écran digital" },
      { name: "Clayettes fournies", value: "2 grilles en acier inoxydable amovibles (max 4)" },
      { name: "Circulation d'air", value: "Ventilateur silencieux à vitesse réglable" }
    ],
    features: [
      "Double protection contre la surchauffe classe 2 (DIN 12880)",
      "Joint de porte en silicone résistant aux très hautes températures",
      "Évacuation d'air supérieure avec registre de tirage réglable",
      "Certificat de contrôle d'homogénéité thermique en 9 points fourni"
    ],
    inStock: true,
    applications: ["Industrie Pharmaceutique", "Agroalimentaire", "Matériaux", "Contrôle Qualité"]
  },
  {
    id: "app-04",
    name: "Autoclave Vertical Automatique de Stérilisation 50 Litres",
    slug: "autoclave-vertical-automatique-sterilisation-50l",
    brand: "Robolab SterilPro",
    category: "appareils",
    categoryLabel: "Équipements & Appareils",
    subcategory: "Autoclaves de stérilisation",
    reference: "RB-AUTO-50V",
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Stérilisateur à vapeur d'eau saturée vertical avec cycles automatiques pour solides, liquides et déchets.",
    description: "Conçu pour la stérilisation de verrerie, milieux de culture microbiologiques, instruments chirurgicaux et déchets de laboratoire. Chambre en acier inoxydable de forte épaisseur avec fermeture sécurisée à verrouillage radial et purge d'air automatique contrôlée.",
    specifications: [
      { name: "Volume de cuve", value: "50 Litres (Ø 350 mm x H 520 mm)" },
      { name: "Plage de température", value: "105°C à 134°C" },
      { name: "Pression max.", value: "0.22 MPa (2.2 bar)" },
      { name: "Programmes", value: "Solides, Liquides avec dépressurisation lente, Déchets" },
      { name: "Alimentation", value: "230V / 50Hz - Puissance 3 kW" }
    ],
    features: [
      "Système de verrouillage électromécanique interdisant l'ouverture sous pression",
      "Écran tactile couleur avec affichage synoptique en temps réel (T°, Pression, Cycle)",
      "Fourni avec 2 paniers perforés en acier inox",
      "Homologation CE Directive Équipements sous Pression (PED 2014/68/UE)"
    ],
    inStock: true,
    applications: ["Microbiologie", "Hôpitaux & Cliniques", "Agroalimentaire", "Recherche"]
  },

  // --- VERRERIE ---
  {
    id: "ver-01",
    name: "Béchers Forme Basse Borosilicate 3.3 avec Bec et Graduation (Lot de 10)",
    slug: "bechers-forme-basse-borosilicate-lot-10",
    brand: "Schott Duran / Glassco",
    category: "verrerie",
    categoryLabel: "Verrerie & Consommables",
    subcategory: "Béchers & Erlenmeyers Borosilicaté 3.3",
    reference: "RB-BECH-BORO",
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Béchers en verre borosilicaté de qualité supérieure conforme ISO 3819 avec excellente résistance thermique et chimique.",
    description: "Verrerie de référence pour tout laboratoire scientifique. Le verre borosilicaté 3.3 garantit un coefficient de dilatation très faible, supporte les chocs thermiques élevés et offre une neutralité absolue vis-à-vis des acides, solvants et alcalis.",
    specifications: [
      { name: "Norme de fabrication", value: "DIN 12331, ISO 3819" },
      { name: "Matériau", value: "Verre Borosilicaté 3.3 de première classe hydrolytique" },
      { name: "Graduation", value: "Émail blanc cuit inaltérable avec zone de marquage" },
      { name: "Résistance thermique", value: "Supporte jusqu'à 500°C et chocs thermiques de 100°C" }
    ],
    features: [
      "Parois à épaisseur uniforme réduisant les risques de casse",
      "Bec verseur profilé pour un versement précis sans goutte",
      "Compatible autoclave à 121°C et micro-ondes",
      "Disponible en capacités de 50 ml à 2000 ml"
    ],
    inStock: true,
    isPopular: true,
    applications: ["Laboratoires Généraux", "Chimie", "Enseignement", "Contrôle Qualité"],
    variants: [
      { label: "Capacité 100 ml (Lot de 10)", sku: "RB-BECH-100" },
      { label: "Capacité 250 ml (Lot de 10)", sku: "RB-BECH-250" },
      { label: "Capacité 500 ml (Lot de 10)", sku: "RB-BECH-500" },
      { label: "Capacité 1000 ml (Lot de 6)", sku: "RB-BECH-1000" }
    ]
  },
  {
    id: "ver-02",
    name: "Fioles Jaugées Classe A Verre Clair avec Bouchon Polyéthylène",
    slug: "fioles-jaugees-classe-a-bouchon-pe",
    brand: "Glassco Certified",
    category: "verrerie",
    categoryLabel: "Verrerie & Consommables",
    subcategory: "Fioles jaugées Classe A",
    reference: "RB-FIOL-CLASSA",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Fioles de haute précision volumétrique étalonnées par pesée avec certificat individuel de lot.",
    description: "Indispensables pour la préparation exacte des solutions étalons et réactifs de dosage analytique. Conformes à la norme ISO 1042 avec anneau de jauge bleu permanent indélébile.",
    specifications: [
      { name: "Classe de précision", value: "Classe A conforme ISO 1042" },
      { name: "Tolérance volumétrique", value: "± 0.04 ml (pour fiole 100ml)" },
      { name: "Bouchon", value: "Polyéthylène normalisé étanche avec méplat" },
      { name: "Marquage", value: "Émail bleu cuit avec numéro de lot individuel" }
    ],
    features: [
      "Certificat de conformité de lot téléchargeable",
      "Trait de jauge calibré à 20°C pour un ménisque parfait",
      "Stabilité chimique totale vis-à-vis des solutions étalons"
    ],
    inStock: true,
    applications: ["Pharmacie", "Chimie Analytique", "Contrôle Conformité", "Cosmétique"],
    variants: [
      { label: "Volume 50 ml (Lot de 2)", sku: "RB-FIOL-50" },
      { label: "Volume 100 ml (Lot de 2)", sku: "RB-FIOL-100" },
      { label: "Volume 250 ml (Lot de 2)", sku: "RB-FIOL-250" },
      { label: "Volume 500 ml (Lot de 1)", sku: "RB-FIOL-500" }
    ]
  },
  {
    id: "ver-03",
    name: "Micropipette Ergonomique Monocanal à Volume Variable Autoclavable",
    slug: "micropipette-ergonomique-volume-variable",
    brand: "Robolab PipetPro",
    category: "verrerie",
    categoryLabel: "Verrerie & Consommables",
    subcategory: "Micropipettes & Embouts",
    reference: "RB-PIP-VAR",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Pipette automatique de précision ultra légère avec bouton éjecteur d'embouts et piston amorti.",
    description: "Conçue pour minimiser la fatigue musculaire (RSI) lors des pipetages répétitifs en routine clinique ou moléculaire. Entièrement autoclavable à 121°C sans démontage préalable pour éviter toute contamination croisée.",
    specifications: [
      { name: "Gamme de volumes", value: "Disponible de 0.5-10 µL à 1000-5000 µL" },
      { name: "Précision d'exactitude", value: "± 0.6 % (au volume maximal)" },
      { name: "Répétabilité", value: "≤ 0.2 %" },
      { name: "Stérilisation", value: "Autoclavable intégrale à 121°C (20 min)" },
      { name: "Compatibilité embouts", value: "Universelle (standard Eppendorf, Gilson, etc.)" }
    ],
    features: [
      "Compteur de volume à 4 chiffres haute visibilité",
      "Effort d'éjection des embouts réduit de 50%",
      "Résistance chimique supérieure aux solvants et UV",
      "Fournie avec outil de recalibrage rapide et certificat ISO 8655"
    ],
    inStock: true,
    isPopular: true,
    applications: ["Biologie Moléculaire", "Sérologie", "Analyses Médicales", "Génétique"],
    variants: [
      { label: "Plage 0.5 - 10 µL", sku: "RB-PIP-10" },
      { label: "Plage 10 - 100 µL", sku: "RB-PIP-100" },
      { label: "Plage 100 - 1000 µL", sku: "RB-PIP-1000" },
      { label: "Kit 4 Pipettes (10, 100, 1000 µL + Support)", sku: "RB-PIP-KIT4" }
    ]
  },

  // --- CHIMIE & RÉACTIFS ---
  {
    id: "chm-01",
    name: "Méthanol Pur pour Analyse HPLC / Gradient Grade 2.5 Litres",
    slug: "methanol-pur-analyse-hplc-gradient-grade",
    brand: "Merck / Honeywell Grade",
    category: "chimie",
    categoryLabel: "Produits Chimiques & Réactifs",
    subcategory: "Solvants purs (Méthanol, Éthanol, Acétone HPLC)",
    reference: "RB-SOLV-METH",
    image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Solvant ultra pur filtré à 0.2 µm spécial chromatographie liquide haute performance et spectrométrie de masse.",
    description: "Méthanol de pureté exceptionnelle (≥ 99.9%) garantissant un bruit de fond baseline minimal, une transmittance UV élevée (coupure UV à 205 nm) et une teneur en eau résiduelle ultra faible (≤ 0.02%). Conditionné en flacon verre ambré sécurisé de 2,5 Litres.",
    specifications: [
      { name: "Formule chimique", value: "CH3OH - Pureté ≥ 99.9 %" },
      { name: "Qualité", value: "HPLC Gradient Grade & Spectrophotométrie" },
      { name: "Transmittance UV (220nm)", value: "≥ 60 %" },
      { name: "Transmittance UV (260nm)", value: "≥ 98 %" },
      { name: "Résidu après évaporation", value: "≤ 0.0003 %" },
      { name: "Conditionnement", value: "Flacon verre ambré 2.5 Litres avec bague anti-goutte" }
    ],
    features: [
      "Fiche de Données de Sécurité (FDS / MSDS) fournie en Français",
      "Filtration finale sur membrane PTFE 0,2 micron",
      "Date de péremption garantie supérieure à 24 mois",
      "Homologué pour analyses pharmacopée Ph. Eur. et USP"
    ],
    inStock: true,
    isPopular: true,
    applications: ["Laboratoires HPLC", "Pharma", "Contrôle Résidus Pesticides", "Recherche"]
  },
  {
    id: "chm-02",
    name: "Kit de Solutions Tampons pH Certifiées (pH 4.01 / 7.00 / 10.01)",
    slug: "kit-solutions-tampons-ph-certifiees",
    brand: "Robolab Calib",
    category: "chimie",
    categoryLabel: "Produits Chimiques & Réactifs",
    subcategory: "Solutions étalons & tampons pH certifiés",
    reference: "RB-BUF-KIT3",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Pack de 3 flacons étalons colorés avec doseur intégré pour calibrage rapide sans risque de contamination.",
    description: "Solutions tampons traçables NIST avec code couleur universel (Rouge pour pH 4.01, Jaune pour pH 7.00, Bleu pour pH 10.01). Chaque flacon intègre une chambre doseuse permettant d'étalonner l'électrode sans transvaser dans un récipient intermédiaire.",
    specifications: [
      { name: "Valeurs de consigne (25°C)", value: "pH 4.01 ± 0.01 / pH 7.00 ± 0.01 / pH 10.01 ± 0.02" },
      { name: "Traçabilité", value: "Étalons primaires NIST (National Institute of Standards and Tech)" },
      { name: "Volume par flacon", value: "500 ml avec compartiment doseur intégré" },
      { name: "Tableau de variation T°", value: "Imprimé directement sur l'étiquette de chaque flacon" }
    ],
    features: [
      "Système de dosage anti-gaspillage évitant la contamination du flacon principal",
      "Codes couleurs empêchant toute erreur d'inversion lors de la manipulation",
      "Certificat d'analyse de lot traçable inclus dans chaque boîte"
    ],
    inStock: true,
    applications: ["Tous Laboratoires", "Industrie Laitière", "Pétrochimie", "Stations d'Épuration"]
  },

  // --- MOBILIER & SÉCURITÉ ---
  {
    id: "mob-01",
    name: "Armoire de Sécurité Anti-Feu 90 Minutes pour Produits Inflammables",
    slug: "armoire-securite-anti-feu-90-min",
    brand: "Asecos / Robolab Safety",
    category: "mobilier",
    categoryLabel: "Mobilier & Sécurité",
    subcategory: "Armoires de sécurité pour produits inflammables (EN 14470-1)",
    reference: "RB-SAFE-TYPE90",
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Armoire de stockage certifiée EN 14470-1 type 90 minutes avec fermeture automatique des portes en cas d'incendie.",
    description: "Protection maximale pour le stockage de liquides inflammables et solvants en laboratoire. En cas d'élévation thermique (> 50°C), les portes et les conduits de ventilation se verrouillent et se scellent hermétiquement de façon automatique.",
    specifications: [
      { name: "Résistance au feu", value: "Type 90 (90 minutes selon norme européenne EN 14470-1)" },
      { name: "Dimensions extérieures", value: "L 1200 x P 615 x H 1968 mm" },
      { name: "Capacité de stockage", value: "Jusqu'à 150 Litres de solvants" },
      { name: "Équipement intérieur", value: "3 étagères de rétention en acier électrozingué + bac de fond" },
      { name: "Raccordement ventilation", value: "Buse DN 75 mm sur le toit pour extraction d'air" }
    ],
    features: [
      "Mécanisme de maintien des portes ouvertes avec fermeture thermique thermo-fusible",
      "Bacs de rétention étanches testés anti-fuite pour retenir tout déversement",
      "Mise à la terre intégrée pour éviter les décharges électrostatiques",
      "Homologation certifiée par organisme de contrôle international (TÜV / FM)"
    ],
    inStock: true,
    applications: ["Industrie Pharmaceutique", "Chimie", "Raffineries", "Centres de Recherche"]
  },
  {
    id: "mob-02",
    name: "Hotte Aspirante de Laboratoire à Filtration Moléculaire sans Raccordement",
    slug: "hotte-aspirante-filtration-moleculaire",
    brand: "Robolab FlowClean",
    category: "mobilier",
    categoryLabel: "Mobilier & Sécurité",
    subcategory: "Hottes aspirantes & Sorbonnes à flux laminaire",
    reference: "RB-FUME-100",
    image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Sorbonne à recirculation avec filtre à charbon actif haute capacité pour manipulation sécurisée des produits toxiques.",
    description: "Protège l'opérateur et l'environnement contre les vapeurs chimiques, gaz acides et aérosols toxiques sans nécessiter de gaine d'évacuation extérieure ni de perçage de façade. Installation immédiate sur paillasse existante.",
    specifications: [
      { name: "Norme de confinement", value: "Conforme AFNOR NF X 15-211 classe 2" },
      { name: "Largeur utile", value: "1000 mm (hauteur de passage 250 mm)" },
      { name: "Vitesse d'air frontale", value: "0.4 à 0.6 m/s réglable en continu" },
      { name: "Filtration", value: "Filtre combiné Charbon Actif spécifique + Préfiltre anti-poussière" },
      { name: "Niveau sonore", value: "< 53 dBA" }
    ],
    features: [
      "Parois transparentes en PMMA assurant une visibilité à 360 degrés",
      "Capteur électronique de saturation de filtre avec alarme sonore et visuelle",
      "Plan de travail en résine phénolique ou inox avec bac de rétention des liquides",
      "Prise électrique interne protégée IP65 et éclairage LED intégré"
    ],
    inStock: true,
    applications: ["Laboratoires d'Enseignement", "Hôpitaux", "Contrôle Qualité", "Chimie Fine"]
  },
  {
    id: "app-05",
    name: "Analyseur d'Azote & Protéines selon Méthode Kjeldahl Automatique",
    slug: "analyseur-azote-proteines-methode-kjeldahl",
    brand: "Velp / Robolab Analytics",
    category: "appareils",
    categoryLabel: "Équipements & Appareils",
    subcategory: "Analyseurs chimiques & Kjeldahl",
    reference: "RB-KJEL-AUTO",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Unité de distillation et titration automatique pour dosage précis des protéines et de l'azote ammoniacal.",
    description: "Conçu pour l'industrie agroalimentaire, la meunerie, les aliments pour bétail et l'environnement. Automatisation totale de l'ajout d'eau, soude, acide borique et distillation à la vapeur avec cellule de titration colorimétrique intégrée.",
    specifications: [
      { name: "Norme d'analyse", value: "AOAC, ISO 20483, EPA, DIN" },
      { name: "Temps de distillation", value: "≤ 4 minutes par échantillon" },
      { name: "Plage de mesure", value: "0.04 à 220 mg N (azote)" },
      { name: "Taux de récupération", value: "≥ 99.5 %" },
      { name: "Écran", value: "Tactile couleur 7 pouces avec 30 méthodes mémorisables" }
    ],
    features: [
      "Générateur de vapeur breveté sans pression nécessitant zéro entretien",
      "Consommation d'eau de refroidissement optimisée (< 0.5 L/min)",
      "Traçabilité totale avec export direct vers LIMS et imprimante",
      "Conformité réglementation ONSSA pour contrôle qualité alimentaire"
    ],
    inStock: true,
    isPopular: true,
    applications: ["Agroalimentaire", "Minoterie & Céréales", "Nutrition Animale", "Eaux Usées"]
  },
  {
    id: "app-06",
    name: "Viscosimètre Rotatif Numérique Haute Précision (Type Brookfield)",
    slug: "viscosimetre-rotatif-numerique-haute-precision",
    brand: "Robolab RheoTech",
    category: "mesure",
    categoryLabel: "Mesure & Analyse",
    subcategory: "Viscosimètres & Rhéomètres",
    reference: "RB-VISCO-DIGI",
    image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Mesure directe et continue de la viscosité dynamique en cP / mPa.s avec sonde de température intégrée.",
    description: "Appareil de référence pour le contrôle qualité des peintures, encres, cosmétiques (crèmes, gels), produits alimentaires (huiles, mayonnaises, yaourts) et résines. Livré avec jeu complet de 4 mobiles (spindles) et certificat d'étalonnage traçable.",
    specifications: [
      { name: "Plage de mesure", value: "10 à 2 000 000 mPa.s (cP)" },
      { name: "Précision de mesure", value: "± 1.0 % de la pleine échelle" },
      { name: "Répétabilité", value: "± 0.2 %" },
      { name: "Vitesses de rotation", value: "0.3 à 100 tr/min (18 vitesses)" },
      { name: "Sonde de température", value: "PT100 intégrée de -20°C à 120°C" }
    ],
    features: [
      "Calcul automatique de la viscosité, vitesse de cisaillement et contrainte",
      "Statif motorisé à crémaillère avec niveau à bulle digital",
      "Écran LCD rétroéclairé avec interface multilingue",
      "Fourni avec 4 mobiles en acier inox 316L et étrier de protection"
    ],
    inStock: true,
    isPopular: true,
    applications: ["Cosmétique", "Peintures & Vernis", "Agroalimentaire", "Pharmacie"]
  },
  {
    id: "mob-03",
    name: "Paillasse Centrale Modulaire en Grès Cérame Anti-Acide avec Dosseret",
    slug: "paillasse-centrale-modulaire-gres-cerame",
    brand: "Robolab LabFurniture",
    category: "mobilier",
    categoryLabel: "Mobilier & Sécurité",
    subcategory: "Paillasses sèches & humides en grès ou résine",
    reference: "RB-BENCH-GRES",
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Paillasse professionnelle conforme norme européenne EN 13150 avec cuve PP et distribution électrique.",
    description: "Le summum de la résistance chimique pour laboratoires d'analyse minérale, chimie lourde et enseignement. Dalles de grès cérame étiré massif monolithique inattaquable par les acides concentrés et les solvants, montées sur piétement en C en tube d'acier époxy.",
    specifications: [
      { name: "Norme de conformité", value: "EN 13150 / NF X 15-201" },
      { name: "Plan de travail", value: "Grès cérame étiré massif épaisseur 28 mm avec bordure anti-goutte" },
      { name: "Capacité de charge", value: "300 kg / m² uniformément répartie" },
      { name: "Équipements", value: "Cuve polypropylène 400x400 mm, col de cygne eau froide, prises 230V IP55" }
    ],
    features: [
      "Incombustible classe A1 et résistant aux températures jusqu'à 1000°C",
      "Structure mécano-soudée avec vérins de mise à niveau au sol",
      "Meubles sous paillasse montés sur roulettes ou suspendus",
      "Garantie 5 ans anticorrosion et tenue mécanique"
    ],
    inStock: true,
    applications: ["Laboratoires de Chimie", "Mines & Métallurgie", "Agroalimentaire", "Recherche"]
  }
];

export const PARTNER_BRANDS = [
  { name: "Schott Duran", logo: "SCHOTT DURAN", country: "Allemagne" },
  { name: "Glassco", logo: "GLASSCO", country: "Royaume-Uni" },
  { name: "Ohaus", logo: "OHAUS", country: "États-Unis" },
  { name: "Memmert", logo: "MEMMERT", country: "Allemagne" },
  { name: "Testo", logo: "TESTO", country: "Allemagne" },
  { name: "Merck", logo: "MERCK", country: "Allemagne" },
  { name: "IKA Werke", logo: "IKA", country: "Allemagne" },
  { name: "Asecos", logo: "ASECOS", country: "Allemagne" },
  { name: "Eppendorf", logo: "EPPENDORF", country: "Allemagne" },
  { name: "Raypa", logo: "RAYPA", country: "Espagne" },
  { name: "Velp", logo: "VELP", country: "Italie" },
  { name: "Brookfield", logo: "BROOKFIELD", country: "États-Unis" },
  { name: "Interscience", logo: "INTERSCIENCE", country: "France" },
  { name: "Buchi", logo: "BÜCHI", country: "Suisse" },
  { name: "Mettler Toledo", logo: "METTLER TOLEDO", country: "Suisse" },
  { name: "Sartorius", logo: "SARTORIUS", country: "Allemagne" },
  { name: "Horiba", logo: "HORIBA", country: "Japon" }
];

export const CLIENT_SECTORS = [
  {
    name: "Industrie Agroalimentaire",
    description: "Contrôle qualité, chaîne du froid, analyses microbiologiques, dosage d'humidité et salinité.",
    icon: "Wheat"
  },
  {
    name: "Pharmaceutique & Cosmétique",
    description: "Pesage analytique de très haute précision, spectrophotométrie UV-VIS, salles propres et BPF/GMP.",
    icon: "Pill"
  },
  {
    name: "Recherche & Enseignement Supérieur",
    description: "Équipements pour facultés de médecine, sciences, écoles d'ingénieurs et instituts de recherche.",
    icon: "GraduationCap"
  },
  {
    name: "Environnement & Eaux",
    description: "Analyses physico-chimiques de l'eau potable, stations d'épuration, surveillance des rejets et DCO/DBO.",
    icon: "Droplets"
  },
  {
    name: "Mines & Matériaux",
    description: "Balances industrielles fortes charges, granulométrie, étuves haute température et préparation minérale.",
    icon: "Factory"
  }
];
