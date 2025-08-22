import { X, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: number, size: string, change: number) => void;
  onRemoveItem: (productId: number, size: string) => void;
  onCheckout: () => void;
  totalPrice: number;
}

export const CartSidebar = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  totalPrice
}: CartSidebarProps) => {
  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'hidden'}`}>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-card shadow-lg transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
            <h3 className="text-lg font-semibold">Your Cart</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Cart Items - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="text-center py-12 px-4">
                <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Your cart is feeling lonely</p>
              </div>
            ) : (
              <div className="p-4 space-y-3">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-20 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{item.name}</h4>
                      <p className="text-fashion-purple font-semibold">
                        ₹{item.price} 
                        <span className="text-muted-foreground line-through ml-1">
                          ₹{item.originalPrice}
                        </span>
                      </p>
                      <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                      <div className="flex items-center mt-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="w-8 h-8"
                          onClick={() => onUpdateQuantity(item.id, item.size, -1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="mx-3 min-w-8 text-center">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="w-8 h-8"
                          onClick={() => onUpdateQuantity(item.id, item.size, 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onRemoveItem(item.id, item.size)}
                      className="text-destructive hover:text-destructive flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer - Fixed */}
          {cart.length > 0 && (
            <div className="border-t bg-white p-4 flex-shrink-0">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Cart Total:</span>
                  <span className="font-semibold">₹{totalPrice}.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold">
                  <span>To Pay:</span>
                  <span>₹{totalPrice}.00</span>
                </div>
              </div>
              
              <Button 
                variant="fashion" 
                size="lg" 
                className="w-full"
                onClick={onCheckout}
              >
                Confirm Order
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};