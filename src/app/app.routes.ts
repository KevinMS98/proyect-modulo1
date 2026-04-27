import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then((m) => m.Register)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home)

  },
  {
    path: 'info',
    loadComponent: () => import('./pages/info/info').then((m) => m.Info)
  }
];
