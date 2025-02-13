import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BaseApiService } from './base-api.service';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: BaseApiService, private router: Router) {}

  login(login: Login): Observable<any> {
    debugger;
    return this.apiService.post('users/login', login, false);
  }

  loginSuccess(response: any): void {
    const token = response.token;
    if (token) {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
