import { Component, OnDestroy, computed, signal } from '@angular/core';

const LEADS = ['Autohaus Weber', 'Bäckerei Krüger', 'Elektro Schmitt', 'Hotel Lindenhof', 'Zahnarztpraxis Vogel', 'Tischlerei Brandt'];

@Component({
  selector: 'app-reachflow-toy',
  template: `
    <div class="panel">
      <div class="panel-head col">
        <div class="top"><span class="panel-title">Campaign · Ausbildung 2027</span><span class="mono count">{{ sent() }} / {{ leads.length }} sent</span></div>
        <div class="progress"><div [style.width]="pct()"></div></div>
      </div>
      <div class="list">
        @for (l of leads; track l; let i = $index) {
          <div class="lead" [class.done]="i < sent()">
            <span>{{ l }}</span>
            @if (i < sent()) { <span class="mono sent">✉ sent · CV.pdf</span> } @else { <span class="mono wait">waiting</span> }
          </div>
        }
      </div>
      <div class="panel-foot">
        <div class="row">
          <button type="button" class="toy-btn solid grow" (click)="primary()">{{ label() }}</button>
          <button type="button" class="toy-btn" (click)="reset()">Reset</button>
        </div>
        <p class="hint">Hit Stop half-way, then launch again: it picks up where it stopped and nobody gets two emails.</p>
      </div>
    </div>
  `,
  styles: `
    .col { flex-direction: column; align-items: stretch; }
    .top { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px; }
    .count { font-size: 13px; color: var(--accent-soft); }
    .progress { height: 6px; border-radius: 3px; background: #1E2A33; overflow: hidden; }
    .progress div { height: 100%; background: var(--accent); transition: width .4s ease; }
    .list { padding: 12px 20px; display: flex; flex-direction: column; gap: 6px; }
    .lead { display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 40px; padding: 0 12px; border-radius: 10px; transition: background .25s ease; }
    .lead.done { background: #17303D; }
    .sent { font-size: 12px; color: var(--accent); animation: fly .35s ease both; }
    .wait { font-size: 12px; color: #6E7D88; }
    @keyframes fly { 0% { transform: translateX(-12px); opacity: 0; } 100% { transform: none; opacity: 1; } }
    .row { display: flex; flex-wrap: wrap; gap: 8px; }
    .grow { flex: 1 1 200px; }
  `,
})
export class ReachflowToy implements OnDestroy {
  leads = LEADS;
  sent = signal(0);
  running = signal(false);
  private timer?: ReturnType<typeof setInterval>;

  pct = computed(() => Math.round((this.sent() / LEADS.length) * 100) + '%');
  label = computed(() => {
    if (this.sent() >= LEADS.length) return 'All sent ✓';
    if (this.running()) return 'Stop';
    return this.sent() === 0 ? 'Launch outreach' : 'Resume outreach';
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
