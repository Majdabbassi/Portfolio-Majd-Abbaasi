import { Component, computed, signal } from '@angular/core';

const STEPS = ['Pending', 'Assigned', 'Picked up', 'In transit', 'Delivered'];
const TEXTS = ['waiting for bids', 'driver assigned', 'picked up at vendor', 'on the way', 'delivered'];
const SPOTS = [
  { x: '12%', y: '78%' }, { x: '12%', y: '78%' }, { x: '30%', y: '78%' },
  { x: '62%', y: '40%' }, { x: '86%', y: '22%' },
];

@Component({
  selector: 'app-swiftdeliver-toy',
  template: `
    <div class="panel">
      <div class="map grid-bg">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline points="12,78 30,78 30,40 62,40 62,22 86,22" fill="none" stroke="var(--accent)" stroke-width="0.8" stroke-dasharray="2 2" vector-effect="non-scaling-stroke" />
        </svg>
        <span class="mono place" style="left: 12%; top: 78%">vendor</span>
        <div class="house"></div>
        <span class="mono place" style="left: 86%; top: 22%">customer</span>
        <div class="driver" [style.left]="pos().x" [style.top]="pos().y"><i class="ping"></i><i></i></div>
        <div class="mono status">Order #1042 · {{ text() }}</div>
      </div>
      <div class="panel-foot">
        <div class="steps">
          @for (s of steps; track s; let i = $index) {
            <div class="mono step" [class.done]="i <= step()">{{ s }}</div>
          }
        </div>
        <div class="row">
          <button type="button" class="toy-btn solid grow" (click)="advance()">{{ label() }}</button>
          <button type="button" class="toy-btn" (click)="step.set(0)">Reset</button>
        </div>
        <p class="hint">In the real app the driver's phone posts GPS positions and the customer gets each one instantly over WebSocket.</p>
      </div>
    </div>
  `,
  styles: `
    .map { position: relative; height: 300px; background-color: #17130F; --grid: #2E2620; }
    svg { position: absolute; inset: 0; width: 100%; height: 100%; }
    .place { position: absolute; transform: translate(-50%, 16px); font-size: 11px; color: var(--text-3); }
    .house { position: absolute; left: 86%; top: 22%; width: 22px; height: 22px; transform: translate(-50%, -50%); border-radius: 6px; border: 3px solid var(--accent); }
    .driver { position: absolute; width: 20px; height: 20px; transform: translate(-50%, -50%); transition: left .8s cubic-bezier(.5,0,.3,1), top .8s cubic-bezier(.5,0,.3,1); }
    .driver i { position: absolute; inset: 0; border-radius: 50%; background: var(--accent); }
    .driver i:last-child { border: 3px solid #17130F; }
    .status { position: absolute; left: 16px; top: 16px; padding: 8px 12px; border-radius: 10px; background: rgba(23,19,15,.92); font-size: 13px; color: var(--accent-soft); }
    .steps { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; }
    .step { padding: 8px 4px; border-radius: 8px; text-align: center; font-size: 11px; border: 1px solid #3A322A; color: var(--text-3); transition: all .3s ease; }
    .step.done { background: var(--accent); border-color: var(--accent); color: var(--accent-ink); }
    .row { display: flex; flex-wrap: wrap; gap: 8px; }
    .grow { flex: 1 1 200px; }
    @media (max-width: 480px) { .step { font-size: 9px; } }
  `,
})
export class SwiftdeliverToy {
  steps = STEPS;
  step = signal(0);
  pos = computed(() => SPOTS[this.step()]);
  text = computed(() => TEXTS[this.step()]);
  label = computed(() => (this.step() < 4 ? `Next: ${STEPS[this.step() + 1]}` : 'Delivered — order again'));
  advance() { this.step.update((s) => (s < 4 ? s + 1 : 0)); }
}
