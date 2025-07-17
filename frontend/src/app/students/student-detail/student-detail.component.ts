import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { StudentService } from '../students.service';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './student-detail.component.html',
})
export class StudentDetailComponent implements OnInit {
  student: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      alert('Invalid student id.');
      this.router.navigate(['/students']);
      return;
    }

    this.studentService.get(id).subscribe({
      next: (res: any) => {
        this.student = Array.isArray(res) ? res[0] : res;
        this.loading = false;
      },
      error: () => {
        alert('Failed to load student.');
        this.router.navigate(['/students']);
      },
    });
  }

  delete(): void {
    if (!this.student?.id) return;
    if (!confirm('Delete this student?')) return;
    this.studentService.delete(this.student.id).subscribe({
      next: () => {
        alert('Student deleted.');
        this.router.navigate(['/students']);
      },
      error: () => alert('Failed to delete student.'),
    });
  }
}
