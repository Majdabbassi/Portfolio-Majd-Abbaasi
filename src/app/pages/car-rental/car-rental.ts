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
  selector: 'app-car-rental',
  standalone: true,
  imports: [FadeInDirective, RouterLink],
  templateUrl: './car-rental.html',
  styleUrl: './car-rental.css',
})
export class CarRentalComponent {
  readonly i18n = inject(I18nService);

  private readonly projectEn: ProjectDetail = {
    id: 'car-rental',
    title: 'AutoRent — High-Visibility Fleet Management & Telemetry System',
    summary:
      'Advanced vehicle rental and fleet monitoring platform featuring real-time telemetry, automated booking lifecycles, and push-based operational visibility.',
    status: 'in-development',
    role: 'Full Stack Engineer',
    techStack: ['Java 17', 'Spring Boot 3.5', 'MySQL', 'Angular 18', 'WebPush (VAPID)', 'STOMP/WebSockets', 'JWT'],
    context: {
      problem:
        'Manual rental workflows and lack of real-time fleet visibility lead to booking overlaps and operational inefficiencies.',
      constraints: [
        'Enforce strict transactional integrity for conflict-free bookings',
        'Handle high-frequency telemetry ingestion with low latency',
        'Maintain a modular architecture for real-time notification scaling',
      ],
      goals: [
        'Construct a robust end-to-end booking and contract lifecycle',
        'Implement live vehicle tracking and status broadcasting via WebSockets',
        'Deliver actionable insights through an integrated telemetry dashboard',
      ],
    },
    architecture: {
      diagramPlaceholder: 'AutoRent System Architecture',
      bullets: [
        'Real-time telemetry ingestion & broadcasting via WebSockets (STOMP) for live vehicle tracking.',
        'VAPID Web Push notification system for instant booking and maintenance alerts.',
        'Dynamic fleet orchestration dashboard with real-time analytics on revenue and asset health.',
        'FullCalendar integration for visual booking lifecycle management (Rental → Contract → Billing).',
      ],
      highlights: [
        { title: 'Real-Time Sync', description: 'Instant state propagation across the fleet monitoring dashboard.' },
        { title: 'Reliable Booking', description: 'Date-range availability engine with hard relational constraints.' },
      ],
    },
    decisions: [
      {
        title: 'STOMP over WebSocket for Live Data',
        reasoning: 'Provides a structured sub-protocol for efficient telemetry broadcasting to management clients.',
        tradeoffs: 'Higher initial connection overhead than plain REST polling.',
      },
      {
        title: 'VAPID Web Push for Low-Latency Alerts',
        reasoning: 'Ensures operational awareness even when the dashboard is not actively open.',
        tradeoffs: 'Requires careful handling of push subscription persistence.',
      },
    ],
    deployment: {
      isDeployed: false,
      details: [],
      considerations: [
        'Active development phase with focus on core domain telemetry',
        'Deployment strategy targeting containerized environments for scaling WebSocket channels',
      ],
    },
    challenges: [
      {
        challenge: 'Scaling real-time telemetry ingestion while maintaining transactional integrity in the booking engine.',
        solution: 'Decoupled telemetry ingestion from core booking logic using event-driven patterns.',
        outcome: 'Achieved reliable asset tracking without impacting booking performance.',
      },
    ],
    impact: {
      improvements: [
        'Transitioned from basic CRUD to a real-time stateful operational system',
        'Enhanced architectural robustness through service-layer orchestration',
      ],
      learnings: [
        'Real-time data requires proactive observability and monitoring from day one',
        'Domain-driven design is critical when balancing diverse telemetry and financial rules',
      ],
      wouldRefactor: [
        'Integrate predictive maintenance models based on historical telemetry data',
        'Expand to a multi-cloud deployment strategy for edge telemetry processing',
      ],
    },
  };

  private readonly projectFr: ProjectDetail = {
    id: 'car-rental',
    title: 'AutoRent — Système de Gestion de Flotte & Télémétrie Haute Visibilité',
    summary:
      'Plateforme avancée de location et de monitoring de flotte intégrant télémétrie en temps réel, cycles de réservation automatisés et visibilité opérationnelle via notifications push.',
    status: 'in-development',
    role: 'Ingénieur Full Stack',
    techStack: ['Java 17', 'Spring Boot 3.5', 'MySQL', 'Angular 18', 'WebPush (VAPID)', 'STOMP/WebSockets', 'JWT'],
    context: {
      problem:
        'Les workflows manuels et le manque de visibilité en temps réel sur la flotte entraînent des chevauchements de réservation et des inefficacités opérationnelles.',
      constraints: [
        'Garantir l’intégrité transactionnelle pour des réservations sans conflit',
        'Gérer l’ingestion de télémétrie haute fréquence avec une faible latence',
        'Maintenir une architecture modulaire pour la montée en charge des notifications',
      ],
      goals: [
        'Construire un cycle complet de réservation et de contrat robuste',
        'Implémenter le suivi en direct et la diffusion d’état via WebSockets',
        'Offrir des insights actionnables via un dashboard de télémétrie intégré',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Architecture Système AutoRent',
      bullets: [
        'Ingestion et diffusion de télémétrie en temps réel via WebSockets (STOMP) pour le suivi des véhicules.',
        'Système de notifications Web Push (VAPID) pour des alertes instantanées de réservation et maintenance.',
        'Dashboard d’orchestration dynamique avec analytics en temps réel sur les revenus et la santé des actifs.',
        'Intégration FullCalendar pour la gestion visuelle du cycle de vie des réservations.',
      ],
      highlights: [
        { title: 'Synchro Temps Réel', description: 'Propagation d’état instantanée sur le tableau de bord de monitoring.' },
        { title: 'Réservation Fiable', description: 'Moteur de disponibilité avec contraintes relationnelles fortes.' },
      ],
    },
    decisions: [
      {
        title: 'STOMP sur WebSocket pour données Live',
        reasoning: 'Offre un sous-protocole structuré pour une diffusion efficace de la télémétrie.',
        tradeoffs: 'Surcoût initial de connexion supérieur au polling REST classique.',
      },
      {
        title: 'Web Push VAPID pour alertes basse latence',
        reasoning: 'Garantit la réactivité opérationnelle même si le dashboard est fermé.',
        tradeoffs: 'Nécessite une gestion rigoureuse de la persistance des abonnements push.',
      },
    ],
    deployment: {
      isDeployed: false,
      details: [],
      considerations: [
        'Phase de développement active axée sur la télémétrie du domaine cœur',
        'Stratégie de déploiement orientée conteneurisation pour scaler les canaux WebSocket',
      ],
    },
    challenges: [
      {
        challenge: 'Passage à l’échelle de l’ingestion de télémétrie tout en préservant l’intégrité transactionnelle.',
        solution: 'Découplage de l’ingestion de télémétrie de la logique de réservation via des patterns event-driven.',
        outcome: 'Suivi fiable des actifs sans impact sur les performances de réservation.',
      },
    ],
    impact: {
      improvements: [
        'Transition d’un CRUD basique vers un système opérationnel à état en temps réel',
        'Renforcement de la robustesse architecturale par orchestration de services',
      ],
      learnings: [
        'Les données temps réel exigent une observabilité proactive dès le début',
        'Le Domain-Driven Design est crucial pour équilibrer télémétrie et règles financières',
      ],
      wouldRefactor: [
        'Intégrer des modèles de maintenance prédictive basés sur l’historique télémétrique',
        'Étendre vers une stratégie de déploiement multi-cloud',
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
