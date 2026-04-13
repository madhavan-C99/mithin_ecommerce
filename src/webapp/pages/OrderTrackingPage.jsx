// import {
//   Box,
//   Typography,
//   Chip,
//   Divider,
//   Skeleton,
//   Avatar,
//   Paper,
// } from "@mui/material";
// import {
//   LocalShipping,
//   LocationOn,
//   Phone,
//   Receipt,
//   CheckCircle,
//   Schedule,
//   Inventory,
//   DirectionsBike,
// } from "@mui/icons-material";
// import useOrderTracking from "../hooks/UseOrderTracking";
// import AccountNavbar from "../components/account/AccountNavbar"

// // ─── Status config ────────────────────────────────────────────────────────────
// const STATUS_CONFIG = {
//   Pending: {
//     color: "#FF8C00",
//     bg: "#FFF3E0",
//     icon: <Schedule sx={{ fontSize: 14 }} />,
//     step: 0,
//   },
//   Confirmed: {
//     color: "#1976D2",
//     bg: "#E3F2FD",
//     icon: <CheckCircle sx={{ fontSize: 14 }} />,
//     step: 1,
//   },
//   Out_For_Delivery: {
//     color: "#7B1FA2",
//     bg: "#F3E5F5",
//     icon: <DirectionsBike sx={{ fontSize: 14 }} />,
//     step: 2,
//   },
//   Delivered: {
//     color: "#2E7D32",
//     bg: "#E8F5E9",
//     icon: <CheckCircle sx={{ fontSize: 14 }} />,
//     step: 3,
//   },
// };

// const STEPS = ["Pending", "Confirmed", "Out_For_Delivery", "Delivered"];

// // ─── Progress Stepper ─────────────────────────────────────────────────────────
// function OrderStepper({ status }) {
//   const config = STATUS_CONFIG[status] || STATUS_CONFIG["Pending"];
//   const currentStep = config.step;

//   return (
//     <Box sx={{ mt: 2, mb: 1 }}>
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           position: "relative",
//         }}
//       >
//         {/* background track */}
//         <Box
//           sx={{
//             position: "absolute",
//             top: "30%",
//             left: "10%",
//             right: "10%",
//             height: 3,
//             bgcolor: "#E0E0E0",
//             transform: "translateY(-50%)",
//             borderRadius: 2,
//           }}
//         />
//         {/* filled track */}
//         <Box
//           sx={{
//             position: "absolute",
//             top: "30%",
//             left: "10%",
//             width: `${(currentStep / 3) * 80}%`,
//             height: 3,
//             bgcolor: config.color,
//             transform: "translateY(-50%)",
//             borderRadius: 2,
//             transition: "width 0.6s ease",
//           }}
//         />

//         {STEPS.map((step, i) => {
//           const done = i <= currentStep;
//           return (
//             <Box
//               key={step}
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 gap: 0.5,
//                 zIndex: 1,
//                 minWidth: 60,
//               }}
//             >
//               <Box
//                 sx={{
//                   width: 28,
//                   height: 28,
//                   borderRadius: "50%",
//                   bgcolor: done ? config.color : "#E0E0E0",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   transition: "background-color 0.4s ease",
//                   boxShadow: done ? `0 0 0 3px ${config.color}30` : "none",
//                 }}
//               >
//                 {done ? (
//                   <CheckCircle sx={{ fontSize: 16, color: "#fff" }} />
//                 ) : (
//                   <Box
//                     sx={{
//                       width: 8,
//                       height: 8,
//                       borderRadius: "50%",
//                       bgcolor: "#BDBDBD",
//                     }}
//                   />
//                 )}
//               </Box>
//               <Typography
//                 sx={{
//                   fontSize: "0.65rem",
//                   fontWeight: done ? 600 : 400,
//                   color: done ? config.color : "#9E9E9E",
//                   textAlign: "center",
//                   lineHeight: 1.2,
//                   fontFamily: "'DM Sans', sans-serif",
//                 }}
//               >
//                 {step}
//               </Typography>
//             </Box>
//           );
//         })}
//       </Box>
//     </Box>
//   );
// }

