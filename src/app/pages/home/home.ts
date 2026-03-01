import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar';
import { HeroComponent } from '../../components/hero/hero';
import { AboutComponent } from '../../components/about/about';
import { ProjectsComponent } from '../../components/projects/projects';
import { InfrastructureComponent } from '../../components/infrastructure/infrastructure';
import { PhilosophyComponent } from '../../components/philosophy/philosophy';
import { ContactComponent } from '../../components/contact/contact';
import { FooterComponent } from '../../components/footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    ProjectsComponent,
    InfrastructureComponent,
    PhilosophyComponent,
    ContactComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {}
