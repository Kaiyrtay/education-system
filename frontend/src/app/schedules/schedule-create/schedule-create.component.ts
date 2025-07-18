import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ScheduleService } from '../schedule.service';
import { GroupService } from '../../groups/group.service';
import { SubjectService } from '../../subjects/subject.service';
import { TeacherService } from '../../teachers/teacher.service';

@Component({
  selector: 'app-schedule-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './schedule-create.component.html',
})
export class ScheduleCreateComponent implements OnInit {
  groups: any[] = [];
  subjects: any[] = [];
  teachers: any[] = [];

  form = {
    group: undefined as number | undefined,
    subject: undefined as number | undefined,
    teacher: undefined as number | undefined,
    week_day: undefined as number | undefined,
    start_time: '',
    end_time: '',
  };

  timeError = '';
  serverError = '';

  weekdays = [
    { value: 0, label: 'Monday' },
    { value: 1, label: 'Tuesday' },
    { value: 2, label: 'Wednesday' },
    { value: 3, label: 'Thursday' },
    { value: 4, label: 'Friday' },
    { value: 5, label: 'Saturday' },
    { value: 6, label: 'Sunday' },
  ];

  loading = true;

  constructor(
    private scheduleService: ScheduleService,
    private groupService: GroupService,
    private subjectService: SubjectService,
    private teacherService: TeacherService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGroups();
    this.loadSubjects();
    this.loadTeachers();
    this.loading = false;
  }

  private loadGroups(): void {
    this.groupService.list().subscribe({
      next: (res: any) => {
        this.groups = Array.isArray(res) ? res : res ? [res] : [];
      },
      error: () => alert('Failed to load groups'),
    });
  }

  private loadSubjects(): void {
    this.subjectService.list().subscribe({
      next: (res: any) => {
        this.subjects = Array.isArray(res) ? res : res ? [res] : [];
      },
      error: () => alert('Failed to load subjects'),
    });
  }

  private loadTeachers(): void {
    this.teacherService.list().subscribe({
      next: (res: any) => {
        this.teachers = Array.isArray(res) ? res : res ? [res] : [];
      },
      error: () => alert('Failed to load teachers'),
    });
  }

  validateTimes(): boolean {
    this.timeError = '';
    const { start_time, end_time } = this.form;
    if (!start_time || !end_time) return true;

    if (start_time >= end_time) {
      this.timeError = 'Start time must be before end time.';
      return false;
    }
    return true;
  }

  submit(formRef: NgForm): void {
    this.serverError = '';

    if (formRef.invalid) {
      this.serverError = 'Please fill all required fields.';
      return;
    }

    if (!this.validateTimes()) {
      return;
    }
    const payload = {
      group: this.form.group,
      subject: this.form.subject,
      teacher: this.form.teacher,
      week_day: this.form.week_day,
      start_time: this.form.start_time,
      end_time: this.form.end_time,
    };

    this.scheduleService.create(payload).subscribe({
      next: () => {
        alert('Schedule created.');
        this.router.navigate(['/schedules']);
      },
      error: (err) => {
        console.error('Schedule create error:', err);
        const e = err?.error;
        if (typeof e === 'string') {
          this.serverError = e;
        } else if (e?.non_field_errors?.length) {
          this.serverError = e.non_field_errors.join(' ');
        } else if (e?.detail) {
          this.serverError = e.detail;
        } else {
          const teacherErr = Array.isArray(e?.teacher)
            ? e.teacher.join(' ')
            : null;
          this.serverError =
            teacherErr ||
            'Failed to create schedule. Check for overlapping times or invalid data.';
        }
      },
    });
  }
}
