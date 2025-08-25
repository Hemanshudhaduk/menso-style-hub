import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '@/hooks/useOrders';
import { ArrowLeft, Package, Truck, CheckCircle2 } from 'lucide-react';
import { GaneshOfferBanner } from '@/components/GaneshOfferBanner';

const statusIcon = (status: string) => {
  if (status === 'delivered') return <CheckCircle2 className="w-4 h-4 text-green-600" />;
  if (status === 'shipped') return <Truck className="w-4 h-4 text-blue-600" />;
  return <Package className="w-4 h-4 text-purple-600" />;
};

const Orders = () => {
  const navigate = useNavigate();
  const { orders } = useOrders();

  const sorted = useMemo(() => orders.slice().sort((a,b) => +new Date(b.createdAt) - +new Date(a.createdAt)), [orders]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-3 flex items-center">
          <button onClick={() => navigate('/')} className="mr-3">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold">My Orders</h2>
        </div>
      </header>

      <main className="p-4 space-y-4">
        <GaneshOfferBanner />
        {sorted.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">No orders yet. Complete your first order to see it here.</div>
        ) : (
          <div className="space-y-3">
            {sorted.map(order => (
              <div key={order.id} className="bg-white rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleString()}</div>
                  <div className="flex items-center gap-2">
                    {statusIcon(order.status)}
                    <span className="text-sm capitalize">{order.status}</span>
                  </div>
                </div>
                <div className="mt-3 flex gap-3 overflow-x-auto">
                  {order.items.map(item => (
                    <div key={`${order.id}-${item.id}-${item.size}`} className="flex-shrink-0 w-20">
                      <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded" />
                      <div className="text-xs mt-1 line-clamp-2">{item.name}</div>
                      <div className="text-xs text-muted-foreground">Size {item.size}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-sm">Total: <span className="font-medium">₹{order.total}.00</span></div>
                  <button className="text-sm text-fashion-purple" onClick={() => navigate(`/order/${order.id}`)}>View details</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Orders;
