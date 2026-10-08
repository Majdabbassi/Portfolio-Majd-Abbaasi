import { Component, DestroyRef, ElementRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ALL_PROJECTS, Project } from '../../../data/projects.data';
import { SITE } from '../../../data/site.data';
import { I18n } from '../../../i18n/i18n';

/** Order of the projects around the orbit (and of the headline phrases). */
const ORBIT = ['mall-os', 'caferesto', 'sportclub', 'car-rental', 'swiftdeliver', 'bookpro', 'massarat', 'mediplus', 'albumy', 'friendmap', 'insighthub', 'reachflow'];
const CYCLE_MS = 3200;

/**
 * First screen: "I build the software behind <a shopping mall.>" — the phrase follows
 * the project lit up on the orbit. A desk lamp follows the cursor over the dotted paper.
 */
@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  host: { '(pointermove)': 'onMove($event)' },
})
export class Hero {
  i18n = inject(I18n);
  site = SITE;
  private host = inject(ElementRef<HTMLElement>);

  projects: Project[] = ORBIT.map((slug) => ALL_PROJECTS.find((p) => p.slug === slug)!);
  /** Where each project sits on the orbit, in % of the orbit box. */
  spots = this.projects.map((_, i) => {
    const a = ((-90 + i * 30) * Math.PI) / 180;
    return { x: (50 + 44 * Math.cos(a)).toFixed(2) + '%', y: (50 + 44 * Math.sin(a)).toFixed(2) + '%' };
  });

  active = signal(0);
  current = computed(() => this.projects[this.active()]);
  private held = false;
  private visible = true;
  private frame = 0;

  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const timer = setInterval(() => {
        if (!this.held && this.visible && !document.hidden) this.active.update((i) => (i + 1) % this.projects.length);
      }, CYCLE_MS);
      // stop cycling while the hero is scrolled away
      const io = new IntersectionObserver(([e]) => (this.visible = e.isIntersecting), { threshold: 0.1 });
      io.observe(this.host.nativeElement);
      destroy.onDestroy(() => { clearInterval(timer); io.disconnect(); cancelAnimationFrame(this.frame); });
    });
  }

  pick(i: number) { this.active.set(i); }
  hold(on: boolean) { this.held = on; }

  /** Moves the lamp light with the cursor (CSS variables only, no re-render). */
  onMove(e: PointerEvent) {
    if (e.pointerType !== 'mouse' || this.frame) return;
    const el = this.host.nativeElement as HTMLElement;
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', Math.round(e.clientX - r.left) + 'px');
      el.style.setProperty('--my', Math.round(e.clientY - r.top) + 'px');
    });
  }
}
