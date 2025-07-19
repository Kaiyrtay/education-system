import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRoles = route.data['roles'] as string[];
    const currentRole = this.auth.getRole();

    if (!currentRole) {
      this.router.navigate(['/login']);
      return false;
    }

    if (expectedRoles.includes(currentRole)) {
      return true;
    }

    this.router.navigate(['/forbidden']);
    return false;
  }
}
