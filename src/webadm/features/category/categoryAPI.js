import api from "../../services/apiClient";

export const categoryAPI = {
  fetchAllcategory: () => api.get("/adm/fetch_all_category"),
  createCategoryApi: (formData) =>api.post("/adm/create_category", formData),
  updateCategoryApi: (formData) =>
    api.post("/adm/update_category", formData),
  getCategoryById: (id) =>
    api.post("/adm/fetch_one_category", { id }),
  DeleteCategory: (id) =>
    api.post("/adm/delete_category", { id }),
};