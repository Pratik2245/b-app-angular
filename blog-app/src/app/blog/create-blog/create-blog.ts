import { Component, inject } from '@angular/core';
import { Blog } from '../../services/blog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-create-blog',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './create-blog.html',
  styleUrl: './create-blog.css',
})
export class CreateBlog {
  private blogService = inject(Blog);
  title = '';
  content = '';

  createBlog() {

    const data = {

      title: this.title,

      content: this.content,

      coverImage: ''

    };

    this.blogService
      .createBlog(data)
      .subscribe({

        next: () => {

          alert(
            'Blog Created'
          );

        }

      });
  }
}
