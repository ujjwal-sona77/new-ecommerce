import { useState, useEffect } from "react";
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
          <h1 className="hero-title">Welcome to Our E-Commerce Store</h1>
          <p className="hero-subtitle">
            Shop the latest products at unbeatable prices!
          </p>
        </section>

        <section className="products-section">
          <Products products={products} loading={loading} error={error} />
        </section>
      </div>
    </>
  );
};

export default Home;
