import React, { useState, useEffect } from "react";
import "./CSS/HomePage.css";
import Navbar from "./Navbar";
import Products from "./Products";
import { productService } from "../services/productService";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
          <Products products={products} loading={loading} error={error} />
        </section>
      </div>
    </>
  );
};

export default Home;
