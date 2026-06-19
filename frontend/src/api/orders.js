import axiosInstance from './axios.js';

class Orders {
  async getOrdersByUser() {
    const { data } = await axiosInstance.get('/orders/own');
    return data.data;
  }

  async cancelledOrder(order_id) {
    const { data } = await axiosInstance.patch(`orders/${order_id}/cancel`);
    return data;
  }
}

export default new Orders();