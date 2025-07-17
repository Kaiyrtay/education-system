import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { SubjectService } from '../subject.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Subject } from '../subject.model';

@Component({
  selector: 'app-subject-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  templateUrl: './subject-create.component.html',
  styleUrls: ['./subject-create.component.css'],
})
export class SubjectCreateComponent {
  form: Subject = { code: '', name: '', desc: '' };
  saving = false;
  error: string | null = null;

  constructor(private subjectService: SubjectService, private router: Router) {}

  submit(formRef: NgForm): void {
    if (formRef.invalid) return;
    this.saving = true;
    this.error = null;

    this.subjectService.create(this.form).subscribe({
      next: (s: any) => {
        const id = s?.id;
        this.saving = false;
        if (id) {
          this.router.navigate(['/subjects', id]);
        } else {
          this.router.navigate(['/subjects']);
        }
      },
      error: () => {
        this.error = 'Failed to create subject.';
        this.saving = false;
      },
    });
  }
}
