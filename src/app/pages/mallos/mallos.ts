import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { I18nService } from '../../core/i18n.service';

type ProjectStatus = 'production' | 'completed' | 'in-development';

interface ProjectDetail {
  id: string;
  title: string;
  summary: string;
  status: ProjectStatus;
  role: string;
  roleContext: string;
  techStack: string[];
  metrics: {
    team: string;
    duration: string;
    scale: string;
    keyOutcomes: string[];
  };
  context: {
    problem: string;
    constraints: string[];
    goals: string[];
  };
  architecture: {
    diagramPlaceholder: string;
    bullets: string[];
    highlights: { title: string; description: string }[];
  };
  decisions: {
    title: string;
    reasoning: string;
    tradeoffs: string;
  }[];
  deployment: {
    isDeployed: boolean;
    flow?: string;
    environment?: string;
    details: string[];
    considerations?: string[];
  };
  challenges: {
    challenge: string;
    solution: string;
    outcome: string;
  }[];
  impact: {
    improvements: string[];
    learnings: string[];
  };
}

@Component({
  selector: 'app-mallos',
  standalone: true,
  imports: [FadeInDirective, RouterLink],
  templateUrl: './mallos.html',
  styleUrl: './mallos.css',
})
export class MallosComponent implements OnInit {
  readonly i18n = inject(I18nService);
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
  private readonly projectEn: ProjectDetail = {
    id: 'mallos',
    title: 'Mall OS — B2B Mall Management Platform (MVP)',
    summary:
      'An in-development B2B mall management MVP for the MENA market — a focused slice of a full mall-operations platform, emphasizing frontend architecture and design decisions: role-based routing with guards, a PrimeNG design system, an interactive floor-map trace editor, and reusable skeleton/stats components backed by behavioral state (RxJS).',
    status: 'in-development',
    role: 'Full-Stack Developer',
    roleContext: 'Full-Stack Developer (UI Architecture)',
    techStack: ['Spring Boot', 'Angular', 'PrimeNG', 'MySQL', 'OpenAPI', 'Actuator'],
    metrics: {
      team: 'Full-Stack Developer (UI architecture focus)',
      duration: 'In development',
      scale: 'MVP — a focused slice of full mall operations',
      keyOutcomes: [
        'Role-based routing with guards scoping Super Admin and Mall Manager areas',
        'Reusable PrimeNG design system with shared skeleton and stats components',
        'Interactive floor-map trace editor for store layout definition',
      ],
    },
    context: {
      problem:
        'Mall operators in the MENA market needed a centralized way to manage properties, tenants, users, and floor layouts — but the full scope of mall operations is huge, so the goal was to validate the core experience with a focused MVP before scaling.',
      constraints: [
        'Cover an honest MVP first: malls, users, stores, and floor-plan layouts',
        'Enforce clean separation between Super Admin and Mall Manager capabilities',
        'Keep the backend local-first (MySQL on localhost) while the frontend prototypes on demo data',
      ],
      goals: [
        'Validate the architecture and UX for mall management before committing to production scope',
        'Establish a cohesive PrimeNG/SCSS design system with reusable building blocks',
        'Prototype a floor-map trace editor that captures store layout in a visual, drag-free way',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Mall OS MVP Architecture',
      bullets: [
        'Role-based Angular areas: Super Admin (malls, users, platform stats) and Mall Manager (stores, assistants, permissions, floor).',
        'Lazy-loaded routes protected by auth, admin, and manager guards with RxJS BehaviorSubject state.',
        'Spring Boot backend exposing REST APIs with Spring Data JPA + Hibernate and MySQL behind it.',
        'OpenAPI/Swagger UI for API documentation and Spring Boot Actuator for health introspection.',
      ],
      highlights: [
        { title: 'Design System', description: 'A token-driven PrimeNG + SCSS layer with animated gradients and shared skeleton/stats/empty-state components.' },
        { title: 'Floor-Map Trace Editor', description: 'A visual store-layout tool that lets managers outline store footprints on a floor plan.' },
      ],
    },
    decisions: [
      {
        title: 'Role-Based Routing with Guards',
        reasoning: 'Keeps Super Admin and Mall Manager capabilities separate at the navigation and access level, so each role only sees what it manages.',
        tradeoffs: 'Guard and route duplication as the role model grows; the two-role model will need revisiting as permissions become finer-grained.',
      },
      {
        title: 'PrimeNG + SCSS Tokens as the Design System',
        reasoning: 'Establishes a consistent, themeable UI quickly instead of hand-building every component, which fits the fast MVP iteration.',
        tradeoffs: 'Locks the look into PrimeNG conventions; deep custom theming takes work beyond the default tokens.',
      },
      {
        title: 'Demo Data + Real API Boundary',
        reasoning: 'The frontend ships with hardcoded demo data for immediate development and testing, while the Spring Boot backend provides real APIs connected to local MySQL.',
        tradeoffs: 'Demo data can diverge from real API shapes; the seam between them needs explicit mapping before going to production.',
      },
    ],
    deployment: {
      isDeployed: false,
      details: [],
      considerations: [
        'Frontend currently runs on hardcoded demo data for development and testing, while the backend exposes real APIs against local-only MySQL (localhost:3306)',
        'Full mall operations would require much more scope than this MVP — real tenants, leases, invoicing, and multi-mall concurrency are future work',
        'Backend APIs are local-only today; production would need managed MySQL, containerization, and hardened auth beyond basic swagger credentials',
      ],
    },
    challenges: [
      {
        challenge: 'Defining clear boundaries between what Super Admin and Mall Manager can do without overbuilding the MVP.',
        solution: 'Scoped capabilities through lazy-loaded routes and role guards so each area only gains what the corresponding role manages.',
        outcome: 'A clean two-role model that demonstrates the architecture intent without pretending to cover every permission.',
      },
      {
        challenge: 'Building a floor-plan layout tool that is visual and approachable for managers without a heavy canvas dependency.',
        solution: 'Designed a trace editor that lets managers outline store footprints on the floor plan directly.',
        outcome: 'A functional MVP proof-of-concept for layout definition that validates the interaction before investing in more elaborate tooling.',
      },
    ],
    impact: {
      improvements: [
        'Delivered a working end-to-end MVP slice: Angular role-based UI, Spring Boot APIs, and MySQL schema via Hibernate',
        'Built a reusable design foundation (skeleton, stats, empty-state, status-badge components) that accelerates future features',
        'Validated the architecture direction for a full mall-operations platform with clear next steps',
      ],
      learnings: [
        'An MVP is a negotiation of scope — it is more valuable to fully close a focused slice than to sketch a broad one',
        'A shared design system pays off early when many similar list/detail screens must be built quickly',
        'Keeping the frontend decoupled from data (via behavioral state and services) makes it easy to swap demo data for real APIs later',
      ],
    },
  };

  private readonly projectFr: ProjectDetail = {
    id: 'mallos',
    title: 'Mall OS — Plateforme B2B de Gestion de Centres Commerciaux (MVP)',
    summary:
      'Un MVP B2B en développement pour la gestion de centres commerciaux sur le marché MENA — une tranche ciblée d’une plateforme complète, mettant l’accent sur l’architecture frontend et les choix de design : routage par rôles avec guards, design system PrimeNG, éditeur de tracé de plan d’étage, et composants skeleton/stats réutilisables adossés à un état comportemental (RxJS).',
    status: 'in-development',
    role: 'Développeur Full-Stack',
    roleContext: 'Développeur Full-Stack (Architecture UI)',
    techStack: ['Spring Boot', 'Angular', 'PrimeNG', 'MySQL', 'OpenAPI', 'Actuator'],
    metrics: {
      team: 'Développeur Full-Stack (focus architecture UI)',
      duration: 'En développement',
      scale: 'MVP — une tranche ciblée des opérations complètes',
      keyOutcomes: [
        'Routage par rôles avec guards séparant les espaces Super Admin et Mall Manager',
        'Design system PrimeNG réutilisable avec composants skeleton et stats partagés',
        'Éditeur de tracé de plan d’étage pour la définition des agencements de boutiques',
      ],
    },
    context: {
      problem:
        'Les opérateurs de centres commerciaux du marché MENA avaient besoin d’un outil centralisé pour gérer propriétés, locataires, utilisateurs et plans d’étage — mais le périmètre complet est énorme, l’objectif étant de valider l’expérience cœur avec un MVP ciblé avant de généraliser.',
      constraints: [
        'Couvrir un MVP honnête : centres, utilisateurs, boutiques et plans d’étage',
        'Garantir une séparation claire entre les capacités Super Admin et Mall Manager',
        'Garder le backend local (MySQL sur localhost) pendant que le frontend prototypise sur données de démo',
      ],
      goals: [
        'Valider l’architecture et l’UX de gestion de centre avant de s’engager sur le périmètre de production',
        'Établir un design system PrimeNG/SCSS cohérent avec des briques réutilisables',
        'Prototyper un éditeur de tracé de plan d’étage qui capture l’agencement visuellement',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Architecture MVP Mall OS',
      bullets: [
        'Espaces Angular par rôles : Super Admin (centres, utilisateurs, stats) et Mall Manager (boutiques, assistants, permissions, plan).',
        'Routes lazy-loadées protégées par guards auth, admin et manager avec état RxJS BehaviorSubject.',
        'Backend Spring Boot exposant des APIs REST avec Spring Data JPA + Hibernate et MySQL en dessous.',
        'OpenAPI/Swagger UI pour la documentation des APIs et Spring Boot Actuator pour l’introspection de santé.',
      ],
      highlights: [
        { title: 'Design System', description: 'Une couche PrimeNG + SCSS pilotée par tokens avec dégradés animés et composants skeleton/stats/empty-state partagés.' },
        { title: 'Éditeur de Tracé de Plan', description: 'Un outil visuel qui permet aux managers de dessiner l’empreinte des boutiques sur le plan d’étage.' },
      ],
    },
    decisions: [
      {
        title: 'Routage par Rôles avec Guards',
        reasoning: 'Sépare les capacités Super Admin et Mall Manager au niveau navigation/accès, chaque rôle ne voyant que ce qu’il gère.',
        tradeoffs: 'Duplication des guards et routes à mesure que le modèle de rôles grandit ; à réviser pour des permissions plus fines.',
      },
      {
        title: 'PrimeNG + Tokens SCSS comme Design System',
        reasoning: 'Établit une UI cohérente et thémable rapidement au lieu de construire chaque composant à la main, idéal pour itérer vite.',
        tradeoffs: 'Verrouille le style sur les conventions PrimeNG ; le theming avancé demande du travail au-delà des tokens par défaut.',
      },
      {
        title: 'Données de Démo + Frontière API Réelle',
        reasoning: 'Le frontend embarque des données de démo codées en dur pour le dev et les tests, tandis que le backend Spring Boot fournit de vraies APIs reliées à MySQL local.',
        tradeoffs: 'La démo peut diverger des formes réelles des APIs ; le mappage entre les deux doit être explicite avant la production.',
      },
    ],
    deployment: {
      isDeployed: false,
      details: [],
      considerations: [
        'Le frontend s’exécute actuellement sur des données de démo codées en dur, tandis que le backend expose des APIs réelles sur un MySQL local uniquement (localhost:3306)',
        'Les opérations complètes exigeraient bien plus que ce MVP — locataires réels, baux, facturation et concurrence multi-centres sont des travaux futurs',
        'Les APIs backend sont locales aujourd’hui ; la production nécessiterait un MySQL managé, la conteneurisation et une sécurité renforcée au-delà des identifiants swagger de base',
      ],
    },
    challenges: [
      {
        challenge: 'Définir des limites claires entre ce que peuvent faire Super Admin et Mall Manager sans surconstruire le MVP.',
        solution: 'Capacités découpées via routes lazy-loadées et guards de rôles, chaque espace ne gagnant que ce dont son rôle a besoin.',
        outcome: 'Un modèle à deux rôles propre qui montre l’intention d’architecture sans prétendre couvrir toutes les permissions.',
      },
      {
        challenge: 'Construire un outil de plan d’étage visuel et accessible pour les managers sans dépendance canvas lourde.',
        solution: 'Conception d’un éditeur de tracé permettant de dessiner l’empreinte des boutiques directement sur le plan.',
        outcome: 'Une preuve de concept MVP fonctionnelle qui valide l’interaction avant d’investir dans des outils plus élaborés.',
      },
    ],
    impact: {
      improvements: [
        'Livraison d’une tranche MVP bout-en-bout : UI Angular par rôles, APIs Spring Boot et schéma MySQL via Hibernate',
        'Construction d’une base design réutilisable (composants skeleton, stats, empty-state, status-badge) accélérant les futures fonctionnalités',
        'Validation de la direction d’architecture pour une plateforme complète avec des prochaines étapes claires',
      ],
      learnings: [
        'Un MVP est une négociation de périmètre — mieux vaut clore entièrement une tranche ciblée que d’esquisser une tranche large',
        'Un design system partagé paie vite quand de nombreux écrans liste/détail similaires doivent être construits rapidement',
        'Découpler le frontend des données (via l’état comportemental et les services) facilite le remplacement de la démo par de vraies APIs',
      ],
    },
  };

  get project(): ProjectDetail {
    return this.i18n.lang() === 'fr' ? this.projectFr : this.projectEn;
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'production':
        return this.i18n.t('status.production');
      case 'completed':
        return this.i18n.t('status.completed');
      case 'in-development':
        return this.i18n.t('status.in-development');
      default:
        return this.i18n.t('detail.project');
    }
  }
}
