import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TeacherService } from '../teacher.service';
import { Teacher } from '../teacher.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teacher-edit',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './teacher-edit.component.html',
})
export class TeacherEditComponent implements OnInit {
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

  submit() {
    this.teacherService.update(this.teacher.id!, this.teacher).subscribe(() => {
      this.router.navigate(['/teachers']);
    });
  }
}
