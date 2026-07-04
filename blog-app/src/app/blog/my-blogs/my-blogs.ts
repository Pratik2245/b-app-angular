import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Blog } from '../../services/blog';

@Component({
  selector: 'app-my-blogs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-blogs.html',
  styleUrl: './my-blogs.css',
})
export class MyBlogs implements OnInit {

  private blogService = inject(Blog);
  private cdr = inject(ChangeDetectorRef);

  blogs: any[] = [];
  isLoading = false;

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {

    this.isLoading = true;

    this.blogService.getMyBlogs().subscribe({

      next: (res: any) => {

        console.log("My Blogs:", res);

        this.blogs = [...res];

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

}