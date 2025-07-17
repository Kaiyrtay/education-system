import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from '../subject.model';
import { SubjectService } from '../subject.service';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';

@Component({
  selector: 'app-subject-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.css'],
})
export class SubjectDetailComponent implements OnInit {
  subject?: Subject;
  loading = false;
  error: string | null = null;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.id) {
      this.error = 'Invalid subject ID.';
      return;
    }
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = null;
    this.subjectService.get(this.id).subscribe({
      next: (s: any) => {
        this.subject = s || undefined;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load subject.';
        this.loading = false;
      },
    });
  }

  delete(): void {
    if (!this.subject?.id) return;
    if (!confirm('Delete this subject?')) return;
    this.subjectService.delete(this.subject.id).subscribe({
      next: () => this.router.navigate(['/subjects']),
    });
  }
}
