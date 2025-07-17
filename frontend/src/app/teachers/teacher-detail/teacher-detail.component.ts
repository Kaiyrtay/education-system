import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TeacherService } from '../teacher.service';
import { Teacher } from '../teacher.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './teacher-detail.component.html',
})
export class TeacherDetailComponent implements OnInit {
  teacher: Teacher | null = null;
  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.errorMessage = 'Invalid teacher ID.';
      this.loading = false;
      return;
    }

    this.teacherService.get(id).subscribe({
      next: (data) => {
        this.teacher = data ?? null;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load teacher.';
        this.loading = false;
      },
    });
  }

  delete(): void {
    if (!this.teacher?.id) return;
    if (!confirm('Delete this teacher?')) return;

    this.teacherService.delete(this.teacher.id).subscribe({
      next: () => this.router.navigate(['/teachers']),
      error: () => alert('Failed to delete teacher.'),
    });
  }
}
