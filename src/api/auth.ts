import axios from 'axios';

// API client configuration with proper baseURL and auth headers
const API = import.meta.env.VITE_API_BASE || 'https://hr-production-c212.up.railway.app/api';
console.log('API URL:', API); //

export const apiClient = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add JWT token to all requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  const res = await apiClient.post('/auth/login', { email, password });
  return res.data;
};

export const register = async (email: string, password: string, full_name: string, role: string) => {
  const res = await apiClient.post('/auth/register', { email, password, full_name, role });
  return res.data;
};
