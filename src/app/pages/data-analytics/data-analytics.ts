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
  selector: 'app-data-analytics',
  standalone: true,
  imports: [FadeInDirective, RouterLink],
  templateUrl: './data-analytics.html',
  styleUrl: './data-analytics.css',
})
export class DataAnalyticsComponent implements OnInit {
  readonly i18n = inject(I18nService);
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  private readonly projectEn: ProjectDetail = {
    id: 'insighthub',
    title: 'InsightHub — AI-Powered Data Analytics Platform',
    summary:
      'Full-stack analytics platform that ingests uploaded CSV datasets, cleans and analyzes them, detects anomalies, compares periods, ranks top performers, surfaces trends, renders charts and relationship diagrams, and answers questions through an AI assistant grounded on the user\'s own data via a local Ollama LLM — orchestrated end to end with Docker Compose across an Angular frontend, a Spring Boot REST API, and a FastAPI analytics microservice.',
    status: 'production',
    role: 'Full-Stack Engineer',
    roleContext: 'Full-Stack Engineer (AI & Data)',
    techStack: ['Spring Boot', 'Angular', 'FastAPI', 'DuckDB', 'MySQL', 'Ollama', 'Docker Compose'],
    metrics: {
      team: 'Full-Stack Engineer (solo end-to-end build)',
      duration: '5-service Docker Compose stack: Angular, Spring Boot, FastAPI analytics, MySQL, Ollama',
      scale: 'DuckDB in-process analytics queries · local Ollama LLM grounded on uploaded datasets',
      keyOutcomes: [
        'End-to-end pipeline: upload CSV → clean → analyze → visualize → export',
        'Automated anomaly detection, period comparison, top performers, and trend insights',
        'Grounded AI assistant answering questions on uploaded datasets via a local Ollama model',
        'Relationship diagrams mapping how datasets reference one another',
      ],
    },
    context: {
      problem:
        'Data work was scattered across manual spreadsheets, throwaway scripts, and disconnected reports. There was no single place to upload a dataset, clean it, explore it statistically, compare time periods, and understand relationships between datasets — let alone ask questions about the data directly.',
      constraints: [
        'Orchestrate four heterogeneous runtimes (Angular, Java 21, Python 3, MySQL) as one reproducible stack',
        'Keep all analytics queries read-only and sandboxed when driven by LLM-generated SQL',
        'Run the AI assistant privately on local infrastructure with no external API dependency',
        'Expose a consistent REST API with JWT auth, DTOs, and centralized exception handling',
      ],
      goals: [
        'Deliver a single upload → cleaning → analysis → visualization workflow',
        'Automate anomaly detection, period comparison, top performers, and trend insights',
        'Map relationships between datasets with interactive diagrams',
        'Ground an AI assistant on the user\'s uploaded data through a local Ollama LLM',
      ],
    },
    architecture: {
      diagramPlaceholder: 'InsightHub Analytics Pipeline',
      bullets: [
        'Angular SPA covering auth, dashboards, dataset upload, dataset viewer, cleaning, charts, projects, and relationship diagrams.',
        'Spring Boot backend (Java 21) exposing REST controllers — Auth, Chat, Dashboard, Dataset, Insights, Project, and more — with Spring Data JPA, DTOs, and custom exception handlers.',
        'FastAPI analytics microservice performing cleaning, anomaly detection, period comparison, top/bottom performers, and trend detection with pandas.',
        'DuckDB executing validated read-only SQL in-process over the uploaded CSV datasets.',
        'MySQL 8 persisting users, datasets, projects, and relationships; Ollama serving a local grounded LLM for the project-page assistant.',
        'Docker Compose orchestrating the whole stack on a shared bridge network with named volumes (mysql-data, uploads-data, ollama-models).',
      ],
      highlights: [
        {
          title: 'Grounded AI Assistant',
          description: 'The project-page chat answers from the user\'s own datasets; any generated SQL is re-run as a validated read-only DuckDB query before results are shown.',
        },
        {
          title: 'Query Sandbox',
          description: 'LLM-proposed statements are restricted to SELECT/WITH, blocked from mutation keywords, limited to known tables, and bounded by a hard row limit and timeout.',
        },
      ],
    },
    decisions: [
      {
        title: 'Dedicated FastAPI Analytics Service',
        reasoning: 'Kept Python\'s data-science stack (pandas, DuckDB) isolated from the JVM application tier so analytics logic could evolve independently.',
        tradeoffs: 'Added a second backend to orchestrate; file formats, schemas, and error contracts must stay aligned across both services.',
      },
      {
        title: 'DuckDB as the In-Process Query Engine',
        reasoning: 'Schema-level analytics and LLM-generated SQL run fast over in-memory datasets without standing up a separate OLAP server.',
        tradeoffs: 'Queries are scoped to the uploaded datasets per request rather than a shared warehouse, trading breadth for simplicity.',
      },
      {
        title: 'Local Ollama LLM over a Hosted API',
        reasoning: 'Kept the assistant private, self-contained, and free of per-token costs while still grounding answers on dataset summaries.',
        tradeoffs: 'Answer quality is bounded by local CPU/RAM, first requests can be slow while the model loads, and `ollama pull` is a required one-time manual step.',
      },
    ],
    deployment: {
      isDeployed: true,
      flow: 'Build Services → Docker Images → docker compose up → Shared app-network Stack',
      environment: 'Docker Compose multi-service stack on a shared bridge network with named volumes (mysql-data, uploads-data, ollama-models)',
      details: [
        '5-service stack: Angular frontend (Nginx on 4200), Spring Boot backend (8080), FastAPI analytics (8000), MySQL 8 (3306), Ollama (11434)',
        'Health checks plus depends_on condition ordering bring services up in the right sequence',
        'Named volumes persist MySQL data and downloaded Ollama models across restarts',
        'PHPMyAdmin included on port 8081 for convenient database administration',
      ],
    },
    challenges: [
      {
        challenge: 'Orchestrating heterogeneous runtimes (Angular, Java 21, Python, MySQL) into one reproducible stack.',
        solution: 'A single docker-compose.yml with a shared bridge network, named volumes, health checks, and depends_on ordering.',
        outcome: 'The entire platform starts with a single `docker compose up --build` on any Docker host.',
      },
      {
        challenge: 'Making the AI assistant answer honestly and safely from uploaded data instead of hallucinating or mutating datasets.',
        solution: 'The backend grounds the assistant on dataset summaries, and generated SQL goes through a read-only DuckDB sandbox (SELECT/WITH only, blocked keywords, 5-second timeout).',
        outcome: 'Assistant responses stay constrained to the user\'s data, and dataset retrieval remains strictly read-only.',
      },
      {
        challenge: 'Two backend runtimes (Spring + FastAPI) needing to agree on file formats and identifiers.',
        solution: 'Standardized DTOs, shared upload semantics, and mirrored table-name sanitizers implemented on both sides.',
        outcome: 'The analytics service stays interchangeable behind the Spring API while preserving a single coherent contract.',
      },
    ],
    impact: {
      improvements: [
        'One coherent platform replaces disconnected spreadsheets and ad-hoc scripts for dataset workflows',
        'Self-serve analytics: anomalies, period comparisons, top performers, and trends computed automatically',
        'An AI assistant that answers questions grounded strictly in the uploaded data',
      ],
      learnings: [
        'Separating analytics into a dedicated service keeps data-heavy Python tooling from leaking into the application backend',
        'Safe agentic SQL demands defense in depth: syntax parsing, keyword blacklists, row limits, and hard timeouts',
        'A local LLM keeps AI features private and self-contained, at the cost of manual model provisioning',
      ],
    },
  };

