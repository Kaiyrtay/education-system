import { Routes } from '@angular/router';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherCreateComponent } from './teacher-create/teacher-create.component';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';
import { TeacherEditComponent } from './teacher-edit/teacher-edit.component';
import { RoleGuard } from '../auth/role.guard';

export const teacherRoutes: Routes = [
  {
    path: 'teachers',
    component: TeacherListComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin', 'teacher', 'student'] },
  },
  {
    path: 'teachers/create',
    component: TeacherCreateComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'teachers/:id',
    component: TeacherDetailComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin', 'teacher'] },
  },
  {
    path: 'teachers/:id/edit',
    component: TeacherEditComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin'] },
  },
];
