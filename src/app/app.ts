import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteNav } from './shared/site-nav';
import { Mascot } from './mascot/mascot';
import { Analytics } from './shared/analytics';
import { I18n } from './i18n/i18n';
import { ThemeService } from './shared/theme';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteNav, Mascot],
  template: `
    <a class="skip" href="#main">Skip to content</a>
    <app-site-nav />
    <main id="main"><router-outlet /></main>
    <app-mascot />
  `,
  styles: `
    .skip { position: absolute; left: -999px; top: 8px; z-index: 100; padding: 10px 14px; background: var(--lamp); color: var(--lamp-ink); border-radius: 8px; }
    .skip:focus { left: 8px; }
  `,
})
export class App {
  constructor() {
    const analytics = inject(Analytics);
    analytics.start();
    analytics.tag('lang', inject(I18n).lang());
    analytics.tag('theme', inject(ThemeService).theme());
  }
}