// // ─── Single Order Card ────────────────────────────────────────────────────────
// function OrderCard({ order }) {
//   const config = STATUS_CONFIG[order.status] || STATUS_CONFIG["Pending"];

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         mb: 2.5,
//         borderRadius: "16px",
//         border: "1.5px solid #F0F0F0",
//         overflow: "hidden",
//         transition: "box-shadow 0.2s ease",
//         "&:hover": {
//           boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
//         },
//       }}
//     >
//       {/* ── Card Header ── */}
//       <Box
//         sx={{
//           px: 2.5,
//           py: 1.8,
//           background: `linear-gradient(135deg, ${config.bg} 0%, #FAFAFA 100%)`,
//           borderBottom: "1px solid #F0F0F0",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "flex-start",
//           flexWrap: "wrap",
//           gap: 1,
//         }}
//       >
//         <Box>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <Receipt sx={{ fontSize: 16, color: config.color }} />
//             <Typography
//               sx={{
//                 fontWeight: 700,
//                 fontSize: "0.95rem",
//                 fontFamily: "'DM Sans', sans-serif",
//                 color: "#1A1A1A",
//               }}
//             >
//               Order number: {order.order_number}
//             </Typography>
//           </Box>
//           {order.order_number && (
//             <Typography
//               sx={{
//                 fontSize: "0.72rem",
//                 color: "#9E9E9E",
//                 mt: 0.2,
//                 fontFamily: "'DM Sans', sans-serif",
//               }}
//             >
//               Ref: {order.order_number}
//             </Typography>
//           )}
//         </Box>

//         <Chip
//           icon={config.icon}
//           label={order.status}
//           size="small"
//           sx={{
//             bgcolor: config.bg,
//             color: config.color,
//             fontWeight: 700,
//             fontSize: "0.72rem",
//             border: `1.5px solid ${config.color}40`,
//             fontFamily: "'DM Sans', sans-serif",
//             "& .MuiChip-icon": { color: config.color },
//           }}
//         />
//       </Box>

//       {/* ── Stepper ── */}
//       <Box sx={{ px: 2.5, pt: 1.5, pb: 0.5 }}>
//         <OrderStepper status={order.status} />
//       </Box>

//       <Divider sx={{ mx: 2.5, borderStyle: "dashed" }} />

//       {/* ── Items ── */}
//       <Box sx={{ px: 2.5, pt: 1.5, pb: 1 }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 1.2 }}>
//           <Inventory sx={{ fontSize: 14, color: "#9E9E9E" }} />
//           <Typography
//             sx={{
//               fontSize: "0.72rem",
//               fontWeight: 600,
//               color: "#9E9E9E",
//               textTransform: "uppercase",
//               letterSpacing: 0.8,
//               fontFamily: "'DM Sans', sans-serif",
//             }}
//           >
//             {order.items?.length} Item{order.items?.length !== 1 ? "s" : ""}
//           </Typography>
//         </Box>

//         {order.items?.map((item, i) => (
//           <Box
//             key={i}
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1.5,
//               mb: 1.2,
//               p: 1,
//               borderRadius: "10px",
//               bgcolor: i % 2 === 0 ? "#FAFAFA" : "transparent",
//             }}
//           >
//             <Avatar
//               src={item.image}
//               alt={item.name}
//               variant="rounded"
//               sx={{
//                 width: 52,
//                 height: 52,
//                 borderRadius: "10px",
//                 border: "1px solid #EFEFEF",
//                 "& img": { objectFit: "cover" },
//               }}
//             />
//             <Box sx={{ flex: 1, minWidth: 0 }}>
//               <Typography
//                 sx={{
//                   fontSize: "0.88rem",
//                   fontWeight: 600,
//                   color: "#1A1A1A",
//                   fontFamily: "'DM Sans', sans-serif",
//                   whiteSpace: "nowrap",
//                   overflow: "hidden",
//                   textOverflow: "ellipsis",
//                 }}
//               >
//                 {item.name}
//               </Typography>
//               <Box sx={{ display: "flex", gap: 1.5, mt: 0.3, flexWrap: "wrap" }}>
//                 <Typography
//                   sx={{
//                     fontSize: "0.75rem",
//                     color: "#757575",
//                     fontFamily: "'DM Sans', sans-serif",
//                   }}
//                 >
//                   Qty: <b>{item.qty}</b>
//                 </Typography>
//                 {item.weight && (
//                   <Typography
//                     sx={{
//                       fontSize: "0.75rem",
//                       color: "#757575",
//                       fontFamily: "'DM Sans', sans-serif",
//                     }}
//                   >
//                     {item.weight} kg
//                   </Typography>
//                 )}
//               </Box>
//             </Box>
//             <Typography
//               sx={{
//                 fontSize: "0.9rem",
//                 fontWeight: 700,
//                 color: "#1A1A1A",
//                 fontFamily: "'DM Sans', sans-serif",
//                 whiteSpace: "nowrap",
//               }}
//             >
//               ₹{parseFloat(item.price).toFixed(2)}
//             </Typography>
//           </Box>
//         ))}
//       </Box>

