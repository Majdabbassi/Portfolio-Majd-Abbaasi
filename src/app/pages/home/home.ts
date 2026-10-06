import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROJECTS } from '../../data/projects.data';
import { SITE } from '../../data/site.data';
import { CardMotif } from '../../shared/card-motif';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CardMotif, RevealDirective],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  site = SITE;
  projects = PROJECTS;
}
