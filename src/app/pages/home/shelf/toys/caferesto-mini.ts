import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { I18n } from '../../../../i18n/i18n';

interface Ticket { id: number; item: number; table: number; stage: 0 | 1 | 2 }
const T = {
  en: { lanes: ['New', 'Preparing', 'Ready'], items: ['Latte', 'Cappuccino', 'Iced latte', 'Flat white'], table: 'table', milk: 'milk', low: 'low → manager',
    scan: 'Scan table QR · ', restock: 'Restock (manager)', lowText: 'Stock below threshold → manager notified', text: 'STOMP → kitchen screen · stock −1 per order' },
  fr: { lanes: ['Nouveau', 'En préparation', 'Prêt'], items: ['Latte', 'Cappuccino', 'Latte glacé', 'Flat white'], table: 'table', milk: 'lait', low: 'bas → gérant',
    scan: 'Scanner le QR · ', restock: 'Réapprovisionner (gérant)', lowText: 'Stock sous le seuil → gérant prévenu', text: 'STOMP → écran cuisine · stock −1 par commande' },
};

/** CaféResto: an order from the table lands in the kitchen, moves to Ready, and the stock follows. */
@Component({
  selector: 'app-caferesto-mini',
  template: `
    <div class="scene">
      <div class="board">
        @for (lane of t().lanes; track $index; let s = $index) {
          <div class="lane">
            <b class="mono">{{ lane }}</b>
            @for (k of inLane(s); track k.id) {
              <div class="ticket" [class.ready]="k.stage === 2">{{ t().items[k.item] }}<small class="mono">{{ t().table }} {{ k.table }} · #{{ k.id }}</small></div>
            }
          </div>
        }
      </div>
      <div class="stock mono">
        <span>{{ t().milk }}</span>
        <div class="bar"><i [class.low]="low()" [style.width]="stock() + '%'"></i></div>
        @if (low()) { <span class="alert">{{ t().low }}</span> } @else { <span>{{ stock() }}%</span> }
      </div>
    </div>
    <div class="controls">
      <button type="button" class="play" (click)="order()">{{ empty() ? t().restock : t().scan + t().items[(next() - 1) % 4] }}</button>
      <span class="readout">{{ low() ? t().lowText : t().text }}</span>
    </div>
  `,
  styleUrl: './mini.css',
  styles: `
    .board { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; height: 150px; }
    .lane { display: flex; flex-direction: column; gap: 6px; padding: 8px; border-radius: 10px; background: var(--cell); min-width: 0; }
    .lane b { font-size: 10px; font-weight: 600; color: var(--text-3); text-transform: uppercase; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .ticket { padding: 6px 7px; border-radius: 8px; background: var(--surface); box-shadow: 0 2px 0 var(--acc-line); font-size: 11px; color: var(--text); animation: slidein .4s cubic-bezier(.2, 1.2, .4, 1) both; }
    .ticket small { display: block; color: var(--text-3); font-size: 10px; }
    .ticket.ready { background: var(--acc); color: oklch(.2 .04 var(--h)); }
    :host-context([data-theme='light']) .ticket.ready { color: #fff; }
    .ticket.ready small { color: inherit; opacity: .8; }
    .stock { margin-top: 10px; display: grid; grid-template-columns: auto 1fr auto; gap: 10px; align-items: center; font-size: 12px; color: var(--text-2); }
    .bar { height: 10px; border-radius: 5px; background: var(--cell); overflow: hidden; }
    .bar i { display: block; height: 100%; background: var(--acc); transition: width .4s ease; }
    .bar i.low { background: var(--bad); }
    .alert { font-size: 11px; font-weight: 600; color: var(--bad); animation: blink 1s steps(1) infinite; }
  `,
})
export class CaferestoMini {
  private i18n = inject(I18n);
  t = computed(() => T[this.i18n.lang()]);
  tickets = signal<Ticket[]>([]);
  next = signal(1);
  stock = signal(100);
  low = computed(() => this.stock() < 40);
  empty = computed(() => this.stock() <= 16);
  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor() { inject(DestroyRef).onDestroy(() => this.timers.forEach(clearTimeout)); }

  inLane(stage: number) { return this.tickets().filter((k) => k.stage === stage).slice(-2); }

  order() {
    if (this.empty()) { this.stock.set(100); this.tickets.set([]); return; }
    const n = this.next();
    const id = 40 + n;
    this.tickets.update((list) => [...list, { id, item: (n - 1) % 4, table: 1 + (n % 6), stage: 0 }]);
    this.next.set(n + 1);
    this.stock.update((s) => s - 14);
    this.timers.push(setTimeout(() => this.move(id, 1), 1200), setTimeout(() => this.move(id, 2), 2600));
  }

  private move(id: number, stage: 1 | 2) {
    let list = this.tickets().map((k) => (k.id === id ? { ...k, stage } : k));
    const ready = list.filter((k) => k.stage === 2);
    if (ready.length > 2) list = list.filter((k) => k.id !== ready[0].id);
    this.tickets.set(list);
  }
}
