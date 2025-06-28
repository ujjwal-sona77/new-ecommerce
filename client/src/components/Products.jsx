import React from "react";
import "./CSS/Products.css";
import axios from "axios";

const Products = ({ products, loading, error, showPopup }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateDiscount = (originalPrice, discountPercentage) => {
    const discountAmount = (originalPrice * discountPercentage) / 100;
    return originalPrice - discountAmount;
  };

  if (loading) {
    return (
      <div className="products-grid">
        {[1, 2, 3, 4].map((n) => (
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
      {products.map((product) => (
        <div key={product._id} className="product-card">
          <div className="product-image-container">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300";
              }}
            />
            {product.discount > 0 && (
              <div className="discount-badge">-{product.discount}% OFF</div>
            )}
          </div>
          <div className="product-details">
            <h3 className="product-name">{product.name}</h3>
            <div className="price-container">
              {product.discount > 0 ? (
                <>
                  <span className="discounted-price">
                    {formatPrice(
                      calculateDiscount(product.price, product.discount)
                    )}
                  </span>
                  <span className="original-price">
                    {formatPrice(product.price)}
                  </span>
                  <span className="discount-tag">
                    {product.discount}% off
                  </span>
                </>
              ) : (
                <span className="current-price">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            <button
              onClick={async () => {
                const token = localStorage.getItem("token");
                if (!token) {
                  if (showPopup)
                    showPopup("Please login to add items to your cart.");
                  return;
                }
                const payload = JSON.parse(atob(token.split(".")[1]));
                const email = payload.email;
                try {
                  const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URI}/api/product/addtocart/${product._id}/${email}`
                  );
                  if (response.status === 200) {
                    if (showPopup) showPopup("Product added to cart!");
                  } else {
                    if (showPopup) showPopup("Failed to add product to cart.");
                  }
                } catch (err) {
                  if (showPopup) showPopup("Error adding product to cart.");
                }
              }}
              className="add-to-cart-btn"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
