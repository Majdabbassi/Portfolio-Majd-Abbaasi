import { Component, computed, inject, signal } from '@angular/core';
import { I18n } from '../../../../i18n/i18n';

const T = {
  en: { present: 'Present', absent: 'Absent', app: 'Parent app', save: 'Save attendance', idle: 'Waiting for today’s session…', all: 'Everyone was present',
    marked: (n: string) => n + ' was marked absent', saved: 'Each family sees only its own child', hint: 'Tap a name, then save' },
  fr: { present: 'Présent', absent: 'Absent', app: 'App parents', save: 'Enregistrer les présences', idle: 'En attente de la séance du jour…', all: 'Tout le monde était présent',
    marked: (n: string) => n + ' est noté absent', saved: 'Chaque famille ne voit que son enfant', hint: 'Touchez un nom, puis enregistrez' },
};
const SESSION = 'Football U10 · 17:00';

/** SportClub: mark a child absent, save — only that family's phone hears about it. */
@Component({
  selector: 'app-sportclub-mini',
  template: `
    <div class="scene">
      <ul class="roll">
        @for (k of kids; track k; let i = $index) {
          <li><span>{{ k }}</span><button type="button" class="pill" [class.absent]="absent()[i]" [attr.aria-pressed]="absent()[i]" (click)="toggle(i)">{{ absent()[i] ? t().absent : t().present }}</button></li>
        }
      </ul>
      <div class="phone">
        <span class="app">{{ t().app }}</span>
        @if (saved()) {
          @for (n of notes(); track n) { <div class="note">{{ n }}<small>{{ session }}</small></div> }
        } @else {
          <p class="idle">{{ t().idle }}</p>
        }
      </div>
    </div>
    <div class="controls">
      <button type="button" class="play" (click)="saved.set(true)">{{ t().save }}</button>
      <span class="readout">{{ saved() ? t().saved : t().hint }}</span>
    </div>
  `,
  styleUrl: './mini.css',
  styles: `
    .scene { display: grid; grid-template-columns: minmax(0, 1fr) 132px; gap: 16px; }
    .roll { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 6px; }
    .roll li { display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 14px; color: var(--text-2); padding: 4px 4px 4px 10px; border-radius: 10px; background: var(--cell); }
    .pill { min-width: 76px; min-height: 40px; border-radius: 9px; border: 1px solid var(--acc-line); background: transparent; color: var(--acc-text); font: 600 12px var(--font); cursor: pointer; transition: background .25s ease, color .25s ease; }
    .pill.absent { background: var(--bad); border-color: var(--bad); color: #2a0e0c; }
    :host-context([data-theme='light']) .pill.absent { color: #fff; }
    .note { padding: 7px 8px; border-radius: 10px; background: var(--acc-soft); font-size: 11px; line-height: 1.35; color: var(--text); animation: slidein .45s cubic-bezier(.2, 1.2, .4, 1) both; }
    .note small { display: block; color: var(--text-3); font-size: 10px; }
    .note:nth-child(3) { animation-delay: .15s; }
    .note:nth-child(4) { animation-delay: .3s; }
    .idle { font-size: 11px; color: var(--text-4); text-align: center; margin: auto 0; }
    @media (max-width: 640px) { .scene { grid-template-columns: minmax(0, 1fr) 110px; gap: 12px; } }
    @media (max-width: 360px) { .scene { grid-template-columns: minmax(0, 1fr) 92px; gap: 10px; } .pill { min-width: 64px; } }
  `,
})
export class SportclubMini {
  private i18n = inject(I18n);
  t = computed(() => T[this.i18n.lang()]);
  session = SESSION;
  kids = ['Youssef', 'Nour', 'Amine', 'Salma'];
  absent = signal([false, true, false, false]);
  saved = signal(false);
  notes = computed(() => {
    const names = this.kids.filter((_, i) => this.absent()[i]);
    return names.length ? names.map((n) => this.t().marked(n)) : [this.t().all];
  });

  toggle(i: number) {
    this.absent.update((a) => a.map((v, j) => (j === i ? !v : v)));
    this.saved.set(false);
  }
}
