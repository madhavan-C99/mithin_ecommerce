import { useEffect, useState, useRef } from "react";
// import axiosInstance from "../api/Axios";

const useCategoryProductsSocket = (categoryId) => {
  const [products, setProducts] = useState(null);
  const [isInitialLoadDone, setIsInitialLoadDone] = useState(false);
  // const [imageMap, setImageMap] = useState({});
  const [error, setError] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!categoryId) return;

    const socket = new WebSocket(
      `${import.meta.env.VITE_WS_BASE_URL}/ws/products/`
    );

    socketRef.current = socket;

    socket.onopen = () => {
      socket.send(JSON.stringify({ category_id: categoryId }));
    };

    // socket.onmessage = (event) => {
    //   try {
    //     const parsed = JSON.parse(event.data);
    //     const { products } = parsed;
         
    //     if (!Array.isArray(products)) {
    //       throw new Error("Invalid WebSocket data structure");
    //     }

    //     const normalized = products.map((item) => ({
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
    //   } catch (err) {
    //     setError(err.message);
    //   }
    // };



    socket.onmessage = (event) => {
  try {
    const parsed = JSON.parse(event.data);

    // ✅ 1. HANDLE PRICE UPDATE
    if (parsed.type === "price_update") {
      setProducts((prev) =>
        prev.map((product) =>
          String(product.id) === String(parsed.product_id)
            ? {
                ...product,
                pricePerKg: Number(parsed.new_price)
              }
            : product
        )
      );
      return;
    }

    // ✅ 2. HANDLE STOCK UPDATE
    if (parsed.type === "stock_update") {
      setProducts((prev) =>
        prev.map((product) =>
          String(product.id) === String(parsed.product_id)
            ? {
                ...product,
                stock: parsed.new_stock,
                kStatus: parsed.status
              }
            : product
        )
      );
      return;
    }

    // ✅ 3. HANDLE FULL LIST
    if (Array.isArray(parsed.products)) {
      const normalized = parsed.products.map((item) => ({
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
      return;
    }

    // ✅ 4. IGNORE UNKNOWN (important)
    console.warn("Unknown WS message:", parsed);

  } catch (err) {
    setError(err.message);
  }
};




    socket.onerror = () => {
      setError("WebSocket connection error");
    };

    return () => socket.close();
  }, [categoryId]);

  // Load images when products change
  // useEffect(() => {
  //   if (!products.length) return;

  //   let isMounted = true;
  //   const localUrls = [];

  //   const loadImages = async () => {
  //     const newImageMap = {};

  //     for (const product of products) {
  //       if (!product.product_image) continue;

  //       try {
  //         const blob = await axiosInstance.post(
  //           "/adm/get_file",
  //           { file_path: product.product_image },
  //           { responseType: "blob" }
  //         );

  //         const imageUrl = URL.createObjectURL(blob.data);
  //         localUrls.push(imageUrl);
  //         newImageMap[product.product_image] = imageUrl;
  //       } catch (err) {
  //         console.error("Image load failed:", product.product_image);
  //       }
  //     }

  //     if (isMounted) {
  //       setImageMap(newImageMap);
  //     }
  //   };

  //   loadImages();

  //   return () => {
  //     isMounted = false;
  //     localUrls.forEach((url) => URL.revokeObjectURL(url));
  //   };
  // }, [products]);

  return { products, error, isInitialLoadDone };
};

export default useCategoryProductsSocket;