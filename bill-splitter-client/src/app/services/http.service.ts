import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiBaseUrl: string;

  constructor(private http: HttpClient) {
    this.apiBaseUrl = environment.apiUrl;
  }

  get<T>(url: string, httpParams?: HttpParams): Observable<T> {
    if (httpParams != null) {
      return this.http.get<T>(this.apiBaseUrl + url, { params: httpParams });
    } else {
      return this.http.get<T>(this.apiBaseUrl + url);
    }
  }

  post<T>(url: string, data: T): Observable<T> {
    return this.http.post<T>(this.apiBaseUrl + url, data);
  }

  postVoid<T>(url: string, data: T): Observable<void> {
    return this.http.post<void>(this.apiBaseUrl + url, data);
  }

  put<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(this.apiBaseUrl + url, data);
  }

  patch<T>(url: string, data: any): Observable<T> {
    return this.http.patch<T>(this.apiBaseUrl + url, data);
  }

  delete<T>(url: string, httpParams?: HttpParams): Observable<T> {
    if (httpParams != null) {
      return this.http.delete<T>(this.apiBaseUrl + url, { params: httpParams });
    } else {
      return this.http.delete<T>(this.apiBaseUrl + url);
    }
  }
}
