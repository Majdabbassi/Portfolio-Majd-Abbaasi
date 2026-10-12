import { ProjectDetail } from '../project-detail';

export const MEDIPLUS: { en: ProjectDetail; fr: ProjectDetail } = {
  en: {
    id: 'mediplus',
    title: 'Medi+ (Dhakerni) — Medication Reminder Platform',
    summary:
      'A medication-reminder platform in production: every dose wakes the patient’s phone with a full-screen alarm, even offline, and if it is not confirmed within 30 minutes the family is alerted. One Spring Boot API, an Angular back-office and the Dhakerni mobile app for patients, guardians and doctors.',
    status: 'production',
    role: 'Full Stack Engineer',
    roleContext: 'Primary engineer: backend and web back-office',
    techStack: [
      'Spring Boot 4.1 · Java 21',
      'Angular 20',
      'React Native 0.71 · Expo 48',
      'Quartz',
      'Firebase FCM',
      'MySQL',
    ],
    metrics: {
      team: 'Primary full-stack engineer across the three products',
      duration: 'At Educanet, 2025 → today',
      scale: 'One API, an Angular back-office with seven statistics dashboards, and a mobile app for patients, guardians and doctors · 4 languages',
      keyOutcomes: [
        'A per-minute reminder engine that fires each dose once, with snooze and a missed-dose alert to guardians after 30 minutes',
        'Full-screen alarm over the lock screen through a native Android module, driven by high-priority FCM data messages',
        'Offline-first app: changes queued on the phone and replayed through a sync endpoint',
        'Adherence statistics and downloadable PDF reports for patients and doctors',
        'Back-office for doctor verification, the medicine catalogue, plans and subscriptions, and support tickets',
      ],
    },
    context: {
      problem:
        'Taking medication on time is a daily struggle for patients, and their doctors and family helpers need a reliable way to schedule, deliver, confirm and monitor reminders across devices and connectivity conditions.',
      constraints: [
        'Multiple operator tiers (SUPER_ADMIN, ADMIN, AGENT_SUPPORT) with distinct permissions',
        'Secure JWT-based authentication with token refresh for long backoffice sessions',
        'Role-aware mobile usage for patients, clinicians (DOCTOR) and helpers (TUTEUR)',
        'Reminders must fire reliably, on time, even when the phone is locked or offline',
        'Operational oversight through analytics and exportable KPI reports',
      ],
      goals: [
        'Schedule and reschedule medication reminders with acknowledgment and adherence tracking',
        'Deliver each dose as a full-screen alarm (FCM push), with an optional recorded voice message',
        'Keep mobile clients synchronized with the backend through local caching and background reconciliation',
        'Implement role-based access control across all admin tiers with protected routes',
        'Secure a full JWT lifecycle with refresh tokens and an auto-attach interceptor',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Medi+ Platform Architecture',
      bullets: [
        'Spring Boot backend (Java 21) with Spring Security, Spring Data JPA and JWT',
        'Quartz-based reminder engine with acknowledgment and adherence tracking',
        'Angular 20 role-based backoffice built with Angular Material',
        'RBAC tiers — SUPER_ADMIN, ADMIN, AGENT_SUPPORT — enforced via protected routes',
        'React Native (Expo) apps for PATIENT, DOCTOR and TUTEUR with exact-alarm scheduling and FCM push',
        'Offline-first sync via local caching, background tasks and device registration',
        'Analytics/KPI dashboards with ngx-charts and chart.js and xlsx exports',
        'Plans and subscriptions managed in the back-office; password reset codes by SMS or e-mail; iText PDF reports',
      ],
      highlights: [
        {
          title: 'Reminder & Adherence Engine',
          description:
            'Each minute, due doses are sent once as a high-priority push that opens a full-screen alarm; snooze schedules a one-off Quartz job, and a dose left unconfirmed for 30 minutes alerts every linked guardian.',
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
      flow: 'Maven build → WAR → Tomcat 10.1 → MySQL + Firebase FCM',
      environment:
        'Spring Boot WAR on Tomcat over HTTPS, MySQL as the primary store and Firebase Cloud Messaging for push',
      details: [
        'Backend live in production behind HTTPS',
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
        'Families are told automatically when a dose is missed, instead of finding out later',
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
    title: 'Medi+ (Dhakerni) — Plateforme de rappels de médicaments',
    summary:
      'Une plateforme de rappels de médicaments en production : chaque prise réveille le téléphone du patient avec une alarme plein écran, même hors ligne, et si elle n’est pas confirmée en 30 minutes, la famille est prévenue. Une API Spring Boot, un back-office Angular et l’app mobile Dhakerni pour patients, tuteurs et médecins.',
    status: 'production',
    role: 'Ingénieur Full Stack',
    roleContext: 'Ingénieur principal : backend et back-office web',
    techStack: [
      'Spring Boot 4.1 · Java 21',
      'Angular 20',
      'React Native 0.71 · Expo 48',
      'Quartz',
      'Firebase FCM',
      'MySQL',
    ],
    metrics: {
      team: 'Ingénieur full-stack principal sur les trois produits',
      duration: 'Chez Educanet, 2025 → aujourd’hui',
      scale: 'Une API, un back-office Angular avec sept tableaux de bord statistiques et une app mobile pour patients, tuteurs et médecins · 4 langues',
      keyOutcomes: [
        'Un moteur de rappels à la minute qui déclenche chaque prise une seule fois, avec report et alerte aux tuteurs après 30 minutes sans confirmation',
        'Alarme plein écran par-dessus l’écran verrouillé via un module Android natif, déclenchée par des messages FCM prioritaires',
        'App hors ligne d’abord : les changements sont mis en file sur le téléphone et rejoués via un endpoint de synchronisation',
        'Statistiques d’observance et rapports PDF téléchargeables pour patients et médecins',
        'Back-office : vérification des médecins, catalogue de médicaments, offres et abonnements, tickets de support',
      ],
    },
    context: {
      problem:
        'Prendre ses médicaments à temps est difficile au quotidien pour les patients ; leurs médecins et leurs proches ont besoin d’un moyen fiable de planifier, délivrer, confirmer et superviser les rappels sur différents appareils et conditions de connectivité.',
      constraints: [
        'Plusieurs niveaux d’opérateurs (SUPER_ADMIN, ADMIN, AGENT_SUPPORT) avec des permissions distinctes',
        'Authentification sécurisée JWT avec renouvellement du token pour les longues sessions du backoffice',
        'Usage mobile par rôles : patients, cliniciens (DOCTOR) et proches aidants (TUTEUR)',
        'Les rappels doivent sonner à l’heure, de façon fiable, même téléphone verrouillé ou hors ligne',
        'Supervision opérationnelle via des statistiques et des rapports KPI exportables',
      ],
      goals: [
        'Planifier et replanifier les rappels de médicaments avec accusé de réception et suivi d’adhérence',
        'Délivrer chaque prise en alarme plein écran (push FCM), avec un message vocal enregistré en option',
        'Synchroniser les clients mobiles avec le backend grâce au cache local et à la réconciliation en arrière-plan',
        'Implémenter le contrôle d’accès basé sur les rôles à tous les niveaux avec des routes protégées',
        'Sécuriser le cycle de vie complet du JWT avec tokens de rafraîchissement et interceptor auto-attaché',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Architecture de la plateforme Medi+',
      bullets: [
        'Backend Spring Boot (Java 21) avec Spring Security, Spring Data JPA et JWT',
        'Moteur de rappels planifié avec Quartz, accusé de réception et suivi d’adhérence',
        'Backoffice Angular 20 à gestion par rôles construit avec Angular Material',
        'Niveaux RBAC — SUPER_ADMIN, ADMIN, AGENT_SUPPORT — appliqués via des routes protégées',
        'Apps React Native (Expo) pour PATIENT, DOCTOR et TUTEUR avec alarmes exactes et push FCM',
        'Synchronisation hors ligne : cache local, tâches en arrière-plan et enregistrement des appareils',
        'Tableaux de bord analytiques/KPI avec ngx-charts, chart.js et exports xlsx',
        'Offres et abonnements gérés dans le back-office ; codes de réinitialisation par SMS ou e-mail ; rapports PDF iText',
      ],
      highlights: [
        {
          title: 'Moteur de Rappels & d’Adhérence',
          description:
            'Chaque minute, les prises dues partent une seule fois en push prioritaire qui ouvre une alarme plein écran ; le report programme un job Quartz ponctuel, et une prise non confirmée en 30 minutes alerte chaque tuteur lié.',
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
      flow: 'Build Maven → WAR → Tomcat 10.1 → MySQL + Firebase FCM',
      environment:
        'WAR Spring Boot sur Tomcat en HTTPS, MySQL comme stockage principal et Firebase Cloud Messaging pour le push',
      details: [
        'Backend en production derrière HTTPS',
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
        'Les familles sont prévenues automatiquement d’une prise oubliée, au lieu de l’apprendre plus tard',
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
