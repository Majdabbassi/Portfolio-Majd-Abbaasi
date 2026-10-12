import { ProjectDetail } from '../project-detail';

// Facts from the repo and its README (_plans/projects/caferesto.md). Not deployed yet: no usage or uptime claims.
export const CAFERESTO: { en: ProjectDetail; fr: ProjectDetail } = {
  en: {
    id: 'caferesto',
    title: 'CaféResto — Multi-Tenant Restaurant Platform',
    summary:
      'A multi-tenant restaurant platform built by a team of three, where I was the backend architect. Customers scan the table’s QR code and order from their phone; the ticket reaches the kitchen in real time and the stock follows by itself. Staff use a mobile app, owners a web dashboard, and an AI service turns a photo of a paper menu into a digital one.',
    status: 'flagship',
    role: 'Backend Architect',
    roleContext: 'Backend architecture, real-time core and the Docker / monitoring stack',
    techStack: ['Spring Boot 3.5 · Java 21', 'PostgreSQL', 'STOMP WebSocket', 'React 18', 'Expo 54', 'Docker Compose', 'Prometheus · Grafana', 'Python · EasyOCR · Groq'],
    metrics: {
      team: 'Team of 3 · I led the backend',
      duration: '8 months',
      scale: 'Mobile app for customers and staff, web dashboard for owners, AI menu service · 13-service Docker stack',
      keyOutcomes: [
        'Orders, kitchen screens, waiter requests and inventory synced live over STOMP',
        'One Docker Compose file runs the whole platform with Prometheus, Grafana and Alertmanager (alerts to Telegram)',
        'Menu import from a photo: EasyOCR + an LLM turn a paper menu into structured items',
      ],
    },
    context: {
      problem:
        'Small cafés and restaurants juggle paper orders, a kitchen that hears about orders late and stock counted by hand.',
      constraints: [
        'Several restaurants on one platform, each seeing only its own data',
        'Orders and stock must update live on the kitchen screen, the staff app and the dashboard',
        'Owners need to see what is running and be alerted when something is not',
      ],
      goals: [
        'QR ordering at the table, straight to the kitchen',
        'Automatic stock decrement per order, with low-stock alerts to the manager',
        'A self-contained stack (app, database, monitoring, backups) that starts with one command',
      ],
    },
    architecture: {
      diagramPlaceholder: 'CaféResto Architecture',
      bullets: [
        'Spring Boot 3.5 API (Java 21) with PostgreSQL in production and Flyway',
        'STOMP over SockJS for orders, kitchen, inventory and waiter requests',
        'JWT plus Google, Facebook and Apple sign-in; Firebase push to phones',
        'Expo 54 mobile app for customers and staff; React 18 web dashboard for owners',
        'AI service (Flask + EasyOCR + Groq LLM) that reads a menu photo and returns structured JSON',
        'Docker Compose with 13 services: database, backend, frontend, OCR, Prometheus, Grafana, Alertmanager, exporters, pgAdmin and nightly backups, all bound to localhost behind the proxy',
      ],
      highlights: [
        {
          title: 'Real-time core',
          description: 'An order placed at the table appears on the kitchen screen and the staff app at once, and moves New → Preparing → Ready live.',
        },
        {
          title: 'Monitoring from day one',
          description: 'Prometheus scrapes the backend, the database, the containers and the host; Grafana dashboards and Alertmanager alerts to Telegram.',
        },
        {
          title: 'Menu from a photo',
          description: 'A separate Python service turns a picture of a paper menu into items and prices, so onboarding a café takes minutes.',
        },
      ],
    },
    decisions: [
      {
        title: 'One database, ownership chain per restaurant',
        reasoning: 'Central visibility for the platform while each user → café → resource chain keeps restaurants apart.',
        tradeoffs: 'Every query has to respect the ownership chain; it takes discipline in each service.',
      },
      {
        title: 'STOMP for the live parts',
        reasoning: 'Kitchen screens, the staff app and the dashboard subscribe to the same topics instead of polling.',
        tradeoffs: 'Connection and reconnection handling on every client.',
      },
      {
        title: 'Monitoring in the same Compose file as the app',
        reasoning: 'The platform is never run without its dashboards and alerts.',
        tradeoffs: 'A heavier stack (13 services) than the app alone.',
      },
    ],
    deployment: {
      isDeployed: false,
      flow: 'Build → Docker images → docker compose up → Nginx',
      environment: 'Docker Compose on a Linux server, with PostgreSQL, monitoring and nightly database backups',
      details: [
        'The whole platform runs from one docker-compose.yml (13 services)',
        'All container ports bound to 127.0.0.1, exposed only through the proxy',
        'Nightly database backups as their own service',
      ],
      considerations: [
        'A public demo with seed data is the next step for this project',
        'Automated tests and a CI pipeline before the demo goes live',
        'Real migrations instead of schema auto-update in production',
      ],
    },
    challenges: [
      {
        challenge: 'Keeping the kitchen, the staff app and the dashboard in step with each order.',
        solution: 'One set of STOMP topics per café, published by the backend on every order and stock change.',
        outcome: 'Every screen shows the same order state without refreshing.',
      },
      {
        challenge: 'Onboarding a café with a long paper menu.',
        solution: 'An OCR + LLM service that extracts items and prices from a photo into structured JSON.',
        outcome: 'The menu is created from a picture instead of being typed in.',
      },
    ],
    impact: {
      improvements: [
        'QR ordering at the table with live kitchen tickets',
        'Stock that follows orders automatically, with low-stock alerts',
        'A platform that ships with its own monitoring, alerts and backups',
      ],
      learnings: [
        'Multi-tenancy is a data-ownership problem first, and every query has to respect it',
        'Monitoring is easiest when it is part of the stack from the first commit',
        'Leading the backend in a team means writing the contracts the others build on',
      ],
    },
  },
  fr: {
    id: 'caferesto',
    title: 'CaféResto — Plateforme restaurant multi-tenant',
    summary:
      'Une plateforme restaurant multi-tenant construite à trois, dont j’étais l’architecte backend. Le client scanne le QR de sa table et commande depuis son téléphone ; le ticket arrive en cuisine en temps réel et le stock suit tout seul. L’équipe utilise une app mobile, les gérants un tableau de bord web, et un service IA transforme la photo d’un menu papier en menu numérique.',
    status: 'flagship',
    role: 'Architecte backend',
    roleContext: 'Architecture backend, cœur temps réel et stack Docker / monitoring',
    techStack: ['Spring Boot 3.5 · Java 21', 'PostgreSQL', 'STOMP WebSocket', 'React 18', 'Expo 54', 'Docker Compose', 'Prometheus · Grafana', 'Python · EasyOCR · Groq'],
    metrics: {
      team: 'Équipe de 3 · j’ai mené le backend',
      duration: '8 mois',
      scale: 'App mobile clients et équipe, tableau de bord web gérants, service IA de menus · stack Docker de 13 services',
      keyOutcomes: [
        'Commandes, écrans cuisine, appels serveur et stock synchronisés en direct via STOMP',
        'Un seul fichier Docker Compose lance toute la plateforme avec Prometheus, Grafana et Alertmanager (alertes Telegram)',
        'Import de menu par photo : EasyOCR + un LLM transforment un menu papier en articles structurés',
      ],
    },
    context: {
      problem:
        'Les petits cafés et restaurants jonglent avec des commandes papier, une cuisine prévenue en retard et un stock compté à la main.',
      constraints: [
        'Plusieurs restaurants sur une même plateforme, chacun ne voyant que ses données',
        'Commandes et stock mis à jour en direct sur l’écran cuisine, l’app équipe et le tableau de bord',
        'Les gérants doivent voir ce qui tourne et être alertés quand ce n’est pas le cas',
      ],
      goals: [
        'Commande par QR à table, directement en cuisine',
        'Décrément automatique du stock à chaque commande, avec alerte de stock bas au gérant',
        'Une stack autonome (app, base, monitoring, sauvegardes) qui démarre en une commande',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Architecture de CaféResto',
      bullets: [
        'API Spring Boot 3.5 (Java 21) avec PostgreSQL en production et Flyway',
        'STOMP sur SockJS pour les commandes, la cuisine, le stock et les appels serveur',
        'JWT plus connexion Google, Facebook et Apple ; push Firebase vers les téléphones',
        'App mobile Expo 54 pour clients et équipe ; tableau de bord web React 18 pour les gérants',
        'Service IA (Flask + EasyOCR + LLM Groq) qui lit la photo d’un menu et renvoie du JSON structuré',
        'Docker Compose à 13 services : base, backend, frontend, OCR, Prometheus, Grafana, Alertmanager, exporters, pgAdmin et sauvegardes nocturnes, tous liés à localhost derrière le proxy',
      ],
      highlights: [
        {
          title: 'Cœur temps réel',
          description: 'Une commande passée à table apparaît aussitôt sur l’écran cuisine et l’app équipe, et passe Nouveau → En préparation → Prêt en direct.',
        },
        {
          title: 'Monitoring dès le départ',
          description: 'Prometheus collecte le backend, la base, les conteneurs et l’hôte ; tableaux de bord Grafana et alertes Alertmanager vers Telegram.',
        },
        {
          title: 'Menu depuis une photo',
          description: 'Un service Python transforme la photo d’un menu papier en articles et prix : l’onboarding d’un café prend quelques minutes.',
        },
      ],
    },
    decisions: [
      {
        title: 'Une base, une chaîne de propriété par restaurant',
        reasoning: 'Une vision centrale pour la plateforme, tandis que la chaîne utilisateur → café → ressource sépare les restaurants.',
        tradeoffs: 'Chaque requête doit respecter la chaîne de propriété : de la rigueur dans chaque service.',
      },
      {
        title: 'STOMP pour les parties en direct',
        reasoning: 'Écrans cuisine, app équipe et tableau de bord s’abonnent aux mêmes topics au lieu d’interroger le serveur.',
        tradeoffs: 'Gestion de la connexion et de la reconnexion sur chaque client.',
      },
      {
        title: 'Le monitoring dans le même Compose que l’app',
        reasoning: 'La plateforme ne tourne jamais sans ses tableaux de bord et ses alertes.',
        tradeoffs: 'Une stack plus lourde (13 services) que l’app seule.',
      },
    ],
    deployment: {
      isDeployed: false,
      flow: 'Build → images Docker → docker compose up → Nginx',
      environment: 'Docker Compose sur un serveur Linux, avec PostgreSQL, monitoring et sauvegardes nocturnes',
      details: [
        'Toute la plateforme tourne depuis un seul docker-compose.yml (13 services)',
        'Tous les ports des conteneurs liés à 127.0.0.1, exposés uniquement via le proxy',
        'Sauvegardes nocturnes de la base dans un service dédié',
      ],
      considerations: [
        'Une démo publique avec des données de test est la prochaine étape',
        'Tests automatisés et pipeline CI avant la mise en ligne de la démo',
        'De vraies migrations plutôt que la mise à jour automatique du schéma en production',
      ],
    },
    challenges: [
      {
        challenge: 'Garder la cuisine, l’app équipe et le tableau de bord synchronisés à chaque commande.',
        solution: 'Un ensemble de topics STOMP par café, publiés par le backend à chaque commande et mouvement de stock.',
        outcome: 'Chaque écran affiche le même état de commande sans rafraîchir.',
      },
      {
        challenge: 'Onboarder un café avec un long menu papier.',
        solution: 'Un service OCR + LLM qui extrait articles et prix d’une photo en JSON structuré.',
        outcome: 'Le menu est créé à partir d’une photo au lieu d’être saisi.',
      },
    ],
    impact: {
      improvements: [
        'Commande par QR à table avec tickets cuisine en direct',
        'Un stock qui suit les commandes automatiquement, avec alertes de stock bas',
        'Une plateforme livrée avec son monitoring, ses alertes et ses sauvegardes',
      ],
      learnings: [
        'Le multi-tenant est d’abord une question de propriété des données, que chaque requête doit respecter',
        'Le monitoring est plus simple quand il fait partie de la stack dès le premier commit',
        'Mener le backend en équipe, c’est écrire les contrats sur lesquels les autres construisent',
      ],
    },
  },
};
