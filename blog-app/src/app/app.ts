import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Auth } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  authService = inject(Auth);
  private router = inject(Router);

  title = signal('blog-app');

  ngOnInit() {
    this.authService.restoreSession();
    this.syncUserWithServer();
  }

  private syncUserWithServer(): void {
    const hasToken = localStorage.getItem('token');

    if (!hasToken) {
      return;
    }

    this.authService.getCurrentUser().subscribe({
      next: () => {
        // User synced, signal updated automatically
      },
      error: () => {
        localStorage.removeItem('token');
        this.authService.logout();
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
