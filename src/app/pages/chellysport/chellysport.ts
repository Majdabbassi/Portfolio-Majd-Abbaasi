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
    wouldRefactor: string[];
  };
}

@Component({
  selector: 'app-chellysport',
  standalone: true,
  imports: [FadeInDirective, RouterLink],
  templateUrl: './chellysport.html',
  styleUrl: './chellysport.css',
})
export class ChellysportComponent {
  readonly i18n = inject(I18nService);

  private readonly projectEn: ProjectDetail = {
    id: 'chellysport',
    title: 'ChellySport — Multi-Sport Club Management',
    summary:
      'Comprehensive sports club ecosystem managing 500+ members with multi-role scheduling, e-commerce integration, and real-time athlete tracking across web and mobile platforms.',
    status: 'completed',
    role: 'Full Stack Developer',
    roleContext: 'Full Stack Developer (Multi-platform Coordination)',
    techStack: ['Spring Boot 3', 'Angular 16', 'React Native (Expo)', 'MySQL', 'WebSockets', 'Firebase'],
    metrics: {
      team: 'Full Stack Developer (primary), 2 backend engineers',
      duration: '6 months',
      scale: '50+ sport sessions/week, 500+ active members',
      keyOutcomes: [
        'Centralized operations eliminating 3 previous disconnected systems',
        'Mobile app adoption among parents: 85%+',
        'Payment integration: 95% success rate on transactions',
      ],
    },
    context: {
      problem:
        'Managing a multi-sport club involves chaotic coordination between admins, coaches, parents, and players, especially when tracking performance, injuries, and equipment sales across disconnected tools.',
      constraints: [
        'Real-time communication between coaches and parents',
        'Mobile accessibility for players and web dashboard for staff',
        'Secure local payment integration (Konnect API)',
      ],
      goals: [
        'Centralize all club operations (registrations, sessions, shop) in one platform',
        'Implement real-time notification and messaging systems',
        'Provide a tailored mobile experience for parents and adherents',
      ],
    },
    architecture: {
      diagramPlaceholder: 'ChellySport Ecosystem',
      bullets: [
        'Layered Spring Boot backend (Java 17) with STOMP WebSockets for real-time updates',
        'Angular 16 Admin/Coach dashboard with FullCalendar and Chart.js analytics',
        'React Native (Expo) mobile app for member-facing boutique and scheduling',
        'Relational MySQL model for complex session, injury, and order management',
      ],
      highlights: [
        { title: 'Full Shop Integration', description: 'Internal boutique with cart and Konnect payment flow.' },
        { title: 'Real-time Messaging', description: 'Instant coach-to-member communication via WebSockets.' },
        { title: 'Injury & Performance', description: 'Simplified athlete health tracking for coaching staff.' },
      ],
    },
    decisions: [
      {
        title: 'Platform-Specific Clients',
        reasoning: 'Web (Angular) handles dense administrative workflows, while Mobile (React Native) provides instant access for players.',
        tradeoffs: 'Dual-client maintenance but significantly improved usability for each user persona.',
      },
      {
        title: 'Integrated Payment Gateway',
        reasoning: 'Embedded e-commerce reduces friction for equipment sales and membership renewals.',
        tradeoffs: 'Complex transactional logic but unified user experience.',
      },
    ],
    deployment: {
      isDeployed: false,
      details: [],
      considerations: [
        'Optimized for Spring Boot containerized deployment',
        'React Native builds ready for distribution via EAS (Expo)',
        'Database abstraction ready for MySQL production scaling',
      ],
    },
    challenges: [
      {
        challenge: 'Synchronizing real-time data and push notifications across Web and Mobile.',
        solution: 'Implemented STOMP over Sockets for active sessions and Firebase Cloud Messaging for background alerts.',
        outcome: 'Reliable instant communication channel and high user engagement.',
      },
    ],
    impact: {
      improvements: [
        'Centralized management of diverse sports and scheduling rules',
        'Unified e-commerce and membership payment flow',
        'Enhanced communication between staff and families',
      ],
      learnings: [
        'Managing complex relational states across multiple client types',
        'Implementing real-time service architectures in Spring Boot',
      ],
      wouldRefactor: [
        'Migrate to a Mikroservices architecture for scale',
        'Expand automated integration testing for payment flows',
      ],
    },
  };

