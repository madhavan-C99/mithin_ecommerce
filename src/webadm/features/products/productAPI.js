import api from "../../services/apiClient";

export const productsAPI = {
  fetchAllProducts: () => api.get("/adm/fetch_all_product"),
  getProductById: (id) => api.post("/adm/fetch_one_product", { id }),
  deleteProductApi: (id) => api.post("/adm/delete_product", { id }),

  updateProduct: (formData) =>
    api.post("/adm/update_product", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  addProductApi: (data) =>
    api.post("/adm/create_product", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  upload_file: async (data) => {
    const res = await api.post("/adm/upload_file", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data.tmp_file_name;
  },
};

