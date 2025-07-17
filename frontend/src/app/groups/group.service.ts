import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GroupModel } from './group.model.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private apiUrl = 'http://localhost:8000/api/students/groups/';
  constructor(private http: HttpClient, private router: Router) {}

  list(): Observable<GroupModel[] | GroupModel> {
    return this.http.get<GroupModel[] | GroupModel>(this.apiUrl);
  }
  get(id: number): Observable<GroupModel> {
    return this.http.get<GroupModel>(`${this.apiUrl}${id}/`);
  }
  create(group: GroupModel): Observable<GroupModel> {
    return this.http.post<GroupModel>(this.apiUrl, group);
  }
  update(id: number, group: GroupModel): Observable<GroupModel> {
    return this.http.put<GroupModel>(`${this.apiUrl}${id}/`, group);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
  confirmDelete(id: number | undefined): void {
    if (!id) {
      return;
    }
    if (confirm('Delete this group?')) {
      this.delete(id).subscribe({
        next: () => {
          alert('Group deleted.');
          this.router.navigate(['/groups']);
        },
        error: () => alert('Failed to delete group'),
      });
    }
  }
}
