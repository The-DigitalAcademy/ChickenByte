
import { Component, inject } from '@angular/core';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  constructor(private usersService: UsersService,private router: Router) {}

  login() {

    if (!this.credentials.email.includes('@') || !this.credentials.email.includes('.')) {
      alert('Invalid Email!');
      return;
    }
    if (this.credentials.password.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }

    this.usersService.getUserByEmail(this.credentials.email).subscribe({
      next: (users) => {

        if (users && users.length > 0) {
          const user = users.find(u => u.email === this.credentials.email);

          if (user) {

            if (user.password === this.credentials.password) {
              alert('Welcome Back');
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.router.navigate(['/']);
            } else {
              alert('Incorrect password');
            }
          } else {
            alert('User not found');
          }
        }
      }

    });
  }

  onClose(){
    this.router.navigate(['/'])
  };
}

