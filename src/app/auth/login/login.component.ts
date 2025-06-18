import { Component, inject } from '@angular/core';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/user.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  credentials = {
    email: '',
    password: '',
  };

  constructor(
    private usersService: UsersService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  login() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.credentials.email)) {
      alert('Please enter a valid email!');
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(this.credentials.password)) {
      alert(
        'Password must be at least 8 characters with at least 1 letter and 1 number!'
      );
      return;
    }

    this.usersService.getUserByEmail(this.credentials.email).subscribe({
      next: (users) => {
        if (users && users.length > 0) {
          const user = users.find((u) => u.email === this.credentials.email);

          if (user) {
            if (user.password === this.credentials.password) {
              this.localStorageService.saveUser(user);
              alert('Welcome Back! ' + user.name);
              this.router.navigate(['/']);
            } else {
              alert('Incorrect password');
            }
          }
        }
      },
    });
  }

  onClose() {
    this.router.navigate(['/']);
  }
}
