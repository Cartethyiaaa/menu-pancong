export interface MenuItem {
  id: string;
  name: string;
  category: 'Pancong Lumer' | 'Coffee' | 'Non Coffee' | 'Food Menu' | 'Paket Hemat';
  price: number;
  formattedPrice: string;
  description: string;
  image?: string;
  isHighlight?: boolean;
  badge?: string;
}

export interface CartItem {
  name: string;
  price: number;
  qty: number;
  image?: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  location: string;
  quote: string;
  stars: number;
  isFeatured?: boolean;
}
