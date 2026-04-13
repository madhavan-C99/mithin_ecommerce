// // // // components/checkout/BillSummary.jsx

// // // import { Paper, Typography, Box } from "@mui/material";

// // // const BillSummary = ({ summary }) => {
// // //   if (!summary) return null;

// // //   return (
// // //     <Paper sx={{ p: 2 }}>
// // //       <Typography fontWeight={600}>Bill Summary</Typography>

// // //       <Box mt={2}>
// // //         <Typography>
// // //           Items: {summary.items_count}
// // //         </Typography>

// // //         <Typography>
// // //           Total: ₹ {summary.overall_total}
// // //         </Typography>
// // //       </Box>
// // //     </Paper>
// // //   );
// // // };

// // // export default BillSummary;








// // // ─────────────────────────────────────────────
// // // FILE: components/checkout/BillSummary.jsx
// // // ─────────────────────────────────────────────

// // import { Paper, Typography, Box, Divider } from "@mui/material";
// // import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
// // import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
 
// // const BillSummary = ({ summary }) => {
// //   if (!summary) return null;
 
// //   const savings = summary.mrp_total - summary.overall_total;
 
// //   return (
// //     <Paper elevation={0}
// //       sx={{ p: 2.5, border: "1px solid #e5e7eb", borderRadius: 2, backgroundColor: "#fff", position: "sticky", top: 80 }}>
 
// //       {/* // Cart header */}
// //       <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
// //         <ShoppingBagOutlinedIcon sx={{ fontSize: 20, color: "#4CAF50" }} />
// //         <Typography fontWeight={700} fontSize={15}>
// //           Your Cart
// //         </Typography>
// //         <Typography fontSize={13} color="text.secondary">
// //           {summary.items_count} item(s)
// //         </Typography>
// //       </Box>
// //       <Divider sx={{ mb: 2 }} />
 
// //       {/* // Bill rows */}
// //       <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
 
// //         <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// //           <Typography fontSize={14} color="text.secondary">Items total</Typography>
// //           <Box sx={{ textAlign: "right" }}>
// //             {summary.mrp_total && (
// //               <Typography component="span" fontSize={13}
// //                 sx={{ textDecoration: "line-through", color: "#aaa", mr: 1 }}>
// //                 ₹{summary.mrp_total}
// //               </Typography>
// //             )}
// //             <Typography component="span" fontSize={14} fontWeight={500}>
// //               ₹{summary.overall_total}
// //             </Typography>
// //           </Box>
// //         </Box>
 
// //         <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// //           <Typography fontSize={14} color="text.secondary">Convenience charge</Typography>
// //           <Typography fontSize={14} fontWeight={500}>₹12</Typography>
// //         </Box>
 
// //         <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// //           <Typography fontSize={14} color="text.secondary">Shipping</Typography>
// //           <Typography fontSize={14} fontWeight={600} color="#2e7d32">FREE</Typography>
// //         </Box>
 
// //       </Box>
 
// //       <Divider sx={{ my: 2 }} />
 
// //       {/* // Grand total */}
// //       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
// //         <Typography fontWeight={700} fontSize={15}>Amount payable</Typography>
// //         <Typography fontWeight={700} fontSize={16}>
// //           ₹{(summary.overall_total + 12).toFixed(0)}
// //         </Typography>
// //       </Box>
 
// //       {/* // Savings pill */}
// //       {savings > 0 && (
// //         <Box sx={{
// //           backgroundColor: "#e8f5e9",
// //           borderRadius: 2,
// //           px: 2, py: 1,
// //           display: "flex", alignItems: "center", gap: 1
// //         }}>
// //           <LocalOfferOutlinedIcon sx={{ fontSize: 16, color: "#2e7d32" }} />
// //           <Typography fontSize={13} fontWeight={600} color="#2e7d32">
// //             You saved ₹{savings.toFixed(0)} on this order 🎉
// //           </Typography>
// //         </Box>
// //       )}
 
