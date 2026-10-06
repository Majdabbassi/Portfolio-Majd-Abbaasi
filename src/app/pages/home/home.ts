import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MORE_PROJECTS, PROJECTS } from '../../data/projects.data';
import { SITE } from '../../data/site.data';
import { I18n } from '../../i18n/i18n';
import { CardMotif } from '../../shared/card-motif';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CardMotif, RevealDirective],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  i18n = inject(I18n);
  site = SITE;
  projects = PROJECTS;
  more = MORE_PROJECTS;

  statusKey(s: string) { return ('status_' + s) as 'status_production'; }
}
