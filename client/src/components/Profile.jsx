import React, { useState, useEffect } from "react";
import { authService } from "../services/authService";
import Navbar from "./Navbar";
import { productService } from "../services/productService";

const pastelGradient = "linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)";
const glassBg = "rgba(255,255,255,0.85)";
const accent = "#4f8cff";
const accentSoft = "#e0e7ff";
const border = "1.5px solid #e3e8f7";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState("profile");
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [popup, setPopup] = useState({ show: false, message: "" });

    useEffect(() => {
        if (window.location.hash === "#cart") setActiveTab("cart");
        const fetchUserData = async () => {
            try {
                const userData = await authService.getCurrentUser();
                setUser(userData);
                setCartItems(userData.cart || []);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const showPopup = (message) => {
        setPopup({ show: true, message });
        setTimeout(() => setPopup({ show: false, message: "" }), 1800);
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: pastelGradient,
                }}>
                    <div style={{ width: 60, height: 60, borderRadius: "50%", border: `4px solid ${accent}`, borderTop: `4px solid #fff`, animation: "spin 1s linear infinite" }} />
                    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            {/* Popup notification */}
            {popup.show && (
                <div
                    style={{
                        position: "fixed",
                        top: 40,
                        right: 40,
                        zIndex: 9999,
                        background: accent,
                        color: "#fff",
                        padding: "18px 36px",
                        borderRadius: "16px",
                        fontWeight: 600,
                        fontSize: "1.1rem",
                        boxShadow: "0 8px 32px rgba(79,140,255,0.18)",
                        animation: "popIn 0.5s cubic-bezier(.68,-0.55,.27,1.55)",
                    }}
                >
                    <span role="img" aria-label="success" style={{marginRight: 10}}>✅</span>
                    {popup.message}
                </div>
            )}
            <div
                style={{
                    minHeight: "100vh",
                    width: "100vw",
                    background: pastelGradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "40px 0",
                }}
            >
                <div
                    className="profile-main-flex"
                    style={{
                        width: "100%",
                        maxWidth: 1100,
                        minHeight: 600,
                        background: glassBg,
                        borderRadius: 32,
                        boxShadow: "0 8px 40px rgba(79,140,255,0.10)",
                        display: "flex",
                        overflow: "hidden",
                        border,
                        flexDirection: "row",
                    }}
                >
                    {/* Sidebar */}
                    <div
                        className="profile-sidebar"
                        style={{
                            width: 340,
                            background: "rgba(245,248,255,0.85)",
                            borderRight: border,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "48px 24px 32px 24px",
                            gap: 32,
                        }}
                    >
                        <div style={{ textAlign: "center" }}>
                            <div
                                style={{
                                    width: 110,
                                    height: 110,
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                    margin: "0 auto 18px",
                                    border: `4px solid ${accentSoft}`,
                                    boxShadow: "0 2px 12px rgba(79,140,255,0.10)",
                                }}
                            >
                                <img
                                    src={user?.profilePic}
                                    alt="Profile"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </div>
                            <h2 style={{ margin: "8px 0 2px", fontWeight: 700, fontSize: "1.35rem", color: accent }}>{user?.username}</h2>
                            <p style={{ color: "#7a8ca3", fontSize: "1.01rem", marginBottom: 2 }}>{user?.email}</p>
                            <span style={{ fontSize: "0.98rem", color: "#b0b8c9" }}>Member since {new Date(user?.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16, marginTop: 18 }}>
                            {[
                                {
                                    key: "profile",
                                    label: "Profile",
                                },
                                {
                                    key: "cart",
                                    label: "Cart",
                                },
                                {
                                    key: "orders",
                                    label: "Orders",
                                },
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    style={{
                                        padding: "13px 0",
                                        borderRadius: 999,
                                        border: "none",
                                        background: activeTab === tab.key ? accent : accentSoft,
                                        color: activeTab === tab.key ? "#fff" : accent,
                                        fontWeight: 600,
                                        fontSize: "1.08rem",
                                        boxShadow: activeTab === tab.key ? "0 2px 12px rgba(79,140,255,0.10)" : "none",
                                        cursor: "pointer",
                                        transition: "background 0.2s, color 0.2s",
                                        outline: activeTab === tab.key ? `2px solid ${accent}` : "none",
                                    }}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Main Content */}
                    <div
                        className="profile-content"
                        style={{
                            flex: 1,
                            padding: "48px 48px 32px 48px",
                            display: "flex",
                            flexDirection: "column",
                            minWidth: 0,
                            background: "rgba(255,255,255,0.92)",
                        }}
                    >
                        {activeTab === "profile" && (
                            <div style={{ maxWidth: 520, margin: "0 auto" }}>
                                <h2 style={{ fontWeight: 700, fontSize: "1.6rem", color: accent, marginBottom: 32 }}>Profile Details</h2>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                                    <div>
                                        <label style={{ color: "#b0b8c9", fontSize: "0.98rem" }}>Username</label>
                                        <p style={{ fontWeight: 600, fontSize: "1.13rem", color: "#222", margin: 0 }}>{user?.username}</p>
                                    </div>
                                    <div>
                                        <label style={{ color: "#b0b8c9", fontSize: "0.98rem" }}>Email</label>
                                        <p style={{ fontWeight: 600, fontSize: "1.13rem", color: "#222", margin: 0 }}>{user?.email}</p>
                                    </div>
                                    <div>
                                        <label style={{ color: "#b0b8c9", fontSize: "0.98rem" }}>Account Type</label>
                                        <p style={{ fontWeight: 600, fontSize: "1.13rem", color: accent, margin: 0 }}>{user?.admin ? "Administrator" : "Customer"}</p>
                                    </div>
                                    <div>
                                        <label style={{ color: "#b0b8c9", fontSize: "0.98rem" }}>Joined</label>
                                        <p style={{ fontWeight: 600, fontSize: "1.13rem", color: "#222", margin: 0 }}>{new Date(user?.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === "cart" && (
                            <div style={{ maxWidth: 700, margin: "0 auto" }}>
                                <h2 style={{ fontWeight: 700, fontSize: "1.6rem", color: accent, marginBottom: 32 }}>Shopping Cart</h2>
                                {cartItems.length === 0 ? (
                                    <div style={{ textAlign: "center", color: "#b0b8c9", fontSize: "1.13rem", marginTop: 80 }}>
                                        <p>Your cart is empty</p>
                                    </div>
                                ) : (
                                    <>
                                        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                                            {cartItems.map((item) => (
                                                <div
                                                    key={item._id}
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        background: accentSoft,
                                                        borderRadius: 18,
                                                        padding: "18px 24px",
                                                        boxShadow: "0 1px 8px rgba(79,140,255,0.07)",
                                                        gap: 24,
                                                        border,
                                                        flexWrap: "wrap",
                                                    }}
                                                >
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        style={{
                                                            width: 80,
                                                            height: 80,
                                                            borderRadius: 12,
                                                            objectFit: "cover",
                                                            border: `2px solid ${accent}`,
                                                            background: "#fff",
                                                            flexShrink: 0,
                                                        }}
                                                    />
                                                    <div style={{ flex: 1, minWidth: 120 }}>
                                                        <h3 style={{ margin: 0, fontWeight: 600, fontSize: "1.13rem", color: accent }}>{item.name}</h3>
                                                        <p style={{ color: "#7a8ca3", fontWeight: 500, margin: "6px 0 0" }}>
                                                            ₹{item.discount && item.discount > 0 ? (item.price - (item.price * item.discount) / 100).toFixed(2) : item.price}
                                                        </p>
                                                    </div>
                                                    <div style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 8,
                                                        background: "#fff",
                                                        borderRadius: 8,
                                                        border: `1.5px solid ${accentSoft}`,
                                                        padding: "4px 12px"
                                                    }}>
                                                        <button
                                                            style={{
                                                                border: "none",
                                                                background: accentSoft,
                                                                color: accent,
                                                                borderRadius: 6,
                                                                width: 28,
                                                                height: 28,
                                                                fontSize: "1.1rem",
                                                                cursor: "pointer",
                                                                fontWeight: 700,
                                                            }}
                                                        >
                                                            -
                                                        </button>
                                                        <span style={{ minWidth: 22, textAlign: "center", fontWeight: 600 }}>{item.quantity || 1}</span>
                                                        <button
                                                            style={{
                                                                border: "none",
                                                                background: accentSoft,
                                                                color: accent,
                                                                borderRadius: 6,
                                                                width: 28,
                                                                height: 28,
                                                                fontSize: "1.1rem",
                                                                cursor: "pointer",
                                                                fontWeight: 700,
                                                            }}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={async () => {
                                                            try {
                                                                productService.removeProduct(item._id);
                                                                setCartItems((prevItems) => prevItems.filter((i) => i._id !== item._id));
                                                                showPopup("Product removed from cart!");
                                                            } catch (error) {}
                                                        }}
                                                        style={{
                                                            marginLeft: 18,
                                                            background: "#fff",
                                                            color: accent,
                                                            border: `1.5px solid ${accentSoft}`,
                                                            borderRadius: 8,
                                                            padding: "8px 18px",
                                                            fontWeight: 600,
                                                            fontSize: "1rem",
                                                            cursor: "pointer",
                                                            boxShadow: "0 1px 4px rgba(79,140,255,0.06)",
                                                            transition: "background 0.2s, color 0.2s",
                                                        }}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        {/* Total Calculation */}
                                        {(() => {
                                            let total = cartItems.reduce((sum, item) => {
                                                const price = item.discount && item.discount > 0 ? (item.price - (item.price * item.discount) / 100) : item.price;
                                                return sum + price * (item.quantity || 1);
                                            }, 0);
                                            let shipmentFee = total > 1000 ? 0 : 50;
                                            let grandTotal = total + shipmentFee;
                                            return (
                                                <div
                                                    style={{
                                                        marginTop: 36,
                                                        textAlign: "right",
                                                        background: "#f5faff",
                                                        borderRadius: 18,
                                                        padding: "28px 36px 18px 36px",
                                                        boxShadow: "0 2px 12px rgba(79,140,255,0.07)",
                                                        border: `1.5px solid ${accentSoft}`,
                                                        maxWidth: 420,
                                                        marginLeft: "auto",
                                                    }}
                                                >
                                                    <div style={{ fontSize: "1.13rem", fontWeight: 600, marginBottom: 8 }}>
                                                        Subtotal: <span style={{ color: "#222" }}>₹{total.toFixed(2)}</span>
                                                    </div>
                                                    <div style={{ fontSize: "1.01rem", color: shipmentFee === 0 ? "#388e3c" : "#d32f2f", marginBottom: 8 }}>
                                                        Shipment Fee: {shipmentFee === 0 ? <b>Free</b> : `₹${shipmentFee}`}
                                                    </div>
                                                    <div style={{ fontSize: "1.35rem", fontWeight: 700, marginTop: 8, color: accent }}>
                                                        Total: ₹{grandTotal.toFixed(2)}
                                                    </div>
                                                    <button
                                                        style={{
                                                            marginTop: 18,
                                                            background: accent,
                                                            color: "#fff",
                                                            border: "none",
                                                            borderRadius: 10,
                                                            padding: "14px 38px",
                                                            fontWeight: 700,
                                                            fontSize: "1.13rem",
                                                            cursor: "pointer",
                                                            boxShadow: "0 2px 8px rgba(79,140,255,0.08)",
                                                            transition: "background 0.2s",
                                                        }}
                                                        onClick={() => alert("Order placed! (Implement order logic here)")}
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
                        {activeTab === "orders" && (
                            <div style={{ maxWidth: 700, margin: "0 auto" }}>
                                <h2 style={{ fontWeight: 700, fontSize: "1.6rem", color: accent, marginBottom: 32 }}>Order History</h2>
                                <div style={{ textAlign: "center", color: "#b0b8c9", fontSize: "1.13rem", marginTop: 80 }}>
                                    <p>No orders yet.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <style>{`
                @media (max-width: 1100px) {
                    .profile-main-flex {
                        max-width: 98vw !important;
                        min-width: 0 !important;
                    }
                }
                @media (max-width: 900px) {
                    .profile-main-flex {
                        flex-direction: column !important;
                        min-height: unset !important;
                        border-radius: 0 !important;
                        box-shadow: none !important;
                    }
                    .profile-sidebar {
                        width: 100% !important;
                        border-radius: 0 0 32px 32px !important;
                        border-right: none !important;
                        border-bottom: ${border} !important;
                        padding: 32px 12px 24px 12px !important;
                        flex-direction: row !important;
                        gap: 18px !important;
                        justify-content: flex-start !important;
                        align-items: flex-start !important;
                    }
                    .profile-sidebar > div:first-child {
                        flex: 1 1 0;
                        text-align: left !important;
                        margin-bottom: 0 !important;
                    }
                    .profile-sidebar > div:last-child {
                        flex: 2 1 0;
                        margin-top: 0 !important;
                        flex-direction: row !important;
                        gap: 10px !important;
                    }
                    .profile-content {
                        padding: 32px 8vw 24px 8vw !important;
                    }
                }
                @media (max-width: 600px) {
                    .profile-main-flex {
                        max-width: 100vw !important;
                        border-radius: 0 !important;
                    }
                    .profile-sidebar {
                        padding: 18px 4vw 14px 4vw !important;
                        border-radius: 0 !important;
                        flex-direction: column !important;
                        align-items: center !important;
                        gap: 12px !important;
                    }
                    .profile-sidebar > div:last-child {
                        flex-direction: column !important;
                        gap: 8px !important;
                        width: 100% !important;
                    }
                    .profile-content {
                        padding: 18px 2vw 12px 2vw !important;
                    }
                    .profile-content h2 {
                        font-size: 1.15rem !important;
                        margin-bottom: 18px !important;
                    }
                }
                @media (max-width: 500px) {
                    .profile-content {
                        padding: 10px 2vw 8px 2vw !important;
                    }
                    .profile-content > div {
                        max-width: 100vw !important;
                    }
                }
                @media (max-width: 400px) {
                    .profile-sidebar {
                        padding: 8px 2vw 8px 2vw !important;
                    }
                }
                @media (max-width: 700px) {
                    .profile-content > div {
                        max-width: 98vw !important;
                    }
                    .profile-content [style*="grid-template-columns"] {
                        grid-template-columns: 1fr !important;
                        gap: 18px !important;
                    }
                }
                @media (max-width: 500px) {
                    .profile-content [style*="padding: 28px 36px 18px 36px"] {
                        padding: 14px 8px 10px 8px !important;
                    }
                }
                @keyframes popIn {
                    0% { transform: scale(0.7) translateY(-30px); opacity: 0; }
                    60% { transform: scale(1.1) translateY(10px); opacity: 1; }
                    100% { transform: scale(1) translateY(0); opacity: 1; }
                }
            `}</style>
        </>
    );
};

export default Profile;
