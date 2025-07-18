import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ScheduleService } from '../schedule.service';
import { Schedule } from '../schedule.model';

@Component({
  selector: 'app-schedule-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './schedule-detail.component.html',
})
export class ScheduleDetailComponent implements OnInit {
  schedule!: Schedule;

  constructor(
    private route: ActivatedRoute,
    private scheduleService: ScheduleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.scheduleService
      .get(id)
      .subscribe((data: any) => (this.schedule = data));
  }

  getWeekDayName(day: number | undefined): string {
    const days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    if (day == null || day < 0 || day > 6) return 'N/A';
    return days[day];
  }

  groupLabel(): string {
    const g: any = (this.schedule as any).group_info;
    if (!g) return 'N/A';
    return g.name ?? g.id ?? 'N/A';
  }

  subjectLabel(): string {
    const s: any = (this.schedule as any).subject_info;
    if (!s) return 'N/A';
    return s.name ?? s.id ?? 'N/A';
  }

  teacherLabel(): string {
    const t: any = (this.schedule as any).teacher_info;
    if (!t) return 'N/A';
    return t.name ?? t.id ?? 'N/A';
  }

  delete() {
    if (confirm('Delete this schedule?')) {
      this.scheduleService.delete(this.schedule.id!).subscribe(() => {
        this.router.navigate(['/schedules']);
      });
    }
  }
}
