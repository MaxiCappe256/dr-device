import axiosInstance from './axios.js';

class Offers {
  async createOffer(offer) {
    const { data } = await axiosInstance.post('/offers', offer);
    return data.data;
  }
  async allOffersTech() {
    const { data } = await axiosInstance.get('/offers/tech');
    return data.data;
  }  
  async getOffersByOrder(orderId) {
    const { data } = await axiosInstance.get(`/orders/${orderId}/offers`);
    return data.data;
  }

  async getOffer(id) {
    const { data } = await axiosInstance.get(`/offers/${id}`);
    return data.data;
  }

  async acceptOffer(id) {
    const { data } = await axiosInstance.put(`/offers/${id}/accept`);
    return data.data;
  }

}

export default new Offers();
