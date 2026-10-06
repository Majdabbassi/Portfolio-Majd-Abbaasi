import { I18n } from '../i18n/i18n';
import { Component, OnDestroy, computed, signal, inject } from '@angular/core';

const LEADS = ['Autohaus Weber', 'Bäckerei Krüger', 'Elektro Schmitt', 'Hotel Lindenhof', 'Zahnarztpraxis Vogel', 'Tischlerei Brandt'];

const TXT = {
  en: { campaign: 'Campaign · Ausbildung 2027', sentN: 'sent', sent: 'sent', waiting: 'waiting', reset: 'Reset', all: 'All sent ✓', stop: 'Stop', launch: 'Launch outreach', resume: 'Resume outreach',
    hint: 'Hit Stop half-way, then launch again: it picks up where it stopped and nobody gets two emails.' },
  fr: { campaign: 'Campagne · Ausbildung 2027', sentN: 'envoyés', sent: 'envoyé', waiting: 'en attente', reset: 'Réinitialiser', all: 'Tout est envoyé ✓', stop: 'Stop', launch: 'Lancer la campagne', resume: 'Reprendre',
    hint: 'Appuyez sur Stop à mi-chemin puis relancez : la campagne reprend où elle s’est arrêtée et personne ne reçoit deux e-mails.' },
};

@Component({
  selector: 'app-reachflow-toy',
  template: `
    <div class="panel">
      <div class="panel-head col">
        <div class="top"><span class="panel-title">{{ t().campaign }}</span><span class="mono count">{{ sent() }} / {{ leads.length }} {{ t().sentN }}</span></div>
        <div class="progress"><div [style.width]="pct()"></div></div>
      </div>
      <div class="list">
        @for (l of leads; track l; let i = $index) {
          <div class="lead" [class.done]="i < sent()">
            <span>{{ l }}</span>
            @if (i < sent()) { <span class="mono sent">✉ {{ t().sent }} · CV.pdf</span> } @else { <span class="mono wait">{{ t().waiting }}</span> }
          </div>
        }
      </div>
      <div class="panel-foot">
        <div class="row">
          <button type="button" class="toy-btn solid grow" (click)="primary()">{{ label() }}</button>
          <button type="button" class="toy-btn" (click)="reset()">{{ t().reset }}</button>
        </div>
        <p class="hint">{{ t().hint }}</p>
      </div>
    </div>
  `,
  styles: `
    .col { flex-direction: column; align-items: stretch; }
    .top { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px; }
    .count { font-size: 13px; color: var(--soft-text); }
    .progress { height: 6px; border-radius: 3px; background: var(--toy-cell); overflow: hidden; }
    .progress div { height: 100%; background: var(--accent); transition: width .4s ease; }
    .list { padding: 12px 20px; display: flex; flex-direction: column; gap: 6px; }
    .lead { display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 40px; padding: 0 12px; border-radius: 10px; transition: background .25s ease; }
    .lead.done { background: color-mix(in oklab, var(--accent) 16%, var(--panel)); }
    .sent { font-size: 12px; color: var(--accent-text); animation: fly .35s ease both; }
    .wait { font-size: 12px; color: var(--text-4); }
    @keyframes fly { 0% { transform: translateX(-12px); opacity: 0; } 100% { transform: none; opacity: 1; } }
    .row { display: flex; flex-wrap: wrap; gap: 8px; }
    .grow { flex: 1 1 200px; }
  `,
})
export class ReachflowToy implements OnDestroy {
  private i18n = inject(I18n);
  t = computed(() => TXT[this.i18n.lang()]);
  leads = LEADS;
  sent = signal(0);
  running = signal(false);
  private timer?: ReturnType<typeof setInterval>;

  pct = computed(() => Math.round((this.sent() / LEADS.length) * 100) + '%');
  label = computed(() => {
    if (this.sent() >= LEADS.length) return this.t().all;
    if (this.running()) return this.t().stop;
    return this.sent() === 0 ? this.t().launch : this.t().resume;
  });

  primary() {
    if (this.sent() >= LEADS.length) return;
    if (this.running()) { this.stop(); return; }
    this.running.set(true);
    this.timer = setInterval(() => {
      this.sent.update((s) => s + 1);
      if (this.sent() >= LEADS.length) this.stop();
    }, 700);
  }

  reset() { this.stop(); this.sent.set(0); }

  private stop() {
    clearInterval(this.timer);
    this.timer = undefined;
    this.running.set(false);
  }

  ngOnDestroy() { this.stop(); }
}
