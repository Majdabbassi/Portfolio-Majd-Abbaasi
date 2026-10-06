import { Component, computed, inject, input, signal } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { Showcase } from './project-detail';

/** Live demo button, source link, demo accounts and a screenshot gallery with a simple lightbox. */
@Component({
  selector: 'app-showcase',
  standalone: true,
  template: `
    @if (data(); as s) {
      <section class="detail-section section-alt showcase">
        <div class="detail-container">
          <div class="section-header">
            <p class="section-label">{{ t('label') }}</p>
            <h2 class="section-heading">{{ t('heading') }}</h2>
          </div>

          <div class="actions">
            @if (s.live) {
              <a class="btn primary" [href]="s.live" target="_blank" rel="noopener">{{ t('live') }} ↗</a>
            }
            @for (e of s.extra; track e.href) {
              <a class="btn" [href]="e.href" target="_blank" rel="noopener">{{ e.label }} ↗</a>
            }
            @if (s.repo && !s.repoPrivate) {
              <a class="btn" [href]="s.repo" target="_blank" rel="noopener">{{ t('repo') }} ↗</a>
            }
            @if (s.repoPrivate) {
              <span class="btn disabled">{{ t('private') }}</span>
            }
          </div>

          @if (s.logins?.length) {
            <div class="logins">
              <span class="logins-title">{{ t('accounts') }}</span>
              @for (l of s.logins; track l.user) {
                <span class="login"><b>{{ l.role }}</b> <code>{{ l.user }}</code> / <code>{{ l.password }}</code></span>
              }
            </div>
          }
          @if (s.note) {
            <p class="note">{{ s.note }}</p>
          }

          <div class="gallery">
            @for (shot of s.screens; track shot.src; let i = $index) {
              <figure>
                <button type="button" (click)="open.set(i)" [attr.aria-label]="shot.caption">
                  <img [src]="shot.src" [alt]="shot.caption" loading="lazy" />
                </button>
                <figcaption>{{ shot.caption }}</figcaption>
              </figure>
            }
          </div>
        </div>
      </section>

      @if (open() !== null) {
        <div class="lightbox" (click)="open.set(null)" role="dialog" aria-modal="true">
          <img [src]="s.screens[open()!].src" [alt]="s.screens[open()!].caption" />
          <p>{{ s.screens[open()!].caption }}</p>
        </div>
      }
    }
  `,
  styles: [
    `
      .detail-section { padding: 1.5rem 0; }
      .detail-section.section-alt { background: var(--color-surface); }
      .detail-container { max-width: 1100px; margin: 0 auto; padding: 0 1.5rem; }
      .section-header { margin-bottom: 2rem; }
      .section-label { font-family: var(--font-mono); font-size: 0.68rem; font-weight: 600; letter-spacing: 0.15em;
        text-transform: uppercase; color: var(--color-accent); margin: 0 0 0.4rem; display: inline-flex; align-items: center; gap: 0.5rem; }
      .section-label::before { content: ''; display: inline-block; width: 1.25rem; height: 2px;
        background: linear-gradient(90deg, var(--color-accent), var(--color-accent-2)); border-radius: 2px; }
      .section-heading { margin: 0; font-size: clamp(1.25rem, 2.5vw, 1.65rem); font-weight: 700; color: var(--color-text);
        line-height: 1.2; letter-spacing: -0.015em; }
      .showcase .actions { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.25rem; }
      .btn { display: inline-flex; align-items: center; padding: 0.6rem 1.1rem; border-radius: 999px; font-size: 0.85rem;
        font-weight: 600; text-decoration: none; color: var(--color-text); background: var(--color-surface);
        border: 1px solid var(--color-border-2); transition: all 0.2s ease; }
      .btn:hover { border-color: var(--color-accent); color: var(--color-accent); }
      .btn.primary { background: var(--color-accent); border-color: var(--color-accent); color: #fff; }
      .btn.primary:hover { background: var(--color-accent-2); color: #fff; }
      .btn.disabled { color: var(--color-muted); cursor: default; }
      .btn.disabled:hover { border-color: var(--color-border-2); color: var(--color-muted); }
      .logins { display: flex; flex-wrap: wrap; gap: 0.5rem 1.25rem; align-items: baseline; font-size: 0.8rem; color: var(--color-text-2); }
      .logins-title { font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-muted); }
      code { font-family: ui-monospace, monospace; font-size: 0.78rem; background: var(--color-surface-2); padding: 0.1rem 0.4rem; border-radius: 4px; }
      .note { margin: 0.75rem 0 0; font-size: 0.78rem; color: var(--color-muted); }
      .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr)); gap: 1.25rem; margin-top: 2rem; }
      figure { margin: 0; }
      figure button { display: block; width: 100%; padding: 0; border: 1px solid var(--color-border); border-radius: 10px;
        overflow: hidden; background: var(--color-surface); cursor: zoom-in; transition: transform 0.2s ease, box-shadow 0.2s ease; }
      figure button:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12); }
      figure img { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; object-position: top; }
      figcaption { margin-top: 0.5rem; font-size: 0.75rem; color: var(--color-text-2); }
      .lightbox { position: fixed; inset: 0; z-index: 1000; background: rgba(8, 10, 14, 0.88); display: flex; flex-direction: column;
        align-items: center; justify-content: center; padding: 1.5rem; cursor: zoom-out; }
      .lightbox img { max-width: min(96vw, 1400px); max-height: 82vh; border-radius: 10px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5); }
      .lightbox p { margin: 0.9rem 0 0; color: #e5e7eb; font-size: 0.85rem; }
    `,
  ],
})
export class ShowcaseComponent {
  private readonly i18n = inject(I18nService);
  readonly data = input<Showcase | undefined>();
  readonly open = signal<number | null>(null);

  private readonly dict = computed(() =>
    this.i18n.lang() === 'fr'
      ? { label: 'DÉMO & CODE', heading: 'Essayez-le', live: 'Démo en ligne', repo: 'Code source (GitHub)',
          private: 'Code disponible sur demande', accounts: 'Comptes de démo' }
      : { label: 'DEMO & CODE', heading: 'Try it yourself', live: 'Live demo', repo: 'Source code (GitHub)',
          private: 'Source code available on request', accounts: 'Demo accounts' },
  );
  t(key: 'label' | 'heading' | 'live' | 'repo' | 'private' | 'accounts'): string {
    return this.dict()[key];
  }
}
