import { Component } from '@angular/core';
import { LoginRequest } from './auth.model';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form: LoginRequest = new LoginRequest();
  error: string = '';

  constructor(private auth: AuthService) {}

  onSubmit(): void {
    this.auth.login(this.form).subscribe({
      next: () => {
        const role = this.auth.getRole();
        if (role === 'admin') {
          window.location.href = '/';
        } else if (role === 'teacher' || role === 'student') {
          window.location.href = '/my-schedule';
        } else {
          window.location.href = '/forbidden';
        }
      },
      error: () => {
        this.error = 'Invalid username or password';
      },
    });
  }
}
