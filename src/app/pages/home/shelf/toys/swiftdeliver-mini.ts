import { Component, computed, inject, signal } from '@angular/core';
import { I18n } from '../../../../i18n/i18n';

const T = {
  en: { steps: ['Assigned', 'Picked up', 'In transit', 'Delivered'], next: 'Next step', again: 'New order',
    text: ['driver.hamza got it from the scoring engine', 'Picked up · Karim notified over STOMP', 'Live position · only Karim and the shop see it', 'Delivered · rating unlocked'] },
  fr: { steps: ['Assignée', 'Récupérée', 'En route', 'Livrée'], next: 'Étape suivante', again: 'Nouvelle commande',
    text: ['driver.hamza l’a eue via le moteur de scoring', 'Récupérée · Karim prévenu via STOMP', 'Position en direct · seuls Karim et la boutique la voient', 'Livrée · notation débloquée'] },
};
const POS = [[8, 72], [35, 30], [62, 62], [90, 22]];

/** SwiftDeliver: the rider moves along the route, step by step. */
@Component({
  selector: 'app-swiftdeliver-mini',
  template: `
    <div class="scene paper">
      <svg class="route" viewBox="0 0 400 160" preserveAspectRatio="none" aria-hidden="true">
        <path d="M32 115 C 80 115, 100 48, 140 48 S 210 99, 248 99 S 330 35, 360 35" vector-effect="non-scaling-stroke" />
      </svg>
      <div class="area">
        <span class="pin" style="left: 8%; top: 72%"></span>
        <span class="pin end" style="left: 90%; top: 22%"></span>
        <span class="rider" [style.left]="pos()[0] + '%'" [style.top]="pos()[1] + '%'"><i></i></span>
      </div>
      <div class="steps">
        @for (s of t().steps; track $index; let i = $index) {
          <span class="step mono" [class.done]="i < step()" [class.now]="i === step()">{{ s }}</span>
        }
      </div>
    </div>
    <div class="controls">
      <button type="button" class="play" (click)="step.set((step() + 1) % 4)">{{ step() === 3 ? t().again : t().next }}</button>
      <span class="readout">{{ t().text[step()] }}</span>
    </div>
  `,
  styleUrl: './mini.css',
  styles: `
    .route { position: absolute; inset: 18px 18px 52px 18px; width: calc(100% - 36px); height: calc(100% - 70px); }
    .route path { fill: none; stroke: var(--acc); stroke-width: 3; stroke-dasharray: 7 8; animation: dash 1.4s linear infinite; }
    .area { position: absolute; inset: 18px 18px 52px 18px; }
    .pin { position: absolute; width: 14px; height: 14px; margin: -7px 0 0 -7px; border-radius: 50%; border: 3px solid var(--acc); background: var(--stage); }
    .pin.end { border-color: var(--lamp); }
    .rider { position: absolute; width: 22px; height: 22px; margin: -11px 0 0 -11px; border-radius: 50%; background: var(--acc); box-shadow: 0 0 0 5px var(--acc-soft); transition: left .9s cubic-bezier(.5, 0, .2, 1), top .9s cubic-bezier(.5, 0, .2, 1); }
    .rider i { position: absolute; inset: 0; border-radius: 50%; border: 2px solid var(--acc); animation: ping 1.6s ease-out infinite; }
    .steps { position: absolute; left: 16px; right: 16px; bottom: 8px; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px; }
    .step { font-size: 10px; text-align: center; padding: 6px 4px; border-radius: 8px; background: var(--cell); color: var(--text-3); transition: background .4s ease, color .4s ease; }
    .step.done { background: var(--acc-soft); color: var(--acc-text); }
    .step.now { background: var(--btn); color: var(--btn-ink); }
    @keyframes dash { to { stroke-dashoffset: -30; } }
  `,
})
export class SwiftdeliverMini {
  private i18n = inject(I18n);
  t = computed(() => T[this.i18n.lang()]);
  step = signal(0);
  pos = computed(() => POS[this.step()]);
}
