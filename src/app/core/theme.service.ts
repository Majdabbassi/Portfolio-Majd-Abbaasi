import { Injectable, signal } from '@angular/core';

export type AppTheme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'portfolio_theme';
  readonly theme = signal<AppTheme>('light');

  constructor() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored === 'light' || stored === 'dark') {
      this.theme.set(stored);
    } else {
      this.theme.set('light');
    }

    this.applyTheme();
  }

  setTheme(theme: AppTheme): void {
    this.theme.set(theme);
    localStorage.setItem(this.storageKey, theme);
    this.applyTheme();
  }

  toggleTheme(): void {
    this.setTheme(this.theme() === 'light' ? 'dark' : 'light');
  }

  private applyTheme(): void {
    document.documentElement.setAttribute('data-theme', this.theme());
  }
}
