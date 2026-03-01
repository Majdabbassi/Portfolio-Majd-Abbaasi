import { Component } from '@angular/core';
import { FadeInDirective } from '../../directives/fade-in.directive';

@Component({
    selector: 'app-philosophy',
    standalone: true,
    imports: [FadeInDirective],
    templateUrl: './philosophy.html',
    styleUrl: './philosophy.css',
})
export class PhilosophyComponent {
    principles = [
        {
            id: 'phil-systems',
            icon: '🏗️',
            title: 'Systems Over Features',
            description:
                'I think in architectures, not isolated endpoints. Every component is designed with failure, communication, and scalability in mind — not just functionality.',
        },
        {
            id: 'phil-observability',
            icon: '👁️',
            title: 'Observability First',
            description:
                'A system without visibility is a liability. Metrics, logs, and health checks are designed before optimization decisions are made.',
        },
        {
            id: 'phil-automation',
            icon: '⚡',
            title: 'Automation by Default',
            description:
                'Manual processes don’t scale. CI/CD pipelines, containerized deployments, and infrastructure automation eliminate human bottlenecks.',
        },
        {
            id: 'phil-security',
            icon: '🔐',
            title: 'Security as Foundation',
            description:
                'Authentication, authorization, and secure configuration are built in from day one — not patched after release.',
        },
        {
            id: 'phil-evolution',
            icon: '🔄',
            title: 'Continuous Evolution',
            description:
                'Deployment is the starting line. I monitor, measure, refine, and improve systems based on real-world usage and performance data.',
        },
    ];
}