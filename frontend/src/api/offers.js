import axiosInstance from './axios.js';

class Offers {
  async createOffer(offer) {
    const { data } = await axiosInstance.post('/offers', offer);
    return data.data;
  }

}

export default new Offers();
