import { I18n } from '../i18n/i18n';
import { Component, computed, signal, inject } from '@angular/core';

const TIMES = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00'];
const TAKEN = new Set(['0-0', '1-0', '3-0', '4-0', '6-0', '1-1', '4-1']);

const TXT = {
  en: { title: 'Salon · Haircut · 30 min', day: 'Saturday', aide: '+1 chair (assistant)', chair: 'Chair', you: 'you ✓', booked: 'booked', free: 'free',
    pick: 'Pick a free slot', done: 'Booked {time} · chair {c} — the salon sees it instantly',
    hint: "Tap a free slot to book. Add the assistant's chair and the salon's capacity doubles — just like in the real app." },
  fr: { title: 'Salon · Coupe · 30 min', day: 'Samedi', aide: '+1 chaise (assistant)', chair: 'Chaise', you: 'vous ✓', booked: 'pris', free: 'libre',
    pick: 'Choisissez un créneau libre', done: 'Réservé {time} · chaise {c} — le salon le voit instantanément',
    hint: 'Touchez un créneau libre pour réserver. Ajoutez la chaise de l’assistant et la capacité du salon double — comme dans la vraie app.' },
};

@Component({
  selector: 'app-bookpro-toy',
  template: `
    <div class="panel">
      <div class="panel-head">
        <div><div class="panel-title">{{ t().title }}</div><div class="mono sub">{{ t().day }}</div></div>
        <button type="button" class="toy-btn small" [class.is-on]="aide()" [attr.aria-pressed]="aide()" (click)="toggleAide()">{{ t().aide }}</button>
      </div>
      <div class="grid" [style.grid-template-columns]="'64px repeat(' + chairs().length + ', 1fr)'">
        <span></span>
        @for (c of chairs(); track c) { <span class="mono label">{{ t().chair }} {{ c + 1 }}</span> }
        @for (tm of times; track tm; let r = $index) {
          <span class="mono time">{{ tm }}</span>
          @for (c of chairs(); track c) {
            @let key = r + '-' + c;
            <button type="button" class="slot mono" [disabled]="taken.has(key)"
                    [class.taken]="taken.has(key)" [class.mine]="mine() === key"
                    (click)="mine.set(mine() === key ? null : key)">
              {{ mine() === key ? t().you : taken.has(key) ? t().booked : t().free }}
            </button>
          }
        }
      </div>
      <div class="panel-foot">
        <span class="panel-title soft">{{ status() }}</span>
        <p class="hint">{{ t().hint }}</p>
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
  private i18n = inject(I18n);
  t = computed(() => TXT[this.i18n.lang()]);
  times = TIMES;
  taken = TAKEN;
  aide = signal(false);
  mine = signal<string | null>(null);
  chairs = computed(() => (this.aide() ? [0, 1] : [0]));
  status = computed(() => {
    const m = this.mine();
    if (!m) return this.t().pick;
    const [r, c] = m.split('-').map(Number);
    return this.t().done.replace('{time}', TIMES[r]).replace('{c}', String(c + 1));
  });
  toggleAide() {
    const turningOff = this.aide();
    this.aide.set(!turningOff);
    if (turningOff && this.mine()?.endsWith('-1')) this.mine.set(null);
  }
}
