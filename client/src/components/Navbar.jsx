import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/Navbar.css';
import { authService } from '../services/authService';

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
                console.error('Error fetching user:', error);
            }
        };
        fetchUser();
    }, []);

    const handleLogout = () => {
        authService.logout();
        setUser(null);
        navigate('/login');
        setIsOpen(false);
    };

    const handleNavigation = (path) => {
        navigate(path);
        setIsOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <button onClick={() => handleNavigation('/')} className="nav-logo">
                    <span className="logo-text">ShopEase</span>
                </button>
            </div>

            <button 
                className={`nav-toggle ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="toggle navigation"
            >
                <div className="hamburger"></div>
            </button>

            <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
                <button onClick={() => handleNavigation('/')} className="nav-link">
                    Home
                </button>
                <button onClick={() => handleNavigation('/shop')} className="nav-link">
                    Shop
                </button>
                
                {user ? (
                    <>
                        {user.admin && (
                            <button 
                                onClick={() => handleNavigation('/create/product')}
                                className="nav-link text-black-600 admin-link"
                            >
                                Create Product
                            </button>
                        )}
                        <div className="user-dropdown">
                            <span className="user-info">
                                Welcome, {user.username}
                            </span>
                            <div className="dropdown-content">
                                <button onClick={() => handleNavigation('/user/profile')} className="dropdown-link">
                                    Profile
                                </button>
                                <button onClick={handleLogout} className="logout-btn">
                                    Logout
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="auth-buttons">
                        <button onClick={() => handleNavigation('/login')} className="nav-link login-link">
                            Login
                        </button>
                        <button onClick={() => handleNavigation('/signup')} className="nav-link signup-link">
                            Sign Up
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
