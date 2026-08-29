import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { I18nService } from '../../core/i18n.service';
import { OnInit } from '@angular/core';

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
  selector: 'app-bookpro',
  standalone: true,
  imports: [FadeInDirective, RouterLink],
  templateUrl: './bookpro.html',
  styleUrl: './bookpro.css',
})

export class BookproComponent implements OnInit {
  readonly i18n = inject(I18nService);
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  private readonly projectEn: ProjectDetail = {
    id: 'bookpro',
    title: 'BookPro — Salon & Professional Booking Platform',
    summary:
      'Designed, built, containerized, deployed, and operated a production booking platform that connects clients with salon and beauty professionals. The scope spans a Spring Boot backend API surface, an Angular client with role-scoped modules, booking and waitlist flows, a point-of-sale (caisse) module, wholesale ordering for professionals, and a full Dockerized production stack with monitoring, scheduled backups, and a GitHub Actions CI pipeline.',
    status: 'production',
    role: 'Full-Stack Engineer',
    roleContext: 'Full-Stack Engineer (Deployment & Operations focused)',
    techStack: ['Spring Boot', 'Angular', 'MySQL', 'Docker', 'Nginx', 'Prometheus', 'Grafana', 'GitHub Actions'],
    metrics: {
      team: 'Full-Stack Engineer (end-to-end, product to ops)',
      duration: 'Full lifecycle — from design to live production',
      scale: '22 role-specific feature areas · 17 REST controllers · multi-role platform',
      keyOutcomes: [
        'Live production deployment served at bookpro.educanet.pro',
        'Containerized multi-service stack with scheduled database backups (7-day retention, configurable)',
        'Observability and uptime visibility via Prometheus, Grafana, cAdvisor, and health checks against the live URL',
        'CI pipeline producing the Angular production build and an Android APK artifact on every push and PR',
      ],
    },
    context: {
      problem:
        'Salons and beauty professionals lacked a reliable way for clients to discover professionals, check availability, and book appointments online. Owners, in turn, had no single tool to manage reservations, dispatch assistants (aide), handle in-shop payments (caisse), reorder supplies wholesale, or see their performance.',
      constraints: [
        'Support multiple roles — client, professional/owner, assistant (aide), and platform admin — with clear authorization boundaries',
        'Remain reliable and available as a live production system handling real booking operations',
        'Reconcile competing booking states: availability, waitlist, favorites, and notifications without conflict',
      ],
      goals: [
        'Deliver end-to-end booking workflows from discovery to confirmed appointment with notifications',
        'Equip professionals with operational tooling: dashboard, point-of-sale (caisse), statistics, and management',
        'Run the platform in production with monitoring, scheduled backups, and an automated CI pipeline',
      ],
    },
    architecture: {
      diagramPlaceholder: 'BookPro Production Architecture',
      bullets: [
        'Angular client consuming the Spring Boot REST APIs, split into role-scoped areas for clients, professionals, assistants (aide), and admins.',
        'Spring Boot backend exposing 17 controllers covering auth, availability, reservations, waitlist, caisse, wholesale, favorites, gallery, and notifications.',
        'MySQL 8.4 as the persistent data store (bookpro_db) with a scheduled Docker backup container and configurable 7-day retention.',
        'Observability through Prometheus, Grafana, and cAdvisor, plus a dedicated monitoring service health-checking the live front URL and backend health endpoint.',
      ],
      highlights: [
        {
          title: 'Role-Based Operations',
          description: 'Clients book, owners manage, assistants (aide) handle assignments and dispatch, and admins run a platform dashboard — all within one shared codebase.',
        },
        {
          title: 'Production Resilience',
          description: 'Scheduled database backups, live-URL health checks, and a Prometheus/Grafana/cAdvisor telemetry stack keep the live platform observable and recoverable.',
        },
      ],
    },
    decisions: [
      {
        title: 'Angular + Spring Boot Full-Stack Split',
        reasoning: 'An API-first boundary lets one backend power booking, POS (caisse), wholesale, and admin workflows while the Angular client ships distinct role-scoped modules.',
        tradeoffs: 'Role sprawl across many frontend feature modules requires strict route and API guards, plus disciplined data modeling to keep the authorization model consistent.',
      },
      {
        title: 'Dockerized Production Stack with Backup & Observability',
        reasoning: 'A repeatable Docker Compose topology standardizes MySQL 8.4, the Spring Boot backend, the Angular frontend, and phpMyAdmin behind an nginx auth proxy, with a dedicated scheduled backup container.',
        tradeoffs: 'More moving parts to operate; reliability depends on health checks, monitoring, and backup retention being actively maintained.',
      },
      {
        title: 'GitHub Actions CI Pipeline',
        reasoning: 'Automating the production Angular build, Capacitor Android sync, and debug APK artifact on every push and pull request keeps delivery consistent.',
        tradeoffs: 'The pipeline is focused on the frontend and APK output; backend builds are handled within the Docker deployment rather than a separate job.',
      },
    ],
    deployment: {
      isDeployed: true,
      liveUrl: 'https://bookpro.educanet.pro',
      flow: 'GitHub Actions CI -> Docker Images -> Docker Compose -> Production (bookpro.educanet.pro)',
      environment: 'Docker Compose production stack with MySQL 8.4 storage, scheduled backups, nginx routing, and an authenticated phpMyAdmin entry point',
      details: [
        'Live production system served at bookpro.educanet.pro with a monitoring service health-checking the front URL and the backend actuator endpoint',
        'Multi-service Dockerized stack: MySQL 8.4, Spring Boot backend (built WAR/JAR image with Dockerfile), Angular frontend, phpMyAdmin behind an nginx auth proxy, scheduled backup, monitoring, Prometheus, Grafana, and cAdvisor',
        'Scheduled backup container against the database with configurable retention (7 days), mounting persistent uploads and backup volumes',
        'GitHub Actions CI pipeline producing the Angular production build and a debug APK artifact',
      ],
    },
    challenges: [
      {
        challenge: 'Coordinating availability, waitlist, favorites, and notifications across clients and professionals without double-booking.',
        solution: 'Dedicated availability and reservation services with explicit server-side business logic, backed by waitlist and notification flows for full slots.',
        outcome: 'Booking state converges across roles through the backend, with notifications keeping clients and professionals in sync.',
      },
      {
        challenge: 'Operating a live booking system reliably — protecting data and spotting incidents before they affect users.',
        solution: 'Scheduled Docker backups with retention, health checks against the live URL, and a Prometheus/Grafana/cAdvisor observability stack.',
        outcome: 'Production visibility with a health-checked front, monitored services, and recoverable data.',
      },
    ],
    impact: {
      improvements: [
        'Delivered an end-to-end booking platform — from professional discovery to confirmed reservation to in-shop checkout — running in production',
        'Hardened operations with scheduled backups, monitoring dashboards, and health checks against the live URL',
        'Established a CI pipeline so frontend builds and Android artifacts are produced automatically on every push and pull request',
      ],
      learnings: [
        'Diverse user roles demand clean API boundaries and disciplined authorization guards across every module',
        'Monitoring, backups, and health checks are prerequisites, not afterthoughts, for a real production booking system',
        'Deploying and operating a live product surfaces issues that feature development alone never reveals',
      ],
    },
  };

