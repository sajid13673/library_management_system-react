import axios from 'axios';
import { getToken } from '../Utils/getToken'; // Import the helper function to get the token

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

// Adding a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = getToken(); 
        if (token) {
            config.headers['Authorization'] = `Bearer ${token.token}`;
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
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export const get = (endpoint, config = {}) => api.get(endpoint, config);
export const post = (endpoint, data, config = {}) => api.post(endpoint, data, config);
export const put = (endpoint, data, config = {}) => api.put(endpoint, data, config);
export const del = (endpoint, config = {}) => api.delete(endpoint, config);

export default api;
