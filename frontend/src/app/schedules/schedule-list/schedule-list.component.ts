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
    return this.weekdays.find((w) => w.value === v)?.label ?? String(v);
  }

  groupLabel(s: any): string {
    const g = s.group;
    if (g == null) return '—';
    if (typeof g === 'object') {
      return g.name ?? g.code ?? g.id ?? '—';
    }
    return `#${g}`;
  }

  subjectLabel(s: any): string {
    const sub = s.subject;
    if (sub == null) return '—';
    if (typeof sub === 'object') {
      return sub.name ?? sub.code ?? sub.id ?? '—';
    }
    return `#${sub}`;
  }

  teacherLabel(s: any): string {
    const t = s.teacher;
    if (t == null) return '—';
    if (typeof t === 'object') {
      if (t.user) {
        const u = t.user;
        const full =
          [u.first_name, u.last_name].filter(Boolean).join(' ').trim() ||
          u.username;
        return full || t.id || '—';
      }
      return t.name ?? t.id ?? '—';
    }
    return `#${t}`;
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
