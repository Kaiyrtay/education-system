import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, switchMap, tap } from 'rxjs';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenUrl = 'http://localhost:8000/api/token/';
  private userUrl = 'http://localhost:8000/api/users/user/';

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

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('current_role');
    this.router.navigate(['/login']);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
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
        } else {
          const role = this.decodeRoleFromToken();
          if (role) localStorage.setItem('current_role', role);
        }
      })
    );
  }

  private decodeRoleFromToken(): string | null {
    const token = this.getAccessToken();
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    try {
      const payload = JSON.parse(
        atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))
      );
      return payload?.role ?? null;
    } catch {
      return null;
    }
  }
}
