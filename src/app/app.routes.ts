import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./features/auth/pages/login/login.component')
            .then(m => m.LoginComponent)
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component')
            .then(m => m.DashboardComponent),
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: 'login',
    }
];
