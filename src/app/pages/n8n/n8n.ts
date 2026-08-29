import { Component, inject, OnInit } from '@angular/core';
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
  selector: 'app-n8n',
  standalone: true,
  imports: [FadeInDirective, RouterLink],
  templateUrl: './n8n.html',
  styleUrl: './n8n.css',
})
export class N8nComponent implements OnInit {
  readonly i18n = inject(I18nService);
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  private readonly projectEn: ProjectDetail = {
    id: 'n8n',
    title: 'n8n Automation Core — Workflow Automation Platform',
    summary:
      'Built a workflow-automation platform where n8n acts as the automation engine alongside a custom Spring Boot backend, an Angular frontend, and MySQL, all orchestrated by a single Docker Compose stack. The platform manages campaigns, leads, clients, categories, and archives, provides an email audit dashboard, selective sends, and template loading, and runs n8n workflows that automate email collection.',
    status: 'completed',
    role: 'Full-Stack Engineer',
    roleContext: 'Full-Stack Engineer (Automation & Infrastructure)',
    techStack: ['n8n', 'Spring Boot', 'Angular', 'MySQL', 'Docker Compose', 'phpMyAdmin'],
    metrics: {
      team: 'Full-Stack Engineer (automation, backend, frontend & infrastructure)',
      duration: 'End-to-end build: automation → backend → frontend → infrastructure',
      scale: '5-service Docker Compose stack: MySQL, phpMyAdmin, n8n, Spring Boot, Angular',
      keyOutcomes: [
        'n8n automation layer: a collector workflow turns city/keyword combinations into crawled business leads with emails',
        'Campaign orchestration with selective sends, template loading, and lead lists backed by an email audit dashboard',
        'One-command infrastructure: five services run together under a single Docker Compose stack with MySQL persistence',
      ],
    },
    context: {
      problem:
        'Outreach and lead-generation work scattered across manual email collection, separate tracking lists, and disconnected tools. There was no single system to organize categories and keywords into leads, run campaigns, send selectively, and audit what actually happened to each send.',
      constraints: [
        'Keep every service and dataset running under one Docker Compose topology with MySQL as the single database',
        'Automate email collection with n8n workflows instead of manual, repetitive searching',
        'Preserve history by archiving campaigns, campaign sends, and clients out of the operational schema',
      ],
      goals: [
        'Centralize campaign, lead, client, category, and archive management in one platform',
        'Automate lead acquisition: n8n workflows crawl places and collect emails that feed the backend',
        'Deliver operational frontend features: email audit dashboard, selective sends, and template loading',
        'Boot the whole platform — MySQL, phpMyAdmin, n8n, backend, frontend — with a single command',
      ],
    },
    architecture: {
      diagramPlaceholder: 'n8n Automation Core System Architecture',
      bullets: [
        'Angular frontend served by nginx, providing dashboards for campaigns, leads, clients, categories, archive, and email audit.',
        'Spring Boot backend exposing REST controllers for campaigns, sends, clients, categories, leads, search combinations, and archiving, backed by a secondary n8n_archive datasource.',
        'MySQL 8 database initialized by init-db.sql, persisting both the operational n8n schema and the n8n_archive schema in named volumes.',
        'n8n workflow engine (custom Docker image) running automation workflows such as emails_collector, which crawl places and collect emails.',
        'phpMyAdmin alongside MySQL for direct database management, with everything wired into one Docker Compose network.',
      ],
      highlights: [
        {
          title: 'n8n Automation Layer',
          description: 'Workflows drive lead/email collection; the n8n engine stores its state in the same MySQL instance and its own n8n_data volume.',
        },
        {
          title: 'Archive & Recovery',
          description: 'Archived campaigns, campaign sends, and clients are copied into a dedicated n8n_archive schema to preserve history beyond day-to-day operations.',
        },
      ],
    },
    decisions: [
      {
        title: 'n8n as the Automation Engine',
        reasoning: 'Provided a visual, configurable workflow platform for email collection and outreach without building automation infrastructure from scratch, while still allowing custom logic through JS Code nodes.',
        tradeoffs: 'Adds a Node.js service with its own MySQL-backed state (n8n_internal); it needs careful environment configuration around DB_TYPE=mysqldb and task-runner timeouts.',
      },
      {
        title: 'Single Docker Compose Topology',
        reasoning: 'One compose file defines MySQL, phpMyAdmin, n8n, the Spring Boot backend, and the Angular frontend, so the entire platform boots identically with a single command.',
        tradeoffs: 'Relies on a shared single instance with healthcheck-based dependency ordering; scale-out and high availability would require moving beyond Compose.',
      },
      {
        title: 'Dedicated Archive Datasource',
        reasoning: 'Keeping archived campaigns, sends, and clients in a separate n8n_archive schema keeps operational tables lean and makes recovery straightforward.',
        tradeoffs: 'Introduces a dual-datasource setup in Spring Boot, adding configuration and repository-wiring complexity.',
      },
    ],
    deployment: {
      isDeployed: false,
      details: ['Local development stack runnable in one Docker Compose command'],
      considerations: [
        'Fully containerizable: docker-compose.yml already runs MySQL, phpMyAdmin, n8n, the Spring Boot backend, and the Angular frontend together',
        'MySQL data is persisted in the mysql_data named volume; any production rollout should wrap these volumes with backup and restore procedures',
        'The Angular frontend is served by nginx; TLS termination, DNS, and reverse proxying would be added in front of the Compose network',
        'Environment-specific values such as root credentials and host ports should move to secrets management and .env overrides',
        'n8n workflows and credentials should be exported and versioned so the automation layer is reproducible',
      ],
    },
    challenges: [
      {
        challenge: 'Feeding unstructured web-crawled data into structured lead records.',
        solution: 'A Code node in the workflow normalizes city and keyword arrays, generates search-string combinations, runs an Apify Google Maps Scraper actor, and returns structured results that flow into the lead pipeline.',
        outcome: 'A repeatable automation path from city/keyword input to collected lead emails.',
      },
      {
        challenge: 'Coordinating campaign delivery states across schedules, sends, and send details.',
        solution: 'Dedicated controllers and services (CampaignController, CampaignSendController, campaign scheduler) enforce status transitions, while the selective-send dialog drives targeted delivery.',
        outcome: 'Campaign orchestration with per-send records auditable through the email audit dashboard.',
      },
      {
        challenge: 'Retaining history when campaigns, sends, or clients are removed from operations.',
        solution: 'The ArchiveService copies entities (ArchivedCampaign, ArchivedCampaignSend, ArchivedClient) into the dedicated n8n_archive datasource before they leave the operational schema.',
        outcome: 'A recoverable history trail kept separate from day-to-day operations.',
      },
    ],
    impact: {
      improvements: [
        'One Docker Compose command boots the entire platform: MySQL, phpMyAdmin, n8n, Spring Boot backend, and Angular frontend',
        'Automated email collection: n8n workflows turn city/keyword combinations into crawled leads instead of manual searching',
        'Full operations visibility: email audit dashboard, selective sends, template loading, and archive browsing',
      ],
      learnings: [
        'Workflow automation and application data benefit from sharing one orchestrator and one database',
        'Automation reliability depends on reproducible workflow exports and disciplined credential management',
        'Separating archive data from operational tables makes retention and recovery much simpler',
      ],
    },
  };

