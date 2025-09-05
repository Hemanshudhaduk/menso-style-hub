import { useState, useEffect } from 'react';
import { CartItem, Product } from '@/types';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('menso-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('menso-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, size: string = 'S') => {
    const existingItem = cart.find(item => String(item.id) === String(product.id) && item.size === size);
    let next: CartItem[];
    if (existingItem) {
      next = cart.map(item =>
        String(item.id) === String(product.id) && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      next = [...cart, { ...product, size, quantity: 1 }];
    }
    setCart(next);
    // Synchronous persistence to avoid race when navigating immediately to checkout
    localStorage.setItem('menso-cart', JSON.stringify(next));
  };

  const removeFromCart = (productId: number | string, size: string) => {
    const next = cart.filter(item => !(String(item.id) === String(productId) && item.size === size));
    setCart(next);
    localStorage.setItem('menso-cart', JSON.stringify(next));
  };

  const updateQuantity = (productId: number | string, size: string, change: number) => {
    const next = cart
      .map(item => {
        if (String(item.id) === String(productId) && item.size === size) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      })
      .filter(item => item.quantity > 0);
    setCart(next);
    localStorage.setItem('menso-cart', JSON.stringify(next));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.setItem('menso-cart', JSON.stringify([]));
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  };
};