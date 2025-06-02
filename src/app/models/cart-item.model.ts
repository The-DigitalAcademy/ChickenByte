export interface CartItem {
  id: string; 
  productId: number; 
  title: string;
  price: number;
  quantity: number;
  imageUrl?: string; 
}
