import React, { useState, useEffect } from "react";
import "./CSS/HomePage.css";
import Navbar from "./Navbar";
import Products from "./Products";
import { productService } from "../services/productService";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popup, setPopup] = useState({ show: false, message: "" });

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
            background: "#4f8cff",
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
      <div className="homepage-container">
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Discover Amazing Products</h1>
            <p className="hero-subtitle">
              Shop the latest trends at unbeatable prices. Find everything you
              need, all in one place.
            </p>
          </div>
        </section>

        <section className="products-section">
          <h2 className="section-title">Featured Products</h2>
          <Products products={products} loading={loading} error={error} showPopup={showPopup} />
        </section>
      </div>
    </>
  );
};

export default Home;
