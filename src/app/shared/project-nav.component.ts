import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../core/i18n.service';
import { PROJECT_ORDER, RegistryEntry } from './projects.registry';

/** Previous / back / next links at the bottom of a project page, from the shared project order. */
@Component({
  selector: 'app-project-nav',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="detail-section nav-closure">
      <div class="detail-container">
        <div class="nav-closure-inner">
          <a [routerLink]="['/projects', prev().id]" class="nav-link prev-link">
            <span class="nav-direction">{{ i18n.t('detail.prevProject') }}</span>
            <span class="nav-project-name">{{ name(prev()) }}</span>
          </a>
          <a routerLink="/" fragment="projects" class="nav-link back-link-center">
            {{ i18n.t('detail.backAll') }}
          </a>
          <a [routerLink]="['/projects', next().id]" class="nav-link next-link">
            <span class="nav-direction">{{ i18n.t('detail.nextProject') }}</span>
            <span class="nav-project-name">{{ name(next()) }}</span>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .detail-container { max-width: 1100px; margin: 0 auto; padding: 0 1.5rem; }
      .nav-closure { border-top: 1px solid var(--color-border); background: var(--color-surface); padding: 2.5rem 0; }
      .nav-closure-inner { display: grid; grid-template-columns: 1fr; gap: 1rem; align-items: center; }
      @media (min-width: 768px) { .nav-closure-inner { grid-template-columns: 1fr auto 1fr; gap: 2rem; } }
      .nav-link { display: flex; flex-direction: column; gap: 0.25rem; text-decoration: none; padding: 1rem 1.25rem;
        border: 1px solid var(--color-border); border-radius: var(--radius-md, 8px); background: var(--color-bg);
        transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease; }
      .nav-link:hover { border-color: var(--color-accent); box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04); transform: translateY(-2px); }
      .nav-direction { font-size: 0.68rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-accent); }
      .nav-project-name { font-size: 0.9rem; font-weight: 600; color: var(--color-text); line-height: 1.3; }
      .next-link { text-align: right; }
      @media (min-width: 768px) { .next-link { order: 3; } }
      .back-link-center { justify-content: center; align-items: center; text-align: center; font-size: 0.8rem; font-weight: 600;
        color: var(--color-muted); border-style: dashed; }
      .back-link-center:hover { color: var(--color-accent); }
    `,
  ],
})
export class ProjectNavComponent {
  readonly i18n = inject(I18nService);
  readonly currentId = input.required<string>();

  private index(): number {
    return Math.max(0, PROJECT_ORDER.findIndex((p) => p.id === this.currentId()));
  }
  prev(): RegistryEntry {
    return PROJECT_ORDER[(this.index() - 1 + PROJECT_ORDER.length) % PROJECT_ORDER.length];
  }
  next(): RegistryEntry {
    return PROJECT_ORDER[(this.index() + 1) % PROJECT_ORDER.length];
  }
  name(entry: RegistryEntry): string {
    return this.i18n.lang() === 'fr' ? entry.title.fr : entry.title.en;
  }
}
