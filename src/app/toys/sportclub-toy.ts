import { I18n } from '../i18n/i18n';
import { Component, computed, signal, inject } from '@angular/core';

const KIDS = ['Adam', 'Yasmine', 'Rayen', 'Lina', 'Iyed', 'Malek'];

const TXT = {
  en: { coach: 'Coach · web console', session: 'U12 Football · Tuesday session', present: 'present', absent: 'absent', presentN: 'present',
    save: 'Save attendance', parent: 'Parent · mobile app', empty: 'Mark a kid absent, then save — their parent hears about it here.',
    absentNote: "{n} was marked absent from today's U12 session.", allHere: 'Everyone made it to training today.' },
  fr: { coach: 'Coach · console web', session: 'Football U12 · séance du mardi', present: 'présent', absent: 'absent', presentN: 'présents',
    save: 'Enregistrer', parent: 'Parent · app mobile', empty: 'Marquez un enfant absent puis enregistrez — son parent est prévenu ici.',
    absentNote: '{n} a été marqué absent à la séance U12 d’aujourd’hui.', allHere: 'Tout le monde était à l’entraînement aujourd’hui.' },
};

@Component({
  selector: 'app-sportclub-toy',
  template: `
    <div class="duo">
      <div class="panel coach">
        <div class="panel-head">
          <div><div class="label">{{ t().coach }}</div><div class="panel-title">{{ t().session }}</div></div>
        </div>
        <div class="list">
          @for (k of kids; track k; let i = $index) {
            <button type="button" class="kid" [attr.aria-pressed]="here()[i]" (click)="toggle(i)">
              <span class="box" [class.on]="here()[i]">{{ here()[i] ? '✓' : '' }}</span>
              <span class="kname">{{ k }}</span>
              <span class="mono state" [class.absent]="!here()[i]">{{ here()[i] ? t().present : t().absent }}</span>
            </button>
          }
        </div>
        <div class="panel-foot row">
          <span class="mono count">{{ present() }} / {{ kids.length }} {{ t().presentN }}</span>
          <button type="button" class="toy-btn solid" (click)="save()">{{ t().save }}</button>
        </div>
      </div>

      <div class="phone">
        <span class="label center">{{ t().parent }}</span>
        @if (notes().length === 0) {
          <p class="empty">{{ t().empty }}</p>
        }
        @for (n of notes(); track n.id) {
          <div class="note"><b>SportClub</b><span>{{ n.text }}</span></div>
        }
      </div>
    </div>
  `,
  styles: `
    .duo { display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-start; }
    .coach { flex: 1 1 300px; }
    .list { padding: 12px 20px; display: flex; flex-direction: column; gap: 6px; }
    .kid { display: flex; align-items: center; gap: 12px; min-height: 44px; padding: 0 10px; border-radius: 10px; border: 1px solid var(--chip-line); background: transparent; color: var(--text); font-size: 15px; cursor: pointer; text-align: left; }
    .box { width: 20px; height: 20px; border-radius: 6px; border: 2px solid var(--line-3); display: inline-flex; align-items: center; justify-content: center; font-size: 13px; color: var(--accent-ink); transition: all .2s ease; }
    .box.on { background: var(--accent); border-color: var(--accent); animation: pop .3s ease; }
    .kname { flex: 1; }
    .state { font-size: 11px; color: var(--ok-text); }
    .state.absent { color: var(--bad-text); }
    .row { flex-direction: row; flex-wrap: wrap; align-items: center; justify-content: space-between; }
    .count { font-size: 13px; color: var(--soft-text); }
    .phone { flex: 0 1 220px; min-width: 200px; background: var(--surface-2); border: 6px solid var(--line-3); border-radius: 32px; min-height: 380px; padding: 18px 14px; display: flex; flex-direction: column; gap: 10px; }
    .center { text-align: center; }
    .empty { margin: 20px 0 0; font-size: 14px; color: var(--text-4); text-align: center; line-height: 1.5; }
    .note { padding: 10px 12px; border-radius: 12px; background: color-mix(in oklab, var(--accent) 10%, var(--surface)); border: 1px solid var(--chip-line); display: flex; flex-direction: column; gap: 4px; font-size: 13px; color: var(--text-2); line-height: 1.4; animation: rise .35s ease both; }
    .note b { color: var(--soft-text); }
    @media (max-width: 560px) { .phone { flex-basis: 100%; min-height: 0; } }
  `,
})
export class SportclubToy {
  private i18n = inject(I18n);
  t = computed(() => TXT[this.i18n.lang()]);
  kids = KIDS;
  here = signal(KIDS.map(() => true));
  notes = signal<{ id: number; text: string }[]>([]);
  present = computed(() => this.here().filter(Boolean).length);
  private id = 0;

  toggle(i: number) { this.here.update((h) => h.map((v, j) => (j === i ? !v : v))); }

  save() {
    const absent = KIDS.filter((_, i) => !this.here()[i]);
    const texts = absent.length ? absent.map((n) => this.t().absentNote.replace('{n}', n)) : [this.t().allHere];
    this.notes.set(texts.map((text) => ({ id: this.id++, text })));
  }
}
