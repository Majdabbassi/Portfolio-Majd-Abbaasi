import { ProjectDetail } from '../project-detail';

const shots = (c: string[]) => [
  { src: '/assets/screens/albumy/dashboard.jpg', caption: c[0] },
  { src: '/assets/screens/albumy/event-dashboard.jpg', caption: c[1] },
  { src: '/assets/screens/albumy/guest-mobile.jpg', caption: c[2] },
  { src: '/assets/screens/albumy/album-mobile.jpg', caption: c[3] },
];

export const ALBUMY: { en: ProjectDetail; fr: ProjectDetail } = {
  en: {
    id: 'albumy',
    title: 'Albumy — Event Photo Sharing with Resumable Uploads and Live Galleries',
    summary:
      'Organizers create an event and share one QR code; every guest drops photos and videos into a shared album with no sign-up. Uploads are chunked and resumable, processed in the background by a worker, and appear live in everyone’s gallery.',
    status: 'completed',
    role: 'Full Stack Engineer',
    roleContext: 'Backend, media pipeline and Angular app',
    techStack: ['Spring Boot', 'Angular', 'MySQL', 'Redis', 'STOMP/WebSocket', 'Capacitor', 'Docker'],
    metrics: {
      team: 'Solo',
      duration: 'Built and deployed in 2026',
      scale: 'Uploads up to 2 GB per file · live demo',
      keyOutcomes: [
        '5 MB chunked uploads that resume after a refresh or a lost connection, only resending missing chunks',
        'A separate worker transcodes images and video in the background; the gallery updates live',
        'Guests need no account: a unique pseudo per event and a guest token',
      ],
    },
    context: {
      problem:
        'A wedding produces hundreds of photos scattered across dozens of phones and group chats. There is no quick, frictionless way for a crowd to pool its media into one high-quality album.',
      constraints: [
        'Guests will not create accounts: scanning a code must be enough',
        'Phones and venues have flaky networks, and videos are large',
        'Free hosting means a disposable disk and a sleeping API',
      ],
      goals: [
        'Uploads that survive reloads, retries and offline periods',
        'A live gallery for guests and a curated dashboard for the organizer',
        'Original-quality downloads, one by one or all at once',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Albumy architecture',
      bullets: [
        'Chunked, resumable uploads with the queue persisted in the browser (IndexedDB); the server reports which chunks it already has.',
        'A Redis-backed worker produces thumbnail, medium and full tiers, and an H.264 version with a poster for video.',
        'Redis pub/sub feeds a STOMP WebSocket, so uploads and finished transcodes appear instantly in every open gallery.',
        'Roles: admin, organizer, anonymous guest and read-only visitor; organizer sign-up uses single-use invite links.',
      ],
      highlights: [
        { title: 'Resumable by design', description: 'Reload, lose the network or close the tab: the upload continues where it stopped.' },
        { title: 'Live everywhere', description: 'Redis pub/sub to WebSocket keeps every gallery current.' },
      ],
      tiers: [
        { label: 'Clients', nodes: [{ name: 'Angular app', sub: 'guest page · organizer dashboard · QR' }, { name: 'Capacitor', sub: 'Android wrapper' }] },
        { label: 'Services', nodes: [
          { name: 'Spring Boot (web)', sub: 'API · JWT · guest tokens · WebSocket' },
          { name: 'Spring Boot (worker)', sub: 'image and video transcoding' },
        ] },
        { label: 'Data', nodes: [{ name: 'MySQL', sub: 'events · photos · users' }, { name: 'Redis', sub: 'job queue · pub/sub' }] },
      ],
      note: 'Uploads never wait for processing: the worker catches up in the background',
    },
    decisions: [
      {
        title: 'A dedicated worker for media processing',
        reasoning: 'Transcoding is slow and bursty; keeping it out of the web process keeps the API responsive.',
        tradeoffs: 'One more service to run, which Docker Compose absorbs.',
      },
      {
        title: 'No accounts for guests',
        reasoning: 'Every extra step loses a guest. A unique pseudo and a server-issued token are enough to attribute uploads.',
        tradeoffs: 'Guest identity is weaker than a login, so organizers keep deletion and moderation.',
      },
    ],
    deployment: {
      isDeployed: true,
      liveUrl: 'https://majdabbassi.github.io/Albumy/',
      flow: 'GitHub → Render (Docker) + GitHub Pages',
      environment: 'Free tiers: GitHub Pages (web), Render (API), TiDB Cloud (MySQL), Redis Cloud',
      details: [
        'docker compose up runs MySQL, Redis, the web service, the worker, nginx and phpMyAdmin',
        'The demo disk is disposable: the seeded Demo Wedding is rebuilt on every start',
        'CI runs the tests on every push',
      ],
    },
    challenges: [
      {
        challenge: 'Large uploads on unreliable networks.',
        solution: 'Chunking with resume-from-server, three retries with backoff, an IndexedDB queue and pause when offline.',
        outcome: 'Uploads finish after reloads and network drops.',
      },
    ],
    impact: {
      improvements: [
        'A guest flow that needs nothing but a QR code',
        'A media pipeline that keeps the API fast under load',
      ],
      learnings: [
        'Resumability needs server cooperation, not just client retries',
        'Separating the worker early makes both parts simpler',
      ],
    },
    showcase: {
      live: 'https://majdabbassi.github.io/Albumy/',
      repo: 'https://github.com/Majdabbassi/Albumy',
      logins: [{ role: 'Organizer', user: 'demo_organizer', password: 'demo_organizer_password' }],
      extra: [{ label: 'Guest page (no account)', href: 'https://majdabbassi.github.io/Albumy/e/DEMO01' }],
      note: 'Shared public demo on a disposable disk: please do not upload anything personal. The first request can take about a minute.',
      screens: shots(['Organizer dashboard', 'Event page: QR code, links, live gallery', 'Guest page on a phone', 'Shared album on a phone']),
    },
  },
  fr: {
    id: 'albumy',
    title: 'Albumy — Partage de photos d’événement avec envois reprenables et galeries en direct',
    summary:
      'L’organisateur crée un événement et partage un seul QR code ; chaque invité dépose photos et vidéos dans un album partagé sans inscription. Les envois sont découpés et reprenables, traités en arrière-plan par un worker, et apparaissent en direct dans la galerie de chacun.',
    status: 'completed',
    role: 'Ingénieur Full Stack',
    roleContext: 'Backend, pipeline média et application Angular',
    techStack: ['Spring Boot', 'Angular', 'MySQL', 'Redis', 'STOMP/WebSocket', 'Capacitor', 'Docker'],
    metrics: {
      team: 'En solo',
      duration: 'Construit et déployé en 2026',
      scale: 'Fichiers jusqu’à 2 Go · démo en ligne',
      keyOutcomes: [
        'Envois en morceaux de 5 Mo qui reprennent après un rechargement ou une coupure, en ne renvoyant que les morceaux manquants',
        'Un worker séparé transcode images et vidéos en arrière-plan ; la galerie se met à jour en direct',
        'Aucun compte pour les invités : un pseudo unique par événement et un jeton d’invité',
      ],
    },
    context: {
      problem:
        'Un mariage produit des centaines de photos dispersées sur des dizaines de téléphones et de groupes de discussion. Il n’existe pas de moyen simple pour qu’une foule rassemble ses médias dans un album de qualité.',
      constraints: [
        'Les invités ne créeront pas de compte : scanner un code doit suffire',
        'Les réseaux des téléphones et des salles sont instables et les vidéos lourdes',
        'L’hébergement gratuit implique un disque jetable et une API qui s’endort',
      ],
      goals: [
        'Des envois qui survivent aux rechargements, nouvelles tentatives et périodes hors ligne',
        'Une galerie en direct pour les invités et un tableau de bord organisé pour l’organisateur',
        'Téléchargements en qualité d’origine, un par un ou tous ensemble',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Architecture Albumy',
      bullets: [
        'Envois en morceaux reprenables avec file d’attente conservée dans le navigateur (IndexedDB) ; le serveur indique les morceaux déjà reçus.',
        'Un worker adossé à Redis produit les versions miniature, moyenne et complète, et une version H.264 avec affiche pour la vidéo.',
        'Le pub/sub Redis alimente un WebSocket STOMP : envois et transcodages terminés apparaissent instantanément dans chaque galerie ouverte.',
        'Rôles : admin, organisateur, invité anonyme et visiteur en lecture seule ; l’inscription des organisateurs passe par des liens d’invitation à usage unique.',
      ],
      highlights: [
        { title: 'Reprenable par conception', description: 'Rechargez, perdez le réseau ou fermez l’onglet : l’envoi reprend où il s’était arrêté.' },
        { title: 'En direct partout', description: 'Du pub/sub Redis au WebSocket, chaque galerie reste à jour.' },
      ],
      tiers: [
        { label: 'Clients', nodes: [{ name: 'Application Angular', sub: 'page invité · tableau de bord · QR' }, { name: 'Capacitor', sub: 'enveloppe Android' }] },
        { label: 'Services', nodes: [
          { name: 'Spring Boot (web)', sub: 'API · JWT · jetons d’invité · WebSocket' },
          { name: 'Spring Boot (worker)', sub: 'transcodage image et vidéo' },
        ] },
        { label: 'Données', nodes: [{ name: 'MySQL', sub: 'événements · photos · utilisateurs' }, { name: 'Redis', sub: 'file de tâches · pub/sub' }] },
      ],
      note: 'Les envois n’attendent jamais le traitement : le worker rattrape en arrière-plan',
    },
    decisions: [
      {
        title: 'Un worker dédié au traitement des médias',
        reasoning: 'Le transcodage est lent et par rafales ; le sortir du processus web garde l’API réactive.',
        tradeoffs: 'Un service de plus à exécuter, ce que Docker Compose absorbe.',
      },
      {
        title: 'Pas de compte pour les invités',
        reasoning: 'Chaque étape en plus perd un invité. Un pseudo unique et un jeton émis par le serveur suffisent pour attribuer les envois.',
        tradeoffs: 'L’identité d’un invité est plus faible qu’une connexion ; les organisateurs gardent suppression et modération.',
      },
    ],
    deployment: {
      isDeployed: true,
      liveUrl: 'https://majdabbassi.github.io/Albumy/',
      flow: 'GitHub → Render (Docker) + GitHub Pages',
      environment: 'Offres gratuites : GitHub Pages (web), Render (API), TiDB Cloud (MySQL), Redis Cloud',
      details: [
        'docker compose up lance MySQL, Redis, le service web, le worker, nginx et phpMyAdmin',
        'Le disque de la démo est jetable : le Demo Wedding est reconstruit à chaque démarrage',
        'La CI exécute les tests à chaque push',
      ],
    },
    challenges: [
      {
        challenge: 'De gros envois sur des réseaux peu fiables.',
        solution: 'Découpage avec reprise depuis le serveur, trois tentatives avec attente croissante, file IndexedDB et pause hors ligne.',
        outcome: 'Les envois aboutissent après rechargements et coupures.',
      },
    ],
    impact: {
      improvements: [
        'Un parcours invité qui ne demande qu’un QR code',
        'Un pipeline média qui garde l’API rapide sous charge',
      ],
      learnings: [
        'La reprise demande la coopération du serveur, pas seulement des nouvelles tentatives côté client',
        'Séparer le worker tôt simplifie les deux parties',
      ],
    },
    showcase: {
      live: 'https://majdabbassi.github.io/Albumy/',
      repo: 'https://github.com/Majdabbassi/Albumy',
      logins: [{ role: 'Organisateur', user: 'demo_organizer', password: 'demo_organizer_password' }],
      extra: [{ label: 'Page invité (sans compte)', href: 'https://majdabbassi.github.io/Albumy/e/DEMO01' }],
      note: 'Démo publique partagée sur un disque jetable : ne téléversez rien de personnel. La première requête peut prendre environ une minute.',
      screens: shots(['Tableau de bord organisateur', 'Page d’événement : QR code, liens, galerie en direct', 'Page invité sur téléphone', 'Album partagé sur téléphone']),
    },
  },
};
