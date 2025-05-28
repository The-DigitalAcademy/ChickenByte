export interface Menu {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  flavor: [];
  promotion: 'true' | 'false';
  imageUrl: string;
}
