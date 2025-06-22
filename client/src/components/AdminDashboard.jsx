import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const AdminDashboard = () => {
    const API_URL = import.meta.env.VITE_BACKEND_URI;
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);

    const getAllUsers = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/admin/users`);
            setUsers(response.data.users);
        } catch (error) {
            throw error.response?.data || error.message;
        }
    };
    const getAllProducts = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/product`);
            setProducts(response.data.products);
        } catch (error) {
            throw error.response?.data || error.message;
        }
    };

    useEffect(() => {
        getAllUsers();
        getAllProducts();
    }, []);

    return (
        <div
            style={{
                padding: "2rem",
                fontFamily: "Arial, sans-serif",
                background: "#f4f6f8",
                minHeight: "100vh",
            }}
        >
            <Navbar />
            <div style={{ height: "2rem" }} />
            <div
                style={{
                    display: "flex",
                    gap: "2.5rem",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                {/* Users Section */}
                <section
                    style={{
                        background: "#fff",
                        borderRadius: "12px",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                        padding: "2rem",
                        minWidth: "340px",
                        flex: "1 1 370px",
                        marginBottom: "2rem",
                    }}
                >
                    <h2
                        style={{
                            borderBottom: "2px solid #e3e6ea",
                            paddingBottom: "0.75rem",
                            marginBottom: "1.5rem",
                            color: "#1976d2",
                            fontSize: "1.5rem",
                            letterSpacing: "0.5px",
                        }}
                    >
                        Users
                    </h2>
                    {users && users.length > 0 ? (
                        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 0.5rem" }}>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: "left", padding: "0.75rem 0.5rem", color: "#555" }}>Username</th>
                                    <th style={{ textAlign: "left", padding: "0.75rem 0.5rem", color: "#555" }}>Email</th>
                                    <th style={{ textAlign: "left", padding: "0.75rem 0.5rem", color: "#555" }}>Cart Items</th>
                                    <th style={{ textAlign: "left", padding: "0.75rem 0.5rem", color: "#555" }}>Orders</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u) => (
                                    <tr key={u._id} style={{ background: "#f8fafc", borderRadius: "8px" }}>
                                        <td style={{ padding: "0.75rem 0.5rem", borderBottom: "1px solid #f4f6f8" }}>{u.username || "-"}</td>
                                        <td style={{ padding: "0.75rem 0.5rem", borderBottom: "1px solid #f4f6f8" }}>{u.email}</td>
                                        <td style={{ padding: "0.75rem 0.5rem", borderBottom: "1px solid #f4f6f8" }}>
                                            {u.cart && Array.isArray(u.cart) ? u.cart.length : 0}
                                        </td>
                                        <td style={{ padding: "0.75rem 0.5rem", borderBottom: "1px solid #f4f6f8" }}>
                                            {u.orders && Array.isArray(u.orders) ? u.orders.length : 0}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p style={{ color: "#888", marginTop: "1rem" }}>No users found.</p>
                    )}
                </section>

                {/* Products Section */}
                <section
                    style={{
                        background: "#fff",
                        borderRadius: "12px",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                        padding: "2rem",
                        minWidth: "340px",
                        flex: "1 1 370px",
                        marginBottom: "2rem",
                    }}
                >
                    <h2
                        style={{
                            borderBottom: "2px solid #e3e6ea",
                            paddingBottom: "0.75rem",
                            marginBottom: "1.5rem",
                            color: "#388e3c",
                            fontSize: "1.5rem",
                            letterSpacing: "0.5px",
                        }}
                    >
                        Products
                    </h2>
                    {products && products.length > 0 ? (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "1.5rem",
                            }}
                        >
                            {products.map((p) => (
                                <div
                                    key={p._id}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        background: "#f8fafc",
                                        borderRadius: "10px",
                                        boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
                                        padding: "1rem",
                                        gap: "1.5rem",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "70px",
                                            height: "70px",
                                            borderRadius: "8px",
                                            overflow: "hidden",
                                            background: "#e0e0e0",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexShrink: 0,
                                        }}
                                    >
                                        {p.image ? (
                                            <img
                                                src={p.image}
                                                alt={p.name}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        ) : (
                                            <span style={{ color: "#aaa", fontSize: "2rem" }}>🖼️</span>
                                        )}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: "0.25rem" }}>{p.name}</div>
                                        <div style={{ color: "#388e3c", fontWeight: 500, marginBottom: "0.15rem" }}>
                                            ${p.price}
                                        </div>
                                        <div style={{ color: "#888", fontSize: "0.95rem" }}>
                                            Discount: <span style={{ color: "#1976d2" }}>{p.discount ? `${p.discount}%` : "0%"}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: "#888", marginTop: "1rem" }}>No products found.</p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default AdminDashboard;
