import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Comment {

  private http = inject(HttpClient);
  addComment = (data: any) => {
    return this.http.post(
      `${environment.apiUrl}/comments`,
      data
    );
  }
  getComments(blogId: string) {
    return this.http.get(
      `${environment.apiUrl}/comments/${blogId}`
    );
  }

  deleteComment(id: string) {
    return this.http.delete(
      `${environment.apiUrl}/comments/${id}`
    );
  }
}
