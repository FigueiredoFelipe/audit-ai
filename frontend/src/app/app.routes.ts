import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'analysis',
    loadComponent: () =>
      import('./features/analysis/analyze-form/analyze-form.component').then(
        (m) => m.AnalyzeFormComponent
      ),
  },
  {
    path: '',
    redirectTo: '/analysis',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/analysis',
  },
];
