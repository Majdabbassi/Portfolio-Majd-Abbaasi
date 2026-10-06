import { Component, computed, signal } from '@angular/core';

interface Booking { from: number; to: number; id: string; }
const WANT = { from: 4, to: 6 };
const FLEET: { name: string; busy: Booking[] }[] = [
  { name: 'Clio', busy: [{ from: 1, to: 2, id: 'C-07' }, { from: 8, to: 10, id: 'C-15' }] },
  { name: 'Polo', busy: [{ from: 3, to: 5, id: 'C-12' }] },
  { name: 'i20', busy: [{ from: 6, to: 9, id: 'C-14' }] },
  { name: '208', busy: [{ from: 2, to: 4, id: 'C-09' }, { from: 7, to: 8, id: 'C-16' }] },
];

@Component({
  selector: 'app-car-rental-toy',
  template: `
    <div class="panel">
      <div class="panel-head">
        <span class="panel-title">New contract · days 4 → 6</span>
        <span class="mono sub">pick a car to book</span>
      </div>
      <div class="body">
        <div class="mono days">
          <span></span>
          @for (d of days; track d) { <span [class.want]="d >= 4 && d <= 6">{{ d }}</span> }
        </div>
        @for (car of fleet; track car.name) {
          <div class="lane-row">
            <span class="mono name">{{ car.name }}</span>
            <div class="lane" [class.shake]="refused() === car.name" [attr.data-tick]="tick()">
              <div class="window"></div>
              @for (b of car.busy; track b.id) {
                <div class="bar mono" [style.left]="left(b)" [style.width]="width(b)">{{ b.id }}</div>
              }
              @if (booked() === car.name) {
                <div class="bar mono new" [style.left]="left(want)" [style.width]="width(want)">NEW</div>
              }
            </div>
          </div>
        }
        <div class="buttons">
          @for (car of fleet; track car.name) {
            <button type="button" class="toy-btn" (click)="book(car)">Book {{ car.name }}</button>
          }
        </div>
      </div>
      <div class="panel-foot">
        <span class="panel-title" [style.color]="msg().color">{{ msg().text }}</span>
        <p class="hint">The real API locks the car while it checks, so even 8 people booking at the same second can't double-book it.</p>
      </div>
    </div>
  `,
  styles: `
    .sub { font-size: 12px; color: var(--text-3); }
    .body { padding: 16px 20px; display: flex; flex-direction: column; gap: 10px; }
    .days, .lane-row { display: grid; grid-template-columns: 56px 1fr; align-items: center; }
    .days { grid-template-columns: 56px repeat(10, 1fr); font-size: 11px; color: var(--text-4); }
    .days .want { color: var(--accent); }
    .name { font-size: 12px; color: var(--text-2); }
    .lane { position: relative; height: 30px; border-radius: 6px; background: #2A2618; }
    .window { position: absolute; top: 0; bottom: 0; left: 30%; width: 30%; background: rgba(242,201,76,.08); border-left: 1px dashed var(--accent-line); border-right: 1px dashed var(--accent-line); }
    .bar { position: absolute; top: 4px; bottom: 4px; border-radius: 4px; background: #8C7A3A; color: var(--accent-ink); font-size: 10px; display: flex; align-items: center; padding-left: 6px; overflow: hidden; white-space: nowrap; }
    .bar.new { background: var(--accent); transform-origin: left; animation: grow .5s ease both; }
    .shake { animation: shake .3s ease 2; }
    @keyframes grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
    @keyframes shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }
    .buttons { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 6px; }
    .buttons .toy-btn { min-height: 44px; font-size: 14px; padding: 0 8px; }
    @media (max-width: 480px) { .buttons { grid-template-columns: repeat(2, 1fr); } }
  `,
})
export class CarRentalToy {
  fleet = FLEET;
  want = { ...WANT, id: 'NEW' };
  days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  booked = signal<string | null>(null);
  refused = signal<string | null>(null);
  clash = signal<string | null>(null);
  tick = signal(0);

  left = (b: { from: number }) => (b.from - 1) * 10 + '%';
  width = (b: { from: number; to: number }) => (b.to - b.from + 1) * 10 + '%';

  book(car: { name: string; busy: Booking[] }) {
    const hit = car.busy.find((b) => b.from <= WANT.to && b.to >= WANT.from);
    if (hit) {
      // reset first so the shake animation replays on every click
      this.refused.set(null);
      requestAnimationFrame(() => { this.refused.set(car.name); this.clash.set(hit.id); this.tick.update((t) => t + 1); });
    } else {
      this.booked.set(car.name); this.refused.set(null); this.clash.set(null);
    }
  }

  msg = computed(() => {
    if (this.refused()) return { text: `Refused — ${this.refused()} clashes with contract ${this.clash()}`, color: '#F28B82' };
    if (this.booked()) return { text: `Booked ${this.booked()}, days 4 → 6 ✓`, color: '#9EE0A8' };
    return { text: 'Which car is free from day 4 to day 6?', color: 'var(--accent-soft)' };
  });
}
