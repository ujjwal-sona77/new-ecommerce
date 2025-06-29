import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderSection = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_BACKEND_URI;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/order/admin/all`);
        setOrders(res.data.orders);
      } catch (err) {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div>Loading orders...</div>;

  return (
    <section
      style={{
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        padding: "2rem",
        minWidth: "340px",
        flex: "1 1 370px",
        marginBottom: "2rem",
        maxWidth: 900,
      }}
    >
      <h2
        style={{
          borderBottom: "2px solid #e3e6ea",
          paddingBottom: "0.75rem",
          marginBottom: "1.5rem",
          color: "#d2691e",
          fontSize: "1.5rem",
          letterSpacing: "0.5px",
        }}
      >
        Orders
      </h2>
      {orders.length === 0 ? (
        <p style={{ color: "#888", marginTop: "1rem" }}>No orders found.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 0.5rem" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "0.75rem 0.5rem", color: "#555" }}>Order ID</th>
                <th style={{ textAlign: "left", padding: "0.75rem 0.5rem", color: "#555" }}>User</th>
                <th style={{ textAlign: "left", padding: "0.75rem 0.5rem", color: "#555" }}>Products</th>
                <th style={{ textAlign: "left", padding: "0.75rem 0.5rem", color: "#555" }}>Status</th>
                <th style={{ textAlign: "left", padding: "0.75rem 0.5rem", color: "#555" }}>Date</th>
                <th style={{ textAlign: "left", padding: "0.75rem 0.5rem", color: "#555" }}>Address</th>
                <th style={{ textAlign: "left", padding: "0.75rem 0.5rem", color: "#555" }}>Contact</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} style={{ background: "#f8fafc", borderRadius: "8px" }}>
                  <td style={{ padding: "0.75rem 0.5rem", borderBottom: "1px solid #f4f6f8" }}>{order._id}</td>
                  <td style={{ padding: "0.75rem 0.5rem", borderBottom: "1px solid #f4f6f8" }}>{order.user?.email || "-"}</td>
                  <td style={{ padding: "0.75rem 0.5rem", borderBottom: "1px solid #f4f6f8" }}>{order.products && order.products.length > 0 ? order.products.map(p => p.name).join(", ") : "-"}</td>
                  <td style={{ padding: "0.75rem 0.5rem", borderBottom: "1px solid #f4f6f8" }}>{order.status}</td>
                  <td style={{ padding: "0.75rem 0.5rem", borderBottom: "1px solid #f4f6f8" }}>{new Date(order.createdAt).toLocaleString()}</td>
                  <td style={{ padding: "0.75rem 0.5rem", borderBottom: "1px solid #f4f6f8" }}>{order.address}, {order.city}, {order.postalcode}</td>
                  <td style={{ padding: "0.75rem 0.5rem", borderBottom: "1px solid #f4f6f8" }}>{order.contactno}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default OrderSection;
