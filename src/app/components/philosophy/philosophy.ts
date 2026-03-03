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
                'I design cohesive architectures, not isolated functionality. Every component is built with failure handling, communication, and scalability in mind.',
        },
        {
            id: 'phil-observability',
            icon: '👁️',
            title: 'Observability First',
            description:
                'If a system runs in production, it must be measurable and diagnosable. Visibility is designed in — not added later.',
        },
        {
            id: 'phil-automation',
            icon: '⚡',
            title: 'Automation by Default',
            description:
                'Repeatable processes scale. I favor containerization, structured deployment workflows, and automation over manual operations.',
        },
        {
            id: 'phil-security',
            icon: '🔐',
            title: 'Security as Foundation',
            description:
                'Access control, tenant isolation, and secure configuration are core design decisions — not post-release patches.',
        },
        {
            id: 'phil-evolution',
            icon: '🔄',
            title: 'Continuous Evolution',
            description:
                'Deployment is not the finish line. Systems should be monitored, refined, and improved based on real-world behavior.',
        },
    ];
}