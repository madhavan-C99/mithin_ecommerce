import api from "./apiClient";

export const dropdownAPI = {
  fetchDropSub: () =>
    api.post("/adm/get_select_options", {
      fields: "L_FETCH_ALL_SUBCATEGORY",
    }),

  fetchDropCategory: () =>
    api.post("/adm/get_select_options", {
      fields: "L_FETCH_ALL_CATEGORY",
    }),

  fetchDropRole:()=>
      api.post("",{
        fields:"",
      })



};