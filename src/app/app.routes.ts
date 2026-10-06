import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then((m) => m.Home), title: 'Majd Abbassi — Full-stack developer' },
  { path: 'projects/:slug', loadComponent: () => import('./pages/project/project-page').then((m) => m.ProjectPage) },
  { path: '**', redirectTo: '' },
];
