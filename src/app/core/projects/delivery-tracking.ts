import { ProjectDetail } from '../../shared/project-detail';

const shots = (c: string[]) => [
  { src: '/assets/screens/delivery-tracking/admin-dashboard.png', caption: c[0] },
  { src: '/assets/screens/delivery-tracking/customer-orders.png', caption: c[1] },
  { src: '/assets/screens/delivery-tracking/driver-jobs.png', caption: c[2] },
  { src: '/assets/screens/delivery-tracking/vendor-products.png', caption: c[3] },
  { src: '/assets/screens/delivery-tracking/admin-partnerships.png', caption: c[4] },
  { src: '/assets/screens/delivery-tracking/grafana-dashboard.png', caption: c[5] },
];

export const DELIVERY_TRACKING: { en: ProjectDetail; fr: ProjectDetail } = {
  en: {
    id: 'delivery-tracking',
    title: 'SwiftDeliver — Multi-Tenant Delivery Marketplace with Live Tracking',
    summary:
      'Vendors list products, customers order, delivery companies bid for the jobs and assign drivers, and everyone follows the order live as the driver reports positions. One platform, five kinds of user, each seeing only their own slice of the data.',
    status: 'completed',
    role: 'Full Stack Engineer',
    roleContext: 'Backend, real-time and operations',
    techStack: ['Java 21', 'Spring Boot 4', 'MySQL', 'JWT', 'STOMP/WebSocket', 'Angular 20', 'Prometheus', 'Grafana', 'Docker'],
    metrics: {
      team: 'Solo',
      duration: 'Audited, hardened and deployed in 2026',
      scale: '73 tests · live demo · monitored',
      keyOutcomes: [
        'Five roles with object-level authorization: a user only ever sees their own orders, products and drivers',
        'Live GPS tracking over WebSocket that only the people involved in an order can read',
        'Prometheus metrics and a provisioned Grafana dashboard for API health',
      ],
    },
    context: {
      problem:
        'Delivery involves several companies at once: a vendor, a delivery company, its drivers and the customer. Each must follow the same order in real time while never seeing the others’ business.',
      constraints: [
        'Strict tenant separation between vendors, delivery companies and customers',
        'Location is personal data: only people involved in an order may read or receive a driver’s position',
        'Runs on free tiers, so memory and cold starts matter',
      ],
      goals: [
        'A full order lifecycle: pending, assigned, picked up, in transit, delivered or cancelled',
        'A marketplace where companies bid and the vendor chooses',
        'Operations you can watch: metrics, dashboards, health checks',
      ],
    },
    architecture: {
      diagramPlaceholder: 'SwiftDeliver architecture',
      bullets: [
        'JWT-secured REST API with role checks and object-level authorization on every order, product and driver.',
        'Orders move through an explicit state machine, so impossible transitions are refused.',
        'Drivers post GPS positions; STOMP over WebSocket pushes them to the customer and the people involved. Subscriptions are checked, so a foreign order topic is refused.',
        'Micrometer feeds Prometheus; Grafana ships with a provisioned dashboard.',
      ],
      highlights: [
        { title: 'Private by design', description: 'The live location of a driver is only readable by the people on that order.' },
        { title: 'State machine', description: 'Order status changes follow allowed transitions only.' },
      ],
      tiers: [
        { label: 'Clients', nodes: [{ name: 'Angular 20', sub: 'admin · vendor · delivery · driver · customer' }] },
        { label: 'API', nodes: [
          { name: 'Spring Boot 4', sub: 'REST · JWT · role + object checks' },
          { name: 'STOMP / WebSocket', sub: 'live driver position · order updates' },
        ] },
        { label: 'Data and ops', nodes: [
          { name: 'MySQL', sub: 'orders · products · partnerships' },
          { name: 'Prometheus + Grafana', sub: 'metrics · provisioned dashboard' },
        ] },
      ],
      note: 'Subscriptions to live topics are authorized, not just logins',
    },
    decisions: [
      {
        title: 'Authorize WebSocket subscriptions, not only connections',
        reasoning: 'A valid login must not let someone subscribe to another customer’s driver; each subscription is checked against the order.',
        tradeoffs: 'A check on every subscribe, cheap and necessary.',
      },
      {
        title: 'An explicit order state machine',
        reasoning: 'With several actors changing status, allowed transitions in one place prevent inconsistent orders.',
        tradeoffs: 'New states need a deliberate change.',
      },
    ],
    deployment: {
      isDeployed: true,
      liveUrl: 'https://majdabbassi.github.io/delivery-platform/',
      flow: 'GitHub → Render (Docker) + GitHub Pages',
      environment: 'Free tiers: GitHub Pages (web), Render (API), TiDB Cloud (MySQL)',
      details: [
        'docker compose up starts the API, web app, MySQL, Prometheus, Grafana and phpMyAdmin, all on 127.0.0.1',
        'CI runs the 73 tests and builds the Angular app',
        'The Pages workflow bakes the API address into the web build',
      ],
    },
    challenges: [
      {
        challenge: 'Keeping live location private while still pushing it instantly.',
        solution: 'The broker authorizes each subscription against the order, and positions are only published to the topic of an order the subscriber belongs to.',
        outcome: 'Tested: a stranger cannot receive a driver’s position.',
      },
    ],
    impact: {
      improvements: [
        'A hardened API with 73 tests and a demo anyone can try',
        'Operations visible in Grafana instead of guessed',
      ],
      learnings: [
        'Real-time features need their own authorization model, separate from the REST one',
        'Observability is cheap to add early and expensive to retrofit',
      ],
    },
    showcase: {
      live: 'https://majdabbassi.github.io/delivery-platform/',
      repo: 'https://github.com/Majdabbassi/delivery-platform',
      logins: [
        { role: 'Customer', user: 'customer.karim', password: 'SwiftDeliver@2026!' },
        { role: 'Vendor', user: 'vendor.sofia', password: 'SwiftDeliver@2026!' },
      ],
      note: 'Free hosting: the API sleeps when idle, so the first request can take up to a minute.',
      screens: shots([
        'Super admin dashboard',
        'Customer: own orders',
        'Driver portal',
        'Vendor: product catalogue',
        'Partnerships between vendors and delivery companies',
        'Grafana: API health',
      ]),
    },
  },
  fr: {
    id: 'delivery-tracking',
    title: 'SwiftDeliver — Marketplace de livraison multi-tenant avec suivi en direct',
    summary:
      'Les vendeurs listent des produits, les clients commandent, les sociétés de livraison répondent aux commandes et affectent des chauffeurs, et chacun suit la commande en direct pendant que le chauffeur envoie sa position. Une plateforme, cinq types d’utilisateurs, chacun ne voyant que sa part des données.',
    status: 'completed',
    role: 'Ingénieur Full Stack',
    roleContext: 'Backend, temps réel et exploitation',
    techStack: ['Java 21', 'Spring Boot 4', 'MySQL', 'JWT', 'STOMP/WebSocket', 'Angular 20', 'Prometheus', 'Grafana', 'Docker'],
    metrics: {
      team: 'En solo',
      duration: 'Audité, durci et déployé en 2026',
      scale: '73 tests · démo en ligne · supervisé',
      keyOutcomes: [
        'Cinq rôles avec autorisation au niveau de l’objet : chacun ne voit que ses commandes, produits et chauffeurs',
        'Suivi GPS en direct par WebSocket, lisible seulement par les personnes concernées par la commande',
        'Métriques Prometheus et tableau de bord Grafana provisionné pour la santé de l’API',
      ],
    },
    context: {
      problem:
        'Une livraison implique plusieurs sociétés à la fois : un vendeur, une société de livraison, ses chauffeurs et le client. Chacun doit suivre la même commande en temps réel sans jamais voir les affaires des autres.',
      constraints: [
        'Séparation stricte entre vendeurs, sociétés de livraison et clients',
        'La position est une donnée personnelle : seules les personnes concernées par une commande peuvent lire ou recevoir la position du chauffeur',
        'Fonctionner sur des offres gratuites : mémoire et démarrages à froid comptent',
      ],
      goals: [
        'Un cycle de commande complet : en attente, affectée, récupérée, en route, livrée ou annulée',
        'Une marketplace où les sociétés proposent et le vendeur choisit',
        'Une exploitation observable : métriques, tableaux de bord, contrôles de santé',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Architecture SwiftDeliver',
      bullets: [
        'API REST sécurisée par JWT avec contrôle des rôles et autorisation au niveau de l’objet sur chaque commande, produit et chauffeur.',
        'Les commandes suivent une machine à états explicite : les transitions impossibles sont refusées.',
        'Les chauffeurs envoient leur position GPS ; STOMP sur WebSocket la pousse au client et aux personnes concernées. Les abonnements sont vérifiés : un topic de commande étrangère est refusé.',
        'Micrometer alimente Prometheus ; Grafana arrive avec un tableau de bord provisionné.',
      ],
      highlights: [
        { title: 'Privé par conception', description: 'La position en direct d’un chauffeur n’est lisible que par les personnes de cette commande.' },
        { title: 'Machine à états', description: 'Les changements de statut ne suivent que les transitions autorisées.' },
      ],
      tiers: [
        { label: 'Clients', nodes: [{ name: 'Angular 20', sub: 'admin · vendeur · livraison · chauffeur · client' }] },
        { label: 'API', nodes: [
          { name: 'Spring Boot 4', sub: 'REST · JWT · contrôles de rôle + d’objet' },
          { name: 'STOMP / WebSocket', sub: 'position du chauffeur · mises à jour' },
        ] },
        { label: 'Données et exploitation', nodes: [
          { name: 'MySQL', sub: 'commandes · produits · partenariats' },
          { name: 'Prometheus + Grafana', sub: 'métriques · tableau de bord provisionné' },
        ] },
      ],
      note: 'Les abonnements aux flux en direct sont autorisés, pas seulement les connexions',
    },
    decisions: [
      {
        title: 'Autoriser les abonnements WebSocket, pas seulement les connexions',
        reasoning: 'Une connexion valide ne doit pas permettre de s’abonner au chauffeur d’un autre client ; chaque abonnement est vérifié contre la commande.',
        tradeoffs: 'Un contrôle à chaque abonnement, peu coûteux et nécessaire.',
      },
      {
        title: 'Une machine à états explicite pour les commandes',
        reasoning: 'Avec plusieurs acteurs qui changent le statut, regrouper les transitions autorisées évite les commandes incohérentes.',
        tradeoffs: 'Un nouvel état demande un changement délibéré.',
      },
    ],
    deployment: {
      isDeployed: true,
      liveUrl: 'https://majdabbassi.github.io/delivery-platform/',
      flow: 'GitHub → Render (Docker) + GitHub Pages',
      environment: 'Offres gratuites : GitHub Pages (web), Render (API), TiDB Cloud (MySQL)',
      details: [
        'docker compose up lance l’API, le web, MySQL, Prometheus, Grafana et phpMyAdmin, tous sur 127.0.0.1',
        'La CI exécute les 73 tests et compile l’application Angular',
        'Le workflow Pages intègre l’adresse de l’API dans le build web',
      ],
    },
    challenges: [
      {
        challenge: 'Garder la position en direct privée tout en la poussant instantanément.',
        solution: 'Le broker autorise chaque abonnement contre la commande, et les positions ne sont publiées que sur le topic d’une commande dont l’abonné fait partie.',
        outcome: 'Testé : un inconnu ne peut pas recevoir la position d’un chauffeur.',
      },
    ],
    impact: {
      improvements: [
        'Une API durcie avec 73 tests et une démo que chacun peut essayer',
        'Une exploitation visible dans Grafana plutôt que devinée',
      ],
      learnings: [
        'Le temps réel demande son propre modèle d’autorisation, distinct de celui du REST',
        'L’observabilité est peu coûteuse au début et chère à rajouter après',
      ],
    },
    showcase: {
      live: 'https://majdabbassi.github.io/delivery-platform/',
      repo: 'https://github.com/Majdabbassi/delivery-platform',
      logins: [
        { role: 'Client', user: 'customer.karim', password: 'SwiftDeliver@2026!' },
        { role: 'Vendeur', user: 'vendor.sofia', password: 'SwiftDeliver@2026!' },
      ],
      note: 'Hébergement gratuit : l’API s’endort quand elle est inactive, la première requête peut prendre jusqu’à une minute.',
      screens: shots([
        'Tableau de bord du super admin',
        'Client : ses commandes',
        'Portail chauffeur',
        'Vendeur : catalogue produits',
        'Partenariats entre vendeurs et sociétés de livraison',
        'Grafana : santé de l’API',
      ]),
    },
  },
};
