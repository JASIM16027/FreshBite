export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isPopular?: boolean;
  isFeatured?: boolean;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export type Category = {
  id: string;
  name: string;
  icon: string;
};

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses: Address[];
  favoriteProducts: string[];
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  productId: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'out-for-delivery' | 'delivered' | 'cancelled';
  deliveryAddress: Address;
  orderDate: string;
  estimatedDelivery: string;
  paymentMethod: string;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minOrder: number;
  expiryDate: string;
  isActive: boolean;
}