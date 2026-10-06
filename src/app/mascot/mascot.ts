import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { I18n, L } from '../i18n/i18n';
import { SITE } from '../data/site.data';
import { findProject } from '../data/projects.data';
import { MASCOT } from './mascot.data';

type Mode = 'idle' | 'say' | 'menu' | 'ask' | 'tour';
interface Step { sel: string; text: L }

const HIDE_KEY = 'mini_majd_hidden';
const W = 76;   // mascot box size, keep in sync with CSS
const H = 128;
const LINE_EVERY_MS = 45_000;
const MAX_LINES = 6;

/**
 * Mini-Majd: a small bobblehead that lives in the corner, says things,
 * and can walk the visitor through the page.
 */
@Component({
  selector: 'app-mascot',
  host: { '(window:resize)': 'onResize()', '(document:keydown.escape)': 'closeBubble()' },
  templateUrl: './mascot.html',
  styleUrl: './mascot.css',
})
export class Mascot {
  i18n = inject(I18n);
  private router = inject(Router);
  photo = SITE.photo;

  hidden = signal(this.readHidden());
  mode = signal<Mode>('idle');
  text = signal('');
  walking = signal(false);
  waving = signal(false);
  pos = signal<{ x: number; y: number } | null>(null); // null = docked in the corner
  flip = signal(false); // bubble on the right side of mini-Majd

  ui = computed(() => MASCOT.ui[this.i18n.lang()]);
  tourSteps = signal<Step[]>([]);
  tourIndex = signal(0);
  isLastStep = computed(() => this.tourIndex() >= this.tourSteps().length - 1);

  private url = '/';
  private greeted = new Set<string>();
  private linesSaid = 0;
  private offeredProjectTour = false;
  private timers: ReturnType<typeof setTimeout>[] = [];
  private lineTimer?: ReturnType<typeof setInterval>;
  private reduced = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  // On a phone any bubble covers the text being read, so mini-Majd only talks when tapped.
  private quiet = () => typeof matchMedia !== 'undefined' && matchMedia('(max-width: 640px)').matches;

