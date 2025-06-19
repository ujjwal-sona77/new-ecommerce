import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Navbar.css";
import { authService } from "../services/authService";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
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

            {user ? (
              <>
                {user.admin && (
                  <button
                    onClick={() => handleNavigation("/create/product")}
                    className="nav-link admin-link"
                  >
                    Create Product
                  </button>
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
