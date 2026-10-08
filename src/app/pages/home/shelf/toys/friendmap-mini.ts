import { Component, computed, inject, signal } from '@angular/core';
import { I18n } from '../../../../i18n/i18n';

type Mode = 'everyone' | 'selected' | 'ghost';
const T = {
  en: { modes: { everyone: 'Everyone', selected: 'Selected', ghost: 'Ghost' }, you: 'you', sees: 'sees you', group: 'Who can see you',
    text: { everyone: 'Visible to 3 friends', selected: 'Visible to bob only', ghost: 'Hidden from everyone · revoked live' } },
  fr: { modes: { everyone: 'Tous', selected: 'Choisis', ghost: 'Fantôme' }, you: 'vous', sees: 'vous voit', group: 'Qui peut vous voir',
    text: { everyone: 'Visible par 3 amis', selected: 'Visible par bob seulement', ghost: 'Caché pour tous · révoqué en direct' } },
};

/** FriendMap: switch privacy mode, watch who can still see you. */
@Component({
  selector: 'app-friendmap-mini',
  template: `
    <div class="scene paper">
      <span class="beam" [class.off]="mode() === 'ghost'"></span>
      <span class="you" [class.ghost]="mode() === 'ghost'"><i class="ring"></i><i class="core"></i><b class="mono">{{ t().you }}</b></span>
      @for (f of friends; track f; let i = $index) {
        <span class="friend" [class]="'friend p' + (i + 1)" [class.blind]="!sees(i)"><i class="core"></i><b class="mono">{{ f }}</b><em class="eye">{{ t().sees }}</em></span>
      }
    </div>
    <div class="controls">
      <div class="seg" role="group" [attr.aria-label]="t().group">
        @for (m of modes; track m) {
          <button type="button" [class.on]="mode() === m" [attr.aria-pressed]="mode() === m" (click)="mode.set(m)">{{ t().modes[m] }}</button>
        }
      </div>
      <span class="readout">{{ t().text[mode()] }}</span>
    </div>
  `,
  styleUrl: './mini.css',
  styles: `
    .you, .friend { position: absolute; display: flex; flex-direction: column; align-items: center; gap: 4px; transition: opacity .4s ease; }
    .you { left: 46%; top: 38%; }
    .core { width: 16px; height: 16px; border-radius: 50%; background: var(--acc); box-shadow: 0 0 0 4px var(--acc-soft); transition: background .4s ease, box-shadow .4s ease; }
    .you .core { background: var(--lamp); box-shadow: 0 0 0 4px var(--lamp-soft); }
    .ring { position: absolute; top: 0; width: 16px; height: 16px; border-radius: 50%; border: 2px solid var(--lamp); animation: ping 1.8s ease-out infinite; }
    .you.ghost .core { background: transparent; border: 2px dashed var(--lamp); box-shadow: none; }
    .you.ghost .ring { animation: none; opacity: 0; }
    b { font-weight: 400; font-size: 11px; color: var(--text-3); }
    .eye { font: normal 10px var(--mono); padding: 2px 6px; border-radius: 6px; background: var(--acc-soft); color: var(--acc-text); transition: opacity .35s ease, transform .35s ease; }
    .friend.blind .eye { opacity: 0; transform: translateY(-4px); }
    .friend.blind .core { background: var(--cell); box-shadow: none; }
    .p1 { animation: w1 10s ease-in-out infinite; }
    .p2 { animation: w2 12s ease-in-out infinite; }
    .p3 { animation: w3 11s ease-in-out infinite; }
    .beam { position: absolute; left: 47.5%; top: 44%; width: 44%; height: 2px; transform-origin: 0 50%; background: linear-gradient(90deg, var(--lamp), transparent); opacity: .5; animation: sweep 6s linear infinite; transition: opacity .4s ease; }
    .beam.off { opacity: 0; }
    @keyframes sweep { to { transform: rotate(360deg); } }
    @keyframes w1 { 0%, 100% { left: 14%; top: 16%; } 33% { left: 24%; top: 46%; } 66% { left: 10%; top: 60%; } }
    @keyframes w2 { 0%, 100% { left: 72%; top: 14%; } 40% { left: 80%; top: 44%; } 70% { left: 64%; top: 30%; } }
    @keyframes w3 { 0%, 100% { left: 62%; top: 62%; } 50% { left: 34%; top: 66%; } }
  `,
})
export class FriendmapMini {
  private i18n = inject(I18n);
  t = computed(() => T[this.i18n.lang()]);
  modes: Mode[] = ['everyone', 'selected', 'ghost'];
  friends = ['bob', 'carol', 'dave'];
  mode = signal<Mode>('everyone');
  sees(i: number) { return this.mode() === 'everyone' || (this.mode() === 'selected' && i === 0); }
}
