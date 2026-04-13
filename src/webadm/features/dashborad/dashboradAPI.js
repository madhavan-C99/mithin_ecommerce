import api from "../../services/apiClient";

export const dashboradAPI={
    categoryrevenue:(filterType)=>api.post("/adm/category_revenue_chart",{filter_type: filterType,}),

    topcards:(filterType)=>api.post("/adm/top_revenue_report",{filter_type:filterType}),

    
    piechart:(filterType)=>api.post("/adm/piechart_subcategory",{filter_type: filterType})

}