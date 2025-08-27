import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { indianStates, stateToCities } from '@/data/indiaLocations';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { Address, Order } from '@/types';
import { computeGaneshOfferDiscount } from '@/lib/utils';
import { useOrders } from '@/hooks/useOrders';
import { useUser } from '@/hooks/useUser';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedUpiProvider, setSelectedUpiProvider] = useState<'gpay' | 'phonepe' | 'paytm'>('gpay');
  const [upiId, setUpiId] = useState('');
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const { user } = useUser();
  const [address, setAddress] = useState<Address>({
    fullName: user ? `${user.firstName} ${user.lastName}` : '',
    mobile: user ? user.mobile : '',
    pincode: user ? user.pincode : '',
    city: '',
    state: user ? user.state : '',
    houseNo: '',
    roadName: ''
  });
  const [addressErrors, setAddressErrors] = useState<Partial<Record<keyof Address, string>>>({});
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const { placeOrder } = useOrders();
  const getDiscountInfo = () => {
    const quantity = cart.reduce((s, i) => s + i.quantity, 0);
    const subtotal = getTotalPrice();
    const discount = computeGaneshOfferDiscount(subtotal, quantity);
    const total = subtotal - discount;
    return { subtotal, discount, total };
  };

  const steps = [
    { id: 1, name: 'Cart', completed: true },
    { id: 2, name: 'Address', completed: currentStep > 2 },
    { id: 3, name: 'Payment', completed: currentStep > 3 },
    { id: 4, name: 'Summary', completed: false }
  ];

  const validateAddress = (addr: Address) => {
    const errors: Partial<Record<keyof Address, string>> = {};

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

  const handleAddressSubmit = (e: React.FormEvent) => {
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

  const handlePayment = () => {
    if (selectedPayment === 'upi') {
      if (!upiId.trim()) {
        toast({ title: 'Enter UPI ID', description: 'Please provide your UPI ID to continue.' });
        return;
      }
      toast({
        title: 'Processing Payment',
        description: `Opening ${selectedUpiProvider.toUpperCase()}...`,
      });
    }

    setTimeout(() => {  
      const order = placeOrder(cart, address, `${selectedPayment}-${selectedUpiProvider}`);
      setLastOrder(order);
      toast({
        title: 'Payment Successful',
        description: `Order ${order.id} confirmed.`,
      });
      clearCart();
      setCurrentStep(4);
    }, 800);
  };

  const handleDownloadInvoice = () => {
    if (!lastOrder) return;
    const invoiceHtml = `
      <html>
        <head>
          <meta charset=\"utf-8\" />
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
          <div class=\"section\">
            <div><strong>Order ID:</strong> ${lastOrder.id}</div>
            <div><strong>Date:</strong> ${new Date(lastOrder.createdAt).toLocaleString()}</div>
            <div><strong>Payment:</strong> ${lastOrder.paymentMethod}</div>
          </div>
          <div class=\"section\">
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
                <th class=\"right\">Qty</th>
                <th class=\"right\">Price</th>
                <th class=\"right\">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${lastOrder.items.map(i => `
                <tr>
                  <td>${i.name}</td>
                  <td>${i.size}</td>
                  <td class=\"right\">${i.quantity}</td>
                  <td class=\"right\">₹${i.price}.00</td>
                  <td class=\"right\">₹${i.price * i.quantity}.00</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class=\"section\" style=\"text-align:right;margin-top:12px\"><strong>Total: ₹${lastOrder.total}.00</strong></div>
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
              {cart.map((item) => (
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
                        {(address.state ? stateToCities[address.state] : []).map((c) => (
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
                        <button className={`px-3 py-1 rounded border ${selectedUpiProvider==='gpay'?'bg-purple-50 border-purple-400':'border-gray-300'}`} onClick={(e) => { e.preventDefault(); setSelectedUpiProvider('gpay'); }}>GPay</button>
                        <button className={`px-3 py-1 rounded border ${selectedUpiProvider==='phonepe'?'bg-purple-50 border-purple-400':'border-gray-300'}`} onClick={(e) => { e.preventDefault(); setSelectedUpiProvider('phonepe'); }}>PhonePe</button>
                        <button className={`px-3 py-1 rounded border ${selectedUpiProvider==='paytm'?'bg-purple-50 border-purple-400':'border-gray-300'}`} onClick={(e) => { e.preventDefault(); setSelectedUpiProvider('paytm'); }}>Paytm</button>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Your UPI ID</label>
                        <input className="mt-1 w-full border rounded px-3 py-2 text-sm" placeholder="e.g. username@okicici" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
                      </div>
                    </div>
                  )}
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
      </main>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        {currentStep === 1 && (
          <>
            <div className="flex justify-between items-center mb-3">
              <div>
                {(() => { const { subtotal, discount, total } = getDiscountInfo(); return (
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
                ); })()}
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
                {(() => { const { subtotal, discount, total } = getDiscountInfo(); return (
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
                ); })()}
                <div className="text-sm text-blue-600 cursor-pointer">VIEW PRICE DETAILS</div>
              </div>
            </div>
            <Button 
              variant="fashion" 
              size="lg" 
              className="w-full"
              onClick={handlePayment}
              disabled={selectedPayment === 'upi' && !upiId.trim()}
            >
              Pay Now
            </Button>
          </>
        )}

        {currentStep === 4 && lastOrder && (
          <div className="p-4">
            <div className="bg-white rounded-lg p-4 space-y-3">
              <h3 className="text-lg font-semibold">Order Summary</h3>
              <div className="text-sm text-gray-600">Order ID: {lastOrder.id}</div>
              <div className="text-sm">Payment: {lastOrder.paymentMethod}</div>
              <div className="text-sm">
                Ship To: {lastOrder.address.fullName}, {lastOrder.address.houseNo}, {lastOrder.address.roadName}, {lastOrder.address.city}, {lastOrder.address.state} - {lastOrder.address.pincode}
              </div>
              <div className="divide-y">
                {lastOrder.items.map((i) => (
                  <div key={`${i.id}-${i.size}`} className="py-2 flex justify-between text-sm">
                    <div>
                      <div className="font-medium">{i.name}</div>
                      <div className="text-gray-600">Size: {i.size} • Qty: {i.quantity}</div>
                    </div>
                    <div className="font-medium">₹{i.price * i.quantity}.00</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-semibold pt-2">
                <span>Total</span>
                <span>₹{lastOrder.total}.00</span>
              </div>
              <Button variant="outline" onClick={handleDownloadInvoice}>Download Invoice (PDF)</Button>
              <Button variant="fashion" onClick={() => navigate('/orders')} className="w-full">Go to Orders</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;