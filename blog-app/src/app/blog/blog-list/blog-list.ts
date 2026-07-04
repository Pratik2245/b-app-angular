import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Blog } from '../../services/blog';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-list.html',
  styleUrl: './blog-list.css',
})
export class BlogList implements OnInit {

  blogs: any[] = [];

  private blogService = inject(Blog);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.loadBlogs();
  }

  private loadBlogs(): void {

    this.blogService.getBlogs().subscribe({

      next: (res: any) => {

        console.log("Response:", res);

        this.blogs = [...res];

        console.log("Blogs:", this.blogs);

        this.cdr.detectChanges();

      },

      error: (err) => {
        console.error(err);
      }

    });
  }
  toggleLike(blog: any): void {

    this.blogService.likeBlog(blog._id).subscribe({

      next: (res: any) => {

        blog.likeCount = res.likeCount;
        blog.liked = res.liked;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

}