//       <Divider sx={{ mx: 2.5, borderStyle: "dashed" }} />

//       {/* ── Address & Total Row ── */}
//       <Box
//         sx={{
//           px: 2.5,
//           py: 1.5,
//           display: "flex",
//           gap: 2,
//           flexWrap: "wrap",
//           justifyContent: "space-between",
//           alignItems: "flex-start",
//         }}
//       >
//         {/* Address block */}
//         {order.address && (
//           <Box sx={{ flex: "1 1 200px", minWidth: 0 }}>
//             <Box
//               sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}
//             >
//               <LocationOn sx={{ fontSize: 14, color: "#9E9E9E" }} />
//               <Typography
//                 sx={{
//                   fontSize: "0.7rem",
//                   fontWeight: 600,
//                   color: "#9E9E9E",
//                   textTransform: "uppercase",
//                   letterSpacing: 0.8,
//                   fontFamily: "'DM Sans', sans-serif",
//                 }}
//               >
//                 Delivery Address
//               </Typography>
//             </Box>
//             <Typography
//               sx={{
//                 fontSize: "0.82rem",
//                 fontWeight: 600,
//                 color: "#1A1A1A",
//                 fontFamily: "'DM Sans', sans-serif",
//               }}
//             >
//               {order.address.name}
//             </Typography>
//             <Typography
//               sx={{
//                 fontSize: "0.78rem",
//                 color: "#555",
//                 lineHeight: 1.5,
//                 fontFamily: "'DM Sans', sans-serif",
//               }}
//             >
//               {order.address.address_line1}
//               {order.address.address_line2
//                 ? `, ${order.address.address_line2}`
//                 : ""}
//               <br />
//               {order.address.city}, {order.address.state} —{" "}
//               {order.address.pincode}
//             </Typography>
//             {order.address.mobile && (
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 0.5,
//                   mt: 0.4,
//                 }}
//               >
//                 <Phone sx={{ fontSize: 12, color: "#9E9E9E" }} />
//                 <Typography
//                   sx={{
//                     fontSize: "0.75rem",
//                     color: "#757575",
//                     fontFamily: "'DM Sans', sans-serif",
//                   }}
//                 >
//                   {order.address.mobile}
//                 </Typography>
//               </Box>
//             )}
//           </Box>
//         )}

//         {/* Total block */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "flex-end",
//             justifyContent: "flex-end",
//             gap: 0.3,
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 0.8,
//               bgcolor: config.bg,
//               border: `1.5px solid ${config.color}30`,
//               borderRadius: "10px",
//               px: 1.8,
//               py: 0.8,
//             }}
//           >
//             <LocalShipping sx={{ fontSize: 16, color: config.color }} />
//             <Typography
//               sx={{
//                 fontSize: "1rem",
//                 fontWeight: 800,
//                 color: config.color,
//                 fontFamily: "'DM Sans', sans-serif",
//               }}
//             >
//               ₹{parseFloat(order.grand_total).toFixed(2)}
//             </Typography>
//           </Box>
//           <Typography
//             sx={{
//               fontSize: "0.65rem",
//               color: "#BDBDBD",
//               fontFamily: "'DM Sans', sans-serif",
//             }}
//           >
//             Grand Total
//           </Typography>
//         </Box>
//       </Box>
//     </Paper>
//   );
// }

