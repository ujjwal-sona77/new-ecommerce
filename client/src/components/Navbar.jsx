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
      <main>
        <nav className="navbar">
          <div className="nav-brand">
            <button onClick={() => handleNavigation("/")} className="nav-logo">
              <span className="logo-text">ShopEase</span>
            </button>
          </div>

          <button
            className={`nav-toggle ${isOpen ? "active" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`nav-menu ${isOpen ? "active" : ""}`}>
            <button onClick={() => handleNavigation("/")} className="nav-link">
              Home
            </button>
            <button
              onClick={() => handleNavigation("/shop")}
              className="nav-link"
            >
              Shop
            </button>
            <button
              onClick={() => handleNavigation("/user/profile#cart")}
              className="nav-link cart-link"
              style={{ position: "relative" }}
            >
              Cart
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -16,
                    background: "#ff4f4f",
                    color: "#fff",
                    borderRadius: "50%",
                    padding: "2px 8px",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
            {user ? (
              <>
                {user.admin && (
                  <>
                    <button
                      onClick={() => handleNavigation("/admin/dashboard")}
                      className="nav-link admin-link"
                    >
                      Admin Dashboard
                    </button>
                    <button
                      onClick={() => handleNavigation("/create/product")}
                      className="nav-link admin-link"
                    >
                      Create Product
                    </button>
                  </>
                )}
                <div className="nav-actions">
                  <button
                    onClick={() => handleNavigation("/user/profile")}
                    className="nav-link profile-link"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="nav-link logout-link"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </nav>
      </main>
    </>
  );
};

export default Navbar;
