import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Teacher } from './teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private apiUrl = 'http://localhost:8000/api/teachers/';

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(this.apiUrl);
  }

  get(id: number) {
    return this.http.get<Teacher | null>(`${this.apiUrl}${id}/`);
  }

  create(teacher: any) {
    return this.http.post<any>(this.apiUrl, teacher);
  }

  update(id: number, teacher: any) {
    return this.http.put<any>(`${this.apiUrl}${id}/`, teacher);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
