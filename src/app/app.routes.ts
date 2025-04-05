import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
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
        component: DashboardComponent
    }
];
