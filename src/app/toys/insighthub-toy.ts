import { I18n } from '../i18n/i18n';
import { Component, signal, computed, inject } from '@angular/core';

const TXT = {
  en: { rows: '5 rows', found: '4 roles found · 1 outlier (IQR)', notYet: 'not analysed yet', outlier: 'outlier', reset: 'Reset', analyse: 'Analyse this CSV',
    hint: 'Each column gets a role, not just a type — and that role decides what gets charted, how gaps are filled, and which columns are never "cleaned".' },
  fr: { rows: '5 lignes', found: '4 rôles trouvés · 1 valeur aberrante (IQR)', notYet: 'pas encore analysé', outlier: 'aberrante', reset: 'Réinitialiser', analyse: 'Analyser ce CSV',
    hint: 'Chaque colonne reçoit un rôle, pas juste un type — et ce rôle décide quoi afficher, comment combler les trous, et quelles colonnes ne jamais « nettoyer ».' },
};

@Component({
  selector: 'app-insighthub-toy',
  template: `
    <div class="panel">
      <div class="panel-head">
        <span class="mono sub">orders.csv · {{ t().rows }}</span>
        <span class="mono meta">{{ analysed() ? t().found : t().notYet }}</span>
      </div>
      <div class="scroll">
        <div class="mono table">
          @for (c of cols; track c.name; let i = $index) {
            <div class="col">
              <div class="head">{{ c.name }}</div>
              @if (analysed()) { <span class="role" [style.animation-delay]="i * 0.15 + 's'">{{ c.role }}</span> }
              @for (v of c.cells; track $index; let j = $index) {
                <div class="cell" [class.outlier]="analysed() && c.outlier === j">{{ v }}@if (analysed() && c.outlier === j) {<span> ⚑ {{ t().outlier }}</span>}</div>
              }
            </div>
          }
        </div>
      </div>
      <div class="panel-foot">
        <button type="button" class="toy-btn solid" [attr.aria-pressed]="analysed()" (click)="analysed.set(!analysed())">{{ analysed() ? t().reset : t().analyse }}</button>
        <p class="hint">{{ t().hint }}</p>
      </div>
    </div>
  `,
  styles: `
    .sub { font-size: 13px; color: var(--soft-text); }
    .meta { font-size: 12px; color: var(--text-3); }
    .scroll { padding: 16px 20px; overflow-x: auto; }
    .table { min-width: 420px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; font-size: 13px; }
    .col { display: flex; flex-direction: column; gap: 6px; }
    .head { color: var(--text); font-weight: 600; padding: 6px 8px; }
    .role { align-self: flex-start; padding: 3px 8px; border-radius: 6px; background: var(--accent); color: var(--accent-ink); font-size: 11px; font-weight: 600; animation: pop .4s ease both; }
    .cell { padding: 6px 8px; border-radius: 6px; background: var(--toy-cell); color: var(--text-2); transition: background .3s ease, color .3s ease; white-space: nowrap; }
    .cell.outlier { background: var(--bad-bg); color: var(--bad-text); }
  `,
})
export class InsighthubToy {
  private i18n = inject(I18n);
  t = computed(() => TXT[this.i18n.lang()]);
  analysed = signal(false);
  cols: { name: string; role: string; cells: string[]; outlier?: number }[] = [
    { name: 'order_id', role: 'IDENTIFIER', cells: ['A-1001', 'A-1002', 'A-1003', 'A-1004', 'A-1005'] },
    { name: 'created_at', role: 'TEMPORAL', cells: ['2025-03-01', '2025-03-01', '2025-03-02', '2025-03-04', '2025-03-05'] },
    { name: 'city', role: 'CATEGORICAL', cells: ['Sousse', 'Tunis', 'Sousse', 'Sfax', 'Tunis'] },
    { name: 'price', role: 'NUMERIC', cells: ['42.5', '38.0', '9999', '45.2', '40.1'], outlier: 2 },
  ];
}
