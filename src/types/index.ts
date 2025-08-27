// User interface
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  pincode: string;
  state: string;
}

// Product interface
export interface Product {
  id: number | string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string; // main image
  images?: string[]; // extra similar images
  category: string;
  sizes: string[];
  description: string;
  fabric: string;
  care: string;
  shipping: string;
  details?: {
    kurta?: string[];
    pants?: string[];
    dupatta?: string[];
  };
}

// Cart item extends product with size and quantity
export interface CartItem extends Product {
  size: string;
  quantity: number;
}

// Category interface
export interface Category {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  iconColor: string;
}

// Page type enum
export type PageType = 'home' | 'category' | 'productDetail' | 'checkout' | 'categories' | 'orders' | 'help' | 'account';

// Checkout step interface
export interface CheckoutStep {
  id: number;
  name: string;
  completed: boolean;
}

// Address interface
export interface Address {
  fullName: string;
  mobile: string;
  pincode: string;
  city: string;
  state: string;
  houseNo: string;
  roadName: string;
}

// Order status type
export type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';

// Order item interface (simplified version of CartItem for orders)
export interface OrderItem {
  id: number;
  name: string;
  image: string;
  size: string;
  price: number;
  quantity: number;
}

// Main order interface
export interface Order {
  id: string;
  createdAt: string; // ISO date string
  items: OrderItem[];
  total: number;
  address: Address;
  razorpayOrderId?: string;
  paymentId?: string;
  paymentMethod: string; // Changed from union type to string for more flexibility
  status: OrderStatus;
}

// Hook return types for better type safety
export interface UseCartReturn {
  cart: CartItem[];
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (productId: number, size: string) => void;
  updateQuantity: (productId: number, size: string, delta: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getCartCount: () => number;
}

export interface UseUserReturn {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export interface UseOrdersReturn {
  orders: Order[];
  placeOrder: (cart: CartItem[], address: Address, paymentMethod: string) => Order;
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

export interface UseToastReturn {
  toast: (options: {
    title: string;
    description?: string;
    variant?: 'default' | 'destructive';
  }) => void;
}

// Location data types
export interface LocationData {
  indianStates: string[];
  stateToCities: Record<string, string[]>;
}

// Utility function types
export type ComputeDiscountFunction = (subtotal: number, quantity: number) => number;

// Payment related types
export interface PaymentOptions {
  upi: boolean;
  card: boolean;
  netbanking: boolean;
  wallet: boolean;
}

export interface CustomerDetails {
  name: string;
  email: string;
  contact: string;
}

export interface OrderCreationData {
  amount: number;
  currency: string;
  upiId?: string;
  paymentMethod: string;
  customerDetails: CustomerDetails;
}

// API Response types
export interface APIBaseResponse {
  success: boolean;
  message: string;
}

export interface UPIValidationResponse extends APIBaseResponse {
  // Add specific UPI validation fields if needed
}

export interface OrderCreationResponse extends APIBaseResponse {
  orderId: string;
  amount: number;
  currency: string;
}

export interface PaymentVerificationResponse extends APIBaseResponse {
  // Add specific payment verification fields if needed
}

// Razorpay specific types
export interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: {
    address: string;
    upi_id: string;
  };
  theme: {
    color: string;
  };
  method: PaymentOptions;
  handler: (response: RazorpayResponse) => Promise<void>;
  modal: {
    ondismiss: () => void;
  };
}