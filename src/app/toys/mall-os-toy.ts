import { I18n } from '../i18n/i18n';
import { Component, computed, signal, inject } from '@angular/core';

type Lease = 'leased' | 'ending' | 'ended' | 'vacant';

const LEASE: Record<Lease, { label: string; color: string }> = {
  leased: { label: 'Leased', color: '#2E8B5E' },
  ending: { label: 'Lease ends within 90 days', color: '#C9821E' },
  ended: { label: 'Lease ended', color: '#8E2A3C' },
  vacant: { label: 'Vacant', color: '#C8372D' },
};

const TXT = {
  en: { floor: 'Ground floor · {n} units', colour: 'Colour by lease',
    lease: { leased: 'Leased', ending: 'Lease ends within 90 days', ended: 'Lease ended', vacant: 'Vacant' } as Record<string, string>,
    legend: { leased: 'leased', ending: 'ends in 90 days', ended: 'ended', vacant: 'vacant' } as Record<string, string>,
    cat: { Fashion: 'Fashion', 'Café': 'Café', Electronics: 'Electronics', Pharmacy: 'Pharmacy', 'Empty unit': 'Empty unit', Shoes: 'Shoes', Supermarket: 'Supermarket', Kids: 'Kids' } as Record<string, string> },
  fr: { floor: 'Rez-de-chaussée · {n} boutiques', colour: 'Couleur par bail',
    lease: { leased: 'Louée', ending: 'Bail se termine sous 90 jours', ended: 'Bail terminé', vacant: 'Vacante' } as Record<string, string>,
    legend: { leased: 'louée', ending: 'fin sous 90 j', ended: 'terminé', vacant: 'vacante' } as Record<string, string>,
    cat: { Fashion: 'Mode', 'Café': 'Café', Electronics: 'Électronique', Pharmacy: 'Pharmacie', 'Empty unit': 'Local vide', Shoes: 'Chaussures', Supermarket: 'Supermarché', Kids: 'Enfants' } as Record<string, string> },
};

@Component({
  selector: 'app-mall-os-toy',
  template: `
    <div class="panel">
      <div class="panel-head">
        <span class="mono sub">{{ t().floor.replace('{n}', '' + units.length) }}</span>
        <button type="button" class="toy-btn small" [class.is-on]="byLease()" [attr.aria-pressed]="byLease()" (click)="byLease.set(!byLease())">{{ t().colour }}</button>
      </div>
      <div class="plan">
        @for (u of units; track u.code) {
          <button type="button" class="unit mono" [attr.aria-label]="'Unit ' + u.code"
                  [style.grid-column]="u.col" [style.grid-row]="u.row"
                  [style.background]="byLease() ? lease[u.status].color : '#2A3A55'"
                  [class.picked]="picked() === u.code" (click)="picked.set(u.code)">{{ u.code }}</button>
        }
        <div class="corridor mono">CORRIDOR</div>
      </div>
      <div class="panel-foot">
        <div class="sel">
          <span class="panel-title">{{ selected().code }} · {{ t().cat[selected().category] }}</span>
          <span class="mono chip-s" [style.background]="lease[selected().status].color">{{ t().lease[selected().status] }}</span>
        </div>
        <div class="mono legend">
          @for (k of legend; track k) { <span><i [style.background]="lease[k].color"></i>{{ t().legend[k] }}</span> }
        </div>
      </div>
    </div>
  `,
  styles: `
    .sub { font-size: 13px; color: var(--accent-soft); }
    .toy-btn.small { min-height: 40px; font-size: 14px; }
    .plan { padding: 20px; background-color: #121722; display: grid; grid-template-columns: repeat(6, 1fr); grid-template-rows: 78px 78px 34px 78px; gap: 8px;
      background-image: linear-gradient(#1F2838 1px, transparent 1px), linear-gradient(90deg, #1F2838 1px, transparent 1px); background-size: 20px 20px; }
    .unit { border-radius: 6px; border: 2px solid transparent; color: var(--text); font-size: 12px; cursor: pointer; display: flex; align-items: flex-end; padding: 8px;
      transition: background .35s ease, transform .2s ease; }
    .unit:hover { transform: scale(1.03); }
    .unit.picked { border-color: var(--text); }
    .corridor { grid-column: 1 / 7; grid-row: 3; display: flex; align-items: center; justify-content: center; border-radius: 6px; background: #1C2433; font-size: 11px; color: #6E7D99; letter-spacing: .2em; }
    .sel { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: baseline; gap: 8px; }
    .sel .panel-title { font-size: 20px; }
    .chip-s { font-size: 13px; padding: 4px 10px; border-radius: 999px; color: var(--text); }
    .legend { display: flex; flex-wrap: wrap; gap: 16px; font-size: 12px; color: var(--text-3); }
    .legend span { display: inline-flex; align-items: center; gap: 6px; }
    .legend i { width: 10px; height: 10px; border-radius: 3px; }
  `,
})
export class MallOsToy {
  private i18n = inject(I18n);
  t = computed(() => TXT[this.i18n.lang()]);
  lease = LEASE;
  legend: Lease[] = ['leased', 'ending', 'ended', 'vacant'];
  byLease = signal(true);
  picked = signal('A-02');
  units: { code: string; category: string; status: Lease; col: string; row: string }[] = [
    { code: 'A-01', category: 'Fashion', status: 'leased', col: '1 / 3', row: '1 / 3' },
    { code: 'A-02', category: 'Café', status: 'ending', col: '3 / 4', row: '1' },
    { code: 'A-03', category: 'Electronics', status: 'leased', col: '4 / 6', row: '1' },
    { code: 'A-04', category: 'Pharmacy', status: 'leased', col: '6 / 7', row: '1 / 3' },
    { code: 'A-05', category: 'Empty unit', status: 'vacant', col: '3 / 5', row: '2' },
    { code: 'A-06', category: 'Shoes', status: 'ended', col: '5 / 6', row: '2' },
    { code: 'B-01', category: 'Supermarket', status: 'leased', col: '1 / 4', row: '4' },
    { code: 'B-02', category: 'Kids', status: 'ending', col: '4 / 5', row: '4' },
    { code: 'B-03', category: 'Empty unit', status: 'vacant', col: '5 / 7', row: '4' },
  ];
  selected = computed(() => this.units.find((u) => u.code === this.picked()) ?? this.units[0]);
}
