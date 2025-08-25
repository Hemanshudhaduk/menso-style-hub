import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOrders } from '@/hooks/useOrders';
import { ArrowLeft } from 'lucide-react';

const OrderDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { orders } = useOrders();

  const order = useMemo(() => orders.find(o => o.id === id), [orders, id]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Order not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-3 flex items-center">
          <button onClick={() => navigate('/orders')} className="mr-3">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold">Order {order.id}</h2>
        </div>
      </header>

      <main className="p-4 space-y-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Placed on {new Date(order.createdAt).toLocaleString()}</div>
          <div className="mt-2 text-sm">Status: <span className="capitalize font-medium">{order.status}</span></div>
          <div className="mt-2 text-sm">Payment: <span className="uppercase font-medium">{order.paymentMethod}</span></div>
          <div className="mt-2 text-sm">Total: <span className="font-semibold">₹{order.total}.00</span></div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <h3 className="font-semibold mb-2">Items</h3>
          <div className="space-y-3">
            {order.items.map(item => (
              <div key={`${order.id}-${item.id}-${item.size}`} className="flex gap-3">
                <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded" />
                <div className="flex-1">
                  <div className="text-sm font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground">Size {item.size}</div>
                  <div className="text-sm">₹{item.price} × {item.quantity}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <h3 className="font-semibold mb-2">Delivery Address</h3>
          <div className="text-sm">
            <div className="font-medium">{order.address.fullName}</div>
            <div>{order.address.houseNo}, {order.address.roadName}</div>
            <div>{order.address.city}, {order.address.state} - {order.address.pincode}</div>
            <div>Mobile: {order.address.mobile}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderDetail;
