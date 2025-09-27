import axios from 'axios';

const BASE_URL =
    import.meta.env.MODE === "production"
        ? import.meta.env.VITE_API_URL_PROD
        : import.meta.env.VITE_API_URL_DEV;

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

export default api;