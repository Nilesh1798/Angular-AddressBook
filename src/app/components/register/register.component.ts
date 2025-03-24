import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user = { firstName: '', lastName: '', email: '', password: '' };
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.user.firstName, this.user.lastName, this.user.email, this.user.password).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        this.successMessage = 'Registration successful! Redirecting to login...';
        this.errorMessage = ''; // Clear any previous error

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000); // Delay to show success message
      },
      (error) => {
        if (error.status === 409) {
          this.errorMessage = 'Email already registered. Please login.';
        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
        this.successMessage = ''; // Clear success message
      }
    );
  }
}
