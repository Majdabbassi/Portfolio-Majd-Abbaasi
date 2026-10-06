// ============================================================
//  YOUR TEXTS — home page, about, experience, contact.
//  Every text has an English (en) and French (fr) version.
// ============================================================
import { L } from '../i18n/i18n';

export const SITE = {
  name: 'Majd Abbassi',
  handle: 'majd.abbassi',
  photo: '/assets/majdface.png',
  status: { en: 'Open to opportunities', fr: 'Ouvert aux opportunités' } as L,

  hero: {
    eyebrow: { en: 'Full-stack engineer · Sousse, Tunisia', fr: 'Ingénieur full-stack · Sousse, Tunisie' } as L,
    title: { en: 'I build the software behind real businesses.', fr: 'Je construis le logiciel qui fait tourner de vraies entreprises.' } as L,
    titleAccent: { en: 'Go ahead — poke at it.', fr: 'Allez-y — touchez à tout.' } as L,
    text: {
      en: 'Production-oriented: Spring Boot and Angular, shipped with Docker, monitored after release. Every project below has a tiny playable version — no login, no waiting for a free API to wake up.',
      fr: 'Orienté production : Spring Boot et Angular, livrés avec Docker, supervisés après la mise en ligne. Chaque projet ci-dessous a une petite version jouable — sans compte, sans attendre qu’une API gratuite se réveille.',
    } as L,
  },

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

  // Newest first
  experience: [
    {
      when: { en: '[START DATE] — Present', fr: '[DATE DE DÉBUT] — Aujourd’hui' },
      title: { en: 'Full-Stack Developer — Tripteck', fr: 'Développeur Full-Stack — Tripteck' },
      points: [
        { en: 'TripTek: staff transport and shuttle management. [WHAT YOU WORK ON]', fr: 'TripTek : transport de personnel et navettes. [CE SUR QUOI VOUS TRAVAILLEZ]' },
      ],
    },
    {
      when: { en: 'Jul 2025 — Present', fr: 'juil. 2025 — Aujourd’hui' },
      title: { en: 'Full-Stack Developer — Educanet', fr: 'Développeur Full-Stack — Educanet' },
      points: [
        { en: 'Contributed to architectural decisions and improved internal code structure.', fr: 'Contribution aux décisions d’architecture et amélioration de l’organisation du code en équipe.' },
        { en: 'Production deployment using WAR + Apache Tomcat.', fr: 'Déploiement en production via Apache Tomcat (WAR).' },
      ],
    },
    {
      when: { en: 'Dec 2024 — Jun 2025', fr: 'déc. 2024 — juin 2025' },
      title: { en: 'First internship — Educanet', fr: 'Premier stage — Educanet' },
      points: [
        { en: 'Worked on a real production system used by clients.', fr: 'Travail sur un système de production utilisé par de vrais clients.' },
        { en: 'Shifted from feature delivery to reliability-focused system thinking.', fr: 'Passage d’une logique « faire marcher une fonctionnalité » à une logique de fiabilité système.' },
      ],
    },
    {
      when: { en: 'Sep 2022 — Jun 2025', fr: 'sept. 2022 — juin 2025' },
      title: { en: 'Computer Science studies — ISITCOM', fr: 'Études en informatique — ISITCOM' },
      points: [
        { en: 'Solid foundations in programming, logic and structured problem solving.', fr: 'Bases solides en programmation, logique et résolution structurée de problèmes.' },
      ],
    },
  ] as { when: L; title: L; points: L[] }[],

  contact: {
    eyebrow: { en: 'Still here? Nice.', fr: 'Toujours là ? Top.' } as L,
    title: { en: "Let's build the next one together.", fr: 'Construisons le prochain ensemble.' } as L,
    text: {
      en: 'Open to backend, full-stack and systems engineering roles — and to freelance work. I usually answer within 24 hours.',
      fr: 'Ouvert aux postes backend, full-stack et ingénierie systèmes — et aux missions freelance. Je réponds généralement sous 24h.',
    } as L,
    email: 'majdabbassi11@gmail.com',
    github: 'https://github.com/Majdabbassi',
    linkedin: 'https://www.linkedin.com/in/majd-abbassi',
    cv: { en: '/assets/cv-majd-abbassi-en.pdf', fr: '/assets/cv-majd-abbassi-fr.pdf' } as L,
  },
};
