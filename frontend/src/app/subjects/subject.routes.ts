import { Routes } from '@angular/router';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectCreateComponent } from './subject-create/subject-create.component';
import { SubjectDetailComponent } from './subject-detail/subject-detail.component';
import { SubjectEditComponent } from './subject-edit/subject-edit.component';
import { RoleGuard } from '../auth/role.guard';

export const subjectRoutes: Routes = [
  {
    path: 'subjects',
    component: SubjectListComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin', 'teacher', 'student'] },
  },
  {
    path: 'subjects/create',
    component: SubjectCreateComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'subjects/:id/edit',
    component: SubjectEditComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'subjects/:id',
    component: SubjectDetailComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin', 'teacher', 'student'] },
  },
];
