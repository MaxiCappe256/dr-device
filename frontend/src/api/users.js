import axiosInstance from './axios.js';

class Users {
    async userMe() {
        const { data } = await axiosInstance.get('/users/me');
        return data;
    }

    async getUser(user_id) {
        const { data } = await axiosInstance.get(`/users/${user_id}`);
        return data.data;
    }

    async getAllUsers() {
        const { data } = await axiosInstance.get('/users');
        return data.data;
    }

    async deleteUser(userId) {
        const { data } = await axiosInstance.delete(`/users/${userId}`);
        return data;
    }

    async createAdmin(payload) {
        const { data } = await axiosInstance.post('/users/admin', payload);
        return data;
    }
}

export default new Users();
