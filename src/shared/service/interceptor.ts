// api.js
import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            // Garante o formato "Bearer <token>"
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor de resposta: Apenas rejeita o erro 401, sem redirecionamento
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {

            localStorage.removeItem("token");

        }

        return Promise.reject(error);
    }
);