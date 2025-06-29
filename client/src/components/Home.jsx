import React, { useState, useEffect, useRef } from "react";
import "./CSS/HomePage.css";
import Navbar from "./Navbar";
import Products from "./Products";
import { productService } from "../services/productService";
import gsap from "gsap";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popup, setPopup] = useState({ show: false, message: "" });
  const heroRef = useRef(null);
  const productsSectionRef = useRef(null);

  const showPopup = (message) => {
    setPopup({ show: true, message });
    setTimeout(() => setPopup({ show: false, message: "" }), 1800);
  };

  useEffect(() => {
    // Check token expiration
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const now = Math.floor(Date.now() / 1000);
        if (payload.exp && payload.exp < now) {
          showPopup("Session expired. Please login again.");
          localStorage.removeItem("token");
        }
      } catch (e) {
        // Invalid token format
        showPopup("Session expired. Please login again.");
        localStorage.removeItem("token");
      }
    }

    const fetchProducts = async () => {
      try {
        const fetchedProducts = await productService.getAllProducts();
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (err) {
        setError("Error fetching products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // GSAP cute animations
  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          stagger: 0.15,
          ease: "back.out(1.7)",
        }
      );
    }
    if (productsSectionRef.current) {
      gsap.fromTo(
        productsSectionRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.5,
          ease: "power2.out",
        }
      );
    }
  }, [loading]);

  return (
    <>
      <Navbar />
      {/* Popup notification */}
      {popup.show && (
        <div
          style={{
            position: "fixed",
            top: 32,
            right: 40,
            zIndex: 9999,
            background: "#1e293b",
            color: "#fff",
            padding: "18px 36px",
            borderRadius: "16px",
            fontWeight: 600,
            fontSize: "1.1rem",
            boxShadow: "0 8px 32px rgba(30,41,59,0.18)",
            opacity: popup.show ? 1 : 0,
            transform: popup.show ? 'translateY(0)' : 'translateY(-30px)',
            transition: "opacity 0.4s cubic-bezier(.68,-0.55,.27,1.55), transform 0.4s cubic-bezier(.68,-0.55,.27,1.55)",
          }}
        >
          <span role="img" aria-label="success" style={{marginRight: 10}}>✅</span>
          {popup.message}
        </div>
      )}
      <div className="homepage-container new-theme">
        <section className="hero-section new-hero" ref={heroRef}>
          <div className="hero-content">
            <h1 className="hero-title new-title">
              <span className="gradient-text">Shop Smarter</span> <br />

            </h1>
            <p className="hero-subtitle new-subtitle">
              Discover unique finds, trending styles, and exclusive deals. <br />
              Your one-stop shop for everything cool and new.
            </p>
            <div className="hero-btn-row">
              <button className="hero-btn">Start Shopping</button>
              <button className="hero-btn secondary">See Deals</button>
            </div>
          </div>
        </section>
        <section className="products-section new-products" ref={productsSectionRef}>
          <h2 className="section-title new-section-title">Featured Products</h2>
          <Products products={products} loading={loading} error={error} showPopup={showPopup} />
        </section>
      </div>
    </>
  );
};

export default Home;
