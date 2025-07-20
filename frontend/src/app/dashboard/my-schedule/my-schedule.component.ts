import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-schedule.component.html',
})
export class MyScheduleComponent {
  private http = inject(HttpClient);

  days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

  hours: string[] = [];
  schedule: any[] = [];
  selectedEvent: any = null;

  constructor() {
    this.generateHours();
    this.fetchSchedule();
  }

  generateHours() {
    for (let h = 8; h <= 18; h++) {
      this.hours.push(`${h.toString().padStart(2, '0')}:00`);
    }
  }

  fetchSchedule() {
    this.http
      .get<any[]>('http://localhost:8000/api/schedules/my-schedule/')
      .subscribe((data) => {
        this.schedule = data;
      });
  }

  getEventsAt(dayIndex: number, hour: string) {
    return this.schedule.filter((e) => {
      const eventDay = this.fixDay(e.week_day);
      const eventStartHour = parseInt(e.start_time.split(':')[0]);
      const currentHour = parseInt(hour.split(':')[0]);

      return eventDay === dayIndex && eventStartHour === currentHour;
    });
  }

  fixDay(weekday: number): number {
    return weekday;
  }

  openModal(event: any) {
    this.selectedEvent = event;
  }

  closeModal() {
    this.selectedEvent = null;
  }
}
