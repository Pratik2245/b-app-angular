import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class User {
  private http = inject(HttpClient);

  // Get Logged In User Profile
  getProfile() {
    return this.http.get(
      `${environment.apiUrl}/users/profile`
    );
  }

  // Update User Profile
  updateProfile(data: any) {
    return this.http.put(
      `${environment.apiUrl}/users/profile`,
      data
    );
  }

  // Get My Blogs
  getMyBlogs() {
    return this.http.get(
      `${environment.apiUrl}/users/my-blogs`
    );
  }

  // Get Dashboard
  getDashboard() {
    return this.http.get(
      `${environment.apiUrl}/users/dashboard`
    );
  }

  // Upload Profile Image
  uploadProfileImage(file: File) {

    const formData = new FormData();

    formData.append('image', file);

    return this.http.post(
      `${environment.apiUrl}/upload`,
      formData
    );

  }
}
