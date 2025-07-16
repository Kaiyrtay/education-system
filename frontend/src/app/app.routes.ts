import { Routes } from '@angular/router';
import { authRoutes } from './auth/auth.routes';
import { userRoutes } from './users/user.routes';
import { groupRoutes } from './group/group.routes';

export const routes: Routes = [...authRoutes, ...userRoutes, ...groupRoutes];
