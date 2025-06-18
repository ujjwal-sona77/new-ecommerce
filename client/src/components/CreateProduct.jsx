import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { productService } from '../services/productService';
import "./CSS/CreateProduct.css";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!image) return;
      
      const base64Image = await convertToBase64(image);
      const productData = {
        name,
        price,
        discount,
        image: base64Image,
        description: "No description provided"
      };

      const response = await productService.createProduct(productData);
      if (response.success) {
        navigate("/home");
        setSuccess(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

return (
    <>
        {success && <div className="success-message">{success}</div>}
        <div className="create-product-container">
            <div className="content-wrapper">
                {/* Sidebar */}
                <div className="sidebar">
                    <div className="nav-links">
                        <Link className="nav-link" to="/owner/allproducts">
                            All Products
                        </Link>
                        <Link className="nav-link" to="/owner/createproduct">
                            Create new product
                        </Link>
                        <Link className="nav-link" to="/shop">
                            Shop
                        </Link>
                    </div>
                </div>

                {/* Main Content */}
                <main className="main-content">
                    <h2 className="page-title">Create New Product</h2>

                    <form
                        autoComplete="off"
                        method="POST"
                        encType="multipart/form-data"
                        onSubmit={handleSubmit}
                    >
                        <div className="form-section">
                            <h3 className="section-title">Product Details</h3>
                            <div className="image-input-container">
                                <label className="input-label">Product Image</label>
                                <input
                                    name="image"
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file && file.size > 49 * 1024) {
                                            alert('File size must be less than 49KB');
                                            e.target.value = '';
                                            return;
                                        }
                                        setImage(file);
                                    }}
                                    accept="image/*"
                                    className="file-input"
                                    required
                                />
                            </div>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="input-label">Product Name</label>
                                    <input
                                        name="name"
                                        onChange={(e) => setName(e.target.value)}
                                        type="text"
                                        placeholder="Enter product name"
                                        className="text-input"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="input-label">Product Price</label>
                                    <input
                                        name="price"
                                        onChange={(e) => setPrice(e.target.value)}
                                        type="number"
                                        step="0.01"
                                        placeholder="Enter price"
                                        className="text-input"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="input-label">Discount Price</label>
                                    <input
                                        name="discount"
                                        onChange={(e) => setDiscount(e.target.value)}
                                        type="number"
                                        step="0.01"
                                        placeholder="Enter discount price"
                                        className="text-input"
                                    />
                                </div>
                            </div>
                        </div>
                        <input
                            type="submit"
                            className="submit-btn"
                            value="Create Product"
                        />
                    </form>
                </main>
            </div>
        </div>
    </>
);
};

export default CreateProduct;
