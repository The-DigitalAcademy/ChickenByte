
import { inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/users';
import { environment } from '../../environments';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private API =`${environment.apiUrl}/users`;

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

  getUserById(id?: number): Observable<User[]>{
    return this.http.get<User[]>(`${this.API}?id=${id}`);
  }
}