  private readonly projectFr: ProjectDetail = {
    id: 'bookpro',
    title: 'BookPro — Plateforme de Réservation Salon & Professionnels',
    summary:
      'Conçu, construit, conteneurisé, déployé et exploité une plateforme de réservation en production reliant clients et professionnels de salon. Le scope couvre les APIs Spring Boot, le client Angular avec modules par role, les flux de réservation et liste d\'attente, le module caisse (point de vente), la commande grossiste pour professionnels, et une stack Docker complète avec monitoring, sauvegardes planifiees et pipeline CI GitHub Actions.',
    status: 'production',
    role: 'Ingénieur Full-Stack',
    roleContext: 'Ingénieur Full-Stack (axé Déploiement & Opérations)',
    techStack: ['Spring Boot', 'Angular', 'MySQL', 'Docker', 'Nginx', 'Prometheus', 'Grafana', 'GitHub Actions'],
    metrics: {
      team: 'Ingénieur Full-Stack (de bout en bout, produit vers ops)',
      duration: 'Cycle complet — de la conception a la production live',
      scale: '22 zones fonctionnelles · 17 controleurs REST · plateforme multi-roles',
      keyOutcomes: [
        'Systeme de production live servi sur bookpro.educanet.pro',
        'Stack conteneurisee multi-services avec sauvegardes base planifiees (retention 7 jours, configurable)',
        'Visibilite de disponibilite via Prometheus, Grafana, cAdvisor et health checks sur l\'URL live',
        'Pipeline CI produisant le build Angular de production et un artefact APK Android a chaque push et PR',
      ],
    },
    context: {
      problem:
        'Les salons et professionnels de la beaute manquaient d\'une plateforme fiable pour la decouverte, la verification des disponibilites et la prise de rendez-vous en ligne. Les proprietaires, eux, n\'avaient aucun outil unique pour gerer les reservations, les affectations des aides, les encaissements (caisse), les commandes grossistes et leurs statistiques.',
      constraints: [
        'Supporter plusieurs roles — client, professionnel/proprietaire, aide et admin — avec des limites d\'autorisation claires',
        'Rester fiable et disponible comme systeme de production gerant de vraies operations de reservation',
        'Concilier les etats conflictuels : disponibilites, liste d\'attente, favoris et notifications sans conflit',
      ],
      goals: [
        'Fournir des flux de reservation de bout en bout, de la decouverte au rendez-vous confirme avec notifications',
        'Equiper les professionnels d\'outils opérationnels : dashboard, caisse (point de vente), statistiques et gestion',
        'Exploiter la plateforme en production avec monitoring, sauvegardes planifiees et pipeline CI automatise',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Architecture de Production BookPro',
      bullets: [
        'Client Angular consommant les APIs REST Spring Boot, decoupe en zones par role : clients, professionnels, aides et administrateurs.',
        'Backend Spring Boot exposant 17 controleurs : auth, disponibilites, reservations, liste d\'attente, caisse, grossiste, favoris, galerie et notifications.',
        'MySQL 8.4 comme magasin de donnees persistant (bookpro_db) avec conteneur de sauvegarde planifiee et retention configurable de 7 jours.',
        'Observabilite via Prometheus, Grafana et cAdvisor, plus un service de monitoring verifiant l\'URL front live et l\'endpoint health backend.',
      ],
      highlights: [
        {
          title: 'Operations Multi-Roles',
          description: 'Les clients reserver, les proprietaires gerent, les aides traitent les affectations et le dispatch, et les admins pilotent un dashboard plateforme — au sein d\'un meme codebase.',
        },
        {
          title: 'Resilience de Production',
          description: 'Sauvegardes base planifiees, health checks sur l\'URL live et une stack de telemetrie Prometheus/Grafana/cAdvisor rendent la plateforme live observable et recuperable.',
        },
      ],
    },
    decisions: [
      {
        title: 'Decoupage Full-Stack Angular + Spring Boot',
        reasoning: 'Une frontiere API-first permet au meme backend d\'alimenter reservation, caisse, grossiste et admin pendant que le client Angular livre des modules distincts scopes par role.',
        tradeoffs: 'La proliferation des roles sur de nombreux modules frontend exige des guards de routes et d\'API stricts, ainsi qu\'une modelisation des donnees rigoureuse.',
      },
      {
        title: 'Stack de Production Dockerisee avec Sauvegarde & Observabilite',
        reasoning: 'Une topologie Docker Compose reproductible standardise MySQL 8.4, le backend Spring Boot, le frontend Angular et phpMyAdmin derriere un proxy nginx auth, avec un conteneur de sauvegarde planifiee.',
        tradeoffs: 'Plus de pieces a exploiter ; la fiabilite depend d\'un entretien actif des health checks, du monitoring et de la retention des sauvegardes.',
      },
      {
        title: 'Pipeline CI GitHub Actions',
        reasoning: 'Automatiser le build Angular de production, la synchro Capacitor Android et l\'artefact APK debug a chaque push et PR rend la livraison coherente.',
        tradeoffs: 'Le pipeline est focalise sur le frontend et l\'APK ; le backend est construit via le deploiement Docker plutot que dans un job separe.',
      },
    ],
    deployment: {
      isDeployed: true,
      liveUrl: 'https://bookpro.educanet.pro',
      flow: 'CI GitHub Actions -> Images Docker -> Docker Compose -> Production (bookpro.educanet.pro)',
      environment: 'Stack de production Docker Compose avec stockage MySQL 8.4, sauvegardes planifiees, routage nginx et entrepoint phpMyAdmin authentifie',
      details: [
        'Systeme de production live servi sur bookpro.educanet.pro avec un service de monitoring verifiant l\'URL front et l\'endpoint actuator backend',
        'Stack Dockerisee multi-services : MySQL 8.4, backend Spring Boot (image WAR/JAR construite avec Dockerfile), frontend Angular, phpMyAdmin derriere un proxy nginx auth, sauvegarde planifiee, monitoring, Prometheus, Grafana et cAdvisor',
        'Conteneur de sauvegarde planifie contre la base avec retention configurable (7 jours), montant les volumes persistants uploads et backups',
        'Pipeline CI GitHub Actions produisant le build Angular de production et un artefact APK debug',
      ],
    },
    challenges: [
      {
        challenge: 'Coordonner disponibilites, liste d\'attente, favoris et notifications entre clients et professionnels sans double-reservation.',
        solution: 'Services dedies disponibilites et reservations avec logique metier serveur explicite, appuyes par des flux de liste d\'attente et notifications pour les creneaux pleins.',
        outcome: 'L\'etat des reservations converge entre roles via le backend, les notifications tenant clients et professionnels synchronises.',
      },
      {
        challenge: 'Exploiter un systeme de reservation live de maniere fiable — proteger les donnees et reperer les incidents avant qu\'ils n\'affectent les utilisateurs.',
        solution: 'Sauvegardes Docker planifiees avec retention, health checks sur l\'URL live et une stack d\'observabilite Prometheus/Grafana/cAdvisor.',
        outcome: 'Visibilite de production avec front verifie, services monitorés et donnees recuperables.',
      },
    ],
    impact: {
      improvements: [
        'Livraison d\'une plateforme de reservation complete — de la decouverte du professionnel a la reservation confirmee et a l\'encaissement en boutique — en production',
        'Operations durcies avec sauvegardes planifiees, dashboards de monitoring et health checks sur l\'URL live',
        'Mise en place d\'un pipeline CI produisant automatiquement les builds frontend et les artefacts Android a chaque push et pull request',
      ],
      learnings: [
        'Des roles utilisateur varies exigent des frontieres d\'API propres et des guards d\'autorisation rigoureux dans chaque module',
        'Monitoring, sauvegardes et health checks sont des prerequis, pas des apres-pensees, pour un systeme de reservation en production',
        'Deployer et exploiter un produit live revele des problemes que le seul developpement de features ne montre jamais',
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