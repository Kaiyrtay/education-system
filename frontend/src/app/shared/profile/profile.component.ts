import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  template: `
    <li class="nav-item dropdown ms-lg-3" *ngIf="!loading && profile">
      <a
        class="nav-link dropdown-toggle d-flex align-items-center text-white"
        href="#"
        id="profileDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <div
          class="bg-light rounded-circle d-flex align-items-center justify-content-center me-2"
          style="width: 32px; height: 32px;"
        >
          <i class="bi bi-person-fill text-primary"></i>
        </div>
        <span class="d-none d-lg-inline">
          {{ profile.user.first_name || profile.user.username }}
        </span>
      </a>
      <ul
        class="dropdown-menu dropdown-menu-end"
        aria-labelledby="profileDropdown"
      >
        <li>
          <div class="dropdown-header">
            <strong>
              {{ profile.user.first_name }} {{ profile.user.last_name }}
            </strong>
            <br />
            <small class="text-muted">{{ profile.user.email }}</small>
            <br />
            <small class="text-muted">{{ profile.role | titlecase }}</small>

            <div *ngIf="profile.role === 'student'" class="mt-2">
              <small class="text-muted">Группа: {{ profile.group.name }}</small>
            </div>

            <div *ngIf="profile.role === 'teacher'" class="mt-2">
              <small class="text-muted"
                >ID преподавателя: {{ profile.teacher.id }}</small
              >
            </div>
          </div>
        </li>
        <li><hr class="dropdown-divider" /></li>
        <li>
          <button class="dropdown-item text-danger" (click)="logout()">
            <i class="bi bi-box-arrow-right me-2"></i>
            Выйти
          </button>
        </li>
      </ul>
    </li>
  `,
})
export class ProfileComponent implements OnInit {
  profile: any = null;
  loading = true;
  error = '';

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/users/profile/').subscribe({
      next: (data) => {
        this.profile = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load profile.';
        this.loading = false;
      },
    });
  }

  logout(): void {
    this.auth.logout();
  }
}
