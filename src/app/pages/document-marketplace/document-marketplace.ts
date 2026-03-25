import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { I18nService } from '../../core/i18n.service';

type ProjectStatus = 'production' | 'completed' | 'in-development';

interface ProjectDetail {
  id: string;
  title: string;
  summary: string;
  status: ProjectStatus;
  role: string;
  roleContext: string;
  techStack: string[];
  metrics: {
    team: string;
    duration: string;
    scale: string;
    keyOutcomes: string[];
  };
  context: {
    problem: string;
    constraints: string[];
    goals: string[];
  };
  architecture: {
    diagramPlaceholder: string;
    bullets: string[];
    highlights: { title: string; description: string }[];
  };
  decisions: {
    title: string;
    reasoning: string;
    tradeoffs: string;
  }[];
  deployment: {
    isDeployed: boolean;
    liveUrl?: string;
    flow?: string;
    environment?: string;
    details: string[];
    considerations?: string[];
  };
  challenges: {
    challenge: string;
    solution: string;
    outcome: string;
  }[];
  impact: {
    improvements: string[];
    learnings: string[];
  };
}

@Component({
  selector: 'app-document-marketplace',
  standalone: true,
  imports: [FadeInDirective, RouterLink],
  templateUrl: './document-marketplace.html',
  styleUrl: './document-marketplace.css',
})
export class DocumentMarketplaceComponent {
  readonly i18n = inject(I18nService);

  private readonly projectEn: ProjectDetail = {
    id: 'massarat-plus',
    title: 'Massarat+ — Educational Content Marketplace',
    summary:
      'Production educational platform serving 50+ educators and 5000+ students across MENA with AES-128 file encryption, multi-gateway wallet systems, and real-time collaboration.',
    status: 'production',
    role: 'Full Stack Engineer',
    roleContext: 'Full Stack Engineer (Encryption & Payment Systems)',
    techStack: ['Spring Boot 3', 'Angular 19', 'Expo (SDK 54)', 'WebSocket', 'AES-128', 'Firebase'],
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
        'Cloud-native file storage with AES-128 encryption/decryption layers',
        'Angular 19 administration and parent dashboards',
        'Cross-platform mobile app built with Expo and NativeWind',
        'WebSocket-based real-time notification and chat system',
      ],
      highlights: [
        {
          title: 'Secure Content Delivery',
          description: 'Custom encryption logic ensuring documents are only decrypted in-memory during authorized sessions.',
        },
        {
          title: 'Financial Orchestration',
          description: 'Unified wallet system handling diverse regional payment webhooks and recharge flows.',
        },
        {
          title: 'Stomp-Powered Real-Time',
          description: 'Bidirectional messaging with persistent chat history and instant Firebase push notifications.',
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
        challenge: 'Synchronizing real-time state across web and mobile concurrently.',
        solution: 'Centralized state management via Stomp sessions and standardized DTOs.',
        outcome: 'Seamless user transitions between devices without message loss.',
      },
    ],
    impact: {
      improvements: [
        'Secure monetization platform for educational content',
        'Instant communication channel between educators and parents',
        'Unified financial tracking for all platform transactions',
      ],
      learnings: [
        'Encryption at scale requires careful resource management',
        'Payment integration is more about edge-case handling than happy-path design',
        'API-first principles are crucial for maintainable multi-client ecosystems',
      ],
    },
  };

  private readonly projectFr: ProjectDetail = {
    id: 'massarat-plus',
    title: 'Massarat+ — Marketplace de Contenu Éducatif',
    summary:
      'Plateforme éducative en production servant 50+ éducateurs et 5000+ étudiants en région MENA avec chiffrement AES-128 de fichiers, systèmes de wallet multi-passerelles et collaboration temps réel.',
    status: 'production',
    role: 'Ingénieur Full Stack',
    roleContext: 'Ingénieur Full Stack (Chiffrement & Systèmes de Paiement)',
    techStack: ['Spring Boot 3', 'Angular 19', 'Expo (SDK 54)', 'WebSocket', 'AES-128', 'Firebase'],
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
        'Stockage de fichiers cloud avec couches de chiffrement/déchiffrement AES-128',
        'Tableaux de bord administration et parents sous Angular 19',
        'Application mobile multiplateforme avec Expo et NativeWind',
        'Système de notification et de chat en temps réel basé sur WebSocket',
      ],
      highlights: [
        {
          title: 'Livraison de Contenu Sécurisée',
          description: 'Logique de chiffrement personnalisée garantissant que les documents sont déchiffrés uniquement en mémoire.',
        },
        {
          title: 'Orchestration Financière',
          description: 'Système de wallet unifié gérant divers webhooks de paiement régionaux et flux de recharge.',
        },
        {
          title: 'Temps Réel via Stomp',
          description: 'Messagerie bidirectionnelle avec historique persistant et notifications push Firebase instantanées.',
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
        challenge: 'Synchronisation de l’état en temps réel sur web et mobile simultanément.',
        solution: 'Gestion centralisée de l’état via des sessions Stomp et des DTO standardisés.',
        outcome: 'Transitions utilisateur fluides entre les appareils sans perte de message.',
      },
    ],
    impact: {
      improvements: [
        'Plateforme de monétisation sécurisée pour le contenu éducatif',
        'Canal de communication instantané entre éducateurs et parents',
        'Suivi financier unifié pour toutes les transactions de la plateforme',
      ],
      learnings: [
        'Le chiffrement à grande échelle nécessite une gestion rigoureuse des ressources',
        'L’intégration de paiement concerne plus la gestion des cas limites que le parcours idéal',
        'Les principes API-first sont cruciaux pour les écosystèmes multi-clients maintenables',
      ],
    },
  };

  get project(): ProjectDetail {
    return this.i18n.lang() === 'fr' ? this.projectFr : this.projectEn;
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'production':
        return this.i18n.t('status.production');
      case 'completed':
        return this.i18n.t('status.completed');
      case 'in-development':
        return this.i18n.t('status.in-development');
      default:
        return this.i18n.t('detail.project');
    }
  }
}
