import { Component, computed, inject, signal } from '@angular/core';
import { I18n } from '../../../../i18n/i18n';

const T = {
  en: { drop: 'Drop a photo', clear: 'Clear the album', fresh: 'Processed by the worker → PHOTO_READY → every screen', count: (n: number) => n + ' photos · guests need no account' },
  fr: { drop: 'Déposer une photo', clear: 'Vider l’album', fresh: 'Traitée par le worker → PHOTO_READY → tous les écrans', count: (n: number) => n + ' photos · aucun compte invité' },
};
const QR = '1110111101010110111011000100101101011101011101111';

/** Albumy: a guest drops a photo, it lands in everyone's album. */
@Component({
  selector: 'app-albumy-mini',
  template: `
    <div class="scene">
      <div class="qr">
        <div class="qr-grid" aria-hidden="true">@for (c of qr; track $index) { <span [class.on]="c === '1'"></span> }</div>
        <small class="mono">/e/DEMO01</small>
      </div>
      <div class="album">
        @for (i of tiles; track i) {
          <span class="tile" [class.ready]="i < count() && i !== fresh()" [class.new]="i === fresh()" [style.--i]="i"></span>
        }
      </div>
    </div>
    <div class="controls">
      <button type="button" class="play" (click)="drop()">{{ count() >= 8 ? t().clear : t().drop }}</button>
      <span class="readout">{{ fresh() >= 0 ? t().fresh : t().count(count()) }}</span>
    </div>
  `,
  styleUrl: './mini.css',
  styles: `
    .scene { display: grid; grid-template-columns: 120px 1fr; gap: 18px; align-items: center; }
    .qr { display: flex; flex-direction: column; align-items: center; gap: 8px; }
    .qr-grid { display: grid; grid-template-columns: repeat(7, 12px); gap: 2px; padding: 8px; background: var(--surface); border-radius: 10px; border: 1px solid var(--acc-line); }
    .qr-grid span { width: 12px; height: 12px; border-radius: 2px; }
    .qr-grid span.on { background: var(--text); }
    .qr small { font-size: 11px; color: var(--text-3); }
    .album { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }
    .tile { aspect-ratio: 1; border-radius: 10px; border: 1px dashed var(--acc-line); transition: background .4s ease; }
    .tile.ready { border: 0; background: oklch(.78 .12 calc(var(--h) + var(--i) * 14) / .85); }
    :host-context([data-theme='light']) .tile.ready { background: oklch(.66 .12 calc(var(--h) + var(--i) * 14) / .9); }
    .tile.new { border: 0; position: relative; overflow: hidden; background: var(--acc); animation: drop .6s cubic-bezier(.2, 1.4, .4, 1) both; }
    .tile.new::after { content: ""; position: absolute; inset: 0; background: linear-gradient(110deg, transparent 30%, rgba(255, 255, 255, .55) 50%, transparent 70%); animation: shimmer 1.1s ease .2s 2; }
    @keyframes shimmer { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
    @media (max-width: 640px) { .scene { grid-template-columns: 1fr 1fr; } }
  `,
})
export class AlbumyMini {
  private i18n = inject(I18n);
  t = computed(() => T[this.i18n.lang()]);
  qr = QR.split('');
  tiles = [0, 1, 2, 3, 4, 5, 6, 7];
  count = signal(5);
  fresh = signal(-1);

  drop() {
    if (this.count() >= 8) { this.count.set(3); this.fresh.set(-1); return; }
    this.fresh.set(this.count());
    this.count.update((n) => n + 1);
  }
}
