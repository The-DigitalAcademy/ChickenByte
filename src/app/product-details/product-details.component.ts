import { Component, inject, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';

interface CartItem {
  product: any;
  quantity: number;
  selectedFlavour?: string | null;
  specialInstructions?: string;
}

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  menuService = inject(MenuService);
  cartService = inject(CartService);
  route = inject(ActivatedRoute);
  product: any = null;
  errorMessage: string | null = null;
  quantity: number = 1;
  selectedFlavour: string | null = null;
  specialInstructions: string = '';
  
  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.menuService.getFoodById(productId).subscribe({
        next: (data) => {
          this.product = data;
        },
        error: (error) => {
          console.error('Failed to fetch product:', error);
          this.errorMessage = 'Failed to load product. Please try again later.';
        }
      });
    } else {
      this.errorMessage = 'No product ID provided';
    }
  }

  addToCart(): void {
  if (!this.product) {
    this.errorMessage = 'No product selected';
    return;
  }

  if (this.product.flavour?.length && !this.selectedFlavour) {
    this.errorMessage = 'Please select a flavour';
    return;
  }

  // Create a new object with all product properties plus cart-specific fields
  const cartItem = {
    ...this.product,          // Spread all product properties
    quantity: this.quantity,  // Add quantity
    selectedFlavour: this.selectedFlavour,
    specialInstructions: this.specialInstructions
  };

  this.cartService.addItem(cartItem).subscribe({
    next: (addedItem) => {
      console.log('Item added to cart:', addedItem);
    },
    error: (err) => {
      console.error('Failed to add item to cart:', err);
      this.errorMessage = 'Failed to add item to cart. Please try again.';
    }
  });
}

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  selectFlavour(flavour: string) {
    this.selectedFlavour = flavour;
    this.errorMessage = null; // Clear error when user selects a flavour
  }
}