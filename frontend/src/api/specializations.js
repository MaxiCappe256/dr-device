import axiosInstance from './axios.js';

class Specializations {
  async getAllCategories() {
    const { data } = await axiosInstance.get('/categories');
    return data.data;
  }

  async updated(payload) {
    const { data } = await axiosInstance.patch('/specializations', payload);
    return data;
  }
}

export default new Specializations();