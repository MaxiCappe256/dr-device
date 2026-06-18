import axiosInstance from './axios.js';

class Orders {
  async getOrdersByUser() {
    const { data } = await axiosInstance.get('/orders/own');
    return data.data;
  }
}

export default new Orders();