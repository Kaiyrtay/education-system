import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { LoginRequest, LoginResponse } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/token/';
  constructor(private http: HttpClient, private router: Router) {}
  login(data: LoginRequest) {
    return this.http.post<LoginResponse>(this.apiUrl, data).pipe(
      tap((res: LoginResponse) => {
        localStorage.setItem('access_token', res.access);
        localStorage.setItem('refresh_token', res.refresh);
      })
    );
  }
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);
  }
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}
