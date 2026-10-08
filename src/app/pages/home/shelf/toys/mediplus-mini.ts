import { Component, computed, inject, signal } from '@angular/core';
import { I18n } from '../../../../i18n/i18n';

type State = 'idle' | 'snoozed' | 'ringing' | 'taken' | 'missed';
const NEXT: Record<State, State> = { idle: 'ringing', snoozed: 'ringing', ringing: 'missed', taken: 'idle', missed: 'idle' };
const T = {
  en: { next: 'Next: Metformin 500 mg at 08:00', snoozed: 'Snoozed · rings again 08:10', taken: 'Taken', snooze: 'Snooze',
    takenTitle: 'Taken · 08:00', takenText: 'Adherence 96 % this month', missedTitle: 'Missed', missedText: 'Logged at 08:30',
    push: '08:00 · push sent', confirmed: 'dose confirmed', missedStep: '08:30 · MISSED', alerted: 'guardian alerted',
    guardOn: 'Guardian · Leila: “Amine missed his 08:00 dose”', guardOff: 'Guardian phone · quiet',
    btn: { idle: 'Skip to 08:00', snoozed: 'Skip to 08:10', ringing: 'Ignore it for 30 min', taken: 'Reset', missed: 'Reset' },
    text: { idle: 'Quartz checks every minute · fires once', snoozed: 'Snoozed · a one-off job rings again', ringing: 'FCM data message → full-screen alarm', taken: 'Adherence report updated', missed: 'No answer in 30 min → guardian alerted' } },
  fr: { next: 'Prochain : Metformine 500 mg à 08:00', snoozed: 'Reporté · sonne à nouveau à 08:10', taken: 'Pris', snooze: 'Reporter',
    takenTitle: 'Pris · 08:00', takenText: 'Observance 96 % ce mois-ci', missedTitle: 'Oublié', missedText: 'Enregistré à 08:30',
    push: '08:00 · push envoyé', confirmed: 'prise confirmée', missedStep: '08:30 · OUBLIÉ', alerted: 'proche alerté',
    guardOn: 'Proche · Leila : « Amine a oublié sa prise de 08:00 »', guardOff: 'Téléphone du proche · calme',
    btn: { idle: 'Avancer à 08:00', snoozed: 'Avancer à 08:10', ringing: 'L’ignorer 30 min', taken: 'Réinitialiser', missed: 'Réinitialiser' },
    text: { idle: 'Quartz vérifie chaque minute · déclenche une fois', snoozed: 'Reporté · un job ponctuel sonne à nouveau', ringing: 'Message FCM → alarme plein écran', taken: 'Rapport d’observance mis à jour', missed: 'Pas de réponse en 30 min → proche alerté' } },
};

