// api.js
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
        const token = localStorage.getItem('token');
        console.log('Request to:', config.url, 'Token:', token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        console.log('Response from:', response.config.url, 'Data:', response.data);
        return response;
    },
    (error) => {
        console.error('Response error:', error.response?.data || error.message);
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Job-related API calls

// Get jobs list with basic info (no description)
export const getBrowseJobs = async (page = 1, query = '') => {
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

// Get full job details including description
export const getJobById = async (id) => {
    try {
        const response = await api.get(`/job/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch job details');
    }
};

// Get featured jobs by country
export const getFeaturedJobs = async (country = '', limit = 6) => {
    try {
        // Build the URL with country as a path parameter
        const url = country
            ? `/featuredjobs/${encodeURIComponent(country)}`
            : '/featuredjobs';

        const response = await api.get(url, {
            params: {
                limit, // Keep limit as query parameter if needed
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch featured jobs');
    }
};

// Keep the old function name for backward compatibility
export const getJobs = getBrowseJobs;

export default api;