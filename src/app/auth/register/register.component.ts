

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/users';
import { UsersService } from '../../services/user.service';


@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  router = inject(Router);
  auth = inject(UsersService)


  user: User = {
    name:'',
    email: '',
    password: ''
  };
  name: '';
  confirmPassword: '';

  register() {
    if (!this.user.email.includes('@') || !this.user.email.includes('.')) {
      alert('Invalid Email!');
      return;
    }
    if (this.user.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (this.user.password.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    if (!this.name || this.name === 0) {
      alert('Please enter your name!');
      return;
    }
    this.auth.registerUser(this.user).subscribe(() => {
      alert("Registration Success");
      this.router.navigate(['/login']);
      this.name = ""
      this.user.email = ""
      this.user.password = ""
      this.confirmPassword = ""
    })
  };


  onLogin() {
    this.router.navigate(['/login'])
  };

  onClose(){
    this.router.navigate(['/'])
  };
}
