import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { signal } from '@angular/core';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  currentUser = signal<any>(this.getStoredUser());

  register(data: any) {
    return this.http.post(
      `${environment.apiUrl}/auth/register`,
      data
    );
  }

  login(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, data).pipe(
      tap((res) => {
        this.setSession(res.token, res.user);
      })
    );
  }

  getCurrentUser() {
    return this.http.get<any>(`${environment.apiUrl}/auth/me`).pipe(
      tap((user) => this.setUser(user))
    );
  }

  restoreSession() {
    const token = localStorage.getItem('token');
    const savedUser = this.getStoredUser();

    if (token && savedUser) {
      this.currentUser.set(savedUser);
      return true;
    }

    if (!token) {
      this.clearSession();
    }

    return false;
  }

  logout() {
    this.clearSession();
  }

  private setSession(token: string, user: any) {
    localStorage.setItem('token', token);
    this.setUser(user);
  }

  private setUser(user: any) {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }

    this.currentUser.set(user);
  }

  private getStoredUser() {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  }

  private clearSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}

