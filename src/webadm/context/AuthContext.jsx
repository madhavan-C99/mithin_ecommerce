import { createContext, useContext, useState } from "react";
import { productsAPI} from "../features/products/productAPI";
import { categoryAPI } from "../features/category/categoryAPI";
import { dropdownAPI } from "../services/dropdownAPI";
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [allproducts, setAllproducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---------------- FETCH ALL PRODUCTS ----------------
  const fetchAllproducts = async () => {
    try {
      setLoading(true);
      const res = await productsAPI.fetchAllProducts();
      setAllproducts(res.data.data || res.data);
      const loadUserImages = res.data;
      console.log("fetch all the here for image res ",res)
      console.log("fetch all the here for image res data ",res.data)
      console.log("fetch all the here for image ",res.product_image)
    } catch (error) {
      console.log("Fetch Products Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- DELETE PRODUCT ----------------
  const deleteProductApi = async (id) => {
    try {
      await productsAPI.deleteProduct(id);
      setAllproducts((prev) =>
        prev.filter((product) => product.id !== id)
      );
      return { success: true };
    } catch (error) {
      console.error("Delete Failed", error.message);
      return { success: false };
    }
  };

  // ---------------- GET PRODUCT BY ID ----------------
  const getProductById = async (id) => {
  try {
    const res = await productsAPI.getProductById(id);
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false };
  }
};

  // ---------------- GET UPDATE BY ID ----------------
  const updateProductApi = async (id, data) => {
  try {
    await productsAPI.updateProduct(id, data);
    fetchAllproducts();
    return { success: true };
  } catch {
    return { success: false };
  }
};

  


  // ---------------- ADD CATEGORY ----------------
  const addCategoryApi = async (formData) => {
    try {
     const res =  await categoryAPI.addCategoryApi(formData);
      fetchAllproducts(); // refresh table
      return { 
        success: true,
        // res:response.data
      };
    } catch {
      return { success: false };
    }
  };
  

  // ---------------- DROPDOWNS ----------------
  const fetchCategories = async () => {
    const res = await dropdownAPI.fetchCategories();
    return res.data;
  };

  const fetchStatusList = async () => {
    const res = await dropdownAPI.fetchStatusList();
    return res.data;
  };
  
  // -----------------IMAGE UPLOAD-----------------
//   const uploadFile = async (file, name) => {
//     try {
//       // var id = localStorage.getItem('python_fullstack')
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('source_field', name);
//       // formData.append("id" ,id)
//       console.log("auth",formData)



//       const filename = await authAPI.upload_file(formData);

//       return { success: true, filename };
//     } catch (error) {
//       return {
//         success: false,
//         error: error.response?.data?.errors || 'Mission Failed',
//       };
//     }
//   };


  return (
    <AuthContext.Provider
      value={{
        allproducts,
        loading,
        fetchAllproducts,
        deleteProductApi,
        getProductById,
        fetchCategories,
        fetchStatusList,
        updateProductApi,
        addCategoryApi
        // uploadFile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};





export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

  const [notifications, setNotifications] = useState([]);

  return (
    <NotificationContext.Provider
      value={{ notifications, setNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );

};



export const DashboardContext = createContext();