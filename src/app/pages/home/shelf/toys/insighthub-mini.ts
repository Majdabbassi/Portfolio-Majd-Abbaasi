import { Component, computed, inject, signal } from '@angular/core';
import { I18n } from '../../../../i18n/i18n';

const T = {
  en: { go: 'Analyse', reset: 'Reset', score: 'quality 82 · B', outlier: '1 outlier · price 9 999', idle: 'orders.csv · 4 rows · 3 columns' },
  fr: { go: 'Analyser', reset: 'Réinitialiser', score: 'qualité 82 · B', outlier: '1 valeur aberrante · prix 9 999', idle: 'orders.csv · 4 lignes · 3 colonnes' },
};

/** InsightHub: analyse a CSV, every column gets a role and the outlier lights up. */
@Component({
  selector: 'app-insighthub-mini',
  template: `
    <div class="scene">
      <div class="csv mono">
        @for (c of cols; track c.name; let ci = $index) {
          <div class="col" [class.on]="on()">
            <b>{{ c.name }}</b>
            @for (v of c.cells; track $index; let ri = $index) { <span [class.out]="on() && ci === 2 && ri === 2">{{ v }}</span> }
            <em class="role">{{ c.role }}</em>
          </div>
        }
      </div>
    </div>
    <div class="controls">
      <button type="button" class="play" (click)="on.set(!on())">{{ on() ? t().reset : t().go }}</button>
      @if (on()) {
        <span class="score mono">{{ t().score }} <span class="readout">{{ t().outlier }}</span></span>
      } @else {
        <span class="readout">{{ t().idle }}</span>
      }
    </div>
  `,
  styleUrl: './mini.css',
  styles: `
    .csv { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; height: 100%; }
    .col { display: flex; flex-direction: column; gap: 4px; padding: 8px; border-radius: 10px; background: var(--cell); font-size: 12px; color: var(--text-2); transition: box-shadow .4s ease; }
    .col b { font-weight: 600; color: var(--text); font-size: 12px; }
    .col span { padding: 2px 4px; border-radius: 4px; transition: background .4s ease, color .4s ease; }
    .col span.out { background: var(--bad); color: #2a0e0c; }
    :host-context([data-theme='light']) .col span.out { color: #fff; }
    .role { font-style: normal; margin-top: auto; font-size: 10px; padding: 4px 6px; border-radius: 6px; background: var(--btn); color: var(--btn-ink); opacity: 0; transform: translateY(6px); transition: opacity .4s ease, transform .4s ease; }
    .col.on .role { opacity: 1; transform: none; }
    .col.on { box-shadow: inset 0 0 0 1px var(--acc-line); }
    .col:nth-child(2) .role { transition-delay: .25s; }
    .col:nth-child(3) .role { transition-delay: .5s; }
    .score { display: inline-flex; flex-wrap: wrap; align-items: baseline; gap: 6px; font-weight: 600; font-size: 13px; color: var(--acc-text); animation: pop .5s ease .7s both; }
  `,
})
export class InsighthubMini {
  private i18n = inject(I18n);
  t = computed(() => T[this.i18n.lang()]);
  on = signal(false);
  cols = [
    { name: 'order_id', role: 'IDENTIFIER', cells: ['1001', '1002', '1003', '1004'] },
    { name: 'date', role: 'TEMPORAL', cells: ['03-01', '03-02', '03-02', '03-04'] },
    { name: 'price', role: 'NUMERIC', cells: ['42.5', '39.0', '9 999', '41.0'] },
  ];
}