// // ─── Loading Skeleton ─────────────────────────────────────────────────────────
// function OrderSkeleton() {
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         mb: 2.5,
//         borderRadius: "16px",
//         border: "1.5px solid #F0F0F0",
//         p: 2.5,
//       }}
//     >
//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
//         <Skeleton variant="text" width={120} height={24} />
//         <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: 8 }} />
//       </Box>
//       <Skeleton variant="rounded" height={6} sx={{ mb: 2, borderRadius: 3 }} />
//       <Box sx={{ display: "flex", gap: 1.5, mb: 1.5 }}>
//         <Skeleton variant="rounded" width={52} height={52} sx={{ borderRadius: "10px" }} />
//         <Box sx={{ flex: 1 }}>
//           <Skeleton variant="text" width="60%" />
//           <Skeleton variant="text" width="40%" />
//         </Box>
//       </Box>
//       <Skeleton variant="text" width="50%" />
//       <Skeleton variant="text" width="70%" />
//     </Paper>
//   );
// }

// // ─── Main Page ────────────────────────────────────────────────────────────────
// export default function OrderTrackingPage() {
//   const { orders, loading } = useOrderTracking();

//   return (
//     <>
//     <AccountNavbar/>
//     <Box
//       sx={{
//         maxWidth: 720,
//         mx: "auto",
//         px: { xs: 2, sm: 3 },
//         py: 3,
//         fontFamily: "'DM Sans', sans-serif",
//       }}
//     >
//       {/* Page Header */}
//       <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1.5 }}>
//         <Box
//           sx={{
//             width: 40,
//             height: 40,
//             borderRadius: "12px",
//             bgcolor: "#FFF3E0",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <LocalShipping sx={{ color: "#FF8C00", fontSize: 20 }} />
//         </Box>
//         <Box>
//           <Typography
//             sx={{
//               fontWeight: 800,
//               fontSize: "1.3rem",
//               color: "#1A1A1A",
//               fontFamily: "'DM Sans', sans-serif",
//               lineHeight: 1.2,
//             }}
//           >
//             My Orders
//           </Typography>
//           {/* <Typography
//             sx={{
//               fontSize: "0.78rem",
//               color: "#9E9E9E",
//               fontFamily: "'DM Sans', sans-serif",
//             }}
//           >
//             Real-time order tracking
//           </Typography> */}
//         </Box>
//       </Box>

//       {/* Loading state */}
//       {loading && (
//         <>
//           <OrderSkeleton />
//           <OrderSkeleton />
//         </>
//       )}

//       {/* Empty state */}
//       {!loading && orders.length === 0 && (
//         <Paper
//           elevation={0}
//           sx={{
//             textAlign: "center",
//             py: 8,
//             borderRadius: "16px",
//             border: "1.5px dashed #E0E0E0",
//           }}
//         >
//           <LocalShipping sx={{ fontSize: 48, color: "#E0E0E0", mb: 1.5 }} />
//           <Typography
//             sx={{
//               fontWeight: 600,
//               color: "#9E9E9E",
//               fontFamily: "'DM Sans', sans-serif",
//             }}
//           >
//             No active orders
//           </Typography>
//           <Typography
//             sx={{
//               fontSize: "0.82rem",
//               color: "#BDBDBD",
//               mt: 0.5,
//               fontFamily: "'DM Sans', sans-serif",
//             }}
//           >
//             Your orders will appear here once placed
//           </Typography>
//         </Paper>
//       )}

//       {/* Orders list */}
//       {!loading &&
//         orders.map((order) => (
//           <OrderCard key={order.order_number} order={order} />
//         ))}
//     </Box>
//     </>
//   );
// }










import {
  Box,
  Typography,
  Chip,
  Divider,
  Skeleton,
  Avatar,
  Paper,
  Container,
} from "@mui/material";
import {
  LocalShipping,
  LocationOn,
  Phone,
  Receipt,
  CheckCircle,
  Schedule,
  Inventory,
  DirectionsBike,
} from "@mui/icons-material";
import useOrderTracking from "../hooks/UseOrderTracking";
import AccountNavbar from "../components/account/AccountNavbar";

// ─── Status config ────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  Pending: {
    color: "#FF8C00",
    bg: "#FFF3E0",
    icon: <Schedule sx={{ fontSize: 14 }} />,
    step: 0,
  },
  Confirmed: {
    color: "#1976D2",
    bg: "#E3F2FD",
    icon: <CheckCircle sx={{ fontSize: 14 }} />,
    step: 1,
  },
  Out_For_Delivery: {
    color: "#7B1FA2",
    bg: "#F3E5F5",
    icon: <DirectionsBike sx={{ fontSize: 14 }} />,
    step: 2,
  },
  Delivered: {
    color: "#2E7D32",
    bg: "#E8F5E9",
    icon: <CheckCircle sx={{ fontSize: 14 }} />,
    step: 3,
  },
};

