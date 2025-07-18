import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ScheduleService } from '../schedule.service';
import { WEEKDAYS } from '../weekdays';

@Component({
  selector: 'app-schedule-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './schedule-list.component.html',
})
export class ScheduleListComponent implements OnInit {
  schedules: any[] = [];
  weekdays = WEEKDAYS;

  loading = false;
  errorMessage = '';

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.errorMessage = '';
    this.scheduleService.list().subscribe({
      next: (res: any) => {
        if (!res) {
          this.schedules = [];
        } else if (Array.isArray(res)) {
          this.schedules = res;
        } else {
          this.schedules = [res];
        }
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load schedules';
        this.loading = false;
      },
    });
  }

  weekdayLabel(v: number | null | undefined): string {
    if (v == null) return '—';
    const day = this.weekdays.find((w) => w.value === v);
    return day ? day.label : String(v);
  }

  groupLabel(s: any): string {
    if (!s || !s.group_info) return '—';

    const group = s.group_info;
    if (group.name) return group.name;
    if (group.code) return group.code;
    if (group.title) return group.title;
    if (group.id) return `Group ${group.id}`;

    return '—';
  }

  subjectLabel(s: any): string {
    if (!s || !s.subject_info) return '—';

    const subject = s.subject_info;
    if (subject.name) return subject.name;
    if (subject.code) return subject.code;
    if (subject.title) return subject.title;
    if (subject.id) return `Subject ${subject.id}`;

    return '—';
  }

  teacherLabel(s: any): string {
    if (!s || !s.teacher_info) return '—';

    const teacher = s.teacher_info;
    if (teacher.name) return teacher.name;
    if (teacher.full_name) return teacher.full_name;
    if (teacher.id) return `Teacher ${teacher.id}`;

    return '—';
  }

  delete(id?: number): void {
    if (id == null) return;
    if (!confirm('Delete this schedule entry?')) return;
    this.scheduleService.delete(id).subscribe({
      next: () => {
        alert('Schedule deleted.');
        this.load();
      },
      error: () => alert('Failed to delete schedule.'),
    });
  }

  trackById = (_: number, item: any) => item?.id ?? _;
}
