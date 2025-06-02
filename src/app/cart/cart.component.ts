import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CartItem } from '../models/cart-item.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartService = inject(CartService);
  router = inject(Router);
  cartItems$!: Observable<CartItem[]>;

  ngOnInit(): void {
    this.cartItems$ = this.cartService.cartItems$;
    this.cartService.fetchCartItems().subscribe();
  }

  incrementQuantity(item: CartItem): void {
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    this.cartService.updateItem(updatedItem).subscribe();
  }

  decrementQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      this.cartService.updateItem(updatedItem).subscribe();
    } else {
      this.confirmRemoveItem(item);
    }
  }

  confirmRemoveItem(item: CartItem): void {
   
      this._executeRemoveItem(item.id);
    
  }

  private _executeRemoveItem(itemId: string): void {
    this.cartService.removeItem(itemId).subscribe();
  }

  getTotalPrice(items: CartItem[] | null): number {
    if (!items) return 0;
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  navigateToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  clearCart(): void {
    if (window.confirm('Are you sure you want to clear the entire cart?')) {
      this.cartService.clearCart().subscribe();
    }
  }
}
