import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URI;

export const productService = {
  getAllProducts: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/product`);
      return response.data.products;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  createProduct: async (productData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/api/product/create`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  removeProduct: async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const payload = JSON.parse(atob(token.split(".")[1]));
      const email = payload.email;
      const response = await axios.post(
        `${API_URL}/api/product/remove/${productId}/${email}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  orderProduct: async (productId, email) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/product/order/${productId}/${email}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  increseProductQuantity: async (productId, email) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/product/increase/${productId}/${email}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
