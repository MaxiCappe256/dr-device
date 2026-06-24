import axiosInstance from './axios.js';

class Orders {
  async getOrdersByUser() {
    const { data } = await axiosInstance.get('/orders/own');
    return data.data;
  }

  async createOrder(order) {
    const { data } = await axiosInstance.post('/orders', order);
    return data.data;
  }

  async getAvailableOrders() {
    const { data } = await axiosInstance.get('/orders/available');
    return data.data;
  }

  async getOrdersByTechnician() {
    const { data } = await axiosInstance.get('/orders/tech');
    return data.data;
  }

  async getOrder(id) {
    const { data } = await axiosInstance.get(`/orders/${id}`);
    return data.data
  }


  async cancelledOrder(order_id) {
    const { data } = await axiosInstance.patch(`orders/${order_id}/cancel`);
    return data;
  }

  async finishedOrder(order_id) {
    const { data } = await axiosInstance.patch(`orders/${order_id}/finish`);
    return data;
  }
}

export default new Orders();
