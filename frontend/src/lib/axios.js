import axios from 'axios';
import useAuthStore from '../store/authStore';

const api = axios.create({
  baseURL: 'https://api.cdash.rsw.work.gd',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 30000,
});

// Request interceptor — attach Bearer token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token || localStorage.getItem('rsw_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor — handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const { logout } = useAuthStore.getState();
      logout();

      if (
        typeof window !== 'undefined' &&
        !window.location.pathname.startsWith('/signin')
      ) {
        window.location.href = '/signin';
      }
    }
    return Promise.reject(error);
  },
);

export default api;
