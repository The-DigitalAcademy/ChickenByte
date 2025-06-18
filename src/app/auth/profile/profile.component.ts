import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { UsersService } from '../../services/user.service';
import { User } from '../../models/users';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  ngOnInit(): void {
    this.loadUserProfile();
  }

  private router = inject(Router);
  private localStorageService = inject(LocalStorageService);
  private userService = inject(UsersService);

  loadUserProfile(): void {
    const storedUser = this.localStorageService.getUser();

    console.log(storedUser);
  }

  private checkCurrentUser(): void {
    const currentUser = this.localStorageService.getUser();
    if (currentUser) {
      if (
        confirm('You are Sure you want to Log out ' + currentUser.name + '?')
      ) {
        this.router.navigate(['/']);
      }
    }
  }

  onLogOut() {
    this.checkCurrentUser();
    this.router.navigate(['/']);
    this.localStorageService.removeUser();
  }

  onBack() {
    this.router.navigate(['/']);
  }
}
