import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);


  register(data: any) {
    return this.http.post(
      `${environment.apiUrl}/auth/register`,
      data
    );
  }

  login(data: any) {
    return this.http.post(
      `${environment.apiUrl}/auth/login`,
      data
    );
  }

  getCurrentUser() {
    return this.http.get(
      `${environment.apiUrl}/auth/me`
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
