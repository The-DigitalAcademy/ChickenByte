import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/users';
import { UsersService } from '../../services/user.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  private router = inject(Router);
  private auth = inject(UsersService);
  private localStorage = inject(LocalStorageService);

  user: User = {
    name: '',
    email: '',
    password: '',
  };
  confirmPassword = '';

   register() {

    if (!this.user.name) {
      alert('Please enter a name')
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.user.email)) {
      alert('Please enter a valid email!');
      return;
    }

      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(this.user.password)) {
      alert('Password must be at least 8 characters with at least 1 letter and 1 number!');
      return;
    }

    if (this.user.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    this.auth.getUserByEmail(this.user.email).subscribe({
      next: (users) => {
        if (users && users.length > 0) {
          alert('Email already registered!');
        } else {
 
          this.auth.registerUser(this.user).subscribe({
            next: (registeredUser) => {

              this.localStorage .saveUser(registeredUser);
              
              alert('Registration successful!');
              this.router.navigate(['/']); 
              
              this.resetForm();
            }
          });
        }
      },

    });
  }


  private resetForm(): void {
    this.user = { name: '', email: '', password: '' };
    this.confirmPassword = '';
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  onClose() {
    this.router.navigate(['/']);
  }
}
