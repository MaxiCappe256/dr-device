import axiosInstance from './axios.js';

class Permissions {
    async getPermissions() {
        const { data } = await axiosInstance.get('/permissions');
        return data.data;
    }
}

export default new Permissions();
