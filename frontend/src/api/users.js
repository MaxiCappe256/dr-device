import axiosInstance from './axios.js';

class Auth {
    async userMe() {
        const { data } = await axiosInstance.get('/users/me');
        return data;
    }

    async getUser(user_id) {
        const { data } = await axiosInstance.get(`/users/${user_id}`);
        return data.data;
    }
}

export default new Auth();
