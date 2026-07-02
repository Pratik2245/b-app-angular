import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Router
  , RouterLink
} from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authService = inject(Auth);
  private router = inject(Router);
  username = '';
  email = '';
  password = '';

  register() {

    const data = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.authService
      .register(data)
      .subscribe({
        next: (res: any) => {

          console.log(res);

          alert(
            'Registration Successful'
          );

          this.username = '';
          this.email = '';
          this.password = '';

          this.router.navigate(['/login']);

        },

        error: (err: any) => {
          console.log(err);
        }
      });
  }
}