/** Medi+: the dose rings like an alarm clock; ignore it and the family is told. */
@Component({
  selector: 'app-mediplus-mini',
  template: `
    <div class="scene">
      <div class="phone">
        <span class="app">Dhakerni</span>
        @switch (state()) {
          @case ('ringing') {
            <div class="alarm">
              <span class="big mono">08:00</span>
              <span class="pill-name">Metformin 500 mg</span>
              <span class="wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
              <div class="alarm-btns"><button type="button" class="solid" (click)="state.set('taken')">{{ t().taken }}</button><button type="button" (click)="state.set('snoozed')">{{ t().snooze }}</button></div>
            </div>
          }
          @case ('taken') { <div class="done-mark"><strong>{{ t().takenTitle }}</strong><span>{{ t().takenText }}</span></div> }
          @case ('missed') { <div class="done-mark miss"><strong>{{ t().missedTitle }}</strong><span>{{ t().missedText }}</span></div> }
          @default {
            <div class="clock mono">{{ state() === 'snoozed' ? '08:09' : '07:59' }}</div>
            <p class="next">{{ state() === 'snoozed' ? t().snoozed : t().next }}</p>
          }
        }
      </div>
      <div class="side">
        <div class="steps mono">
          <span [class.on]="state() === 'ringing' || state() === 'taken' || state() === 'missed'"><i></i>{{ t().push }}</span>
          <span [class.on]="state() === 'taken'" [class.bad]="state() === 'missed'"><i></i>{{ state() === 'missed' ? t().missedStep : t().confirmed }}</span>
          <span [class.bad]="state() === 'missed'"><i></i>{{ t().alerted }}</span>
        </div>
        <div class="guardian" [class.buzz]="state() === 'missed'">{{ state() === 'missed' ? t().guardOn : t().guardOff }}</div>
      </div>
    </div>
    <div class="controls">
      <button type="button" class="play" [class.ghost]="state() === 'ringing'" (click)="state.set(next[state()])">{{ t().btn[state()] }}</button>
      <span class="readout">{{ t().text[state()] }}</span>
    </div>
  `,
  styleUrl: './mini.css',
  styles: `
    .scene { display: grid; grid-template-columns: 150px 1fr; gap: 18px; align-items: center; }
    .phone { height: 205px; padding-top: 24px; }
    .clock { font-size: 30px; font-weight: 600; text-align: center; letter-spacing: -.02em; margin-top: 6px; }
    .next { margin: 0; font-size: 11px; color: var(--text-3); text-align: center; line-height: 1.4; }
    .alarm { position: absolute; inset: 0; background: var(--btn); color: var(--btn-ink); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; padding: 10px; animation: ring .7s ease-in-out infinite alternate; }
    .big { font-size: 26px; font-weight: 600; }
    .pill-name { font-size: 12px; font-weight: 600; text-align: center; }
    .wave { display: flex; gap: 2px; align-items: center; height: 14px; }
    .wave i { width: 3px; border-radius: 2px; background: currentColor; animation: eq .8s ease-in-out infinite alternate; }
    .wave i:nth-child(2) { animation-delay: .15s; } .wave i:nth-child(3) { animation-delay: .3s; } .wave i:nth-child(4) { animation-delay: .45s; } .wave i:nth-child(5) { animation-delay: .6s; }
    .alarm-btns { display: flex; gap: 6px; margin-top: 4px; }
    .alarm-btns button { min-height: 36px; padding: 0 10px; border-radius: 9px; border: 1px solid currentColor; background: transparent; color: inherit; font: 600 12px var(--font); cursor: pointer; }
    .alarm-btns button.solid { background: var(--surface); color: var(--text); border-color: var(--surface); }
    .done-mark { display: flex; flex-direction: column; align-items: center; gap: 6px; margin: auto 0; text-align: center; font-size: 12px; animation: pop .5s ease both; }
    .done-mark strong { font-size: 15px; color: var(--acc-text); }
    .done-mark.miss strong { color: var(--bad); }
    .side { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
    .steps { display: flex; flex-direction: column; gap: 6px; font-size: 12px; color: var(--text-3); }
    .steps span { display: flex; align-items: center; gap: 8px; }
    .steps i { width: 9px; height: 9px; border-radius: 50%; background: var(--cell); flex: none; transition: background .4s ease; }
    .steps span.on i { background: var(--acc); }
    .steps span.bad i { background: var(--bad); }
    .steps span.on, .steps span.bad { color: var(--text); }
    .guardian { padding: 9px 10px; border-radius: 12px; border: 1px dashed var(--line-3); font-size: 11px; color: var(--text-4); transition: border-color .4s ease, color .4s ease, background .4s ease; }
    .guardian.buzz { border: 1px solid var(--bad); color: var(--text); background: color-mix(in oklab, var(--bad) 14%, transparent); animation: buzz .4s ease 3; }
    @keyframes ring { from { filter: brightness(1); } to { filter: brightness(1.12); } }
    @keyframes eq { from { height: 3px; } to { height: 14px; } }
    @keyframes buzz { 0%, 100% { transform: none; } 25% { transform: translateX(-3px); } 75% { transform: translateX(3px); } }
    @media (max-width: 640px) { .scene { grid-template-columns: 1fr 1fr; } }
  `,
})
export class MediplusMini {
  private i18n = inject(I18n);
  t = computed(() => T[this.i18n.lang()]);
  next = NEXT;
  state = signal<State>('idle');
}
