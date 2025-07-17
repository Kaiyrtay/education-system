import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { Teacher } from '../teacher.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './teacher-list.component.html',
})
export class TeacherListComponent implements OnInit {
  teachers: Teacher[] = [];

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.teacherService.list().subscribe({
      next: (data: any) => {
        this.teachers = Array.isArray(data) ? data : data ? [data] : [];
      },
      error: () => alert('Failed to load teachers'),
    });
  }

  delete(id?: number): void {
    if (!id) return;
    if (!confirm('Delete this teacher?')) return;

    this.teacherService.delete(id).subscribe({
      next: () => {
        this.teachers = this.teachers.filter((t) => t.id !== id);
      },
      error: () => alert('Failed to delete teacher'),
    });
  }
}
