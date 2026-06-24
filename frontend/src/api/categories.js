import axiosInstance from "./axios.js";

class Categories {
  async getCategory(category_id) {
    const { data } = await axiosInstance.get(`/categories/${category_id}`);
    return data.data;
  }

  async getCategories() {
    const { data } = await axiosInstance.get("/categories");
    return data.data;
  }

  async createCategory(payload) {
    const { data } = await axiosInstance.post('/categories', payload);
    return data;
  }

  async updateCategory({ id, ...payload }) {
    const { data } = await axiosInstance.patch(`/categories/${id}`, payload);
    return data;
  }

  async deleteCategory(id) {
    const { data } = await axiosInstance.delete(`/categories/${id}`);
    return data;
  }
}

export default new Categories();