  private readonly projectFr: ProjectDetail = {
    id: 'n8n',
    title: 'n8n Automation Core — Plateforme d’Automatisation de Workflows',
    summary:
      'Construction d’une plateforme d’automatisation de workflows où n8n sert de moteur d’automatisation, accompagné d’un backend Spring Boot personnalisé, d’un frontend Angular et de MySQL, le tout orchestré par une stack Docker Compose unique. La plateforme gère campagnes, leads, clients, catégories et archives, fournit un dashboard d’audit e-mail, des envois sélectifs et un chargement de templates, et exécute des workflows n8n qui automatisent la collecte d’e-mails.',
    status: 'completed',
    role: 'Ingénieur Full-Stack',
    roleContext: 'Ingénieur Full-Stack (Automatisation & Infrastructure)',
    techStack: ['n8n', 'Spring Boot', 'Angular', 'MySQL', 'Docker Compose', 'phpMyAdmin'],
    metrics: {
      team: 'Ingénieur Full-Stack (automatisation, backend, frontend & infrastructure)',
      duration: 'Build de bout en bout : automatisation → backend → frontend → infrastructure',
      scale: 'Stack Docker Compose 5 services : MySQL, phpMyAdmin, n8n, Spring Boot, Angular',
      keyOutcomes: [
        'Couche d’automatisation n8n : un workflow collecteur transforme combinaisons ville/mot-clé en leads extraits avec e-mails',
        'Orchestration des campagnes avec envois sélectifs, chargement de templates et listes de leads, appuyée par un dashboard d’audit e-mail',
        'Infrastructure en une commande : cinq services exécutés ensemble sous une seule stack Docker Compose avec persistance MySQL',
      ],
    },
    context: {
      problem:
        'La génération de leads et les opérations d’outreach étaient dispersées entre collecte d’e-mails manuelle, listes de suivi séparées et outils déconnectés. Aucun système unique ne permettait d’organiser catégories et mots-clés en leads, de lancer des campagnes, d’envoyer sélectivement et d’auditer le résultat de chaque envoi.',
      constraints: [
        'Faire tourner tous les services et jeux de données sous une seule topologie Docker Compose avec MySQL comme base unique',
        'Automatiser la collecte d’e-mails avec des workflows n8n plutôt que par des recherches manuelles répétitives',
        'Préserver l’historique en archivant campagnes, envois de campagnes et clients hors du schéma opérationnel',
      ],
      goals: [
        'Centraliser la gestion des campagnes, leads, clients, catégories et archives dans une seule plateforme',
        'Automatiser l’acquisition de leads : les workflows n8n explorent les établissements et collectent des e-mails qui alimentent le backend',
        'Livrer des fonctionnalités frontend opérationnelles : dashboard d’audit e-mail, envois sélectifs et chargement de templates',
        'Démarrer toute la plateforme — MySQL, phpMyAdmin, n8n, backend, frontend — avec une seule commande',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Architecture Système n8n Automation Core',
      bullets: [
        'Frontend Angular servi par nginx, offrant des dashboards pour campagnes, leads, clients, catégories, archives et audit e-mail.',
        'Backend Spring Boot exposant des contrôleurs REST pour campagnes, envois, clients, catégories, leads, combinaisons de recherche et archivage, avec une datasource secondaire n8n_archive.',
        'Base MySQL 8 initialisée via init-db.sql, persistante pour le schéma opérationnel n8n et le schéma d’archive n8n_archive dans des volumes nommés.',
        'Moteur de workflows n8n (image Docker personnalisée) exécutant des automatisations telles que emails_collector qui explorent les établissements et collectent des e-mails.',
        'phpMyAdmin aux côtés de MySQL pour la gestion directe de la base, le tout câblé dans un seul réseau Docker Compose.',
      ],
      highlights: [
        {
          title: 'Couche d’Automatisation n8n',
          description: 'Les workflows pilotent la collecte de leads/e-mails ; le moteur n8n stocke son état dans la même instance MySQL et son propre volume n8n_data.',
        },
        {
          title: 'Archive & Récupération',
          description: 'Campagnes, envois de campagnes et clients archivés sont copiés dans un schéma n8n_archive dédié pour préserver l’historique au-delà des opérations courantes.',
        },
      ],
    },
    decisions: [
      {
        title: 'n8n comme Moteur d’Automatisation',
        reasoning: 'A fourni une plateforme de workflows visuelle et configurable pour la collecte d’e-mails et l’outreach sans construire d’infrastructure d’automatisation de zéro, tout en permettant une logique personnalisée via des nœuds JS Code.',
        tradeoffs: 'Ajoute un service Node.js avec son propre état basé sur MySQL (n8n_internal) ; il nécessite une configuration d’environnement précise autour de DB_TYPE=mysqldb et des timeouts du task runner.',
      },
      {
        title: 'Topologie Docker Compose Unique',
        reasoning: 'Un seul fichier compose définit MySQL, phpMyAdmin, n8n, le backend Spring Boot et le frontend Angular, de sorte que toute la plateforme démarre de façon identique avec une seule commande.',
        tradeoffs: 'Repose sur une instance unique partagée avec un ordre de dépendance basé sur les health checks ; le passage à l’échelle et la haute disponibilité exigeraient d’aller au-delà de Compose.',
      },
      {
        title: 'Datasource d’Archive Dédiée',
        reasoning: 'Conserver les campagnes, envois et clients archivés dans un schéma n8n_archive séparé maintient des tables opérationnelles légères et facilite la récupération.',
        tradeoffs: 'Introduit une configuration double datasource dans Spring Boot, ajoutant de la complexité de configuration et de câblage des repositories.',
      },
    ],
    deployment: {
      isDeployed: false,
      details: ['Stack de développement local exécutable en une seule commande Docker Compose'],
      considerations: [
        'Entièrement containerisable : docker-compose.yml fait déjà tourner ensemble MySQL, phpMyAdmin, n8n, le backend Spring Boot et le frontend Angular',
        'Les données MySQL sont persistées dans le volume nommé mysql_data ; tout passage en production devrait entourer ces volumes de procédures de sauvegarde et de restauration',
        'Le frontend Angular est servi par nginx ; terminaison TLS, DNS et reverse proxy seraient ajoutés devant le réseau Compose',
        'Les valeurs propres à l’environnement comme les identifiants root et les ports hôtes devraient passer à une gestion de secrets et à des overrides .env',
        'Les workflows et identifiants n8n devraient être exportés et versionnés pour que la couche d’automatisation soit reproductible',
      ],
    },
    challenges: [
      {
        challenge: 'Transformer des données web non structurées en enregistrements de leads structurés.',
        solution: 'Un nœud Code du workflow normalise les tableaux de villes et de mots-clés, génère des combinaisons de recherche, exécute l’acteur Apify Google Maps Scraper et renvoie des résultats structurés vers le pipeline de leads.',
        outcome: 'Un chemin d’automatisation reproductible de la saisie ville/mot-clé aux e-mails de leads collectés.',
      },
      {
        challenge: 'Coordonner les états de livraison des campagnes entre planifications, envois et détails d’envoi.',
        solution: 'Des contrôleurs et services dédiés (CampaignController, CampaignSendController, planificateur de campagnes) imposent les transitions d’état, tandis que la boîte de dialogue d’envoi sélectif pilote la livraison ciblée.',
        outcome: 'Orchestration des campagnes avec enregistrements par envoi auditables via le dashboard d’audit e-mail.',
      },
      {
        challenge: 'Conserver l’historique quand campagnes, envois ou clients sont retirés des opérations.',
        solution: 'L’ArchiveService copie les entités (ArchivedCampaign, ArchivedCampaignSend, ArchivedClient) dans la datasource dédiée n8n_archive avant qu’elles ne quittent le schéma opérationnel.',
        outcome: 'Une piste d’historique récupérable, tenue séparée des opérations courantes.',
      },
    ],
    impact: {
      improvements: [
        'Une seule commande Docker Compose démarre la plateforme entière : MySQL, phpMyAdmin, n8n, backend Spring Boot et frontend Angular',
        'Collecte d’e-mails automatisée : les workflows n8n transforment combinaisons ville/mot-clé en leads extraits, sans recherche manuelle',
        'Visibilité opérationnelle complète : dashboard d’audit e-mail, envois sélectifs, chargement de templates et navigation dans les archives',
      ],
      learnings: [
        'L’automatisation de workflows et les données applicatives gagnent à partager un même orchestrateur et une même base de données',
        'La fiabilité de l’automatisation repose sur des exports de workflows reproductibles et une gestion rigoureuse des identifiants',
        'Séparer les données d’archive des tables opérationnelles simplifie grandement la rétention et la récupération',
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