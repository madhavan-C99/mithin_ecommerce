import api from "../../../services/apiClient"

export const orderAPI={
  getfilterApi:(filterType)=>api.post("/adm/order_top_tile",
    {filter_type: filterType} ),

  getOrderById:(id,order_number)=> api.post("/adm/fetch_one_order",{
            id
        }),

  updatestatusApi:(id,newStatus) => api.post("/adm/order_status_update", {
      id,
      order_status: newStatus
    }),
  readnotification: (id) => api.post("/adm/read_notification", { id })


}