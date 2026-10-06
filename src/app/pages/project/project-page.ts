import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { ALL_PROJECTS, PROJECTS, findProject } from '../../data/projects.data';
import { I18n } from '../../i18n/i18n';
import { RevealDirective } from '../../shared/reveal.directive';
import { ScreenGallery } from '../../shared/screen-gallery';
import { ToyHost } from '../../toys/toy-host';

@Component({
  selector: 'app-project-page',
  imports: [RouterLink, RevealDirective, ToyHost, ScreenGallery],
  templateUrl: './project-page.html',
  styleUrl: './project-page.css',
  host: {
    '[style.--accent]': 'project()?.theme?.accent',
    '[style.--accent-soft]': 'project()?.theme?.soft',
    '[style.--accent-ink]': 'project()?.theme?.ink',
    '[style.--accent-line]': 'project()?.theme?.line',
    '[style.--panel-bg]': 'project()?.theme?.panel',
  },
})
export class ProjectPage {
  /** Comes from the URL /projects/:slug */
  slug = input<string>('');

  i18n = inject(I18n);
  private router = inject(Router);
  private title = inject(Title);

  project = computed(() => findProject(this.slug()));
  d = computed(() => { const p = this.project(); return p ? this.i18n.tr(p.detail) : undefined; });
  index = computed(() => ALL_PROJECTS.findIndex((p) => p.slug === this.slug()));
  number = computed(() => String(this.index() + 1).padStart(2, '0'));
  next = computed(() => ALL_PROJECTS[this.index() + 1]);
  isShelf = computed(() => PROJECTS.some((p) => p.slug === this.slug()));

  /** "Mall OS — Multi-Tenant Mall Management…" → the part after the dash */
  subtitle = computed(() => { const t = this.d()?.title ?? ''; const i = t.indexOf(' — '); return i > -1 ? t.slice(i + 3) : ''; });
  liveUrl = computed(() => this.d()?.showcase?.live ?? this.d()?.deployment.liveUrl);
  apkUrl = computed(() => { const a = this.d()?.deployment.apkUrl; return a && !a.startsWith('#') ? a : undefined; });

  flowSteps = computed(() => (this.d()?.deployment.flow ?? '').split(/→|->/).map((x) => x.trim()).filter(Boolean));

  copied = signal<string | null>(null);

  constructor() {
    effect(() => {
      const p = this.project();
      if (!p) { this.router.navigateByUrl('/'); return; }
      this.title.setTitle(`${p.name} — Majd Abbassi`);
    });
  }

  statusKey(s: string) { return ('status_' + s) as 'status_production'; }

  async copy(text: string, id: string) {
    try { await navigator.clipboard.writeText(text); } catch { return; }
    this.copied.set(id);
    setTimeout(() => this.copied.set(null), 1500);
  }
}
