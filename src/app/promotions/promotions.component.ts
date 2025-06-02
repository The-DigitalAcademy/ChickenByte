import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../services/menu.service';
import { CartService } from '../services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-promotions',
  imports: [NavbarComponent, FormsModule, CommonModule, RouterModule],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.css'
})
export class PromotionsComponent implements OnInit {
    menuService = inject(MenuService);
     cartService = inject(CartService);
    menuItems: any[] = [];
  filteredItems: any[] = [];
  errorMessage: string | null = null;


   ngOnInit(): void {
    this.menuService.getAllFood().subscribe({
      next: (data) => {
        this.menuItems = Array.isArray(data) ? data : data.menu || [];
        this.filteredItems = [...this.menuItems];
      },
      error: (error) => {
        console.error('Failed to fetch menu:', error);
        this.errorMessage = 'Failed to load menu. Please try again later.';
      }
    });
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



}
