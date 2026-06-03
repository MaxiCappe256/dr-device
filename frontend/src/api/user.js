import axiosInstance from './axios.js';

class Auth {
    async userMe() {
        const { data } = await axiosInstance.get('/users/me');
        return data;
    }
}

export default new Auth();
