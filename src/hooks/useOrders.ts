import { useEffect, useState } from 'react';
import { Address, CartItem, Order, OrderItem } from '@/types';
import { computeGaneshOfferDiscount } from '@/lib/utils';

const STORAGE_KEY = 'menso-orders';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setOrders(parsed);
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const placeOrder = (cart: CartItem[], address: Address, paymentMethod: string): Order => {
    const items: OrderItem[] = cart.map(ci => ({
      id: Number(ci.id),
      name: ci.name,
      image: ci.image,
      size: ci.size,
      price: ci.price,
      quantity: ci.quantity,
    }));
    const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const totalQuantity = cart.reduce((s, i) => s + i.quantity, 0);
    const discount = computeGaneshOfferDiscount(subtotal, totalQuantity);
    const total = subtotal - discount;

    const order: Order = {
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      items,
      total,
      address,
      paymentMethod: paymentMethod as any,
      status: 'processing',
    };

    setOrders(prev => [order, ...prev]);
    return order;
  };

  const clearOrders = () => setOrders([]);

  return { orders, placeOrder, clearOrders };
};
