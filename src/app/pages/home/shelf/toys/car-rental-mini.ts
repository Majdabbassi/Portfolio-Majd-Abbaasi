import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { I18n } from '../../../../i18n/i18n';

type Phase = 0 | 1 | 2; // ready, racing, done
const T = {
  en: { month: 'June', go: 'Book June 6–8 twice at once', racing: 'Racing…', reset: 'Reset', won: 'SELECT … FOR UPDATE · one winner', idle: 'June 2–4 already booked',
    reception: 'reception · 6→8', manager: 'manager · 6→8', ready: 'ready', wait: 'waiting for the row lock…', ok: '200 · booked CT-1043', no: '409 · already booked' },
  fr: { month: 'Juin', go: 'Réserver le 6–8 juin ×2 en même temps', racing: 'Course…', reset: 'Réinitialiser', won: 'SELECT … FOR UPDATE · un seul gagnant', idle: '2–4 juin déjà réservés',
    reception: 'réception · 6→8', manager: 'gérant · 6→8', ready: 'prêt', wait: 'attend le verrou de ligne…', ok: '200 · réservée CT-1043', no: '409 · déjà réservée' },
};

/** Car Rental: two people book the same car at the same time — the row lock lets exactly one win. */
@Component({
  selector: 'app-car-rental-mini',
  template: `
    <div class="scene">
      <div class="carline mono"><span>Peugeot 3008 · TN-2275-C</span><span>{{ t().month }}</span></div>
      <div class="days">
        @for (d of days; track d) {
          <span class="day" [class.taken]="d >= 2 && d <= 4" [class.pending]="d >= 6 && d <= 8 && phase() === 1" [class.won]="d >= 6 && d <= 8 && phase() === 2"><b class="mono">{{ d }}</b></span>
        }
      </div>
      <div class="reqs mono">
        <div class="req" [class.wait]="phase() === 1" [class.ok]="phase() === 2"><span>{{ t().reception }}</span><span class="st">{{ phase() === 0 ? t().ready : phase() === 1 ? t().wait : t().ok }}</span></div>
        <div class="req" [class.wait]="phase() === 1" [class.no]="phase() === 2"><span>{{ t().manager }}</span><span class="st">{{ phase() === 0 ? t().ready : phase() === 1 ? t().wait : t().no }}</span></div>
      </div>
    </div>
    <div class="controls">
      <button type="button" class="play" [disabled]="phase() === 1" (click)="go()">{{ phase() === 0 ? t().go : phase() === 1 ? t().racing : t().reset }}</button>
      <span class="readout">{{ phase() === 2 ? t().won : t().idle }}</span>
    </div>
  `,
  styleUrl: './mini.css',
  styles: `
    .carline { display: flex; justify-content: space-between; font-size: 12px; color: var(--text-2); margin-bottom: 8px; }
    .days { display: grid; grid-template-columns: repeat(10, minmax(0, 1fr)); gap: 4px; }
    .day { height: 46px; border-radius: 8px; background: var(--cell); display: flex; align-items: flex-end; justify-content: center; padding-bottom: 4px; transition: background .4s ease; }
    .day b { font-weight: 400; font-size: 10px; color: var(--text-3); }
    .day.taken { background: var(--line-3); }
    .day.taken b { color: var(--text); }
    .day.pending { background: var(--acc-soft); animation: blink .6s steps(1) infinite; }
    .day.won { background: var(--acc); animation: drop .5s ease both; }
    .day.won b { color: oklch(.2 .04 var(--h)); }
    :host-context([data-theme='light']) .day.won b { color: #fff; }
    .reqs { display: flex; flex-direction: column; gap: 6px; margin-top: 12px; }
    .req { display: flex; justify-content: space-between; gap: 10px; padding: 8px 10px; border-radius: 9px; border: 1px solid var(--line-2); font-size: 12px; color: var(--text-2); transition: border-color .4s ease, background .4s ease; }
    .req.ok { border-color: var(--acc); background: var(--acc-soft); color: var(--acc-text); }
    .req.no { border-color: var(--bad); color: var(--bad); }
    .req.wait .st { animation: blink .7s steps(1) infinite; }
  `,
})
export class CarRentalMini {
  private i18n = inject(I18n);
  t = computed(() => T[this.i18n.lang()]);
  days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  phase = signal<Phase>(0);
  private timer?: ReturnType<typeof setTimeout>;

  constructor() { inject(DestroyRef).onDestroy(() => clearTimeout(this.timer)); }

  go() {
    if (this.phase() === 2) { this.phase.set(0); return; }
    this.phase.set(1);
    this.timer = setTimeout(() => this.phase.set(2), 1100);
  }
}
