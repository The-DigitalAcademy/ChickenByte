// local-storage.service.ts
import { Injectable } from '@angular/core';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly USER_KEY = 'currentUser';

  saveUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser(): User | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  removeUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }
}
