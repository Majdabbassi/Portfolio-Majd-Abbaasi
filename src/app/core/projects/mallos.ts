import { ProjectDetail } from '../../shared/project-detail';

const shots = (c: string[]) => [
  { src: '/assets/screens/mallos/floor-plan.png', caption: c[0] },
  { src: '/assets/screens/mallos/finance.png', caption: c[1] },
  { src: '/assets/screens/mallos/occupancy.png', caption: c[2] },
  { src: '/assets/screens/mallos/activity.png', caption: c[3] },
  { src: '/assets/screens/mallos/manager-dashboard.png', caption: c[4] },
  { src: '/assets/screens/mallos/team.png', caption: c[5] },
];

export const MALLOS: { en: ProjectDetail; fr: ProjectDetail } = {
  en: {
    id: 'mallos',
    title: 'Mall OS — Multi-Tenant Mall Management with Floor Plans, Rent and Audit Trail',
    summary:
      'A platform for running shopping malls: managers trace their shop units on a floor plan, link each to a store and tenant, bill the rent every month, and see occupancy and lease expiry at a glance. Every mall is isolated from every other, and every change is recorded.',
    status: 'completed',
    role: 'Full Stack Engineer',
    roleContext: 'Audit, complete and ship',
    techStack: ['Java 21', 'Spring Boot 3', 'MySQL', 'JWT', 'Angular 18', 'PrimeNG', 'Konva', 'Docker'],
    metrics: {
      team: 'Solo',
      duration: 'Audited, completed and shipped in 2026',
      scale: '38 integration tests · live demo',
      keyOutcomes: [
        'Strict isolation between malls and between roles (admin, manager, assistants with granular permissions)',
        'Monthly rent invoices with proration, due dates, late fees and a who-owes-what report',
        'An audit trail written in the same transaction as each change, and a floor plan coloured by lease state',
      ],
    },
    context: {
      problem:
        'The app had good authorization but was not usable: it could not even start from the compose file, every mall call failed because the UI and API disagreed on a URL, client mistakes returned 500, and half the team-management feature had no screen. The flagship floor-plan view had a demo whose shapes were drawn off the map.',
      constraints: [
        'A user may only ever reach the malls they belong to, whatever ids they put in a URL',
        'Assistants get exactly the permissions the manager grants (stores, floor plan, reports, finance)',
        'Money and history must be exact: no double billing, no change without a trace',
      ],
      goals: [
        'Finish the unfinished: team management, a working demo and real finance',
        'Make occupancy and lease risk visible, including on the map itself',
        'Prove isolation and permissions with tests',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Mall OS architecture',
      bullets: [
        'Authorization is checked in the service layer on every call: platform admin, mall manager, or assistant holding a specific permission. Roles are re-read from the database each request, so removing someone takes effect at once.',
        'Floor plans: an uploaded image (content-sniffed, not trusted by extension), polygons stored as fractions of the image, each linked to a store.',
        'Invoicing: one invoice per store and month (unique constraint), prorated for leases that start or end mid-month, with a one-off late fee after the due date.',
        'The audit service joins the caller’s transaction, so a failed change leaves no entry and a successful one always does.',
      ],
      highlights: [
        { title: 'Isolation by construction', description: 'A foreign id in the URL answers 404, a foreign mall 403.' },
        { title: 'Exact money', description: 'Invoices are idempotent and keep the tenant they were issued to.' },
      ],
      tiers: [
        { label: 'Web', nodes: [{ name: 'Angular 18 + PrimeNG', sub: 'manager workspace · admin console' }, { name: 'Konva floor map', sub: 'trace editor · lease colouring' }] },
        { label: 'API', nodes: [
          { name: 'Spring Boot 3', sub: 'JWT · per-mall permissions' },
          { name: 'Finance', sub: 'invoices · late fees · debtors' },
          { name: 'Audit + analytics', sub: 'history · occupancy · lease expiry' },
        ] },
        { label: 'Data', nodes: [{ name: 'MySQL', sub: 'malls · floors · polygons · stores · invoices · audit' }] },
      ],
      note: 'Everything is scoped by mall id on the server',
    },
    decisions: [
      {
        title: 'Prorate by days, bill once per month',
        reasoning: 'A lease starting on the 11th should pay 21 of 31 days; a unique store-and-month key makes the daily billing job safe to rerun.',
        tradeoffs: 'No partial refunds or mid-month rent changes: out of scope for a first version.',
      },
      {
        title: 'Audit inside the transaction',
        reasoning: 'A history that can disagree with the data is worse than none. Writing the entry with the change guarantees they agree.',
        tradeoffs: 'Every write path must call the audit service; a test checks the important ones.',
      },
      {
        title: 'Polygons as fractions, not pixels',
        reasoning: 'Fractions of the image work at any zoom and image size. A demo seeded in pixels showed the cost of ambiguity, so the API now rejects values outside 0 to 1.',
        tradeoffs: 'Callers must normalize before sending.',
      },
    ],
    deployment: {
      isDeployed: true,
      liveUrl: 'https://mall-os-self.vercel.app',
      flow: 'GitHub → Render (Docker) → Vercel',
      environment: 'Free tiers: Vercel (web), Render (API), TiDB Cloud (MySQL)',
      details: [
        'docker compose up seeds a demo mall with a traced floor plan, 11 stores on two floors and three months of invoices',
        'The demo floor image ships in the jar and is restored on start, because the free host loses its disk',
        'CI runs the 38 tests and builds the web app',
      ],
    },
    challenges: [
      {
        challenge: 'Showing which units are vacant or about to expire, where people actually look.',
        solution: 'A lease-state endpoint feeds a one-click colouring of the floor plan: leased, ending within 90 days, ended but still open, vacant.',
        outcome: 'A manager sees the risky units on the map without opening a report.',
      },
      {
        challenge: 'A global CSS reset silently removed the padding of every PrimeNG button and table.',
        solution: 'The reset moved into a lower cascade layer declared before PrimeNG’s own layer.',
        outcome: 'Every PrimeNG component renders as designed.',
      },
    ],
    impact: {
      improvements: [
        'From a stack that could not start to a deployed product with finance, analytics and history',
        '38 tests covering the permission matrix, billing arithmetic and the audit rules',
      ],
      learnings: [
        'Good authorization is the start: the work is making the product usable around it',
        'Finishing a feature means a screen, a demo and a test, not just an endpoint',
      ],
    },
    showcase: {
      live: 'https://mall-os-self.vercel.app',
      repo: 'https://github.com/Majdabbassi/MallOS',
      logins: [
        { role: 'Mall manager', user: 'manager', password: 'Manager@123' },
        { role: 'Assistant (stores and reports)', user: 'assistant', password: 'Manager@123' },
      ],
      note: 'Press “Show leases” on the Interactive Map. Free hosting: the first request after a pause can take about a minute.',
      screens: shots([
        'Floor plan coloured by lease state',
        'Rent invoices and who owes what',
        'Occupancy, rent per m² and lease expiry',
        'Activity: who changed what, and when',
        'Manager dashboard',
        'Team and permissions',
      ]),
    },
  },
  fr: {
    id: 'mallos',
    title: 'Mall OS — Gestion de centres commerciaux multi-tenant : plans, loyers et journal d’audit',
    summary:
      'Une plateforme pour gérer des centres commerciaux : le manager trace les boutiques sur un plan d’étage, les relie à un magasin et un locataire, facture le loyer chaque mois et voit occupation et fins de bail d’un coup d’œil. Chaque centre est isolé des autres, et chaque modification est enregistrée.',
    status: 'completed',
    role: 'Ingénieur Full Stack',
    roleContext: 'Audit, achèvement et mise en production',
    techStack: ['Java 21', 'Spring Boot 3', 'MySQL', 'JWT', 'Angular 18', 'PrimeNG', 'Konva', 'Docker'],
    metrics: {
      team: 'En solo',
      duration: 'Audité, complété et livré en 2026',
      scale: '38 tests d’intégration · démo en ligne',
      keyOutcomes: [
        'Isolation stricte entre centres et entre rôles (admin, manager, assistants à permissions fines)',
        'Factures de loyer mensuelles avec prorata, échéances, pénalités et rapport des impayés',
        'Journal d’audit écrit dans la même transaction que le changement, et plan colorié selon l’état des baux',
      ],
    },
    context: {
      problem:
        'L’application avait une bonne autorisation mais était inutilisable : elle ne démarrait même pas avec le fichier compose, tous les appels aux centres échouaient car l’interface et l’API n’avaient pas la même URL, les erreurs client renvoyaient 500 et la moitié de la gestion d’équipe n’avait aucun écran. La démo du plan d’étage dessinait ses formes hors de la carte.',
      constraints: [
        'Un utilisateur n’atteint que les centres auxquels il appartient, quels que soient les identifiants mis dans l’URL',
        'Un assistant a exactement les permissions données par le manager (magasins, plan, rapports, finance)',
        'Argent et historique doivent être exacts : pas de double facturation, pas de changement sans trace',
      ],
      goals: [
        'Terminer l’inachevé : gestion d’équipe, une démo qui marche et une vraie finance',
        'Rendre visibles occupation et risque de bail, jusque sur la carte',
        'Prouver isolation et permissions par des tests',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Architecture Mall OS',
      bullets: [
        'L’autorisation est vérifiée dans la couche service à chaque appel : admin plateforme, manager du centre, ou assistant avec une permission précise. Les rôles sont relus en base à chaque requête : retirer quelqu’un agit immédiatement.',
        'Plans d’étage : image téléversée (contenu vérifié, pas seulement l’extension), polygones stockés en fractions de l’image, chacun relié à un magasin.',
        'Facturation : une facture par magasin et par mois (contrainte d’unicité), au prorata pour un bail qui commence ou finit en cours de mois, avec une pénalité unique après l’échéance.',
        'Le service d’audit rejoint la transaction de l’appelant : un changement échoué ne laisse aucune trace, un changement réussi en laisse toujours une.',
      ],
      highlights: [
        { title: 'Isolation par construction', description: 'Un identifiant étranger dans l’URL donne 404, un autre centre donne 403.' },
        { title: 'Argent exact', description: 'Les factures sont idempotentes et gardent le locataire auquel elles ont été émises.' },
      ],
      tiers: [
        { label: 'Web', nodes: [{ name: 'Angular 18 + PrimeNG', sub: 'espace manager · console admin' }, { name: 'Plan Konva', sub: 'éditeur de tracé · couleurs de baux' }] },
        { label: 'API', nodes: [
          { name: 'Spring Boot 3', sub: 'JWT · permissions par centre' },
          { name: 'Finance', sub: 'factures · pénalités · débiteurs' },
          { name: 'Audit + analyses', sub: 'historique · occupation · fins de bail' },
        ] },
        { label: 'Données', nodes: [{ name: 'MySQL', sub: 'centres · étages · polygones · magasins · factures · audit' }] },
      ],
      note: 'Tout est cloisonné par identifiant de centre côté serveur',
    },
    decisions: [
      {
        title: 'Prorata au jour, une facture par mois',
        reasoning: 'Un bail qui commence le 11 paie 21 jours sur 31 ; une clé unique magasin-mois rend la tâche de facturation quotidienne rejouable sans risque.',
        tradeoffs: 'Pas de remboursement partiel ni de changement de loyer en cours de mois : hors périmètre d’une première version.',
      },
      {
        title: 'L’audit dans la transaction',
        reasoning: 'Un historique qui peut contredire les données est pire que pas d’historique. L’écrire avec le changement garantit qu’ils concordent.',
        tradeoffs: 'Chaque chemin d’écriture doit appeler le service d’audit ; un test vérifie les principaux.',
      },
      {
        title: 'Des polygones en fractions, pas en pixels',
        reasoning: 'Les fractions de l’image fonctionnent à tout zoom et toute taille. Une démo semée en pixels a montré le coût de l’ambiguïté : l’API rejette désormais toute valeur hors de 0 à 1.',
        tradeoffs: 'L’appelant doit normaliser avant d’envoyer.',
      },
    ],
    deployment: {
      isDeployed: true,
      liveUrl: 'https://mall-os-self.vercel.app',
      flow: 'GitHub → Render (Docker) → Vercel',
      environment: 'Offres gratuites : Vercel (web), Render (API), TiDB Cloud (MySQL)',
      details: [
        'docker compose up crée un centre de démo avec un plan tracé, 11 magasins sur deux étages et trois mois de factures',
        'L’image du plan de démo est dans le jar et restaurée au démarrage, car l’hébergeur gratuit perd son disque',
        'La CI exécute les 38 tests et compile le web',
      ],
    },
    challenges: [
      {
        challenge: 'Montrer quelles boutiques sont vides ou près d’expirer, là où on regarde vraiment.',
        solution: 'Un endpoint d’état des baux alimente un coloriage du plan en un clic : loué, fin sous 90 jours, terminé mais encore ouvert, vacant.',
        outcome: 'Le manager voit les unités à risque sur la carte sans ouvrir un rapport.',
      },
      {
        challenge: 'Une remise à zéro CSS globale supprimait en silence le padding de tous les boutons et tableaux PrimeNG.',
        solution: 'La remise à zéro a été déplacée dans une couche CSS de priorité inférieure, déclarée avant celle de PrimeNG.',
        outcome: 'Tous les composants PrimeNG s’affichent comme prévu.',
      },
    ],
    impact: {
      improvements: [
        'D’une pile qui ne démarrait pas à un produit déployé avec finance, analyses et historique',
        '38 tests couvrant la matrice de permissions, le calcul de facturation et les règles d’audit',
      ],
      learnings: [
        'Une bonne autorisation n’est que le début : le travail est de rendre le produit utilisable autour',
        'Finir une fonctionnalité, c’est un écran, une démo et un test, pas seulement un endpoint',
      ],
    },
    showcase: {
      live: 'https://mall-os-self.vercel.app',
      repo: 'https://github.com/Majdabbassi/MallOS',
      logins: [
        { role: 'Manager du centre', user: 'manager', password: 'Manager@123' },
        { role: 'Assistant (magasins et rapports)', user: 'assistant', password: 'Manager@123' },
      ],
      note: 'Cliquez « Show leases » sur la carte interactive. Hébergement gratuit : la première requête après une pause peut prendre environ une minute.',
      screens: shots([
        'Plan d’étage colorié selon l’état des baux',
        'Factures de loyer et impayés',
        'Occupation, loyer au m² et fins de bail',
        'Activité : qui a changé quoi, et quand',
        'Tableau de bord du manager',
        'Équipe et permissions',
      ]),
    },
  },
};
