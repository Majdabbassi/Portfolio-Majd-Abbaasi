import { Component, inject } from '@angular/core';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { I18nService } from '../../core/i18n.service';

@Component({
  selector: 'app-infrastructure',
  standalone: true,
  imports: [FadeInDirective],
  templateUrl: './infrastructure.html',
  styleUrl: './infrastructure.css'
})
export class InfrastructureComponent {
  readonly i18n = inject(I18nService);

  get workflowSteps(): string[] {
    return this.i18n.lang() === 'fr'
      ? ['Commit', 'Build', 'Conteneuriser', 'Configurer', 'Déployer', 'Monitorer', 'Optimiser', 'Itérer']
      : ['Commit', 'Build', 'Containerize', 'Configure', 'Deploy', 'Monitor', 'Optimize', 'Iterate'];
  }

  get principles(): string[] {
    return this.i18n.lang() === 'fr'
      ? [
          'Configuration par environnement',
          'Isolation des services par conteneurisation',
          'Routage reverse proxy & exposition contrôlée',
          'Déploiements avec monitoring',
          'Conception backend transactionnelle sûre',
        ]
      : [
          'Environment-based configuration',
          'Service isolation through containerization',
          'Reverse proxy routing & controlled exposure',
          'Monitoring-enabled deployments',
          'Transaction-safe backend design',
        ];
  }

  get observabilityItems(): string[] {
    return this.i18n.lang() === 'fr'
      ? ['Collecte de métriques', 'Health-check endpoints', 'Inspection des logs', 'Logique d’alerte', 'Monitoring par dashboard']
      : ['Metrics collection', 'Health-check endpoints', 'Log inspection', 'Alert logic for abnormal behavior', 'Dashboard-based monitoring'];
  }
}