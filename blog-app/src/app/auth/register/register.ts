import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  @ViewChild('registerForm') registerForm!: NgForm;

  private authService = inject(Auth);
  private router = inject(Router);

  username = '';
  email = '';
  password = '';
  registrationError = '';

  private isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email.trim());
  }

  register() {
    if (this.registerForm?.invalid) {
      this.registerForm.form.markAllAsTouched();
      return;
    }

    // Clear previous error
    this.registrationError = '';

    // Email validation
    if (!this.isValidEmail(this.email)) {
      this.registrationError = 'Please enter a valid email address.';
      this.registerForm.form.get('email')?.markAsTouched();
      return;
    }

    const data = {
      username: this.username.trim(),
      email: this.email.trim(),
      password: this.password,
    };

    this.authService.register(data).subscribe({
      next: (res: any) => {
        console.log(res);

        this.registrationError = '';

        alert('Registration Successful');

        this.username = '';
        this.email = '';
        this.password = '';

        this.router.navigate(['/login']);
      },

      error: (err: any) => {
        console.log(err);

        this.registrationError =
          err?.error?.message || 'Registration failed. Please try again.';

        alert(this.registrationError);
      },
    });
  }
}