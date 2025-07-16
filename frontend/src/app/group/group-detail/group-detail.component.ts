import { Component } from '@angular/core';
import { GroupModel } from '../group.model.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GroupService } from '../group.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-group-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './group-detail.component.html',
  styleUrl: './group-detail.component.css',
})
export class GroupDetailComponent {
  group: GroupModel | null = null;
  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService
  ) {}
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.groupService.get(id).subscribe({
      next: (data) => (this.group = data),
      error: () => alert('Faild to load group'),
    });
  }
  delete(): void {
    this.groupService.confirmDelete(this.group?.id);
  }
}
