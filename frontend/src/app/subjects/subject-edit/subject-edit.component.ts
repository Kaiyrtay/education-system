import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { SubjectService } from '../subject.service';
import { Subject } from '../subject.model';

@Component({
  selector: 'app-subject-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.css'],
})
export class SubjectEditComponent implements OnInit {
  id!: number;
  form: Subject = { code: '', name: '', desc: '' };
  loading = false;
  saving = false;
  error: string | null = null;

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
    this.subjectService.get(this.id).subscribe({
      next: (s: any) => {
        if (s) {
          this.form = { ...s };
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load subject.';
        this.loading = false;
      },
    });
  }

  submit(formRef: NgForm): void {
    if (formRef.invalid) return;
    this.saving = true;
    this.error = null;

    this.subjectService.update(this.id, this.form).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/subjects', this.id]);
      },
      error: () => {
        this.error = 'Failed to update subject.';
        this.saving = false;
      },
    });
  }

  delete(): void {
    if (!confirm('Delete this subject?')) return;
    this.subjectService.delete(this.id).subscribe({
      next: () => this.router.navigate(['/subjects']),
    });
  }
}
