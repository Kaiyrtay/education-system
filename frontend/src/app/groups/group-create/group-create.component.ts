import { Component } from '@angular/core';
import { GroupModel } from '../group.model.model';
import { GroupService } from '../group.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-group-create',
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  templateUrl: './group-create.component.html',
  styleUrl: './group-create.component.css',
})
export class GroupCreateComponent {
  form: GroupModel = { name: '', code: '' };
  constructor(
    private groupService: GroupService,
    private router: Router,
    public authService: AuthService
  ) {}

  submit(): void {
    this.groupService.create(this.form).subscribe({
      next: () => this.router.navigate(['/groups']),
      error: (error) => {
        if (error.status === 400 && error.error?.code?.[0]) {
          alert(`Validation error: ${error.error.code[0]}`);
        } else {
          alert('Failed to create group');
        }
      },
    });
  }
}
