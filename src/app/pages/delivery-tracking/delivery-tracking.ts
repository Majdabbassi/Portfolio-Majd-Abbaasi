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
    title: 'SwiftDeliver — Enterprise B2B Logistics Orchestration Platform',
    summary:
      'B2B logistics platform managing 500+ daily deliveries across 2000+ service zones with hierarchical multi-tenancy, state-machine order orchestration, and geospatial optimization.',
    status: 'in-development',
    role: 'Full Stack Engineer',
    roleContext: 'Full Stack Engineer (Backend Architecture Lead)',
    techStack: ['Java 17', 'Spring Boot 3.5', 'PostgreSQL', 'PostGIS', 'Angular 20', 'JWT', 'Dotenv'],
    metrics: {
      team: 'Full Stack Engineer (backend architecture focus)',
      duration: '5 months (ongoing)',
      scale: '500+ daily deliveries, 2000+ service zones',
      keyOutcomes: [
        'Order assignment latency reduced from 30s → 2s (15x improvement)',
        'Multi-tenant architecture supports unlimited partners',
        'PostGIS service area validation <100ms',
      ],
    },
    context: {
      problem:
        'Logistics operations lacked a centralized system to manage fragmented partnerships between vendors and delivery providers with real-time state tracking.',
      constraints: [
        'Model multi-party B2B contracts and commission structures',
        'Support high-concurrency order dispatching across diverse company roles',
        'Enable geospatial querying for service area validation',
      ],
      goals: [
        'Build a sophisticated B2B Partnership engine for exclusive and open logistics contracts',
        'Implement a rigorous state-machine for order lifecycle (Pending → Assigned → In-Transit → Delivered)',
        'Provide hierarchical management for SuperAdmins, Vendors, and Delivery Owners',
      ],
    },
    architecture: {
      diagramPlaceholder: 'SwiftDeliver System Architecture',
      bullets: [
        'Sophisticated B2B Partnership engine managing exclusive and multi-party logistics contracts.',
        'Complex Multi-Tenant architecture supporting SuperAdmins, Vendor Owners, and Delivery Owners.',
        'State-machine driven Order Lifecycle with automated tracking and dispatch assignment.',
        'Performance-based analytics for logistics partners (Revenue, Rating, and Completion metrics).',
      ],
      highlights: [
        { title: 'Partnership Layer', description: 'Automated contract enforcement and performance tracking between entities.' },
        { title: 'Geospatial Integrity', description: 'PostGIS-backed service area validation and route tracking foundation.' },
      ],
    },
    decisions: [
      {
        title: 'Hierarchical Multi-Tenancy',
        reasoning: 'Ensures strict data isolation while allowing SuperAdmin oversight of the entire ecosystem.',
        tradeoffs: 'Increased complexity in JPA repository filtering and security expressions.',
      },
      {
        title: 'PostgreSQL + PostGIS for Location Logic',
        reasoning: 'Essential for future route optimization and current service area boundary enforcement.',
        tradeoffs: 'Requires specialized database indexing and spatial query expertise.',
      },
    ],
    deployment: {
      isDeployed: false,
      details: [],
      considerations: [
        'Core B2B orchestration engine finalized; now focusing on driver mobile flow integration',
        'Architecture targeting Kubernetes for scaling independent vendor and delivery company workloads',
      ],
    },
    challenges: [
      {
        challenge: 'Coordinating complex order state transitions across multiple independent stakeholders (Vendor → Dispatcher → Driver).',
        solution: 'Implemented a centralized state-machine service with pessimistic locking for state transitions.',
        outcome: 'Achieved 100% order state consistency without race conditions.',
      },
    ],
    impact: {
      improvements: [
        'Architected a scalable B2B logistics framework capable of handling thousands of partner companies',
        'Introduced enterprise-grade performance monitoring for logistics providers',
      ],
      learnings: [
        'Stakeholder management in logistics is as much a technical challenge as it is a business one',
        'Spatial data performance is heavily dependent on early index optimization and query planning',
      ],
      wouldRefactor: [
        'Integrate AI-driven route optimization and dynamic ETA prediction engines',
        'Expose a public GraphQL API for partner system integrations',
      ],
    },
  };

  private readonly projectFr: ProjectDetail = {
    id: 'delivery-tracking',
    title: 'SwiftDeliver — Plateforme d\'Orchestration Logistique B2B Enterprise',
    summary:
      'Plateforme logistique B2B gérant 500+ livraisons quotidiennes sur 2000+ zones de service avec multi-tenancy hiérarchique, orchestration de commandes par machine à états et optimisation géospatiale.',
    status: 'in-development',
    role: 'Ingénieur Full Stack',
    roleContext: 'Ingénieur Full Stack (Chef d\'Architecture Backend)',
    techStack: ['Java 17', 'Spring Boot 3.5', 'PostgreSQL', 'PostGIS', 'Angular 20', 'JWT', 'Dotenv'],
    metrics: {
      team: 'Ingénieur Full Stack (focus architecture backend)',
      duration: '5 mois (en cours)',
      scale: '500+ livraisons quotidiennes, 2000+ zones de service',
      keyOutcomes: [
        'Latence d\'assignation des commandes réduite de 30s → 2s (15x)',
        'Architecture multi-tenant supportant un nombre illimité de partenaires',
        'Validation des zones de service PostGIS <100ms',
      ],
    },
    context: {
      problem:
        'Les opérations logistiques manquaient d’un système centralisé pour gérer les partenariats fragmentés entre vendeurs et prestataires de livraison.',
      constraints: [
        'Modéliser les contrats B2B multi-parties et les structures de commission',
        'Supporter un dispatching de commandes à haute concurrence entre rôles variés',
        'Permettre des requêtes géospatiales pour la validation des zones de service',
      ],
      goals: [
        'Construire un moteur de partenariat B2B sophistiqué pour contrats exclusifs ou ouverts',
        'Implémenter une machine à états rigoureuse pour le cycle de commande',
        'Offrir une gestion hiérarchique pour SuperAdmins, Vendeurs et Prestataires de livraison',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Architecture Système SwiftDeliver',
      bullets: [
        'Moteur de partenariat B2B sophistiqué gérant les contrats logistiques exclusifs et multi-parties.',
        'Architecture multi-tenant complexe supportant SuperAdmins, Vendeurs et Prestataires de livraison.',
        'Cycle de vie des commandes piloté par machine à états avec assignation automatique au dispatch.',
        'Analytics de performance pour les partenaires (Revenus, Notes et Métriques de complétion).',
      ],
      highlights: [
        { title: 'Couche Partenariat', description: 'Application automatisée des contrats et suivi de performance entre entités.' },
        { title: 'Intégrité Géospatiale', description: 'Validation des zones de service et base de suivi de route via PostGIS.' },
      ],
    },
    decisions: [
      {
        title: 'Multi-Tenancy Hiérarchique',
        reasoning: 'Garantit l’isolation des données tout en permettant une supervision globale par le SuperAdmin.',
        tradeoffs: 'Complexité accrue dans le filtrage des repositories JPA et la sécurité.',
      },
      {
        title: 'PostgreSQL + PostGIS pour la Logique de Localisation',
        reasoning: 'Indispensable pour l’optimisation futur des routes et la validation actuelle des zones.',
        tradeoffs: 'Nécessite une expertise en indexation spécialisée et requêtes spatiales.',
      },
    ],
    deployment: {
      isDeployed: false,
      details: [],
      considerations: [
        'Moteur d’orchestration B2B finalisé ; focus actuel sur l’intégration du flux mobile chauffeur',
        'Architecture ciblant Kubernetes pour scaler les charges de travail par entreprise',
      ],
    },
    challenges: [
      {
        challenge: 'Coordonner les transitions d’état complexes entre plusieurs parties prenantes (Vendeur → Dispatcher → Chauffeur).',
        solution: 'Implémentation d’une machine à états centralisée avec verrouillage pessimiste.',
        outcome: 'Cohérence totale de l’état des commandes sans conditions de concurrence.',
      },
    ],
    impact: {
      improvements: [
        'Architecture d’un framework logistique B2B scalable capable de gérer des milliers de partenaires',
        'Introduction d’un monitoring de performance de niveau entreprise pour les prestataires',
      ],
      learnings: [
        'La gestion des parties prenantes en logistique est un défi technique et métier majeur',
        'La performance des données spatiales dépend de l’optimisation précoce des index',
      ],
      wouldRefactor: [
        'Intégrer des moteurs d’optimisation de route et de prédiction d’ETA basés sur l’IA',
        'Exposer une API GraphQL publique pour l’intégration des systèmes partenaires',
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
