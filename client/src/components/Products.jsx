import React from 'react';
import './CSS/Products.css';

const Products = ({ products, loading, error }) => {
    if (loading) {
        return (
            <div className="products-grid">
                {[1, 2, 3, 4].map(n => (
                    <div key={n} className="product-card skeleton">
                        <div className="skeleton-img"></div>
                        <div className="skeleton-text"></div>
                        <div className="skeleton-text short"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return <div className="error-container">{error}</div>;
    }

    return (
        <div className="products-grid">
            {products.map(product => (
                <div key={product._id} className="product-card">
                    <div className="product-image-container">
                        <img 
                            src={product.image}
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
                    <div className="product-details">
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-price">${product.price}</p>
                        <button className="add-to-cart-btn">Add to Cart</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Products;
