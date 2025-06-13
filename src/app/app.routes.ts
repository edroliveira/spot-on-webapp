import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGoogleService } from '../services/auth-google.service';
import { inject } from '@angular/core';

export const routes: Routes = [
    {
        path: '',
        redirectTo: (url) => {
            const authGoogleService = inject(AuthGoogleService);
            return authGoogleService.isLoggedIn() ? '/dashboard' : '/login';
        },
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: '',
                redirectTo: 'timesheet',
                pathMatch: 'full'
            },
            {
                path: 'timesheet',
                loadComponent: () => import('./timesheet/timesheet.component').then(c => c.TimesheetComponent)
            }
        ]
    }
];
