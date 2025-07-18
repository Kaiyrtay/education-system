import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, switchMap, tap } from 'rxjs';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenUrl = 'http://localhost:8000/api/token/';
  private refreshUrl = 'http://localhost:8000/api/token/refresh/';
  private userUrl = 'http://localhost:8000/api/users/user/';

  private _isRefreshing = false;

  constructor(private http: HttpClient, private router: Router) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.tokenUrl, data).pipe(
      tap((res) => {
        localStorage.setItem('access_token', res.access);
        localStorage.setItem('refresh_token', res.refresh);
      }),
      switchMap((res) =>
        this.loadUserRole().pipe(
          catchError(() => of(null)),
          switchMap(() => of(res))
        )
      )
    );
  }

  refreshAccessToken() {
    const refresh = this.getRefreshToken();
    if (!refresh) return of(null);

    if (this._isRefreshing) return of(null);
    this._isRefreshing = true;

    return this.http
      .post<{ access: string }>(this.refreshUrl, { refresh })
      .pipe(
        tap((res) => {
          if (res?.access) {
            localStorage.setItem('access_token', res.access);
          }
        }),
        tap(() => (this._isRefreshing = false)),
        catchError((err) => {
          this._isRefreshing = false;
          this.forceLogout();
          return of(null);
        })
      );
  }

  private forceLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('current_role');
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.forceLogout();
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  getRole(): string | null {
    return localStorage.getItem('current_role');
  }
  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }
  isTeacher(): boolean {
    return this.getRole() === 'teacher';
  }
  isStudent(): boolean {
    return this.getRole() === 'student';
  }

  loadUserRole() {
    return this.http.get<any>(this.userUrl).pipe(
      tap((u) => {
        if (u?.role) {
          localStorage.setItem('current_role', u.role);
        }
      })
    );
  }
}
