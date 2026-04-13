import { useEffect, useState, useRef } from "react";
// import axiosInstance from "../api/Axios";
import {
  getAllCategories,
  getSubCategoriesByCategory
} from "../api/AllApi";

const useCategoryMenu = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState({});
  const [loadingSubCategory, setLoadingSubCategory] = useState(null);

  const abortRef = useRef(null);

  // Fetch categories once
  useEffect(() => {
    const controller = new AbortController();
    abortRef.current = controller;

    const fetchCategories = async () => {
      try {
        const res = await getAllCategories(controller.signal);
        setCategories(res || []);
      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error("Category fetch failed", err);
        }
      }
    };

    fetchCategories();

    return () => controller.abort();
  }, []);

  const fetchSubCategories = async (categoryId) => {
    if (subCategories[categoryId]) return;
    if (loadingSubCategory === categoryId) return;

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setLoadingSubCategory(categoryId);

      const res = await getSubCategoriesByCategory(
        categoryId,
        controller.signal );
        setSubCategories(prev => ({...prev,
            [categoryId]: res || []
        }));
    } catch (err) {
      if (err.name !== "CanceledError") {
        console.error("Subcategory fetch failed", err);
      }
    } finally {
      setLoadingSubCategory(null);
    }
  };

  return {
    categories,
    subCategories,
    fetchSubCategories
  };
};

export default useCategoryMenu;