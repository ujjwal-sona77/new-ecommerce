import React, { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import Navbar from './Navbar';
import './CSS/Profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await authService.getCurrentUser();
                setUser(userData);
                // Fetch cart items here when implemented
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
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
            <div className="profile-container">
                <div className="profile-sidebar">
                    <div className="user-brief">
                        <div className="user-avatar">
                            {user?.username?.charAt(0).toUpperCase()}
                        </div>
                        <h3>{user?.username}</h3>
                        <p>{user?.email}</p>
                    </div>
                    <div className="profile-tabs">
                        <button 
                            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            Profile Details
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === 'cart' ? 'active' : ''}`}
                            onClick={() => setActiveTab('cart')}
                        >
                            Cart Items
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
                            onClick={() => setActiveTab('orders')}
                        >
                            Order History
                        </button>
                    </div>
                </div>

                <div className="profile-content">
                    {activeTab === 'profile' && (
                        <div className="profile-details">
                            <h2>Profile Information</h2>
                            <div className="info-grid">
                                <div className="info-item">
                                    <label>Username</label>
                                    <p>{user?.username}</p>
                                </div>
                                <div className="info-item">
                                    <label>Email</label>
                                    <p>{user?.email}</p>
                                </div>
                                <div className="info-item">
                                    <label>Member Since</label>
                                    <p>{new Date(user?.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="info-item">
                                    <label>Account Type</label>
                                    <p>{user?.admin ? 'Administrator' : 'Customer'}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'cart' && (
                        <div className="cart-section">
                            <h2>Shopping Cart</h2>
                            {cartItems.length === 0 ? (
                                <div className="empty-cart">
                                    <p>Your cart is empty</p>
                                </div>
                            ) : (
                                <div className="cart-items">
                                    {cartItems.map(item => (
                                        <div key={item._id} className="cart-item">
                                            <img src={item.image} alt={item.name} />
                                            <div className="item-details">
                                                <h3>{item.name}</h3>
                                                <p>${item.price}</p>
                                            </div>
                                            <div className="item-quantity">
                                                <button>-</button>
                                                <span>{item.quantity}</span>
                                                <button>+</button>
                                            </div>
                                            <button className="remove-btn">Remove</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Profile;
