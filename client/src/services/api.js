import axios from 'axios';

// Base URL for the backend API
const API_BASE_URL = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api/v1`
    : 'https://ambition-pad-backend-1.onrender.com/api/v1';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Job-related API calls
export const getJobs = async (page = 1, query = '') => {
    try {
        const response = await api.get('/browsejobs', {
            params: {
                page,
                q: query,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch jobs');
    }
};

export const getJobById = async (id) => {
    try {
        const response = await api.get(`/alljobs/${id}`); // Keep this as is, assuming it's for detailed job view
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch job');
    }
};

// Removed searchJobs function as it's now integrated into getJobs

export default api;