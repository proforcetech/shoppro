// proforcetech/shoppro/shoppro-06bf0ed64f7d8a05ba37c69644472fc852ae8c80/frontend/src/api/client.ts

import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to include the auth token on every request
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient;