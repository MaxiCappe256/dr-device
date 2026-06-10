import axiosInstance from './axios.js';

class Account {
  async updated(payload) {
    const { data } = await axiosInstance.patch('/users', payload);
    return data;
  }

  async deleted() {
    console.log('entro antes del axios')
    const { data } = await axiosInstance.delete('/users');
    return data;
  }
}

export default new Account();
