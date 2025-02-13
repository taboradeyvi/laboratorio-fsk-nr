import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './guards/auth.guard';
import { PatientsListComponent } from './patients/components/patients-list/patients-list.component';
import { PatientsDetailComponent } from './patients/components/patients-detail/patients-detail.component';
import { SymptomsListComponent } from './symptoms/components/symptoms-list/symptoms-list.component';
import { SymptomsDetailComponent } from './symptoms/components/symptoms-detail/symptoms-detail.component';
import { UsersListComponent } from './users/components/users-list/users-list.component';
import { UsersDetailComponent } from './users/components/users-detail/users-detail.component';

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
      {
        path: 'patients/new',
        component: PatientsDetailComponent,
      },
      {
        path: 'patients/edit/:id',
        component: PatientsDetailComponent,
      },
      {
        path: 'symptoms',
        component: SymptomsListComponent,
      },
      {
        path: 'symptoms/new',
        component: SymptomsDetailComponent,
      },
      {
        path: 'symptoms/edit/:id',
        component: SymptomsDetailComponent,
      },
      {
        path: 'users',
        component: UsersListComponent,
      },
      {
        path: 'users/new',
        component: UsersDetailComponent,
      },
      {
        path: 'users/edit/:id',
        component: UsersDetailComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
