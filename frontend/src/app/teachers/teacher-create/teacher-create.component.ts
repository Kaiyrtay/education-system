import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TeacherService } from '../teacher.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teacher-create',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './teacher-create.component.html',
})
export class TeacherCreateComponent {
  form = {
    user: {
      username: '',
      email: '',
      password: '',
      first_name: '',
      last_name: '',
    },
  };

  constructor(private teacherService: TeacherService, private router: Router) {}

  submit() {
    this.teacherService.create(this.form).subscribe({
      next: () => this.router.navigate(['/teachers']),
      error: (err) => {
        if (err.status === 400) {
          this.errors = err.error;
        }
      },
    });
  }

  errors: any = {};
}
