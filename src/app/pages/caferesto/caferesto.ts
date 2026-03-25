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
  };
}

@Component({
  selector: 'app-caferesto',
  standalone: true,
  imports: [FadeInDirective, RouterLink],
  templateUrl: './caferesto.html',
  styleUrl: './caferesto.css',
})
export class CaferestoComponent {
  readonly i18n = inject(I18nService);

  private readonly projectEn: ProjectDetail = {
    id: 'caferesto',
    title: 'CafeResto — Multi-Tenant Restaurant Operations Platform',
    summary:
      'Production restaurant ecosystem serving 14+ restaurants and 500+ daily transactions with real-time inventory sync under 1 second and 99.5% uptime.',
    status: 'production',
    role: 'Backend Architect',
    roleContext: 'Backend Architect (Foundation & DevOps)',
    techStack: ['Java 17', 'Spring Boot', 'PostgreSQL', 'WebSocket', 'Docker', 'Prometheus', 'Grafana', 'Nginx'],
    metrics: {
      team: 'Backend Architect (primary), 3 engineers',
      duration: '8 months',
      scale: '14+ restaurants, 500+ daily transactions',
      keyOutcomes: [
        '14-service Docker infrastructure monitoring 100+ metrics',
        'Real-time inventory sync across POS terminals <1s',
        'Multi-tenant isolation with zero data breach incidents',
      ],
    },
    context: {
      problem:
        'Restaurant operators needed one reliable platform to coordinate ordering, kitchen workflows, inventory, and staff activity across multiple business entities.',
      constraints: [
        'Guarantee strict tenant isolation in a shared multi-tenant architecture',
        'Maintain low-latency order and inventory synchronization for live operations',
        'Ensure production-grade observability for incidents, resource usage, and uptime',
      ],
      goals: [
        'Build a scalable multi-tenant backend foundation for restaurant operations',
        'Deliver real-time order and inventory events through WebSocket infrastructure',
        'Establish a monitored Dockerized production stack with clear deployment flow',
      ],
    },
    architecture: {
      diagramPlaceholder: 'CafeResto System Architecture',
      bullets: [
        'Ownership-based multi-tenant model with strict data segregation per restaurant entity.',
        'Event-driven real-time operations for orders, table flow, and inventory synchronization.',
        'Production infrastructure orchestrated with Docker and Nginx reverse proxying.',
        'Observability stack with Prometheus and Grafana for service and resource monitoring.',
      ],
      highlights: [
        {
          title: 'Tenant Isolation Layer',
          description: 'Every resource is validated against ownership chains to prevent cross-tenant leakage.',
        },
        {
          title: 'Operational Real-Time Core',
          description: 'Kitchen and floor states propagate instantly to reduce coordination delays.',
        },
      ],
    },
    decisions: [
      {
        title: 'Single Database Multi-Tenant Strategy',
        reasoning: 'Enabled central operational visibility while preserving per-restaurant ownership boundaries.',
        tradeoffs: 'Required strict query filtering and stronger authorization discipline in every service layer path.',
      },
      {
        title: 'Dockerized Production Topology with Monitoring',
        reasoning: 'Reduced deployment drift and ensured repeatable operational environments.',
        tradeoffs: 'Introduced upfront complexity in infrastructure design, health checks, and alert routing.',
      },
    ],
    deployment: {
      isDeployed: true,
      flow: 'Build -> Docker Images -> Nginx Routing -> Production Cluster',
      environment: 'Dockerized Linux servers with centralized monitoring and persistent PostgreSQL storage',
      details: [
        'Deployed as a live production ecosystem supporting active restaurant operations',
        '14-service Docker composition for core services, networking, and monitoring',
        'Service-level telemetry integrated into Prometheus dashboards and alerts',
        'Real-time operations validated under daily transactional load',
      ],
    },
    challenges: [
      {
        challenge: 'Keeping inventory and order states consistent across POS terminals and kitchen operators.',
        solution: 'Introduced event-synchronized workflows with transactional guards and live state propagation.',
        outcome: 'Operational updates converged quickly with inventory synchronization under one second.',
      },
      {
        challenge: 'Balancing tenant isolation with platform-level operational visibility for administrators.',
        solution: 'Implemented ownership-aware query boundaries and explicit role-scoped oversight endpoints.',
        outcome: 'Maintained strict tenant separation without losing centralized monitoring capabilities.',
      },
    ],
    impact: {
      improvements: [
        'Delivered a production-ready backend platform used by multiple restaurant tenants',
        'Improved operational reliability through real-time state synchronization and observability',
        'Established repeatable deployment and monitoring practices for long-term maintainability',
      ],
      learnings: [
        'Multi-tenant architecture quality depends heavily on disciplined data ownership modeling',
        'Production incidents become manageable only when telemetry is designed from the start',
        'Backend architecture and DevOps choices are tightly coupled in live operational products',
      ],
    },
  };

