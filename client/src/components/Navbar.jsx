import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CSS/Navbar.css';
import axios from 'axios';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Decode JWT token to get user email
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(window.atob(base64));
            setEmail(payload.email);
        }
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            if (email) {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/user/getUser/${email}`, );
                    if (response.status === 200) {
                        setUser(response.data.user);
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };
        fetchUser();
    }, [email]);


    const handleLogout = () => {
        localStorage.removeItem('token');
        setEmail(null);
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/" className="nav-logo text-black">EComm</Link>
            </div>

            <button 
                className={`nav-toggle ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
                <Link to="/" className="nav-link text-black">Home</Link>
                <Link to="/shop" className="nav-link text-black">Shop</Link>
                
                {user ? (
                    <>
                        {user.admin && (
                            <Link to="/create/product" className="nav-link text-black admin-link">
                                Create Product
                            </Link>
                        )}
                        <div className="nav-link text-black user-info">
                            Welcome, {user.username}
                        </div>
                        <button onClick={handleLogout} className="nav-link text-black logout-btn">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link text-black">Login</Link>
                        <Link to="/signup" className="nav-link text-black">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
