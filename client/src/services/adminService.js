import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URI;

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/users/users`);
    return response.data.users;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
