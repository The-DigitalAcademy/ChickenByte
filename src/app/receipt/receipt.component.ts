import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
 
})
export class ReceiptComponent {
  @Input() cartItems: any[] = [];
  @Input() name: string = '';
  @Input() address: string = '';
  @Input() paymentMethod: string = '';
  @Input() deliveryTime: string = '';

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}

