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
  selector: 'app-delivery-tracking',
  standalone: true,
  imports: [FadeInDirective, RouterLink],
  templateUrl: './delivery-tracking.html',
  styleUrl: './delivery-tracking.css',
})
export class DeliveryTrackingComponent {
  readonly i18n = inject(I18nService);

  private readonly projectEn: ProjectDetail = {
    id: 'delivery-tracking',
    title: 'SwiftDeliver — Delivery Management & Tracking',
    summary:
      'In-progress delivery operations platform with personnel tracking, order lifecycle control, and dispatch visibility.',
    status: 'in-development',
    role: 'Full Stack Engineer',
    techStack: ['Spring Boot', 'Angular', 'PostgreSQL', 'PostGIS', 'JWT'],
    context: {
      problem:
        'Delivery operations lacked centralized live visibility into courier status and active order execution.',
      constraints: [
        'Track delivery status changes reliably',
        'Support progressive move toward real-time updates',
        'Model dispatch lifecycle clearly',
      ],
      goals: [
        'Create centralized dispatch and tracking foundation',
        'Expose actionable operational visibility for managers',
        'Design extensible architecture for future real-time features',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Delivery Tracking Architecture',
      bullets: [
        'Spring Boot API for order and dispatcher workflows',
        'Angular operational dashboard for live state monitoring',
        'PostgreSQL + PostGIS for location-aware data handling',
      ],
      highlights: [
        { title: 'Tracking Layer', description: 'Structured delivery state progression and status visibility.' },
        { title: 'Geospatial Foundation', description: 'Prepared for advanced location-based logic.' },
      ],
    },
    decisions: [
      {
        title: 'REST-first then Real-Time Evolution',
        reasoning: 'Stabilize core workflow before streaming complexity.',
        tradeoffs: 'Slightly less live UX initially for lower implementation risk.',
      },
    ],
    deployment: {
      isDeployed: false,
      details: [],
      considerations: [
        'Project is active and not yet production deployed',
        'Core workflow stabilization prioritized before infra rollout',
        'Containerized deployment path planned after feature maturity',
      ],
    },
    challenges: [
      {
        challenge: 'Choosing efficient location update frequency and storage strategy.',
        solution: 'Incremental approach with bounded update cadence and optimized query paths.',
        outcome: 'In progress with focus on performance and operational clarity.',
      },
    ],
    impact: {
      improvements: [
        'Expands architecture experience into tracking and dispatch domains',
        'Strengthens modeling of stateful operational systems',
      ],
      learnings: [
        'Tracking systems require careful latency/cost balance',
        'State machine clarity is critical in logistics workflows',
      ],
      wouldRefactor: [
        'Add WebSocket event channels for true live updates',
        'Integrate route optimization and ETA prediction',
      ],
    },
  };

  private readonly projectFr: ProjectDetail = {
    id: 'delivery-tracking',
    title: 'SwiftDeliver — Gestion & suivi des livraisons',
    summary:
      'Plateforme en cours de développement pour opérations de livraison avec suivi des équipes, contrôle du cycle de commande et visibilité dispatch.',
    status: 'in-development',
    role: 'Ingénieur Full Stack',
    techStack: ['Spring Boot', 'Angular', 'PostgreSQL', 'PostGIS', 'JWT'],
    context: {
      problem:
        'Les opérations de livraison manquaient de visibilité centralisée en temps réel sur l’état des livreurs et des commandes en cours.',
      constraints: [
        'Suivre de manière fiable les changements d’état de livraison',
        'Permettre une montée progressive vers le temps réel',
        'Modéliser clairement le cycle de dispatch',
      ],
      goals: [
        'Créer une base solide de dispatch et tracking centralisés',
        'Offrir une visibilité opérationnelle exploitable aux managers',
        'Concevoir une architecture extensible pour le temps réel futur',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Architecture Delivery Tracking',
      bullets: [
        'API Spring Boot pour workflows commande et dispatch',
        'Dashboard Angular pour monitoring opérationnel',
        'PostgreSQL + PostGIS pour données géospatiales',
      ],
      highlights: [
        { title: 'Couche de tracking', description: 'Progression d’état structurée et visibilité de livraison.' },
        { title: 'Base géospatiale', description: 'Préparée pour logique avancée basée localisation.' },
      ],
    },
    decisions: [
      {
        title: 'REST d’abord puis évolution temps réel',
        reasoning: 'Stabiliser le workflow cœur avant la complexité streaming.',
        tradeoffs: 'UX moins live au départ mais risque d’implémentation réduit.',
      },
    ],
    deployment: {
      isDeployed: false,
      details: [],
      considerations: [
        'Projet actif non encore déployé en production',
        'Stabilisation du workflow cœur priorisée avant rollout infra',
        'Déploiement conteneurisé prévu après maturité fonctionnelle',
      ],
    },
    challenges: [
      {
        challenge: 'Choisir la fréquence de mise à jour localisation et la stratégie de stockage.',
        solution: 'Approche incrémentale avec cadence bornée et chemins de requêtes optimisés.',
        outcome: 'En cours, avec focus performance et clarté opérationnelle.',
      },
    ],
    impact: {
      improvements: [
        'Élargit l’expérience architecture vers tracking et dispatch',
        'Renforce la modélisation des systèmes opérationnels à états',
      ],
      learnings: [
        'Les systèmes de tracking exigent un bon équilibre latence/coût',
        'La clarté de machine à états est cruciale en logistique',
      ],
      wouldRefactor: [
        'Ajouter canaux WebSocket pour vraies mises à jour live',
        'Intégrer optimisation de route et prédiction ETA',
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
