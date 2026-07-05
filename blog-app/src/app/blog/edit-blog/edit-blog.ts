import {
    ChangeDetectorRef,
    Component,
    inject,
    OnInit,
    ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Blog } from '../../services/blog';

@Component({
    selector: 'app-edit-blog',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './edit-blog.html',
    styleUrl: './edit-blog.css',
})
export class EditBlog implements OnInit {
    @ViewChild('blogForm') blogForm!: NgForm;

    private blogService = inject(Blog);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private cdr = inject(ChangeDetectorRef);

    blogId = '';
    title = '';
    content = '';
    isLoading = false;

    ngOnInit(): void {
        this.blogId = this.route.snapshot.paramMap.get('id') || '';

        if (this.blogId) {
            this.loadBlog();
        }
    }

    loadBlog(): void {
        this.isLoading = true;

        this.blogService.getBlog(this.blogId).subscribe({
            next: (res: any) => {
                this.title = res.title || '';
                this.content = res.content || '';

                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: () => {
                this.isLoading = false;
                this.cdr.detectChanges();
                alert('Unable to load blog');
            },
        });
    }

    updateBlog(): void {
        if (!this.blogId) return;

        if (this.blogForm?.invalid) {
            this.blogForm.form.markAllAsTouched();
            return;
        }

        this.blogService.updateBlog(this.blogId, {
            title: this.title.trim(),
            content: this.content.trim(),
        }).subscribe({
            next: () => {
                alert('Blog updated successfully');
                this.router.navigate(['/my-blogs']);
            },
            error: () => {
                alert('Unable to update blog');
            },
        });
    }
}