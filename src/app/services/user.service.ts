
import { inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private API = 'http://localhost:3000/users'

  http = inject(HttpClient);

  registerUser(user: User) {
    return this.http.post<User>(this.API, user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API);
  };

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.API}?email=${email}`);
  };
}
