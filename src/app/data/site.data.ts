// ============================================================
//  YOUR TEXTS — home page, about, experience, contact.
//  Every text has an English (en) and French (fr) version.
// ============================================================
import { L } from '../i18n/i18n';

export interface TimelineItem { when: L; title: L; place: L; points: L[] }

/** One line printed by the About terminal: plain text, with optional coloured parts. */
export interface TermLine { mark?: '✓' | '→' | '●' | '$'; text: string; dim?: string; lamp?: boolean }
export interface TermCommand { cmd: string; lines: L<TermLine[]> }

export const SITE = {
  name: 'Majd Abbassi',
  handle: 'majd.abbassi',
  photo: '/assets/majdface.png',          // nav avatar + mini-Majd
  portrait: '/assets/majd-portrait.jpg',  // the real photo in "About"
  status: { en: 'Open to opportunities', fr: 'Ouvert aux opportunités' } as L,

  hero: {
    role: { en: 'Majd Abbassi · full-stack engineer · Sousse', fr: 'Majd Abbassi · ingénieur full-stack · Sousse' } as L,
    // "I build the software behind" + the phrase of each project (projects.data.ts → phrase)
    titleStart: { en: 'I build the software behind', fr: 'Je construis le logiciel derrière' } as L,
    text: {
      en: 'Spring Boot and Angular, shipped with Docker and watched after release. Twelve projects, and each one has a tiny playable version on this page — no login, no waiting for a free server to wake up.',
      fr: 'Spring Boot et Angular, livrés avec Docker et surveillés après la mise en ligne. Douze projets, et chacun a une petite version jouable sur cette page — sans compte, sans attendre qu’un serveur gratuit se réveille.',
    } as L,
    play: { en: 'Play with the projects', fr: 'Jouer avec les projets' } as L,
    talk: { en: 'Get in touch', fr: 'Me contacter' } as L,
    proof: [
      { n: '12', text: { en: 'playable projects', fr: 'projets jouables' } },
      { n: '6', text: { en: 'live demos', fr: 'démos en ligne' } },
      { n: '3', text: { en: 'in production at Educanet', fr: 'en production chez Educanet' } },
    ] as { n: string; text: L }[],
    orbitHint: { en: 'hover to pause · click a project', fr: 'survolez pour mettre en pause · cliquez un projet' } as L,
    playIt: { en: 'Play it below ↓', fr: 'À tester plus bas ↓' } as L,
    scroll: { en: 'scroll to play', fr: 'défilez pour jouer' } as L,
    // the faint ring of tools turning inside the orbit
    ring: 'spring boot · angular · java 21 · typescript · postgresql · redis · websocket · docker · nginx · grafana · n8n · ollama ·',
  },

  shelf: {
    eyebrow: { en: 'The shelf', fr: 'L’étagère' } as L,
    title: { en: 'Twelve projects. Each one is a toy.', fr: 'Douze projets. Chacun est un jouet.' } as L,
    text: {
      en: 'Every card plays the one mechanic that project is really about. Press its button — then open it to read how it was built.',
      fr: 'Chaque carte rejoue le mécanisme central du projet. Appuyez sur son bouton — puis ouvrez-la pour découvrir comment il a été construit.',
    } as L,
    caseStudy: { en: 'Case study →', fr: 'Étude de cas →' } as L,
    badges: {
      live: { en: 'Live demo', fr: 'Démo en ligne' },
      prod: { en: 'In production', fr: 'En production' },
      local: { en: 'Runs locally', fr: 'Tourne en local' },
      fav: { en: 'My favourite', fr: 'Mon préféré' },
    } as Record<'live' | 'prod' | 'local' | 'fav', L>,
  },

  // The self-training block shown after the projects
  lab: {
    eyebrow: { en: 'Side quest', fr: 'Quête annexe' } as L,
    title: { en: 'DevOps Lab', fr: 'Labo DevOps' } as L,
    subtitle: { en: 'Self-driven infrastructure training initiative.', fr: 'Initiative d’auto-formation infrastructure.' } as L,
    text: {
      en: 'To deeply understand production behavior, I repeatedly deployed a simplified application using multiple strategies — refining server setup, configuration logic, and release flows.',
      fr: 'Pour comprendre en profondeur le comportement en production, j’ai redéployé une application simplifiée via plusieurs stratégies — en affinant la configuration serveur, la logique de configuration et les flux de release.',
    } as L,
    // the four things the lab practises (one tab each)
    focus: {
      en: 'Deploy it, watch it, scale it, break it. The console on the right replays those four on a small system — a simulation, not a live server.',
      fr: 'Le déployer, le surveiller, le faire monter en charge, le casser. La console de droite rejoue ces quatre étapes sur un petit système — une simulation, pas un vrai serveur.',
    } as L,
    handsOn: { en: 'what I practise · simulated', fr: 'ce que je pratique · simulé' } as L,
    items: [
      { en: 'Deploy', fr: 'Déployer' },
      { en: 'Monitor', fr: 'Surveiller' },
      { en: 'Scale', fr: 'Monter en charge' },
      { en: 'Break it', fr: 'Casser' },
    ] as L[],
    foot: [
      { en: 'release without downtime', fr: 'livrer sans coupure' },
      { en: 'metrics, then an alert', fr: 'des métriques, puis une alerte' },
      { en: 'more replicas, same load', fr: 'plus de réplicas, même charge' },
      { en: 'what happens when it fails?', fr: 'que se passe-t-il quand ça casse ?' },
    ] as L[],
    footer: {
      en: 'Built to understand what breaks in production — before users find it.',
      fr: 'Conçu pour comprendre ce qui casse en production — avant que ce soit les utilisateurs qui le découvrent.',
    } as L,
  },

  about: {
    eyebrow: { en: 'About me', fr: 'À propos' } as L,
    hi: { en: 'hi, I’m Majd', fr: 'salut, c’est Majd' } as L,
    facts: [
      { icon: 'pin', text: { en: 'Sousse, Tunisia', fr: 'Sousse, Tunisie' } },
      { icon: 'work', text: { en: 'Full-stack developer · Educanet', fr: 'Développeur full-stack · Educanet' } },
      { icon: 'study', text: { en: 'Engineering student · Polytechnique de Sousse', fr: 'Élève ingénieur · Polytechnique de Sousse' } },
      { icon: 'lang', text: { en: 'English · French', fr: 'Anglais · Français' } },
    ] as { icon: 'pin' | 'work' | 'study' | 'lang'; text: L }[],
    title: { en: 'Not just screens.', fr: 'Pas juste des écrans.' } as L,
    titleAccent: { en: 'Systems that keep running', fr: 'Des systèmes qui tournent encore' } as L,
    titleEnd: { en: 'when the demo ends.', fr: 'quand la démo s’arrête.' } as L,
    paragraphs: [
      {
        en: 'I’m a systems-oriented engineer focused on building reliable, production-grade software. My work combines backend architecture, DevOps automation, and observability to create systems that scale and remain maintainable over time.',
        fr: 'Je suis un ingénieur orienté systèmes, focalisé sur des logiciels fiables et prêts pour la production. Mon travail combine architecture backend, automatisation DevOps et observabilité pour créer des systèmes scalables et maintenables dans le temps.',
      },
      {
        en: 'Deployment is just the beginning. I constantly analyze bottlenecks, refine pipelines, and iterate based on real-world metrics. I’m driven by building things that outlive trends — systems designed to endure change.',
        fr: 'Le déploiement n’est que le début. J’analyse les goulots d’étranglement, j’améliore les pipelines et j’itère selon les métriques réelles. Je construis des systèmes qui résistent au changement.',
      },
    ] as L[],
    today: {
      en: 'Today, I focus on building systems end-to-end — architecture, deployment, and operations — with long-term ownership in mind.',
      fr: 'Aujourd’hui, je construis des systèmes de bout en bout — architecture, déploiement et exploitation — avec une logique de responsabilité long terme.',
    } as L,
  },

  toolbox: {
    eyebrow: { en: 'Toolbox', fr: 'Boîte à outils' } as L,
    title: { en: 'Pick a tool, or run a command.', fr: 'Choisissez un outil, ou lancez une commande.' } as L,
    text: { en: 'The stack I reach for, and the projects on this page that use it.', fr: 'La stack que j’utilise, et les projets de cette page qui s’en servent.' } as L,
    stackTitle: { en: 'Tech stack', fr: 'Stack technique' } as L,
    pick: { en: 'pick a tool', fr: 'choisissez un outil' } as L,
    usedIn: { en: 'used in', fr: 'utilisé dans' } as L,
    project: { en: 'project', fr: 'projet' } as L,
    projects: { en: 'projects', fr: 'projets' } as L,
    everyday: { en: 'An everyday tool behind all of them.', fr: 'Un outil du quotidien, derrière tous les projets.' } as L,
    tryCmd: { en: 'try a command', fr: 'essayez une commande' } as L,
  },

  // The About terminal: one entry per command button
  terminal: [
    {
      cmd: 'majd --whoami',
      lines: {
        en: [
          { text: 'full-stack developer · ', dim: 'Educanet, since Jan 2025' },
          { text: 'engineering student · ', dim: 'Polytechnique de Sousse' },
          { text: 'licence in CS       · ', dim: 'ISITCOM, 2022–2025' },
          { text: 'speaks              · ', dim: 'English · French' },
          { mark: '→', text: 'open to backend, full-stack and systems roles' },
        ],
        fr: [
          { text: 'développeur full-stack · ', dim: 'Educanet, depuis janv. 2025' },
          { text: 'élève ingénieur        · ', dim: 'Polytechnique de Sousse' },
          { text: 'licence informatique   · ', dim: 'ISITCOM, 2022–2025' },
          { text: 'langues                · ', dim: 'anglais · français' },
          { mark: '→', text: 'ouvert aux postes backend, full-stack et systèmes' },
        ],
      },
    },
    {
      cmd: 'docker compose up majd',
      lines: {
        en: [
          { mark: '✓', text: 'backend      spring-boot · java 21' },
          { mark: '✓', text: 'frontend     angular · typescript' },
          { mark: '✓', text: 'realtime     websocket · stomp · redis' },
          { mark: '✓', text: 'ops          docker · nginx · grafana' },
          { mark: '✓', text: 'projects     12 shipped · 12 playable' },
        ],
        fr: [
          { mark: '✓', text: 'backend      spring-boot · java 21' },
          { mark: '✓', text: 'frontend     angular · typescript' },
          { mark: '✓', text: 'temps réel   websocket · stomp · redis' },
          { mark: '✓', text: 'ops          docker · nginx · grafana' },
          { mark: '✓', text: 'projets      12 livrés · 12 jouables' },
        ],
      },
    },
    {
      cmd: 'ls ./live',
      lines: {
        en: [
          { mark: '●', text: 'albumy        ', dim: 'github pages + render' },
          { mark: '●', text: 'friendmap     ', dim: 'github pages + render' },
          { mark: '●', text: 'mall-os       ', dim: 'vercel + render' },
          { mark: '●', text: 'swiftdeliver  ', dim: 'github pages + render' },
          { mark: '●', text: 'car-rental    ', dim: 'vercel + render' },
          { mark: '●', text: 'sportclub     ', dim: 'vercel × 2 + render' },
          { mark: '●', text: 'bookpro       ', dim: 'in production · educanet', lamp: true },
        ],
        fr: [
          { mark: '●', text: 'albumy        ', dim: 'github pages + render' },
          { mark: '●', text: 'friendmap     ', dim: 'github pages + render' },
          { mark: '●', text: 'mall-os       ', dim: 'vercel + render' },
          { mark: '●', text: 'swiftdeliver  ', dim: 'github pages + render' },
          { mark: '●', text: 'car-rental    ', dim: 'vercel + render' },
          { mark: '●', text: 'sportclub     ', dim: 'vercel × 2 + render' },
          { mark: '●', text: 'bookpro       ', dim: 'en production · educanet', lamp: true },
        ],
      },
    },
  ] as TermCommand[],

  journey: {
    eyebrow: { en: 'Engineering Journey', fr: 'Parcours d’ingénierie' } as L,
    title: { en: 'From the classroom to production.', fr: 'De l’amphi à la production.' } as L,
    text: {
      en: 'A structured progression from academic foundations to full ownership of production systems. Click a bar.',
      fr: 'Une progression structurée : des fondations académiques vers l’ownership complet des systèmes en production. Cliquez sur une barre.',
    } as L,
    lanes: { studies: { en: 'Studies', fr: 'Études' }, work: { en: 'Work', fr: 'Travail' }, side: { en: 'Side Projects', fr: 'Projets secondaires' } } as Record<'studies' | 'work' | 'side', L>,
    now: { en: 'now', fr: 'en cours' } as L,
    // the card shown when the intern + full-time slot is clicked (both roles, same company)
    educanet: {
      when: { en: 'Jan 2025 — Present', fr: 'janv. 2025 — Aujourd’hui' } as L,
      title: { en: 'Educanet', fr: 'Educanet' } as L,
      place: { en: 'Tunis, Tunisia', fr: 'Tunis, Tunisie' } as L,
    },
    // the projects lane: one cell per project, in this order (left to right)
    // Two rows. x = left edge in % of the project lane, w = width in %, row = 0 (top) or 1 (bottom).
    // Placed for looks, not to scale; the dates are only written on the cards.
    personal: [
      { slug: 'swiftdeliver', x: 0, w: 17, row: 0, dates: { en: 'Jun → Jul 2025', fr: 'juin → juil. 2025' } },
      { slug: 'car-rental', x: 9.5, w: 17, row: 1, dates: { en: 'Aug → Oct 2025', fr: 'août → oct. 2025' } },
      { slug: 'caferesto', x: 21, w: 22, row: 0, dates: { en: 'Dec 2025 → May 2026', fr: 'déc. 2025 → mai 2026' } },
      { slug: 'reachflow', x: 45, w: 17, row: 0, dates: { en: 'Jul 2026', fr: 'juil. 2026' } },
      { slug: 'mall-os', x: 64, w: 17, row: 0, dates: { en: 'Sep 2026', fr: 'sept. 2026' } },
      { slug: 'insighthub', x: 64, w: 17, row: 1, dates: { en: 'Sep 2026', fr: 'sept. 2026' } },
      { slug: 'albumy', x: 83, w: 17, row: 0, dates: { en: 'Aug 2026', fr: 'août 2026' } },
      { slug: 'friendmap', x: 83, w: 17, row: 1, dates: { en: 'Sep 2026', fr: 'sept. 2026' } },
    ] as { slug: string; x: number; w: number; row: number; dates: L }[],
  },

  // Newest first
  work: [
    {
      when: { en: 'Jul 2025 — Present', fr: 'juil. 2025 — Aujourd’hui' },
      title: { en: 'Full-Stack Developer', fr: 'Développeur Full-Stack' },
      place: { en: 'Educanet · Tunis, Tunisia', fr: 'Educanet · Tunis, Tunisie' },
      points: [
        { en: 'Contributed to architectural decisions on production systems serving active clients.', fr: 'Contribution aux décisions d’architecture sur des systèmes de production utilisés par des clients actifs.' },
        { en: 'Worked in a security-conscious, performance-oriented engineering environment.', fr: 'Travail dans un environnement d’ingénierie sécurisé et orienté performance.' },
        { en: 'Production deployment via WAR artifact on Apache Tomcat infrastructure.', fr: 'Déploiement en production via un artefact WAR sur Apache Tomcat.' },
      ],
    },
    {
      when: { en: 'Jan 2025 — Jun 2025', fr: 'janv. 2025 — juin 2025' },
      title: { en: 'Full-Stack Developer Intern', fr: 'Stagiaire Développeur Full-Stack' },
      place: { en: 'Educanet · Tunis, Tunisia', fr: 'Educanet · Tunis, Tunisie' },
      points: [
        { en: 'Worked on a live production system used by real clients from day one.', fr: 'Travail sur un système de production utilisé par de vrais clients dès le premier jour.' },
        { en: 'Shifted from feature delivery to reliability-focused system thinking.', fr: 'Passage d’une logique « faire marcher une fonctionnalité » à une logique de fiabilité système.' },
      ],
    },
  ] as TimelineItem[],

  studies: [
    {
      when: { en: 'Jul 2025 — Present', fr: 'juil. 2025 — Aujourd’hui' },
      title: { en: 'Engineering Degree (currently enrolled)', fr: 'Cycle ingénieur (en cours)' },
      place: { en: 'Polytechnique de Sousse · Sahloul, Tunisia', fr: 'Polytechnique de Sousse · Sahloul, Tunisie' },
      points: [],
    },
    {
      when: { en: 'Sep 2022 — Jun 2025', fr: 'sept. 2022 — juin 2025' },
      title: { en: 'Licence in Computer Science (Bac+3)', fr: 'Licence en informatique (Bac+3)' },
      place: { en: 'ISITCOM · Hammam Sousse, Tunisia', fr: 'ISITCOM · Hammam Sousse, Tunisie' },
      points: [
        { en: 'Built solid foundations in programming, logic, and structured problem solving.', fr: 'Bases solides en programmation, logique et résolution structurée de problèmes.' },
        { en: 'Learned to reason about systems behavior, not only syntax and implementation details.', fr: 'Compréhension du comportement des systèmes au-delà de la simple implémentation.' },
      ],
    },
  ] as TimelineItem[],

  skills: {
    groups: [
      { name: { en: 'Backend', fr: 'Backend' }, core: ['Spring Boot', 'Java', 'PostgreSQL'], more: ['MySQL', 'Redis', 'NestJS', 'JWT', 'WebSocket', 'Flyway'] },
      { name: { en: 'DevOps', fr: 'DevOps' }, core: ['Docker', 'Nginx', 'Prometheus'], more: ['Docker Compose', 'Grafana', 'Alertmanager', 'GitHub Actions', 'Linux'] },
      { name: { en: 'Frontend', fr: 'Frontend' }, core: ['Angular'], more: ['TypeScript', 'React', 'Vue', 'React Native', 'HTML/CSS'] },
      { name: { en: 'AI / Tools', fr: 'IA / Outils' }, core: [], more: ['Python', 'FastAPI', 'Groq LLM', 'n8n', 'Firebase', 'Maven', 'Git'] },
    ] as { name: L; core: string[]; more: string[] }[],
    // which projects (by slug) use each tool; tools not listed are "everyday tools"
    uses: {
      'Spring Boot': ['albumy', 'mall-os', 'swiftdeliver', 'insighthub', 'bookpro', 'car-rental', 'sportclub', 'reachflow', 'caferesto', 'massarat', 'mediplus'],
      'Java': ['albumy', 'mall-os', 'swiftdeliver', 'insighthub', 'bookpro', 'car-rental', 'sportclub', 'reachflow', 'caferesto', 'massarat', 'mediplus'],
      'PostgreSQL': ['friendmap', 'caferesto'],
      'MySQL': ['albumy', 'mall-os', 'swiftdeliver', 'insighthub', 'bookpro', 'car-rental', 'sportclub', 'reachflow', 'massarat', 'mediplus'],
      'Redis': ['albumy', 'friendmap'],
      'NestJS': ['friendmap'],
      'JWT': ['friendmap', 'albumy', 'mall-os', 'swiftdeliver', 'insighthub', 'bookpro', 'car-rental', 'sportclub', 'caferesto', 'massarat', 'mediplus'],
      'WebSocket': ['friendmap', 'albumy', 'swiftdeliver', 'bookpro', 'sportclub', 'caferesto', 'massarat'],
      'Flyway': ['insighthub'],
      'Docker': ['albumy', 'friendmap', 'mall-os', 'swiftdeliver', 'insighthub', 'bookpro', 'car-rental', 'sportclub', 'reachflow', 'caferesto'],
      'Docker Compose': ['albumy', 'friendmap', 'mall-os', 'swiftdeliver', 'insighthub', 'bookpro', 'car-rental', 'sportclub', 'reachflow', 'caferesto'],
      'Nginx': ['albumy', 'mall-os', 'swiftdeliver', 'insighthub', 'bookpro', 'caferesto'],
      'Prometheus': ['swiftdeliver', 'bookpro', 'caferesto'],
      'Grafana': ['swiftdeliver', 'bookpro', 'caferesto'],
      'Alertmanager': ['caferesto'],
      'GitHub Actions': ['albumy', 'friendmap', 'mall-os', 'swiftdeliver', 'insighthub', 'car-rental', 'sportclub', 'reachflow'],
      'Angular': ['albumy', 'mall-os', 'swiftdeliver', 'insighthub', 'bookpro', 'car-rental', 'sportclub', 'reachflow', 'massarat', 'mediplus'],
      'TypeScript': ['friendmap', 'albumy', 'mall-os', 'swiftdeliver', 'insighthub', 'bookpro', 'car-rental', 'sportclub', 'reachflow', 'massarat', 'mediplus'],
      'React': ['caferesto'],
      'Vue': ['friendmap'],
      'React Native': ['sportclub', 'caferesto', 'massarat', 'mediplus'],
      'Python': ['insighthub', 'caferesto'],
      'FastAPI': ['insighthub', 'caferesto'],
      'Groq LLM': ['caferesto'],
      'n8n': ['reachflow'],
      'Firebase': ['sportclub', 'mediplus'],
    } as Record<string, string[]>,
  },

  contact: {
    eyebrow: { en: 'Still here? Nice.', fr: 'Toujours là ? Top.' } as L,
    title: { en: 'Let’s build', fr: 'Construisons' } as L,
    titleAccent: { en: 'the next one', fr: 'le prochain' } as L,
    titleEnd: { en: 'together.', fr: 'ensemble.' } as L,
    text: {
      en: 'Have a role, a project or just a question? Pick the channel that suits you — I answer in English or French.',
      fr: 'Un poste, un projet ou juste une question ? Choisissez le canal qui vous va — je réponds en anglais ou en français.',
    } as L,
    inSousse: { en: 'in Sousse', fr: 'à Sousse' } as L,
    replies: { en: 'Replies within 24 h', fr: 'Réponse sous 24 h' } as L,
    lookingFor: { en: 'Looking for', fr: 'Je cherche' } as L,
    roles: [
      { en: 'Backend', fr: 'Backend' },
      { en: 'Full-stack', fr: 'Full-stack' },
      { en: 'Systems engineering', fr: 'Ingénierie systèmes' },
    ] as L[],
    mailLabel: { en: 'Email · best for roles and projects', fr: 'E-mail · idéal pour un poste ou un projet' } as L,
    copyMail: { en: 'Copy address', fr: 'Copier l’adresse' } as L,
    writeMe: { en: 'Write to me', fr: 'M’écrire' } as L,
    waLabel: { en: 'WhatsApp · quicker for a short chat', fr: 'WhatsApp · plus rapide pour un échange court' } as L,
    copyWa: { en: 'Copy number', fr: 'Copier le numéro' } as L,
    openWa: { en: 'Message on WhatsApp', fr: 'Écrire sur WhatsApp' } as L,
    linkedinText: { en: 'Experience, education and what I’m working on.', fr: 'Expérience, études et ce sur quoi je travaille.' } as L,
    githubText: { en: 'The code behind every project, with READMEs on the decisions.', fr: 'Le code de chaque projet, avec des README sur les décisions.' } as L,
    cvText: { en: 'One page.', fr: 'Une page.' } as L,
    footer: { en: 'Production Systems Engineer · Built with Angular.', fr: 'Ingénieur systèmes de production · Construit avec Angular.' } as L,
    stats: { en: 'Anonymous visit stats by Microsoft Clarity.', fr: 'Statistiques de visite anonymes par Microsoft Clarity.' } as L,
    email: 'majdabbassi11@gmail.com',
    // WhatsApp number, written however you like (the link keeps only the digits). Empty = the WhatsApp card is hidden.
    whatsapp: '+216 28 819 394',
    github: 'https://github.com/Majdabbassi',
    linkedin: 'https://www.linkedin.com/in/majd-abbassi',
    cv: { en: '/assets/cv-majd-abbassi-en.pdf', fr: '/assets/cv-majd-abbassi-fr.pdf' } as L,
  },
};
