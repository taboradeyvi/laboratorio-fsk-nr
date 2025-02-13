import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './guards/auth.guard';
import { PatientsListComponent } from './patients/components/patients-list/patients-list.component';
import { PatientsDetailComponent } from './patients/components/patients-detail/patients-detail.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'patients',
        component: PatientsListComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
