import axiosInstance from './axios.js';

class Auth {
    async register(payload) {
        const { data } = await axiosInstance.post('/auth/register', payload);
        return data;
    }

    async login(credentials) {
        const { data } = await axiosInstance.post('/auth/login', credentials);
        return data;
    }

    async logout() {
        await axiosInstance.post('/auth/logout');
    }
}

export default new Auth();
