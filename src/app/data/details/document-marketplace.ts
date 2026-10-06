import { ProjectDetail } from '../project-detail';

export const MASSARAT: { en: ProjectDetail; fr: ProjectDetail } = {
  en: {
    id: 'massarat-plus',
    title: 'Massarat+ — Educational Content Marketplace',
    summary:
      'Production educational platform serving 50+ educators and 5000+ students across MENA with AES-128 file encryption, multi-gateway wallet systems, and real-time collaboration.',
    status: 'production',
    role: 'Full Stack Engineer',
    roleContext: 'Full Stack Engineer (Encryption & Payment Systems)',
    techStack: ['Spring Boot 3', 'Angular 19/20', 'Expo (SDK 54)', 'WebSocket', 'AES-128'],
    metrics: {
      team: 'Full Stack Engineer (primary), 1 DevOps engineer',
      duration: '7 months',
      scale: '50+ educators, 5000+ students across MENA region',
      keyOutcomes: [
        'Deployed to production with 99.5% uptime',
        'AES-128 encryption with <50ms decrypt overhead',
        'Payment webhook handling 100+ transactions/day',
      ],
    },
    context: {
      problem:
        'Educators needed a secure way to monetize intellectual property while providing a seamless learning experience for students and parents in a fragmented regional market.',
      constraints: [
        'Secure storage of sensitive educational PDF/Word files',
        'Integration with local payment gateways (D17, GPG, Konnect)',
        'Real-time messaging between teachers and parents',
        'Strict performance requirements for diverse mobile devices',
      ],
      goals: [
        'Implement AES-128 end-to-end file encryption',
        'Build a robust wallet system for regional payment processing',
        'Develop real-time messaging using Stomp and WebSocket',
        'Deliver synchronized Web (Angular) and Mobile (Expo) experiences',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Massarat+ Ecosystem Architecture',
      bullets: [
        'Spring Boot 3 backend with role-based JWT security',
        'AES-128 encrypted enterprise file storage on Linux with encrypt/decrypt layers',
        'Angular admin (19) and parent (20) dashboards',
        'Expo (React Native) mobile app with wallet top-up, cart, and teacher analytics',
        'WebSocket-based real-time notification and chat system',
        'Sponsorship system with admin review and wallet-based sponsorship payments',
        'Teacher earnings with withdrawals/virements managed by admins',
      ],
      highlights: [
        {
          title: 'Secure Content Delivery',
          description: 'Custom encryption logic ensuring documents are only decrypted in-memory during authorized sessions.',
        },
        {
          title: 'Financial Orchestration',
          description: 'Unified wallet system unifying automated card (GPG/Konnect) and manual (D17) recharge flows with idempotent webhook processing.',
        },
        {
          title: 'Stomp-Powered Real-Time',
          description: 'Bidirectional web messaging with persistent chat history and instant push notifications for teacher-parent communication.',
        },
      ],
    },
    decisions: [
      {
        title: 'AES-128 for File Security',
        reasoning: 'Protecting teacher content required stronger-than-database security; encryption at rest was non-negotiable.',
        tradeoffs: 'Increased CPU overhead for encryption/decryption on the fly, mitigated by efficient byte-streaming.',
      },
      {
        title: 'Expo for Mobile Development',
        reasoning: 'Reduced development time for Android/iOS parity while maintaining near-native performance.',
        tradeoffs: 'Larger bundle sizes compared to pure React Native, accepted for rapid feature rollout.',
      },
    ],
    deployment: {
      isDeployed: true,
      liveUrl: 'https://massarat-plus.com',
      apkUrl: '#apk-placeholder',
      flow: 'Build → Maven Artifact (WAR) → Application Server → Production Infrastructure',
      environment: 'Enterprise Linux environment with centralized MySQL and File Storage',
      details: [
        'Backend deployed as a WAR on production application servers',
        'Frontend delivered via optimized static assets',
        'Mobile app published via Expo EAS for internal testing and store distribution',
        'Live usage with active educators and students',
      ],
    },
    challenges: [
      {
        challenge: 'Handling inconsistent payment webhooks across multiple gateways.',
        solution: 'Implemented a webhook registry with idempotent processing and retry logic.',
        outcome: 'Reduced transaction failures and wallet balance discrepancies to near zero.',
      },
      {
        challenge: 'Keeping real-time state consistent across the web admin, parent, and mobile clients.',
        solution: 'Centralized state and messaging via Stomp sessions with standardized DTOs.',
        outcome: 'Consistent notifications and messaging across devices without message loss.',
      },
    ],
    impact: {
      improvements: [
        'Secure monetization platform for educational content',
        'Instant communication channel between educators and parents',
        'Unified financial tracking for all platform transactions and teacher payouts',
        'Sponsorship program expanding educator visibility and content promotion',
      ],
      learnings: [
        'Encryption at scale requires careful resource management',
        'Payment integration is more about edge-case handling than happy-path design',
        'API-first principles are crucial for maintainable multi-client ecosystems',
      ],
    },
  },
  fr: {
    id: 'massarat-plus',
    title: 'Massarat+ — Marketplace de Contenu Éducatif',
    summary:
      'Plateforme éducative en production servant 50+ éducateurs et 5000+ étudiants en région MENA avec chiffrement AES-128 de fichiers, systèmes de wallet multi-passerelles et collaboration temps réel.',
    status: 'production',
    role: 'Ingénieur Full Stack',
    roleContext: 'Ingénieur Full Stack (Chiffrement & Systèmes de Paiement)',
    techStack: ['Spring Boot 3', 'Angular 19/20', 'Expo (SDK 54)', 'WebSocket', 'AES-128'],
    metrics: {
      team: 'Ingénieur Full Stack (principal), 1 ingénieur DevOps',
      duration: '7 mois',
      scale: '50+ éducateurs, 5000+ étudiants en région MENA',
      keyOutcomes: [
        'Déployée en production avec 99.5% de disponibilité',
        'Chiffrement AES-128 avec <50ms de latence décryptage',
        'Gestion de webhooks de paiement: 100+ transactions/jour',
      ],
    },
    context: {
      problem:
        'Les éducateurs avaient besoin d’un moyen sécurisé de monétiser leur propriété intellectuelle tout en offrant une expérience d’apprentissage fluide sur un marché régional fragmenté.',
      constraints: [
        'Stockage sécurisé des fichiers PDF/Word éducatifs sensibles',
        'Intégration avec les passerelles de paiement locales (D17, GPG, Konnect)',
        'Messagerie en temps réel entre enseignants et parents',
        'Exigences strictes de performance pour divers appareils mobiles',
      ],
      goals: [
        'Implémenter le chiffrement de bout en bout AES-128',
        'Construire un système de wallet robuste pour le traitement des paiements régionaux',
        'Développer une messagerie en temps réel via Stomp et WebSocket',
        'Livrer des expériences synchronisées Web (Angular) et Mobile (Expo)',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Architecture de l’Écosystème Massarat+',
      bullets: [
        'Backend Spring Boot 3 avec sécurité JWT basée sur les rôles',
        'Stockage de fichiers chiffré AES-128 sur Linux avec couches de chiffrement/déchiffrement',
        'Tableaux de bord administration (19) et parents (20) sous Angular',
        'Application mobile Expo (React Native) avec recharge wallet, panier et analytics enseignants',
        'Système de notification et de chat en temps réel basé sur WebSocket',
        'Système de sponsoring avec validation admin et paiement de sponsoring via wallet',
        'Gains enseignants avec retraits/virements gérés par les admins',
      ],
      highlights: [
        {
          title: 'Livraison de Contenu Sécurisée',
          description: 'Logique de chiffrement personnalisée garantissant que les documents sont déchiffrés uniquement en mémoire.',
        },
        {
          title: 'Orchestration Financière',
          description: 'Système de wallet unifié unifiant les flux de recharge par carte (GPG/Konnect) et manuels (D17) avec traitement idempotent des webhooks.',
        },
        {
          title: 'Temps Réel via Stomp',
          description: 'Messagerie web bidirectionnelle avec historique persistant et notifications push instantanées pour la communication enseignant-parent.',
        },
      ],
    },
    decisions: [
      {
        title: 'AES-128 pour la Sécurité des Fichiers',
        reasoning: 'La protection du contenu des enseignants exigeait une sécurité renforcée ; le chiffrement au repos était non négociable.',
        tradeoffs: 'Augmentation de la charge CPU pour le chiffrement/déchiffrement à la volée, atténuée par un streaming efficace.',
      },
      {
        title: 'Expo pour le Développement Mobile',
        reasoning: 'Réduction du temps de développement pour la parité Android/iOS tout en conservant des performances quasi-natives.',
        tradeoffs: 'Tailles de bundle plus importantes que React Native pur, acceptées pour un déploiement rapide.',
      },
    ],
    deployment: {
      isDeployed: true,
      liveUrl: 'https://massarat-plus.com',
      apkUrl: '#apk-placeholder',
      flow: 'Build → Artefact Maven (WAR) → Serveur d’Application → Infrastructure de Production',
      environment: 'Environnement Enterprise Linux avec MySQL centralisé et stockage de fichiers',
      details: [
        'Backend déployé en tant que WAR sur serveurs d’application de production',
        'Frontend livré via des actifs statiques optimisés',
        'Application mobile publiée via Expo EAS pour les tests internes et la distribution sur store',
        'Utilisation en direct avec des enseignants et des étudiants actifs',
      ],
    },
    challenges: [
      {
        challenge: 'Gestion des webhooks de paiement incohérents entre plusieurs passerelles.',
        solution: 'Mise en œuvre d’un registre de webhooks avec traitement idempotent et logique de tentative.',
        outcome: 'Réduction des échecs de transaction et des écarts de solde wallet à près de zéro.',
      },
      {
        challenge: 'Maintenir un état temps réel cohérent entre les clients web admin, parent et mobile.',
        solution: 'État et messagerie centralisés via des sessions Stomp et des DTO standardisés.',
        outcome: 'Notifications et messagerie cohérentes entre les appareils sans perte de message.',
      },
    ],
    impact: {
      improvements: [
        'Plateforme de monétisation sécurisée pour le contenu éducatif',
        'Canal de communication instantané entre éducateurs et parents',
        'Suivi financier unifié pour toutes les transactions et paiements des enseignants',
        'Programme de sponsoring élargissant la visibilité des éducateurs et la promotion du contenu',
      ],
      learnings: [
        'Le chiffrement à grande échelle nécessite une gestion rigoureuse des ressources',
        'L’intégration de paiement concerne plus la gestion des cas limites que le parcours idéal',
        'Les principes API-first sont cruciaux pour les écosystèmes multi-clients maintenables',
      ],
    },
  },
};
