import {
  Component,
  inject,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Blog } from '../../services/blog';
import { Comment } from '../../services/comment';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './blog-detail.html',
  styleUrl: './blog-detail.css'
})
export class BlogDetail implements OnInit {

  private blogService = inject(Blog);
  private commentService = inject(Comment);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  blog: any = null;

  comments: any[] = [];

  commentText = '';

  loading = true;

  error = false;

  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (!id) {

      this.loading = false;
      this.error = true;

      return;

    }

    this.blogService.getBlog(id).subscribe({

      next: (res: any) => {

        this.blog = res;

        this.loadComments();

        this.loading = false;

        this.cdr.detectChanges();

      },

      error: () => {

        this.loading = false;

        this.error = true;

        this.cdr.detectChanges();

      }

    });

  }

  loadComments(): void {

    this.commentService
      .getComments(this.blog._id)
      .subscribe({

        next: (res: any) => {

          this.comments = res;

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  addComment(): void {

    if (!this.commentText.trim()) {

      return;

    }

    this.commentService
      .addComment({

        blogId: this.blog._id,

        text: this.commentText

      })
      .subscribe({

        next: () => {

          this.commentText = '';

          this.loadComments();

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  deleteComment(id: string): void {

    if (!confirm("Delete this comment?")) {

      return;

    }

    this.commentService
      .deleteComment(id)
      .subscribe({

        next: () => {

          this.loadComments();

        }

      });

  }

  estimateReadTime(content: string): number {

    if (!content) {

      return 1;

    }

    const words =
      content.trim().split(/\s+/).length;

    return Math.ceil(words / 200);

  }

}