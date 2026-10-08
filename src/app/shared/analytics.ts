import { DOCUMENT, Injectable, inject } from '@angular/core';

// ============================================================
//  VISIT STATS — Microsoft Clarity (free): heatmaps, scroll depth,
//  a replay of each visit, and the named events below.
//  Dashboard: https://clarity.microsoft.com
//
//  1. Paste your project ID here (Clarity → Settings → Overview).
//  2. Open the site once with ?me=1 on each of your own devices so
//     your visits are not recorded (?me=0 undoes it).
// ============================================================
const CLARITY_ID = 'ytw6a5mip7';
const LIVE_HOSTS = ['majd-abbassi.vercel.app'];
const OWNER_KEY = 'portfolio_owner';

type ClarityFn = (...args: unknown[]) => void;
declare global { interface Window { clarity?: ClarityFn & { q?: unknown[] } } }

/**
 * Loads Clarity on the live site only and names the clicks that matter
 * (CV, live demo, GitHub, toys…) so recordings can be filtered by them.
 */
@Injectable({ providedIn: 'root' })
export class Analytics {
  private doc = inject(DOCUMENT);
  private win = this.doc.defaultView!;
  private sent = new Set<string>();
  private on = false;

  start() {
    if (!CLARITY_ID || !LIVE_HOSTS.includes(this.win.location.hostname) || this.isOwner()) return;
    const w = this.win;
    w.clarity = w.clarity || Object.assign((...args: unknown[]) => { (w.clarity!.q = w.clarity!.q || []).push(args); }, {});
    const s = this.doc.createElement('script');
    s.async = true;
    s.src = 'https://www.clarity.ms/tag/' + CLARITY_ID;
    this.doc.head.appendChild(s);
    this.on = true;
    this.doc.addEventListener('click', (e) => this.onClick(e), { capture: true });
  }

  /** Name a moment of the visit (shows up as a filter in Clarity). */
  track(event: string) {
    if (!this.on) return;
    // once per page is enough: "did they play the toy", not how many clicks
    const key = this.win.location.pathname + '|' + event;
    if (this.sent.has(key)) return;
    this.sent.add(key);
    this.win.clarity?.('event', event);
  }

  /** A label attached to the whole visit, e.g. lang = fr. */
  tag(key: string, value: string) {
    if (this.on) this.win.clarity?.('set', key, value);
  }

  private isOwner() {
    try {
      const me = new URLSearchParams(this.win.location.search).get('me');
      if (me === '1') localStorage.setItem(OWNER_KEY, '1');
      if (me === '0') localStorage.removeItem(OWNER_KEY);
      return localStorage.getItem(OWNER_KEY) === '1';
    } catch { return false; }
  }

  private onClick(e: Event) {
    const el = (e.target as Element | null)?.closest('a, button');
    if (!el) return;
    const project = this.win.location.pathname.match(/^\/projects\/([^/]+)/)?.[1];
    const at = project ?? 'home';
    const href = el.getAttribute('href') ?? '';

    if (el.closest('app-toy-host')) return this.track('toy_play_' + project);
    if (el.closest('.stage')) return this.track('home_toy_' + el.closest('[data-slug]')?.getAttribute('data-slug'));
    if (el.matches('.cred')) return this.track('copy_login_' + project);
    if (href.endsWith('.pdf')) return this.track('cv_download');
    if (href.startsWith('mailto:')) return this.track('contact_email');
    if (href.includes('linkedin.com')) return this.track('open_linkedin');
    if (href.includes('github.com')) return this.track(project ? 'open_repo_' + project : 'open_github');
    if (href.includes('wa.me/')) return this.track('contact_whatsapp');
    if (href.endsWith('.apk')) return this.track('apk_download_' + project);
    if (/^https?:/.test(href)) return this.track('open_demo_' + at);
    if (el.matches('a.open')) return this.track('home_card_' + href.split('/').pop());
    if (el.matches('a.next')) return this.track('next_project');
    if (el.matches('.theme')) return this.track('theme_switch');
    if (el.matches('.lang')) return this.track('lang_switch');
  }
}
