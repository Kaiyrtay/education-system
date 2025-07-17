import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Schedule } from './schedule.model';

@Injectable({ providedIn: 'root' })
export class ScheduleService {
  private apiUrl = 'http://localhost:8000/api/schedules/';
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(this.apiUrl);
  }

  get(id: number) {
    return this.http.get<Schedule | null>(`${this.apiUrl}${id}/`);
  }

  create(schedule: any) {
    return this.http.post<Schedule>(this.apiUrl, schedule);
  }

  update(id: number, schedule: any) {
    return this.http.put<Schedule>(`${this.apiUrl}${id}/`, schedule);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
