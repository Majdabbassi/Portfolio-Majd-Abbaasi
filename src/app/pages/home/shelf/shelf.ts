import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ALL_PROJECTS, Project } from '../../../data/projects.data';
import { SITE } from '../../../data/site.data';
import { I18n } from '../../../i18n/i18n';
import { RevealDirective } from '../../../shared/reveal.directive';
import { FriendmapMini } from './toys/friendmap-mini';
import { AlbumyMini } from './toys/albumy-mini';
import { MallOsMini } from './toys/mall-os-mini';
import { SwiftdeliverMini } from './toys/swiftdeliver-mini';
import { InsighthubMini } from './toys/insighthub-mini';
import { BookproMini } from './toys/bookpro-mini';
import { CarRentalMini } from './toys/car-rental-mini';
import { SportclubMini } from './toys/sportclub-mini';
import { ReachflowMini } from './toys/reachflow-mini';
import { CaferestoMini } from './toys/caferesto-mini';
import { MassaratMini } from './toys/massarat-mini';
import { MediplusMini } from './toys/mediplus-mini';

/** What a card shows besides its toy: real screenshots (card-size copies) and the links. */
interface CardExtras {
  shots: { src: string; caption: string }[];
  live?: string;
  repo?: string;
}

/** screens/<dir>/<name>.png → screens/<dir>/card/<name>.jpg (960px copies made for the cards) */
const cardShot = (src: string) => src.replace(/\/([^/]+)\.(png|jpe?g)$/, '/card/$1.jpg');

