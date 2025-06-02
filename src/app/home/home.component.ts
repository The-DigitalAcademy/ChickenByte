import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { MenuService } from '../services/menu.service';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  router = inject(Router);
  menuService = inject(MenuService);
  cartService = inject(CartService);
  menuItems: any[] = [];
  filteredItems: any[] = [];
  errorMessage: string | null = null;
  activeCategory: string = 'All';
  categories: string[] = ['All', 'Burgers', 'Drinks', 'Snacks', 'Something Sweet', 'Meat', 'Wraps'];


  activatedRoute = inject(ActivatedRoute);

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

  filterByCategory(category: string): void {
    this.activeCategory = category;
    if (category === 'All') {
      this.filteredItems = [...this.menuItems];
    } else {
      this.filteredItems = this.menuItems.filter(item => 
        item.category.toLowerCase() === category.toLowerCase()
      );
    }
  }

  isActiveCategory(category: string): boolean {
    return this.activeCategory === category;
  }
}