import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from '../subject.model';
import { SubjectService } from '../subject.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css'],
})
export class SubjectListComponent implements OnInit {
  subjects: Subject[] = [];
  loading = false;
  error: string | null = null;

  constructor(private subjectService: SubjectService) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.loading = true;
    this.error = null;
    this.subjectService.list().subscribe({
      next: (data: any) => {
        this.subjects = Array.isArray(data) ? data : [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load subjects.';
        this.loading = false;
      },
    });
  }

  delete(id?: number): void {
    if (!id) return;
    if (!confirm('Delete this subject?')) return;
    this.subjectService.delete(id).subscribe({
      next: () => {
        this.subjects = this.subjects.filter((s) => s.id !== id);
      },
    });
  }
}
