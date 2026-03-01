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
  selector: 'app-delivery-tracking',
  standalone: true,
  imports: [FadeInDirective, RouterLink],
  templateUrl: './delivery-tracking.html',
  styleUrl: './delivery-tracking.css',
})
export class DeliveryTrackingComponent {
  project: ProjectDetail = {
    id: 'delivery-tracking',
    title: 'SwiftDeliver — Delivery Management & Tracking',
    summary:
      'In-progress delivery operations platform with personnel tracking, order lifecycle control, and dispatch visibility.',
    status: 'in-development',
    role: 'Full Stack Engineer',
    techStack: ['Spring Boot', 'Angular', 'PostgreSQL', 'PostGIS', 'JWT'],
    context: {
      problem:
        'Delivery operations lacked centralized live visibility into courier status and active order execution.',
      constraints: [
        'Track delivery status changes reliably',
        'Support progressive move toward real-time updates',
        'Model dispatch lifecycle clearly',
      ],
      goals: [
        'Create centralized dispatch and tracking foundation',
        'Expose actionable operational visibility for managers',
        'Design extensible architecture for future real-time features',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Delivery Tracking Architecture',
      bullets: [
        'Spring Boot API for order and dispatcher workflows',
        'Angular operational dashboard for live state monitoring',
        'PostgreSQL + PostGIS for location-aware data handling',
      ],
      highlights: [
        { title: 'Tracking Layer', description: 'Structured delivery state progression and status visibility.' },
        { title: 'Geospatial Foundation', description: 'Prepared for advanced location-based logic.' },
      ],
    },
    decisions: [
      {
        title: 'REST-first then Real-Time Evolution',
        reasoning: 'Stabilize core workflow before streaming complexity.',
        tradeoffs: 'Slightly less live UX initially for lower implementation risk.',
      },
    ],
    deployment: {
      isDeployed: false,
      details: [],
      considerations: [
        'Project is active and not yet production deployed',
        'Core workflow stabilization prioritized before infra rollout',
        'Containerized deployment path planned after feature maturity',
      ],
    },
    challenges: [
      {
        challenge: 'Choosing efficient location update frequency and storage strategy.',
        solution: 'Incremental approach with bounded update cadence and optimized query paths.',
        outcome: 'In progress with focus on performance and operational clarity.',
      },
    ],
    impact: {
      improvements: [
        'Expands architecture experience into tracking and dispatch domains',
        'Strengthens modeling of stateful operational systems',
      ],
      learnings: [
        'Tracking systems require careful latency/cost balance',
        'State machine clarity is critical in logistics workflows',
      ],
      wouldRefactor: [
        'Add WebSocket event channels for true live updates',
        'Integrate route optimization and ETA prediction',
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
