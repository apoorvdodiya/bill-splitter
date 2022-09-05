import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private httpService: HttpService) {}

  getUserGroups(): Observable<any> {
    return this.httpService.get<any>('groups');
  }

  createGroup(group: any): Observable<any> {
    return this.httpService.post<any>('groups', group);
  }

  getUsersList(): Observable<any> {
    return this.httpService.get<any>('groups/users');
  }

  getGroupById(id: number): Observable<any> {
    return this.httpService.get<any>(`groups/${id}`);
  }

  updateGroup(id: number, group: any): Observable<any> {
    return this.httpService.patch<any>(`groups/${id}`, group);
  }
}
