import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ALL_PROJECTS } from '../../../data/projects.data';
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

/** The shelf: twelve cards, each with a small toy that plays the project's core mechanic. */
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
          <article class="card hue" appReveal [attr.data-slug]="p.slug" [style.--h]="p.hue" [style.transition-delay]="(i % 3) * 80 + 'ms'">
            <div class="stage">
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
            <div class="card-body">
              <div class="card-title">
                <img [src]="p.icon" alt="" width="30" height="30" loading="lazy" />
                <h3>{{ p.name }}</h3>
                <span [class]="'badge ' + p.badge"><i></i>{{ i18n.tr(site.shelf.badges[p.badge]) }}</span>
              </div>
              <p>{{ i18n.tr(p.cardLine) }}</p>
              <div class="card-foot">
                <span class="mono stack">{{ p.cardStack }}</span>
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
    .card { display: flex; flex-direction: column; background: var(--surface); border: 1px solid var(--line-2); border-radius: 22px; overflow: hidden; }
    .card.is-visible { transition: transform .3s ease, border-color .3s ease, box-shadow .3s ease, opacity .7s ease; }
    .card:hover { transform: translateY(-6px); border-color: var(--acc-line); box-shadow: 0 26px 60px var(--shadow); }
    .stage { position: relative; height: 290px; display: flex; flex-direction: column; background: var(--stage); border-bottom: 1px solid var(--acc-line); overflow: hidden; }
    .card-body { padding: 18px 22px 22px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
    .card-title { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
    .card-title img { width: 30px; height: 30px; border-radius: 8px; object-fit: contain; background: var(--surface-2); }
    .card-title h3 { margin: 0; font-size: 22px; flex: 1; letter-spacing: -.01em; }
    .card-body p { margin: 0; color: var(--text-3); font-size: 15px; line-height: 1.5; }
    .card-foot { margin-top: auto; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding-top: 4px; }
    .stack { font-size: 12px; color: var(--text-4); }
    .open { font-size: 13px; font-weight: 600; color: var(--acc-text); text-decoration: none; white-space: nowrap; padding: 8px 0; }
    .open:hover { color: var(--text); }
    .badge { display: inline-flex; align-items: center; gap: 6px; font: 500 11px var(--mono); padding: 4px 9px; border-radius: 999px; border: 1px solid var(--line-3); color: var(--text-2); }
    .badge i { width: 6px; height: 6px; border-radius: 50%; background: var(--ok-text); }
    .badge.prod { border-color: var(--acc-line); color: var(--acc-text); }
    .badge.prod i { background: var(--acc); }
    .badge.fav { border-color: var(--lamp); color: var(--lamp-text); }
    .badge.fav i { background: var(--lamp); }
    .badge.local i { background: var(--text-4); }
    @media (max-width: 640px) { .shelf { padding-block: 40px 72px; } .stage { height: 310px; } }
  `,
})
export class Shelf {
  i18n = inject(I18n);
  site = SITE;
  projects = ALL_PROJECTS;
}