// //       {/* // Coupons row */}
// //       {/* <Box sx={{
// //         mt: 2, p: 1.5,
// //         border: "1.5px dashed #c8e6c9",
// //         borderRadius: 2,
// //         display: "flex", justifyContent: "space-between", alignItems: "center",
// //         cursor: "pointer",
// //         "&:hover": { backgroundColor: "#f9fef9" }
// //       }}>
// //         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// //           <Typography fontSize={18}>🏷️</Typography>
// //           <Typography fontSize={13} fontWeight={600} color="#388e3c">Coupons for you</Typography>
// //         </Box>
// //         <Typography fontSize={13} fontWeight={600} color="#4CAF50">View All →</Typography>
// //       </Box> */}
 
// //     </Paper>
// //   );
// // };
 
// // export default BillSummary;





// import { Paper, Typography, Box, Divider } from "@mui/material";
// import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

// const BillSummary = ({ summary }) => {
//   if (!summary) return null;

//   const total = Number(summary.overall_total) || 0;
//   const mrp = Number(summary.mrp_total) || 0;
//   const savings = mrp > 0 ? mrp - total : 0;
//   const grandTotal = total + 12;

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         border: "1px solid #e0e0e0",
//         borderRadius: 3,
//         overflow: "hidden",
//         position: "sticky",
//         top: 80
//       }}
//     >
//       {/* Header */}
//       <Box
//         sx={{
//           backgroundColor: "#f9fdf9",
//           borderBottom: "1px solid #e0e0e0",
//           px: 2.5,
//           py: 2,
//           display: "flex",
//           alignItems: "center",
//           gap: 1
//         }}
//       >
//         <ShoppingBagOutlinedIcon sx={{ fontSize: 18, color: "#4CAF50" }} />
//         <Typography fontWeight={700} fontSize={14} color="#333">
//           Bill Summary
//         </Typography>
//         {summary.items_count && (
//           <Typography
//             fontSize={12}
//             sx={{
//               ml: "auto",
//               backgroundColor: "#e8f5e9",
//               color: "#2e7d32",
//               px: 1.2,
//               py: 0.3,
//               borderRadius: 10,
//               fontWeight: 600
//             }}
//           >
//             {summary.items_count} items
//           </Typography>
//         )}
//       </Box>

//       {/* Bill rows */}
//       <Box sx={{ px: 2.5, py: 2 }}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
//           <Typography fontSize={13.5} color="text.secondary">Items total</Typography>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             {mrp > 0 && (
//               <Typography
//                 fontSize={12}
//                 sx={{ textDecoration: "line-through", color: "#bbb" }}
//               >
//                 ₹{mrp}
//               </Typography>
//             )}
//             <Typography fontSize={13.5} fontWeight={500} color="#222">
//               ₹ {total}
//             </Typography>
//           </Box>
//         </Box>

//         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
//           <Typography fontSize={13.5} color="text.secondary">Convenience charge</Typography>
//           <Typography fontSize={13.5} fontWeight={500} color="#222">₹ 0</Typography>
//         </Box>

//         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
//           <Typography fontSize={13.5} color="text.secondary">Shipping</Typography>
//           <Typography fontSize={13.5} fontWeight={600} color="#2e7d32">FREE</Typography>
//         </Box>

//         <Divider sx={{ my: 2 }} />

//         <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//           <Typography fontSize={15} fontWeight={700} color="#111">
//             Amount payable
//           </Typography>
//           <Typography fontSize={15} fontWeight={700} color="#111">
//             ₹{grandTotal}
//           </Typography>
//         </Box>

//         {savings > 0 && (
//           <Box
//             sx={{
//               mt: 2,
//               backgroundColor: "#e8f5e9",
//               borderRadius: 2,
//               px: 2,
//               py: 1.2,
//               display: "flex",
//               alignItems: "center",
//               gap: 1
//             }}
//           >
//             <Typography fontSize={15}>🎉</Typography>
//             <Typography fontSize={13} fontWeight={600} color="#2e7d32">
//               You saved ₹{savings} on this order
//             </Typography>
//           </Box>
//         )}
//       </Box>
//     </Paper>
//   );
// };

// export default BillSummary;