/** The shelf: twelve cards, each with a small toy that plays the project's core mechanic, then its real screenshots. */
@Component({
  selector: 'app-shelf',
  imports: [RouterLink, RevealDirective, FriendmapMini, AlbumyMini, MallOsMini, SwiftdeliverMini, InsighthubMini, BookproMini, CarRentalMini, SportclubMini, ReachflowMini, CaferestoMini, MassaratMini, MediplusMini],
  template: `
    <section class="container shelf" id="shelf">
      <div class="shelf-head" appReveal>
        <div>
          <div class="eyebrow">{{ i18n.tr(site.shelf.eyebrow) }}</div>
          <h2>{{ i18n.tr(site.shelf.title) }}</h2>
        </div>
        <p>{{ i18n.tr(site.shelf.text) }}</p>
      </div>

      <div class="cards">
        @for (p of projects; track p.slug; let i = $index) {
          @let x = extras(p);
          @let at = slide()[p.slug] ?? 0;
          <article class="card hue" appReveal [attr.data-slug]="p.slug" [style.--h]="p.hue" [style.transition-delay]="(i % 3) * 80 + 'ms'">
            <div class="stage">
              <div class="bar">
                <span [class]="'badge ' + p.badge"><i></i>{{ i18n.tr(site.shelf.badges[p.badge]) }}</span>
                @if (x.shots.length) {
                  <span class="count mono" aria-hidden="true">{{ x.shots.length }} {{ i18n.tr(site.shelf.screens) }} →</span>
                  <div class="pager" role="group" [attr.aria-label]="i18n.tr(site.shelf.slides) + ' · ' + p.name">
                    <button type="button" class="nav" [disabled]="at === 0" (click)="go(track, p.slug, at - 1)" [attr.aria-label]="i18n.tr(site.shelf.prev)">‹</button>
                    <button type="button" class="dot play-dot" [class.on]="at === 0" (click)="go(track, p.slug, 0)" [attr.aria-label]="i18n.tr(site.shelf.play)" [attr.aria-current]="at === 0"></button>
                    @for (s of x.shots; track s.src; let k = $index) {
                      <button type="button" class="dot" [class.on]="at === k + 1" (click)="go(track, p.slug, k + 1)" [attr.aria-label]="s.caption" [attr.aria-current]="at === k + 1"></button>
                    }
                    <button type="button" class="nav" [disabled]="at === x.shots.length" (click)="go(track, p.slug, at + 1)" [attr.aria-label]="i18n.tr(site.shelf.next)">›</button>
                  </div>
                }
              </div>
              <div class="track" #track (scroll)="onScroll(track, p.slug)">
                <div class="slide toy">
                  @switch (p.slug) {
                    @case ('friendmap') { <app-friendmap-mini /> }
                    @case ('albumy') { <app-albumy-mini /> }
                    @case ('mall-os') { <app-mall-os-mini /> }
                    @case ('swiftdeliver') { <app-swiftdeliver-mini /> }
                    @case ('insighthub') { <app-insighthub-mini /> }
                    @case ('bookpro') { <app-bookpro-mini /> }
                    @case ('car-rental') { <app-car-rental-mini /> }
                    @case ('sportclub') { <app-sportclub-mini /> }
                    @case ('reachflow') { <app-reachflow-mini /> }
                    @case ('caferesto') { <app-caferesto-mini /> }
                    @case ('massarat') { <app-massarat-mini /> }
                    @case ('mediplus') { <app-mediplus-mini /> }
                  }
                </div>
                @for (s of x.shots; track s.src; let k = $index) {
                  <figure class="slide shot" [attr.aria-hidden]="at !== k + 1">
                    <img [src]="s.src" [alt]="s.caption" loading="lazy" decoding="async" />
                    <figcaption>{{ s.caption }} <span class="mono">{{ k + 1 }}/{{ x.shots.length }}</span></figcaption>
                  </figure>
                }
              </div>
            </div>
            <div class="card-body">
              <div class="card-title">
                <img [src]="p.icon" alt="" width="30" height="30" loading="lazy" />
                <h3>{{ p.name }}</h3>
              </div>
              <p>{{ i18n.tr(p.cardLine) }}</p>
              <span class="mono stack">{{ p.cardStack }}</span>
              <div class="card-foot">
                @if (x.live) {
                  <a class="btn-live" [href]="x.live" target="_blank" rel="noopener">{{ i18n.tr(p.badge === 'prod' ? site.shelf.visitSite : site.shelf.liveDemo) }}</a>
                } @else if (x.repo) {
                  <a class="btn-live ghost" [href]="x.repo" target="_blank" rel="noopener">{{ i18n.tr(site.shelf.code) }}</a>
                }
                <a class="open mono" [routerLink]="['/projects', p.slug]" [attr.aria-label]="i18n.tr(site.shelf.caseStudy) + ' ' + p.name">{{ i18n.tr(site.shelf.caseStudy) }}</a>
              </div>
            </div>
          </article>
        }
      </div>
    </section>
  `,
  styles: `
    .shelf { padding-block: 72px 104px; display: flex; flex-direction: column; gap: 40px; }
    .shelf-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 16px; }
    h2 { margin: 10px 0 0; font-size: clamp(34px, 4.5vw, 50px); font-weight: 800; letter-spacing: -.02em; line-height: 1.08; text-wrap: balance; }
    .shelf-head p { margin: 0; color: var(--text-3); font-size: 17px; max-width: 420px; line-height: 1.55; }
    .eyebrow { color: var(--lamp-text); }
    .cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 360px), 1fr)); gap: 24px; }
    .card { container: card / inline-size; display: flex; flex-direction: column; min-width: 0; background: var(--surface); border: 1px solid var(--line-2); border-radius: 22px; overflow: hidden; }
    .card.is-visible { transition: transform .3s ease, border-color .3s ease, box-shadow .3s ease, opacity .7s ease; }
    .card:hover { transform: translateY(-6px); border-color: var(--acc-line); box-shadow: 0 26px 60px var(--shadow); }

    /* the box: a slim bar (badge + pager), then the swipeable track: toy first, screenshots after */
    .stage { position: relative; height: 340px; display: flex; flex-direction: column; background: var(--stage); border-bottom: 1px solid var(--acc-line); overflow: hidden; }
    .bar { flex: none; height: 44px; display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 0 10px 0 14px; border-bottom: 1px solid var(--line-2); }
    .track { flex: 1; min-height: 0; display: flex; overflow-x: auto; overflow-y: hidden; scroll-snap-type: x mandatory; overscroll-behavior-x: contain; scrollbar-width: none; }
    .track::-webkit-scrollbar { display: none; }
    .slide { flex: 0 0 100%; min-width: 0; height: 100%; scroll-snap-align: start; scroll-snap-stop: always; position: relative; overflow: hidden; }
    .slide.toy { display: flex; flex-direction: column; }
    .shot { margin: 0; display: flex; align-items: center; justify-content: center; padding: 12px 12px 38px; }
    .shot img { max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 10px; border: 1px solid var(--line-2); box-shadow: 0 10px 28px var(--shadow); background: var(--surface); }
    .shot figcaption { position: absolute; left: 12px; right: 12px; bottom: 10px; display: flex; justify-content: space-between; gap: 8px; font-size: 13px; color: var(--text-2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .shot figcaption .mono { font-size: 11px; color: var(--text-4); flex: none; }

    .pager { display: flex; align-items: center; gap: 2px; }
    .nav { width: 32px; height: 32px; border-radius: 10px; border: 1px solid transparent; background: transparent; color: var(--acc-text); font: 600 20px/1 var(--font); cursor: pointer; display: grid; place-items: center; transition: background .2s ease, border-color .2s ease; }
    .nav:hover:not(:disabled) { background: var(--acc-soft); border-color: var(--acc-line); }
    .nav:disabled { opacity: .3; cursor: default; }
    .dot { width: 14px; height: 32px; border: 0; padding: 0; background: transparent; cursor: pointer; display: grid; place-items: center; }
    .dot::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: var(--line-3); transition: background .2s ease, transform .2s ease; }
    .dot.on::before { background: var(--acc); transform: scale(1.25); }
    .play-dot::before { width: 0; height: 0; border-radius: 0; background: none; border-left: 8px solid var(--line-3); border-top: 5px solid transparent; border-bottom: 5px solid transparent; }
    .play-dot.on::before { background: none; border-left-color: var(--acc); }
    .count { margin-left: auto; font-size: 11px; color: var(--text-4); white-space: nowrap; }
    @container card (max-width: 420px) { .count { display: none; } }
    @container card (max-width: 330px) { .nav { display: none; } .pager { padding-right: 4px; } }

    .card-body { padding: 18px 22px 22px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
    .card-title { display: flex; align-items: center; gap: 10px; min-width: 0; }
    .card-title img { flex: none; width: 30px; height: 30px; border-radius: 8px; object-fit: contain; background: var(--surface-2); }
    .card-title h3 { margin: 0; font-size: 22px; letter-spacing: -.01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .card-body p { margin: 0; color: var(--text-3); font-size: 15px; line-height: 1.5; }
    .stack { margin-top: auto; font-size: 12px; color: var(--text-4); padding-top: 4px; }
    .card-foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 44px; }
    .btn-live { display: inline-flex; align-items: center; min-height: 40px; padding: 0 16px; border-radius: 12px; border: 1px solid var(--btn); background: var(--btn); color: var(--btn-ink); font: 600 14px var(--font); text-decoration: none; white-space: nowrap; transition: transform .15s ease, filter .2s ease; }
    .btn-live:hover { transform: translateY(-1px); filter: brightness(1.06); }
    .btn-live.ghost { background: transparent; color: var(--acc-text); border-color: var(--acc-line); }
    .open { margin-left: auto; font-size: 13px; font-weight: 600; color: var(--acc-text); text-decoration: none; white-space: nowrap; padding: 10px 0; }
    .open:hover { color: var(--text); }
    .badge { flex: none; display: inline-flex; align-items: center; gap: 6px; font: 500 11px var(--mono); padding: 4px 9px; border-radius: 999px; border: 1px solid var(--line-3); color: var(--text-2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .badge i { flex: none; width: 6px; height: 6px; border-radius: 50%; background: var(--ok-text); }
    .badge.prod { border-color: var(--acc-line); color: var(--acc-text); }
    .badge.prod i { background: var(--acc); }
    .badge.fav { border-color: var(--lamp); color: var(--lamp-text); }
    .badge.fav i { background: var(--lamp); }
    .badge.local i { background: var(--text-4); }
    @media (max-width: 640px) { .shelf { padding-block: 40px 72px; } .stage { height: 360px; } }
    @media (max-width: 360px) { .stage { height: 384px; } }
    @media (prefers-reduced-motion: reduce) { .track { scroll-behavior: auto; } }
  `,
})
export class Shelf {
  i18n = inject(I18n);
  site = SITE;
  projects = ALL_PROJECTS;

  /** Which slide each card shows: 0 = the toy, 1..n = screenshots. */
  slide = signal<Partial<Record<string, number>>>({});

  private cache = new Map<string, CardExtras>();

  extras(p: Project): CardExtras {
    const key = p.slug + ':' + this.i18n.lang();
    let x = this.cache.get(key);
    if (!x) {
      const d = this.i18n.tr(p.detail);
      const s = d.showcase;
      x = {
        shots: (s?.screens ?? []).map((sh) => ({ src: cardShot(sh.src), caption: sh.caption })),
        live: s?.live ?? d.deployment.liveUrl,
        repo: s?.repoPrivate ? undefined : s?.repo,
      };
      this.cache.set(key, x);
    }
    return x;
  }

  go(track: HTMLElement, slug: string, i: number) {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({ left: i * track.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
    this.set(slug, i);
  }

  onScroll(track: HTMLElement, slug: string) {
    if (!track.clientWidth) return;
    this.set(slug, Math.round(track.scrollLeft / track.clientWidth));
  }

  private set(slug: string, i: number) {
    if ((this.slide()[slug] ?? 0) !== i) this.slide.update((m) => ({ ...m, [slug]: i }));
  }
}
