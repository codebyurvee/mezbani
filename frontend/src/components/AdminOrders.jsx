import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchOrders() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/orders`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();

      console.log("ORDERS FROM BACKEND:", data);

      setOrders(data.orders || []);
    } catch (error) {
      console.error("ORDER FETCH ERROR:", error);
      setError("Could not load orders.");
    } finally {
      setLoading(false);
    }
  }

  async function updateOrderStatus(orderId, status) {
    try {
      const response = await fetch(
        `${API_URL}/orders/${orderId}/status?status=${encodeURIComponent(status)}`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const data = await response.json();

      console.log("STATUS UPDATED:", data);

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId
            ? { ...order, status }
            : order
        )
      );
    } catch (error) {
      console.error("STATUS ERROR:", error);
      alert("Could not update order status");
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  const totalRevenue = orders.reduce(
    (total, order) => total + Number(order.total),
    0
  );

  if (loading) {
    return (
      <div className="admin-dashboard">
        <h2>Loading orders...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <h2>{error}</h2>

        <button onClick={fetchOrders}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">

      {/* HEADER */}
      <header className="admin-header">
        <div>
          <p>MEZBANI ADMIN</p>
          <h1>Orders Dashboard</h1>
          <span>Manage your customer orders</span>
        </div>

        <div className="admin-actions">
          <button onClick={fetchOrders}>
            Refresh Orders
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("adminLoggedIn");
              window.location.href = "/admin";
            }}
          >
            Logout
          </button>
        </div>
      </header>


      {/* STATS */}
      <div className="admin-stats">

        <div className="stat-card">
          <span>Total Orders</span>
          <strong>{orders.length}</strong>
        </div>

        <div className="stat-card">
          <span>Total Revenue</span>
          <strong>
            ${totalRevenue.toFixed(2)}
          </strong>
        </div>

        <div className="stat-card">
          <span>Pending Orders</span>
          <strong>{orders.filter((o) => o.status === "Pending").length}</strong>
        </div>

      </div>


      {/* ORDERS */}
      <div className="orders-section">

        <div className="orders-heading">
          <h2>Recent Orders</h2>

          <span>
            {orders.length} orders
          </span>
        </div>


        {orders.length === 0 ? (

          <div className="empty-orders">
            <h3>No orders yet</h3>
            <p>
              Customer orders will appear here.
            </p>
          </div>

        ) : (

          <div className="orders-table-wrapper">

            <table className="orders-table">

              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>

                {orders.map((order) => (

                  <tr key={order.id}>

                    <td>
                      <strong>
                        #{order.id}
                      </strong>
                    </td>


                    <td>
                      <strong>
                        {order.name}
                      </strong>

                      <small>
                        {order.phone}
                      </small>
                    </td>


                    <td>
                      {order.items.map((item) => (
                        <div key={item.id}>
                          {item.name} × {item.quantity}
                        </div>
                      ))}
                    </td>


                    <td>
                      <span className="payment-badge">
                        {order.payment}
                      </span>
                    </td>

                    <td>
                      <select
                        className="status-select"
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Ready">Ready</option>
                        <option value="Out for Delivery">
                          Out for Delivery
                        </option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>


                    <td>
                      <strong>
                        ${Number(order.total).toFixed(2)}
                      </strong>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default AdminOrders;