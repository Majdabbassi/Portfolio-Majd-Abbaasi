import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { I18nService } from '../../core/i18n.service';
import { DELIVERY_TRACKING } from '../../core/projects/delivery-tracking';
import { ArchDiagramComponent } from '../../shared/arch-diagram.component';
import { ProjectDetail } from '../../shared/project-detail';
import { ProjectNavComponent } from '../../shared/project-nav.component';
import { ShowcaseComponent } from '../../shared/showcase.component';

@Component({
  selector: 'app-delivery-tracking',
  standalone: true,
  imports: [FadeInDirective, RouterLink, ArchDiagramComponent, ShowcaseComponent, ProjectNavComponent],
  templateUrl: './delivery-tracking.html',
  styleUrl: './delivery-tracking.css',
})
export class DeliveryTrackingComponent implements OnInit {
  readonly i18n = inject(I18nService);

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  get project(): ProjectDetail {
    return this.i18n.lang() === 'fr' ? DELIVERY_TRACKING.fr : DELIVERY_TRACKING.en;
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
