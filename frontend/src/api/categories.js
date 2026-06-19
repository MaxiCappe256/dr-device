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
}

export default new Categories();
