import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from './subject.model';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private apiUrl = 'http://localhost:8000/api/subjects/';

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(this.apiUrl);
  }

  get(id: number) {
    return this.http.get<Subject | null>(`${this.apiUrl}${id}/`);
  }

  create(subject: any) {
    return this.http.post<any>(this.apiUrl, subject);
  }

  update(id: number, subject: any) {
    return this.http.put<any>(`${this.apiUrl}${id}/`, subject);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
