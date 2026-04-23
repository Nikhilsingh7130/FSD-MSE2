import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth services
export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

// Grievance services
export const grievanceService = {
  submit: (data) => api.post('/grievances', data),
  getAll: () => api.get('/grievances'),
  getById: (id) => api.get(`/grievances/${id}`),
  update: (id, data) => api.put(`/grievances/${id}`, data),
  delete: (id) => api.delete(`/grievances/${id}`),
  search: (title) => api.get('/grievances/search', { params: { title } }),
};

export default api;
