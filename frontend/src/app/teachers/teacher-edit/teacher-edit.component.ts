import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TeacherService } from '../teacher.service';
import { Teacher } from '../teacher.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teacher-edit',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './teacher-edit.component.html',
})
export class TeacherEditComponent implements OnInit {
  id!: number;
  loading = true;
  errorMessage = '';

  teacher: Teacher | null = null;

  form = {
    user: {
      username: '',
      email: '',
      password: '',
      first_name: '',
      last_name: '',
    },
  };

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.id) {
      alert('Invalid teacher id.');
      this.router.navigate(['/teachers']);
      return;
    }

    this.teacherService.get(this.id).subscribe({
      next: (data: any) => {
        const t = Array.isArray(data) ? data[0] : data;
        if (!t) {
          this.errorMessage = 'Teacher not found.';
          this.loading = false;
          return;
        }

        this.teacher = t;

        const u: any = t.user ?? {};
        this.form.user.username = u.username ?? '';
        this.form.user.email = u.email ?? '';
        this.form.user.first_name = u.first_name ?? '';
        this.form.user.last_name = u.last_name ?? '';

        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load teacher.';
        this.loading = false;
      },
    });
  }

  submit(): void {
    if (!this.teacher?.id) return;

    const payload: any = {
      user: {
        username: this.form.user.username,
        email: this.form.user.email,
        first_name: this.form.user.first_name,
        last_name: this.form.user.last_name,
      },
    };

    if (this.form.user.password.trim()) {
      payload.user.password = this.form.user.password.trim();
    }

    this.teacherService.update(this.teacher.id, payload).subscribe({
      next: () => {
        alert('Teacher updated.');
        this.router.navigate(['/teachers']);
      },
      error: (err) => {
        console.error('Update error:', err);
        alert('Failed to update teacher.');
      },
    });
  }

  delete(): void {
    if (!this.teacher?.id) return;
    if (!confirm('Delete this teacher?')) return;

    this.teacherService.delete(this.teacher.id).subscribe({
      next: () => {
        alert('Teacher deleted.');
        this.router.navigate(['/teachers']);
      },
      error: () => alert('Failed to delete teacher.'),
    });
  }
}
