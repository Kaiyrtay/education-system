import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StudentService } from '../students.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-list.component.html',
})
export class StudentListComponent implements OnInit {
  students: any[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.studentService.list().subscribe({
      next: (res: any) => {
        if (!res) this.students = [];
        else if (Array.isArray(res)) this.students = res;
        else this.students = [res];
      },
      error: () => alert('Failed to load students'),
    });
  }

  delete(id?: number): void {
    if (!id) return;
    if (!confirm('Delete this student?')) return;
    this.studentService.delete(id).subscribe({
      next: () => {
        alert('Student deleted.');
        this.load();
      },
      error: () => alert('Failed to delete student'),
    });
  }
}
