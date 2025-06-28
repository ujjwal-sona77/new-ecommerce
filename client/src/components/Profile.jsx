import React, { useState, useEffect } from "react";
import { authService } from "../services/authService";
import Navbar from "./Navbar";
import "./CSS/Profile.css";
import { productService } from "../services/productService";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [cartItems, setCartItems] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
        setCartItems(userData.cart);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="profile-loading">
          <div className="spinner"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div
        className="profile-container"
        style={{
          display: "flex",
          minHeight: "80vh",
          background: "#f7f7fa",
          padding: "40px 0",
          fontFamily: "Segoe UI, sans-serif",
        }}
      >
        <div
          className="profile-sidebar"
          style={{
            width: "300px",
            background: "#fff",
            borderRadius: "18px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
            margin: "0 32px",
            padding: "32px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="user-brief" style={{ textAlign: "center" }}>
            <div
              className="user-avatar"
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                overflow: "hidden",
                margin: "0 auto 16px",
                border: "3px solid #e0e0e0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <img
                src={user.profilePic}
                alt="Profile"
                className="profile-picture"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <h3
              style={{
                margin: "8px 0 4px",
                fontWeight: 600,
                fontSize: "1.3rem",
              }}
            >
              {user?.username}
            </h3>
            <p style={{ color: "#888", fontSize: "0.98rem" }}>
              {user?.email}
            </p>
          </div>
          <div
            className="profile-tabs"
            style={{
              marginTop: "36px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <button
              className={`tab-btn ${
                activeTab === "profile" ? "active" : ""
              }`}
              onClick={() => setActiveTab("profile")}
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                background:
                  activeTab === "profile" ? "#4f8cff" : "#f0f4fa",
                color: activeTab === "profile" ? "#fff" : "#333",
                fontWeight: 500,
                cursor: "pointer",
                transition: "background 0.2s",
                fontSize: "1rem",
              }}
            >
              Profile Details
            </button>
            <button
              className={`tab-btn ${
                activeTab === "cart" ? "active" : ""
              }`}
              onClick={() => setActiveTab("cart")}
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                background:
                  activeTab === "cart" ? "#4f8cff" : "#f0f4fa",
                color: activeTab === "cart" ? "#fff" : "#333",
                fontWeight: 500,
                cursor: "pointer",
                transition: "background 0.2s",
                fontSize: "1rem",
              }}
            >
              Cart Items
            </button>
            <button
              className={`tab-btn ${
                activeTab === "orders" ? "active" : ""
              }`}
              onClick={() => setActiveTab("orders")}
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                background:
                  activeTab === "orders" ? "#4f8cff" : "#f0f4fa",
                color: activeTab === "orders" ? "#fff" : "#333",
                fontWeight: 500,
                cursor: "pointer",
                transition: "background 0.2s",
                fontSize: "1rem",
              }}
            >
              Order History
            </button>
          </div>
        </div>

        <div
          className="profile-content"
          style={{
            flex: 1,
            background: "#fff",
            borderRadius: "18px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
            padding: "36px 40px",
            minHeight: "500px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          {activeTab === "profile" && (
            <div className="profile-details">
              <h2
                style={{
                  fontWeight: 600,
                  marginBottom: "28px",
                  fontSize: "1.5rem",
                }}
              >
                Profile Information
              </h2>
              <div
                className="info-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "28px 40px",
                }}
              >
                <div className="info-item">
                  <label
                    style={{ color: "#888", fontSize: "0.98rem" }}
                  >
                    Username
                  </label>
                  <p
                    style={{
                      fontWeight: 500,
                      fontSize: "1.1rem",
                    }}
                  >
                    {user?.username}
                  </p>
                </div>
                <div className="info-item">
                  <label
                    style={{ color: "#888", fontSize: "0.98rem" }}
                  >
                    Email
                  </label>
                  <p
                    style={{
                      fontWeight: 500,
                      fontSize: "1.1rem",
                    }}
                  >
                    {user?.email}
                  </p>
                </div>
                <div className="info-item">
                  <label
                    style={{ color: "#888", fontSize: "0.98rem" }}
                  >
                    Member Since
                  </label>
                  <p
                    style={{
                      fontWeight: 500,
                      fontSize: "1.1rem",
                    }}
                  >
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="info-item">
                  <label
                    style={{ color: "#888", fontSize: "0.98rem" }}
                  >
                    Account Type
                  </label>
                  <p
                    style={{
                      fontWeight: 500,
                      fontSize: "1.1rem",
                    }}
                  >
                    {user?.admin ? "Administrator" : "Customer"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "cart" && (
            <div className="cart-section">
              <h2
                style={{
                  fontWeight: 600,
                  marginBottom: "28px",
                  fontSize: "1.5rem",
                }}
              >
                Shopping Cart
              </h2>
              {cartItems.length === 0 ? (
                <div
                  className="empty-cart"
                  style={{
                    textAlign: "center",
                    color: "#aaa",
                    fontSize: "1.1rem",
                    marginTop: "60px",
                  }}
                >
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div
                    className="cart-items"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "22px",
                    }}
                  >
                    {cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="cart-item"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          background: "#f8fafd",
                          borderRadius: "12px",
                          padding: "18px 20px",
                          boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
                          gap: "22px",
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: "70px",
                            height: "70px",
                            borderRadius: "10px",
                            objectFit: "cover",
                            border: "1px solid #e0e0e0",
                          }}
                        />
                        <div className="item-details" style={{ flex: 1 }}>
                          <h3
                            style={{
                              margin: 0,
                              fontWeight: 500,
                              fontSize: "1.1rem",
                            }}
                          >
                            {item.name}
                          </h3>
                          <p
                            style={{
                              color: "#4f8cff",
                              fontWeight: 600,
                              margin: "6px 0 0",
                            }}
                          >
                            ₹
                            {item.discount && item.discount > 0
                              ? (
                                  item.price -
                                  (item.price * item.discount) / 100
                                ).toFixed(2)
                              : item.price}
                          </p>
                        </div>
                        <div
                          className="item-quantity"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            background: "#fff",
                            borderRadius: "6px",
                            border: "1px solid #e0e0e0",
                            padding: "4px 10px",
                          }}
                        >
                          <button
                            onClick={async () => {
                              try {
                                const token = localStorage.getItem("token");
                                const payload = JSON.parse(atob(token.split(".")[1]));
                                const email = payload.email;
                                if ((item.quantity || 1) > 1) {
                                  await productService.decreaseProductQuantity(item._id, email);
                                  setCartItems((prevItems) =>
                                    prevItems.map((i) =>
                                      i._id === item._id
                                        ? { ...i, quantity: (i.quantity || 1) - 1 }
                                        : i
                                    )
                                  );
                                }
                              } catch (error) {
                                console.error("Error decreasing item quantity:", error);
                              }
                            }}
                            style={{
                              border: "none",
                              background: "#e0e7ff",
                              color: "#4f8cff",
                              borderRadius: "4px",
                              width: "28px",
                              height: "28px",
                              fontSize: "1.1rem",
                              cursor: "pointer",
                            }}
                          >
                            -
                          </button>
                          <span
                            style={{
                              minWidth: "22px",
                              textAlign: "center",
                            }}
                          >
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={async () => {
                              try {
                                const token = localStorage.getItem("token");
                                const payload = JSON.parse(atob(token.split(".")[1]));
                                const email = payload.email;
                                await productService.increseProductQuantity(item._id, email);
                                setCartItems((prevItems) =>
                                  prevItems.map((i) =>
                                    i._id === item._id
                                      ? { ...i, quantity: (i.quantity || 1) + 1 }
                                      : i
                                  )
                                );
                              } catch (error) {
                                console.error("Error increasing item quantity:", error);
                              }
                            }}
                            style={{
                              border: "none",
                              background: "#e0e7ff",
                              color: "#4f8cff",
                              borderRadius: "4px",
                              width: "28px",
                              height: "28px",
                              fontSize: "1.1rem",
                              cursor: "pointer",
                            }}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="remove-btn"
                          onClick={async () => {
                            try {
                              productService.removeProduct(item._id);
                              setCartItems((prevItems) =>
                                prevItems.filter((i) => i._id !== item._id)
                              );
                            } catch (error) {
                              console.error("Error removing item from cart:", error);
                            }
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  {/* Total Calculation */}
                  {(() => {
                    // Calculate total cost with discount
                    let total = cartItems.reduce((sum, item) => {
                      const price =
                        item.discount && item.discount > 0
                          ? (item.price - (item.price * item.discount) / 100)
                          : item.price;
                      return sum + price * (item.quantity || 1);
                    }, 0);
                    let shipmentFee = total > 1000 ? 0 : 50;
                    let grandTotal = total + shipmentFee;
                    return (
                      <div
                        style={{
                          marginTop: "32px",
                          textAlign: "right",
                          background: "#f5faff",
                          borderRadius: "12px",
                          padding: "24px 32px 16px 32px",
                          boxShadow: "0 2px 12px rgba(79,140,255,0.07)",
                          border: "1px solid #e0e7ff",
                          maxWidth: 400,
                          marginLeft: "auto",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "1.1rem",
                            fontWeight: 500,
                            marginBottom: 8,
                          }}
                        >
                          Subtotal:{" "}
                          <span style={{ color: "#222" }}>
                            ₹{total.toFixed(2)}
                          </span>
                        </div>
                        <div
                          style={{
                            fontSize: "1rem",
                            color:
                              shipmentFee === 0
                                ? "#388e3c"
                                : "#d32f2f",
                            marginBottom: 8,
                          }}
                        >
                          Shipment Fee:
                          {shipmentFee === 0 ? (
                            <b>Free</b>
                          ) : (
                            `₹${shipmentFee}`
                          )}
                        </div>
                        <div
                          style={{
                            fontSize: "1.3rem",
                            fontWeight: 700,
                            marginTop: "8px",
                            color: "#4f8cff",
                          }}
                        >
                          Total: ₹{grandTotal.toFixed(2)}
                        </div>
                        <button
                          style={{
                            marginTop: 18,
                            background: "#4f8cff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "8px",
                            padding: "12px 32px",
                            fontWeight: 600,
                            fontSize: "1.1rem",
                            cursor: "pointer",
                            boxShadow: "0 2px 8px rgba(79,140,255,0.08)",
                            transition: "background 0.2s",
                          }}
                          onClick={() =>
                            alert("Order placed! (Implement order logic here)")
                          }
                        >
                          Place Order
                        </button>
                      </div>
                    );
                  })()}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;

