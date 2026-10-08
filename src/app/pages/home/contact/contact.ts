import { Component, DestroyRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { SITE } from '../../../data/site.data';
import { I18n } from '../../../i18n/i18n';
import { RevealDirective } from '../../../shared/reveal.directive';

/** Contact + footer, sized to fit one screen: two direct channels, then the profiles. */
@Component({
  selector: 'app-contact',
  imports: [RevealDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  i18n = inject(I18n);
  site = SITE;
  c = SITE.contact;
  year = new Date().getFullYear();
  /** Shown as typed in site.data.ts, e.g. "+216 12 345 678". */
  waShown = this.c.whatsapp;
  /** wa.me wants digits only. */
  waLink = 'https://wa.me/' + this.c.whatsapp.replace(/\D/g, '');

  copied = signal<'' | 'mail' | 'wa'>('');
  now = signal(Date.now());
  localTime = computed(() => {
    try { return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Tunis' }).format(this.now()); } catch { return ''; }
  });
  private reset?: ReturnType<typeof setTimeout>;

  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      const tick = setInterval(() => this.now.set(Date.now()), 30_000);
      destroy.onDestroy(() => { clearInterval(tick); clearTimeout(this.reset); });
    });
  }

  async copy(which: 'mail' | 'wa', text: string) {
    try { await navigator.clipboard.writeText(text); } catch { return; }
    this.copied.set(which);
    clearTimeout(this.reset);
    this.reset = setTimeout(() => this.copied.set(''), 1800);
  }
}
