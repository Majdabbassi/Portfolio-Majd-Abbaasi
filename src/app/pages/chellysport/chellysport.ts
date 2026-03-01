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
  selector: 'app-chellysport',
  standalone: true,
  imports: [FadeInDirective, RouterLink],
  templateUrl: './chellysport.html',
  styleUrl: './chellysport.css',
})
export class ChellysportComponent {
  project: ProjectDetail = {
    id: 'chellysport',
    title: 'ChellySport — Multi-Sport Club Management',
    summary:
      'End-of-studies internship project managing memberships, scheduling, and facility reservations across multiple sports.',
    status: 'completed',
    role: 'Full Stack Developer (Intern)',
    techStack: ['Spring Boot', 'Angular', 'Flutter', 'MySQL', 'JWT'],
    context: {
      problem:
        'Sports clubs were handling operations manually across disconnected tools, causing scheduling and reservation conflicts.',
      constraints: [
        'Support multiple sports and different scheduling rules',
        'Avoid facility double-booking',
        'Provide web and mobile access',
      ],
      goals: [
        'Centralize club operations in one platform',
        'Improve reservation reliability',
        'Deliver a complete internship-grade product',
      ],
    },
    architecture: {
      diagramPlaceholder: 'ChellySport Architecture',
      bullets: [
        'Layered Spring Boot backend with service-level business logic',
        'Angular dashboard for admins and managers',
        'Flutter app for member-facing usage',
        'MySQL relational model for memberships, sessions, and facilities',
      ],
      highlights: [
        { title: 'Multi-Sport Modeling', description: 'Flexible data model for different sport workflows.' },
        { title: 'Reservation Logic', description: 'Conflict prevention for facility booking flows.' },
      ],
    },
    decisions: [
      {
        title: 'Relational Data Model',
        reasoning: 'Entities were highly relational and consistency-critical.',
        tradeoffs: 'More schema planning upfront for stronger integrity guarantees.',
      },
      {
        title: 'Separate Web/Mobile UX',
        reasoning: 'Admin and member workflows differ significantly by platform.',
        tradeoffs: 'Two client codebases but clearer role-oriented experience.',
      },
    ],
    deployment: {
      isDeployed: false,
      details: [],
      considerations: [
        'Completed functional scope during internship timeline',
        'Ready for standard Spring Boot deployment path',
        'Deployment was out of scope for internship phase',
      ],
    },
    challenges: [
      {
        challenge: 'Designing a reusable model for multiple sport types.',
        solution: 'Core entities plus sport-specific configuration strategy.',
        outcome: 'System handled diverse sport behaviors without structural rewrite.',
      },
    ],
    impact: {
      improvements: [
        'Unified operations for registrations and reservations',
        'Reduced manual process dependency',
        'Delivered first complete full-stack multi-platform system',
      ],
      learnings: [
        'Domain modeling quality strongly affects long-term maintainability',
        'API-first thinking simplifies cross-client development',
      ],
      wouldRefactor: [
        'Add broader automated test coverage',
        'Improve notification/communication flows',
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
