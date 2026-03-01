import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FadeInDirective } from '../../directives/fade-in.directive';

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
  project: ProjectDetail = {
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

  getStatusLabel(status: string): string {
    switch (status) {
      case 'production':
        return 'Production';
      case 'completed':
        return 'Completed';
      case 'in-development':
        return 'In Development';
      default:
        return 'Project';
    }
  }
}
