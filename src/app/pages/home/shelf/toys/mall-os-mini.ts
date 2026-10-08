import { Component, computed, inject, signal } from '@angular/core';
import { I18n } from '../../../../i18n/i18n';

type Lease = 'leased' | 'ending' | 'ended' | 'vacant' | 'corridor';
const T = {
  en: { show: 'Show leases', hide: 'Hide leases', idle: 'Floor plan traced as polygons · 8 units', corridor: 'corridor', keys: ['leased', 'ends < 90 d', 'ended', 'vacant'] },
  fr: { show: 'Voir les baux', hide: 'Masquer les baux', idle: 'Plan tracé en polygones · 8 boutiques', corridor: 'couloir', keys: ['loué', 'fin < 90 j', 'terminé', 'vacant'] },
};

/** Mall OS: the floor plan recolours by lease status. */
@Component({
  selector: 'app-mall-os-mini',
  template: `
    <div class="scene">
      <div class="plan">
        @for (u of units; track u.code) {
          <span class="unit" [class]="'unit ' + (u.lease === 'corridor' ? 'corridor' : on() ? u.lease : 'plain')" [style.grid-column]="'span ' + u.span">
            <b class="mono">{{ u.lease === 'corridor' ? t().corridor : u.code }}</b>
          </span>
        }
      </div>
    </div>
    <div class="controls">
      <button type="button" class="play" (click)="on.set(!on())">{{ on() ? t().hide : t().show }}</button>
      @if (on()) {
        <div class="keys mono">
          <span><i style="background: var(--acc)"></i>{{ t().keys[0] }}</span>
          <span><i style="background: var(--lamp)"></i>{{ t().keys[1] }}</span>
          <span><i style="background: var(--bad)"></i>{{ t().keys[2] }}</span>
          <span><i class="vac"></i>{{ t().keys[3] }}</span>
        </div>
      } @else {
        <span class="readout">{{ t().idle }}</span>
      }
    </div>
  `,
  styleUrl: './mini.css',
  styles: `
    .plan { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); grid-template-rows: repeat(3, minmax(0, 1fr)); gap: 6px; height: 100%; padding-bottom: 4px; }
    .unit { display: flex; align-items: flex-end; padding: 6px 8px; border-radius: 8px; border: 1px solid var(--acc-line); background: var(--cell); transition: background .5s ease, border-color .5s ease; }
    .unit b { font-weight: 400; font-size: 11px; color: var(--text-2); transition: color .5s ease; }
    .unit.corridor { border: 0; background: repeating-linear-gradient(90deg, var(--gridc) 0 10px, transparent 10px 20px); align-items: center; justify-content: center; }
    .unit.corridor b { color: var(--text-4); }
    .unit.leased { background: var(--acc); border-color: var(--acc); }
    .unit.leased b { color: oklch(.2 .04 var(--h)); }
    :host-context([data-theme='light']) .unit.leased b { color: #fff; }
    .unit.ending { background: var(--lamp); border-color: var(--lamp); }
    .unit.ending b { color: var(--lamp-ink); }
    .unit.ended { background: var(--bad); border-color: var(--bad); }
    .unit.ended b { color: #2a0e0c; }
    :host-context([data-theme='light']) .unit.ended b { color: #fff; }
    .unit.vacant { background: transparent; border: 2px dashed var(--line-3); }
    .unit.plain:hover { border-color: var(--acc); }
    .keys { display: flex; flex-wrap: wrap; gap: 10px; font-size: 11px; color: var(--text-3); }
    .keys span { display: inline-flex; align-items: center; gap: 6px; }
    .keys i { width: 10px; height: 10px; border-radius: 3px; }
    .keys i.vac { border: 2px dashed var(--line-3); }
  `,
})
export class MallOsMini {
  private i18n = inject(I18n);
  t = computed(() => T[this.i18n.lang()]);
  on = signal(false);
  units: { code: string; span: number; lease: Lease }[] = [
    { code: 'A-101', span: 2, lease: 'leased' }, { code: 'A-102', span: 1, lease: 'ending' }, { code: 'A-103', span: 2, lease: 'leased' }, { code: 'A-104', span: 1, lease: 'leased' },
    { code: '—', span: 6, lease: 'corridor' },
    { code: 'B-201', span: 1, lease: 'vacant' }, { code: 'B-202', span: 3, lease: 'leased' }, { code: 'B-203', span: 2, lease: 'ended' },
  ];
}
