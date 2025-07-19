import { Routes } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { RoleGuard } from '../auth/role.guard';

export const studentRoutes: Routes = [
  {
    path: 'students',
    component: StudentListComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin', 'teacher'] },
  },
  {
    path: 'students/create',
    component: StudentCreateComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'students/:id',
    component: StudentDetailComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin', 'teacher', 'student'] },
  },
  {
    path: 'students/:id/edit',
    component: StudentEditComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin'] },
  },
];
