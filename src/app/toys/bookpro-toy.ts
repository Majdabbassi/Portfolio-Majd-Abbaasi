import { Component, computed, signal } from '@angular/core';

const TIMES = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00'];
const TAKEN = new Set(['0-0', '1-0', '3-0', '4-0', '6-0', '1-1', '4-1']);

@Component({
  selector: 'app-bookpro-toy',
  template: `
    <div class="panel">
      <div class="panel-head">
        <div><div class="panel-title">Salon · Haircut · 30 min</div><div class="mono sub">Saturday</div></div>
        <button type="button" class="toy-btn small" [class.is-on]="aide()" [attr.aria-pressed]="aide()" (click)="toggleAide()">+1 chair (assistant)</button>
      </div>
      <div class="grid" [style.grid-template-columns]="'64px repeat(' + chairs().length + ', 1fr)'">
        <span></span>
        @for (c of chairs(); track c) { <span class="mono label">Chair {{ c + 1 }}</span> }
        @for (t of times; track t; let r = $index) {
          <span class="mono time">{{ t }}</span>
          @for (c of chairs(); track c) {
            @let key = r + '-' + c;
            <button type="button" class="slot mono" [disabled]="taken.has(key)"
                    [class.taken]="taken.has(key)" [class.mine]="mine() === key"
                    (click)="mine.set(mine() === key ? null : key)">
              {{ mine() === key ? 'you ✓' : taken.has(key) ? 'booked' : 'free' }}
            </button>
          }
        }
      </div>
      <div class="panel-foot">
        <span class="panel-title soft">{{ status() }}</span>
        <p class="hint">Tap a free slot to book. Add the assistant's chair and the salon's capacity doubles — just like in the real app.</p>
      </div>
    </div>
  `,
  styles: `
    .sub { font-size: 12px; color: var(--text-3); }
    .toy-btn.small { min-height: 40px; font-size: 14px; }
    .grid { padding: 16px 20px; display: grid; gap: 8px; }
    .time { font-size: 12px; color: var(--text-3); align-self: center; }
    .slot { min-height: 34px; border-radius: 8px; border: 1px solid var(--accent-line); background: transparent; color: var(--accent-soft); font-size: 12px; cursor: pointer; transition: all .25s ease; }
    .slot.taken { background: #1B2422; border-color: #1B2422; color: #5C6B68; cursor: not-allowed; }
    .slot.mine { background: var(--accent); border-color: var(--accent); color: var(--accent-ink); animation: pop .35s ease; }
    .soft { color: var(--accent-soft); }
  `,
})
export class BookproToy {
  times = TIMES;
  taken = TAKEN;
  aide = signal(false);
  mine = signal<string | null>(null);
  chairs = computed(() => (this.aide() ? [0, 1] : [0]));
  status = computed(() => {
    const m = this.mine();
    if (!m) return 'Pick a free slot';
    const [r, c] = m.split('-').map(Number);
    return `Booked ${TIMES[r]} · chair ${c + 1} — the salon sees it instantly`;
  });
  toggleAide() {
    const turningOff = this.aide();
    this.aide.set(!turningOff);
    if (turningOff && this.mine()?.endsWith('-1')) this.mine.set(null);
  }
}
