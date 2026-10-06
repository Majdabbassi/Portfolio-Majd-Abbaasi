import { ProjectDetail } from '../../shared/project-detail';

const shots = (c: string[]) => [
  { src: '/assets/screens/sportclub/coach-dashboard.png', caption: c[0] },
  { src: '/assets/screens/sportclub/admin-calendar.png', caption: c[1] },
  { src: '/assets/screens/sportclub/admin-payments.png', caption: c[2] },
  { src: '/assets/screens/sportclub/coach-injuries.png', caption: c[3] },
  { src: '/assets/screens/sportclub/mobile-activities.png', caption: c[4] },
  { src: '/assets/screens/sportclub/mobile-shop.png', caption: c[5] },
];

export const SPORTCLUB: { en: ProjectDetail; fr: ProjectDetail } = {
  en: {
    id: 'sportclub',
    title: 'SportClub Platform — Club Management for Admins, Coaches and Parents',
    summary:
      'A management platform for a sports club: members and their parents, coaches and teams, training sessions with attendance, performance notes and injuries, online or cash payments, a small shop and a private chat. One Spring Boot API serves a web console for admins and coaches and a mobile app for parents.',
    status: 'completed',
    role: 'Full Stack Engineer',
    roleContext: 'Backend, web console and mobile app',
    techStack: ['Java 21', 'Spring Boot 3', 'MySQL', 'JWT', 'STOMP/WebSocket', 'Angular 16', 'React Native (Expo)', 'Docker'],
    metrics: {
      team: 'Solo',
      duration: 'Rebuilt, secured and deployed in 2026',
      scale: '17 integration tests · web + mobile · live demo',
      keyOutcomes: [
        'Per-role and per-family access control enforced by the API, whichever client calls it',
        'One backend serving an Angular console and an Expo parent app',
        'Private chat over WebSocket where a socket can only join its own rooms',
      ],
    },
    context: {
      problem:
        'A club juggles children, parents, coaches and money. Parents must see their own children and nobody else’s; coaches only their own teams; admins everything. The original app carried demo shortcuts and hard-coded data that had to go.',
      constraints: [
        'A parent must never reach another family’s data, even by guessing an id',
        'The web console must refuse parent accounts and the mobile app must refuse staff',
        'No real club or person in the demo: the demo club is fictional',
      ],
      goals: [
        'Role and ownership checks in the API, not in the clients',
        'Realistic demo data so every screen has something to show',
        'Free-tier deployment of web, mobile web and API',
      ],
    },
    architecture: {
      diagramPlaceholder: 'SportClub architecture',
      bullets: [
        'Spring Boot API with JWT; roles (admin, coach, parent) plus ownership checks: a coach reaches their teams, a parent their children.',
        'STOMP/WebSocket chat with authenticated sockets and room-level authorization.',
        'Payments via Konnect or cash, with a small shop and announcements.',
        'Two clients on one API: an Angular console and a React Native (Expo) app exported to the web for the demo.',
      ],
      highlights: [
        { title: 'Ownership, not only roles', description: 'Each request is checked against who the data belongs to.' },
        { title: 'Two clients, one contract', description: 'Web console and mobile app share the same API and rules.' },
      ],
      tiers: [
        { label: 'Clients', nodes: [{ name: 'Angular 16 console', sub: 'admin · coach' }, { name: 'React Native (Expo)', sub: 'parent app · web export' }] },
        { label: 'API', nodes: [
          { name: 'Spring Boot 3', sub: 'JWT · roles + ownership' },
          { name: 'STOMP chat', sub: 'authenticated sockets · private rooms' },
        ] },
        { label: 'Data', nodes: [{ name: 'MySQL', sub: 'members · teams · sessions · payments · shop' }] },
      ],
      note: 'The API enforces the same rules whatever client calls it',
    },
    decisions: [
      {
        title: 'Enforce ownership in the API',
        reasoning: 'Hiding a button is not security. Every endpoint checks that the caller owns or coaches what they ask for.',
        tradeoffs: 'More service-layer code and more tests, which is the point.',
      },
      {
        title: 'Export the mobile app to the web for the demo',
        reasoning: 'A recruiter cannot install an APK, but can open a link; the same code runs in both.',
        tradeoffs: 'A few native-only features are not shown in the web build.',
      },
    ],
    deployment: {
      isDeployed: true,
      liveUrl: 'https://sportclub-platform-f6ry.vercel.app',
      flow: 'GitHub → Render (Docker) → Vercel (×2)',
      environment: 'Free tiers: Vercel (console and parent app), Render (API), TiDB Cloud (MySQL)',
      details: [
        'docker compose up seeds a fictional club with teams, families, sessions, payments and a shop',
        'CI runs the 17 backend tests and builds the web console',
        'The lockfile is regenerated with the same Node and npm that Vercel uses, which avoids install failures',
      ],
    },
    challenges: [
      {
        challenge: 'Making a parent unable to read another family’s data.',
        solution: 'Ownership checks on every endpoint and tests that sign in as one family and request another’s children, payments and chat.',
        outcome: 'Cross-family access answers 403 or 404, tested.',
      },
    ],
    impact: {
      improvements: [
        'A working multi-role platform with a safe, fictional demo',
        'Web and mobile clients that cannot do more than their role allows',
      ],
      learnings: [
        'Role checks are not enough: ownership is where multi-tenant data leaks',
        'A shareable demo link matters more than an installable one',
      ],
    },
    showcase: {
      live: 'https://sportclub-platform-f6ry.vercel.app',
      repoPrivate: true,
      logins: [
        { role: 'Coach console', user: 'karim.coach@sportclub.demo', password: 'Coach@2026!' },
        { role: 'Parent app', user: 'leila.parent@sportclub.demo', password: 'Parent@2026!' },
      ],
      extra: [{ label: 'Parent app', href: 'https://sportclub-platform-mobile.vercel.app' }],
      note: 'The parent app is a separate link above. Free hosting: the first request can take about a minute. The demo club is fictional.',
      screens: shots([
        'Coach dashboard',
        'Session calendar',
        'Reservations and payments',
        'Coach: injuries',
        'Parent app: activities',
        'Parent app: club shop',
      ]),
    },
  },
  fr: {
    id: 'sportclub',
    title: 'SportClub Platform — Gestion de club pour admins, coachs et parents',
    summary:
      'Une plateforme de gestion de club sportif : adhérents et parents, coachs et équipes, séances avec présences, suivi de performance et blessures, paiements en ligne ou en espèces, petite boutique et messagerie privée. Une API Spring Boot sert une console web pour admins et coachs et une application mobile pour les parents.',
    status: 'completed',
    role: 'Ingénieur Full Stack',
    roleContext: 'Backend, console web et application mobile',
    techStack: ['Java 21', 'Spring Boot 3', 'MySQL', 'JWT', 'STOMP/WebSocket', 'Angular 16', 'React Native (Expo)', 'Docker'],
    metrics: {
      team: 'En solo',
      duration: 'Refait, sécurisé et déployé en 2026',
      scale: '17 tests d’intégration · web + mobile · démo en ligne',
      keyOutcomes: [
        'Contrôle d’accès par rôle et par famille appliqué par l’API, quel que soit le client',
        'Un seul backend pour une console Angular et une application Expo pour les parents',
        'Messagerie privée par WebSocket où un socket ne peut rejoindre que ses propres salons',
      ],
    },
    context: {
      problem:
        'Un club jongle avec enfants, parents, coachs et argent. Un parent doit voir ses enfants et personne d’autre ; un coach seulement ses équipes ; un admin tout. L’application d’origine contenait des raccourcis de démo et des données écrites en dur à retirer.',
      constraints: [
        'Un parent ne doit jamais atteindre les données d’une autre famille, même en devinant un identifiant',
        'La console web refuse les comptes parents et l’app mobile refuse le personnel',
        'Aucun vrai club ni vraie personne dans la démo : le club de démonstration est fictif',
      ],
      goals: [
        'Contrôles de rôle et de propriété dans l’API, pas dans les clients',
        'Des données de démonstration réalistes pour que chaque écran ait de quoi montrer',
        'Déploiement gratuit du web, du web mobile et de l’API',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Architecture SportClub',
      bullets: [
        'API Spring Boot avec JWT ; rôles (admin, coach, parent) plus contrôles de propriété : un coach atteint ses équipes, un parent ses enfants.',
        'Messagerie STOMP/WebSocket avec sockets authentifiés et autorisation par salon.',
        'Paiements via Konnect ou en espèces, avec une petite boutique et des annonces.',
        'Deux clients sur une API : une console Angular et une application React Native (Expo) exportée vers le web pour la démo.',
      ],
      highlights: [
        { title: 'Propriété, pas seulement rôles', description: 'Chaque requête est vérifiée contre le propriétaire des données.' },
        { title: 'Deux clients, un contrat', description: 'Console web et application mobile partagent la même API et les mêmes règles.' },
      ],
      tiers: [
        { label: 'Clients', nodes: [{ name: 'Console Angular 16', sub: 'admin · coach' }, { name: 'React Native (Expo)', sub: 'app parents · export web' }] },
        { label: 'API', nodes: [
          { name: 'Spring Boot 3', sub: 'JWT · rôles + propriété' },
          { name: 'Messagerie STOMP', sub: 'sockets authentifiés · salons privés' },
        ] },
        { label: 'Données', nodes: [{ name: 'MySQL', sub: 'adhérents · équipes · séances · paiements · boutique' }] },
      ],
      note: 'L’API applique les mêmes règles quel que soit le client',
    },
    decisions: [
      {
        title: 'Appliquer la propriété dans l’API',
        reasoning: 'Cacher un bouton n’est pas de la sécurité. Chaque endpoint vérifie que l’appelant possède ou entraîne ce qu’il demande.',
        tradeoffs: 'Plus de code de service et plus de tests, et c’est le but.',
      },
      {
        title: 'Exporter l’application mobile vers le web pour la démo',
        reasoning: 'Un recruteur ne peut pas installer un APK mais peut ouvrir un lien ; le même code tourne dans les deux cas.',
        tradeoffs: 'Quelques fonctions natives ne sont pas montrées dans la version web.',
      },
    ],
    deployment: {
      isDeployed: true,
      liveUrl: 'https://sportclub-platform-f6ry.vercel.app',
      flow: 'GitHub → Render (Docker) → Vercel (×2)',
      environment: 'Offres gratuites : Vercel (console et app parents), Render (API), TiDB Cloud (MySQL)',
      details: [
        'docker compose up crée un club fictif avec équipes, familles, séances, paiements et boutique',
        'La CI exécute les 17 tests backend et compile la console web',
        'Le fichier de verrouillage est régénéré avec les mêmes Node et npm que Vercel, ce qui évite les échecs d’installation',
      ],
    },
    challenges: [
      {
        challenge: 'Empêcher un parent de lire les données d’une autre famille.',
        solution: 'Contrôles de propriété sur chaque endpoint et tests qui se connectent comme une famille et demandent enfants, paiements et messages d’une autre.',
        outcome: 'L’accès entre familles répond 403 ou 404, testé.',
      },
    ],
    impact: {
      improvements: [
        'Une plateforme multi-rôles fonctionnelle avec une démo sûre et fictive',
        'Des clients web et mobile qui ne peuvent pas faire plus que leur rôle',
      ],
      learnings: [
        'Les contrôles de rôle ne suffisent pas : la propriété est l’endroit où les données multi-tenant fuient',
        'Un lien de démo partageable compte plus qu’une application installable',
      ],
    },
    showcase: {
      live: 'https://sportclub-platform-f6ry.vercel.app',
      repoPrivate: true,
      logins: [
        { role: 'Console coach', user: 'karim.coach@sportclub.demo', password: 'Coach@2026!' },
        { role: 'App parents', user: 'leila.parent@sportclub.demo', password: 'Parent@2026!' },
      ],
      extra: [{ label: 'App parents', href: 'https://sportclub-platform-mobile.vercel.app' }],
      note: 'L’app parents est un lien séparé ci-dessus. Hébergement gratuit : la première requête peut prendre environ une minute. Le club de démonstration est fictif.',
      screens: shots([
        'Tableau de bord du coach',
        'Calendrier des séances',
        'Réservations et paiements',
        'Coach : blessures',
        'App parents : activités',
        'App parents : boutique du club',
      ]),
    },
  },
};
