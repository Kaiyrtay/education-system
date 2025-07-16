import { Component } from '@angular/core';
import { GroupModel } from '../group.model.model';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { GroupService } from '../group.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-group-update',
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  templateUrl: './group-update.component.html',
  styleUrl: './group-update.component.css',
})
export class GroupUpdateComponent {
  form: GroupModel = { id: 0, name: '', code: '' };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.groupService.get(id).subscribe({
      next: (group) => (this.form = group),
      error: () => alert('Failed to laod groups'),
    });
  }
  submit(): void {
    this.groupService.update(this.form.id!, this.form).subscribe({
      next: () => this.router.navigate(['/groups']),
      error: (error) => {
        if (error.status === 400 && error.error?.code?.[0]) {
          alert(`Validation error: ${error.error.code[0]}`);
        } else {
          alert('Failed to update group');
        }
      },
    });
  }
}
