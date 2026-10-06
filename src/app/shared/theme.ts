import { DOCUMENT, Injectable, inject, signal } from '@angular/core';

export type Theme = 'dark' | 'light';
const KEY = 'portfolio_theme';

/** Dark (default) / light "daylight" theme, saved per visitor. */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private doc = inject(DOCUMENT);
  readonly theme = signal<Theme>(this.doc.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

  constructor() { this.apply(); }

  toggle() {
    this.theme.set(this.theme() === 'dark' ? 'light' : 'dark');
    try { localStorage.setItem(KEY, this.theme()); } catch { /* private mode */ }
    this.apply();
  }

  private apply() {
    const t = this.theme();
    this.doc.documentElement.setAttribute('data-theme', t);
    this.doc.querySelector('meta[name="theme-color"]')?.setAttribute('content', t === 'light' ? '#F6F0E6' : '#15120F');
  }
}
