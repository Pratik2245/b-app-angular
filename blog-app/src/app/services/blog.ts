import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Blog {
  private http = inject(HttpClient);

  getBlogs() {

    return this.http.get(
      `${environment.apiUrl}/blogs`
    );

  }

  getBlog(id: string) {

    return this.http.get(
      `${environment.apiUrl}/blogs/${id}`
    );

  }

  createBlog(data: any) {

    return this.http.post(
      `${environment.apiUrl}/blogs`,
      data
    );

  }

  updateBlog(
    id: string,
    data: any
  ) {

    return this.http.put(
      `${environment.apiUrl}/blogs/${id}`,
      data
    );

  }

  deleteBlog(id: string) {

    return this.http.delete(
      `${environment.apiUrl}/blogs/${id}`
    );

  }
  getMyBlogs() {
    return this.http.get(
      `${environment.apiUrl}/blogs/myblogs`
    );
  }
  likeBlog(id: string) {
    return this.http.post(
      `${environment.apiUrl}/blogs/${id}/like`,
      {}
    );
  }
}
