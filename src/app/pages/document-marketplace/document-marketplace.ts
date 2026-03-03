import { Component, inject } from '@angular/core';
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
  techStack: string[];
  companyNote?: string;
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
    wouldRefactor: string[];
  };
}

@Component({
  selector: 'app-document-marketplace',
  standalone: true,
  imports: [FadeInDirective, RouterLink],
  templateUrl: './document-marketplace.html',
  styleUrl: './document-marketplace.css',
})
export class DocumentMarketplaceComponent {
  readonly i18n = inject(I18nService);

  private readonly projectEn: ProjectDetail = {
    id: 'document-marketplace',
    title: 'DocMarket — Digital Document Marketplace',
    summary:
      'Enterprise document marketplace with real-time messaging, wallet logic, and online card payments across web and mobile.',
    status: 'production',
    role: 'Full Stack Engineer',
    techStack: ['Spring Boot', 'Angular', 'Flutter', 'WebSocket', 'PostgreSQL', 'JWT'],
    companyNote:
      'Developed as part of professional role under company ownership. Contribution and architecture summary shown with confidentiality boundaries.',
    context: {
      problem:
        'Buyers and sellers needed a secure platform for digital document transactions with communication, payment, and delivery in one system.',
      constraints: [
        'Real-time buyer-seller communication',
        'Secure online card payments',
        'Wallet balance consistency and transaction traceability',
        'Multi-platform support (web + mobile)',
      ],
      goals: [
        'Build a production-ready document marketplace',
        'Add WebSocket messaging for instant communication',
        'Integrate card payments with wallet workflow',
        'Deliver one backend serving Angular and Flutter clients',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Document Marketplace Architecture',
      bullets: [
        'Spring Boot backend with role-based access control',
        'Angular web app and Flutter mobile app consuming shared APIs',
        'WebSocket channel for real-time messaging',
        'Wallet + payment orchestration with transactional boundaries',
        'WAR-based production deployment without Docker',
      ],
      highlights: [
        {
          title: 'Real-Time Messaging',
          description: 'Instant buyer-seller chat with persistent message history.',
        },
        {
          title: 'Wallet & Payment',
          description: 'Card payment integration tied to wallet credit/debit consistency.',
        },
        {
          title: 'Production Deployment',
          description: 'Live production deployment under company infrastructure constraints.',
        },
      ],
    },
    decisions: [
      {
        title: 'WebSocket over Polling',
        reasoning: 'Marketplace communication requires low-latency bidirectional updates.',
        tradeoffs: 'Added session/reconnection complexity but improved user responsiveness.',
      },
      {
        title: 'Wallet-Integrated Checkout',
        reasoning: 'Combining wallet with payment improved repeat-purchase flow.',
        tradeoffs: 'Increased financial logic complexity and reconciliation requirements.',
      },
    ],
    deployment: {
      isDeployed: true,
      flow: 'Build → WAR package → Application server deploy → Production',
      environment: 'WAR deployment on application server (non-Docker production stack)',
      details: [
        'Backend packaged as WAR for company server standards',
        'Web and mobile clients consume shared backend APIs',
        'Relational DB hosted in production environment',
        'System currently active in real usage context',
      ],
    },
    challenges: [
      {
        challenge: 'Maintaining payment and wallet consistency across failures.',
        solution: 'Transactional boundaries and idempotent payment confirmation handling.',
        outcome: 'Eliminated duplicate-credit and partial-commit payment edge cases.',
      },
      {
        challenge: 'Synchronizing feature parity between web and mobile.',
        solution: 'API-first contract design and strict DTO consistency.',
        outcome: 'Predictable behavior across both clients with reduced regression risk.',
      },
    ],
    impact: {
      improvements: [
        'Unified marketplace flow from discovery to payment and delivery',
        'Faster communication between buyers and sellers',
        'Production-proven architecture in a business context',
      ],
      learnings: [
        'Financial workflows require defensive design and strict consistency',
        'Cross-platform systems benefit heavily from API discipline',
        'Real-time features need robust connection lifecycle handling',
      ],
      wouldRefactor: [
        'Containerize deployment for easier environment parity',
        'Add stronger payment-focused integration test coverage',
        'Introduce richer search and ranking for marketplace discovery',
      ],
    },
  };

  private readonly projectFr: ProjectDetail = {
    id: 'document-marketplace',
    title: 'DocMarket — Marketplace de documents numériques',
    summary:
      'Marketplace de documents d’entreprise avec messagerie temps réel, logique wallet et paiement carte en ligne sur web et mobile.',
    status: 'production',
    role: 'Ingénieur Full Stack',
    techStack: ['Spring Boot', 'Angular', 'Flutter', 'WebSocket', 'PostgreSQL', 'JWT'],
    companyNote:
      'Développé dans un contexte professionnel sous propriété de l’entreprise. Le résumé présenté respecte les limites de confidentialité.',
    context: {
      problem:
        'Acheteurs et vendeurs avaient besoin d’une plateforme sécurisée réunissant transaction, communication et livraison de documents.',
      constraints: [
        'Communication acheteur-vendeur en temps réel',
        'Paiement carte en ligne sécurisé',
        'Cohérence wallet et traçabilité des transactions',
        'Support multi-plateforme (web + mobile)',
      ],
      goals: [
        'Construire une marketplace de documents prête pour la production',
        'Ajouter une messagerie WebSocket instantanée',
        'Intégrer le paiement carte avec workflow wallet',
        'Livrer un backend unique pour Angular et Flutter',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Architecture Document Marketplace',
      bullets: [
        'Backend Spring Boot avec contrôle d’accès par rôles',
        'Client web Angular et client mobile Flutter sur API partagées',
        'Canal WebSocket pour la messagerie en temps réel',
        'Orchestration wallet + paiement avec bornes transactionnelles',
        'Déploiement WAR en production sans Docker',
      ],
      highlights: [
        {
          title: 'Messagerie Temps Réel',
          description: 'Chat acheteur-vendeur instantané avec historique persistant.',
        },
        {
          title: 'Wallet & Paiement',
          description: 'Intégration paiement carte liée à la cohérence crédit/débit du wallet.',
        },
        {
          title: 'Déploiement Production',
          description: 'Déploiement live sous contraintes de l’infrastructure entreprise.',
        },
      ],
    },
    decisions: [
      {
        title: 'WebSocket plutôt que polling',
        reasoning: 'La communication marketplace exige des mises à jour bidirectionnelles à faible latence.',
        tradeoffs: 'Plus de complexité de session/reconnexion, mais meilleure réactivité UX.',
      },
      {
        title: 'Checkout intégré au wallet',
        reasoning: 'Le couplage wallet + paiement a simplifié les achats récurrents.',
        tradeoffs: 'Logique financière plus complexe et exigences de réconciliation accrues.',
      },
    ],
    deployment: {
      isDeployed: true,
      flow: 'Build → Packaging WAR → Déploiement serveur applicatif → Production',
      environment: 'Déploiement WAR sur serveur applicatif (stack de production non Docker)',
      details: [
        'Backend packagé en WAR selon les standards serveur entreprise',
        'Clients web et mobile consommant les mêmes API backend',
        'Base relationnelle hébergée en environnement de production',
        'Système actuellement actif dans un contexte réel',
      ],
    },
    challenges: [
      {
        challenge: 'Maintenir la cohérence wallet/paiement en cas d’échec partiel.',
        solution: 'Bornes transactionnelles et confirmation de paiement idempotente.',
        outcome: 'Suppression des cas limites de double crédit et commit partiel.',
      },
      {
        challenge: 'Conserver la parité fonctionnelle web/mobile.',
        solution: 'Conception API-first et cohérence stricte des DTO.',
        outcome: 'Comportement prévisible sur les deux clients avec moins de régressions.',
      },
    ],
    impact: {
      improvements: [
        'Flux marketplace unifié de la découverte au paiement/livraison',
        'Communication plus rapide entre acheteurs et vendeurs',
        'Architecture validée en production dans un contexte business',
      ],
      learnings: [
        'Les workflows financiers exigent un design défensif et une cohérence stricte',
        'Les systèmes cross-platform gagnent avec une forte discipline API',
        'Le temps réel impose une gestion robuste du cycle de connexion',
      ],
      wouldRefactor: [
        'Conteneuriser le déploiement pour une meilleure parité d’environnement',
        'Renforcer les tests d’intégration orientés paiement',
        'Ajouter recherche/classement avancés pour la découverte marketplace',
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
