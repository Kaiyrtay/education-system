import { Injectable } from '@angular/core';
import { Student } from './students.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:8000/api/students/students/';

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(this.apiUrl);
  }

  get(id: number) {
    return this.http.get<Student | null>(`${this.apiUrl}${id}/`);
  }

  create(student: any) {
    return this.http.post<any>(this.apiUrl, student);
  }

  update(id: number, student: any) {
    return this.http.put<any>(`${this.apiUrl}${id}/`, student);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
