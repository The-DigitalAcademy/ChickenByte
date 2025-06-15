import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; 
import { CartService } from '../services/cart.service'; 
import { CartItem } from '../models/cart-item.model'; 
import { Observable } from 'rxjs';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule] 
})
export class CheckoutComponent implements OnInit {
  cartItems$: Observable<CartItem[]> | undefined;
  totalPrice: number = 0;
  checkoutForm: FormGroup;

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private router: Router 
  ) {
    this.checkoutForm = this.fb.group({
      // Personal Information
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      
      // Shipping Address
      street_name: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      
      // Payment
      paymentMethod: ['cash_on_delivery', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cartItems$ = this.cartService.cartItems$;
    this.cartService.cartItems$.subscribe(items => {
      this.totalPrice = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    });
  }

  placeOrder(): void {
    if (this.checkoutForm.valid) {
      console.log('Order placed:', this.checkoutForm.value);
      alert('Order placed successfully!'); 
      this.cartService.clearCart().subscribe(() => {
        this.router.navigate(['/home']); 
      });
    } else {
      this.checkoutForm.markAllAsTouched();
      alert('Please fill in all required fields.');
    }
  }
}
