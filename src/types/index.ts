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
    ProductDetails?: string[];
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
export type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'confirmed';

// Order item interface (simplified version of CartItem for orders)
export interface OrderItem {
  id: number;
  name: string;
  image: string;
  size: string;
  price: number;
  quantity: number;
}

// Main order interface (Updated for LG-Pay)
export interface Order {
  id: string;
  createdAt: string; // ISO date string
  items: OrderItem[];
  total: number;
  address: Address;
  orderSN?: string; // LG-Pay order serial number
  paymentId?: string;
  paymentMethod: string;
  status: OrderStatus;
}

// Hook return types for better type safety
export interface UseCartReturn {
  cart: CartItem[];
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (productId: number | string, size: string) => void;
  updateQuantity: (productId: number | string, size: string, delta: number) => void;
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

// Payment related types (Simplified for LG-Pay)
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

// LG-Pay order creation data (Simplified)
export interface LGPayOrderData {
  amount: number; // Amount in paisa
}

// API Response types
export interface APIBaseResponse {
  success: boolean;
  message: string;
}

// LG-Pay specific response types
export interface LGPayOrderResponse extends APIBaseResponse {
  order_sn: string;
  response: {
    pay_url?: string;
    payment_url?: string;
    status?: string;
    [key: string]: any; // Allow for additional LG-Pay response fields
  };
}

// Webhook response from LG-Pay
export interface LGPayWebhookData {
  order_sn: string;
  status: string;
  trade_status?: string;
  money: number;
  sign: string;
  [key: string]: any; // Allow for additional webhook fields
}

// Enhanced Order interface with LG-Pay details
export interface EnhancedOrder extends Order {
  orderSN?: string;
  lgPayResponse?: any;
}

// Payment verification response (Generic)
export interface PaymentVerificationResponse extends APIBaseResponse {
  orderId?: string;
  status?: string;
  tradeStatus?: string;
  amount?: number;
}

// Pending order info (for sessionStorage)
export interface PendingOrderInfo {
  orderId: string;
  orderSN: string;
  amount: number;
}

// Payment return URL parameters
export interface PaymentReturnParams {
  status: 'success' | 'failed' | 'pending';
  order_sn: string;
  [key: string]: string; // Allow for additional return parameters
}

// Global window extensions for LG-Pay integration
declare global {
  interface Window {
    upiValidationTimeout?: NodeJS.Timeout;
  }
}

// Legacy types (kept for backward compatibility but deprecated)
/**
 * @deprecated Use LGPayOrderResponse instead
 */
export interface OrderCreationResponse extends APIBaseResponse {
  orderId: string;
  amount: number;
  currency: string;
}

/**
 * @deprecated UPI validation is now handled by LG-Pay gateway
 */
export interface UPIValidationResponse extends APIBaseResponse {
  upiId?: string;
  isKnownProvider?: boolean;
}

/**
 * @deprecated Use LGPayOrderData instead
 */
export interface OrderCreationData {
  amount: number;
  currency: string;
  upiId?: string;
  paymentMethod: string;
  customerDetails: CustomerDetails;
}