const STEPS = ["Pending", "Confirmed", "Out for\nDelivery", "Delivered"];
const STEP_KEYS = ["Pending", "Confirmed", "Out_For_Delivery", "Delivered"];

// ─── Progress Stepper ─────────────────────────────────────────────────────────
function OrderStepper({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG["Pending"];
  const currentStep = config.step;

  return (
    <Box sx={{ mt: 2, mb: 1, px: { xs: 0.5, sm: 1 } }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        {/* background track */}
        <Box
          sx={{
            position: "absolute",
            top: 14,                    // half of dot height (28/2)
            left: "12.5%",             // centre of first dot
            right: "12.5%",            // centre of last dot
            height: 3,
            bgcolor: "#E0E0E0",
            transform: "translateY(-50%)",
            borderRadius: 2,
          }}
        />
        {/* filled track */}
        <Box
          sx={{
            position: "absolute",
            top: 14,
            left: "12.5%",
            width: `${(currentStep / 3) * 75}%`,
            height: 3,
            bgcolor: config.color,
            transform: "translateY(-50%)",
            borderRadius: 2,
            transition: "width 0.6s ease",
          }}
        />

        {STEPS.map((label, i) => {
          const done = i <= currentStep;
          return (
            <Box
              key={STEP_KEYS[i]}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.5,
                zIndex: 1,
                flex: 1,               // equal width, no minWidth overflow
              }}
            >
              <Box
                sx={{
                  width: { xs: 24, sm: 28 },
                  height: { xs: 24, sm: 28 },
                  borderRadius: "50%",
                  bgcolor: done ? config.color : "#E0E0E0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background-color 0.4s ease",
                  boxShadow: done ? `0 0 0 3px ${config.color}30` : "none",
                  flexShrink: 0,
                }}
              >
                {done ? (
                  <CheckCircle sx={{ fontSize: { xs: 13, sm: 16 }, color: "#fff" }} />
                ) : (
                  <Box
                    sx={{
                      width: { xs: 6, sm: 8 },
                      height: { xs: 6, sm: 8 },
                      borderRadius: "50%",
                      bgcolor: "#BDBDBD",
                    }}
                  />
                )}
              </Box>
              <Typography
                sx={{
                  fontSize: { xs: "0.58rem", sm: "0.65rem" },
                  fontWeight: done ? 600 : 400,
                  color: done ? config.color : "#9E9E9E",
                  textAlign: "center",
                  lineHeight: 1.2,
                  whiteSpace: "pre-line",  // allows \n line break
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

// ─── Single Order Card ────────────────────────────────────────────────────────
function OrderCard({ order }) {
  const config = STATUS_CONFIG[order.status] || STATUS_CONFIG["Pending"];

  return (
    <Paper
      elevation={0}
      sx={{
        mb: { xs: 2, sm: 2.5 },
        borderRadius: { xs: "12px", sm: "16px" },
        border: "1.5px solid #F0F0F0",
        overflow: "hidden",
        transition: "box-shadow 0.2s ease",
        "&:hover": {
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        },
      }}
    >
      {/* ── Card Header ── */}
      <Box
        sx={{
          px: { xs: 1.8, sm: 2.5 },
          py: { xs: 1.4, sm: 1.8 },
          background: `linear-gradient(135deg, ${config.bg} 0%, #FAFAFA 100%)`,
          borderBottom: "1px solid #F0F0F0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",        // always centred, no wrap needed
          gap: 1,
        }}
      >
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
            <Receipt sx={{ fontSize: { xs: 14, sm: 16 }, color: config.color, flexShrink: 0 }} />
            <Typography
              noWrap
              sx={{
                fontWeight: 700,
                fontSize: { xs: "0.82rem", sm: "0.95rem" },
                fontFamily: "'DM Sans', sans-serif",
                color: "#1A1A1A",
              }}
            >
              {order.order_number}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: { xs: "0.68rem", sm: "0.72rem" },
              color: "#9E9E9E",
              mt: 0.2,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Ref: {order.order_number}
          </Typography>
        </Box>

        {/* Chip — flexShrink:0 so it never squishes */}
        <Chip
          icon={config.icon}
          label={order.status}
          size="small"
          sx={{
            flexShrink: 0,
            bgcolor: config.bg,
            color: config.color,
            fontWeight: 700,
            fontSize: { xs: "0.65rem", sm: "0.72rem" },
            height: { xs: 22, sm: 24 },
            border: `1.5px solid ${config.color}40`,
            fontFamily: "'DM Sans', sans-serif",
            "& .MuiChip-icon": { color: config.color },
          }}
        />
      </Box>

      {/* ── Stepper ── */}
      <Box sx={{ px: { xs: 1.5, sm: 2.5 }, pt: 1.5, pb: 0.5 }}>
        <OrderStepper status={order.status} />
      </Box>

      <Divider sx={{ mx: { xs: 1.8, sm: 2.5 }, borderStyle: "dashed" }} />

      {/* ── Items ── */}
      <Box sx={{ px: { xs: 1.8, sm: 2.5 }, pt: 1.5, pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 1.2 }}>
          <Inventory sx={{ fontSize: 14, color: "#9E9E9E" }} />
          <Typography
            sx={{
              fontSize: "0.72rem",
              fontWeight: 600,
              color: "#9E9E9E",
              textTransform: "uppercase",
              letterSpacing: 0.8,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {order.items?.length} Item{order.items?.length !== 1 ? "s" : ""}
          </Typography>
        </Box>

        {order.items?.map((item, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1.2, sm: 1.5 },
              mb: 1.2,
              p: { xs: 0.8, sm: 1 },
              borderRadius: "10px",
              bgcolor: i % 2 === 0 ? "#FAFAFA" : "transparent",
            }}
          >
            <Avatar
              src={item.image}
              alt={item.name}
              variant="rounded"
              sx={{
                width: { xs: 44, sm: 52 },
                height: { xs: 44, sm: 52 },
                borderRadius: "10px",
                border: "1px solid #EFEFEF",
                flexShrink: 0,
                "& img": { objectFit: "cover" },
              }}
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: { xs: "0.82rem", sm: "0.88rem" },
                  fontWeight: 600,
                  color: "#1A1A1A",
                  fontFamily: "'DM Sans', sans-serif",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.name}
              </Typography>
              <Box sx={{ display: "flex", gap: 1.5, mt: 0.3 }}>
                <Typography
                  sx={{
                    fontSize: { xs: "0.7rem", sm: "0.75rem" },
                    color: "#757575",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Qty: <b>{item.qty}</b>
                </Typography>
                {item.weight && (
                  <Typography
                    sx={{
                      fontSize: { xs: "0.7rem", sm: "0.75rem" },
                      color: "#757575",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {item.weight} kg
                  </Typography>
                )}
              </Box>
            </Box>
            <Typography
              sx={{
                fontSize: { xs: "0.84rem", sm: "0.9rem" },
                fontWeight: 700,
                color: "#1A1A1A",
                fontFamily: "'DM Sans', sans-serif",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              ₹{parseFloat(item.price).toFixed(2)}
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ mx: { xs: 1.8, sm: 2.5 }, borderStyle: "dashed" }} />

      {/* ── Address & Total Row ── */}
      <Box
        sx={{
          px: { xs: 1.8, sm: 2.5 },
          py: { xs: 1.2, sm: 1.5 },
          display: "flex",
          gap: { xs: 1.5, sm: 2 },
          flexWrap: "nowrap",          // stays one row always
          justifyContent: "space-between",
          alignItems: "flex-end",      // total badge aligns to bottom
        }}
      >
        {/* Address block */}
        {order.address && (
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
              <LocationOn sx={{ fontSize: 13, color: "#9E9E9E", flexShrink: 0 }} />
              <Typography
                sx={{
                  fontSize: { xs: "0.63rem", sm: "0.7rem" },
                  fontWeight: 600,
                  color: "#9E9E9E",
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Delivery Address
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: { xs: "0.78rem", sm: "0.82rem" },
                fontWeight: 600,
                color: "#1A1A1A",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {order.address.name}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.72rem", sm: "0.78rem" },
                color: "#555",
                lineHeight: 1.5,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {order.address.address_line1}
              {order.address.address_line2 ? `, ${order.address.address_line2}` : ""}
              <br />
              {order.address.city}, {order.address.state} — {order.address.pincode}
            </Typography>
            {order.address.mobile && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.4 }}>
                <Phone sx={{ fontSize: 12, color: "#9E9E9E", flexShrink: 0 }} />
                <Typography
                  sx={{
                    fontSize: { xs: "0.7rem", sm: "0.75rem" },
                    color: "#757575",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {order.address.mobile}
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {/* Total block — fixed width, never squishes address */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 0.3,
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.6,
              bgcolor: config.bg,
              border: `1.5px solid ${config.color}30`,
              borderRadius: "10px",
              px: { xs: 1.2, sm: 1.8 },
              py: { xs: 0.6, sm: 0.8 },
            }}
          >
            <LocalShipping sx={{ fontSize: { xs: 14, sm: 16 }, color: config.color }} />
            <Typography
              sx={{
                fontSize: { xs: "0.88rem", sm: "1rem" },
                fontWeight: 800,
                color: config.color,
                fontFamily: "'DM Sans', sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              ₹{parseFloat(order.grand_total).toFixed(2)}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: "0.63rem",
              color: "#BDBDBD",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Grand Total
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────
function OrderSkeleton() {
  return (
    <Paper
      elevation={0}
      sx={{
        mb: { xs: 2, sm: 2.5 },
        borderRadius: { xs: "12px", sm: "16px" },
        border: "1.5px solid #F0F0F0",
        p: { xs: 2, sm: 2.5 },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
        <Skeleton variant="text" width={120} height={24} />
        <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: 8 }} />
      </Box>
      <Skeleton variant="rounded" height={6} sx={{ mb: 2, borderRadius: 3 }} />
      <Box sx={{ display: "flex", gap: 1.5, mb: 1.5 }}>
        <Skeleton variant="rounded" width={52} height={52} sx={{ borderRadius: "10px" }} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </Box>
      </Box>
      <Skeleton variant="text" width="50%" />
      <Skeleton variant="text" width="70%" />
    </Paper>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function OrderTrackingPage() {
  const { orders, loading } = useOrderTracking();

  return (
    <>
      <AccountNavbar />

      <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", py: { xs: 2, sm: 3, md: 4 } }}>
        <Container maxWidth="xl" sx={{ px: { xs: 1.5, sm: 2, md: 3 } }}>

          {/* Page Header */}
          <Box sx={{ mb: { xs: 2, sm: 3 }, display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: { xs: 36, sm: 40 },
                height: { xs: 36, sm: 40 },
                borderRadius: "12px",
                bgcolor: "#FFF3E0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <LocalShipping sx={{ color: "#FF8C00", fontSize: { xs: 18, sm: 20 } }} />
            </Box>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
                color: "#1A1A1A",
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1.2,
              }}
            >
              My Orders
            </Typography>
          </Box>

          {/* Loading */}
          {loading && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
                gap: { xs: 0, sm: 2 },
              }}
            >
              <OrderSkeleton />
              <OrderSkeleton />
            </Box>
          )}

          {/* Empty state */}
          {!loading && orders.length === 0 && (
            <Paper
              elevation={0}
              sx={{
                textAlign: "center",
                py: { xs: 6, sm: 8 },
                borderRadius: "16px",
                border: "1.5px dashed #E0E0E0",
              }}
            >
              <LocalShipping sx={{ fontSize: { xs: 40, sm: 48 }, color: "#E0E0E0", mb: 1.5 }} />
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "#9E9E9E",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                No active orders
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.82rem",
                  color: "#BDBDBD",
                  mt: 0.5,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Your orders will appear here once placed
              </Typography>
            </Paper>
          )}

          {/* Orders — 1 col mobile, 2 col desktop */}
          {!loading && orders.length > 0 && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", lg: "1fr" },
                gap: { xs: 0, sm: 2, md: 2.5 },
                alignItems: "start",   // cards don't stretch to match partner height
                maxWidth: "1000px",
                mx: "auto"
              }}
            >
              {orders.map((order) => (
                <OrderCard key={order.order_number} order={order} />
              ))}
            </Box>
          )}

        </Container>
      </Box>
    </>
  );
}