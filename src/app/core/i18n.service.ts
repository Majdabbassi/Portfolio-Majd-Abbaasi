import { Injectable, signal } from '@angular/core';

export type AppLang = 'en' | 'fr';

type TranslationDictionary = Record<string, string>;

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly storageKey = 'portfolio_lang';
  readonly lang = signal<AppLang>('en');

  private readonly dictionaries: Record<AppLang, TranslationDictionary> = {
    en: {
      'nav.projects': 'Projects',
      'nav.infrastructure': 'Infrastructure',
      'nav.philosophy': 'Philosophy',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'nav.workWithMe': 'Work With Me',
      'nav.toggleMenu': 'Toggle menu',
      'nav.lang': 'FR',
      'nav.theme': 'Dark',

      'hero.available': 'Available for opportunities',
      'hero.greeting': "Hi, I'm",
      'hero.titleRole': 'Production-Oriented Full-Stack Engineer',
      'hero.titleTagline': 'FULL STACK ARCHITECTURE • DEVOPS • PRODUCTION SYSTEMS',
      'hero.p1': 'I design and build production-ready systems — from backend architecture and security layers to deployment and monitoring infrastructure.',
      'hero.p2': 'Early in my journey, but deeply committed to engineering systems that are observable, resilient, and built to evolve.',
      'hero.p3': 'I grow fast in environments where responsibility is real and systems matter.',
      'hero.cred1': 'Multi-Tenant Architecture Experience',
      'hero.cred2': 'Dockerized Infrastructure Projects',
      'hero.viewProjects': 'View Projects',
      'hero.contact': 'Contact Me',

      'about.label': 'ABOUT ME',
      'about.title1': 'Engineer. Architect.',
      'about.title2': 'System Builder.',
      'about.howThink': 'How I Think',
      'about.evolution': 'Continuous Evolution',
      'about.intro': 'I’m a systems-oriented engineer focused on building reliable, production-grade software. My work combines backend architecture, DevOps automation, and observability to create systems that scale and remain maintainable over time.',
      'about.think': 'I treat every system as a living organism. This means prioritizing observability before optimization, automation over manual toil, and security as a foundation rather than a patch. I do not just write code; I design for failure, scale, and long-term evolution.',
      'about.growth': 'Deployment is just the beginning. I constantly analyze bottlenecks, refine pipelines, and iterate based on real-world metrics. I’m driven by building things that outlive trends — systems designed to endure change.',
      'about.card1': 'Engineering Mindset',
      'about.card2': 'Technical Expertise',
      'about.card3': 'How I Build',
      'about.card4': 'Monitoring & Ops',

      'projects.label': 'Selected Systems',
      'projects.title': 'Production-grade builds and evolving architectures',
      'projects.subtitle': 'Designed with ownership and long-term scalability in mind.',
      'projects.viewCase': 'View Case Study',
      'projects.viewArch': 'View Architecture',
      'projects.lab.title': 'Deployment Lab',
      'projects.lab.subtitle': 'Self-driven infrastructure training initiative.',
      'projects.lab.desc': 'To deeply understand production behavior, I repeatedly deployed a simplified application using multiple strategies — refining server setup, configuration logic, and release flows.',
      'projects.lab.handsOn': 'Hands-on experimentation included:',
      'projects.lab.footer': 'Not a product — an engineering lab for mastering deployment from the ground up.',

      'infra.label': '— Infrastructure & Production Engineering',
      'infra.title': 'Lifecycle Ownership',
      'infra.subtitle': 'From local development to monitored production systems. I treat deployment as part of engineering — not an afterthought.',
      'infra.workflow': 'Deployment Workflow',
      'infra.workflowLead': 'Structured flow from development to live environment:',
      'infra.workflowTail': 'Each stage tested repeatedly to ensure predictable releases and recoverability.',
      'infra.principles': 'Infrastructure Principles',
      'infra.principlesTail': 'Focused on reliability and clarity over complexity.',
      'infra.observability': 'Observability Stack',
      'infra.observabilityLead': 'Operational visibility implemented across systems:',
      'infra.observabilityTail': 'Answering: "What happens after deployment?"',

      'philo.label': '05 — Philosophy',
      'philo.title': 'Engineering Philosophy',
      'philo.subtitle': 'The standards that guide how I design and operate systems.',

      'contact.label': '06 — Work With Me',
      'contact.title': "Let's Engineer Your Next System",
      'contact.p1': 'I’m currently open to backend, full-stack, and systems engineering opportunities.',
      'contact.p2': 'If you are building something that needs to scale, automate, or operate reliably in production — let’s talk.',
      'contact.footer': 'I usually respond within 24 hours. For time-sensitive matters, email is the fastest way to reach me.',

      'footer.tag': 'AI-Augmented System Engineer',
      'footer.built': 'Built with Angular & Tailwind CSS.',
      'footer.top': 'Scroll to top',

      'status.production': 'Production',
      'status.completed': 'Completed',
      'status.in-development': 'In Development',
    },
    fr: {
      'nav.projects': 'Projets',
      'nav.infrastructure': 'Infrastructure',
      'nav.philosophy': 'Philosophie',
      'nav.about': 'À propos',
      'nav.contact': 'Contact',
      'nav.workWithMe': 'Collaborer',
      'nav.toggleMenu': 'Ouvrir le menu',
      'nav.lang': 'EN',
      'nav.theme': 'Clair',

      'hero.available': 'Disponible pour des opportunités',
      'hero.greeting': 'Salut, je suis',
      'hero.titleRole': 'Ingénieur Full-Stack orienté production',
      'hero.titleTagline': 'ARCHITECTURE FULL STACK • DEVOPS • SYSTÈMES DE PRODUCTION',
      'hero.p1': 'Je conçois et développe des systèmes prêts pour la production — de l’architecture backend et la sécurité jusqu’au déploiement et à l’observabilité.',
      'hero.p2': 'Je suis au début de mon parcours, mais pleinement engagé à construire des systèmes observables, résilients et évolutifs.',
      'hero.p3': 'Je progresse vite dans les environnements où la responsabilité est réelle et où les systèmes comptent.',
      'hero.cred1': 'Expérience en architecture multi-tenant',
      'hero.cred2': 'Projets d’infrastructure conteneurisée',
      'hero.viewProjects': 'Voir les projets',
      'hero.contact': 'Me contacter',

      'about.label': 'À PROPOS',
      'about.title1': 'Ingénieur. Architecte.',
      'about.title2': 'Bâtisseur de systèmes.',
      'about.howThink': 'Ma façon de penser',
      'about.evolution': 'Évolution continue',
      'about.intro': 'Je suis un ingénieur orienté systèmes, focalisé sur des logiciels fiables et prêts pour la production. Mon travail combine architecture backend, automatisation DevOps et observabilité pour créer des systèmes scalables et maintenables dans le temps.',
      'about.think': 'Je considère chaque système comme un organisme vivant. Je privilégie l’observabilité avant l’optimisation, l’automatisation avant les tâches manuelles, et la sécurité comme fondation. Je ne fais pas que coder : je conçois pour l’échec, l’échelle et l’évolution long terme.',
      'about.growth': 'Le déploiement n’est que le début. J’analyse les goulots d’étranglement, j’améliore les pipelines et j’itère selon les métriques réelles. Je construis des systèmes qui résistent au changement.',
      'about.card1': 'Mentalité ingénierie',
      'about.card2': 'Expertise technique',
      'about.card3': 'Ma méthode',
      'about.card4': 'Monitoring & Ops',

      'projects.label': 'Systèmes sélectionnés',
      'projects.title': 'Projets orientés production et architectures évolutives',
      'projects.subtitle': 'Conçus avec ownership et scalabilité long terme.',
      'projects.viewCase': 'Voir l’étude de cas',
      'projects.viewArch': 'Voir l’architecture',
      'projects.lab.title': 'Laboratoire de déploiement',
      'projects.lab.subtitle': 'Initiative d’auto-formation infrastructure.',
      'projects.lab.desc': 'Pour comprendre en profondeur le comportement en production, j’ai redéployé une application simplifiée via plusieurs stratégies — en affinant la configuration serveur, la logique de configuration et les flux de release.',
      'projects.lab.handsOn': 'Expérimentations pratiques :',
      'projects.lab.footer': 'Ce n’est pas un produit — c’est un laboratoire d’ingénierie pour maîtriser le déploiement de bout en bout.',

      'infra.label': '— Infrastructure & ingénierie de production',
      'infra.title': 'Responsabilité du cycle de vie',
      'infra.subtitle': 'Du développement local aux systèmes monitorés en production. Je traite le déploiement comme une partie intégrante de l’ingénierie.',
      'infra.workflow': 'Workflow de déploiement',
      'infra.workflowLead': 'Flux structuré du développement vers la production :',
      'infra.workflowTail': 'Chaque étape est testée pour garantir des releases prévisibles et une bonne récupérabilité.',
      'infra.principles': 'Principes d’infrastructure',
      'infra.principlesTail': 'Priorité à la fiabilité et à la clarté.',
      'infra.observability': 'Stack d’observabilité',
      'infra.observabilityLead': 'Visibilité opérationnelle mise en place sur les systèmes :',
      'infra.observabilityTail': 'Question clé : « Que se passe-t-il après le déploiement ? »',

      'philo.label': '05 — Philosophie',
      'philo.title': 'Philosophie d’ingénierie',
      'philo.subtitle': 'Les standards qui guident ma manière de concevoir et d’exploiter les systèmes.',

      'contact.label': '06 — Collaborer',
      'contact.title': 'Concevons votre prochain système',
      'contact.p1': 'Je suis actuellement ouvert aux opportunités backend, full-stack et ingénierie systèmes.',
      'contact.p2': 'Si vous construisez quelque chose qui doit scaler, s’automatiser ou être fiable en production — parlons-en.',
      'contact.footer': 'Je réponds généralement sous 24h. Pour les demandes urgentes, l’email est le plus rapide.',

      'footer.tag': 'Ingénieur système augmenté par l’IA',
      'footer.built': 'Construit avec Angular & Tailwind CSS.',
      'footer.top': 'Revenir en haut',

      'status.production': 'Production',
      'status.completed': 'Terminé',
      'status.in-development': 'En développement',
    },
  };

  constructor() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored === 'en' || stored === 'fr') {
      this.lang.set(stored);
    }
    this.applyLang();
  }

  setLang(lang: AppLang): void {
    this.lang.set(lang);
    localStorage.setItem(this.storageKey, lang);
    this.applyLang();
  }

  toggleLang(): void {
    this.setLang(this.lang() === 'en' ? 'fr' : 'en');
  }

  t(key: string): string {
    return this.dictionaries[this.lang()][key] ?? this.dictionaries.en[key] ?? key;
  }

  private applyLang(): void {
    document.documentElement.lang = this.lang();
  }
}
