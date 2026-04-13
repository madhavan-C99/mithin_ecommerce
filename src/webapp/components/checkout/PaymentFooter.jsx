// // // components/checkout/PaymentFooter.jsx
// // // Logic unchanged — only visual redesign

// // import { Box, Button, Typography } from "@mui/material";
// // import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// // import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// // const PaymentFooter = ({ total }) => {
// //   const grandTotal = total ? Number(total) : null;

// //   return (
// //     <Box
// //       sx={{
// //         backgroundColor: "#fff",
// //         borderRadius: "16px",
// //         border: "1px solid #e2ece2",
// //         boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
// //         overflow: "hidden",
// //       }}
// //     >
// //       {/* Top accent strip */}
// //       <Box
// //         sx={{
// //           height: 4,
// //           background: "linear-gradient(90deg, #1b5e20, #4CAF50, #81c784)",
// //         }}
// //       />

// //       <Box sx={{ px: { xs: 2, sm: 2.5 }, py: 2.2 }}>
// //         {/* Amount row */}
// //         {grandTotal !== null && grandTotal > 0 && (
// //           <Box
// //             sx={{
// //               display: "flex",
// //               justifyContent: "space-between",
// //               alignItems: "center",
// //               mb: 1.8,
// //               px: 0.5,
// //             }}
// //           >
// //             <Box>
// //               <Typography fontSize={11.5} color="#8a9e8a" fontWeight={500}>
// //                 Total amount
// //               </Typography>
// //               <Typography fontSize={20} fontWeight={800} color="#1b5e20" lineHeight={1.2}>
// //                 ₹ {grandTotal}
// //               </Typography>
// //             </Box>
// //             <Box sx={{ textAlign: "right" }}>
// //               <Typography fontSize={11.5} color="#8a9e8a">Delivery</Typography>
// //               <Typography fontSize={13} fontWeight={700} color="#2e7d32">FREE</Typography>
// //             </Box>
// //           </Box>
// //         )}

// //         {/* CTA Button */}
// //         <Button
// //           variant="contained"
// //           fullWidth
// //           size="large"
// //           endIcon={<ArrowForwardIcon sx={{ fontSize: "18px !important" }} />}
// //           startIcon={<LockOutlinedIcon sx={{ fontSize: "16px !important" }} />}
// //           sx={{
// //             background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #43a047 100%)",
// //             fontWeight: 800,
// //             fontSize: { xs: 14.5, sm: 15.5 },
// //             textTransform: "none",
// //             py: 1.7,
// //             borderRadius: "12px",
// //             letterSpacing: 0.3,
// //             boxShadow: "0 6px 20px rgba(46,125,50,0.38)",
// //             transition: "all 0.2s ease",
// //             "&:hover": {
// //               background: "linear-gradient(135deg, #163d18 0%, #255b27 50%, #388e3c 100%)",
// //               boxShadow: "0 8px 28px rgba(46,125,50,0.48)",
// //               transform: "translateY(-1px)",
// //             },
// //             "&:active": {
// //               transform: "translateY(0)",
// //               boxShadow: "0 4px 14px rgba(46,125,50,0.3)",
// //             },
// //           }}
// //         >
// //           Proceed to Payment
// //         </Button>

// //         {/* Trust line */}
// //         <Box
// //           sx={{
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             gap: 0.6,
// //             mt: 1.4,
// //           }}
// //         >
// //           <LockOutlinedIcon sx={{ fontSize: 11, color: "#a0b8a0" }} />
// //           <Typography fontSize={11.5} color="#a0b8a0" fontWeight={500}>
// //             100% secure & encrypted checkout
// //           </Typography>
// //         </Box>
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default PaymentFooter;









// // components/checkout/PaymentFooter.jsx

// import { useState } from "react";
// import { Box, Button, Typography, CircularProgress } from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import { useNavigate } from "react-router-dom";
// import { createOrder, createRazorpayOrder, verifyRazorpayPayment } from "../../api/AllApi";

// import { useDispatch } from "react-redux";
// import { clearCart } from "../../store/CartSlice";


// /**
//  * Dynamically loads the Razorpay checkout script.
//  * Resolves true if loaded successfully, false if failed.
//  * Safe to call multiple times — skips if already loaded.
//  */
// const loadRazorpayScript = () => {
//   return new Promise((resolve) => {

//     // Already loaded — no need to inject again
//     if (window.Razorpay) {
//       resolve(true);
//       return;
//     }

//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;

//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);

//     document.body.appendChild(script);
//   });
// };


