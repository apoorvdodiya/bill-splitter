import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class SplitService {
  constructor(private httpService: HttpService) {}

  createSplit(split: any): Observable<any> {
    return this.httpService.post<any>('split', split);
  }
  
  getUserSplits(): Observable<any> {
    return this.httpService.get<any>('split');
  }
  
  getUserSplitsByType(type: string): Observable<any> {
    return this.httpService.get<any>(`split/my-split/${type}`);
  }
  
  settleAsBorrower(id: number, params: any): Observable<any> {
    return this.httpService.patch<any>(`split/settle/borrower/${id}`, params);
  }
  
  settleAsPayee(id: number, params: any): Observable<any> {
    return this.httpService.patch<any>(`split/settle/payee/${id}`, params);
  }
}
