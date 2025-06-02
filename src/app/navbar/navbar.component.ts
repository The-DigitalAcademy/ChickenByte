import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Corrected styleUrl to styleUrls
})
export class NavbarComponent implements OnInit, OnDestroy {

  router = inject(Router);
  cartService = inject(CartService);

  cartItemCount: number = 0;
  private cartSubscription!: Subscription;

  ngOnInit(): void {
    this.cartSubscription = this.cartService.totalItems$.subscribe(count => {
      this.cartItemCount = count;
    });
  }

  onShowRegister() {
    this.router.navigate(['/register'])
  };

  onShowCart() {
    this.router.navigate(['/cart'])
  };

  navigateTo(path: string) {
  this.router.navigate([path]);
}

   onHome() {
    this.router.navigate(['/home'])
  };

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
};
