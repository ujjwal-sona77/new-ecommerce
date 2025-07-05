import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Navbar.css";
import { authService } from "../services/authService";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await authService.getCurrentUser();
                setUser(userData);
                setCartCount(userData.cart ? userData.cart.length : 0);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, []);

    const handleLogout = () => {
        authService.logout();
        setUser(null);
        navigate("/login");
        setIsOpen(false);
    };

    const handleNavigation = (path) => {
        navigate(path);
        setIsOpen(false);
    };

    return (
        <>
            <nav className="navbar-new">
                <div className="navbar-container">
                    <button
                        onClick={() => handleNavigation("/")}
                        className="navbar-logo"
                        aria-label="ShopEase Home"
                    >
                        <span className="navbar-logo-icon">🛒</span>
                        <span className="navbar-logo-text">ShopEase</span>
                    </button>
                    <button
                        className={`navbar-toggle ${isOpen ? "active" : ""}`}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggle-bar"></span>
                        <span className="navbar-toggle-bar"></span>
                        <span className="navbar-toggle-bar"></span>
                    </button>
                    <div className={`navbar-links ${isOpen ? "active" : ""}`}>
                        <button onClick={() => handleNavigation("/")} className="navbar-link">
                            Home
                        </button>
                        <button onClick={() => handleNavigation("/shop")} className="navbar-link">
                            Shop
                        </button>
                        <button
                            onClick={() => handleNavigation("/user/profile#cart")}
                            className="navbar-link navbar-cart-link"
                            aria-label="Cart"
                        >
                            <span className="navbar-cart-icon">🛍️</span>
                            {cartCount > 0 && (
                                <span className="navbar-cart-badge">{cartCount}</span>
                            )}
                        </button>
                        {user && (
                            <>
                                {user.admin && (
                                    <>
                                        <button
                                            onClick={() => handleNavigation("/admin/dashboard")}
                                            className="navbar-link navbar-admin-link"
                                        >
                                            Admin
                                        </button>
                                        <button
                                            onClick={() => handleNavigation("/create/product")}
                                            className="navbar-link navbar-admin-link"
                                        >
                                            + Product
                                        </button>
                                    </>
                                )}
                                <button
                                    onClick={() => handleNavigation("/user/profile")}
                                    className="navbar-link navbar-profile-link"
                                >
                                    <span className="navbar-profile-icon">👤</span>
                                    Profile
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="navbar-link navbar-logout-link"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>  
        </>
    );
};

export default Navbar;
