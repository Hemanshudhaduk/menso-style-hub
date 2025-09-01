import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOrders } from "@/hooks/useOrders";
import { ArrowLeft, Package, Truck, CheckCircle2 } from "lucide-react";

const statusIcon = (status: string) => {
  if (status === "delivered") return <CheckCircle2 className="w-5 h-5 text-green-600" />;
  if (status === "shipped") return <Truck className="w-5 h-5 text-blue-600" />;
  return <Package className="w-5 h-5 text-purple-600" />;
};

const OrderDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { orders } = useOrders();

  const order = useMemo(() => orders.find((o) => o.id === id), [orders, id]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground text-lg">⚠️ Order not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-3 flex items-center">
          <button onClick={() => navigate("/orders")} className="mr-3">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold">Order #{order.id}</h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-5">
        {/* Order Info */}
        <div className="bg-white rounded-xl border p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Placed on {new Date(order.createdAt).toLocaleString()}
            </div>
            <div className="flex items-center gap-2">
              {statusIcon(order.status)}
              <span className="capitalize font-medium">{order.status}</span>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div className="bg-gray-50 p-2 rounded-lg">
              <span className="text-muted-foreground">Payment:</span>{" "}
              <span className="font-semibold uppercase">{order.paymentMethod}</span>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg">
              <span className="text-muted-foreground">Total:</span>{" "}
              <span className="font-semibold text-green-700">₹{order.total}.00</span>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg">
              <span className="text-muted-foreground">Items:</span>{" "}
              <span className="font-semibold">{order.items.length}</span>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white rounded-xl border p-4 shadow-sm">
          <h3 className="font-semibold mb-3 text-lg">🛍️ Items</h3>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={`${order.id}-${item.id}-${item.size}`}
                className="flex gap-3 border-b pb-3 last:border-0"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-24 object-cover rounded-md shadow-sm"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground">Size {item.size}</div>
                  <div className="text-sm font-semibold mt-1">
                    ₹{item.price} × {item.quantity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-white rounded-xl border p-4 shadow-sm">
          <h3 className="font-semibold mb-3 text-lg">📍 Delivery Address</h3>
          <div className="text-sm space-y-1">
            <div className="font-medium">{order.address.fullName}</div>
            <div>
              {order.address.houseNo}, {order.address.roadName}
            </div>
            <div>
              {order.address.city}, {order.address.state} - {order.address.pincode}
            </div>
            <div className="text-muted-foreground">Mobile: {order.address.mobile}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderDetail;
