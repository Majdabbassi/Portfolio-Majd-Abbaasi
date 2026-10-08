import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { I18n } from '../../../../i18n/i18n';

const TOTAL = 24;
const T = {
  en: { inbox: 'fake inbox', sent: 'sent', sending: 'Sending · one transaction per email', idle: '24 leads · Ausbildung · Berlin', done: '24 of 24 · nobody emailed twice',
    stopped: (n: number, left: number) => 'Stopped at ' + n + ' · relaunch sends only the ' + left + ' left',
    stop: 'Stop', reset: 'Reset', relaunch: 'Relaunch', launch: 'Launch campaign' },
  fr: { inbox: 'fausse boîte', sent: 'envoyé', sending: 'Envoi · une transaction par e-mail', idle: '24 prospects · Ausbildung · Berlin', done: '24 sur 24 · personne n’a reçu deux e-mails',
    stopped: (n: number, left: number) => 'Arrêté à ' + n + ' · relancer n’envoie que les ' + left + ' restants',
    stop: 'Stop', reset: 'Réinitialiser', relaunch: 'Relancer', launch: 'Lancer la campagne' },
};

/** ReachFlow: launch, stop halfway, relaunch — nobody gets the same email twice. */
@Component({
  selector: 'app-reachflow-mini',
  template: `
    <div class="scene">
      <div class="leads">
        @for (l of leads; track l; let i = $index) {
          <div class="lead mono" [class.sent]="sent() > i * 4"><span>{{ l }}</span><span>{{ sent() > i * 4 ? t().sent : '·' }}</span></div>
        }
      </div>
      <div class="inbox" [class.flying]="running()">
        <span class="env"></span><span class="env"></span><span class="env"></span>
        <small class="mono">{{ t().inbox }}</small>
        <strong>{{ sent() }}<span> / {{ total }}</span></strong>
        <div class="bar"><i [style.width]="(sent() / total) * 100 + '%'"></i></div>
      </div>
    </div>
    <div class="controls">
      <button type="button" class="play" (click)="go()">{{ label() }}</button>
      <span class="readout">{{ text() }}</span>
    </div>
  `,
  styleUrl: './mini.css',
  styles: `
    .scene { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; align-items: stretch; }
    .leads { display: flex; flex-direction: column; gap: 5px; }
    .lead { display: flex; justify-content: space-between; font-size: 11px; padding: 6px 8px; border-radius: 8px; background: var(--cell); color: var(--text-2); transition: background .3s ease, color .3s ease; }
    .lead.sent { background: var(--acc-soft); color: var(--acc-text); }
    .inbox { position: relative; display: flex; flex-direction: column; justify-content: center; gap: 8px; padding: 12px; border-radius: 12px; border: 1px solid var(--acc-line); overflow: hidden; }
    .inbox strong { font-size: 34px; line-height: 1; letter-spacing: -.02em; }
    .inbox strong span { font-size: 18px; color: var(--text-3); }
    .inbox small { font-size: 11px; color: var(--text-3); }
    .bar { height: 8px; border-radius: 4px; background: var(--cell); overflow: hidden; }
    .bar i { display: block; height: 100%; background: var(--acc); transition: width .4s ease; }
    .env { position: absolute; left: -30px; top: 30%; width: 22px; height: 15px; border-radius: 3px; background: var(--acc); opacity: 0; }
    .flying .env { animation: fly 1.2s ease-in infinite; }
    .flying .env:nth-child(2) { animation-delay: .4s; top: 48%; }
    .flying .env:nth-child(3) { animation-delay: .8s; top: 62%; }
    @keyframes fly { 0% { left: -30px; opacity: 0; } 15% { opacity: 1; } 85% { opacity: 1; } 100% { left: calc(100% + 10px); opacity: 0; } }
  `,
})
export class ReachflowMini {
  private i18n = inject(I18n);
  t = computed(() => T[this.i18n.lang()]);
  total = TOTAL;
  leads = ['Bäckerei Roth', 'Autohaus Kern', 'IT Nord GmbH', 'Praxis Lang', 'Hotel Spree', 'Elektro Fux'];
  sent = signal(0);
  running = signal(false);
  private timer?: ReturnType<typeof setInterval>;

  label = computed(() => (this.running() ? this.t().stop : this.sent() >= TOTAL ? this.t().reset : this.sent() > 0 ? this.t().relaunch : this.t().launch));
  text = computed(() => {
    const n = this.sent();
    if (this.running()) return this.t().sending;
    if (n === 0) return this.t().idle;
    if (n >= TOTAL) return this.t().done;
    return this.t().stopped(n, TOTAL - n);
  });

  constructor() { inject(DestroyRef).onDestroy(() => clearInterval(this.timer)); }

  go() {
    if (this.running()) { this.stop(); return; }
    if (this.sent() >= TOTAL) { this.sent.set(0); return; }
    this.running.set(true);
    this.timer = setInterval(() => {
      this.sent.update((n) => n + 1);
      if (this.sent() >= TOTAL) this.stop();
    }, 380);
  }

  private stop() {
    clearInterval(this.timer);
    this.running.set(false);
  }
}
