import { Injectable } from '@angular/core';
import { environment } from '../../environments';// Fixed import path
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Added for type safety
import { FoodItem } from '../food-item';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  API: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllFood(): Observable<any> { // Added return type
    return this.http.get(`${this.API}/menu`); // Assuming endpoint is '/food'
  }

  getFoodById(id: string): Observable<FoodItem> {
  return this.http.get<FoodItem>(`${this.API}/menu/${id}`);
}
}