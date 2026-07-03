import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Blog } from '../../services/blog';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-detail.html',
  styleUrl: './blog-detail.css'
})
export class BlogDetail implements OnInit {

  private blogService = inject(Blog);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  blog: any = null;
  loading = true;
  error = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    console.log("Blog ID:", id);

    if (!id) {
      this.loading = false;
      this.error = true;
      return;
    }

    this.blogService.getBlog(id).subscribe({

      next: (res: any) => {
        console.log("Blog Response:", res);

        this.blog = res;
        this.loading = false;
        console.log(this.loading);
        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error("API Error:", err);

        this.loading = false;
        this.error = true;
        this.cdr.detectChanges();
      }

    });
  }

  estimateReadTime(content: string): number {
    if (!content) return 1;

    const words = content.trim().split(/\s+/).length;

    return Math.ceil(words / 200);
  }

}