// // hooks/useOrderTracking.js
// import { useEffect, useRef, useState } from "react";

// export default function UseOrderTracking(userId) {
//   const [orders, setOrders] = useState([]);
//   const wsRef = useRef(null);

  
//   useEffect(() => {

//   const storedUser = localStorage.getItem("user");
//   const parsedUser = JSON.parse(storedUser);
//   const userId = parsedUser.user_id;
//   console.log(userId)

//   if (!userId) {
//     console.warn("No userId, skipping WS");
//     return;
//   }

//   const url = `ws://ec2-54-237-228-110.compute-1.amazonaws.com:88/ws/order_tracking/${userId}/`;
//   console.log("Connecting to:", url);

//   const ws = new WebSocket(url);
//   wsRef.current = ws;

//   ws.onopen = () => {
//     console.log("WS connected");
//   };

//   ws.onmessage = (event) => {
//     console.log("WS message:", event.data);
//     try {
//       const data = JSON.parse(event.data);
//       setOrders(data.orders || []);
//     } catch (err) {
//       console.error("Invalid WS data", err);
//     }
//   };

//   ws.onerror = () => {
//     console.error("WS error (check network tab)");
//   };

//   ws.onclose = (e) => {
//     console.log("WS closed", e.code, e.reason);
//   };

//   return () => {
//     ws.close();
//   };
// }, [userId]);

// //   useEffect(() => {
// //     if (!userId) return;

// //     const ws = new WebSocket(
// //       `ws://ec2-54-237-228-110.compute-1.amazonaws.com:88/ws/order_tracking/${userId}/`
// //     );

// //     wsRef.current = ws;

// //     ws.onopen = () => {
// //       console.log("WS connected");
// //     };

// //     ws.onmessage = (event) => {
// //       try {
// //         const data = JSON.parse(event.data);
// //         setOrders(data.orders || []);
// //       } catch (err) {
// //         console.error("Invalid WS data", err);
// //       }
// //     };

// //     ws.onerror = (err) => {
// //       console.error("WS error", err);
// //     };

// //     ws.onclose = () => {
// //       console.log("WS closed");
// //     };

// //     return () => {
// //       ws.close();
// //     };
// //   }, [userId]);

// //   useEffect(() => {
// //   console.log("Hook triggered", userId);
// // }, [userId]);

//   return { orders };
// }






import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";                        
import { setActiveOrderCount } from "../store/OrderSlice";        

export default function useOrderTracking() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const wsRef = useRef(null);
  const dispatch = useDispatch();     

  useEffect(() => {
    // 🔥 Get userId from localStorage ONLY
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      console.warn("No user in localStorage");
      setLoading(false);
      return;
    }

    let userId;

    try {
      const parsed = JSON.parse(storedUser);
      userId = parsed?.user_id;
    } catch (e) {
      console.error("Invalid user in localStorage");
      setLoading(false);
      return;
    }

    if (!userId) {
      console.warn("No userId, skipping WS");
      setLoading(false);
      return;
    }

    // const url = `ws://ec2-54-237-228-110.compute-1.amazonaws.com:88/ws/order_tracking/${userId}/`;
    // console.log("Connecting WS:", url);

    // const ws = new WebSocket(url);

    const ws = new WebSocket(
      `${import.meta.env.VITE_WS_BASE_URL}/ws/order_tracking/${userId}/`
    );

    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WS connected");
    };

    // ws.onmessage = (event) => {
    //   console.log("WS message:", event.data);

    //   try {
    //     const data = JSON.parse(event.data);
    //     setOrders(data.orders || []);
    //   } catch (err) {
    //     console.error("Invalid WS data", err);
    //   } finally {
    //     setLoading(false); // 🔥 always stop loading
    //   }
    // };

     ws.onmessage = (event) => {
      console.log("WS message:", event.data);

      try {
        const data = JSON.parse(event.data);
        const fetchedOrders = data.orders || [];

        setOrders(fetchedOrders);

        // 👈 ADD — count only non-delivered orders and push to Redux
        const activeCount = fetchedOrders.filter(
          (o) => o.status !== "Delivered"
        ).length;
        dispatch(setActiveOrderCount(activeCount));

      } catch (err) {
        console.error("Invalid WS data", err);
      } finally {
        setLoading(false);
      }
    };

    ws.onerror = () => {
      console.error("WS error");
      setLoading(false);
    };

    ws.onclose = () => {
      console.log("WS closed");
    };

    return () => {
      ws.close();
    };
  }, []);

  return { orders, loading };
}