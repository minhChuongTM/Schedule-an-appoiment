import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            // optionally redirect to login
        }
        
        // Log SQL errors to help developers debug backend issues
        if (error.response?.data?.message?.includes('Column not found') || 
            error.response?.data?.message?.includes('Unknown column')) {
            console.error('⚠️ DATABASE ERROR: Column missing in backend database');
            console.error('Error details:', error.response.data.message);
            console.error('This needs to be fixed in the backend/database schema');
        }
        
        return Promise.reject(error);
    }
);

export default api;
