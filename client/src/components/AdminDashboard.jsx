import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import AdminEditUserModal from "./AdminEditUserModal";
import OrderSection from "./OrderSection";
import "./CSS/AdminDashboard.css";

const AdminDashboard = () => {
    const API_URL = import.meta.env.VITE_BACKEND_URI;
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeTab, setActiveTab] = useState("users");
    const [editUser, setEditUser] = useState(null);

    const getAllUsers = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/admin/users`);
            setUsers(response.data.users);
        } catch (error) {
            setUsers([]);
        }
    };
    const getAllProducts = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/product`);
            setProducts(response.data.products);
        } catch (error) {
            setProducts([]);
        }
    };

    useEffect(() => {
        getAllUsers();
        getAllProducts();
    }, []);

    const handleUserEdit = (user) => setEditUser(user);
    const handleUserEditSave = () => getAllUsers();
    const handleUserEditClose = () => setEditUser(null);

    return (
        <div className="admin-dashboard-root">
            <Navbar />
            <div className="admin-dashboard-container">
                <aside className="admin-dashboard-sidebar">
                    <div className="admin-dashboard-logo">Admin Panel</div>
                    <nav>
                        <button className={`sidebar-btn${activeTab === "users" ? " active" : ""}`} onClick={() => setActiveTab("users")}>
                            <span role="img" aria-label="users">👤</span> Users
                        </button>
                        <button className={`sidebar-btn${activeTab === "products" ? " active" : ""}`} onClick={() => setActiveTab("products")}>
                            <span role="img" aria-label="products">🛒</span> Products
                        </button>
                        <button className={`sidebar-btn${activeTab === "orders" ? " active" : ""}`} onClick={() => setActiveTab("orders")}>
                            <span role="img" aria-label="orders">📦</span> Orders
                        </button>
                    </nav>
                </aside>
                <main className="admin-dashboard-main">
                    {activeTab === "users" && (
                        <section className="admin-section">
                            <h2 className="admin-section-title users">Users</h2>
                            {users && users.length > 0 ? (
                                <div className="responsive-table-wrapper">
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>Username</th>
                                                <th>Email</th>
                                                <th>Cart Items</th>
                                                <th>Orders</th>
                                                <th>Admin</th>
                                                <th>Edit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((u) => (
                                                <tr key={u._id}>
                                                    <td>{u.username || "-"}</td>
                                                    <td>{u.email}</td>
                                                    <td>{u.cart && Array.isArray(u.cart) ? u.cart.length : 0}</td>
                                                    <td>{u.orders && Array.isArray(u.orders) ? u.orders.length : 0}</td>
                                                    <td>
                                                        <span className={u.admin ? "badge badge-admin" : "badge badge-user"}>
                                                            {u.admin ? "Yes" : "No"}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button onClick={() => handleUserEdit(u)} className="edit-btn">Edit</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="empty-msg">No users found.</p>
                            )}
                            {editUser && <AdminEditUserModal user={editUser} onClose={handleUserEditClose} onSave={handleUserEditSave} />}
                        </section>
                    )}
                    {activeTab === "products" && (
                        <section className="admin-section">
                            <h2 className="admin-section-title products">Products</h2>
                            {products && products.length > 0 ? (
                                <div className="products-grid">
                                    {products.map((p) => (
                                        <div key={p._id} className="product-card">
                                            <div className="product-img">
                                                {p.image ? (
                                                    <img src={p.image} alt={p.name} />
                                                ) : (
                                                    <span role="img" aria-label="no-img" className="no-img">🖼️</span>
                                                )}
                                            </div>
                                            <div className="product-info">
                                                <div className="product-name">{p.name}</div>
                                                <div className="product-price">${p.price}</div>
                                                <div className="product-discount">
                                                    Discount: <span>{p.discount ? `${p.discount}%` : "0%"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="empty-msg">No products found.</p>
                            )}
                        </section>
                    )}
                    {activeTab === "orders" && (
                        <section className="admin-section">
                            <h2 className="admin-section-title orders">Orders</h2>
                            <OrderSection />
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
