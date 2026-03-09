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
    title: 'AutoRent — Vehicle Rental Management',
    summary:
      'In-development vehicle rental platform focused on booking lifecycle, fleet visibility, and conflict-free availability handling.',
    status: 'in-development',
    role: 'Full Stack Engineer',
    techStack: ['Spring Boot', 'Angular', 'PostgreSQL', 'JWT'],
    context: {
      problem:
        'Manual rental workflows cause booking overlaps, weak fleet visibility, and operational delays.',
      constraints: [
        'Prevent overlapping bookings at data level',
        'Track fleet availability and maintenance states',
        'Maintain clean architecture while scope evolves',
      ],
      goals: [
        'Build robust booking workflow end-to-end',
        'Keep architecture modular for iterative expansion',
        'Prepare for deployment-ready infrastructure choices early',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Car Rental Architecture',
      bullets: [
        'Service-layer orchestration for booking and fleet operations',
        'Date-range availability logic with relational consistency',
        'Admin and customer flows in one cohesive SPA',
      ],
      highlights: [
        { title: 'Booking Integrity', description: 'Conflict prevention at business and data layers.' },
        { title: 'Iterative Design', description: 'Architecture evolving from production lessons learned.' },
      ],
    },
    decisions: [
      {
        title: 'PostgreSQL for Booking Constraints',
        reasoning: 'Strong relational control simplifies integrity enforcement.',
        tradeoffs: 'More explicit schema design work for robust consistency.',
      },
    ],
    deployment: {
      isDeployed: false,
      details: [],
      considerations: [
        'Project currently in active development phase',
        'Deployment planned after core domain completion',
        'Architecture is being prepared for containerized rollout',
      ],
    },
    challenges: [
      {
        challenge: 'Balancing flexible pricing logic with maintainable code paths.',
        solution: 'Rule-driven pricing strategy design under modular service boundaries.',
        outcome: 'In progress with focus on extensibility and predictability.',
      },
    ],
    impact: {
      improvements: [
        'Sharper architecture decisions from prior production experience',
        'Cleaner module boundaries compared to earlier projects',
      ],
      learnings: [
        'Complex business rules benefit from early domain partitioning',
        'Operational concerns should influence architecture from day one',
      ],
      wouldRefactor: [
        'Add advanced reporting and operational analytics',
        'Introduce stronger event-driven notifications',
      ],
    },
  };

  private readonly projectFr: ProjectDetail = {
    id: 'car-rental',
    title: 'AutoRent — Gestion de location de véhicules',
    summary:
      'Plateforme de location en développement, axée sur le cycle de réservation, la visibilité flotte et la gestion sans conflits de disponibilité.',
    status: 'in-development',
    role: 'Ingénieur Full Stack',
    techStack: ['Spring Boot', 'Angular', 'PostgreSQL', 'JWT'],
    context: {
      problem:
        'Les workflows manuels de location provoquent chevauchements de réservation, faible visibilité flotte et délais opérationnels.',
      constraints: [
        'Empêcher les réservations qui se chevauchent au niveau données',
        'Suivre disponibilité flotte et état maintenance',
        'Conserver une architecture propre malgré l’évolution du scope',
      ],
      goals: [
        'Construire un workflow de réservation robuste de bout en bout',
        'Garder une architecture modulaire pour l’itération',
        'Préparer tôt les choix infra orientés production',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Architecture Car Rental',
      bullets: [
        'Orchestration service-layer pour réservation et flotte',
        'Logique de disponibilité par plage de dates avec cohérence relationnelle',
        'Flux admin et client dans une SPA cohérente',
      ],
      highlights: [
        { title: 'Intégrité des réservations', description: 'Prévention des conflits au niveau métier et données.' },
        { title: 'Conception itérative', description: 'Architecture nourrie par les retours de production précédents.' },
      ],
    },
    decisions: [
      {
        title: 'PostgreSQL pour contraintes de réservation',
        reasoning: 'Le relationnel fort simplifie l’application des règles d’intégrité.',
        tradeoffs: 'Plus de travail explicite de conception de schéma.',
      },
    ],
    deployment: {
      isDeployed: false,
      details: [],
      considerations: [
        'Projet actuellement en phase active de développement',
        'Déploiement prévu après finalisation du domaine cœur',
        'Architecture préparée pour un rollout conteneurisé',
      ],
    },
    challenges: [
      {
        challenge: 'Équilibrer logique tarifaire flexible et code maintenable.',
        solution: 'Conception d’une stratégie tarifaire pilotée par règles et services modulaires.',
        outcome: 'En cours, avec focus extensibilité et prédictibilité.',
      },
    ],
    impact: {
      improvements: [
        'Décisions d’architecture affinées par expérience de production',
        'Frontières de modules plus claires que les projets antérieurs',
      ],
      learnings: [
        'Les règles métier complexes gagnent à une partition de domaine précoce',
        'Les contraintes opérationnelles doivent guider l’architecture dès le début',
      ],
      wouldRefactor: [
        'Ajouter reporting avancé et analytics opérationnels',
        'Introduire des notifications event-driven plus robustes',
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
