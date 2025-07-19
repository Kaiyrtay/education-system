import { Routes } from '@angular/router';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupCreateComponent } from './group-create/group-create.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { GroupUpdateComponent } from './group-update/group-update.component';
import { RoleGuard } from '../auth/role.guard';

export const groupRoutes: Routes = [
  {
    path: 'groups',
    component: GroupListComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin', 'teacher', 'student'] },
  },
  {
    path: 'groups/create',
    component: GroupCreateComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'groups/:id',
    component: GroupDetailComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin', 'teacher', 'student'] },
  },
  {
    path: 'groups/:id/edit',
    component: GroupUpdateComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin'] },
  },
];
