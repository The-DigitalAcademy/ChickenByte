import { Component, inject, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';

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

   addToCart(menuItem: any): void {
    this.cartService.addItem(menuItem).subscribe({
      next: (cartItem) => {
        console.log('Item added to cart:', cartItem);
      
      },
      error: (err) => {
        console.error('Failed to add item to cart:', err);
        // Optionally, show an error message to the user
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

  selectedFlavour: string | null = null;

selectFlavour(flavour: string) {
  this.selectedFlavour = flavour;
}

}