// const PaymentFooter = ({ total, userId, addressId }) => {
//   const grandTotal = total ? Number(total) : null;
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   const handlePayment = async () => {
//     setErrorMsg("");

//     // ── Guard checks ──
//     if (!userId) {
//       setErrorMsg("User session not found. Please log in again.");
//       return;
//     }
//     if (!addressId) {
//       setErrorMsg("Please select a delivery address before proceeding.");
//       return;
//     }
//     if (!grandTotal || grandTotal <= 0) {
//       setErrorMsg("Invalid order total. Please check your cart.");
//       return;
//     }

//     setLoading(true);

//     // ── STEP 1: Ensure Razorpay script is loaded ──
//     const scriptLoaded = await loadRazorpayScript();
//     if (!scriptLoaded) {
//       setErrorMsg("Failed to load payment gateway. Please check your internet connection and try again.");
//       setLoading(false);
//       return;
//     }

//     try {
//       // ── STEP 2: Fire both APIs simultaneously ──
//       const [myOrderRes, razorpayOrderRes] = await Promise.all([
//         createOrder({
//           user_id: userId,
//           address_id: addressId,
//           total_amount: grandTotal,
//         }),
//         createRazorpayOrder({
//           amount: grandTotal,
//         }),
//       ]);

//       // myOrderRes       → { order_id: 40, order_number: "sm1000031" }
//       // razorpayOrderRes → { order_id: "order_SVPz...", amount: 10000, key: "rzp_test_..." }

//       // ── STEP 3: Open Razorpay popup ──
//       const options = {
//         key: razorpayOrderRes.key,
//         amount: razorpayOrderRes.amount,      // already in paise from backend
//         currency: "INR",
//         name: "ShopMart",
//         description: `Order #${myOrderRes.order_number}`,
//         order_id: razorpayOrderRes.order_id,  // Razorpay's order_id string

//         // ── STEP 4: On payment success ──
//         // razorpayResponse contains: { razorpay_payment_id, razorpay_order_id, razorpay_signature }
//         handler: async function (razorpayResponse) {

//           console.log("razorpay-handler-response", {
//     payment_id: razorpayResponse.razorpay_payment_id,
//     razorpay_order_id: razorpayResponse.razorpay_order_id,
//     order_id: myOrderRes.order_id,
//     signature: razorpayResponse.razorpay_signature,
//     amount: grandTotal,
//   });



//           try {
//             await verifyRazorpayPayment({
//               payment_id: razorpayResponse.razorpay_payment_id,
//               razorpay_order_id: razorpayResponse.razorpay_order_id,
//               order_id: myOrderRes.order_id,          // your backend's numeric order_id
//               signature: razorpayResponse.razorpay_signature,
//               amount: grandTotal,
//             });
            
//             // Clear cart — payment verified, order placed ✅ ──
//             dispatch(clearCart()); 

//             // ── STEP 5: Navigate to confirmation page ──
//             navigate("/order-confirmation", {
//               state: {
//                 order_number: myOrderRes.order_number,
//                 order_id: myOrderRes.order_id,
//                 total_amount: grandTotal,
//                 payment_id: razorpayResponse.razorpay_payment_id,
//               },
//             });

//           } catch (verifyErr) {
//             console.error("Payment verification failed:", verifyErr);
//             setErrorMsg(
//               "Payment received but verification failed. Contact support with Payment ID: " +
//                 razorpayResponse.razorpay_payment_id
//             );
//           } finally {
//             setLoading(false);
//           }
//         },

//         // ── On popup close without paying ──
//         modal: {
//           ondismiss: function () {
//             setLoading(false);
//             setErrorMsg("Payment cancelled. You can try again.");
//           },
//         },

//         theme: {
//           color: "#2e7d32",
//         },
//       };

//       const rzp = new window.Razorpay(options);

//       rzp.on("payment.failed", function (response) {
//         console.error("Razorpay payment failed:", response.error);
//         setErrorMsg(
//           `Payment failed: ${response.error.description}. Please try again.`
//         );
//         setLoading(false);
//       });

//       rzp.open();

//     } catch (err) {
//       console.error("Payment initiation error:", err);
//       setErrorMsg("Something went wrong while initiating payment. Please try again.");
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         backgroundColor: "#fff",
//         borderRadius: "16px",
//         border: "1px solid #e2ece2",
//         boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
//         overflow: "hidden",
//       }}
//     >
//       {/* Top accent strip */}
//       <Box
//         sx={{
//           height: 4,
//           background: "linear-gradient(90deg, #1b5e20, #4CAF50, #81c784)",
//         }}
//       />

//       <Box sx={{ px: { xs: 2, sm: 2.5 }, py: 2.2 }}>

//         {/* Amount row */}
//         {grandTotal !== null && grandTotal > 0 && (
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mb: 1.8,
//               px: 0.5,
//             }}
//           >
//             <Box>
//               <Typography fontSize={11.5} color="#8a9e8a" fontWeight={500}>
//                 Total amount
//               </Typography>
//               <Typography fontSize={20} fontWeight={800} color="#1b5e20" lineHeight={1.2}>
//                 ₹ {grandTotal}
//               </Typography>
//             </Box>
//             <Box sx={{ textAlign: "right" }}>
//               <Typography fontSize={11.5} color="#8a9e8a">
//                 Delivery
//               </Typography>
//               <Typography fontSize={13} fontWeight={700} color="#2e7d32">
//                 FREE
//               </Typography>
//             </Box>
//           </Box>
//         )}

//         {/* Error message */}
//         {errorMsg && (
//           <Box
//             sx={{
//               backgroundColor: "#fff3f3",
//               border: "1px solid #ffcdd2",
//               borderRadius: "10px",
//               px: 1.5,
//               py: 1,
//               mb: 1.5,
//             }}
//           >
//             <Typography fontSize={12.5} color="#c62828" fontWeight={500}>
//               {errorMsg}
//             </Typography>
//           </Box>
//         )}

//         {/* CTA Button */}
//         <Button
//           variant="contained"
//           fullWidth
//           size="large"
//           onClick={handlePayment}
//           disabled={loading}
//           endIcon={
//             loading ? null : (
//               <ArrowForwardIcon sx={{ fontSize: "18px !important" }} />
//             )
//           }
//           startIcon={
//             loading ? null : (
//               <LockOutlinedIcon sx={{ fontSize: "16px !important" }} />
//             )
//           }
//           sx={{
//             background: loading
//               ? "#a5d6a7"
//               : "linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #43a047 100%)",
//             fontWeight: 800,
//             fontSize: { xs: 14.5, sm: 15.5 },
//             textTransform: "none",
//             py: 1.7,
//             borderRadius: "12px",
//             letterSpacing: 0.3,
//             boxShadow: loading ? "none" : "0 6px 20px rgba(46,125,50,0.38)",
//             transition: "all 0.2s ease",
//             "&:hover": {
//               background: loading
//                 ? "#a5d6a7"
//                 : "linear-gradient(135deg, #163d18 0%, #255b27 50%, #388e3c 100%)",
//               boxShadow: loading ? "none" : "0 8px 28px rgba(46,125,50,0.48)",
//               transform: loading ? "none" : "translateY(-1px)",
//             },
//             "&:active": {
//               transform: "translateY(0)",
//               boxShadow: "0 4px 14px rgba(46,125,50,0.3)",
//             },
//             "&.Mui-disabled": {
//               color: "#fff",
//             },
//           }}
//         >
//           {loading ? (
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <CircularProgress size={18} sx={{ color: "#fff" }} />
//               <span>Processing...</span>
//             </Box>
//           ) : (
//             "Proceed to Payment"
//           )}
//         </Button>

//         {/* Trust line */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: 0.6,
//             mt: 1.4,
//           }}
//         >
//           <LockOutlinedIcon sx={{ fontSize: 11, color: "#a0b8a0" }} />
//           <Typography fontSize={11.5} color="#a0b8a0" fontWeight={500}>
//             100% secure & encrypted checkout
//           </Typography>
//         </Box>

//       </Box>
//     </Box>
//   );
// };

// export default PaymentFooter;










// components/checkout/PaymentFooter.jsx

import { useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { createOrder, createRazorpayOrder, verifyRazorpayPayment } from "../../api/AllApi";

import { useDispatch } from "react-redux";
import { clearCart } from "../../store/CartSlice";


const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};


const PaymentFooter = ({ total, userId, addressId }) => {
  const grandTotal = total ? Number(total) : null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handlePayment = async () => {
    setErrorMsg("");

    if (!userId) {
      setErrorMsg("User session not found. Please log in again.");
      return;
    }
    if (!addressId) {
      setErrorMsg("Please select a delivery address before proceeding.");
      return;
    }
    if (!grandTotal || grandTotal <= 0) {
      setErrorMsg("Invalid order total. Please check your cart.");
      return;
    }

    setLoading(true);

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setErrorMsg("Failed to load payment gateway. Please check your internet connection and try again.");
      setLoading(false);
      return;
    }

    try {
      // ── STEP 2: Only createRazorpayOrder — no DB order yet ──
      const myOrderRes = await createOrder({
              user_id: userId,
              address_id: addressId,
              total_amount: grandTotal,
            });
      console.log("myOrderRes",myOrderRes)
      console.log("myOrderRes2",myOrderRes.order_id)
      const razorpayOrderRes = await createRazorpayOrder({
        amount: grandTotal,
        order_id:myOrderRes.order_id
      });

      // ── STEP 3: Open Razorpay popup ──
      const options = {
        key: razorpayOrderRes.key,
        amount: razorpayOrderRes.amount,
        currency: "INR",
        name: "SM Veg Mart",
        description: "Order Payment",
        order_id: razorpayOrderRes.order_id,

        // ── STEP 4: Payment success — NOW create order, then verify ──
        handler: async function (razorpayResponse) {
          try {
            // ✅ createOrder fires only after payment succeeds
            

            await verifyRazorpayPayment({
              payment_id: razorpayResponse.razorpay_payment_id,
              razorpay_order_id: razorpayResponse.razorpay_order_id,
              order_id: myOrderRes.order_id,
              signature: razorpayResponse.razorpay_signature,
              amount: grandTotal,
            });

            dispatch(clearCart());

            navigate("/order-confirmation", {
              state: {
                order_number: myOrderRes.order_number,
                order_id: myOrderRes.order_id,
                total_amount: grandTotal,
                payment_id: razorpayResponse.razorpay_payment_id,
              },
            });

          } catch (verifyErr) {
            console.error("Order creation or verification failed:", verifyErr);
            setErrorMsg(
              "Payment received but order processing failed. Contact support with Payment ID: " +
                razorpayResponse.razorpay_payment_id
            );
          } finally {
            setLoading(false);
          }
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
            setErrorMsg("Payment cancelled. You can try again.");
          },
        },

        theme: {
          color: "#2e7d32",
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.error("Razorpay payment failed:", response.error);
        setErrorMsg(
          `Payment failed: ${response.error.description}. Please try again.`
        );
        setLoading(false);
      });

      rzp.open();

    } catch (err) {
      console.error("Payment initiation error:", err);
      setErrorMsg("Something went wrong while initiating payment. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "16px",
        border: "1px solid #e2ece2",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          height: 4,
          background: "linear-gradient(90deg, #1b5e20, #4CAF50, #81c784)",
        }}
      />

      <Box sx={{ px: { xs: 2, sm: 2.5 }, py: 2.2 }}>

        {grandTotal !== null && grandTotal > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1.8,
              px: 0.5,
            }}
          >
            <Box>
              <Typography fontSize={11.5} color="#8a9e8a" fontWeight={500}>
                Total amount
              </Typography>
              <Typography fontSize={20} fontWeight={800} color="#1b5e20" lineHeight={1.2}>
                ₹ {grandTotal}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography fontSize={11.5} color="#8a9e8a">
                Delivery
              </Typography>
              <Typography fontSize={13} fontWeight={700} color="#2e7d32">
                FREE
              </Typography>
            </Box>
          </Box>
        )}

        {errorMsg && (
          <Box
            sx={{
              backgroundColor: "#fff3f3",
              border: "1px solid #ffcdd2",
              borderRadius: "10px",
              px: 1.5,
              py: 1,
              mb: 1.5,
            }}
          >
            <Typography fontSize={12.5} color="#c62828" fontWeight={500}>
              {errorMsg}
            </Typography>
          </Box>
        )}

        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handlePayment}
          disabled={loading}
          endIcon={loading ? null : <ArrowForwardIcon sx={{ fontSize: "18px !important" }} />}
          startIcon={loading ? null : <LockOutlinedIcon sx={{ fontSize: "16px !important" }} />}
          sx={{
            background: loading
              ? "#a5d6a7"
              : "linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #43a047 100%)",
            fontWeight: 800,
            fontSize: { xs: 14.5, sm: 15.5 },
            textTransform: "none",
            py: 1.7,
            borderRadius: "12px",
            letterSpacing: 0.3,
            boxShadow: loading ? "none" : "0 6px 20px rgba(46,125,50,0.38)",
            transition: "all 0.2s ease",
            "&:hover": {
              background: loading
                ? "#a5d6a7"
                : "linear-gradient(135deg, #163d18 0%, #255b27 50%, #388e3c 100%)",
              boxShadow: loading ? "none" : "0 8px 28px rgba(46,125,50,0.48)",
              transform: loading ? "none" : "translateY(-1px)",
            },
            "&:active": {
              transform: "translateY(0)",
              boxShadow: "0 4px 14px rgba(46,125,50,0.3)",
            },
            "&.Mui-disabled": {
              color: "#fff",
            },
          }}
        >
          {loading ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CircularProgress size={18} sx={{ color: "#fff" }} />
              <span>Processing...</span>
            </Box>
          ) : (
            "Proceed to Payment"
          )}
        </Button>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.6,
            mt: 1.4,
          }}
        >
          <LockOutlinedIcon sx={{ fontSize: 11, color: "#a0b8a0" }} />
          <Typography fontSize={11.5} color="#a0b8a0" fontWeight={500}>
            100% secure & encrypted checkout
          </Typography>
        </Box>

      </Box>
    </Box>
  );
};

export default PaymentFooter;