import { ProjectDetail } from '../project-detail';

const shots = (c: string[]) => [
  { src: '/assets/screens/car-rental/dashboard-alerts.png', caption: c[0] },
  { src: '/assets/screens/car-rental/contract-quote.png', caption: c[1] },
  { src: '/assets/screens/car-rental/contract-pdf.png', caption: c[2] },
  { src: '/assets/screens/car-rental/calendar.png', caption: c[3] },
  { src: '/assets/screens/car-rental/pricing-rules.png', caption: c[4] },
  { src: '/assets/screens/car-rental/reception-view.png', caption: c[5] },
];

export const CAR_RENTAL: { en: ProjectDetail; fr: ProjectDetail } = {
  en: {
    id: 'car-rental',
    title: 'Car Rental Manager — Back Office with Booking Safety, Pricing and PDFs',
    summary:
      'A back office for a car-rental agency: fleet, clients, contracts with a calendar, per-employee access rights, seasonal pricing, printable contracts and a daily alert check. The API refuses double bookings even when two people book at the same instant.',
    status: 'completed',
    role: 'Full Stack Engineer',
    roleContext: 'Audit, rebuild and ship',
    techStack: ['Java 21', 'Spring Boot 3', 'MySQL', 'JWT', 'Angular 18', 'Angular Material', 'OpenPDF', 'Docker'],
    metrics: {
      team: 'Solo',
      duration: 'Audited, rebuilt and shipped in 2026',
      scale: '22 integration tests · live demo',
      keyOutcomes: [
        'Closed an API that was fully open (permitAll, no admin account) with deny-by-default and per-section access rights',
        'Double-booking protection proven by a test that fires 8 simultaneous requests: exactly one wins',
        'Quote engine with seasons and long-stay discounts, contract and invoice PDFs, daily alerts',
      ],
    },
    context: {
      problem:
        'I inherited a rental app whose API let anyone read and change clients, contracts and expenses, accepted refresh and reset tokens as access tokens, shipped real passwords in git, and wrapped a vendor template that never sent a token. It looked like a product but was not safe to run.',
      constraints: [
        'Keep the useful domain (fleet, clients, contracts, expenses, partners, staff) and rebuild what was unsafe',
        'Employees must only reach the sections their manager ticked, enforced on the API and not only in the menu',
        'Must run with one command and deploy on free tiers',
      ],
      goals: [
        'Secure by default, then prove it with tests that fail when a protection is removed',
        'A booking that can never overlap another one for the same car',
        'Features a rental agency actually needs: pricing rules, paper contracts, reminders',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Car Rental architecture',
      bullets: [
        'JWT access and refresh tokens; only an access token opens the API. A custom permission bean (@perm.can) maps each employee record to the sections they may use.',
        'Booking: the car row is locked (SELECT … FOR UPDATE), the overlap is checked and the contract saved in one transaction, so concurrent requests queue up instead of racing.',
        'Pricing: a rule engine prices each night (season multipliers per car category) and applies the best long-stay discount, returning a line-by-line quote.',
        'A scheduled job turns expiring insurance, overdue services and late returns into dashboard alerts that clear themselves.',
      ],
      highlights: [
        { title: 'Provably safe bookings', description: 'A race test fails when the row lock is removed.' },
        { title: 'Rights enforced server-side', description: 'A receptionist gets 403 on expenses even with a valid token.' },
      ],
      tiers: [
        { label: 'Web', nodes: [{ name: 'Angular 18', sub: 'Material · config-driven CRUD · guards by section' }] },
        { label: 'API', nodes: [
          { name: 'Spring Boot 3', sub: 'JWT · @PreAuthorize · global error shape' },
          { name: 'Booking + pricing', sub: 'row lock · overlap check · quote engine' },
          { name: 'Jobs + PDFs', sub: 'daily alerts · OpenPDF contracts' },
        ] },
        { label: 'Data', nodes: [{ name: 'MySQL', sub: 'cars · clients · contracts · rules · alerts' }] },
      ],
      note: 'Bookings, pricing and alerts are independent of each other',
    },
    decisions: [
      {
        title: 'A database lock instead of an application lock',
        reasoning: 'The overlap must hold across several server instances; locking the car row inside the transaction makes the database the single arbiter.',
        tradeoffs: 'Bookings of the same car serialize, which is exactly the intent, at the cost of a little throughput on one hot car.',
      },
      {
        title: 'Rebuild the front end instead of repairing the template',
        reasoning: 'The template carried a fake login and unused features; a lean Angular app with real sign-in and one configurable CRUD screen was smaller and honest.',
        tradeoffs: 'Less flashy than the original, far less code to trust.',
      },
      {
        title: 'Rights as data, checked on every call',
        reasoning: 'Access rights live on the employee record, so a manager changes them without a deploy and the API never trusts the UI.',
        tradeoffs: 'One extra lookup per request, cheap next to the safety it buys.',
      },
    ],
    deployment: {
      isDeployed: true,
      liveUrl: 'https://carrental-platform.vercel.app',
      flow: 'GitHub → Render (Docker) → Vercel',
      environment: 'Free tiers: Vercel (web, proxying /api), Render (API), TiDB Cloud (MySQL)',
      details: [
        'docker compose up starts MySQL, the API and the web app locally',
        'CI runs the 22 backend tests, builds the front end and validates the compose file',
        'vercel.json forwards /api to the API, so the browser talks to one origin and no CORS setup is needed',
      ],
    },
    challenges: [
      {
        challenge: 'Proving that two people booking the same car at once cannot both succeed.',
        solution: 'An integration test fires 8 parallel requests for the same car and dates and asserts exactly one 200 and seven 409s. I verified the test by removing the lock: it then books the car twice.',
        outcome: 'The protection is tested, not assumed.',
      },
      {
        challenge: 'Prices that depend on the season, the car category and the length of the stay.',
        solution: 'Each night is priced separately, overlapping seasons resolve to the one that moves the price most, and the quote lists every stretch.',
        outcome: 'Agents see why a price is what it is and can explain it to the client.',
      },
    ],
    impact: {
      improvements: [
        'From an open API to deny-by-default with 12 access tests and 10 booking-feature tests',
        'Contracts and invoices a client can sign, price rules an admin can change, alerts nobody has to remember',
      ],
      learnings: [
        'Security work is only credible when each protection has a test that fails without it',
        'Concurrency bugs are invisible until you write the test that provokes them',
      ],
    },
    showcase: {
      live: 'https://carrental-platform.vercel.app',
      repo: 'https://github.com/Majdabbassi/carrental-platform',
      logins: [
        { role: 'Manager', user: 'manager', password: 'Rental@2026!' },
        { role: 'Receptionist (limited)', user: 'reception', password: 'Rental@2026!' },
      ],
      note: 'Free hosting: the API sleeps when idle, so the first request can take a few minutes. Demo data only.',
      screens: shots([
        'Dashboard with the daily alerts',
        'A contract priced by season and length of stay',
        'Printable rental agreement (PDF)',
        'Rental calendar',
        'Pricing rules (administrators only)',
        'What a receptionist sees: only the sections they were given',
      ]),
    },
  },
  fr: {
    id: 'car-rental',
    title: 'Car Rental Manager — Back-office avec réservations sûres, tarification et PDF',
    summary:
      'Un back-office pour une agence de location : flotte, clients, contrats avec calendrier, droits d’accès par employé, tarification saisonnière, contrats imprimables et contrôle quotidien d’alertes. L’API refuse les doubles réservations, même si deux personnes réservent au même instant.',
    status: 'completed',
    role: 'Ingénieur Full Stack',
    roleContext: 'Audit, refonte et mise en production',
    techStack: ['Java 21', 'Spring Boot 3', 'MySQL', 'JWT', 'Angular 18', 'Angular Material', 'OpenPDF', 'Docker'],
    metrics: {
      team: 'En solo',
      duration: 'Audité, refondu et livré en 2026',
      scale: '22 tests d’intégration · démo en ligne',
      keyOutcomes: [
        'API entièrement ouverte (permitAll, aucun compte admin) remplacée par un refus par défaut et des droits par section',
        'Protection contre la double réservation prouvée par un test de 8 requêtes simultanées : une seule passe',
        'Moteur de devis (saisons, remises longue durée), PDF de contrat et facture, alertes quotidiennes',
      ],
    },
    context: {
      problem:
        'J’ai repris une application de location dont l’API laissait n’importe qui lire et modifier clients, contrats et dépenses, acceptait des jetons de rafraîchissement comme jetons d’accès, avait des mots de passe réels dans git et un front de template qui n’envoyait aucun jeton. Elle semblait finie, mais n’était pas sûre.',
      constraints: [
        'Garder le domaine utile (flotte, clients, contrats, dépenses, partenaires, personnel) et refaire ce qui était dangereux',
        'Un employé n’atteint que les sections cochées par son manager, vérifié côté API et pas seulement dans le menu',
        'Une seule commande pour lancer, déploiement sur offres gratuites',
      ],
      goals: [
        'Sécurisé par défaut, puis prouvé par des tests qui échouent quand on retire une protection',
        'Une réservation qui ne peut jamais chevaucher une autre pour la même voiture',
        'Les fonctions dont une agence a besoin : règles de prix, contrats papier, rappels',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Architecture Car Rental',
      bullets: [
        'Jetons JWT d’accès et de rafraîchissement ; seul un jeton d’accès ouvre l’API. Un bean de permission (@perm.can) relie chaque fiche employé aux sections autorisées.',
        'Réservation : la ligne de la voiture est verrouillée (SELECT … FOR UPDATE), le chevauchement est vérifié et le contrat enregistré dans une seule transaction ; les requêtes concurrentes font la queue au lieu de se disputer.',
        'Tarification : un moteur de règles prix chaque nuit (multiplicateurs de saison par catégorie) et applique la meilleure remise longue durée, avec un devis ligne par ligne.',
        'Une tâche planifiée transforme assurances qui expirent, révisions en retard et retours tardifs en alertes de tableau de bord qui disparaissent seules.',
      ],
      highlights: [
        { title: 'Réservations sûres, prouvées', description: 'Un test de concurrence échoue si on retire le verrou.' },
        { title: 'Droits appliqués côté serveur', description: 'Un réceptionniste reçoit 403 sur les dépenses, même avec un jeton valide.' },
      ],
      tiers: [
        { label: 'Web', nodes: [{ name: 'Angular 18', sub: 'Material · CRUD piloté par configuration · gardes par section' }] },
        { label: 'API', nodes: [
          { name: 'Spring Boot 3', sub: 'JWT · @PreAuthorize · format d’erreur unique' },
          { name: 'Réservation + prix', sub: 'verrou · contrôle de chevauchement · devis' },
          { name: 'Tâches + PDF', sub: 'alertes quotidiennes · contrats OpenPDF' },
        ] },
        { label: 'Données', nodes: [{ name: 'MySQL', sub: 'voitures · clients · contrats · règles · alertes' }] },
      ],
      note: 'Réservations, prix et alertes sont indépendants les uns des autres',
    },
    decisions: [
      {
        title: 'Un verrou en base plutôt qu’un verrou applicatif',
        reasoning: 'Le non-chevauchement doit tenir sur plusieurs instances du serveur ; verrouiller la ligne de la voiture dans la transaction fait de la base l’unique arbitre.',
        tradeoffs: 'Les réservations d’une même voiture se sérialisent, c’est voulu, au prix d’un peu de débit sur une voiture très demandée.',
      },
      {
        title: 'Refaire le front plutôt que réparer le template',
        reasoning: 'Le template avait une fausse connexion et des fonctions inutilisées ; une application Angular légère, avec une vraie authentification et un écran CRUD configurable, était plus petite et honnête.',
        tradeoffs: 'Moins spectaculaire que l’original, beaucoup moins de code à croire sur parole.',
      },
      {
        title: 'Des droits stockés comme données, vérifiés à chaque appel',
        reasoning: 'Les droits sont sur la fiche employé : un manager les change sans déploiement et l’API ne fait jamais confiance à l’interface.',
        tradeoffs: 'Une lecture de plus par requête, négligeable face à la sécurité obtenue.',
      },
    ],
    deployment: {
      isDeployed: true,
      liveUrl: 'https://carrental-platform.vercel.app',
      flow: 'GitHub → Render (Docker) → Vercel',
      environment: 'Offres gratuites : Vercel (web, proxy de /api), Render (API), TiDB Cloud (MySQL)',
      details: [
        'docker compose up lance MySQL, l’API et le web en local',
        'La CI exécute les 22 tests backend, compile le front et valide le fichier compose',
        'vercel.json redirige /api vers l’API : le navigateur ne parle qu’à une origine, aucun réglage CORS',
      ],
    },
    challenges: [
      {
        challenge: 'Prouver que deux personnes qui réservent la même voiture en même temps ne peuvent pas réussir toutes les deux.',
        solution: 'Un test d’intégration lance 8 requêtes parallèles pour la même voiture et les mêmes dates et vérifie un seul 200 et sept 409. J’ai validé le test en retirant le verrou : il réserve alors la voiture deux fois.',
        outcome: 'La protection est testée, pas supposée.',
      },
      {
        challenge: 'Des prix qui dépendent de la saison, de la catégorie de voiture et de la durée du séjour.',
        solution: 'Chaque nuit est valorisée séparément, les saisons qui se chevauchent se résolvent en faveur de celle qui bouge le plus le prix, et le devis détaille chaque période.',
        outcome: 'L’agent voit pourquoi un prix est ce qu’il est et peut l’expliquer au client.',
      },
    ],
    impact: {
      improvements: [
        'D’une API ouverte à un refus par défaut avec 12 tests d’accès et 10 tests de fonctionnalités de réservation',
        'Des contrats et factures signables, des règles de prix modifiables par un admin, des alertes que personne n’a à retenir',
      ],
      learnings: [
        'Un travail de sécurité n’est crédible que si chaque protection a un test qui échoue sans elle',
        'Les bugs de concurrence restent invisibles tant qu’on n’écrit pas le test qui les provoque',
      ],
    },
    showcase: {
      live: 'https://carrental-platform.vercel.app',
      repo: 'https://github.com/Majdabbassi/carrental-platform',
      logins: [
        { role: 'Manager', user: 'manager', password: 'Rental@2026!' },
        { role: 'Réceptionniste (limité)', user: 'reception', password: 'Rental@2026!' },
      ],
      note: 'Hébergement gratuit : l’API s’endort quand elle est inactive, la première requête peut prendre quelques minutes. Données de démonstration uniquement.',
      screens: shots([
        'Tableau de bord avec les alertes quotidiennes',
        'Un contrat valorisé selon la saison et la durée',
        'Contrat de location imprimable (PDF)',
        'Calendrier des locations',
        'Règles de prix (administrateurs uniquement)',
        'Ce que voit un réceptionniste : seulement les sections qui lui sont données',
      ]),
    },
  },
};
