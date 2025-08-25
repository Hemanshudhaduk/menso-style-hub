export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string;
  category: 'kurtis' | 'combo2' | 'combo3' | 'all';
  sizes: string[];
  description: string;
  fabric: string;
  care: string;
  shipping: string;
}

export interface CartItem extends Product {
  size: string;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  iconColor: string;
}

export type PageType = 'home' | 'category' | 'productDetail' | 'checkout' | 'categories' | 'orders' | 'help' | 'account';

export interface CheckoutStep {
  id: number;
  name: string;
  completed: boolean;
}

export interface Address {
  fullName: string;
  mobile: string;
  pincode: string;
  city: string;
  state: string;
  houseNo: string;
  roadName: string;
}

export type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: number;
  name: string;
  image: string;
  size: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  createdAt: string; // ISO date
  items: OrderItem[];
  total: number;
  address: Address;
  paymentMethod: 'upi' | 'cod' | 'card' | string;
  status: OrderStatus;
}