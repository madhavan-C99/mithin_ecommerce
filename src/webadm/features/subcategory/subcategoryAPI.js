import api from "../../services/apiClient";

export const subCategoryAPI = {
  fetchAllSubcategory: () => api.get("/adm/fetch_all_subcategory"),

  addSubCategory: (payload) =>
    api.post("/adm/create_subcategory", payload),

  getSubCategoryById: (id) =>
    api.post("/adm/fetch_one_subcategory", { id }),

  updateSubCategoryApi: (payload) =>
    api.post("/adm/update_subcategory", payload),

  DeleteSubCategories: (id) =>
    api.post("/adm/delete_subcategory", { id }),
};