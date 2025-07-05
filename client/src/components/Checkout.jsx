import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { authService } from "../services/authService";

const pastelGradient = "linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)";
const accent = "#4f8cff";
const accentSoft = "#e0e7ff";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const user = location.state?.user || {};
  const [form, setForm] = useState({
    fullname: user.username || "",
    address: "",
    city: "",
    postalcode: "",
    contactno: "",
    paymentMethod: "COD",
  });
  const [placing, setPlacing] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  let total = cartItems.reduce((sum, item) => {
    const price = item.discount && item.discount > 0 ? (item.price - (item.price * item.discount) / 100) : item.price;
    return sum + price * (item.quantity || 1);
  }, 0);
  let shipmentFee = total > 1000 ? 0 : 50;
  let grandTotal = total + shipmentFee;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    setPlacing(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(
        `/api/order/create/${user.email}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (data.success) {
        setSuccess("Order placed successfully!");
        setTimeout(() => {
          navigate("/profile#orders", { replace: true });
        }, 1800);
      } else {
        setError(data.message || "Order failed");
      }
    } catch (err) {
      setError("Order failed. Please try again.");
    }
    setPlacing(false);
  };

  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100vh", background: pastelGradient, padding: "40px 0" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", background: "rgba(255,255,255,0.92)", borderRadius: 24, boxShadow: "0 8px 40px rgba(79,140,255,0.10)", padding: 36 }}>
          <h2 style={{ fontWeight: 700, fontSize: "1.6rem", color: accent, marginBottom: 24 }}>Checkout</h2>
          {success && <div style={{ background: "#e0ffe0", color: "#388e3c", padding: 16, borderRadius: 10, marginBottom: 18, fontWeight: 600 }}>{success}</div>}
          {error && <div style={{ background: "#ffe0e0", color: "#d32f2f", padding: 16, borderRadius: 10, marginBottom: 18, fontWeight: 600 }}>{error}</div>}
          <form onSubmit={handleOrder} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div style={{ gridColumn: "1/3" }}>
              <label style={{ color: "#b0b8c9", fontSize: "0.98rem" }}>Full Name</label>
              <input name="fullname" value={form.fullname} onChange={handleChange} required style={{ width: "100%", padding: 12, borderRadius: 8, border: `1.5px solid ${accentSoft}`, marginBottom: 12, fontSize: "1.08rem" }} />
            </div>
            <div>
              <label style={{ color: "#b0b8c9", fontSize: "0.98rem" }}>Address</label>
              <input name="address" value={form.address} onChange={handleChange} required style={{ width: "100%", padding: 12, borderRadius: 8, border: `1.5px solid ${accentSoft}`, marginBottom: 12, fontSize: "1.08rem" }} />
            </div>
            <div>
              <label style={{ color: "#b0b8c9", fontSize: "0.98rem" }}>City</label>
              <input name="city" value={form.city} onChange={handleChange} required style={{ width: "100%", padding: 12, borderRadius: 8, border: `1.5px solid ${accentSoft}`, marginBottom: 12, fontSize: "1.08rem" }} />
            </div>
            <div>
              <label style={{ color: "#b0b8c9", fontSize: "0.98rem" }}>Postal Code</label>
              <input name="postalcode" value={form.postalcode} onChange={handleChange} required style={{ width: "100%", padding: 12, borderRadius: 8, border: `1.5px solid ${accentSoft}`, marginBottom: 12, fontSize: "1.08rem" }} />
            </div>
            <div>
              <label style={{ color: "#b0b8c9", fontSize: "0.98rem" }}>Contact No.</label>
              <input name="contactno" value={form.contactno} onChange={handleChange} required style={{ width: "100%", padding: 12, borderRadius: 8, border: `1.5px solid ${accentSoft}`, marginBottom: 12, fontSize: "1.08rem" }} />
            </div>
            <div>
              <label style={{ color: "#b0b8c9", fontSize: "0.98rem" }}>Payment Method</label>
              <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} style={{ width: "100%", padding: 12, borderRadius: 8, border: `1.5px solid ${accentSoft}`, marginBottom: 12, fontSize: "1.08rem" }}>
                <option value="COD">Cash on Delivery</option>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
              </select>
            </div>
            <div style={{ gridColumn: "1/3", marginTop: 12 }}>
              <h3 style={{ color: accent, fontWeight: 600, marginBottom: 8 }}>Order Summary</h3>
              <div style={{ background: accentSoft, borderRadius: 12, padding: 18, marginBottom: 8 }}>
                {cartItems.map((item) => (
                  <div key={item._id} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                    <img src={item.image} alt={item.name} style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover", marginRight: 14, border: `1.5px solid ${accent}` }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: accent }}>{item.name}</div>
                      <div style={{ color: "#7a8ca3", fontSize: "0.98rem" }}>Qty: {item.quantity || 1}</div>
                    </div>
                    <div style={{ fontWeight: 600, color: "#222", minWidth: 60, textAlign: "right" }}>
                      ₹{item.discount && item.discount > 0 ? (item.price - (item.price * item.discount) / 100).toFixed(2) : item.price}
                    </div>
                  </div>
                ))}
                <div style={{ borderTop: `1.5px solid #dbeafe`, marginTop: 10, paddingTop: 10, fontWeight: 600 }}>
                  Subtotal: ₹{total.toFixed(2)}<br />
                  Shipment Fee: {shipmentFee === 0 ? <b>Free</b> : `₹${shipmentFee}`}<br />
                  <span style={{ color: accent, fontWeight: 700, fontSize: "1.15rem" }}>Total: ₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>
              <button type="submit" disabled={placing} style={{ marginTop: 18, background: accent, color: "#fff", border: "none", borderRadius: 10, padding: "14px 38px", fontWeight: 700, fontSize: "1.13rem", cursor: placing ? "not-allowed" : "pointer", boxShadow: "0 2px 8px rgba(79,140,255,0.08)", transition: "background 0.2s" }}>
                {placing ? "Placing Order..." : "Place Order"}
              </button>
              <button type="button" onClick={() => navigate(-1)} style={{ marginLeft: 18, background: accentSoft, color: accent, border: "none", borderRadius: 10, padding: "14px 28px", fontWeight: 600, fontSize: "1.05rem", cursor: "pointer", boxShadow: "0 2px 8px rgba(79,140,255,0.04)", transition: "background 0.2s" }}>
                Back to Cart
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
