import axios from 'axios';

export const API_BASE_URL = 'http://localhost:5000';

const jwt = localStorage.getItem('jwt');

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${jwt}`,
    'Content-Type': 'application/json',
  },
});

// Add an Axios request interceptor to set the Authorization header
api.interceptors.request.use(
  (config) => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