  private readonly projectFr: ProjectDetail = {
    id: 'insighthub',
    title: 'InsightHub — Plateforme d\'Analytics de Données Propulsée par l\'IA',
    summary:
      'Plateforme d\'analytics full-stack qui ingère des jeux de données CSV téléversés, les nettoie et les analyse, détecte les anomalies, compare les périodes, classe les meilleurs performers, révèle les tendances, rend des graphiques et des diagrammes de relations, et répond aux questions via un assistant IA ancré dans les propres données de l\'utilisateur grâce à un LLM local Ollama — orchestrée de bout en bout avec Docker Compose entre un frontend Angular, une API REST Spring Boot et un microservice d\'analytics FastAPI.',
    status: 'production',
    role: 'Ingénieur Full-Stack',
    roleContext: 'Ingénieur Full-Stack (IA & Données)',
    techStack: ['Spring Boot', 'Angular', 'FastAPI', 'DuckDB', 'MySQL', 'Ollama', 'Docker Compose'],
    metrics: {
      team: 'Ingénieur Full-Stack (construction complète en solo)',
      duration: 'Stack Docker Compose de 5 services : Angular, Spring Boot, analytics FastAPI, MySQL, Ollama',
      scale: 'Requêtes d\'analytics en mémoire via DuckDB · LLM local Ollama ancré sur les jeux de données',
      keyOutcomes: [
        'Pipeline de bout en bout : téléversement CSV → nettoyage → analyse → visualisation → export',
        'Détection automatique d\'anomalies, comparaison de périodes, meilleurs performers et insights de tendances',
        'Assistant IA ancré qui répond aux questions sur les jeux de données via un modèle Ollama local',
        'Diagrammes de relations montrant comment les jeux de données se référencent entre eux',
      ],
    },
    context: {
      problem:
        'L\'analyse de données était éparpillée entre feuilles de calcul manuelles, scripts jetables et rapports déconnectés. Il n\'existait pas d\'endroit unique pour téléverser un jeu de données, le nettoyer, l\'explorer statistiquement, comparer des périodes et comprendre les relations entre jeux de données — sans même parler de pouvoir poser des questions directement sur les données.',
      constraints: [
        'Orchestrer quatre runtimes hétérogènes (Angular, Java 21, Python 3, MySQL) en une seule stack reproductible',
        'Garder toutes les requêtes d\'analytics en lecture seule et sandboxées quand elles sont générées par IA',
        'Faire tourner l\'assistant IA en local, de façon privée, sans dépendance à une API externe',
        'Exposer une API REST cohérente avec auth JWT, DTOs et gestion centralisée des exceptions',
      ],
      goals: [
        'Fournir un workflow unique : téléversement → nettoyage → analyse → visualisation',
        'Automatiser la détection d\'anomalies, la comparaison de périodes, les meilleurs performers et les tendances',
        'Cartographier les relations entre jeux de données avec des diagrammes interactifs',
        'Ancrer un assistant IA sur les données téléversées via un LLM Ollama local',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Pipeline d\'analytics InsightHub',
      bullets: [
        'SPA Angular couvrant auth, dashboards, téléversement de jeux de données, visualiseur, nettoyage, graphiques, projets et diagrammes de relations.',
        'Backend Spring Boot (Java 21) exposant des contrôleurs REST — Auth, Chat, Dashboard, Dataset, Insights, Project, etc. — avec Spring Data JPA, DTOs et gestionnaires d\'exceptions personnalisés.',
        'Microservice d\'analytics FastAPI réalisant nettoyage, détection d\'anomalies, comparaison de périodes, meilleurs performers et tendances avec pandas.',
        'DuckDB exécutant des requêtes SQL validées en lecture seule, en mémoire, sur les jeux de données CSV téléversés.',
        'MySQL 8 persistant utilisateurs, jeux de données, projets et relations ; Ollama servant un LLM local ancré pour l\'assistant des pages projet.',
        'Docker Compose orchestrant toute la stack sur un réseau bridge partagé avec volumes nommés (mysql-data, uploads-data, ollama-models).',
      ],
      highlights: [
        {
          title: 'Assistant IA Ancrée',
          description: 'Le chat des pages projet répond à partir des propres jeux de données ; tout SQL généré est réexécuté en tant que requête DuckDB en lecture seule validée avant affichage.',
        },
        {
          title: 'Sandbox de Requêtes',
          description: 'Les requêtes proposées par le LLM sont limitées à SELECT/WITH, bloquées des mots-clés de mutation, restreintes aux tables connues et bornées par un limiteur de lignes et un timeout.',
        },
      ],
    },
    decisions: [
      {
        title: 'Service d\'Analytics FastAPI Dédié',
        reasoning: 'A isolé la stack data-science Python (pandas, DuckDB) de la couche applicative JVM pour que l\'analytics évolue de façon indépendante.',
        tradeoffs: 'Ajoute un second backend à orchestrer ; formats de fichiers, schémas et contrats d\'erreur doivent rester alignés entre les deux services.',
      },
      {
        title: 'DuckDB comme Moteur de Requêtes en Mémoire',
        reasoning: 'Les analyses de schéma et le SQL généré via LLM s\'exécutent rapidement sur les jeux de données en mémoire, sans serveur OLAP dédié.',
        tradeoffs: 'Les requêtes restent limitées aux jeux de données téléversés par requête plutôt qu\'à un entrepôt partagé : un compromis simplicité contre portée.',
      },
      {
        title: 'Ollama Local plutôt qu\'une API Hébergée',
        reasoning: 'A gardé l\'assistant privé, autonome et sans coût par requête, tout en ancrant les réponses sur les résumés des jeux de données.',
        tradeoffs: 'La qualité des réponses dépend du CPU/RAM local, les premières requêtes peuvent être lentes au chargement du modèle et « ollama pull » reste une étape manuelle ponctuelle obligatoire.',
      },
    ],
    deployment: {
      isDeployed: true,
      flow: 'Build Services → Images Docker → docker compose up → Stack réseau app-network partagé',
      environment: 'Stack multi-services Docker Compose sur un réseau bridge partagé avec volumes nommés (mysql-data, uploads-data, ollama-models)',
      details: [
        'Stack 5 services : frontend Angular (Nginx sur 4200), backend Spring Boot (8080), analytics FastAPI (8000), MySQL 8 (3306), Ollama (11434)',
        'Health checks et ordre de démarrage via les conditions depends_on',
        'Volumes nommés qui persistent les données MySQL et les modèles Ollama téléchargés entre les redémarrages',
        'PHPMyAdmin inclus sur le port 8081 pour une administration pratique de la base',
      ],
    },
    challenges: [
      {
        challenge: 'Orchestrer des runtimes hétérogènes (Angular, Java 21, Python, MySQL) en une seule stack reproductible.',
        solution: 'Un docker-compose.yml unique avec réseau bridge partagé, volumes nommés, health checks et ordonnancement depends_on.',
        outcome: 'Toute la plateforme démarre avec une seule commande `docker compose up --build` sur n\'importe quel hôte Docker.',
      },
      {
        challenge: 'Faire répondre l\'assistant IA honnêtement et en sécurité à partir des données téléversées, sans hallucination ni mutation.',
        solution: 'Le backend ancre l\'assistant sur les résumés des jeux de données, et le SQL généré passe par un sandbox DuckDB en lecture seule (SELECT/WITH uniquement, mots-clés bloqués, timeout de 5 secondes).',
        outcome: 'Les réponses de l\'assistant restent limitées aux données de l\'utilisateur et la consultation reste strictement en lecture seule.',
      },
      {
        challenge: 'Deux runtimes backend (Spring + FastAPI) devant s\'accorder sur les formats de fichiers et les identifiants.',
        solution: 'DTOs standardisés, sémantique de téléversement partagée et sanitizers de noms de tables miroirs implémentés des deux côtés.',
        outcome: 'Le service d\'analytics reste interchangeable derrière l\'API Spring tout en préservant un contrat unique et cohérent.',
      },
    ],
    impact: {
      improvements: [
        'Une plateforme cohérente remplace les feuilles de calcul et les scripts jetables pour les workflows de données',
        'Analytics en self-service : anomalies, comparaisons de périodes, meilleurs performers et tendances calculés automatiquement',
        'Un assistant IA qui répond à partir des données téléversées, sans s\'appuyer sur des connaissances extérieures',
      ],
      learnings: [
        'Séparer l\'analytics dans un service dédié évite que l\'outillage Python data-heavy ne contamine le backend applicatif',
        'Le SQL agentique sûr exige une défense en profondeur : analyse syntaxique, blacklists de mots-clés, limites de lignes et timeouts',
        'Un LLM local rend l\'IA privée et autonome, au prix d\'un provisionnement manuel des modèles',
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