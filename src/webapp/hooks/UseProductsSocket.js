// useProductsSocket.js

import { useEffect, useState, useRef } from "react";

const useProductsSocket = (categoryId, subCategoryId) => {
  const [products, setProducts] = useState(null);
  const [isInitialLoadDone, setIsInitialLoadDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const socketRef = useRef(null);

  useEffect(() => {
    // Guard clause — do not open socket without required params
    if (!categoryId || !subCategoryId) return;

    setLoading(true);
    setProducts(null);
    setIsInitialLoadDone(false);
    setError(null);

    const socket = new WebSocket(
      `${import.meta.env.VITE_WS_BASE_URL}/ws/products/`
    );

    socketRef.current = socket;

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          category_id: categoryId,
          sub_category_id: subCategoryId,
        })
      );
    };

    // socket.onmessage = (event) => {
    //   try {
    //     const data = JSON.parse(event.data);

    //     if (!Array.isArray(data.products)) {
    //       throw new Error("Invalid product structure from server");
    //     }

    //     const normalized = data.products.map((item) => ({
    //       id: item.id,
    //       name: item.name,
    //       pricePerKg: item.price,
    //       productimage: item.image,
    //       stock: item.stock,
    //       kStatus: item.stock_status,
    //       subcategory: item.subcategory_name,
    //       weight: item.weight,
    //       weightDisplay: item.weight_display,
    //       tamilname: item.tamil_name,
    //       unit: item.unit
    //     }));

    //     setProducts(normalized);
    //     setLoading(false);

    //   } catch (err) {
    //     setError(err.message);
    //     setLoading(false);
    //   }
    // };



    socket.onmessage = (event) => {
  try {
    const data = JSON.parse(event.data);

    // 🔥 1. HANDLE UPDATE FIRST
    if (data.type === "price_update") {
      // setProducts((prev) =>
      //   prev.map((product) =>
      //     String(product.id) === String(data.product_id)
      //       ? { ...product, pricePerKg: Number(data.new_price) }
      //       : product
      //   )
      // );
      setProducts((prev = []) =>
  prev?.map((product) =>
    String(product.id) === String(data.product_id)
      ? { ...product, 
        pricePerKg: Number(data.new_price) }
      : product
  ) || []
);
      return;
    }

    if (data.type === "stock_update") {
      setProducts((prev) =>
        prev.map((product) =>
          String(product.id) === String(data.product_id)
            ? {
                ...product,
                stock: data.new_stock,
                kStatus: data.status
              }
            : product
        )
      );
      return;
    }

    // 🔥 2. THEN HANDLE FULL LIST
    if (Array.isArray(data.products)) {
      const normalized = data.products.map((item) => ({
        id: item.id,
        name: item.name,
        pricePerKg: item.price,
        productimage: item.image,
        stock: item.stock,
        kStatus: item.stock_status,
        subcategory: item.subcategory_name,
        weight: item.weight,
        weightDisplay: item.weight_display,
        tamilname: item.tamil_name,
        unit: item.unit
      }));

      setProducts(normalized);
      setIsInitialLoadDone(true); 
      setLoading(false);
      return;
    }

    // 🔥 3. IGNORE UNKNOWN MESSAGES (IMPORTANT)
    console.warn("Unknown WS message:", data);

  } catch (err) {
    setError(err.message);
    setLoading(false);
  }
};



    socket.onerror = () => {
      setError("WebSocket connection failed");
      setLoading(false);
    };

    socket.onclose = () => {
      socketRef.current = null;
    };

    // Cleanup
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };

  }, [categoryId, subCategoryId]);

  return { products, isInitialLoadDone, error };
};

export default useProductsSocket;