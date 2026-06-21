import axiosInstance from './axios.js';

class Roles {
    async getRoles() {
        const { data } = await axiosInstance.get('/roles');
        return data.data;
    }

    async createRole(payload) {
        const { data } = await axiosInstance.post('/roles', payload);
        return data;
    }

    async updateRole({ id, ...payload }) {
        const { data } = await axiosInstance.patch(`/roles/${id}`, payload);
        return data;
    }
}

export default new Roles();
