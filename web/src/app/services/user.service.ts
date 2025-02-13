import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: BaseApiService) {}

  getAllUsers(): Observable<User[]> {
    return this.apiService.get<User[]>('users', true);
  }

  getUserById(id: string): Observable<User> {
    return this.apiService.get<User>(`users/${id}`, true);
  }

  createUser(user: User): Observable<User> {
    return this.apiService.post<User>('users', user, true);
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.apiService.put<User>(`users/${id}`, user, true);
  }

  deleteUser(id: string): Observable<User> {
    return this.apiService.delete<User>(`users/${id}`, true);
  }
}
