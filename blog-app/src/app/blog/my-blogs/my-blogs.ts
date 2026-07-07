import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Blog } from '../../services/blog';
import { Comment } from '../../services/comment';

@Component({
  selector: 'app-my-blogs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-blogs.html',
  styleUrl: './my-blogs.css',
})
export class MyBlogs implements OnInit {

  private blogService = inject(Blog);
  private commentService = inject(Comment);
  private cdr = inject(ChangeDetectorRef);

  blogs: any[] = [];
  isLoading = false;
  expandedBlogId: string | null = null;

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {

    this.isLoading = true;

    this.blogService.getMyBlogs().subscribe({

      next: (res: any) => {

        this.blogs = this.blogService.normalizeBlogs(res);

        this.isLoading = false;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.error(err);

        this.blogs = [];

        this.isLoading = false;

        this.cdr.detectChanges();

      }

    });

  }

  deleteBlog(id: string): void {

    if (!confirm('Delete this blog?')) return;

    this.blogService.deleteBlog(id).subscribe({

      next: () => {

        this.blogs = this.blogs.filter(
          blog => blog._id !== id
        );

        this.cdr.detectChanges();

      }

    });

  }

  toggleComments(blogId: string): void {
    if (this.expandedBlogId === blogId) {
      this.expandedBlogId = null;
      return;
    }

    this.expandedBlogId = blogId;
    const blog = this.blogs.find(item => item._id === blogId);
    if (blog && !blog.commentsLoaded) {
      this.commentService.getComments(blogId).subscribe({
        next: (comments: any) => {
          blog.comments = comments;
          blog.commentsLoaded = true;
          this.cdr.detectChanges();
        }
      });
    }
  }

  deleteComment(blogId: string, commentId: string): void {
    if (!confirm('Delete this comment?')) return;

    this.commentService.deleteComment(commentId).subscribe({
      next: () => {
        const blog = this.blogs.find(item => item._id === blogId);
        if (blog) {
          blog.comments = (blog.comments || []).filter((comment: any) => comment._id !== commentId);
          this.cdr.detectChanges();
        }
      }
    });
  }

}