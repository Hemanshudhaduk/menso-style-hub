import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { indianStates, stateToCities } from '@/data/indiaLocations';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { Address, Order, CartItem, OrderItem } from '@/types';
import { computeGaneshOfferDiscount } from '@/lib/utils';
import { useOrders } from '@/hooks/useOrders';
import { useUser } from '@/hooks/useUser';

// API configuration
const API_BASE_URL: string = 'http://localhost:5001/api';
const RAZORPAY_KEY_ID: string = 'rzp_live_RAHSZS9k2sYCCf';

// API response types
interface APIResponse {
  success: boolean;
  message: string;
}

interface UPIValidationResponse extends APIResponse {
  // Add any additional UPI validation specific fields if needed
  
}


interface OrderCreationResponse extends APIResponse {
  orderId: string;
  amount: number;
  currency: string;
}

interface PaymentVerificationResponse extends APIResponse {
  // Add any additional verification specific fields if needed
}

// API service functions
const paymentAPI = {
  validateUPI: async (upiId: string): Promise<UPIValidationResponse> => {
    const response = await fetch(`${API_BASE_URL}/validate-upi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ upiId })
    });
    return response.json();
  },

  createOrder: async (orderData: any): Promise<OrderCreationResponse> => {
    const response = await fetch(`${API_BASE_URL}/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    return response.json();
  },

  verifyPayment: async (paymentData: any): Promise<PaymentVerificationResponse> => {
    const response = await fetch(`${API_BASE_URL}/verify-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData)
    });
    return response.json();
  }
};

// Razorpay types
interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
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
  method: {
    upi: boolean;
    card: boolean;
    netbanking: boolean;
    wallet: boolean;
  };
  handler: (response: RazorpayResponse) => Promise<void>;
  modal: {
    ondismiss: () => void;
  };
}

// declare global {
//   interface Window {
//     Razorpay: new (options: RazorpayOptions) => {
//       open: () => void;
//     };
//     upiValidationTimeout?: NodeJS.Timeout;
//   }
// }

// Step interface
interface CheckoutStep {
  id: number;
  name: string;
  completed: boolean;
}

// UPI validation status type
interface UPIValidationStatus {
  isValid: boolean;
  message: string;
}

// Enhanced Order interface with payment details
interface EnhancedOrder extends Order {
  paymentId?: string;
  razorpayOrderId?: string;
}

// Address validation errors type
type AddressErrors = Partial<Record<keyof Address, string>>;

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedUpiProvider, setSelectedUpiProvider] = useState<string>('gpay');
  const [upiId, setUpiId] = useState<string>('');
  const [lastOrder, setLastOrder] = useState<EnhancedOrder | null>(null);
  const { user } = useUser();
  
  // Loading states
  const [isValidatingUPI, setIsValidatingUPI] = useState<boolean>(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [upiValidationStatus, setUpiValidationStatus] = useState<UPIValidationStatus | null>(null);

  const [address, setAddress] = useState<Address>({
    fullName: user ? `${user.firstName} ${user.lastName}` : '',
    mobile: user ? user.mobile : '',
    pincode: user ? user.pincode : '',
    city: '',
    state: user ? user.state : '',
    houseNo: '',
    roadName: ''
  });
  const [addressErrors, setAddressErrors] = useState<AddressErrors>({});
  const [selectedPayment, setSelectedPayment] = useState<string>('upi');
  const { placeOrder } = useOrders();

  const getDiscountInfo = (): { subtotal: number; discount: number; total: number } => {
    const quantity = cart.reduce((s, i) => s + i.quantity, 0);
    const subtotal = getTotalPrice();
    const discount = computeGaneshOfferDiscount(subtotal, quantity);
    const total = subtotal - discount;
    return { subtotal, discount, total };
  };

  const steps: CheckoutStep[] = [
    { id: 1, name: 'Cart', completed: true },
    { id: 2, name: 'Address', completed: currentStep > 2 },
    { id: 3, name: 'Payment', completed: currentStep > 3 },
    { id: 4, name: 'Summary', completed: false }
  ];

  const validateAddress = (addr: Address): boolean => {
    const errors: AddressErrors = {};

    if (!addr.fullName.trim()) errors.fullName = 'Full name is required';
    if (!addr.mobile.trim()) {
      errors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(addr.mobile.trim())) {
      errors.mobile = 'Enter a valid 10-digit mobile number';
    }
    if (!addr.pincode.trim()) {
      errors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(addr.pincode.trim())) {
      errors.pincode = 'Enter a valid 6-digit pincode';
    }
    if (!addr.city.trim()) errors.city = 'City is required';
    if (!addr.state.trim()) errors.state = 'State is required';
    if (!addr.houseNo.trim()) errors.houseNo = 'House/Building is required';
    if (!addr.roadName.trim()) errors.roadName = 'Road/Area/Colony is required';

    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // UPI validation with API call
  const handleUPIValidation = async (inputUpiId: string): Promise<void> => {
    if (!inputUpiId.trim()) {
      setUpiValidationStatus(null);
      return;
    }

    setIsValidatingUPI(true);
    try {
      const result = await paymentAPI.validateUPI(inputUpiId);
      if (result.success) {
        setUpiValidationStatus({ isValid: true, message: 'UPI ID is valid' });
      } else {
        setUpiValidationStatus({ isValid: false, message: result.message });
      }
    } catch (error) {
      console.error('UPI validation error:', error);
      setUpiValidationStatus({ isValid: false, message: 'Unable to validate UPI ID' });
    } finally {
      setIsValidatingUPI(false);
    }
  };

  const handleUPIChange = (value: string): void => {
    setUpiId(value);
    // Debounce validation
    if (window.upiValidationTimeout) {
      clearTimeout(window.upiValidationTimeout);
    }
    window.upiValidationTimeout = setTimeout(() => {
      handleUPIValidation(value);
    }, 500);
  };

  const handleAddressSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!validateAddress(address)) {
      toast({
        title: 'Please complete your address',
        description: 'Fix the highlighted fields to continue.',
      });
      return;
    }
    toast({ title: 'Address saved' });
    setCurrentStep(3);
  };

  // Load Razorpay script
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (): Promise<void> => {
    if (selectedPayment === 'upi') {
      if (!upiId.trim()) {
        toast({ title: 'Enter UPI ID', description: 'Please provide your UPI ID to continue.' });
        return;
      }
      if (upiValidationStatus && !upiValidationStatus.isValid) {
        toast({ title: 'Invalid UPI ID', description: 'Please enter a valid UPI ID.' });
        return;
      }
    }

    setIsProcessingPayment(true);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast({ title: 'Error', description: 'Failed to load payment gateway' });
        return;
      }

      // Calculate total amount
      const { total } = getDiscountInfo();
      const amountInPaisa = total * 100; // Convert to paisa

      // Create order
      const orderData = {
        amount: amountInPaisa,
        currency: 'INR',
        upiId: upiId,
        paymentMethod: selectedUpiProvider,
        customerDetails: {
          name: address.fullName,
          email: user?.email || 'customer@example.com',
          contact: address.mobile
        }
      };

      const orderResponse = await paymentAPI.createOrder(orderData);

      if (!orderResponse.success) {
        toast({ title: 'Error', description: orderResponse.message });
        return;
      }

      // Razorpay options
      const options: RazorpayOptions = {
        key: RAZORPAY_KEY_ID,
        amount: orderResponse.amount,
        currency: orderResponse.currency,
        name: 'Your Store Name',
        description: `Order for ${cart.length} items`,
        order_id: orderResponse.orderId,
        prefill: {
          name: address.fullName,
          email: user?.email || '',
          contact: address.mobile,
        },
        notes: {
          address: `${address.houseNo}, ${address.roadName}, ${address.city}`,
          upi_id: upiId
        },
        theme: {
          color: '#8B5CF6'
        },
        method: {
          upi: selectedPayment === 'upi',
          card: selectedPayment === 'card',
          netbanking: selectedPayment === 'netbanking',
          wallet: selectedPayment === 'wallet'
        },
        handler: async function (response: RazorpayResponse): Promise<void> {
          try {
            // Verify payment
            const verificationResult = await paymentAPI.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verificationResult.success) {
              // Payment successful
              const order = placeOrder(cart, address, `${selectedPayment}-${selectedUpiProvider}`);
              setLastOrder({
                ...order,
                paymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id
              });
              
              toast({
                title: 'Payment Successful!',
                description: `Order ${order.id} confirmed.`,
              });
              
              clearCart();
              setCurrentStep(4);
            } else {
              toast({
                title: 'Payment Verification Failed',
                description: 'Please contact support if amount was deducted.',
              });
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast({
              title: 'Payment Verification Error',
              description: 'Please contact support.',
            });
          }
        },
        modal: {
          ondismiss: function(): void {
            toast({
              title: 'Payment Cancelled',
              description: 'You can retry the payment anytime.',
            });
          }
        }
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Payment Error',
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleDownloadInvoice = (): void => {
    if (!lastOrder) return;
    const invoiceHtml = `
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Invoice ${lastOrder.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; }
            h1 { font-size: 18px; margin: 0 0 8px; }
            .section { margin-bottom: 16px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; font-size: 12px; }
            th { background: #f5f5f5; text-align: left; }
            .right { text-align: right; }
          </style>
        </head>
        <body>
          <h1>Invoice</h1>
          <div class="section">
            <div><strong>Order ID:</strong> ${lastOrder.id}</div>
            <div><strong>Payment ID:</strong> ${lastOrder.paymentId || 'N/A'}</div>
            <div><strong>Date:</strong> ${new Date(lastOrder.createdAt).toLocaleString()}</div>
            <div><strong>Payment:</strong> ${lastOrder.paymentMethod}</div>
          </div>
          <div class="section">
            <div><strong>Ship To:</strong></div>
            <div>${lastOrder.address.fullName}</div>
            <div>${lastOrder.address.houseNo}, ${lastOrder.address.roadName}</div>
            <div>${lastOrder.address.city}, ${lastOrder.address.state} - ${lastOrder.address.pincode}</div>
            <div>${lastOrder.address.mobile}</div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Size</th>
                <th class="right">Qty</th>
                <th class="right">Price</th>
                <th class="right">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${lastOrder.items.map(i => `
                <tr>
                  <td>${i.name}</td>
                  <td>${i.size}</td>
                  <td class="right">${i.quantity}</td>
                  <td class="right">₹${i.price}.00</td>
                  <td class="right">₹${i.price * i.quantity}.00</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="section" style="text-align:right;margin-top:12px"><strong>Total: ₹${lastOrder.total}.00</strong></div>
        </body>
      </html>
    `;
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(invoiceHtml);
    win.document.close();
    win.focus();
    win.print();
  };

  if (cart.length === 0 && currentStep === 1) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Button onClick={() => navigate('/')}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="mr-3">
              <ArrowLeft className="text-gray-600 h-6 w-6" />
            </button>
            <h2 className="text-xl font-semibold">
              {currentStep === 1 ? 'CART' : 
               currentStep === 2 ? 'ADD DELIVERY ADDRESS' : 
               currentStep === 3 ? 'PAYMENT' : 'ORDER SUMMARY'}
            </h2>
          </div>
        </div>
      </header>

      {/* Stepper */}
      <div className="bg-white px-4 py-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  step.completed 
                    ? 'bg-fashion-purple text-white' 
                    : currentStep === step.id
                    ? 'bg-fashion-purple text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {step.completed ? '✓' : step.id}
                </div>
                <span className="ml-2 text-xs truncate max-w-[72px]">{step.name}</span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-px bg-gray-300 mx-2 md:mx-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <main className="pb-28 max-w-xl mx-auto">
        {/* Step 1: Cart */}
        {currentStep === 1 && (
          <div className="p-4">
            <div className="space-y-4">
              {cart.map((item: CartItem) => (
                <div key={`${item.id}-${item.size}`} className="bg-white rounded-lg p-4 flex space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm mb-1">{item.name}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold">₹{item.price}</span>
                      <span className="text-gray-400 line-through text-sm">₹{item.originalPrice}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Size: {item.size}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => updateQuantity(Number(item.id), item.size, -1)}
                          className="w-8 h-8 rounded-full border flex items-center justify-center"
                        >
                          -
                        </button>
                        <span>Qty: {item.quantity.toString().padStart(2, '0')}</span>
                        <button 
                          onClick={() => updateQuantity(Number(item.id), item.size, 1)}
                          className="w-8 h-8 rounded-full border flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(Number(item.id), item.size)}
                        className="text-gray-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg p-4 mt-4">
              {(() => {
                const quantity = cart.reduce((s, i) => s + i.quantity, 0);
                const discount = computeGaneshOfferDiscount(getTotalPrice(), quantity);
                const finalTotal = getTotalPrice() - discount;
                return (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Cart Total:</span>
                      {discount > 0 ? (
                        <span className="font-semibold whitespace-nowrap">
                          <span className="line-through mr-2">₹{getTotalPrice()}.00</span>
                          <span className="text-green-600">₹{finalTotal}.00</span>
                        </span>
                      ) : (
                        <span className="font-semibold">₹{getTotalPrice()}.00</span>
                      )}
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Ganesh Offer (30% off)</span>
                        <span>-₹{discount}.00</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span className="text-green-600 font-medium">FREE</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-semibold">
                      <span>To Pay:</span>
                      <span className="whitespace-nowrap">₹{finalTotal}.00</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* Step 2: Address */}
        {currentStep === 2 && (
          <div className="p-4">
            <div className="bg-white rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  📍
                </span>
                Address
              </h3>
              
              <form id="address-form" onSubmit={handleAddressSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={address.fullName}
                    onChange={(e) => setAddress({...address, fullName: e.target.value})}
                    required
                  />
                  {addressErrors.fullName && (
                    <p className="text-red-500 text-xs mt-1">{addressErrors.fullName}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="mobile">Mobile number</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    value={address.mobile}
                    onChange={(e) => setAddress({...address, mobile: e.target.value})}
                    required
                  />
                  {addressErrors.mobile && (
                    <p className="text-red-500 text-xs mt-1">{addressErrors.mobile}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    value={address.pincode}
                    onChange={(e) => setAddress({...address, pincode: e.target.value})}
                    required
                  />
                  {addressErrors.pincode && (
                    <p className="text-red-500 text-xs mt-1">{addressErrors.pincode}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Select value={address.state} onValueChange={(value) => setAddress({...address, state: value, city: ''})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent>
                        {indianStates.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {addressErrors.state && (
                      <p className="text-red-500 text-xs mt-1">{addressErrors.state}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Select value={address.city} onValueChange={(value) => setAddress({...address, city: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder={address.state ? 'Select City' : 'Select State first'} />
                      </SelectTrigger>
                      <SelectContent>
                        {(address.state ? (stateToCities as Record<string, string[]>)[address.state] || [] : []).map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {addressErrors.city && (
                      <p className="text-red-500 text-xs mt-1">{addressErrors.city}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="houseNo">House No., Building Name</Label>
                  <Input
                    id="houseNo"
                    value={address.houseNo}
                    onChange={(e) => setAddress({...address, houseNo: e.target.value})}
                    required
                  />
                  {addressErrors.houseNo && (
                    <p className="text-red-500 text-xs mt-1">{addressErrors.houseNo}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="roadName">Road name, Area, Colony</Label>
                  <Input
                    id="roadName"
                    value={address.roadName}
                    onChange={(e) => setAddress({...address, roadName: e.target.value})}
                    required
                  />
                  {addressErrors.roadName && (
                    <p className="text-red-500 text-xs mt-1">{addressErrors.roadName}</p>
                  )}
                </div>
              </form>
            </div>

            <div className="mt-4 text-center">
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                <span className="flex items-center">
                  <span className="w-4 h-4 bg-blue-500 rounded mr-1"></span>
                  PCI DSS Certified
                </span>
                <span className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded mr-1"></span>
                  100% Secured Payments
                </span>
                <span className="flex items-center">
                  <span className="w-4 h-4 bg-purple-500 rounded mr-1"></span>
                  Verified Merchant
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {currentStep === 3 && (
          <div className="p-4">
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Select Payment Method</h3>
                <div className="text-right">
                  <div className="text-xs text-blue-600">100% SAFE</div>
                  <div className="text-xs text-blue-600">PAYMENTS</div>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg mb-6 flex items-center">
                <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3 text-white text-xs">
                  pay
                </span>
                <span className="text-blue-600 font-medium">Pay online & get EXTRA ₹33 off</span>
              </div>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3">PAY ONLINE</h4>
                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="upi" 
                      checked={selectedPayment === 'upi'}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="mr-3"
                    />
                    <span className="w-8 h-6 bg-blue-500 rounded flex items-center justify-center mr-3 text-white text-xs">
                      UPI
                    </span>
                    <span>UPI(GPay/PhonePe/Paytm)</span>
                  </label>
                  {selectedPayment === 'upi' && (
                    <div className="mt-3 space-y-3">
                      <div className="flex items-center space-x-2">
                        <button 
                          className={`px-3 py-1 rounded border ${selectedUpiProvider === 'gpay' ? 'bg-purple-50 border-purple-400' : 'border-gray-300'}`} 
                          onClick={(e) => { e.preventDefault(); setSelectedUpiProvider('gpay'); }}
                        >
                          GPay
                        </button>
                        <button 
                          className={`px-3 py-1 rounded border ${selectedUpiProvider === 'phonepe' ? 'bg-purple-50 border-purple-400' : 'border-gray-300'}`} 
                          onClick={(e) => { e.preventDefault(); setSelectedUpiProvider('phonepe'); }}
                        >
                          PhonePe
                        </button>
                        <button 
                          className={`px-3 py-1 rounded border ${selectedUpiProvider === 'paytm' ? 'bg-purple-50 border-purple-400' : 'border-gray-300'}`} 
                          onClick={(e) => { e.preventDefault(); setSelectedUpiProvider('paytm'); }}
                        >
                          Paytm
                        </button>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Your UPI ID</label>
                        <div className="relative">
                          <input 
                            className="mt-1 w-full border rounded px-3 py-2 text-sm pr-10" 
                            placeholder="e.g. username@okicici" 
                            value={upiId} 
                            onChange={(e) => handleUPIChange(e.target.value)}
                          />
                          {isValidatingUPI && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                            </div>
                          )}
                        </div>
                        {upiValidationStatus && (
                          <p className={`text-xs mt-1 ${upiValidationStatus.isValid ? 'text-green-600' : 'text-red-500'}`}>
                            {upiValidationStatus.message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional payment methods can be added here */}
                <div className="border rounded-lg p-4 opacity-60">
                  <h4 className="font-medium mb-3">OTHER METHODS</h4>
                  <div className="space-y-2">
                    <label className="flex items-center p-2 border rounded cursor-not-allowed opacity-50">
                      <input type="radio" name="payment" value="card" disabled className="mr-3" />
                      <span className="text-sm">Credit/Debit Card (Coming Soon)</span>
                    </label>
                    <label className="flex items-center p-2 border rounded cursor-not-allowed opacity-50">
                      <input type="radio" name="payment" value="netbanking" disabled className="mr-3" />
                      <span className="text-sm">Net Banking (Coming Soon)</span>
                    </label>
                    <label className="flex items-center p-2 border rounded cursor-not-allowed opacity-50">
                      <input type="radio" name="payment" value="wallet" disabled className="mr-3" />
                      <span className="text-sm">Wallet (Coming Soon)</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Product Price:</span>
                  <span>₹{getTotalPrice()}.00</span>
                </div>
                {(() => {
                  const quantity = cart.reduce((s, i) => s + i.quantity, 0);
                  const discount = computeGaneshOfferDiscount(getTotalPrice(), quantity);
                  return discount > 0 ? (
                    <div className="flex justify-between text-green-600">
                      <span>Ganesh Offer (30% off)</span>
                      <span>-₹{discount}.00</span>
                    </div>
                  ) : null;
                })()}
                <hr />
                <div className="flex justify-between font-semibold">
                  <span>Order Total:</span>
                  {(() => {
                    const quantity = cart.reduce((s, i) => s + i.quantity, 0);
                    const discount = computeGaneshOfferDiscount(getTotalPrice(), quantity);
                    const total = getTotalPrice() - discount;
                    return <span>₹{total}.00</span>;
                  })()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Order Summary */}
        {currentStep === 4 && lastOrder && (
          <div className="p-4">
            <div className="bg-white rounded-lg p-4 space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-2xl">✓</span>
                </div>
                <h3 className="text-xl font-semibold text-green-600 mb-2">Payment Successful!</h3>
                <p className="text-gray-600">Your order has been placed successfully</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-medium">{lastOrder.id}</span>
                </div>
                {lastOrder.paymentId && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Payment ID:</span>
                    <span className="font-medium text-xs">{lastOrder.paymentId}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium capitalize">{lastOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="font-medium">{new Date(lastOrder.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Delivery Address</h4>
                <div className="text-sm text-gray-600">
                  <div className="font-medium text-gray-900">{lastOrder.address.fullName}</div>
                  <div>{lastOrder.address.houseNo}, {lastOrder.address.roadName}</div>
                  <div>{lastOrder.address.city}, {lastOrder.address.state} - {lastOrder.address.pincode}</div>
                  <div>Mobile: {lastOrder.address.mobile}</div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Order Items</h4>
                <div className="space-y-3">
                  {lastOrder.items.map((item: OrderItem) => (
                    <div key={`${item.id}-${item.size}`} className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-gray-600">Size: {item.size} • Qty: {item.quantity}</div>
                      </div>
                      <div className="font-medium">₹{item.price * item.quantity}.00</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Paid</span>
                  <span className="text-green-600">₹{lastOrder.total}.00</span>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={handleDownloadInvoice}
                  className="w-full"
                >
                  Download Invoice (PDF)
                </Button>
                <Button 
                  variant="fashion" 
                  onClick={() => navigate('/orders')} 
                  className="w-full"
                >
                  View All Orders
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/')} 
                  className="w-full"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        {currentStep === 1 && (
          <>
            <div className="flex justify-between items-center mb-3">
              <div>
                {(() => { 
                  const { subtotal, discount, total } = getDiscountInfo(); 
                  return (
                    <div className="font-semibold">
                      {discount > 0 ? (
                        <>
                          <span className="line-through mr-2">₹{subtotal}.00</span>
                          <span className="text-green-600">₹{total}.00</span>
                        </>
                      ) : (
                        <span>₹{subtotal}.00</span>
                      )}
                    </div>
                  ); 
                })()}
                <div className="text-sm text-blue-600 cursor-pointer">VIEW PRICE DETAILS</div>
              </div>
            </div>
            <Button 
              variant="fashion" 
              size="lg" 
              className="w-full"
              disabled={cart.length === 0}
              onClick={() => {
                if (cart.length === 0) {
                  toast({ title: 'Your cart is empty' });
                  return;
                }
                setCurrentStep(2);
              }}
            >
              Continue
            </Button>
          </>
        )}
        
        {currentStep === 2 && (
          <Button 
            variant="fashion" 
            size="lg" 
            className="w-full"
            type="submit"
            form="address-form"
          >
            Save Address and Continue
          </Button>
        )}
        
        {currentStep === 3 && (
          <>
            <div className="flex justify-between items-center mb-3">
              <div>
                {(() => { 
                  const { subtotal, discount, total } = getDiscountInfo(); 
                  return (
                    <div className="font-semibold">
                      {discount > 0 ? (
                        <>
                          <span className="line-through mr-2">₹{subtotal}.00</span>
                          <span className="text-green-600">₹{total}.00</span>
                        </>
                      ) : (
                        <span>₹{subtotal}.00</span>
                      )}
                    </div>
                  ); 
                })()}
                <div className="text-sm text-blue-600 cursor-pointer">VIEW PRICE DETAILS</div>
              </div>
            </div>
            <Button 
              variant="fashion" 
              size="lg" 
              className="w-full"
              onClick={handlePayment}
              disabled={
                isProcessingPayment || 
                (selectedPayment === 'upi' && (!upiId.trim() || (upiValidationStatus && !upiValidationStatus.isValid)))
              }
            >
              {isProcessingPayment ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Processing Payment...
                </>
              ) : (
                'Pay Now'
              )}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;