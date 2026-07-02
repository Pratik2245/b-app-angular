import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(Auth);
  private router = inject(Router);
  email = '';
  password = '';

  login() {
    const data = {
      email: this.email,
      password: this.password
    };
    this.authService
      .login(data)
      .subscribe({

        next: (res: any) => {

          localStorage.setItem(
            'token',
            res.token
          );

          alert(
            'Login Successful'
          );
          this.email = '';
          this.password = '';
          this.router.navigate([''])

        },

        error: (err) => {
          console.log(err);
        }

      });
  }

}
