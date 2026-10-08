import { Component, computed, inject, signal } from '@angular/core';
import { I18n } from '../../../../i18n/i18n';

const T = {
  en: { tag: 'BAC · MATHS · WITH CORRECTION', title: 'Exam 2025 — functions & limits', locked: 'encrypted', parent: 'Parent wallet', teacher: 'Teacher balance',
    pay: '↓ pay with wallet ↓', paid: '− 8 DT  →  + 8 DT', buy: 'Buy · 8 DT from wallet', reset: 'Reset demo',
    idle: 'Encrypted at rest · served only after purchase', done: 'Purchase recorded · decrypted for you only' },
  fr: { tag: 'BAC · MATHS · AVEC CORRIGÉ', title: 'Examen 2025 — fonctions et limites', locked: 'chiffré', parent: 'Wallet parent', teacher: 'Solde enseignant',
    pay: '↓ payer avec le wallet ↓', paid: '− 8 DT  →  + 8 DT', buy: 'Acheter · 8 DT du wallet', reset: 'Réinitialiser',
    idle: 'Chiffré au repos · servi seulement après achat', done: 'Achat enregistré · déchiffré pour vous seul' },
};

/** Massarat+: pay from the wallet, the teacher is credited, the document unlocks. */
@Component({
  selector: 'app-massarat-mini',
  template: `
    <div class="scene">
      <div class="doc" [class.open]="bought()">
        <span class="tag mono">{{ t().tag }}</span>
        <span class="ttl">{{ t().title }}</span>
        <span class="ln"></span><span class="ln s"></span><span class="ln"></span><span class="ln s"></span><span class="ln"></span>
        <span class="lock mono"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>{{ t().locked }}</span>
      </div>
      <div class="wallets">
        <div class="wal"><span>{{ t().parent }}</span><strong [class.bump]="bought()">{{ bought() ? 32 : 40 }} DT</strong></div>
        <div class="flow mono" [class.go]="bought()">{{ bought() ? t().paid : t().pay }}</div>
        <div class="wal"><span>{{ t().teacher }}</span><strong [class.bump]="bought()">{{ bought() ? 128 : 120 }} DT</strong></div>
      </div>
    </div>
    <div class="controls">
      <button type="button" class="play" (click)="bought.set(!bought())">{{ bought() ? t().reset : t().buy }}</button>
      <span class="readout">{{ bought() ? t().done : t().idle }}</span>
    </div>
  `,
  styleUrl: './mini.css',
  styles: `
    .scene { display: grid; grid-template-columns: 150px 1fr; gap: 16px; align-items: center; }
    .doc { position: relative; height: 190px; border-radius: 12px; background: var(--surface); border: 1px solid var(--acc-line); padding: 14px 12px; display: flex; flex-direction: column; gap: 7px; overflow: hidden; }
    .tag { font-size: 10px; font-weight: 600; color: var(--acc-text); }
    .ttl { font-size: 13px; font-weight: 600; line-height: 1.25; }
    .ln { height: 6px; border-radius: 3px; background: var(--line-3); filter: blur(3px); opacity: .6; transition: filter .6s ease, opacity .6s ease; }
    .ln.s { width: 70%; }
    .doc.open .ln { filter: none; opacity: 1; }
    .lock { position: absolute; inset: auto 10px 10px 10px; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 6px; border-radius: 8px; background: var(--btn); color: var(--btn-ink); font-size: 10px; font-weight: 600; transition: transform .5s ease, opacity .5s ease; }
    .doc.open .lock { transform: translateY(40px); opacity: 0; }
    .wallets { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
    .wal { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; padding: 10px 12px; border-radius: 11px; background: var(--cell); font-size: 13px; color: var(--text-2); }
    .wal strong { font-size: 22px; color: var(--text); letter-spacing: -.01em; white-space: nowrap; }
    .wal strong.bump { animation: pop .5s ease both; color: var(--acc-text); }
    .flow { font-size: 11px; color: var(--text-3); text-align: center; }
    .flow.go { color: var(--acc-text); animation: pop .5s ease both; }
    @media (max-width: 640px) { .scene { grid-template-columns: 1fr 1fr; } }
  `,
})
export class MassaratMini {
  private i18n = inject(I18n);
  t = computed(() => T[this.i18n.lang()]);
  bought = signal(false);
}
