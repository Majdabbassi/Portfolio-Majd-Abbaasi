import { Component, computed, inject, input, signal } from '@angular/core';
import { I18n } from '../i18n/i18n';

/** Horizontal strip of screenshots; click one to open it full screen. */
@Component({
  selector: 'app-screen-gallery',
  host: { '(document:keydown)': 'onKey($event)' },
  template: `
    <div class="strip" role="list">
      @for (s of screens(); track s.src; let i = $index) {
        <button type="button" class="shot" role="listitem" (click)="open.set(i)" [attr.aria-label]="s.caption">
          <img [src]="s.src" [alt]="s.caption" loading="lazy" />
          <span class="cap">{{ s.caption }}</span>
        </button>
      }
    </div>

    @if (current(); as s) {
      <div class="lightbox" role="dialog" aria-modal="true" [attr.aria-label]="s.caption" (click)="open.set(null)">
        <figure (click)="$event.stopPropagation()">
          <img [src]="s.src" [alt]="s.caption" />
          <figcaption>
            <button type="button" class="nav" (click)="step(-1)" [attr.aria-label]="i18n.t('previous')">←</button>
            <span>{{ s.caption }} <em class="mono">{{ (open() ?? 0) + 1 }} / {{ screens().length }}</em></span>
            <button type="button" class="nav" (click)="step(1)" [attr.aria-label]="i18n.t('nextShot')">→</button>
          </figcaption>
          <button type="button" class="x" (click)="open.set(null)" [attr.aria-label]="i18n.t('close')">✕</button>
        </figure>
      </div>
    }
  `,
  styles: `
    .strip { display: flex; gap: 16px; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 12px; scrollbar-color: var(--line-3) transparent; }
    .shot { flex: 0 0 min(78%, 520px); scroll-snap-align: start; padding: 0; border: 1px solid var(--line-2); border-radius: 16px; overflow: hidden; background: var(--surface); cursor: zoom-in; text-align: left; color: inherit; transition: border-color .2s ease, transform .2s ease; }
    .shot:hover { border-color: var(--accent); transform: translateY(-3px); }
    .shot img { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; object-position: top; background: var(--surface-2); }
    .cap { display: block; padding: 12px 14px; font-size: 14px; color: var(--text-2); }
    .lightbox { position: fixed; inset: 0; z-index: 200; background: color-mix(in oklab, var(--bg) 95%, transparent); display: grid; place-items: center; padding: 24px; animation: rise .2s ease; }
    figure { position: relative; margin: 0; max-width: min(1200px, 100%); max-height: 100%; display: flex; flex-direction: column; gap: 12px; }
    figure img { max-width: 100%; max-height: calc(100vh - 140px); object-fit: contain; border-radius: 12px; }
    figcaption { display: flex; align-items: center; justify-content: space-between; gap: 12px; color: var(--text-2); font-size: 15px; }
    figcaption em { color: var(--text-4); font-style: normal; font-size: 12px; margin-left: 8px; }
    .nav, .x { min-width: 44px; min-height: 44px; border-radius: 12px; border: 1px solid var(--line-3); background: var(--surface); color: var(--text); font-size: 18px; cursor: pointer; }
    .x { position: absolute; top: -8px; right: -8px; }
  `,
})
export class ScreenGallery {
  i18n = inject(I18n);
  screens = input.required<{ src: string; caption: string }[]>();
  open = signal<number | null>(null);
  current = computed(() => { const i = this.open(); return i === null ? null : this.screens()[i]; });

  step(d: number) {
    const n = this.screens().length;
    this.open.update((i) => (i === null ? 0 : (i + d + n) % n));
  }

  onKey(e: KeyboardEvent) {
    if (this.open() === null) return;
    if (e.key === 'Escape') this.open.set(null);
    if (e.key === 'ArrowRight') this.step(1);
    if (e.key === 'ArrowLeft') this.step(-1);
  }
}
