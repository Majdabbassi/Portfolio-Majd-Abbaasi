import { Component, DestroyRef, ElementRef, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { ALL_PROJECTS, Project } from '../../../data/projects.data';
import { SITE, TimelineItem } from '../../../data/site.data';
import { I18n, L } from '../../../i18n/i18n';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../../shared/reveal.directive';

type Lane = 'studies' | 'work' | 'side';

/** The chart starts when the licence starts (Sep 2022) and ends Dec 2026: 52 months. M('2025-07') = months since Sep 2022 = where July 2025 starts. */
const SPAN = 52;
const END = SPAN;
const M = (ym: string) => { const [y, m] = ym.split('-').map(Number); return (y - 2022) * 12 + (m - 9); };
/**
 * Broken scale, three stretches. Dates stay exact; only the drawing is compressed.
 *  - Sep 2022 → Dec 2024: 12 % of the width (the long, quiet part)
 *  - Jan 2025 → Jun 2025: 13 % (the internship, still readable)
 *  - Jul 2025 → Dec 2026: 75 % (engineering, full-time role, personal projects)
 * So the licence (Sep 2022 → Jun 2025) takes 25 %.
 */
const JAN_25 = M('2025-01');
const JUL_25 = M('2025-07');
const pos = (m: number) => (m <= JAN_25 ? (m / JAN_25) * 12 : m <= JUL_25 ? 12 + ((m - JAN_25) / (JUL_25 - JAN_25)) * 13 : 25 + ((m - JUL_25) / (SPAN - JUL_25)) * 75);
interface Bar { lane: Lane; when: L; title: L; place: L; points: L[]; project?: Project; x?: string; w?: string; row?: number; sub?: L; label: L; from?: number; to?: number; live?: boolean; join?: 'next' | 'prev'; group?: string; sections?: { when: L; title: L; points: L[] }[] }

/** About me, the toolbox (stack explorer + terminal) and the journey chart. */
@Component({
  selector: 'app-about',
  imports: [RevealDirective, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
  host: { id: 'about' },
})
export class About {
  i18n = inject(I18n);
  site = SITE;
  private destroy = inject(DestroyRef);

  // ---------- local time on the photo ----------
  now = signal(Date.now());
  localTime = computed(() => {
    try { return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Tunis' }).format(this.now()); } catch { return ''; }
  });

  // ---------- stack explorer ----------
  domain = signal(0);
  tool = signal('Spring Boot');
  tags = computed(() => {
    const g = SITE.skills.groups[this.domain()];
    return [...g.core.map((name) => ({ name, core: true })), ...g.more.map((name) => ({ name, core: false }))];
  });
  uses = computed(() => (SITE.skills.uses[this.tool()] ?? []).map((slug) => ALL_PROJECTS.find((p) => p.slug === slug)!).filter(Boolean));
  pickDomain(i: number) {
    const g = SITE.skills.groups[i];
    this.domain.set(i);
    this.tool.set(g.core[0] ?? g.more[0]);
  }

  // ---------- terminal: starts typing once it is on screen ----------
  terminal = viewChild<ElementRef<HTMLElement>>('term');
  cmd = signal(0);
  seen = signal(false);
  run(i: number) { this.cmd.set(i); this.seen.set(true); }

  // ---------- journey chart ----------
  lanes: Lane[] = ['studies', 'work', 'side'];
  /** Marks on the axis: the start of the licence, then the years that have room. */
  ticks = [
    { label: { en: 'Sep 2022', fr: 'sept 2022' } as L, at: M('2022-09') },
    ...['2025', '2026'].map((y) => ({ label: { en: y, fr: y } as L, at: M(y + '-01') })),
  ].map((t) => ({ label: t.label, left: pos(t.at).toFixed(3) + '%' }));
  /** Small ≈ marks where the scale changes (Jan 2025 and Jul 2025). */
  breaks = ['calc(' + pos(JAN_25) + '% - 12px)', pos(JUL_25) + '%'];
  /** The project cards start in Jan 2025 and run to the right edge. */
  projectsFrom = pos(JAN_25).toFixed(3) + '%';
  private from(i: { when: L; title: L; place: L; points?: L[] }) { return { when: i.when, title: i.title, place: i.place, points: i.points ?? [] }; }
  bars: Bar[] = [
    { lane: 'studies', ...this.from(SITE.studies[1]), label: { en: 'Licence in CS · ISITCOM', fr: 'Licence info · ISITCOM' }, from: M('2022-09'), to: M('2025-07') },
    { lane: 'studies', ...this.from(SITE.studies[0]), label: { en: 'Engineering · Polytechnique', fr: 'Ingénieur · Polytechnique' }, from: M('2025-07'), to: END, live: true },
    { lane: 'work', ...this.from(SITE.work[1]), label: { en: 'Intern', fr: 'Stage' }, from: M('2025-01'), to: M('2025-07'), join: 'next', group: 'educanet' },
    // both start when the licence ends (July 2025) and run to the right edge: still going
    { lane: 'work', ...this.from(SITE.work[0]), label: { en: 'Full-Stack Dev · Educanet', fr: 'Dév. full-stack · Educanet' }, from: M('2025-07'), to: END, live: true, join: 'prev', group: 'educanet' },
    // one card per project, placed by the layout in site.data.ts (two rows)
    ...SITE.journey.personal.map((it): Bar => {
      const p = ALL_PROJECTS.find((x) => x.slug === it.slug)!;
      const name = p.name.replace(' Manager', '');
      return { lane: 'side', when: it.dates, title: { en: p.name, fr: p.name }, place: { en: p.cardStack, fr: p.cardStack }, points: [], project: p, sub: it.dates, label: { en: name, fr: name }, x: it.x + '%', w: it.w + '%', row: it.row };
    }),
  ];
  /** Left/right margin of a dated bar inside the 5 year columns (a 3px gap keeps neighbours apart). */
  margin(b: Bar, side: 'l' | 'r') {
    if (b.from === undefined || b.to === undefined || b.project) return null;
    const pct = side === 'l' ? pos(b.from) : 100 - pos(b.to);
    // two bars that form one slot overlap by 1px so no seam shows between them
    const joined = (b.join === 'next' && side === 'r') || (b.join === 'prev' && side === 'l');
    return joined ? 'calc(' + pct.toFixed(3) + '% - .5px)' : 'calc(' + pct.toFixed(3) + '% + 1.5px)';
  }
  /** The project lane has two rows. */
  projRows = 2;
  stop = signal(3);
  /** A bar is lit when it is the selected one, or the other half of the same slot. */
  isOn(i: number) {
    const sel = this.bars[this.stop()];
    return this.stop() === i || (!!sel.group && sel.group === this.bars[i].group);
  }
  /** Clicking the intern + full-time slot shows both roles under one heading: full-time first, then the internship. */
  detail = computed((): Bar => {
    const b = this.bars[this.stop()];
    if (!b.group) return b;
    const roles = this.bars.filter((x) => x.group === b.group).reverse();
    return { ...b, ...SITE.journey.educanet, points: [], live: true, sections: roles.map((r) => ({ when: r.when, title: r.title, points: r.points })) };
  });
  barsIn(lane: Lane) { return this.bars.map((b, i) => ({ b, i })).filter((x) => x.b.lane === lane); }

  constructor() {
    afterNextRender(() => {
      const tick = setInterval(() => this.now.set(Date.now()), 30_000);
      const el = this.terminal()?.nativeElement;
      let io: IntersectionObserver | undefined;
      if (el && typeof IntersectionObserver !== 'undefined') {
        io = new IntersectionObserver((entries) => {
          if (entries.some((e) => e.isIntersecting)) { this.seen.set(true); io?.disconnect(); }
        }, { threshold: 0.35 });
        io.observe(el);
      } else {
        this.seen.set(true);
      }
      this.destroy.onDestroy(() => { clearInterval(tick); io?.disconnect(); });
    });
  }
}
