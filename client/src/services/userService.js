import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URI;

export const userService = {
  editUser: async (email, userData, profilePic) => {
    try {
      const formData = new FormData();
      if (userData.username) formData.append('username', userData.username);
      if (userData.email) formData.append('email', userData.email);
      if (profilePic) formData.append('profilePic', profilePic);
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/api/user/edit/${email}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
