import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true // para habilitar el consumo de cookies del backend
})

export default instance;