  private readonly projectFr: ProjectDetail = {
    id: 'caferesto',
    title: 'CafeResto — Plateforme Multi-Tenant d\'Operations Restaurant',
    summary:
      'Ecosysteme restaurant en production servant 14+ restaurants et 500+ transactions quotidiennes avec synchronisation inventaire temps réel sous 1 seconde et 99.5% de disponibilite.',
    status: 'production',
    role: 'Architecte Backend',
    roleContext: 'Architecte Backend (Fondations & DevOps)',
    techStack: ['Java 17', 'Spring Boot', 'PostgreSQL', 'WebSocket', 'Docker', 'Prometheus', 'Grafana', 'Nginx'],
    metrics: {
      team: 'Architecte Backend (principal), 3 ingénieurs',
      duration: '8 mois',
      scale: '14+ restaurants, 500+ transactions quotidiennes',
      keyOutcomes: [
        'Infrastructure Docker de 14 services monitorant 100+ metriques',
        'Synchronisation inventaire temps réel entre terminaux POS <1s',
        'Isolation multi-tenant avec zero incident de fuite de donnees',
      ],
    },
    context: {
      problem:
        'Les operateurs de restauration avaient besoin d\'une plateforme fiable pour coordonner commandes, flux cuisine, inventaire et activite du staff sur plusieurs entites.',
      constraints: [
        'Garantir une isolation stricte des tenants dans une architecture multi-tenant partagee',
        'Maintenir une synchronisation faible latence des commandes et du stock',
        'Assurer une observabilite de production pour incidents, ressources et disponibilite',
      ],
      goals: [
        'Construire une fondation backend multi-tenant scalable pour les operations restaurant',
        'Fournir des evenements temps réel commandes et inventaire via WebSocket',
        'Etablir une stack Docker en production avec monitoring et deploiement clair',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Architecture Systeme CafeResto',
      bullets: [
        'Modele multi-tenant base sur la propriete avec segregation stricte des donnees par restaurant.',
        'Operations temps réel event-driven pour commandes, flux des tables et synchronisation inventaire.',
        'Infrastructure de production orchestree par Docker avec routage Nginx.',
        'Stack d\'observabilite Prometheus et Grafana pour le monitoring des services.',
      ],
      highlights: [
        {
          title: 'Couche d\'Isolation Tenant',
          description: 'Chaque ressource est validee via des chaines de propriete pour eviter les fuites inter-tenants.',
        },
        {
          title: 'Noyau opérationnel Temps Réel',
          description: 'Les etats cuisine et salle sont propages instantanement pour reduire les delais de coordination.',
        },
      ],
    },
    decisions: [
      {
        title: 'Strategie Multi-Tenant Base Unique',
        reasoning: 'Permet une visibilite opérationnelle centrale tout en preservant les frontieres de propriete par restaurant.',
        tradeoffs: 'Necessite un filtrage strict des requetes et une discipline d\'autorisation dans toute la couche service.',
      },
      {
        title: 'Topologie Dockerisee avec Monitoring',
        reasoning: 'Reduit les ecarts entre environnements et garantit des deploiements repetables.',
        tradeoffs: 'Complexifie en amont l\'architecture infrastructure, les health checks et les alertes.',
      },
    ],
    deployment: {
      isDeployed: true,
      flow: 'Build -> Images Docker -> Routage Nginx -> Cluster Production',
      environment: 'Serveurs Linux Dockerises avec monitoring centralise et stockage PostgreSQL persistant',
      details: [
        'Deployee comme ecosysteme de production supportant des operations restaurant actives',
        'Composition Docker de 14 services pour les services coeur, le reseau et le monitoring',
        'Telemetrie de services integree aux dashboards et alertes Prometheus',
        'Operations temps réel validees sous charge transactionnelle quotidienne',
      ],
    },
    challenges: [
      {
        challenge: 'Maintenir la coherence des etats commandes et stock entre POS et equipe cuisine.',
        solution: 'Mise en place de workflows synchronises par evenements avec gardes transactionnelles.',
        outcome: 'Convergence rapide des mises a jour opérationnelles avec synchronisation inventaire sous 1 seconde.',
      },
      {
        challenge: 'Equilibrer isolation tenant et visibilite opérationnelle globale pour les administrateurs.',
        solution: 'Implementation de limites de requetes basees sur la propriete et endpoints scopes par role.',
        outcome: 'Separation stricte des tenants sans perte de capacite de supervision centralisee.',
      },
    ],
    impact: {
      improvements: [
        'Livraison d\'une plateforme backend production utilisee par plusieurs restaurants tenants',
        'Fiabilite opérationnelle renforcee via synchronisation temps réel et observabilite',
        'Pratiques de deploiement et monitoring repetables pour la maintenabilite long terme',
      ],
      learnings: [
        'La qualite multi-tenant depend fortement de la modelisation rigoureuse de la propriete des donnees',
        'Les incidents production deviennent gerables uniquement si la telemetrie est pensee des le depart',
        'Les choix d\'architecture backend et DevOps sont fortement couples en environnement live',
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
