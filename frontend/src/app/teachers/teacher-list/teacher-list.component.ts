import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { Teacher } from '../teacher.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './teacher-list.component.html',
})
export class TeacherListComponent implements OnInit {
  teachers: Teacher[] = [];

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.teacherService.list().subscribe((data: any) => {
      this.teachers = data;
    });
  }

  delete(id: number) {
    if (confirm('Delete this teacher?')) {
      this.teacherService.delete(id).subscribe(() => {
        this.teachers = this.teachers.filter((t) => t.id !== id);
      });
    }
  }
}
