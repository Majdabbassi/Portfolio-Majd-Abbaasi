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
  selector: 'app-car-rental',
  standalone: true,
  imports: [FadeInDirective, RouterLink],
  templateUrl: './car-rental.html',
  styleUrl: './car-rental.css',
})
export class CarRentalComponent {
  project: ProjectDetail = {
    id: 'car-rental',
    title: 'AutoRent — Vehicle Rental Management',
    summary:
      'In-development vehicle rental platform focused on booking lifecycle, fleet visibility, and conflict-free availability handling.',
    status: 'in-development',
    role: 'Full Stack Engineer',
    techStack: ['Spring Boot', 'Angular', 'PostgreSQL', 'JWT'],
    context: {
      problem:
        'Manual rental workflows cause booking overlaps, weak fleet visibility, and operational delays.',
      constraints: [
        'Prevent overlapping bookings at data level',
        'Track fleet availability and maintenance states',
        'Maintain clean architecture while scope evolves',
      ],
      goals: [
        'Build robust booking workflow end-to-end',
        'Keep architecture modular for iterative expansion',
        'Prepare for deployment-ready infrastructure choices early',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Car Rental Architecture',
      bullets: [
        'Service-layer orchestration for booking and fleet operations',
        'Date-range availability logic with relational consistency',
        'Admin and customer flows in one cohesive SPA',
      ],
      highlights: [
        { title: 'Booking Integrity', description: 'Conflict prevention at business and data layers.' },
        { title: 'Iterative Design', description: 'Architecture evolving from production lessons learned.' },
      ],
    },
    decisions: [
      {
        title: 'PostgreSQL for Booking Constraints',
        reasoning: 'Strong relational control simplifies integrity enforcement.',
        tradeoffs: 'More explicit schema design work for robust consistency.',
      },
    ],
    deployment: {
      isDeployed: false,
      details: [],
      considerations: [
        'Project currently in active development phase',
        'Deployment planned after core domain completion',
        'Architecture is being prepared for containerized rollout',
      ],
    },
    challenges: [
      {
        challenge: 'Balancing flexible pricing logic with maintainable code paths.',
        solution: 'Rule-driven pricing strategy design under modular service boundaries.',
        outcome: 'In progress with focus on extensibility and predictability.',
      },
    ],
    impact: {
      improvements: [
        'Sharper architecture decisions from prior production experience',
        'Cleaner module boundaries compared to earlier projects',
      ],
      learnings: [
        'Complex business rules benefit from early domain partitioning',
        'Operational concerns should influence architecture from day one',
      ],
      wouldRefactor: [
        'Add advanced reporting and operational analytics',
        'Introduce stronger event-driven notifications',
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
