// ============================================================
//  YOUR TEXTS — home page, about, experience, contact.
//  Every text has an English (en) and French (fr) version.
// ============================================================
import { L } from '../i18n/i18n';

export interface TimelineItem { when: L; title: L; place: L; points: L[] }

export const SITE = {
  name: 'Majd Abbassi',
  handle: 'majd.abbassi',
  photo: '/assets/majdface.png',
  status: { en: 'Open to opportunities', fr: 'Ouvert aux opportunités' } as L,

  hero: {
    hello: { en: "Hi, I'm Majd Abbassi", fr: 'Salut, je suis Majd Abbassi' } as L,
    eyebrow: { en: 'Full-stack engineer · Sousse, Tunisia', fr: 'Ingénieur full-stack · Sousse, Tunisie' } as L,
    title: { en: 'I build the software behind real businesses.', fr: 'Je construis le logiciel qui fait tourner de vraies entreprises.' } as L,
    titleAccent: { en: 'Go ahead — poke at it.', fr: 'Allez-y — touchez à tout.' } as L,
    text: {
      en: 'Production-oriented: Spring Boot and Angular, shipped with Docker, monitored after release. Every project below has a tiny playable version — no login, no waiting for a free API to wake up.',
      fr: 'Orienté production : Spring Boot et Angular, livrés avec Docker, supervisés après la mise en ligne. Chaque projet ci-dessous a une petite version jouable — sans compte, sans attendre qu’une API gratuite se réveille.',
    } as L,
  },

  // Three proof lines under the hero text
  creds: [
    { en: 'Backend systems built for production · multi-tenant', fr: 'Systèmes backend construits pour la production · multi-tenant' },
    { en: 'DevOps from zero · full stack deployed & monitored', fr: 'DevOps de zéro · déployé, monitoré, de bout en bout' },
    { en: 'AI features shipped · deployed', fr: 'Features IA livrées · déployées' },
  ] as L[],

  // Lines typed in the hero terminal
  terminal: [
    { key: 'backend', value: 'spring-boot · java 21' },
    { key: 'frontend', value: 'angular · typescript' },
    { key: 'realtime', value: 'websocket · stomp · redis' },
    { key: 'ops', value: 'docker · nginx · grafana' },
    { key: 'projects', value: '12 shipped · 9 playable' },
  ],

  shelf: {
    eyebrow: { en: 'The shelf', fr: 'L’étagère' } as L,
    title: { en: 'Nine projects. Each one is a toy.', fr: 'Neuf projets. Chacun est un jouet.' } as L,
    text: {
      en: 'Every card loops the one mechanic that project is really about. Open it to play — then read how it was built.',
      fr: 'Chaque carte rejoue le mécanisme central du projet. Ouvrez-la pour jouer — puis découvrez comment il a été construit.',
    } as L,
  },

  // The self-training block shown after the projects
  lab: {
    eyebrow: { en: 'Side quest', fr: 'Quête annexe' } as L,
    title: { en: 'Deployment Lab', fr: 'Laboratoire de déploiement' } as L,
    subtitle: { en: 'Self-driven infrastructure training initiative.', fr: 'Initiative d’auto-formation infrastructure.' } as L,
    text: {
      en: 'To deeply understand production behavior, I repeatedly deployed a simplified application using multiple strategies — refining server setup, configuration logic, and release flows.',
      fr: 'Pour comprendre en profondeur le comportement en production, j’ai redéployé une application simplifiée via plusieurs stratégies — en affinant la configuration serveur, la logique de configuration et les flux de release.',
    } as L,
    handsOn: { en: 'Hands-on experimentation included:', fr: 'Expérimentations pratiques :' } as L,
    items: [
      { en: 'Nginx reverse proxy (direct deployment)', fr: 'Proxy inverse Nginx (déploiement direct)' },
      { en: 'Docker containerization', fr: 'Conteneurisation Docker' },
      { en: 'Docker Compose multi-service orchestration', fr: 'Orchestration multi-services Docker Compose' },
      { en: 'Service restart & failure recovery testing', fr: 'Tests de redémarrage des services et récupération après panne' },
    ] as L[],
    footer: {
      en: 'Built to understand what breaks in production — before users find it.',
      fr: 'Conçu pour comprendre ce qui casse en production — avant que ce soit les utilisateurs qui le découvrent.',
    } as L,
  },

  about: {
    eyebrow: { en: 'About me', fr: 'À propos' } as L,
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
  },

  journey: {
    title: { en: 'Engineering Journey', fr: 'Parcours d’ingénierie' } as L,
    text: {
      en: 'A structured progression from academic foundations to full ownership of production systems.',
      fr: 'Une progression structurée : des fondations académiques vers l’ownership complet des systèmes en production.',
    } as L,
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
    {
      when: { en: 'Ongoing', fr: 'En continu' },
      title: { en: 'Independent Deployment Lab', fr: 'Laboratoire de déploiement personnel' },
      place: { en: 'Self-driven', fr: 'Auto-formation' },
      points: [
        { en: 'Repeatedly redeployed a controlled application to study production behavior.', fr: 'Redéploiement répété d’une application pour comprendre le comportement en production.' },
        { en: 'Tested reverse proxies, server configuration, containerization and Docker orchestration.', fr: 'Expérimentation des reverse proxies, configurations serveur, conteneurisation et orchestration Docker.' },
      ],
    },
  ] as TimelineItem[],

  studies: [
    {
      when: { en: '2025 — Present', fr: '2025 — Aujourd’hui' },
      title: { en: 'Engineering Degree (currently enrolled)', fr: 'Cycle ingénieur (en cours)' },
      place: { en: 'Polytechnique de Sousse · Sahloul, Tunisia', fr: 'Polytechnique de Sousse · Sahloul, Tunisie' },
      points: [],
    },
    {
      when: { en: '2022 — 2025', fr: '2022 — 2025' },
      title: { en: 'Licence in Computer Science (Bac+3)', fr: 'Licence en informatique (Bac+3)' },
      place: { en: 'ISITCOM · Hammam Sousse, Tunisia', fr: 'ISITCOM · Hammam Sousse, Tunisie' },
      points: [
        { en: 'Built solid foundations in programming, logic, and structured problem solving.', fr: 'Bases solides en programmation, logique et résolution structurée de problèmes.' },
        { en: 'Learned to reason about systems behavior, not only syntax and implementation details.', fr: 'Compréhension du comportement des systèmes au-delà de la simple implémentation.' },
      ],
    },
  ] as TimelineItem[],

  skills: {
    title: { en: 'Tech Stack', fr: 'Stack technique' } as L,
    text: { en: 'Organized by domain for a quick scan of the tools I use every day.', fr: 'Organisation par domaines pour une lecture rapide de mes outils quotidiens.' } as L,
    groups: [
      { name: { en: 'Backend', fr: 'Backend' }, core: ['Spring Boot', 'Java', 'PostgreSQL'], more: ['MySQL', 'JWT', 'WebSocket', 'Flyway'] },
      { name: { en: 'DevOps', fr: 'DevOps' }, core: ['Docker', 'Nginx', 'Prometheus'], more: ['Docker Compose', 'Grafana', 'Alertmanager', 'Linux'] },
      { name: { en: 'Frontend', fr: 'Frontend' }, core: ['Angular'], more: ['React', 'TypeScript', 'HTML/CSS'] },
      { name: { en: 'AI / Tools', fr: 'IA / Outils' }, core: [], more: ['Python', 'Groq LLM', 'Firebase', 'Maven', 'Git'] },
    ] as { name: L; core: string[]; more: string[] }[],
    today: {
      en: 'Today, I focus on building systems end-to-end — architecture, deployment, and operations — with long-term ownership in mind.',
      fr: 'Aujourd’hui, je construis des systèmes de bout en bout — architecture, déploiement et exploitation — avec une logique de responsabilité long terme.',
    } as L,
  },

  contact: {
    eyebrow: { en: 'Still here? Nice.', fr: 'Toujours là ? Top.' } as L,
    title: { en: "Let's build the next one together.", fr: 'Construisons le prochain ensemble.' } as L,
    text: {
      en: 'Open to backend, full-stack and systems engineering roles — and to freelance work. I usually answer within 24 hours.',
      fr: 'Ouvert aux postes backend, full-stack et ingénierie systèmes — et aux missions freelance. Je réponds généralement sous 24h.',
    } as L,
    footer: { en: 'Production Systems Engineer · Built with Angular.', fr: 'Ingénieur systèmes de production · Construit avec Angular.' } as L,
    email: 'majdabbassi11@gmail.com',
    github: 'https://github.com/Majdabbassi',
    linkedin: 'https://www.linkedin.com/in/majd-abbassi',
    cv: { en: '/assets/cv-majd-abbassi-en.pdf', fr: '/assets/cv-majd-abbassi-fr.pdf' } as L,
  },
};
