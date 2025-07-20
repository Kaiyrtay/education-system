import { Component } from '@angular/core';
import { GroupModel } from '../group.model.model';
import { GroupService } from '../group.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-group-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.css',
})
export class GroupListComponent {
  groups: GroupModel[] = [];
  constructor(
    private groupService: GroupService,
    public authService: AuthService
  ) {}
  ngOnInit() {
    this.groupService.list().subscribe({
      next: (res) => {
        this.groups = res as GroupModel[];
      },
      error: () => {
        alert('Fail to load groups');
      },
    });
  }
  delete(id: number | undefined): void {
    if (id == null) {
      return;
    }
    this.groupService.confirmDelete(id);
  }
}
