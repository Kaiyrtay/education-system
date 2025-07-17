import { Routes } from '@angular/router';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupCreateComponent } from './group-create/group-create.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { GroupUpdateComponent } from './group-update/group-update.component';

export const groupRoutes: Routes = [
  { path: 'groups', component: GroupListComponent },
  { path: 'groups/create', component: GroupCreateComponent },
  { path: 'groups/:id', component: GroupDetailComponent },
  { path: 'groups/:id/edit', component: GroupUpdateComponent },
];
