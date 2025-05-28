
import { inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private API = 'http://localhost:3000/users'

  http = inject(HttpClient);

  registerUser(user: any) {
    return this.http.post(this.API, user);
  };

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.API);
  };

  getUserByEmail(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}?email=${email}`);
  };
}
