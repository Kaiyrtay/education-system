import { Routes } from '@angular/router';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectCreateComponent } from './subject-create/subject-create.component';
import { SubjectDetailComponent } from './subject-detail/subject-detail.component';
import { SubjectEditComponent } from './subject-edit/subject-edit.component';

export const subjectRoutes: Routes = [
  { path: 'subjects', component: SubjectListComponent },
  { path: 'subjects/create', component: SubjectCreateComponent },
  { path: 'subjects/:id/edit', component: SubjectEditComponent },
  { path: 'subjects/:id', component: SubjectDetailComponent },
];
