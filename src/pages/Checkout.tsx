import { useState, FormEvent, useEffect } from 'react';
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

// API configuration for LG-Pay backend
const API_BASE_URL: string = 'https://messho-backend.vercel.app';

// LG-Pay API response types
interface LGPayResponse {
  success: boolean;
  message?: string;
  order_sn?: string;
  response?: {
    pay_url?: string;
    payment_url?: string;
    status?: string;
    [key: string]: any;
  };
}

// Simplified API service for LG-Pay
const lgPayAPI = {
  createOrder: async (amount: number): Promise<LGPayResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount })
    });
    return response.json();
  },

  checkHealth: async (): Promise<{ status: string; message: string }> => {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.json();
  }
};

// Step interface
interface CheckoutStep {
  id: number;
  name: string;
  completed: boolean;
}

// Enhanced Order interface with LG-Pay details
interface EnhancedOrder extends Order {
  orderSN?: string;
  lgPayResponse?: any;
}

// Address validation errors type
type AddressErrors = Partial<Record<keyof Address, string>>;

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [lastOrder, setLastOrder] = useState<EnhancedOrder | null>(null);
  const { user } = useUser();
  
  // Loading states
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);

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

  // Check if cart is empty and redirect
  useEffect(() => {
    if (cart.length === 0 && currentStep !== 4) {
      // Allow staying on step 4 (summary) even if cart is empty
      const timer = setTimeout(() => {
        if (currentStep !== 4) {
          navigate('/');
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [cart.length, currentStep, navigate]);

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

  const handlePayment = async (): Promise<void> => {
    setIsProcessingPayment(true);

    try {
      // Calculate total amount in rupees
      const { total } = getDiscountInfo();
      
      // Create order with LG-Pay
      const orderResponse = await lgPayAPI.createOrder(total);

      if (!orderResponse.success) {
        toast({ 
          title: 'Order Creation Failed', 
          description: orderResponse.message || 'Unable to create order. Please try again.' 
        });
        return;
      }

      // Create local order record
      const order = placeOrder(cart, address, 'lgpay-online');
      setLastOrder({
        ...order,
        orderSN: orderResponse.order_sn,
        lgPayResponse: orderResponse.response
      });

      // Store order info in sessionStorage for return handling
      sessionStorage.setItem('pendingOrder', JSON.stringify({
        orderId: order.id,
        orderSN: orderResponse.order_sn,
        amount: total
      }));

      // Check if we have a payment URL
      const paymentUrl = orderResponse.response?.pay_url || orderResponse.response?.payment_url;
      
      if (paymentUrl) {
        // Redirect to LG-Pay payment page
        window.location.href = paymentUrl;
      } else {
        // If no payment URL, show success (for testing purposes)
        toast({
          title: 'Order Created Successfully!',
          description: `Order ${order.id} has been placed.`,
        });
        
        clearCart();
        setCurrentStep(4);
      }

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

  // Handle return from payment gateway
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const orderSN = urlParams.get('order_sn');

    if (status && orderSN) {
      const pendingOrderData = sessionStorage.getItem('pendingOrder');
      
      if (pendingOrderData) {
        const pendingOrder = JSON.parse(pendingOrderData);
        
        if (status === 'success') {
          toast({
            title: 'Payment Successful!',
            description: `Order ${pendingOrder.orderId} confirmed.`,
          });
          
          clearCart();
          setCurrentStep(4);
        } else if (status === 'failed') {
          toast({
            title: 'Payment Failed',
            description: 'Your payment was not processed. Please try again.',
            variant: 'destructive'
          });
        }
        
        // Clean up URL and session storage
        sessionStorage.removeItem('pendingOrder');
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  }, [clearCart, toast]);

  const handleDownloadInvoice = (): void => {
    if (!lastOrder) return;
    
    const invoiceHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Invoice ${lastOrder.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; max-width: 800px; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
            .company-name { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .invoice-title { font-size: 20px; color: #666; }
            .section { margin-bottom: 20px; }
            .section-title { font-size: 16px; font-weight: bold; margin-bottom: 10px; color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background: #f5f5f5; font-weight: bold; }
            .text-right { text-align: right; }
            .total-row { background: #f9f9f9; font-weight: bold; }
            .order-info { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
            .customer-info { background: #f9f9f9; padding: 15px; border-radius: 5px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="company-name">Your Store Name</div>
            <div class="invoice-title">INVOICE</div>
          </div>
          
          <div class="order-info">
            <div>
              <div class="section-title">Order Details</div>
              <div><strong>Order ID:</strong> ${lastOrder.id}</div>
              <div><strong>Order SN:</strong> ${lastOrder.orderSN || 'N/A'}</div>
              <div><strong>Date:</strong> ${new Date(lastOrder.createdAt).toLocaleString()}</div>
              <div><strong>Payment Method:</strong> ${lastOrder.paymentMethod}</div>
            </div>
            
            <div class="customer-info">
              <div class="section-title">Billing & Shipping Address</div>
              <div><strong>${lastOrder.address.fullName}</strong></div>
              <div>${lastOrder.address.houseNo}, ${lastOrder.address.roadName}</div>
              <div>${lastOrder.address.city}, ${lastOrder.address.state} - ${lastOrder.address.pincode}</div>
              <div>Phone: ${lastOrder.address.mobile}</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Order Items</div>
            <table>
              <thead>
                <tr>
                  <th>Item Description</th>
                  <th>Size</th>
                  <th class="text-right">Quantity</th>
                  <th class="text-right">Unit Price</th>
                  <th class="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${lastOrder.items.map(item => `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.size}</td>
                    <td class="text-right">${item.quantity}</td>
                    <td class="text-right">₹${item.price}.00</td>
                    <td class="text-right">₹${item.price * item.quantity}.00</td>
                  </tr>
                `).join('')}
                <tr class="total-row">
                  <td colspan="4" class="text-right"><strong>Total Amount</strong></td>
                  <td class="text-right"><strong>₹${lastOrder.total}.00</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="section">
            <p><strong>Thank you for your order!</strong></p>
            <p>For any queries, please contact our customer support.</p>
          </div>
        </body>
      </html>
    `;

    const win = window.open('', '_blank');
    if (!win) {
      toast({
        title: 'Pop-up Blocked',
        description: 'Please allow pop-ups to download the invoice.',
      });
      return;
    }
    
    win.document.write(invoiceHtml);
    win.document.close();
    win.focus();
    
    // Add a small delay before printing to ensure content is loaded
    setTimeout(() => {
      win.print();
    }, 500);
  };

  if (cart.length === 0 && currentStep < 4) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center bg-white rounded-lg p-8 shadow-sm max-w-md w-full">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            🛒
          </div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some items to your cart to continue shopping</p>
          <Button onClick={() => navigate('/')} className="w-full">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Fixed positioning */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center">
            <button 
              onClick={() => navigate(-1)} 
              className="mr-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="text-gray-600 h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              {currentStep === 1 ? 'Cart' : 
               currentStep === 2 ? 'Delivery Address' : 
               currentStep === 3 ? 'Payment' : 'Order Confirmed'}
            </h1>
          </div>
        </div>
      </header>

      {/* Stepper - Fixed width container */}
      <div className="bg-white border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    step.completed 
                      ? 'bg-purple-600 text-white' 
                      : currentStep === step.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {step.completed ? '✓' : step.id}
                  </div>
                  <span className="ml-2 text-xs font-medium truncate max-w-[60px] sm:max-w-[80px]">
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-px bg-gray-300 mx-2 min-w-[20px]"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Constrained container */}
      <main className="max-w-md mx-auto pb-24">
        {/* Step 1: Cart */}
        {currentStep === 1 && (
          <div className="p-4 space-y-4">
            {cart.map((item: CartItem) => (
              <div key={`${item.id}-${item.size}`} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm mb-1 line-clamp-2">{item.name}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold text-purple-600">₹{item.price}</span>
                      <span className="text-gray-400 line-through text-sm">₹{item.originalPrice}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Size: {item.size}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => updateQuantity(item.id, item.size, -1)}
                          className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-purple-400 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="min-w-[50px] text-center font-medium">
                          Qty: {item.quantity.toString().padStart(2, '0')}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.size, 1)}
                          className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-purple-400 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-red-400 hover:text-red-600 p-2 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Cart Summary */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              {(() => {
                const quantity = cart.reduce((s, i) => s + i.quantity, 0);
                const discount = computeGaneshOfferDiscount(getTotalPrice(), quantity);
                const finalTotal = getTotalPrice() - discount;
                return (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Cart Total:</span>
                      {discount > 0 ? (
                        <span className="font-semibold">
                          <span className="line-through text-gray-400 mr-2">₹{getTotalPrice()}</span>
                          <span className="text-green-600">₹{finalTotal}</span>
                        </span>
                      ) : (
                        <span className="font-semibold">₹{getTotalPrice()}</span>
                      )}
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Ganesh Offer (30% off)</span>
                        <span>-₹{discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span className="text-green-600 font-medium">FREE</span>
                    </div>
                    <hr className="border-gray-200" />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>To Pay:</span>
                      <span className="text-purple-600">₹{finalTotal}</span>
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
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  📍
                </span>
                Delivery Address
              </h3>
              
              <form id="address-form" onSubmit={handleAddressSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={address.fullName}
                    onChange={(e) => setAddress({...address, fullName: e.target.value})}
                    className={addressErrors.fullName ? 'border-red-500' : ''}
                    required
                  />
                  {addressErrors.fullName && (
                    <p className="text-red-500 text-xs mt-1">{addressErrors.fullName}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    value={address.mobile}
                    onChange={(e) => setAddress({...address, mobile: e.target.value})}
                    className={addressErrors.mobile ? 'border-red-500' : ''}
                    required
                  />
                  {addressErrors.mobile && (
                    <p className="text-red-500 text-xs mt-1">{addressErrors.mobile}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input
                    id="pincode"
                    value={address.pincode}
                    onChange={(e) => setAddress({...address, pincode: e.target.value})}
                    className={addressErrors.pincode ? 'border-red-500' : ''}
                    required
                  />
                  {addressErrors.pincode && (
                    <p className="text-red-500 text-xs mt-1">{addressErrors.pincode}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Select 
                      value={address.state} 
                      onValueChange={(value) => setAddress({...address, state: value, city: ''})}
                    >
                      <SelectTrigger className={addressErrors.state ? 'border-red-500' : ''}>
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
                    <Label htmlFor="city">City *</Label>
                    <Select 
                      value={address.city} 
                      onValueChange={(value) => setAddress({...address, city: value})}
                      disabled={!address.state}
                    >
                      <SelectTrigger className={addressErrors.city ? 'border-red-500' : ''}>
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
                  <Label htmlFor="houseNo">House No., Building Name *</Label>
                  <Input
                    id="houseNo"
                    value={address.houseNo}
                    onChange={(e) => setAddress({...address, houseNo: e.target.value})}
                    className={addressErrors.houseNo ? 'border-red-500' : ''}
                    required
                  />
                  {addressErrors.houseNo && (
                    <p className="text-red-500 text-xs mt-1">{addressErrors.houseNo}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="roadName">Road name, Area, Colony *</Label>
                  <Input
                    id="roadName"
                    value={address.roadName}
                    onChange={(e) => setAddress({...address, roadName: e.target.value})}
                    className={addressErrors.roadName ? 'border-red-500' : ''}
                    required
                  />
                  {addressErrors.roadName && (
                    <p className="text-red-500 text-xs mt-1">{addressErrors.roadName}</p>
                  )}
                </div>
              </form>
            </div>

            {/* Security badges */}
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
                  PCI DSS Certified
                </span>
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                  100% Secured
                </span>
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-purple-500 rounded-full mr-1"></span>
                  Verified Merchant
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {currentStep === 3 && (
          <div className="p-4 space-y-4">
            {/* Price Summary */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-3">Order Summary</h3>
              {(() => {
                const { subtotal, discount, total } = getDiscountInfo();
                return (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Items Total:</span>
                      <span>₹{subtotal}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount (Ganesh Offer):</span>
                        <span>-₹{discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Delivery:</span>
                      <span className="text-green-600">FREE</span>
                    </div>
                    <hr className="border-gray-200" />
                    <div className="flex justify-between font-semibold text-base">
                      <span>Total Amount:</span>
                      <span className="text-purple-600">₹{total}</span>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Payment Method</h3>
                <div className="text-right">
                  <div className="text-xs text-green-600 font-medium">100% SAFE</div>
                  <div className="text-xs text-green-600 font-medium">PAYMENTS</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg mb-4 border border-purple-200">
                <div className="flex items-center">
                  <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3 text-white text-xs font-bold">
                    LG
                  </span>
                  <span className="text-purple-700 font-medium">Pay securely with LG-Pay</span>
                </div>
                <p className="text-xs text-purple-600 mt-1">Multiple payment options available</p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center p-3 border-2 border-purple-200 rounded-lg bg-purple-50">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="lgpay" 
                    checked={true}
                    readOnly
                    className="mr-3 accent-purple-600"
                  />
                  <div className="flex items-center flex-1">
                    <span className="w-8 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded flex items-center justify-center mr-3 text-white text-xs font-bold">
                      PAY
                    </span>
                    <div>
                      <span className="font-medium">Online Payment</span>
                      <p className="text-xs text-gray-600">UPI, Cards, Net Banking, Wallets</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center text-green-700 text-sm">
                  <span className="mr-2">🔒</span>
                  <span>Your payment information is encrypted and secure</span>
                </div>
              </div>
            </div>

            {/* Delivery Address Summary */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-medium mb-2">Deliver to:</h4>
              <div className="text-sm text-gray-600">
                <div className="font-medium text-gray-900">{address.fullName}</div>
                <div>{address.houseNo}, {address.roadName}</div>
                <div>{address.city}, {address.state} - {address.pincode}</div>
                <div>Mobile: {address.mobile}</div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Order Summary */}
        {currentStep === 4 && lastOrder && (
          <div className="p-4">
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-3xl">✓</span>
              </div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">Order Placed!</h2>
              <p className="text-gray-600 mb-6">Your order has been successfully placed</p>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3 text-left mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-medium">{lastOrder.id}</span>
                </div>
                {lastOrder.orderSN && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Order SN:</span>
                    <span className="font-medium">{lastOrder.orderSN}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium capitalize">LG-Pay Online</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="font-medium">{new Date(lastOrder.createdAt).toLocaleDateString()}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between font-semibold">
                  <span>Total Paid:</span>
                  <span className="text-green-600">₹{lastOrder.total}</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h4 className="font-medium mb-3">Items Ordered</h4>
                <div className="space-y-2">
                  {lastOrder.items.map((item: OrderItem) => (
                    <div key={`${item.id}-${item.size}`} className="flex justify-between items-center text-sm">
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-gray-600">Size: {item.size} × {item.quantity}</div>
                      </div>
                      <div className="font-medium">₹{item.price * item.quantity}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  onClick={handleDownloadInvoice}
                  className="w-full"
                >
                  Download Invoice
                </Button>
                <Button 
                  onClick={() => navigate('/orders')} 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Track Order
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

      {/* Fixed Bottom Action Bar - Properly constrained */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40">
        <div className="max-w-md mx-auto p-4">
          {currentStep === 1 && (
            <>
              <div className="flex justify-between items-center mb-3">
                <div>
                  {(() => { 
                    const { subtotal, discount, total } = getDiscountInfo(); 
                    return (
                      <div className="font-semibold text-lg">
                        {discount > 0 ? (
                          <>
                            <span className="line-through text-gray-400 mr-2">₹{subtotal}</span>
                            <span className="text-green-600">₹{total}</span>
                          </>
                        ) : (
                          <span>₹{subtotal}</span>
                        )}
                      </div>
                    ); 
                  })()}
                  <div className="text-sm text-blue-600 cursor-pointer">VIEW PRICE DETAILS</div>
                </div>
              </div>
              <Button 
                size="lg" 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3"
                disabled={cart.length === 0}
                onClick={() => {
                  if (cart.length === 0) {
                    toast({ title: 'Your cart is empty' });
                    return;
                  }
                  setCurrentStep(2);
                }}
              >
                Continue to Address
              </Button>
            </>
          )}
          
          {currentStep === 2 && (
            <Button 
              size="lg" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3"
              type="submit"
              form="address-form"
            >
              Save Address & Continue
            </Button>
          )}
          
          {currentStep === 3 && (
            <>
              <div className="flex justify-between items-center mb-3">
                <div>
                  {(() => { 
                    const { subtotal, discount, total } = getDiscountInfo(); 
                    return (
                      <div className="font-semibold text-lg">
                        {discount > 0 ? (
                          <>
                            <span className="line-through text-gray-400 mr-2">₹{subtotal}</span>
                            <span className="text-green-600">₹{total}</span>
                          </>
                        ) : (
                          <span>₹{subtotal}</span>
                        )}
                      </div>
                    ); 
                  })()}
                  <div className="text-sm text-blue-600">Secure Payment with LG-Pay</div>
                </div>
              </div>
              <Button 
                size="lg" 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3"
                onClick={handlePayment}
                disabled={isProcessingPayment}
              >
                {isProcessingPayment ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  'Place Order & Pay'
                )}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;