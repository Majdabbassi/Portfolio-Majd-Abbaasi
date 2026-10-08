import { Component, computed, inject, signal } from '@angular/core';
import { I18n } from '../../../../i18n/i18n';

const T = {
  en: { chair1: 'chair 1', chair2: 'chair 2 · aide', add: '+1 chair · hire an aide', remove: 'Remove the aide', one: '1 chair · 4 of 5 slots taken', two: '2 chairs · capacity doubled · 7 of 10' },
  fr: { chair1: 'chaise 1', chair2: 'chaise 2 · aide', add: '+1 chaise · un assistant', remove: 'Retirer l’assistant', one: '1 chaise · 4 créneaux sur 5 pris', two: '2 chaises · capacité doublée · 7 sur 10' },
};

/** BookPro: hiring an assistant adds a chair — and a whole column of capacity. */
@Component({
  selector: 'app-bookpro-mini',
  template: `
    <div class="scene">
      <div class="sched">
        <div class="head mono"><span></span><span>{{ t().chair1 }}</span><span [class.off]="!two()">{{ t().chair2 }}</span></div>
        @for (r of rows; track r.t; let i = $index) {
          <div class="row">
            <span class="time mono">{{ r.t }}</span>
            <span class="slot" [class.booked]="r.c1"></span>
            @if (two()) {
              <span class="slot new" [class.booked]="r.c2" [class.fill]="r.c2" [style.animation-delay]="(0.1 * i + (r.c2 ? 0.5 : 0)) + 's'"></span>
            } @else {
              <span class="slot none"></span>
            }
          </div>
        }
      </div>
    </div>
    <div class="controls">
      <button type="button" class="play" (click)="two.set(!two())">{{ two() ? t().remove : t().add }}</button>
      <span class="readout">{{ two() ? t().two : t().one }}</span>
    </div>
  `,
  styleUrl: './mini.css',
  styles: `
    .sched { display: flex; flex-direction: column; gap: 6px; }
    .head, .row { display: grid; grid-template-columns: 52px repeat(2, minmax(0, 1fr)); gap: 6px; align-items: center; }
    .head { font-size: 11px; color: var(--text-3); }
    .head .off { visibility: hidden; }
    .time { font-size: 11px; color: var(--text-3); }
    .slot { height: 26px; border-radius: 7px; background: var(--cell); border: 1px dashed var(--acc-line); transition: background .4s ease; }
    .slot.booked { border: 0; background: var(--acc); }
    .slot.none { visibility: hidden; }
    .slot.new { animation: drop .5s cubic-bezier(.2, 1.4, .4, 1) both; }
    .slot.fill { animation: drop .5s cubic-bezier(.2, 1.4, .4, 1) both, fillin .6s ease both; }
    @keyframes fillin { from { background: var(--cell); } to { background: var(--acc); } }
  `,
})
export class BookproMini {
  private i18n = inject(I18n);
  t = computed(() => T[this.i18n.lang()]);
  two = signal(false);
  rows = [
    { t: '09:00', c1: true, c2: false }, { t: '10:00', c1: true, c2: true }, { t: '11:00', c1: false, c2: true },
    { t: '14:00', c1: true, c2: false }, { t: '15:00', c1: true, c2: true },
  ];
}
