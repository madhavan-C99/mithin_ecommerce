import { useEffect, useRef, useState } from "react";

// const WS_URL =
//   "ws://ec2-54-237-228-110.compute-1.amazonaws.com:88/ws/fetch_all_product/";

const WS_URL = `${import.meta.env.VITE_WS_BASE_URL}/ws/fetch_all_product/`

const useAllProductsSearch  = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const wsRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const connect = () => {
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WS connected");

        // 🔥 IMPORTANT — trigger backend
        ws.send(JSON.stringify({ action: "init_all" }));
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (!isMounted) return;

          // expected format: { payload: [...] }
          if (Array.isArray(data?.payload)) {
            setProducts(data.payload);
            setLoading(false);
          }
        } catch (err) {
          console.error("WS parse error", err);
        }
      };

      ws.onerror = (err) => {
        console.error("WS error", err);
        setLoading(false);
      };

      ws.onclose = () => {
        console.warn("WS closed — retrying in 3s");

        // 🔁 auto reconnect (basic)
        setTimeout(connect, 3000);
      };
    };

    connect();

    return () => {
      isMounted = false;
      wsRef.current?.close();
    };
  }, []);

  return { products, loading };
};

export default useAllProductsSearch ;