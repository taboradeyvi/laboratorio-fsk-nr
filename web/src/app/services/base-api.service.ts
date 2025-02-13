import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  private getHeaders(withToken: boolean = true): HttpHeaders {
    let headers = new HttpHeaders();

    if (withToken) {
      const token = localStorage.getItem('token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }

    return headers;
  }

  get<T>(url: string, withToken: boolean = true): Observable<T> {
    const headers = this.getHeaders(withToken);
    return this.http.get<T>(`${this.apiUrl}/${url}`, { headers });
  }

  post<T>(url: string, body: any, withToken: boolean = true): Observable<T> {
    const headers = this.getHeaders(withToken);
    return this.http.post<T>(`${this.apiUrl}/${url}`, body, { headers });
  }

  put<T>(url: string, body: any, withToken: boolean = true): Observable<T> {
    const headers = this.getHeaders(withToken);
    return this.http.put<T>(`${this.apiUrl}/${url}`, body, { headers });
  }

  delete<T>(url: string, withToken: boolean = true): Observable<T> {
    const headers = this.getHeaders(withToken);
    return this.http.delete<T>(`${this.apiUrl}/${url}`, { headers });
  }
}
