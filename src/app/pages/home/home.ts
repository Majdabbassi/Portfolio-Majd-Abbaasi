import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { Shelf } from './shelf/shelf';
import { Lab } from './lab/lab';
import { About } from './about/about';
import { Contact } from './contact/contact';

/** The landing page, top to bottom. Each section is its own component in this folder. */
@Component({
  selector: 'app-home',
  imports: [Hero, Shelf, Lab, About, Contact],
  template: `
    <app-hero />
    <app-shelf />
    <app-lab />
    <app-about />
    <app-contact />
  `,
})
export class Home {}
