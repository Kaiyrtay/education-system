import { Routes } from '@angular/router';
import { authRoutes } from './auth/auth.routes';
import { userRoutes } from './users/user.routes';
import { groupRoutes } from './groups/group.routes';
import { studentRoutes } from './students/students.routes';
import { subjectRoutes } from './subjects/subject.routes';
import { teacherRoutes } from './teachers/teacher.routes';
import { scheduleRoutes } from './schedules/schedule.routes';
import { MyScheduleComponent } from './dashboard/my-schedule/my-schedule.component';
import { RoleGuard } from './auth/role.guard';
import { ForbiddenComponent } from './shared/pages/forbidden/forbidden.component';

export const routes: Routes = [
  ...authRoutes,
  ...userRoutes,
  ...groupRoutes,
  ...studentRoutes,
  ...subjectRoutes,
  ...teacherRoutes,
  ...scheduleRoutes,
  {
    path: 'my-schedule',
    component: MyScheduleComponent,
    canActivate: [RoleGuard],
    data: { roles: ['teacher', 'student'] },
  },
  { path: 'forbidden', component: ForbiddenComponent },
];
