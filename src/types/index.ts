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

// Checkout step interface - Enhanced with navigation properties
export interface CheckoutStep {
  id: number;
  name: string;
  completed: boolean;
  isClickable?: boolean; // Whether the step can be navigated to
  isActive?: boolean;    // Whether this is the current step
}

// Navigation direction types
export type NavigationDirection = 'forward' | 'backward' | 'direct';

// Step navigation handler type
export type StepNavigationHandler = (stepNumber: number, direction?: NavigationDirection) => void;

// Back navigation handler type  
export type BackNavigationHandler = () => void;

// Step validation result
export interface StepValidationResult {
  isValid: boolean;
  errors?: string[];
  canProceed: boolean;
}

// Step validation function type
export type StepValidator = () => StepValidationResult;

// Checkout navigation state
export interface CheckoutNavigationState {
  currentStep: number;
  completedSteps: number[];
  canGoBack: boolean;
  canGoForward: boolean;
  nextStepAllowed: boolean;
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

// Enhanced checkout hook return type
export interface UseCheckoutReturn {
  currentStep: number;
  steps: CheckoutStep[];
  navigationState: CheckoutNavigationState;
  navigateToStep: StepNavigationHandler;
  goBack: BackNavigationHandler;
  goForward: () => void;
  validateCurrentStep: StepValidator;
  canProceedToNext: boolean;
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

// Enhanced LG-Pay response with error handling
export interface LGPayResponse {
  success: boolean;
  message?: string;
  order_sn?: string;
  response?: {
    pay_url?: string;
    payment_url?: string;
    payUrl?: string;
    url?: string;
    redirect_url?: string;
    qr_url?: string;
    paylink?: string;
    link?: string;
    status?: string;
    [key: string]: any;
  };
  debug?: {
    amountSentInPaisa?: number;
    amountSentInRupees?: number;
    originalResponse?: any;
    responseType?: string;
    possibleIssue?: string;
    errorType?: LGPayErrorType;
    sentAmount?: string;
    minimumAmount?: number;
    currentAmount?: number;
  };
  minimumAmount?: number;
  currentAmount?: number;
}

// LG-Pay error types for better error handling
export type LGPayErrorType = 
  | 'INVALID_AMOUNT'
  | 'LGPAY_CHANNEL_RESTRICTION' 
  | 'LGPAY_GATEWAY_MINIMUM'
  | 'SIGNATURE_ERROR'
  | 'LGPAY_ERROR'
  | 'NETWORK_ERROR'
  | 'NO_PAYMENT_URL'
  | 'FRONTEND_API_BLOCKED';

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

// Address validation errors type
export type AddressErrors = Partial<Record<keyof Address, string>>;

// Form validation result
export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  firstErrorField?: string;
}

// Checkout form validation function type
export type CheckoutFormValidator<T> = (data: T) => FormValidationResult;

// Step completion tracker
export interface StepCompletionState {
  cart: boolean;
  address: boolean;
  payment: boolean;
  summary: boolean;
}

// Checkout process state
export interface CheckoutProcessState {
  currentStep: number;
  isProcessing: boolean;
  completedSteps: StepCompletionState;
  navigationHistory: number[];
  canNavigateBack: boolean;
  lastError?: string;
}

// Discount calculation info
export interface DiscountInfo {
  subtotal: number;
  discount: number;
  total: number;
  discountPercentage?: number;
  discountType?: 'percentage' | 'fixed' | 'offer';
}

// Global window extensions for LG-Pay integration
declare global {
  interface Window {
    upiValidationTimeout?: NodeJS.Timeout;
  }
}

// Component prop types for checkout steps
export interface CheckoutStepProps {
  currentStep: number;
  onStepChange: StepNavigationHandler;
  onBack: BackNavigationHandler;
  isProcessing?: boolean;
}

export interface CartStepProps extends CheckoutStepProps {
  cart: CartItem[];
  onUpdateQuantity: (id: number | string, size: string, delta: number) => void;
  onRemoveItem: (id: number | string, size: string) => void;
  discountInfo: DiscountInfo;
}

export interface AddressStepProps extends CheckoutStepProps {
  address: Address;
  onAddressChange: (address: Address) => void;
  onSubmit: (address: Address) => void;
  errors: AddressErrors;
}

export interface PaymentStepProps extends CheckoutStepProps {
  total: number;
  address: Address;
  onPayment: () => Promise<void>;
  isProcessingPayment: boolean;
}

export interface SummaryStepProps extends CheckoutStepProps {
  order: EnhancedOrder;
  onDownloadInvoice: () => void;
}

// Navigation configuration
export interface CheckoutNavigationConfig {
  allowBackNavigation: boolean;
  allowStepSkipping: boolean;
  showProgressIndicator: boolean;
  autoAdvanceOnCompletion: boolean;
  validateBeforeNavigation: boolean;
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