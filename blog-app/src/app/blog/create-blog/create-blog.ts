import { Component, inject, ViewChild } from '@angular/core';
import { Blog } from '../../services/blog';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-blog',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './create-blog.html',
  styleUrl: './create-blog.css',
})
export class CreateBlog {
  @ViewChild('blogForm') blogForm!: NgForm;

  private blogService = inject(Blog);
  title = '';
  content = '';

  createBlog() {
    if (this.blogForm?.invalid) {
      this.blogForm.form.markAllAsTouched();
      return;
    }

    const data = {
      title: this.title.trim(),
      content: this.content.trim(),
      coverImage: '',
    };

    this.blogService.createBlog(data).subscribe({
      next: () => {
        alert('Blog Created');
      },
    });
  }
}
