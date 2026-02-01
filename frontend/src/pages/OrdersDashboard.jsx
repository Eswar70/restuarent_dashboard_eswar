import React, { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../services/orderService";
import Spinner from "../components/common/Spinner";
import toast from "react-hot-toast";

const OrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await getOrders();
        setOrders(Array.isArray(res?.data) ? res.data : []);
      } catch {
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      const updated = await updateOrderStatus(orderId, status);
      setOrders(orders.map(o => (o._id === updated._id ? updated : o)));
      toast.success("Order status updated");
    } catch {
      toast.error("Failed to update order status");
    }
  };

  if (loading) return <Spinner size={36} />;

  if (orders.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <div>
      <h2>Orders</h2>

      <div style={{ display: "grid", gap: "14px" }}>
        {orders.map(order => (
          <div
            key={order._id}
            style={{
              background: "#fff",
              padding: "16px",
              borderRadius: "8px"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <strong>{order.orderNumber}</strong>
                <div>₹{order.totalAmount}</div>
              </div>

              <select
                value={order.status}
                onChange={e =>
                  handleStatusChange(order._id, e.target.value)
                }
              >
                <option>Pending</option>
                <option>Preparing</option>
                <option>Ready</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>

            <div style={{ marginTop: "10px" }}>
              {(order.items || []).map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    marginBottom: "8px"
                  }}
                >
                  <img
                    src={item.menuItem?.imageUrl || "https://via.placeholder.com/50"}
                    alt={item.menuItem?.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "6px",
                      objectFit: "cover"
                    }}
                  />
                  <div>
                    <div>{item.menuItem?.name}</div>
                    <div style={{ fontSize: "12px" }}>
                      Qty: {item.quantity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersDashboard;
