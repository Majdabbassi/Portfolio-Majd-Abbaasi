import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../i18n/i18n';
import { SITE } from '../data/site.data';
import { ThemeService } from './theme';

/** Sticky top bar: shrinks on scroll, shows reading progress, switches language and theme. */
@Component({
  selector: 'app-site-nav',
  imports: [RouterLink],
  host: { '(window:scroll)': 'onScroll()' },
  template: `
    <header class="bar" [class.small]="scrolled()">
      <div class="container inner">
        <a routerLink="/" fragment="top" class="brand" aria-label="Home">
          <img [src]="site.photo" alt="" width="34" height="34" />
          <span>{{ site.handle }}</span>
        </a>
        <nav class="links" aria-label="Main">
          <a routerLink="/" fragment="shelf">{{ i18n.t('projects') }}</a>
          <a routerLink="/" fragment="lab">{{ i18n.t('lab') }}</a>
          <a routerLink="/" fragment="about">{{ i18n.t('about') }}</a>
          <a routerLink="/" fragment="contact">{{ i18n.t('contact') }}</a>
        </nav>
        <div class="tools">
          <div class="langs" role="group" aria-label="Language">
            <button type="button" class="mono lang" [class.on]="i18n.lang() === 'en'" [attr.aria-pressed]="i18n.lang() === 'en'" (click)="i18n.set('en')">EN</button>
            <button type="button" class="mono lang" [class.on]="i18n.lang() === 'fr'" [attr.aria-pressed]="i18n.lang() === 'fr'" (click)="i18n.set('fr')">FR</button>
          </div>
          <button type="button" class="theme" (click)="themes.toggle()" [attr.aria-label]="themes.theme() === 'dark' ? i18n.t('themeLight') : i18n.t('themeDark')" [title]="themes.theme() === 'dark' ? i18n.t('themeLight') : i18n.t('themeDark')">
            @if (themes.theme() === 'dark') {
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
            } @else {
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
            }
          </button>
          <a [href]="i18n.tr(site.contact.cv)" target="_blank" rel="noopener" class="cv">{{ i18n.t('downloadCv') }}</a>
        </div>
      </div>
      <div class="progress" [style.transform]="'scaleX(' + progress() + ')'"></div>
    </header>
  `,
  styles: `
    :host { display: block; position: sticky; top: 0; z-index: 50; }
    .bar { position: relative; background: var(--nav-bg); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid var(--line); }
    .inner { display: flex; align-items: center; gap: 18px; height: 68px; transition: height .3s ease; }
    .small .inner { height: 58px; }
    .brand { display: flex; align-items: center; gap: 10px; margin-right: auto; color: var(--text); text-decoration: none; font-weight: 800; font-size: 17px; }
    .brand:hover { color: var(--text); }
    .brand img { width: 34px; height: 34px; border-radius: 50%; object-fit: cover; border: 2px solid var(--lamp); background: var(--surface); transition: transform .3s ease; }
    .brand:hover img { transform: rotate(-10deg) scale(1.06); }
    .links { display: flex; gap: 4px; }
    .links a { color: var(--text-2); text-decoration: none; font-size: 15px; padding: 10px 12px; border-radius: 10px; transition: background .2s ease, color .2s ease; }
    .links a:hover { background: var(--surface); color: var(--text); }
    .tools { display: flex; align-items: center; gap: 8px; }
    .langs { display: flex; border: 1px solid var(--line-2); border-radius: 12px; overflow: hidden; }
    .lang { min-width: 42px; min-height: 40px; border: 0; background: transparent; color: var(--text-3); font-size: 13px; font-weight: 600; cursor: pointer; transition: background .2s ease, color .2s ease; }
    .lang.on { background: var(--surface); color: var(--lamp-text); }
    .lang:not(.on):hover { color: var(--text); }
    .theme { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 12px; border: 1px solid var(--line-2); background: transparent; color: var(--text-2); cursor: pointer; transition: border-color .2s ease, color .2s ease, transform .3s ease; }
    .theme:hover { border-color: var(--lamp); color: var(--text); transform: rotate(-12deg); }
    .cv { display: inline-flex; align-items: center; min-height: 42px; padding: 0 16px; border-radius: 12px; border: 1px solid var(--line-3); color: var(--text); text-decoration: none; font-weight: 600; font-size: 15px; transition: border-color .2s ease, transform .2s ease; }
    .cv:hover { border-color: var(--lamp); color: var(--text); transform: translateY(-1px); }
    .progress { position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; background: var(--accent); transform-origin: left; }
    @media (max-width: 900px) { .links { display: none; } }
    @media (max-width: 480px) { .cv { display: none; } .brand span { display: none; } }
  `,
})
export class SiteNav {
  i18n = inject(I18n);
  themes = inject(ThemeService);
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
