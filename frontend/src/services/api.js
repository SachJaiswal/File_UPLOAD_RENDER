import axios from 'axios';

// Use environment variable or fallback to production URL
const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD 
    ? 'https://user-file-upload-api.onrender.com/api'  // Replace with your actual Render URL
    : 'http://localhost:3000/api');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`📤 ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// User API calls
export const userAPI = {
  createUser: async (formData) => {
    const response = await api.post('/users', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getAllUsers: async (page = 1, limit = 10) => {
    const response = await api.get(`/users?page=${page}&limit=${limit}`);
    return response.data;
  },

  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  addFiles: async (userId, formData) => {
    const response = await api.post(`/users/${userId}/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  removeFile: async (userId, fileId) => {
    const response = await api.delete(`/users/${userId}/files/${fileId}`);
    return response.data;
  },
};

export default api;