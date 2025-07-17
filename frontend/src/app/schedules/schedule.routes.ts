import { Routes } from '@angular/router';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ScheduleCreateComponent } from './schedule-create/schedule-create.component';
import { ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';
import { ScheduleEditComponent } from './schedule-edit/schedule-edit.component';

export const scheduleRoutes: Routes = [
  { path: 'schedules', component: ScheduleListComponent },
  { path: 'schedules/create', component: ScheduleCreateComponent },
  { path: 'schedules/:id', component: ScheduleDetailComponent },
  { path: 'schedules/:id/edit', component: ScheduleEditComponent },
];