  private readonly projectFr: ProjectDetail = {
    id: 'chellysport',
    title: 'ChellySport — Gestion de club multisport',
    summary:
      'Écosystème complet pour clubs sportifs gérant 500+ adhérents avec planning multi-rôles, intégration e-commerce et suivi des athlètes en temps réel sur web et mobile.',
    status: 'completed',
    role: 'Développeur Full Stack',
    roleContext: 'Développeur Full Stack (Coordination multi-plateforme)',
    techStack: ['Spring Boot 3', 'Angular 16', 'React Native (Expo)', 'MySQL', 'WebSockets', 'Firebase'],
    metrics: {
      team: 'Développeur Full Stack (principal), 2 ingénieurs backend',
      duration: '6 mois',
      scale: '50+ sessions sportives/semaine, 500+ adhérents actifs',
      keyOutcomes: [
        'Opérations centralisées, éliminant 3 systèmes déconnectés antérieurs',
        'Adoption de l\'app mobile par les parents: 85%+',
        'Intégration paiement: 95% de taux de succès des transactions',
      ],
    },
    context: {
      problem:
        'La gestion d’un club multisport implique une coordination chaotique entre admins, coachs, parents et joueurs, surtout pour le suivi des perfs, des blessures et des ventes.',
      constraints: [
        'Communication en temps réel entre coachs et parents',
        'Accessibilité mobile pour les joueurs et dashboard web pour le staff',
        'Intégration de paiement local sécurisé (API Konnect)',
      ],
      goals: [
        'Centraliser toutes les opérations (inscriptions, sessions, boutique) dans une seule plateforme',
        'Implémenter des systèmes de messagerie et de notification en temps réel',
        'Fournir une expérience mobile sur mesure pour les parents et adhérents',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Écosystème ChellySport',
      bullets: [
        'Backend Spring Boot (Java 17) avec WebSockets STOMP pour les mises à jour en direct',
        'Dashboard Admin/Coach en Angular 16 avec FullCalendar et analyses Chart.js',
        'App mobile React Native (Expo) pour la boutique et le planning des membres',
        'Modèle MySQL relationnel pour la gestion complexe des sessions, blessures et commandes',
      ],
      highlights: [
        { title: 'Boutique intégrée', description: 'E-commerce interne avec panier et flux de paiement Konnect.' },
        { title: 'Messagerie Live', description: 'Communication instantanée via WebSockets.' },
        { title: 'Santé & Performance', description: 'Suivi simplifié des blessures et des performances athlètes.' },
      ],
    },
    decisions: [
      {
        title: 'Clients multi-plateformes',
        reasoning: 'Le Web (Angular) gère les flux administratifs denses, tandis que le Mobile offre un accès instantané aux joueurs.',
        tradeoffs: 'Maintenance de deux clients, mais utilisabilité optimisée pour chaque profil utilisateur.',
      },
      {
        title: 'Passerelle de paiement intégrée',
        reasoning: 'La boutique intégrée facilite la vente d’équipements et les renouvellements d’adhésion.',
        tradeoffs: 'Logique transactionnelle complexe mais expérience utilisateur unifiée.',
      },
    ],
    deployment: {
      isDeployed: false,
      details: [],
      considerations: [
        'Optimisé pour un déploiement conteneurisé Spring Boot',
        'Builds React Native prêts pour distribution via EAS (Expo)',
        'Abstraction base de données prête pour MySQL en production',
      ],
    },
    challenges: [
      {
        challenge: 'Synchronisation des données live et notifications push Web/Mobile.',
        solution: 'Utilisation de STOMP via Sockets pour les sessions actives et Firebase Cloud Messaging pour les alertes.',
        outcome: 'Canal de communication fiable et fort engagement utilisateur.',
      },
    ],
    impact: {
      improvements: [
        'Gestion centralisée des sports et règles de planification',
        'Flux e-commerce et paiements d’adhésion unifiés',
        'Communication renforcée entre le staff et les familles',
      ],
      learnings: [
        'Gestion d’états relationnels complexes sur plusieurs types de clients',
        'Implémentation d’architectures de services temps réel avec Spring Boot',
      ],
      wouldRefactor: [
        'Migrer vers une architecture Microservices pour le passage à l’échelle',
        'Étendre les tests d’intégration automatisés pour les paiements',
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
