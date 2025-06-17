import { useState, useEffect } from 'react'
import axios from 'axios'
import './CSS/HomePage.css'
import Navbar from './Navbar'

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/product/`);
                setProducts(response.data.products);
                setLoading(false);
            } catch (err) {
                setError('Error fetching products');
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
                    <p className="hero-subtitle">Shop the latest products at unbeatable prices!</p>
                </section>

                <section className="products-section">
                    {loading ? (
                        <div className="products-grid">
                            {[1, 2, 3, 4].map(n => (
                                <div key={n} className="product-card skeleton">
                                    <div className="skeleton-img"></div>
                                    <div className="skeleton-text"></div>
                                    <div className="skeleton-text short"></div>
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="error-container">{error}</div>
                    ) : (
                        <div className="products-grid">
                            {products.map(product => (
                                <div key={product._id} className="product-card">
                                    <div className="product-image-container">
                                        <img 
                                            src={product.image} // Base64 image is stored directly
                                            alt={product.name}
                                            loading="lazy"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/300';
                                            }}
                                        />
                                        <div className="hover-overlay">
                                            <button className="quick-view-btn">Quick View</button>
                                        </div>
                                    </div>
                                    <h3 className="product-name">{product.name}</h3>
                                    <p className="product-price">${product.price}</p>
                                    <button className="add-to-cart-btn">Add to Cart</button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </>
    )
}

export default Home
