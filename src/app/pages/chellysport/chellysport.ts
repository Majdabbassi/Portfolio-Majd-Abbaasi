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
  techStack: string[];
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
      'End-of-studies internship project managing memberships, scheduling, and facility reservations across multiple sports.',
    status: 'completed',
    role: 'Full Stack Developer (Intern)',
    techStack: ['Spring Boot', 'Angular', 'Flutter', 'MySQL', 'JWT'],
    context: {
      problem:
        'Sports clubs were handling operations manually across disconnected tools, causing scheduling and reservation conflicts.',
      constraints: [
        'Support multiple sports and different scheduling rules',
        'Avoid facility double-booking',
        'Provide web and mobile access',
      ],
      goals: [
        'Centralize club operations in one platform',
        'Improve reservation reliability',
        'Deliver a complete internship-grade product',
      ],
    },
    architecture: {
      diagramPlaceholder: 'ChellySport Architecture',
      bullets: [
        'Layered Spring Boot backend with service-level business logic',
        'Angular dashboard for admins and managers',
        'Flutter app for member-facing usage',
        'MySQL relational model for memberships, sessions, and facilities',
      ],
      highlights: [
        { title: 'Multi-Sport Modeling', description: 'Flexible data model for different sport workflows.' },
        { title: 'Reservation Logic', description: 'Conflict prevention for facility booking flows.' },
      ],
    },
    decisions: [
      {
        title: 'Relational Data Model',
        reasoning: 'Entities were highly relational and consistency-critical.',
        tradeoffs: 'More schema planning upfront for stronger integrity guarantees.',
      },
      {
        title: 'Separate Web/Mobile UX',
        reasoning: 'Admin and member workflows differ significantly by platform.',
        tradeoffs: 'Two client codebases but clearer role-oriented experience.',
      },
    ],
    deployment: {
      isDeployed: false,
      details: [],
      considerations: [
        'Completed functional scope during internship timeline',
        'Ready for standard Spring Boot deployment path',
        'Deployment was out of scope for internship phase',
      ],
    },
    challenges: [
      {
        challenge: 'Designing a reusable model for multiple sport types.',
        solution: 'Core entities plus sport-specific configuration strategy.',
        outcome: 'System handled diverse sport behaviors without structural rewrite.',
      },
    ],
    impact: {
      improvements: [
        'Unified operations for registrations and reservations',
        'Reduced manual process dependency',
        'Delivered first complete full-stack multi-platform system',
      ],
      learnings: [
        'Domain modeling quality strongly affects long-term maintainability',
        'API-first thinking simplifies cross-client development',
      ],
      wouldRefactor: [
        'Add broader automated test coverage',
        'Improve notification/communication flows',
      ],
    },
  };

  private readonly projectFr: ProjectDetail = {
    id: 'chellysport',
    title: 'ChellySport — Gestion de club multisport',
    summary:
      'Projet de stage de fin d’études pour gérer adhésions, planification et réservations d’infrastructures sur plusieurs sports.',
    status: 'completed',
    role: 'Développeur Full Stack (Stagiaire)',
    techStack: ['Spring Boot', 'Angular', 'Flutter', 'MySQL', 'JWT'],
    context: {
      problem:
        'Les clubs sportifs géraient leurs opérations de façon manuelle via des outils dispersés, causant conflits de planning et de réservation.',
      constraints: [
        'Supporter plusieurs sports et règles de planification différentes',
        'Éviter les doubles réservations d’infrastructure',
        'Fournir un accès web et mobile',
      ],
      goals: [
        'Centraliser les opérations du club dans une seule plateforme',
        'Améliorer la fiabilité des réservations',
        'Livrer un produit complet dans le cadre du stage',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Architecture ChellySport',
      bullets: [
        'Backend Spring Boot en couches avec logique métier au niveau service',
        'Dashboard Angular pour admins et managers',
        'Application Flutter côté membres',
        'Modèle MySQL pour adhésions, sessions et infrastructures',
      ],
      highlights: [
        { title: 'Modélisation multisport', description: 'Modèle flexible pour différents workflows sportifs.' },
        { title: 'Logique de réservation', description: 'Prévention des conflits dans les flux de réservation.' },
      ],
    },
    decisions: [
      {
        title: 'Modèle de données relationnel',
        reasoning: 'Les entités étaient fortement relationnelles et sensibles à la cohérence.',
        tradeoffs: 'Plus de travail de schéma au départ pour garantir l’intégrité.',
      },
      {
        title: 'UX web/mobile séparées',
        reasoning: 'Les workflows admin et membre diffèrent fortement selon la plateforme.',
        tradeoffs: 'Deux codebases client, mais une expérience plus claire par rôle.',
      },
    ],
    deployment: {
      isDeployed: false,
      details: [],
      considerations: [
        'Scope fonctionnel terminé dans la timeline du stage',
        'Prêt pour un déploiement Spring Boot standard',
        'Le déploiement était hors périmètre du stage',
      ],
    },
    challenges: [
      {
        challenge: 'Concevoir un modèle réutilisable pour plusieurs types de sport.',
        solution: 'Entités cœur + stratégie de configuration spécifique par sport.',
        outcome: 'Support de comportements sportifs variés sans refonte structurelle.',
      },
    ],
    impact: {
      improvements: [
        'Opérations unifiées pour inscriptions et réservations',
        'Moins de dépendance aux processus manuels',
        'Premier système full-stack multi-plateforme complet livré',
      ],
      learnings: [
        'La qualité du domain modeling impacte fortement la maintenabilité',
        'L’approche API-first simplifie le développement multi-client',
      ],
      wouldRefactor: [
        'Ajouter une couverture de tests automatisés plus large',
        'Améliorer les flux notifications/communication',
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
