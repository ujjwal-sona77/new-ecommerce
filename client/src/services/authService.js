import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URI;

export const authService = {
    login: async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/api/user/login`, {
                email,
                password
            });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    signup: async (userData) => {
        try {
            const response = await axios.post(`${API_URL}/api/user/create`, userData);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getCurrentUser: async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return null;
            
            // Decode the JWT token to get user data
            const tokenData = JSON.parse(atob(token.split('.')[1]));
            const userEmail = tokenData.email;

            const response = await axios.get(`${API_URL}/api/user/getUser/${userEmail}`);
            return response.data.user;
        } catch (error) {
            localStorage.removeItem('token');
            throw error.response?.data || error.message;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
    }
};
