import { ProjectDetail } from '../project-detail';

export const BOOKPRO: { en: ProjectDetail; fr: ProjectDetail } = {
  en: {
    id: 'bookpro',
    title: 'BookPro — Booking Platform',
    summary:
      'Production booking platform connecting clients with salon and beauty professionals — as a web app and a Capacitor Android APK. Spring Boot API, Angular client, real-time WebSocket, booking & waitlist, POS (caisse), wholesale, Firebase push, map discovery, and a Dockerized stack with monitoring, backups, and a CI pipeline producing an installable APK.',
    status: 'production',
    role: 'Full-Stack Engineer',
    roleContext: 'Full-Stack Engineer (Deployment & Ops)',
    techStack: [
      'Spring Boot',
      'Angular',
      'Angular Material',
      'MySQL',
      'WebSocket',
      'Firebase',
      'Docker',
      'Nginx',
      'Prometheus',
      'Grafana',
      'cAdvisor',
      'Capacitor',
      'Leaflet',
      'Chart.js',
      'GitHub Actions',
    ],
    metrics: {
      team: 'Full-Stack Engineer (end-to-end, product to ops)',
      duration: 'Full lifecycle — from design to live production',
      scale: '17 REST controllers · 24 domain entities · multi-role web + Android app',
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
        'Angular + Angular Material client split into role-scoped areas: client, professional, aide, and admin.',
        'Spring Boot backend with 17 controllers (auth, reservations, waitlist, caisse, wholesale, favorites, and more) with real-time updates over WebSocket.',
        'Firebase Cloud Messaging push notifications, Leaflet map-based discovery, and Chart.js analytics dashboards.',
        'Capacitor wraps the Angular app into a native Android APK via the GitHub Actions CI pipeline.',
        'MySQL 8.4 (bookpro_db) with scheduled Docker backups and configurable 7-day retention.',
        'Observability via Prometheus, Grafana, and cAdvisor, with live-URL and backend health checks.',
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
        {
          title: 'Web + Mobile from One Codebase',
          description: 'The same Angular application ships as a production web app and as a Capacitor-packed Android APK, reusing one backend and one CI pipeline for both surfaces.',
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
      apkUrl: '#apk-placeholder',
      flow: 'GitHub Actions CI -> Docker Images -> Docker Compose -> Production (bookpro.educanet.pro)',
      environment: 'Docker Compose production stack with MySQL 8.4 storage, scheduled backups, nginx routing, and an authenticated phpMyAdmin entry point',
      details: [
        'Live production system served at bookpro.educanet.pro with a monitoring service health-checking the front URL and the backend actuator endpoint (api-bookpro.educanet.pro)',
        'Multi-service Dockerized stack: MySQL 8.4, Spring Boot backend (built JAR image with Dockerfile), Angular frontend served by nginx, phpMyAdmin behind an nginx auth proxy, scheduled backup, monitoring, Prometheus, Grafana, and cAdvisor',
        'Scheduled backup container against the database with configurable retention (7 days), mounting persistent uploads and backup volumes',
        'GitHub Actions CI pipeline producing the Angular production build and a debug APK artifact on every push and pull request',
      ],
    },
    mobile: {
      platform: 'Android (Capacitor)',
      storeStatus: 'Not yet on the Play Store — distributed as an installable APK',
      build: 'debug APK artifact produced by the CI pipeline (assembleDebug)',
      details: [
        'The same Angular frontend is wrapped with Capacitor into a native Android app (com.coiffure.app)',
        'Push notifications via Firebase Cloud Messaging, geolocation/maps via Leaflet, and offline-friendly mobile UI built with Angular Material',
        'APK is downloadable for direct installation; a public store listing is planned',
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
  },
  fr: {
    id: 'bookpro',
    title: 'BookPro — Plateforme de Réservation Salon',
    summary:
      'Plateforme de réservation en production reliant clients et professionnels de salon — en web et en APK Android Capacitor. API Spring Boot, client Angular, temps réel WebSocket, réservation & liste d\'attente, caisse, grossiste, push Firebase, découverte sur carte, et une stack Docker avec monitoring, sauvegardes et pipeline CI produisant un APK installable.',
    status: 'production',
    role: 'Ingénieur Full-Stack',
    roleContext: 'Ingénieur Full-Stack (Déploiement & Ops)',
    techStack: [
      'Spring Boot',
      'Angular',
      'Angular Material',
      'MySQL',
      'WebSocket',
      'Firebase',
      'Docker',
      'Nginx',
      'Prometheus',
      'Grafana',
      'cAdvisor',
      'Capacitor',
      'Leaflet',
      'Chart.js',
      'GitHub Actions',
    ],
    metrics: {
      team: 'Ingénieur Full-Stack (de bout en bout, produit vers ops)',
      duration: 'Cycle complet — de la conception a la production live',
      scale: '17 controleurs REST · 24 entites de domaine · plateforme multi-roles web + Android',
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
        'Client Angular + Angular Material decoupe en zones par role : client, professionnel, aide et admin.',
        'Backend Spring Boot avec 17 controleurs (auth, reservations, liste d\'attente, caisse, grossiste, favoris, etc.) avec temps reel via WebSocket.',
        'Notifications push Firebase Cloud Messaging, decouverte sur carte Leaflet et dashboards analytics Chart.js.',
        'Capacitor empaquette l\'app Angular en APK Android natif via le pipeline CI GitHub Actions.',
        'MySQL 8.4 (bookpro_db) avec sauvegardes Docker planifiees et retention configurable de 7 jours.',
        'Observabilite via Prometheus, Grafana et cAdvisor, avec health checks URL live et backend.',
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
        {
          title: 'Web + Mobile sur un Seul Codebase',
          description: 'La meme application Angular est livree en web de production et en APK Android empaquete avec Capacitor, reutilisant un seul backend et un seul pipeline CI pour les deux surfaces.',
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
      apkUrl: '#apk-placeholder',
      flow: 'CI GitHub Actions -> Images Docker -> Docker Compose -> Production (bookpro.educanet.pro)',
      environment: 'Stack de production Docker Compose avec stockage MySQL 8.4, sauvegardes planifiees, routage nginx et entrepoint phpMyAdmin authentifie',
      details: [
        'Systeme de production live servi sur bookpro.educanet.pro avec un service de monitoring verifiant l\'URL front et l\'endpoint actuator backend (api-bookpro.educanet.pro)',
        'Stack Dockerisee multi-services : MySQL 8.4, backend Spring Boot (image JAR construite avec Dockerfile), frontend Angular servi par nginx, phpMyAdmin derriere un proxy nginx auth, sauvegarde planifiee, monitoring, Prometheus, Grafana et cAdvisor',
        'Conteneur de sauvegarde planifie contre la base avec retention configurable (7 jours), montant les volumes persistants uploads et backups',
        'Pipeline CI GitHub Actions produisant le build Angular de production et un artefact APK debug a chaque push et PR',
      ],
    },
    mobile: {
      platform: 'Android (Capacitor)',
      storeStatus: 'Pas encore sur le Play Store — distribue en APK installable',
      build: 'artefact APK debug produit par le pipeline CI (assembleDebug)',
      details: [
        'Le meme frontend Angular est empaquete avec Capacitor en application Android native (com.coiffure.app)',
        'Notifications push via Firebase Cloud Messaging, geolocalisation/cartes via Leaflet et UI mobile Angular Material',
        'L\'APK est telechargeable pour installation directe ; une publication sur le store est prevue',
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
  },
};
