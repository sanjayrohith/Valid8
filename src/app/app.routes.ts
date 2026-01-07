import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Vali8 - NFT Certificate Verifier'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard').then(m => m.DashboardComponent),
    title: 'My Certificates - Vali8'
  },
  {
    path: 'verify',
    loadComponent: () => import('./components/verify/verify').then(m => m.VerifyComponent),
    title: 'Verify Certificate - Vali8'
  },
  {
    path: 'admin',
    loadComponent: () => import('./components/admin/admin').then(m => m.AdminComponent),
    title: 'Admin Panel - Vali8'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
