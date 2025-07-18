import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ScheduleService } from '../schedule.service';
import { GroupService } from '../../groups/group.service';
import { SubjectService } from '../../subjects/subject.service';
import { TeacherService } from '../../teachers/teacher.service';
import { Schedule } from '../schedule.model';

interface Group {
  id: number;
  name?: string;
  code?: string;
}

interface Subject {
  id: number;
  name?: string;
  code?: string;
}

interface Teacher {
  id: number;
  user?: {
    first_name?: string;
    last_name?: string;
    username?: string;
  };
}

interface ScheduleForm {
  group: number | null;
  subject: number | null;
  teacher: number | null;
  week_day: number | null;
  start_time: string;
  end_time: string;
}

@Component({
  selector: 'app-schedule-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './schedule-edit.component.html',
})
export class ScheduleEditComponent implements OnInit {
  id!: number;
  loading = true;
  submitting = false;

  groups: Group[] = [];
  subjects: Subject[] = [];
  teachers: Teacher[] = [];

  schedule: any = null;

  form: ScheduleForm = {
    group: null,
    subject: null,
    teacher: null,
    week_day: null,
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scheduleService: ScheduleService,
    private groupService: GroupService,
    private subjectService: SubjectService,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    // Get ID from route
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam || isNaN(Number(idParam))) {
      alert('Invalid schedule ID.');
      this.router.navigate(['/schedules']);
      return;
    }

    this.id = Number(idParam);

    // Load all data
    this.loadInitialData();
  }

  private async loadInitialData(): Promise<void> {
    try {
      // Load dropdown data first
      await Promise.all([
        this.loadGroups(),
        this.loadSubjects(),
        this.loadTeachers(),
      ]);

      // Then load the schedule
      await this.loadSchedule();
    } catch (error) {
      console.error('Error loading initial data:', error);
      alert('Failed to load data.');
      this.loading = false;
    }
  }

  private loadSchedule(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.scheduleService.get(this.id).subscribe({
        next: (data: any) => {
          this.schedule = data;
          this.patchFormFromSchedule(data);
          this.loading = false;
          resolve();
        },
        error: (error) => {
          alert('Failed to load schedule.');
          this.loading = false;
          reject(error);
        },
      });
    });
  }

  private patchFormFromSchedule(data: any): void {
    this.form.group = this.extractId(data.group);
    this.form.subject = this.extractId(data.subject);
    this.form.teacher = this.extractId(data.teacher);
    this.form.week_day = data.week_day ?? null;
    this.form.start_time = data.start_time || '';
    this.form.end_time = data.end_time || '';
  }

  private extractId(objOrId: any): number | null {
    if (objOrId == null) return null;
    if (typeof objOrId === 'number') return objOrId;
    if (typeof objOrId === 'object' && 'id' in objOrId) return objOrId.id;
    return null;
  }

  private loadGroups(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.groupService.list().subscribe({
        next: (res: any) => {
          this.groups = Array.isArray(res) ? res : res ? [res] : [];
          resolve();
        },
        error: (error) => {
          alert('Failed to load groups');
          reject(error);
        },
      });
    });
  }

  private loadSubjects(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.subjectService.list().subscribe({
        next: (res: any) => {
          this.subjects = Array.isArray(res) ? res : res ? [res] : [];
          resolve();
        },
        error: (error) => {
          alert('Failed to load subjects');
          reject(error);
        },
      });
    });
  }

  private loadTeachers(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.teacherService.list().subscribe({
        next: (res: any) => {
          this.teachers = Array.isArray(res) ? res : res ? [res] : [];
          resolve();
        },
        error: (error) => {
          alert('Failed to load teachers');
          reject(error);
        },
      });
    });
  }

  validateTimes(): boolean {
    this.timeError = '';
    const { start_time, end_time } = this.form;

    if (!start_time || !end_time) {
      return true; // Don't validate if either is empty
    }

    if (start_time >= end_time) {
      this.timeError = 'Start time must be before end time.';
      return false;
    }

    return true;
  }

  isFormValid(): boolean {
    return (
      this.form.group !== null &&
      this.form.subject !== null &&
      this.form.teacher !== null &&
      this.form.week_day !== null &&
      this.form.start_time !== '' &&
      this.form.end_time !== '' &&
      this.validateTimes()
    );
  }

  submit(formRef: NgForm): void {
    this.serverError = '';

    if (!this.isFormValid()) {
      this.serverError = 'Please fill all required fields correctly.';
      return;
    }

    if (!this.validateTimes()) {
      return;
    }

    this.submitting = true;

    const payload = {
      group: this.form.group,
      subject: this.form.subject,
      teacher: this.form.teacher,
      week_day: this.form.week_day,
      start_time: this.form.start_time,
      end_time: this.form.end_time,
    };

    this.scheduleService.update(this.id, payload).subscribe({
      next: () => {
        alert('Schedule updated successfully.');
        this.router.navigate(['/schedules']);
      },
      error: (err) => {
        console.error('Schedule update error:', err);
        this.submitting = false;

        const errorResponse = err?.error;

        if (typeof errorResponse === 'string') {
          this.serverError = errorResponse;
        } else if (errorResponse?.non_field_errors?.length) {
          this.serverError = errorResponse.non_field_errors.join(' ');
        } else if (errorResponse?.detail) {
          this.serverError = errorResponse.detail;
        } else {
          // Check for specific field errors
          const fieldErrors = [];

          if (errorResponse?.teacher && Array.isArray(errorResponse.teacher)) {
            fieldErrors.push(`Teacher: ${errorResponse.teacher.join(' ')}`);
          }
          if (errorResponse?.group && Array.isArray(errorResponse.group)) {
            fieldErrors.push(`Group: ${errorResponse.group.join(' ')}`);
          }
          if (errorResponse?.subject && Array.isArray(errorResponse.subject)) {
            fieldErrors.push(`Subject: ${errorResponse.subject.join(' ')}`);
          }
          if (
            errorResponse?.start_time &&
            Array.isArray(errorResponse.start_time)
          ) {
            fieldErrors.push(
              `Start time: ${errorResponse.start_time.join(' ')}`
            );
          }
          if (
            errorResponse?.end_time &&
            Array.isArray(errorResponse.end_time)
          ) {
            fieldErrors.push(`End time: ${errorResponse.end_time.join(' ')}`);
          }

          this.serverError =
            fieldErrors.length > 0
              ? fieldErrors.join('. ')
              : 'Failed to update schedule. Please check for overlapping times or invalid data.';
        }
      },
    });
  }

  delete(): void {
    if (!confirm('Are you sure you want to delete this schedule?')) {
      return;
    }

    this.scheduleService.delete(this.id).subscribe({
      next: () => {
        alert('Schedule deleted successfully.');
        this.router.navigate(['/schedules']);
      },
      error: (err) => {
        console.error('Delete error:', err);
        alert('Failed to delete schedule.');
      },
    });
  }

  getTeacherDisplayName(teacher: Teacher): string {
    const firstName = teacher.user?.first_name || '';
    const lastName = teacher.user?.last_name || '';
    const fullName = `${firstName} ${lastName}`.trim();

    return fullName || teacher.user?.username || `Teacher ${teacher.id}`;
  }

  getGroupDisplayName(group: Group): string {
    return group.name || group.code || `Group ${group.id}`;
  }

  getSubjectDisplayName(subject: Subject): string {
    return subject.name || subject.code || `Subject ${subject.id}`;
  }
}
