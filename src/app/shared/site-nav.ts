import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../i18n/i18n';
import { SITE } from '../data/site.data';

/** Sticky top bar: shrinks on scroll, shows reading progress, switches language. */
@Component({
  selector: 'app-site-nav',
  imports: [RouterLink],
  host: { '(window:scroll)': 'onScroll()' },
  template: `
    <header class="bar" [class.small]="scrolled()">
      <div class="container inner">
        <a routerLink="/" class="mono logo" aria-label="Home">{{ site.handle }}<span>_</span></a>
        <nav class="links" aria-label="Main">
          <a routerLink="/" fragment="shelf" class="hide-xs">{{ i18n.t('work') }}</a>
          <a routerLink="/" fragment="about" class="hide-xs">{{ i18n.t('about') }}</a>
          <a routerLink="/" fragment="contact" class="hide-sm">{{ i18n.t('contact') }}</a>
          <a [href]="i18n.tr(site.contact.cv)" target="_blank" rel="noopener" class="cv">{{ i18n.t('cv') }}</a>
          <button type="button" class="mono lang" (click)="i18n.toggle()" [attr.aria-label]="i18n.t('switchLangLabel')">{{ i18n.t('switchLang') }}</button>
          <span class="mono status hide-sm"><i class="blink"></i>{{ i18n.tr(site.status) }}</span>
        </nav>
      </div>
      <div class="progress" [style.transform]="'scaleX(' + progress() + ')'"></div>
    </header>
  `,
  styles: `
    :host { display: block; position: sticky; top: 0; z-index: 50; }
    .bar { position: relative; background: rgba(21,18,15,.72); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid transparent; transition: border-color .3s ease; }
    .bar.small { border-bottom-color: var(--line); }
    .inner { display: flex; align-items: center; justify-content: space-between; gap: 16px; height: 76px; transition: height .3s ease; }
    .small .inner { height: 58px; }
    .logo { color: var(--text); text-decoration: none; font-size: 15px; font-weight: 600; }
    .logo span { color: var(--lamp); }
    .links { display: flex; align-items: center; gap: 22px; font-size: 15px; }
    .links a { color: var(--text-2); text-decoration: none; }
    .links a:hover { color: var(--lamp); }
    .cv { padding: 6px 12px; border: 1px solid var(--line-3); border-radius: 10px; }
    .lang { min-width: 44px; min-height: 36px; border-radius: 10px; border: 1px solid var(--line-3); background: transparent; color: var(--text-2); font-size: 13px; cursor: pointer; }
    .lang:hover { color: var(--lamp); border-color: var(--lamp); }
    .status { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; padding: 7px 12px; border: 1px solid #3A322A; border-radius: 999px; color: var(--text-2); }
    .status i { width: 8px; height: 8px; border-radius: 50%; background: var(--ok); }
    .progress { position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; background: var(--accent); transform-origin: left; }
    @media (max-width: 900px) { .hide-sm { display: none; } }
    @media (max-width: 520px) { .hide-xs { display: none; } .links { gap: 12px; } }
  `,
})
export class SiteNav {
  i18n = inject(I18n);
  site = SITE;
  scrolled = signal(false);
  progress = signal(0);

  onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    this.scrolled.set(y > 24);
    this.progress.set(max > 0 ? Math.min(1, y / max) : 0);
  }
}