// components/checkout/BillSummary.jsx
// Logic unchanged — only visual redesign

import { Box, Typography, Divider } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";

// ── helper row ──────────────────────────────────────────────
const BillRow = ({ label, value, valueColor = "#2a2a2a", labelColor = "#7a9a7a", bold = false }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      py: 0.9,
    }}
  >
    <Typography fontSize={13.5} color={labelColor} fontWeight={bold ? 700 : 400}>
      {label}
    </Typography>
    {typeof value === "string" ? (
      <Typography fontSize={13.5} fontWeight={bold ? 700 : 500} color={valueColor}>
        {value}
      </Typography>
    ) : (
      value
    )}
  </Box>
);

// ── component ────────────────────────────────────────────────
const BillSummary = ({ summary }) => {
  // API: { cart_id, items_count, overall_total }
  const itemsCount = summary?.items_count ?? 0;
  const total = Number(summary?.overall_total) || 0;
  const grandTotal = total; // convenience + shipping both FREE

  const isEmpty = !summary || itemsCount === 0;

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "16px",
        border: "1px solid #e2ece2",
        boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
        overflow: "hidden",
        position: { md: "sticky" },
        top: { md: 84 },
      }}
    >
      {/* ── Dark green header ── */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 60%, #388e3c 100%)",
          px: 2.5,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ShoppingBagOutlinedIcon sx={{ fontSize: 18, color: "rgba(255,255,255,0.85)" }} />
          <Typography fontWeight={700} fontSize={14.5} color="#fff" letterSpacing={0.2}>
            Bill Summary
          </Typography>
        </Box>
        {itemsCount > 0 && (
          <Box
            sx={{
              backgroundColor: "rgba(255,255,255,0.18)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "20px",
              px: 1.4,
              py: 0.3,
            }}
          >
            <Typography fontSize={11.5} fontWeight={700} color="#fff">
              {itemsCount} {itemsCount === 1 ? "item" : "items"}
            </Typography>
          </Box>
        )}
      </Box>

      {/* ── Body ── */}
      <Box sx={{ px: 2.5, pt: 2, pb: 2.5 }}>
        {isEmpty ? (
          <Typography fontSize={13.5} color="text.secondary" textAlign="center" py={2}>
            Your cart is empty
          </Typography>
        ) : (
          <>
            {/* Items total */}
            <BillRow label="Items total" value={`₹ ${total}`} />

            {/* Convenience charge */}
            <BillRow
              label="Convenience charge"
              value={
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                  <DiscountOutlinedIcon sx={{ fontSize: 13, color: "#4CAF50" }} />
                  <Typography fontSize={13.5} fontWeight={600} color="#2e7d32">
                    FREE
                  </Typography>
                </Box>
              }
            />

            {/* Delivery */}
            <BillRow
              label="Delivery charge"
              value={
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                  <LocalShippingOutlinedIcon sx={{ fontSize: 13, color: "#4CAF50" }} />
                  <Typography fontSize={13.5} fontWeight={600} color="#2e7d32">
                    FREE
                  </Typography>
                </Box>
              }
            />

            <Divider sx={{ my: 1.5, borderColor: "#eef4ee", borderStyle: "dashed" }} />

            {/* Grand total */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#f4faf4",
                border: "1px solid #d8eed8",
                borderRadius: "10px",
                px: 2,
                py: 1.4,
              }}
            >
              <Typography fontSize={14.5} fontWeight={700} color="#1a2e1a">
                Amount payable
              </Typography>
              <Typography fontSize={17} fontWeight={800} color="#1b5e20">
                ₹ {grandTotal}
              </Typography>
            </Box>

            {/* Savings note */}
            <Box
              sx={{
                mt: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 0.8,
                backgroundColor: "#f0faf0",
                border: "1px solid #c8e6c9",
                borderRadius: "10px",
                px: 1.8,
                py: 1,
              }}
            >
              <Typography fontSize={14}>🎉</Typography>
              <Typography fontSize={12.5} fontWeight={500} color="#2e7d32" lineHeight={1.5}>
                Shipping & convenience — both FREE on this order
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default BillSummary;