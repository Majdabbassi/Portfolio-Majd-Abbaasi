import { ProjectDetail } from '../project-detail';

const shots = (c: string[]) => [
  { src: '/assets/screens/friendmap/map.png', caption: c[0] },
  { src: '/assets/screens/friendmap/sharing.png', caption: c[1] },
  { src: '/assets/screens/friendmap/friends.png', caption: c[2] },
];

export const FRIENDMAP: { en: ProjectDetail; fr: ProjectDetail } = {
  en: {
    id: 'friendmap',
    title: 'FriendMap — Real-Time Location Sharing with Privacy Controls',
    summary:
      'Share your live location with friends and decide exactly who sees it: nobody, everyone, selected friends, or everyone except some. Changes take effect within seconds. It also has direct messaging with private photos, online presence and meetup planning with a live trip map.',
    status: 'completed',
    role: 'Full Stack Engineer',
    roleContext: 'Real-time backend and Vue front end',
    techStack: ['NestJS', 'TypeScript', 'Prisma', 'PostgreSQL', 'Redis', 'Socket.IO', 'Vue 3', 'Leaflet', 'Docker', 'Kubernetes'],
    metrics: {
      team: 'Solo',
      duration: 'Built and hardened in 2026',
      scale: '109 unit + 21 end-to-end + 36 web tests · live demo',
      keyOutcomes: [
        'Four sharing modes with fast revocation: a hidden friend stops receiving your position almost at once',
        'Chat photos served only to the two people in the conversation',
        'Horizontal scaling ready: Socket.IO Redis adapter and Kubernetes manifests',
      ],
    },
    context: {
      problem:
        'Location sharing is the most sensitive thing an app can do. Friends want to see each other live, but changing who can see you must take effect immediately, and a stranger must never reach a position or a photo.',
      constraints: [
        'Visibility rules (ghost, everyone, selected, everyone-except) applied on every broadcast',
        'Implausible, stale or out-of-order points must be rejected',
        'Private photos must not be reachable by anyone outside the conversation',
      ],
      goals: [
        'Live map and chat over WebSocket, scalable across instances',
        'Meetup planning with a computed middle point and live arrival tracking',
        'A test suite that attacks privacy, not only the happy path',
      ],
    },
    architecture: {
      diagramPlaceholder: 'FriendMap architecture',
      bullets: [
        'NestJS API with JWT access and rotating refresh tokens, rate limiting on HTTP and sockets, and environment validation at boot.',
        'A visibility service decides, for every location update, which friends may receive it under the owner’s sharing mode.',
        'Socket.IO with the Redis adapter, so several API instances share rooms; Redis also holds presence.',
        'Chat images are stored under random names and served only to the sender and recipient of the message that carries them.',
      ],
      highlights: [
        { title: 'Privacy as the core feature', description: 'Every broadcast passes the owner’s visibility rules.' },
        { title: 'Scales out', description: 'Redis adapter and Kubernetes deployment, stateless API.' },
      ],
      tiers: [
        { label: 'Web', nodes: [{ name: 'Vue 3 + Pinia', sub: 'Leaflet map · chat · trips' }] },
        { label: 'API', nodes: [
          { name: 'NestJS', sub: 'JWT · throttling · Swagger' },
          { name: 'Socket.IO', sub: 'location · chat · presence' },
        ] },
        { label: 'Data', nodes: [{ name: 'PostgreSQL (Prisma)', sub: 'users · friendships · messages · trips' }, { name: 'Redis', sub: 'socket adapter · presence' }] },
      ],
      note: 'Visibility is checked on every broadcast, not once at connection time',
    },
    decisions: [
      {
        title: 'Check visibility on every update',
        reasoning: 'A one-time check at connection would keep showing a position after you hide it. Per-update checks make revocation immediate.',
        tradeoffs: 'More work per update, mitigated by batched queries.',
      },
      {
        title: 'Serve private images through the API',
        reasoning: 'Public file URLs leak. The API authenticates the request and checks the caller is part of the conversation.',
        tradeoffs: 'The browser fetches images with the token and shows them through object URLs.',
      },
    ],
    deployment: {
      isDeployed: true,
      liveUrl: 'https://majdabbassi.github.io/FriendMap/',
      flow: 'GitHub → Render (Docker) + GitHub Pages',
      environment: 'Free tiers: GitHub Pages (web), Render (API), Neon (PostgreSQL), Upstash (Redis)',
      details: [
        'docker compose up runs Postgres, Redis, the API and the web app, all on 127.0.0.1',
        'CI runs the API unit and end-to-end tests against Postgres and a password-protected Redis',
        'Kubernetes manifests cover the API, web, Postgres, Redis and shared uploads',
      ],
    },
    challenges: [
      {
        challenge: 'Chat photos were reachable by anyone who had the URL.',
        solution: 'Found by attacking the running stack. The uploads route now needs a login and a message in common, and an end-to-end test checks the sender, the recipient, a third friend and the deleted-message case.',
        outcome: 'A stranger gets 404, a deleted message takes its photo with it.',
      },
      {
        challenge: 'Image uploads failed in Docker for the non-root user.',
        solution: 'The uploads directory is created and owned by that user before the volume mounts.',
        outcome: 'Uploads work in Docker Compose.',
      },
    ],
    impact: {
      improvements: [
        'A privacy bug found and fixed before anyone could exploit it',
        'API tests now run in CI against real Postgres and Redis',
      ],
      learnings: [
        'Attack your own app: the bug was in a route nobody thought of as sensitive',
        'Real services in CI catch what mocks hide',
      ],
    },
    showcase: {
      live: 'https://majdabbassi.github.io/FriendMap/',
      repo: 'https://github.com/Majdabbassi/FriendMap',
      logins: [
        { role: 'Demo user', user: 'alice@friendmap.dev', password: 'password123' },
        { role: 'Her friend', user: 'bob@friendmap.dev', password: 'password123' },
      ],
      note: 'Sign in as Alice in one window and Bob in another to see sharing and chat live. Free hosting: the first request can take about a minute.',
      screens: shots(['Live map with friends', 'Sharing controls: four modes', 'Friends list and requests']),
    },
  },
  fr: {
    id: 'friendmap',
    title: 'FriendMap — Partage de position en temps réel avec contrôle de confidentialité',
    summary:
      'Partagez votre position en direct avec vos amis et décidez exactement qui la voit : personne, tout le monde, certains amis, ou tout le monde sauf certains. Les changements agissent en quelques secondes. Messagerie directe avec photos privées, présence en ligne et organisation de rendez-vous avec carte de trajet en direct.',
    status: 'completed',
    role: 'Ingénieur Full Stack',
    roleContext: 'Backend temps réel et front Vue',
    techStack: ['NestJS', 'TypeScript', 'Prisma', 'PostgreSQL', 'Redis', 'Socket.IO', 'Vue 3', 'Leaflet', 'Docker', 'Kubernetes'],
    metrics: {
      team: 'En solo',
      duration: 'Construit et durci en 2026',
      scale: '109 tests unitaires + 21 de bout en bout + 36 web · démo en ligne',
      keyOutcomes: [
        'Quatre modes de partage avec révocation rapide : un ami masqué cesse de recevoir votre position presque aussitôt',
        'Photos de chat servies uniquement aux deux personnes de la conversation',
        'Prêt pour la montée en charge : adaptateur Redis pour Socket.IO et manifestes Kubernetes',
      ],
    },
    context: {
      problem:
        'Partager sa position est ce qu’une application peut faire de plus sensible. Les amis veulent se voir en direct, mais changer qui peut vous voir doit agir immédiatement, et un inconnu ne doit jamais atteindre une position ou une photo.',
      constraints: [
        'Règles de visibilité (fantôme, tous, sélection, tous sauf) appliquées à chaque diffusion',
        'Les points invraisemblables, périmés ou dans le désordre doivent être rejetés',
        'Les photos privées ne doivent pas être accessibles à qui est hors de la conversation',
      ],
      goals: [
        'Carte et messagerie en direct par WebSocket, extensibles sur plusieurs instances',
        'Organisation de rendez-vous avec point médian calculé et suivi des arrivées en direct',
        'Une suite de tests qui attaque la confidentialité, pas seulement le cas nominal',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Architecture FriendMap',
      bullets: [
        'API NestJS avec JWT d’accès et jetons de rafraîchissement tournants, limitation de débit en HTTP et sur les sockets, validation de l’environnement au démarrage.',
        'Un service de visibilité décide, pour chaque mise à jour de position, quels amis peuvent la recevoir selon le mode de partage du propriétaire.',
        'Socket.IO avec l’adaptateur Redis : plusieurs instances partagent les salons ; Redis garde aussi la présence.',
        'Les images de chat sont stockées sous des noms aléatoires et servies seulement à l’expéditeur et au destinataire du message qui les porte.',
      ],
      highlights: [
        { title: 'La confidentialité au cœur', description: 'Chaque diffusion passe par les règles de visibilité du propriétaire.' },
        { title: 'Monte en charge', description: 'Adaptateur Redis et déploiement Kubernetes, API sans état.' },
      ],
      tiers: [
        { label: 'Web', nodes: [{ name: 'Vue 3 + Pinia', sub: 'carte Leaflet · chat · trajets' }] },
        { label: 'API', nodes: [
          { name: 'NestJS', sub: 'JWT · limitation de débit · Swagger' },
          { name: 'Socket.IO', sub: 'position · chat · présence' },
        ] },
        { label: 'Données', nodes: [{ name: 'PostgreSQL (Prisma)', sub: 'utilisateurs · amitiés · messages · trajets' }, { name: 'Redis', sub: 'adaptateur socket · présence' }] },
      ],
      note: 'La visibilité est vérifiée à chaque diffusion, pas une fois à la connexion',
    },
    decisions: [
      {
        title: 'Vérifier la visibilité à chaque mise à jour',
        reasoning: 'Un contrôle unique à la connexion continuerait d’afficher une position après qu’on l’a masquée. Un contrôle par mise à jour rend la révocation immédiate.',
        tradeoffs: 'Plus de travail par mise à jour, atténué par des requêtes groupées.',
      },
      {
        title: 'Servir les images privées via l’API',
        reasoning: 'Les URL de fichiers publics fuient. L’API authentifie la requête et vérifie que l’appelant fait partie de la conversation.',
        tradeoffs: 'Le navigateur récupère les images avec le jeton et les affiche via des URL d’objet.',
      },
    ],
    deployment: {
      isDeployed: true,
      liveUrl: 'https://majdabbassi.github.io/FriendMap/',
      flow: 'GitHub → Render (Docker) + GitHub Pages',
      environment: 'Offres gratuites : GitHub Pages (web), Render (API), Neon (PostgreSQL), Upstash (Redis)',
      details: [
        'docker compose up lance Postgres, Redis, l’API et le web, tous sur 127.0.0.1',
        'La CI exécute les tests unitaires et de bout en bout contre Postgres et un Redis protégé par mot de passe',
        'Les manifestes Kubernetes couvrent l’API, le web, Postgres, Redis et les téléversements partagés',
      ],
    },
    challenges: [
      {
        challenge: 'Les photos de chat étaient accessibles à quiconque avait l’URL.',
        solution: 'Trouvé en attaquant la pile en marche. La route des téléversements exige désormais une connexion et un message en commun, et un test de bout en bout vérifie l’expéditeur, le destinataire, un troisième ami et le cas du message supprimé.',
        outcome: 'Un inconnu reçoit 404, un message supprimé emporte sa photo.',
      },
      {
        challenge: 'Les téléversements d’images échouaient dans Docker pour l’utilisateur non-root.',
        solution: 'Le dossier de téléversement est créé et appartient à cet utilisateur avant le montage du volume.',
        outcome: 'Les téléversements fonctionnent dans Docker Compose.',
      },
    ],
    impact: {
      improvements: [
        'Un bug de confidentialité trouvé et corrigé avant que quiconque l’exploite',
        'Les tests de l’API tournent maintenant en CI contre un vrai Postgres et un vrai Redis',
      ],
      learnings: [
        'Attaquez votre propre application : le bug était dans une route que personne ne jugeait sensible',
        'De vrais services en CI révèlent ce que les mocks cachent',
      ],
    },
    showcase: {
      live: 'https://majdabbassi.github.io/FriendMap/',
      repo: 'https://github.com/Majdabbassi/FriendMap',
      logins: [
        { role: 'Utilisateur de démo', user: 'alice@friendmap.dev', password: 'password123' },
        { role: 'Son ami', user: 'bob@friendmap.dev', password: 'password123' },
      ],
      note: 'Connectez-vous comme Alice dans une fenêtre et Bob dans une autre pour voir partage et chat en direct. Hébergement gratuit : la première requête peut prendre environ une minute.',
      screens: shots(['Carte en direct avec les amis', 'Contrôles de partage : quatre modes', 'Amis et demandes']),
    },
  },
};
