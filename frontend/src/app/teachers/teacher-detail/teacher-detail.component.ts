import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TeacherService } from '../teacher.service';
import { Teacher } from '../teacher.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './teacher-detail.component.html',
})
export class TeacherDetailComponent implements OnInit {
  teacher!: Teacher;

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.teacherService.get(id).subscribe((data: any) => (this.teacher = data));
  }

  delete() {
    if (confirm('Delete this teacher?')) {
      this.teacherService
        .delete(this.teacher.id!)
        .subscribe(() => this.router.navigate(['/teachers']));
    }
  }
}
