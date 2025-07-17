import { Routes } from '@angular/router';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherCreateComponent } from './teacher-create/teacher-create.component';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';
import { TeacherEditComponent } from './teacher-edit/teacher-edit.component';

export const teacherRoutes: Routes = [
  { path: 'teachers', component: TeacherListComponent },
  { path: 'teachers/create', component: TeacherCreateComponent },
  { path: 'teachers/:id', component: TeacherDetailComponent },
  { path: 'teachers/:id/edit', component: TeacherEditComponent },
];
