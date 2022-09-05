import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpService: HttpService, private router: Router) {}

  userSignUp(user: any): Observable<any> {
    return this.httpService.post<any>('auth/sign-up', user);
  }

  userLogIn(user: any): Observable<any> {
    return this.httpService.post<any>('auth/login', user);
  }

  logout() {
    let userDetails = this.getUserDetails();
    if (userDetails) {
      localStorage.removeItem('_u');
      this.router.navigate(['/auth']);
      // delete userDetails.token;
      // localStorage.setItem('_u', JSON.stringify(userDetails));
      // if (!this.keepMeLoggedIn.value) localStorage.removeItem('_u');
    }
  }

  setUserDetails(userDetails: any) {
    localStorage.setItem('_u', JSON.stringify(userDetails));
  }

  getUserDetails() {
    return JSON.parse(localStorage.getItem('_u') as string);
  }
}
