import { Routes } from '@angular/router';
import { authRoutes } from './auth/auth.routes';
import { userRoutes } from './users/user.routes';
import { groupRoutes } from './groups/group.routes';
import { studentRoutes } from './students/students.routes';
import { subjectRoutes } from './subjects/subject.routes';
import { teacherRoutes } from './teachers/teacher.routes';

export const routes: Routes = [
  ...authRoutes,
  ...userRoutes,
  ...groupRoutes,
  ...studentRoutes,
  ...subjectRoutes,
  ...teacherRoutes,
];
