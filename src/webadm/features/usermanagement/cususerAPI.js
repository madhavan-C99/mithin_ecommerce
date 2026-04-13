import React from "react"
import api from "../../services/apiClient"
export const cususerAPI={
  fetchAllCustomers: () => api.post("/adm/fetch_all_users"),


 updateCustomerStatus: (payload) =>
  api.post("/adm/change_customer_status", payload),


  deleteProductApi: (id) => api.post("/adm/delete_product", { id }),

  updateProduct: (formData) =>
    api.post("/adm/update_product", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  adduserAPI:(formData)=>
    api.post("/adm/create_new_admin_user",formData,
      )

}