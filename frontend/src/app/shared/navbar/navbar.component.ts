import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, ProfileComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  role: string | null = null;

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.role = this.auth.getRole();
  }

  logout(): void {
    this.auth.logout();
  }
}
