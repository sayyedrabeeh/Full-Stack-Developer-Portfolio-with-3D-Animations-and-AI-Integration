import axios from 'axios';

 

const api = axios.create({
    baseURL: "https://portfolio-backend-0gnb.onrender.com/api/",
    headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
