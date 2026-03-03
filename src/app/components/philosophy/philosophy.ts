import { Component, inject } from '@angular/core';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { I18nService } from '../../core/i18n.service';

@Component({
    selector: 'app-philosophy',
    standalone: true,
    imports: [FadeInDirective],
    templateUrl: './philosophy.html',
    styleUrl: './philosophy.css',
})
export class PhilosophyComponent {
    readonly i18n = inject(I18nService);

    get principles() {
        if (this.i18n.lang() === 'fr') {
            return [
                {
                    id: 'phil-systems',
                    icon: '🏗️',
                    title: 'Systèmes avant fonctionnalités',
                    description: 'Je conçois des architectures cohérentes, pas des fonctionnalités isolées. Chaque composant est pensé pour la résilience et la scalabilité.',
                },
                {
                    id: 'phil-observability',
                    icon: '👁️',
                    title: 'Observabilité d’abord',
                    description: 'Un système en production doit être mesurable et diagnosable. La visibilité est conçue dès le départ.',
                },
                {
                    id: 'phil-automation',
                    icon: '⚡',
                    title: 'Automatisation par défaut',
                    description: 'Les processus répétables passent à l’échelle. Je privilégie conteneurisation, workflows structurés et automatisation.',
                },
                {
                    id: 'phil-security',
                    icon: '🔐',
                    title: 'Sécurité comme fondation',
                    description: 'Le contrôle d’accès, l’isolation tenant et la configuration sécurisée sont des décisions de design de base.',
                },
                {
                    id: 'phil-evolution',
                    icon: '🔄',
                    title: 'Évolution continue',
                    description: 'Le déploiement n’est pas la fin. Les systèmes doivent être monitorés, affinés et améliorés en continu.',
                },
            ];
        }

        return [
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
}