  constructor() {
    const sub = this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => this.onPage((e as NavigationEnd).urlAfterRedirects));
    this.lineTimer = setInterval(() => this.randomLine(), LINE_EVERY_MS);
    inject(DestroyRef).onDestroy(() => { sub.unsubscribe(); clearInterval(this.lineTimer); this.clearTimers(); });
  }

  // ---------- page changes ----------
  private onPage(url: string) {
    this.url = url.split('#')[0].split('?')[0];
    this.endTour(false);
    if (this.hidden() || this.quiet()) return;
    const key = this.url;
    if (this.greeted.has(key)) return;
    this.greeted.add(key);
    this.later(() => {
      if (this.mode() !== 'idle') return;
      const project = this.currentProject();
      this.wave();
      if (!project) {
        this.text.set(this.i18n.tr(MASCOT.greetHome));
        this.mode.set('ask');
      } else if (!this.offeredProjectTour) {
        // first project page of the visit: a line + the tour offer
        this.offeredProjectTour = true;
        this.text.set(this.i18n.tr(project.mascot[0]) + ' ' + this.i18n.tr(MASCOT.greetProject));
        this.mode.set('ask');
      } else {
        // later project pages: just a short line
        this.say(this.i18n.tr(project.mascot[0]), 5000);
      }
    }, this.url === '/' ? 2500 : 3500);
  }

  private currentProject() {
    const m = this.url.match(/^\/projects\/([^/]+)/);
    return m ? findProject(m[1]) : undefined;
  }

  // ---------- talking ----------
  toggleMenu() {
    if (this.mode() === 'tour') return;
    this.mode.set(this.mode() === 'menu' ? 'idle' : 'menu');
    this.wave();
  }

  sayRandom(force = false) {
    const project = this.currentProject();
    const pool: L[] = [...MASCOT.lines, ...(project?.mascot ?? [])];
    const line = pool[Math.floor(Math.random() * pool.length)];
    this.say(this.i18n.tr(line), force ? 7000 : 6000);
  }

  private randomLine() {
    if (this.hidden() || this.quiet() || this.mode() !== 'idle' || this.linesSaid >= MAX_LINES || document.hidden) return;
    this.linesSaid++;
    this.sayRandom();
  }

  private say(text: string, ms: number) {
    this.text.set(text);
    this.mode.set('say');
    this.wave();
    this.later(() => { if (this.mode() === 'say') this.mode.set('idle'); }, ms);
  }

  closeBubble() {
    if (this.mode() === 'tour') this.endTour();
    else this.mode.set('idle');
  }

  private wave() {
    this.waving.set(true);
    this.later(() => this.waving.set(false), 1600);
  }

  // ---------- hide / show ----------
  hide() {
    this.endTour();
    this.mode.set('idle');
    this.hidden.set(true);
    try { localStorage.setItem(HIDE_KEY, '1'); } catch { /* ignore */ }
  }

  show() {
    this.hidden.set(false);
    try { localStorage.removeItem(HIDE_KEY); } catch { /* ignore */ }
    this.say(this.i18n.tr({ en: "I'm back!", fr: 'Me revoilà !' }), 3000);
  }

  private readHidden() {
    try { return localStorage.getItem(HIDE_KEY) === '1'; } catch { return false; }
  }

  // ---------- tour ----------
  startTour() {
    const all = this.currentProject() ? MASCOT.tourProject : MASCOT.tourHome;
    const steps = all.filter((s) => document.querySelector(s.sel));
    if (!steps.length) return;
    this.tourSteps.set(steps);
    this.tourIndex.set(0);
    this.mode.set('tour');
    this.goTo(0);
  }

  nextStep() {
    if (this.isLastStep()) { this.endTour(); return; }
    this.goTo(this.tourIndex() + 1);
  }

  endTour(walkHome = true) {
    if (this.mode() !== 'tour' && this.pos() === null) return;
    this.clearTimers();
    if (this.mode() === 'tour') this.mode.set('idle');
    if (walkHome) this.walk(null); else this.pos.set(null);
  }

  private goTo(i: number) {
    this.tourIndex.set(i);
    const step = this.tourSteps()[i];
    const el = document.querySelector(step.sel) as HTMLElement | null;
    if (!el) { this.nextStep(); return; }
    this.text.set('…');
    el.scrollIntoView({ behavior: this.reduced ? 'auto' : 'smooth', block: 'center' });
    this.later(() => {
      const r = el.getBoundingClientRect();
      const vw = window.innerWidth, vh = window.innerHeight;
      const roomRight = vw - r.right > W + 280;
      let x = roomRight ? r.right + 16 : r.left - W - 16;
      if (x < 8 || x > vw - W - 8) x = Math.min(vw - W - 12, Math.max(12, r.left + 12));
      const y = Math.min(vh - H - 16, Math.max(90, r.top + Math.min(40, r.height / 3)));
      this.flip.set(x < vw / 2);
      this.walk({ x, y }, () => this.text.set(this.i18n.tr(step.text)));
    }, this.reduced ? 50 : 650);
  }

  private walk(to: { x: number; y: number } | null, done?: () => void) {
    if (to === null) this.flip.set(false);
    this.walking.set(true);
    this.pos.set(to);
    this.later(() => { this.walking.set(false); done?.(); }, this.reduced ? 0 : 900);
  }

  onResize() { if (this.mode() === 'tour') this.goTo(this.tourIndex()); }

  // ---------- helpers ----------
  private later(fn: () => void, ms: number) { this.timers.push(setTimeout(fn, ms)); }
  private clearTimers() { this.timers.forEach(clearTimeout); this.timers = []; }

  style = computed(() => {
    const p = this.pos();
    return p ? { left: p.x + 'px', top: p.y + 'px' } : { left: `calc(100vw - ${W + 24}px)`, top: `calc(100vh - ${H + 20}px)` };
  });
}
