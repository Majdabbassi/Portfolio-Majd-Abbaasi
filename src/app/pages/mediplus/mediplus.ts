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
    liveUrl?: string;
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
  selector: 'app-mediplus',
  standalone: true,
  imports: [FadeInDirective, RouterLink],
  templateUrl: './mediplus.html',
  styleUrl: './mediplus.css',
})
export class MediplusComponent implements OnInit {
  readonly i18n = inject(I18nService);
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
  private readonly projectEn: ProjectDetail = {
    id: 'mediplus',
    title: 'MediPlus — Healthcare Platform',
    summary:
      'Multi-component healthcare platform combining a role-based Angular backoffice (user management, doctor verification, medicine catalog, billing, support tickets) with a Spring Boot backend and a patient-facing React Native mobile app.',
    status: 'completed',
    role: 'Full Stack Engineer',
    roleContext: 'Full Stack Engineer (Backend & Web Backoffice)',
    techStack: ['Java 21', 'Spring Boot', 'Angular 20', 'Angular Material', 'React Native (Expo)', 'MySQL', 'JWT', 'Firebase'],
    metrics: {
      team: 'Full Stack Engineer (primary)',
      duration: 'Multi-phase delivery across backend, web backoffice and mobile',
      scale: 'Three interconnected products: admin backoffice, backend API, patient mobile app',
      keyOutcomes: [
        'Role-based access control across SUPER_ADMIN, ADMIN and AGENT_SUPPORT tiers',
        'JWT authentication with token refresh and automated token attachment',
        'Doctor verification and medicine catalog workflows in the backoffice',
        'Patient mobile app (Expo) with Firebase push messaging',
        'Analytics dashboards with exportable reports',
      ],
    },
    context: {
      problem:
        'Healthcare organizations need to manage users, doctors, medicines, billing and support across web and mobile, with each operator tier seeing only what its role allows.',
      constraints: [
        'Multiple operator tiers (SUPER_ADMIN, ADMIN, AGENT_SUPPORT) with distinct permissions',
        'Secure JWT-based authentication with token refresh for long backoffice sessions',
        'Dual-client delivery: role-based admin dashboard and a patient-facing mobile app',
        'Operational oversight through analytics and exportable KPI reports',
      ],
      goals: [
        'Implement role-based access control across all admin tiers with protected routes',
        'Secure a full JWT lifecycle with refresh tokens and an auto-attach interceptor',
        'Build a patient mobile app with Firebase push messaging and password-recovery flows',
        'Deliver analytics dashboards (ngx-charts, chart.js) with xlsx export',
      ],
    },
    architecture: {
      diagramPlaceholder: 'MediPlus Platform Architecture',
      bullets: [
        'Spring Boot backend (Java 21) with Spring Security, Spring Data JPA and JWT',
        'Angular 20 role-based backoffice built with Angular Material',
        'RBAC tiers — SUPER_ADMIN, ADMIN, AGENT_SUPPORT — enforced via protected routes',
        'Patient mobile app built with React Native (Expo) and Firebase push messaging',
        'Analytics/KPI dashboards using ngx-charts and chart.js with xlsx exports',
        'REST API shared between the backoffice and the mobile client',
      ],
      highlights: [
        {
          title: 'Role-Based Access Control',
          description: 'Permission model spanning SUPER_ADMIN, ADMIN and AGENT_SUPPORT with route-level protection in the backoffice.',
        },
        {
          title: 'Secure Session Lifecycle',
          description: 'JWT authentication with token refresh and an interceptor that auto-attaches credentials to every request.',
        },
        {
          title: 'Three-Client Ecosystem',
          description: 'Backoffice, backend and patient app sharing one REST contract for consistent data flow.',
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
        title: 'Angular Material for the Admin Backoffice',
        reasoning:
          'A role-based dashboard is dense with tables, forms and dialogs; Angular Material provided consistent, accessible building blocks quickly.',
        tradeoffs:
          'A uniform Material look rather than fully bespoke styling, appropriate for an internal operations tool.',
      },
      {
        title: 'Expo for the Patient Mobile App',
        reasoning:
          'Delivering iOS and Android from a single React Native (Expo) codebase kept the patient app fast to build and easy to maintain.',
        tradeoffs:
          'Slight trade-offs in native control compared to fully native development, accepted for faster delivery.',
      },
    ],
    deployment: {
      isDeployed: false,
      details: [],
      considerations: [
        'Backend (Spring Boot / Java 21) ready to ship as a packaged Java application with MySQL as the primary store',
        'Angular backoffice built for static hosting behind a secure gateway',
        'Patient app deliverable through Expo (React Native) build pipelines',
        'Secrets and JWT keys managed via environment configuration rather than source code',
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
        challenge: 'Synchronizing data between the Angular backoffice and the patient mobile app.',
        solution:
          'Defined a single REST contract and shared DTOs consumed by both clients against the Spring Boot API.',
        outcome: 'Clean integration where both products read the same backend state without divergent logic.',
      },
    ],
    impact: {
      improvements: [
        'A platform covering administration, medical verification and patient services on one data model',
        'Clear role separation enabling internal teams to operate within scoped permissions',
        'Analytics and exports turning operational data into reviewable reports',
      ],
      learnings: [
        'RBAC is only as strong as the convention between frontend guards and backend checks',
        'Multi-client projects benefit from defining the API contract before building screens',
        'Company delivery means balancing scope across three codebases while keeping each one maintainable',
      ],
    },
  };

  private readonly projectFr: ProjectDetail = {
    id: 'mediplus',
    title: 'MediPlus — Plateforme Santé',
    summary:
      'Plateforme santé multi-composants combinant un backoffice Angular à gestion par rôles (gestion des utilisateurs, vérification des médecins, catalogue de médicaments, facturation, tickets de support) avec un backend Spring Boot et une application mobile patient en React Native.',
    status: 'completed',
    role: 'Ingénieur Full Stack',
    roleContext: 'Ingénieur Full Stack (Backend & Backoffice Web)',
    techStack: ['Java 21', 'Spring Boot', 'Angular 20', 'Angular Material', 'React Native (Expo)', 'MySQL', 'JWT', 'Firebase'],
    metrics: {
      team: 'Ingénieur Full Stack (principal)',
      duration: 'Livraison multi-phases : backend, backoffice web et mobile',
      scale: 'Trois produits interconnectés : backoffice d’administration, API backend, application mobile patient',
      keyOutcomes: [
        'Contrôle d’accès basé sur les rôles SUPER_ADMIN, ADMIN et AGENT_SUPPORT',
        'Authentification JWT avec renouvellement du token et rattachement automatique',
        'Workflows de vérification des médecins et de catalogue de médicaments dans le backoffice',
        'Application mobile patient (Expo) avec messagerie push Firebase',
        'Tableaux de bord analytiques avec rapports exportables',
      ],
    },
    context: {
      problem:
        'Les organisations de santé doivent gérer utilisateurs, médecins, médicaments, facturation et support sur le web et le mobile, chaque niveau d’opérateur ne voyant que ce que son rôle autorise.',
      constraints: [
        'Plusieurs niveaux d’opérateurs (SUPER_ADMIN, ADMIN, AGENT_SUPPORT) avec des permissions distinctes',
        'Authentification sécurisée JWT avec renouvellement du token pour les longues sessions du backoffice',
        'Livraison à deux clients : tableau de bord d’administration par rôles et application mobile patient',
        'Supervision opérationnelle via des statistiques et des rapports KPI exportables',
      ],
      goals: [
        'Implémenter le contrôle d’accès basé sur les rôles à tous les niveaux avec des routes protégées',
        'Sécuriser le cycle de vie complet du JWT avec tokens de rafraîchissement et interceptor auto-attaché',
        'Construire une application mobile patient avec messagerie push Firebase et récupération de mot de passe',
        'Livrer des tableaux de bord analytiques (ngx-charts, chart.js) avec export xlsx',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Architecture de la Plateforme MediPlus',
      bullets: [
        'Backend Spring Boot (Java 21) avec Spring Security, Spring Data JPA et JWT',
        'Backoffice Angular 20 à gestion par rôles construit avec Angular Material',
        'Niveaux RBAC — SUPER_ADMIN, ADMIN, AGENT_SUPPORT — appliqués via des routes protégées',
        'Application mobile patient en React Native (Expo) avec messagerie push Firebase',
        'Tableaux de bord analytiques/KPI avec ngx-charts et chart.js et exports xlsx',
        'API REST partagée entre le backoffice et le client mobile',
      ],
      highlights: [
        {
          title: 'Contrôle d’Accès Basé sur les Rôles',
          description: 'Modèle de permissions couvrant SUPER_ADMIN, ADMIN et AGENT_SUPPORT avec protection au niveau des routes.',
        },
        {
          title: 'Cycle de Session Sécurisé',
          description: 'Authentification JWT avec renouvellement du token et un interceptor qui rattache automatiquement les identifiants à chaque requête.',
        },
        {
          title: 'Écosystème à Trois Clients',
          description: 'Backoffice, backend et application patient partageant un contrat REST unique pour un flux de données cohérent.',
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
        title: 'Angular Material pour le Backoffice',
        reasoning:
          'Un tableau de bord par rôles est dense en tableaux, formulaires et dialogues ; Angular Material a fourni des composants cohérents et accessibles rapidement.',
        tradeoffs:
          'Une apparence Material uniforme au lieu d’un style totalement sur-mesure, adaptée à un outil de gestion interne.',
      },
      {
        title: 'Expo pour l’Application Mobile Patient',
        reasoning:
          'Livrer iOS et Android depuis une seule base React Native (Expo) a rendu l’application patient rapide à construire et facile à maintenir.',
        tradeoffs:
          'Légers compromis sur le contrôle natif par rapport à un développement 100% natif, acceptés pour une livraison plus rapide.',
      },
    ],
    deployment: {
      isDeployed: false,
      details: [],
      considerations: [
        'Backend (Spring Boot / Java 21) prêt à être livré comme application Java packagée avec MySQL comme stockage principal',
        'Backoffice Angular construit pour un hébergement statique derrière une passerelle sécurisée',
        'Application patient livrable via les pipelines de build Expo (React Native)',
        'Secrets et clés JWT gérés via la configuration d’environnement plutôt que le code source',
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
        challenge: 'Synchroniser les données entre le backoffice Angular et l’application mobile patient.',
        solution:
          'Définition d’un contrat REST unique et de DTO partagés consommés par les deux clients contre l’API Spring Boot.',
        outcome: 'Intégration propre où les deux produits lisent le même état backend sans logique divergente.',
      },
    ],
    impact: {
      improvements: [
        'Une plateforme couvrant l’administration, la vérification médicale et les services patient sur un même modèle de données',
        'Séparation claire des rôles permettant aux équipes internes d’opérer dans un périmètre de permissions défini',
        'Statistiques et exports transformant les données opérationnelles en rapports exploitables',
      ],
      learnings: [
        'Le RBAC n’est aussi solide que la convention entre les gardes du frontend et les vérifications du backend',
        'Les projets multi-clients bénéficient de la définition du contrat API avant la construction des écrans',
        'La livraison en entreprise consiste à équilibrer le périmètre sur trois codebases tout en gardant chacune maintenable',
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