import { useEffect, useState, useRef } from "react";
import axiosInstance from "../api/Axios";

const usePopularProductsSocket = () => {
  const [products, setProducts] = useState([]);
  // const [imageMap, setImageMap] = useState({});
  const [error, setError] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket(
      `${import.meta.env.VITE_WS_BASE_URL}/ws/trending_products/`
    );

    socketRef.current = socket;

    socket.onopen = () => {
      socket.send(JSON.stringify({ action: "init_trend" }));
    };

    // socket.onmessage = (event) => {
    //   try {
    //     const parsed = JSON.parse(event.data);
    //     const { payload } = parsed;
    //     console.log("WebSocket",parsed)

    //     if (!Array.isArray(payload)) {
    //       throw new Error("Invalid WebSocket payload structure");
    //     }

    //     const normalized = payload.map((item) => ({
    //       id: item.product_id,
    //       name: item.name,
    //       pricePerKg: item.price,
    //       productimage: item.product_img,
    //       stock: item.stock,
    //       kStatus: item.stock_status,
    //       subcategory: item.subcategory_name,
    //       weight: item.weight,
    //       weightDisplay: item.weight_display,
    //       tamilname: item.tamil_name,
    //       unit: item.unit
    //     }));

    //     setProducts(normalized);
    //     console.log("usepopularproductssocket", normalized )
    //   } catch (err) {
    //     setError(err.message);
    //   }
    // };



    socket.onmessage = (event) => {
  try {
    const parsed = JSON.parse(event.data);

    // ✅ HANDLE PRICE UPDATE (optional but safe)
    if (parsed.type === "price_update") {
      setProducts(prev =>
        prev.map(product =>
          String(product.id) === String(parsed.product_id)
            ? { ...product, pricePerKg: Number(parsed.new_price) }
            : product
        )
      );
      return;
    }

    // ✅ HANDLE STOCK UPDATE (optional but safe)
    if (parsed.type === "stock_update") {
      setProducts(prev =>
        prev.map(product =>
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

    // ✅ FULL LIST
    if (Array.isArray(parsed.payload)) {
      const normalized = parsed.payload.map((item) => ({
        id: item.product_id,
        name: item.name,
        pricePerKg: item.price,
        productimage: item.product_img,
        stock: item.stock,
        kStatus: item.stock_status,
        subcategory: item.subcategory_name,
        weight: item.weight,
        weightDisplay: item.weight_display,
        tamilname: item.tamil_name,
        unit: item.unit
      }));

      setProducts(normalized);
      return;
    }

  } catch (err) {
    setError(err.message);
  }
};




    socket.onerror = () => {
      setError("WebSocket connection error");
    };

    return () => socket.close();
  }, []);

  // Load images when products change
  // useEffect(() => {
  //   if (!products.length) return;

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

  //         const imageUrl = URL.createObjectURL(blob);
  //         newImageMap[product.product_image] = imageUrl;

  //       } catch (err) {
  //         console.error("Image load failed:", product.product_image);
  //       }
  //     }

  //     setImageMap(newImageMap);
  //   };

  //   loadImages();

  //   // Cleanup on unmount
  //   return () => {
  //     Object.values(imageMap).forEach((url) => {
  //       URL.revokeObjectURL(url);
  //     });
  //   };

  // }, [products]);

  return { products, error };
};

export default usePopularProductsSocket;