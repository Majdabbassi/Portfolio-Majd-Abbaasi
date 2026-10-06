import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { I18nService } from '../../core/i18n.service';
import { CAR_RENTAL } from '../../core/projects/car-rental';
import { ArchDiagramComponent } from '../../shared/arch-diagram.component';
import { ProjectDetail } from '../../shared/project-detail';
import { ProjectNavComponent } from '../../shared/project-nav.component';
import { ShowcaseComponent } from '../../shared/showcase.component';

@Component({
  selector: 'app-car-rental',
  standalone: true,
  imports: [FadeInDirective, RouterLink, ArchDiagramComponent, ShowcaseComponent, ProjectNavComponent],
  templateUrl: './car-rental.html',
  styleUrl: './car-rental.css',
})
export class CarRentalComponent implements OnInit {
  readonly i18n = inject(I18nService);

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  get project(): ProjectDetail {
    return this.i18n.lang() === 'fr' ? CAR_RENTAL.fr : CAR_RENTAL.en;
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
