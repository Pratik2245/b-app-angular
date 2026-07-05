import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  @ViewChild('loginForm') loginForm!: NgForm;

  private authService = inject(Auth);
  private router = inject(Router);
  email = '';
  password = '';
  loginError = '';

  login() {
    if (this.loginForm?.invalid) {
      this.loginForm.form.markAllAsTouched();
      return;
    }

    this.loginError = '';

    const data = {
      email: this.email.trim(),
      password: this.password,
    };

    this.authService.login(data).subscribe({
      next: () => {
        alert('Login Successful');
        this.email = '';
        this.password = '';
        this.router.navigate(['']);
      },
      error: (err) => {
        this.loginError = err?.error?.message || 'Invalid email or password.';
      },
    });
  }
}
