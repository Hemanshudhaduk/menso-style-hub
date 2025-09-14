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

// Enhanced LG-Pay API response types
interface LGPayResponse {
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
  };
}

// API service for LG-Pay
const lgPayAPI = {
  createOrder: async (amount: number): Promise<LGPayResponse> => {
    console.log('🔵 Frontend: Creating order with amount (rupees):', amount);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });
      
      const data = await response.json();
      console.log('📥 Frontend: Received response:', data);
      
      return data;
    } catch (error) {
      console.error('❌ Frontend: API call failed:', error);
      throw error;
    }
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
    console.log('🎯 Payment process started...');
    setIsProcessingPayment(true);

    try {
      // Calculate total amount in rupees (backend will convert to paisa)
      const { total } = getDiscountInfo();
      console.log('💰 Frontend: Payment amount (rupees):', total);
      
      // Create order with LG-Pay
      const orderResponse = await lgPayAPI.createOrder(total);
      
      console.log('📥 Frontend: Order response received:', orderResponse);

      if (!orderResponse.success) {
        console.error('❌ Order creation failed:', orderResponse);
        
        // Show detailed error message
        let errorMessage = orderResponse.message || 'Unable to create order.';
        
        if (orderResponse.debug?.possibleIssue) {
          errorMessage += ` Possible issue: ${orderResponse.debug.possibleIssue}`;
        }
        
        toast({ 
          title: 'Order Creation Failed', 
          description: errorMessage,
          variant: 'destructive'
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

      // Look for payment URL in response
      const paymentUrl = orderResponse.response?.pay_url || 
                        orderResponse.response?.payment_url ||
                        orderResponse.response?.payUrl ||
                        orderResponse.response?.url ||
                        orderResponse.response?.redirect_url ||
                        orderResponse.response?.qr_url ||
                        orderResponse.response?.paylink ||
                        orderResponse.response?.link;
      
      console.log('🔗 Detected payment URL:', paymentUrl);
      
      if (paymentUrl) {
        console.log('➡️  Redirecting to LG-Pay payment gateway...');
        
        toast({
          title: 'Redirecting to Payment',
          description: 'Taking you to secure LG-Pay gateway...',
        });
        
        // Show a brief loading state, then redirect
        setTimeout(() => {
          console.log('🌐 Redirecting to:', paymentUrl);
          window.location.href = paymentUrl;
        }, 2000);
        
      } else {
        console.log('⚠️  No payment URL found in response');
        console.log('📋 Full response for analysis:', orderResponse);
        
        // Show error with debug info
        toast({
          title: 'Payment Gateway Error',
          description: 'No payment URL received from LG-Pay. Please try again.',
          variant: 'destructive'
        });
        
        return;
      }

    } catch (error) {
      console.error('❌ Payment error:', error);
      
      toast({
        title: 'Payment Error',
        description: 'Network error occurred. Please check your connection and try again.',
        variant: 'destructive'
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
            <div class="company-name">Messho Store</div>
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
    
    setTimeout(() => {
      win.print();
    }, 500);
  };

  if (cart.length === 0 && currentStep < 4) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center bg-white rounded-xl p-8 shadow-lg max-w-sm w-full">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-gray-400 text-2xl">🛒</span>
          </div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Your cart is empty</h2>
          <p className="text-gray-500 mb-6 text-sm">Add some items to your cart to continue shopping</p>
          <Button onClick={() => navigate('/')} className="w-full bg-purple-600 hover:bg-purple-700">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Clean & Fixed */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="w-full max-w-md mx-auto px-4 py-3">
          <div className="flex items-center">
            <button 
              onClick={() => navigate(-1)} 
              className="mr-3 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="text-gray-600 h-5 w-5" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              {currentStep === 1 ? 'Cart' : 
               currentStep === 2 ? 'Delivery Address' : 
               currentStep === 3 ? 'Payment' : 'Order Confirmed'}
            </h1>
          </div>
        </div>
      </header>

      {/* Stepper - Left Aligned with Small Circles */}
      <div className="bg-white border-b border-gray-100">
        <div className="w-full max-w-md mx-auto px-4 py-3">
          <div className="flex items-center w-full">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center" style={{ flex: index === 3 ? '1.2' : '1' }}>
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 ${
                    step.completed 
                      ? 'bg-purple-600 text-white' 
                      : currentStep === step.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-300 text-gray-500'
                  }`}>
                    {step.completed ? '✓' : step.id}
                  </div>
                  <span className={`ml-1 text-[9px] font-normal ${
                    step.completed || currentStep === step.id ? 'text-purple-600' : 'text-gray-500'
                  } whitespace-nowrap`}>
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-px flex-1 mx-2 ${
                    step.completed ? 'bg-purple-300' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Properly Constrained */}
      <main className="w-full max-w-md mx-auto pb-28 min-h-screen">
        {/* Step 1: Cart */}
        {currentStep === 1 && (
          <div className="p-4 space-y-3">
            {cart.map((item: CartItem) => (
              <div key={`${item.id}-${item.size}`} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex space-x-3">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-18 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm mb-1 line-clamp-2 text-gray-800">{item.name}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-bold text-purple-600">₹{item.price}</span>
                      <span className="text-gray-400 line-through text-xs">₹{item.originalPrice}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">Size: {item.size}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.size, -1)}
                          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:border-purple-400 hover:bg-purple-50 transition-colors text-sm"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="min-w-[40px] text-center font-medium text-sm">
                          {item.quantity.toString().padStart(2, '0')}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.size, 1)}
                          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:border-purple-400 hover:bg-purple-50 transition-colors text-sm"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-red-400 hover:text-red-600 p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Cart Summary - Improved Layout */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mt-4">
              <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
              {(() => {
                const quantity = cart.reduce((s, i) => s + i.quantity, 0);
                const discount = computeGaneshOfferDiscount(getTotalPrice(), quantity);
                const finalTotal = getTotalPrice() - discount;
                return (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cart Total:</span>
                      {discount > 0 ? (
                        <span className="font-semibold">
                          <span className="line-through text-gray-400 mr-2">₹{getTotalPrice()}</span>
                          <span className="text-green-600">₹{finalTotal}</span>
                        </span>
                      ) : (
                        <span className="font-semibold text-gray-800">₹{getTotalPrice()}</span>
                      )}
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Ganesh Offer (30% off)</span>
                        <span>-₹{discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="text-green-600 font-medium">FREE</span>
                    </div>
                    <hr className="border-gray-200 my-2" />
                    <div className="flex justify-between font-bold text-lg">
                      <span className="text-gray-800">To Pay:</span>
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
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
                <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  📍
                </span>
                Delivery Address
              </h3>
              
              <form id="address-form" onSubmit={handleAddressSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={address.fullName}
                    onChange={(e) => setAddress({...address, fullName: e.target.value})}
                    className={`mt-1 ${addressErrors.fullName ? 'border-red-500' : 'border-gray-200'} rounded-lg`}
                    required
                  />
                  {addressErrors.fullName && (
                    <p className="text-red-500 text-xs mt-1">{addressErrors.fullName}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="mobile" className="text-sm font-medium text-gray-700">Mobile Number *</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    value={address.mobile}
                    onChange={(e) => setAddress({...address, mobile: e.target.value})}
                    className={`mt-1 ${addressErrors.mobile ? 'border-red-500' : 'border-gray-200'} rounded-lg`}
                    required
                  />
                  {addressErrors.mobile && (
                    <p className="text-red-500 text-xs mt-1">{addressErrors.mobile}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="pincode" className="text-sm font-medium text-gray-700">Pincode *</Label>
                  <Input
                    id="pincode"
                    value={address.pincode}
                    onChange={(e) => setAddress({...address, pincode: e.target.value})}
                    className={`mt-1 ${addressErrors.pincode ? 'border-red-500' : 'border-gray-200'} rounded-lg`}
                    required
                  />
                  {addressErrors.pincode && (
                    <p className="text-red-500 text-xs mt-1">{addressErrors.pincode}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="state" className="text-sm font-medium text-gray-700">State *</Label>
                    <Select 
                      value={address.state} 
                      onValueChange={(value) => setAddress({...address, state: value, city: ''})}
                    >
                      <SelectTrigger className={`mt-1 ${addressErrors.state ? 'border-red-500' : 'border-gray-200'} rounded-lg`}>
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
                    <Label htmlFor="city" className="text-sm font-medium text-gray-700">City *</Label>
                    <Select 
                      value={address.city} 
                      onValueChange={(value) => setAddress({...address, city: value})}
                      disabled={!address.state}
                    >
                      <SelectTrigger className={`mt-1 ${addressErrors.city ? 'border-red-500' : 'border-gray-200'} rounded-lg`}>
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
                  <Label htmlFor="houseNo" className="text-sm font-medium text-gray-700">House No., Building Name *</Label>
                  <Input
                    id="houseNo"
                    value={address.houseNo}
                    onChange={(e) => setAddress({...address, houseNo: e.target.value})}
                    className={`mt-1 ${addressErrors.houseNo ? 'border-red-500' : 'border-gray-200'} rounded-lg`}
                    required
                  />
                  {addressErrors.houseNo && (
                    <p className="text-red-500 text-xs mt-1">{addressErrors.houseNo}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="roadName" className="text-sm font-medium text-gray-700">Road name, Area, Colony *</Label>
                  <Input
                    id="roadName"
                    value={address.roadName}
                    onChange={(e) => setAddress({...address, roadName: e.target.value})}
                    className={`mt-1 ${addressErrors.roadName ? 'border-red-500' : 'border-gray-200'} rounded-lg`}
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
              <div className="flex items-center justify-center space-x-3 text-xs text-gray-500">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                  PCI DSS
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  100% Secured
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-1"></span>
                  Verified
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {currentStep === 3 && (
          <div className="p-4 space-y-4">
            {/* Price Summary */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-semibold mb-3 text-gray-800">Order Summary</h3>
              {(() => {
                const { subtotal, discount, total } = getDiscountInfo();
                return (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Items Total:</span>
                      <span className="text-gray-800">₹{subtotal}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount (Ganesh Offer):</span>
                        <span>-₹{discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery:</span>
                      <span className="text-green-600 font-medium">FREE</span>
                    </div>
                    <hr className="border-gray-200" />
                    <div className="flex justify-between font-bold text-base">
                      <span className="text-gray-800">Total Amount:</span>
                      <span className="text-purple-600">₹{total}</span>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Payment Method</h3>
                <div className="text-right">
                  <div className="text-xs text-green-600 font-medium">100% SAFE</div>
                  <div className="text-xs text-green-600 font-medium">PAYMENTS</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg mb-4 border border-purple-100">
                <div className="flex items-center">
                  <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3 text-white text-xs font-bold">
                    LG
                  </span>
                  <div>
                    <span className="text-purple-700 font-medium block">Pay securely with LG-Pay</span>
                    <p className="text-xs text-purple-600">UPI, Cards, Net Banking & Wallets</p>
                  </div>
                </div>
              </div>

              <div className="border-2 border-purple-200 rounded-lg p-3 bg-purple-50">
                <div className="flex items-center">
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
                      <span className="font-medium text-gray-800">Online Payment</span>
                      <p className="text-xs text-gray-600">Multiple payment options</p>
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
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h4 className="font-medium mb-2 text-gray-800">Deliver to:</h4>
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
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
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

      {/* Fixed Bottom Action Bar - Mobile Optimized */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="w-full max-w-md mx-auto p-4">
          {currentStep === 1 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  {(() => { 
                    const { subtotal, discount, total } = getDiscountInfo(); 
                    return (
                      <div className="font-bold text-lg">
                        {discount > 0 ? (
                          <>
                            <span className="line-through text-gray-400 mr-2 text-sm">₹{subtotal}</span>
                            <span className="text-green-600">₹{total}</span>
                          </>
                        ) : (
                          <span className="text-gray-800">₹{subtotal}</span>
                        )}
                      </div>
                    ); 
                  })()}
                  <div className="text-xs text-blue-600 font-medium">VIEW PRICE DETAILS</div>
                </div>
              </div>
              <Button 
                size="lg" 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl"
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
            </div>
          )}
          
          {currentStep === 2 && (
            <Button 
              size="lg" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl"
              type="submit"
              form="address-form"
            >
              Save Address & Continue
            </Button>
          )}
          
          {currentStep === 3 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  {(() => { 
                    const { subtotal, discount, total } = getDiscountInfo(); 
                    return (
                      <div className="font-bold text-lg">
                        {discount > 0 ? (
                          <>
                            <span className="line-through text-gray-400 mr-2 text-sm">₹{subtotal}</span>
                            <span className="text-green-600">₹{total}</span>
                          </>
                        ) : (
                          <span className="text-gray-800">₹{subtotal}</span>
                        )}
                      </div>
                    ); 
                  })()}
                  <div className="text-xs text-blue-600 font-medium">Secure Payment with LG-Pay</div>
                </div>
              </div>
              <Button 
                size="lg" 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl"
                onClick={handlePayment}
                disabled={isProcessingPayment}
              >
                {isProcessingPayment ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Connecting to LG-Pay...
                  </>
                ) : (
                  'Place Order & Pay'
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;