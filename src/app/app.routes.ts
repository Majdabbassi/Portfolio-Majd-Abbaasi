import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ProjectDetailComponent } from './pages/project-detail/project-detail';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projects/:id', component: ProjectDetailComponent },
  { path: '**', redirectTo: '' },
];
