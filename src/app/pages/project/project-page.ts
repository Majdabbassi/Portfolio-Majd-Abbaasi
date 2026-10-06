import { Component, computed, effect, inject, input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { PROJECTS, findProject } from '../../data/projects.data';
import { RevealDirective } from '../../shared/reveal.directive';
import { ToyHost } from '../../toys/toy-host';

@Component({
  selector: 'app-project-page',
  imports: [RouterLink, RevealDirective, ToyHost],
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

  private router = inject(Router);
  private title = inject(Title);

  project = computed(() => findProject(this.slug()));
  index = computed(() => PROJECTS.findIndex((p) => p.slug === this.slug()));
  number = computed(() => String(this.index() + 1).padStart(2, '0'));
  next = computed(() => PROJECTS[this.index() + 1]);

  constructor() {
    effect(() => {
      const p = this.project();
      if (!p) { this.router.navigateByUrl('/'); return; }
      this.title.setTitle(`${p.name} — Majd Abbassi`);
    });
  }
}
