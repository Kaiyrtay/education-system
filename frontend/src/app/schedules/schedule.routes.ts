import { Routes } from '@angular/router';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ScheduleCreateComponent } from './schedule-create/schedule-create.component';
import { ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';
import { ScheduleEditComponent } from './schedule-edit/schedule-edit.component';
import { RoleGuard } from '../auth/role.guard';

export const scheduleRoutes: Routes = [
  {
    path: 'schedules',
    component: ScheduleListComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'schedules/create',
    component: ScheduleCreateComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'schedules/:id',
    component: ScheduleDetailComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin', 'teacher', 'student'] },
  },
  {
    path: 'schedules/:id/edit',
    component: ScheduleEditComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin'] },
  },
];
