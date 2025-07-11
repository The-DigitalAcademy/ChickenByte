import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/cartItems'; 
  private cartItemsSource = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSource.asObservable();

  private totalItems = new BehaviorSubject<number>(0);
  totalItems$ = this.totalItems.asObservable();

  constructor(private http: HttpClient) {
    this.fetchCartItems().subscribe(); // Load initial cart items
  }

  private _calculateTotalItems(items: CartItem[]): void {
    const total = items.reduce((sum, item) => sum + item.quantity, 0);
    this.totalItems.next(total);
  }

  fetchCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.apiUrl).pipe(
      tap(items => {
        this.cartItemsSource.next(items);
        this._calculateTotalItems(items);
      }),
      catchError(this.handleError)
    );
  }

  addItem(menuItem: any): Observable<CartItem> {
    const currentCartItems = this.cartItemsSource.getValue();
    const existingItem = currentCartItems.find(item => item.productId === menuItem.id);

    if (existingItem) {
      const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
      return this.updateItem(updatedItem);
    } else {
      const newItem: CartItem = {
        id: this.generateUniqueId(), // Or use menuItem.id if it's guaranteed unique and string
        productId: menuItem.id,
        title: menuItem.title,
        price: menuItem.price,
        quantity: 1,
        imageUrl: menuItem.imageUrl
      };
      return this.http.post<CartItem>(this.apiUrl, newItem).pipe(
        tap(addedItem => {
          const updatedItems = [...currentCartItems, addedItem];
          this.cartItemsSource.next(updatedItems);
          this._calculateTotalItems(updatedItems);
        }),
        catchError(this.handleError)
      );
    }
  }

  updateItem(itemToUpdate: CartItem): Observable<CartItem> {
    return this.http.put<CartItem>(`${this.apiUrl}/${itemToUpdate.id}`, itemToUpdate).pipe(
      tap(updatedItem => {
        const items = this.cartItemsSource.getValue().map(item => 
          item.id === updatedItem.id ? updatedItem : item
        );
        this.cartItemsSource.next(items);
        this._calculateTotalItems(items);
      }),
      catchError(this.handleError)
    );
  }

  removeItem(itemId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${itemId}`).pipe(
      tap(() => {
        const items = this.cartItemsSource.getValue().filter(item => item.id !== itemId);
        this.cartItemsSource.next(items);
        this._calculateTotalItems(items);
      }),
      catchError(this.handleError)
    );
  }

  clearCart(): Observable<any> {
   
    const currentCartItems = this.cartItemsSource.getValue();
    const deleteObservables = currentCartItems.map(item => this.removeItem(item.id));
    
    this.cartItemsSource.next([]);
    this._calculateTotalItems([]);
    console.warn('Clear cart called. For json-server, individual item deletions might be needed or a custom script.');
    return new BehaviorSubject(null).asObservable(); 
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private handleError(error: any) {
    console.error('An error occurred in CartService:', error);
    return throwError(() => new Error('Something went wrong with the cart operation. Please try again.'));
  }
}
