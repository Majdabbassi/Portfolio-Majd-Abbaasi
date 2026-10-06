import { ProjectDetail } from '../project-detail';

export const MEDIPLUS: { en: ProjectDetail; fr: ProjectDetail } = {
  en: {
    id: 'mediplus',
    title: 'MediPlus (Dhakerni) — Medication Reminder Platform',
    summary:
      'Medication-reminder platform (Dhakerni): role-based Angular backoffice over a Spring Boot backend, plus React Native (Expo) apps for patients, doctors and helpers — with reminders, adherence tracking, vocal messages, offline sync and push.',
    status: 'production',
    role: 'Full Stack Engineer',
    roleContext: 'Full Stack Engineer (Backend & Web Backoffice)',
    techStack: [
      'Java 21',
      'Spring Boot',
      'Angular 20',
      'React Native (Expo)',
      'MySQL',
      'JWT',
      'Firebase FCM',
    ],
    metrics: {
      team: 'Full Stack Engineer (primary)',
      duration: 'Multi-phase delivery across backend, web backoffice and mobile',
      scale: 'Three interconnected products: Spring Boot API, Angular backoffice, and React Native apps for patient, doctor and tuteur roles',
      keyOutcomes: [
        'Role-based access control across SUPER_ADMIN, ADMIN and AGENT_SUPPORT tiers',
        'Quartz-scheduled reminder engine with acknowledgment and adherence tracking',
        'Vocal reminder messages delivered alongside FCM push, SMS and email notifications',
        'Offline-first mobile sync: local cache, background tasks and exact-alarm scheduling',
        'JWT authentication with token refresh and automated token attachment',
        'Doctor verification, medicine catalog, subscriptions/payments and PDF reports',
      ],
    },
    context: {
      problem:
        'Taking medication on time is a daily struggle for patients, and their doctors and family helpers need a reliable way to schedule, deliver, confirm and monitor reminders across devices and connectivity conditions.',
      constraints: [
        'Multiple operator tiers (SUPER_ADMIN, ADMIN, AGENT_SUPPORT) with distinct permissions',
        'Secure JWT-based authentication with token refresh for long backoffice sessions',
        'Role-aware mobile usage for patients, clinicians (DOCTOR) and helpers (TUTEUR)',
        'Reminders must fire reliably: exact alarms, background sync, push, SMS, email and vocal messages',
        'Operational oversight through analytics and exportable KPI reports',
      ],
      goals: [
        'Schedule and reschedule medication reminders with acknowledgment and adherence tracking',
        'Deliver reminders through push (FCM), SMS, email and recorded vocal messages',
        'Keep mobile clients synchronized with the backend through local caching and background reconciliation',
        'Implement role-based access control across all admin tiers with protected routes',
        'Secure a full JWT lifecycle with refresh tokens and an auto-attach interceptor',
      ],
    },
    architecture: {
      diagramPlaceholder: 'MediPlus Platform Architecture',
      bullets: [
        'Spring Boot backend (Java 21) with Spring Security, Spring Data JPA and JWT',
        'Quartz-based reminder engine with acknowledgment and adherence tracking',
        'Angular 20 role-based backoffice built with Angular Material',
        'RBAC tiers — SUPER_ADMIN, ADMIN, AGENT_SUPPORT — enforced via protected routes',
        'React Native (Expo) apps for PATIENT, DOCTOR and TUTEUR with exact-alarm scheduling and FCM push',
        'Offline-first sync via local caching, background tasks and device registration',
        'Analytics/KPI dashboards with ngx-charts and chart.js and xlsx exports',
        'Subscriptions and payments with email/SMS notifications and iText PDF reports',
      ],
      highlights: [
        {
          title: 'Reminder & Adherence Engine',
          description:
            'Quartz-scheduled medication reminders with acknowledgment tracking, adherence metrics and multi-channel delivery (push, SMS, email, vocal).',
        },
        {
          title: 'Role-Based Access Control',
          description:
            'Permission model spanning SUPER_ADMIN, ADMIN and AGENT_SUPPORT with route-level protection in the backoffice.',
        },
        {
          title: 'Role-Aware Mobile Ecosystem',
          description:
            'Patients, doctors and helpers share one Expo codebase, each with a dedicated surface and offline-first synchronization.',
        },
      ],
    },
    decisions: [
      {
        title: 'Role-Based Access Control Architecture',
        reasoning:
          'Healthcare workflows involve distinct operator tiers, so mapping permissions to explicit roles made the system auditable and safe to extend.',
        tradeoffs:
          'More upfront modeling of roles and route guards in exchange for predictable, auditable permissions.',
      },
      {
        title: 'JWT with Refresh Tokens',
        reasoning:
          'Backoffice sessions need to survive long work sessions without forcing frequent re-login, while short-lived access tokens keep validity tight.',
        tradeoffs:
          'A more complex access/refresh token lifecycle, but no server-side session storage required.',
      },
      {
        title: 'Quartz for Reminder Scheduling',
        reasoning:
          'Medication reminders are time-critical and recurring, so a dedicated scheduler with durable jobs keeps delivery independent of individual requests.',
        tradeoffs:
          'Scheduling state lives outside the request/response model, requiring explicit job lifecycle management.',
      },
      {
        title: 'Angular Material for the Admin Backoffice',
        reasoning:
          'A role-based dashboard is dense with tables, forms and dialogs; Angular Material provided consistent, accessible building blocks quickly.',
        tradeoffs:
          'A uniform Material look rather than fully bespoke styling, appropriate for an internal operations tool.',
      },
      {
        title: 'Expo with Offline-First Sync for the Mobile Apps',
        reasoning:
          'Delivering iOS and Android from a single React Native (Expo) codebase — and caching locally with background reconciliation — keeps reminders reliable without connectivity.',
        tradeoffs:
          'Slight trade-offs in native control and more sync complexity, accepted for faster delivery and offline resilience.',
      },
    ],
    deployment: {
      isDeployed: true,
      apkUrl: '#apk-placeholder',
      flow: 'Spring Boot (Java 21) → HTTPS API → Swagger UI → MySQL + Firebase FCM',
      environment:
        'Spring Boot WAR on HTTPS (medclock.educanet.pro) with MySQL as the primary store, Firebase Cloud Messaging for push, and a publicly served OpenAPI/Swagger surface',
      details: [
        'Backend live — REST API responds 401 without credentials while Swagger UI and OpenAPI docs are served publicly',
        'React Native app configured with production EAS builds (Android APK) targeting the same deployed API',
        'Firebase Cloud Messaging wired end-to-end with device registration and push handling',
        'JWT keys and Firebase service credentials managed through environment configuration rather than source code',
      ],
    },
    challenges: [
      {
        challenge: 'Keeping role permissions consistent across admin tiers as the feature set grew.',
        solution:
          'Centralized permission mapping and route guards tied to a single RBAC model in the frontend, re-enforced on every backend endpoint.',
        outcome: 'A single source of truth for permissions, keeping frontend and backend aligned.',
      },
      {
        challenge: 'Making reminders fire on time across device restarts, time zones and poor connectivity.',
        solution:
          'Exact-alarm scheduling, a background sync task, and a reconciliation queue that reschedules reminders from the local cache whenever connectivity returns.',
        outcome: 'Reminders stay on schedule even offline, converging with the backend as soon as a connection is available.',
      },
      {
        challenge: 'Synchronizing data between the Angular backoffice and the mobile clients.',
        solution:
          'Defined a single REST contract and shared DTOs consumed by both clients against the Spring Boot API.',
        outcome: 'Clean integration where both products read the same backend state without divergent logic.',
      },
    ],
    impact: {
      improvements: [
        'A complete medication-adherence loop: scheduling, delivery, acknowledgment and adherence analytics',
        'Multi-channel delivery (push, SMS, email, vocal messages) improving the reach of reminders',
        'Clear role separation enabling internal teams and role-specific mobile surfaces',
        'Analytics and exports turning operational data into reviewable reports',
      ],
      learnings: [
        'RBAC is only as strong as the convention between frontend guards and backend checks',
        'Notification and scheduling systems must be designed around device constraints (exact alarms, battery optimization, background execution)',
        'Multi-client projects benefit from defining the API contract before building screens',
      ],
    },
  },
  fr: {
    id: 'mediplus',
    title: 'MediPlus (Dhakerni) — Plateforme de Rappels de Médicaments',
    summary:
      'Plateforme de rappels de médicaments (Dhakerni) : backoffice Angular basé sur les rôles sur backend Spring Boot, plus des apps React Native (Expo) pour patients, médecins et tuteurs — avec rappels, suivi d’adhérence, messages vocaux, synchronisation hors ligne et push.',
    status: 'production',
    role: 'Ingénieur Full Stack',
    roleContext: 'Ingénieur Full Stack (Backend & Backoffice Web)',
    techStack: [
      'Java 21',
      'Spring Boot',
      'Angular 20',
      'React Native (Expo)',
      'MySQL',
      'JWT',
      'Firebase FCM',
    ],
    metrics: {
      team: 'Ingénieur Full Stack (principal)',
      duration: 'Livraison multi-phases : backend, backoffice web et mobile',
      scale: 'Trois produits interconnectés : API Spring Boot, backoffice Angular et apps React Native pour les rôles patient, médecin et tuteur',
      keyOutcomes: [
        'Contrôle d’accès basé sur les rôles SUPER_ADMIN, ADMIN et AGENT_SUPPORT',
        'Moteur de rappels planifié avec Quartz, accusé de réception et suivi d’adhérence',
        'Messages vocaux de rappel livrés avec notifications push FCM, SMS et e-mail',
        'Synchronisation mobile hors ligne : cache local, tâches en arrière-plan et alarmes exactes',
        'Authentification JWT avec renouvellement du token et rattachement automatique',
        'Vérification des médecins, catalogue de médicaments, abonnements/paiements et rapports PDF',
      ],
    },
    context: {
      problem:
        'Prendre ses médicaments à temps est difficile au quotidien pour les patients ; leurs médecins et leurs proches ont besoin d’un moyen fiable de planifier, délivrer, confirmer et superviser les rappels sur différents appareils et conditions de connectivité.',
      constraints: [
        'Plusieurs niveaux d’opérateurs (SUPER_ADMIN, ADMIN, AGENT_SUPPORT) avec des permissions distinctes',
        'Authentification sécurisée JWT avec renouvellement du token pour les longues sessions du backoffice',
        'Usage mobile par rôles : patients, cliniciens (DOCTOR) et proches aidants (TUTEUR)',
        'Les rappels doivent se déclencher de manière fiable : alarmes exactes, synchronisation en arrière-plan, push, SMS, e-mail et messages vocaux',
        'Supervision opérationnelle via des statistiques et des rapports KPI exportables',
      ],
      goals: [
        'Planifier et replanifier les rappels de médicaments avec accusé de réception et suivi d’adhérence',
        'Délivrer les rappels par push (FCM), SMS, e-mail et messages vocaux enregistrés',
        'Synchroniser les clients mobiles avec le backend grâce au cache local et à la réconciliation en arrière-plan',
        'Implémenter le contrôle d’accès basé sur les rôles à tous les niveaux avec des routes protégées',
        'Sécuriser le cycle de vie complet du JWT avec tokens de rafraîchissement et interceptor auto-attaché',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Architecture de la Plateforme MediPlus',
      bullets: [
        'Backend Spring Boot (Java 21) avec Spring Security, Spring Data JPA et JWT',
        'Moteur de rappels planifié avec Quartz, accusé de réception et suivi d’adhérence',
        'Backoffice Angular 20 à gestion par rôles construit avec Angular Material',
        'Niveaux RBAC — SUPER_ADMIN, ADMIN, AGENT_SUPPORT — appliqués via des routes protégées',
        'Apps React Native (Expo) pour PATIENT, DOCTOR et TUTEUR avec alarmes exactes et push FCM',
        'Synchronisation hors ligne : cache local, tâches en arrière-plan et enregistrement des appareils',
        'Tableaux de bord analytiques/KPI avec ngx-charts, chart.js et exports xlsx',
        'Abonnements et paiements avec notifications e-mail/SMS et rapports PDF iText',
      ],
      highlights: [
        {
          title: 'Moteur de Rappels & d’Adhérence',
          description:
            'Rappels de médicaments planifiés avec Quartz, suivi des accusés de réception, métriques d’adhérence et livraison multi-canaux (push, SMS, e-mail, vocal).',
        },
        {
          title: 'Contrôle d’Accès Basé sur les Rôles',
          description:
            'Modèle de permissions couvrant SUPER_ADMIN, ADMIN et AGENT_SUPPORT avec protection au niveau des routes.',
        },
        {
          title: 'Écosystème Mobile par Rôles',
          description:
            'Patients, médecins et tuteurs partagent une base Expo unique, chacun avec une surface dédiée et une synchronisation hors ligne.',
        },
      ],
    },
    decisions: [
      {
        title: 'Architecture de Contrôle d’Accès Basé sur les Rôles',
        reasoning:
          'Les flux santé impliquent des niveaux d’opérateurs distincts ; associer les permissions à des rôles explicites rend le système auditable et facile à étendre.',
        tradeoffs:
          'Plus de modélisation initiale des rôles et des gardes de routes, en échange de permissions prévisibles et auditables.',
      },
      {
        title: 'JWT avec Tokens de Rafraîchissement',
        reasoning:
          'Les sessions du backoffice doivent durer sur de longues journées de travail sans reconnexion fréquente, tout en gardant des tokens d’accès à validité courte.',
        tradeoffs:
          'Un cycle de vie access/refresh plus complexe, mais aucun stockage de session côté serveur nécessaire.',
      },
      {
        title: 'Quartz pour la Planification des Rappels',
        reasoning:
          'Les rappels de médicaments sont critiques et récurrents ; un planificateur dédié avec des jobs durables rend la livraison indépendante des requêtes individuelles.',
        tradeoffs:
          'L’état de planification vit en dehors du modèle requête/réponse, nécessitant une gestion explicite du cycle de vie des jobs.',
      },
      {
        title: 'Angular Material pour le Backoffice',
        reasoning:
          'Un tableau de bord par rôles est dense en tableaux, formulaires et dialogues ; Angular Material a fourni des composants cohérents et accessibles rapidement.',
        tradeoffs:
          'Une apparence Material uniforme au lieu d’un style totalement sur-mesure, adaptée à un outil de gestion interne.',
      },
      {
        title: 'Expo avec Synchronisation Hors Ligne pour les Apps Mobiles',
        reasoning:
          'Livrer iOS et Android depuis une seule base React Native (Expo) — avec cache local et réconciliation en arrière-plan — garde les rappels fiables sans connectivité.',
        tradeoffs:
          'Légers compromis sur le contrôle natif et plus de complexité de synchronisation, acceptés pour une livraison rapide et une résilience hors ligne.',
      },
    ],
    deployment: {
      isDeployed: true,
      apkUrl: '#apk-placeholder',
      flow: 'Spring Boot (Java 21) → API HTTPS → Swagger UI → MySQL + Firebase FCM',
      environment:
        'WAR Spring Boot sur HTTPS (medclock.educanet.pro) avec MySQL comme stockage principal, Firebase Cloud Messaging pour le push et une surface OpenAPI/Swagger accessible publiquement',
      details: [
        'Backend en ligne — l’API REST répond 401 sans identifiants alors que Swagger UI et les docs OpenAPI sont publics',
        'App React Native configurée avec des builds de production EAS (APK Android) ciblant la même API déployée',
        'Firebase Cloud Messaging connecté de bout en bout : enregistrement des appareils et gestion du push',
        'Clés JWT et identifiants Firebase gérés via la configuration d’environnement plutôt que le code source',
      ],
    },
    challenges: [
      {
        challenge: 'Garder les permissions des rôles cohérentes entre les niveaux d’administration à mesure que les fonctionnalités grandissaient.',
        solution:
          'Cartographie centralisée des permissions et gardes de routes liées à un modèle RBAC unique, re-vérifié sur chaque endpoint backend.',
        outcome: 'Une source de vérité unique pour les permissions, gardant frontend et backend alignés.',
      },
      {
        challenge: 'Faire sonner les rappels à l’heure malgré les redémarrages d’appareil, les fuseaux horaires et une mauvaise connectivité.',
        solution:
          'Alarmes exactes, tâche de synchronisation en arrière-plan et file de réconciliation qui replanifie les rappels depuis le cache local dès que la connexion revient.',
        outcome: 'Les rappels restent à l’heure même hors ligne et convergent avec le backend dès qu’une connexion est disponible.',
      },
      {
        challenge: 'Synchroniser les données entre le backoffice Angular et les clients mobiles.',
        solution:
          'Définition d’un contrat REST unique et de DTO partagés consommés par les deux clients contre l’API Spring Boot.',
        outcome: 'Intégration propre où les deux produits lisent le même état backend sans logique divergente.',
      },
    ],
    impact: {
      improvements: [
        'Un cycle complet d’adhérence médicamenteuse : planification, livraison, accusé de réception et analyses d’adhérence',
        'Livraison multi-canaux (push, SMS, e-mail, messages vocaux) améliorant la portée des rappels',
        'Séparation claire des rôles pour les équipes internes et des surfaces mobiles dédiées',
        'Statistiques et exports transformant les données opérationnelles en rapports exploitables',
      ],
      learnings: [
        'Le RBAC n’est aussi solide que la convention entre les gardes du frontend et les vérifications du backend',
        'Les systèmes de notification et de planification doivent être conçus autour des contraintes des appareils (alarmes exactes, optimisation batterie, exécution en arrière-plan)',
        'Les projets multi-clients bénéficient de la définition du contrat API avant la construction des écrans',
      ],
    },
  },
};
