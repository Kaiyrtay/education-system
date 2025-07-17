import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StudentService } from '../students.service';
import { GroupService } from '../../groups/group.service';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './student-edit.component.html',
})
export class StudentEditComponent implements OnInit {
  id!: number;
  groups: any[] = [];
  loading = true;

  form = {
    user: {
      username: '',
      email: '',
      // password left blank unless user wants to reset
      password: '',
      first_name: '',
      last_name: '',
    },
    group: undefined as number | undefined,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.id) {
      alert('Invalid student id.');
      this.router.navigate(['/students']);
      return;
    }

    // load groups
    this.groupService.list().subscribe({
      next: (res: any) => {
        this.groups = Array.isArray(res) ? res : [res];
      },
      error: () => alert('Failed to load groups'),
    });

    // load student
    this.studentService.get(this.id).subscribe({
      next: (res: any) => {
        const stu = Array.isArray(res) ? res[0] : res;
        if (stu) {
          this.form.user.username = stu.user?.username ?? '';
          this.form.user.email = stu.user?.email ?? '';
          this.form.user.first_name = stu.user?.first_name ?? '';
          this.form.user.last_name = stu.user?.last_name ?? '';
          this.form.group = stu.group;
        }
        this.loading = false;
      },
      error: () => {
        alert('Failed to load student.');
        this.router.navigate(['/students']);
      },
    });
  }

  submit(): void {
    // Don't send empty password unless user entered one
    const payload: any = {
      user: {
        username: this.form.user.username,
        email: this.form.user.email,
        first_name: this.form.user.first_name,
        last_name: this.form.user.last_name,
      },
      group: this.form.group,
    };
    if (this.form.user.password?.trim()) {
      payload.user.password = this.form.user.password;
    }

    this.studentService.update(this.id, payload).subscribe({
      next: () => {
        alert('Student updated.');
        this.router.navigate(['/students']);
      },
      error: () => alert('Failed to update student.'),
    });
  }

  delete(): void {
    if (!confirm('Delete this student?')) return;
    this.studentService.delete(this.id).subscribe({
      next: () => {
        alert('Student deleted.');
        this.router.navigate(['/students']);
      },
      error: () => alert('Failed to delete student.'),
    });
  }
}
