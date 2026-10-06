import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { I18nService } from '../../core/i18n.service';
import { N8N } from '../../core/projects/n8n';
import { ArchDiagramComponent } from '../../shared/arch-diagram.component';
import { ProjectDetail } from '../../shared/project-detail';
import { ProjectNavComponent } from '../../shared/project-nav.component';
import { ShowcaseComponent } from '../../shared/showcase.component';

@Component({
  selector: 'app-n8n',
  standalone: true,
  imports: [FadeInDirective, RouterLink, ArchDiagramComponent, ShowcaseComponent, ProjectNavComponent],
  templateUrl: './n8n.html',
  styleUrl: './n8n.css',
})
export class N8nComponent implements OnInit {
  readonly i18n = inject(I18nService);

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  get project(): ProjectDetail {
    return this.i18n.lang() === 'fr' ? N8N.fr : N8N.en;
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
