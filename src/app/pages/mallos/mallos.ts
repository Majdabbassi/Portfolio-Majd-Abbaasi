import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { I18nService } from '../../core/i18n.service';
import { MALLOS } from '../../core/projects/mallos';
import { ArchDiagramComponent } from '../../shared/arch-diagram.component';
import { ProjectDetail } from '../../shared/project-detail';
import { ProjectNavComponent } from '../../shared/project-nav.component';
import { ShowcaseComponent } from '../../shared/showcase.component';

@Component({
  selector: 'app-mallos',
  standalone: true,
  imports: [FadeInDirective, RouterLink, ArchDiagramComponent, ShowcaseComponent, ProjectNavComponent],
  templateUrl: './mallos.html',
  styleUrl: './mallos.css',
})
export class MallosComponent implements OnInit {
  readonly i18n = inject(I18nService);

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  get project(): ProjectDetail {
    return this.i18n.lang() === 'fr' ? MALLOS.fr : MALLOS.en;
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
