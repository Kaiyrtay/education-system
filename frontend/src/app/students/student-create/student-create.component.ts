import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StudentService } from '../students.service';
import { GroupService } from '../../groups/group.service';

@Component({
  selector: 'app-student-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './student-create.component.html',
})
export class StudentCreateComponent implements OnInit {
  groups: any[] = [];

  form = {
    user: {
      username: '',
      email: '',
      password: '',
      first_name: '',
      last_name: '',
    },
    group: undefined as number | undefined,
  };

  constructor(
    private studentService: StudentService,
    private groupService: GroupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.groupService.list().subscribe({
      next: (res: any) => {
        if (!res) this.groups = [];
        else if (Array.isArray(res)) this.groups = res;
        else this.groups = [res];
      },
      error: () => alert('Failed to load groups'),
    });
  }

  submit(): void {
    if (
      !this.form.user.username.trim() ||
      !this.form.user.email.trim() ||
      !this.form.user.password.trim()
    ) {
      alert('Username, Email, and Password are required.');
      return;
    }

    this.studentService.create(this.form).subscribe({
      next: () => {
        alert('Student created.');
        this.router.navigate(['/students']);
      },
      error: (err: any) => {
        console.error('Create error:', err);
        alert('Failed to create student.');
      },
    });
  }
}
