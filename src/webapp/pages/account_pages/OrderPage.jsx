// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Divider,
//   Avatar,
//   Chip,
//   CircularProgress,
//   Modal,
//   IconButton,
//   Grid,
//   Paper,
//   Fade,
//   Backdrop
// } from "@mui/material";

// import CloseIcon from "@mui/icons-material/Close";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import PhoneIcon from "@mui/icons-material/Phone";
// import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
// import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import InventoryIcon from "@mui/icons-material/Inventory";

// import { useEffect, useState } from "react";
// import { fetchPurchaseHistory } from "../../api/AllApi";

// /* ─── status colour helper ─────────────────────────────────────────── */
// const statusColor = (status) => {
//   switch (status) {
//     case "Delivered": return "success";
//     case "Cancelled": return "error";
//     case "Shipped":   return "info";
//     default:          return "warning";   // Pending / anything else
//   }
// };

// /* ─── tiny info row used inside the modal ──────────────────────────── */
// const InfoRow = ({ icon, label, value }) => (
//   <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.2, mb: 1 }}>
//     <Box sx={{ color: "primary.main", mt: 0.2, flexShrink: 0 }}>{icon}</Box>
//     <Box>
//       <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1 }}>
//         {label}
//       </Typography>
//       <Typography variant="body2" fontWeight={500}>
//         {value}
//       </Typography>
//     </Box>
//   </Box>
// );

// /* ═══════════════════════════════════════════════════════════════════ */
// /*  ORDER DETAIL MODAL                                                  */
// /* ═══════════════════════════════════════════════════════════════════ */
// const OrderModal = ({ order, open, onClose }) => {
//   if (!order) return null;

//   const addr = order.address || {};
//   const fullAddress = [
//     addr.address_line1,
//     addr.address_line2,
//     addr.city,
//     addr.state,
//     addr.pincode,
//     addr.country,
//   ]
//     .filter(Boolean)
//     .join(", ");

//   return (
//     <Modal
//       open={open}
//       onClose={onClose}
//       closeAfterTransition
//       slots={{ backdrop: Backdrop }}
//       slotProps={{ backdrop: { timeout: 300 } }}
//     >
//       <Fade in={open}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: { xs: "92vw", sm: 560, md: 640 },
//             maxHeight: "90vh",
//             overflowY: "auto",
//             bgcolor: "background.paper",
//             borderRadius: 4,
//             boxShadow: 24,
//             outline: "none",
//             "&::-webkit-scrollbar": { width: 6 },
//             "&::-webkit-scrollbar-thumb": {
//               bgcolor: "grey.300",
//               borderRadius: 4,
//             },
//           }}
//         >
//           {/* ── MODAL HEADER ── */}
//           <Box
//             sx={{
//               position: "sticky",
//               top: 0,
//               zIndex: 1,
//               bgcolor: "background.paper",
//               px: 3,
//               pt: 3,
//               pb: 2,
//               borderBottom: "1px solid",
//               borderColor: "grey.100",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "flex-start",
//             }}
//           >
//             <Box>
//               <Typography variant="h6" fontWeight={700} lineHeight={1.2}>
//                 {order.order_number}
//               </Typography>
//               <Typography variant="caption" color="text.secondary">
//                 {new Date(order.order_date).toLocaleString("en-IN", {
//                   day: "numeric",
//                   month: "short",
//                   year: "numeric",
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })}
//               </Typography>
//             </Box>

//             <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//               <Chip
//                 label={order.status}
//                 color={statusColor(order.status)}
//                 size="small"
//                 sx={{ fontWeight: 600 }}
//               />
//               <IconButton size="small" onClick={onClose}>
//                 <CloseIcon fontSize="small" />
//               </IconButton>
//             </Box>
//           </Box>

//           {/* ── MODAL BODY ── */}
//           <Box sx={{ px: 3, py: 2.5 }}>

//             {/* Summary pills */}
//             <Box
//               sx={{
//                 display: "flex",
//                 gap: 1.5,
//                 flexWrap: "wrap",
//                 mb: 3,
//               }}
//             >
//               <Paper
//                 variant="outlined"
//                 sx={{
//                   px: 2,
//                   py: 1,
//                   borderRadius: 3,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                   flex: "1 1 130px",
//                 }}
//               >
//                 <InventoryIcon fontSize="small" color="primary" />
//                 <Box>
//                   <Typography variant="caption" color="text.secondary">
//                     Items
//                   </Typography>
//                   <Typography variant="body2" fontWeight={600}>
//                     {order.item_counts} item{order.item_counts !== 1 ? "s" : ""}
//                   </Typography>
//                 </Box>
//               </Paper>

//               <Paper
//                 variant="outlined"
//                 sx={{
//                   px: 2,
//                   py: 1,
//                   borderRadius: 3,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                   flex: "1 1 130px",
//                 }}
//               >
//                 <ReceiptLongIcon fontSize="small" color="primary" />
//                 <Box>
//                   <Typography variant="caption" color="text.secondary">
//                     Grand Total
//                   </Typography>
//                   <Typography variant="body2" fontWeight={600}>
//                     ₹{order.grand_total}
//                   </Typography>
//                 </Box>
//               </Paper>

//               <Paper
//                 variant="outlined"
//                 sx={{
//                   px: 2,
//                   py: 1,
//                   borderRadius: 3,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                   flex: "1 1 130px",
//                 }}
//               >
//                 <CalendarTodayIcon fontSize="small" color="primary" />
//                 <Box>
//                   <Typography variant="caption" color="text.secondary">
//                     Order Ref
//                   </Typography>
//                   <Typography variant="body2" fontWeight={600}>
//                     {order.order_number}
//                   </Typography>
//                 </Box>
//               </Paper>
//             </Box>

//             {/* Delivery address */}
//             <Typography
//               variant="overline"
//               color="text.secondary"
//               sx={{ letterSpacing: 1.2, fontWeight: 600 }}
//             >
//               Delivery Address
//             </Typography>
//             <Paper
//               variant="outlined"
//               sx={{ p: 2, borderRadius: 3, mt: 1, mb: 3 }}
//             >
//               <InfoRow
//                 icon={<LocationOnIcon fontSize="small" />}
//                 label={addr.name || "Address"}
//                 value={fullAddress}
//               />
//               {addr.mobile && (
//                 <InfoRow
//                   icon={<PhoneIcon fontSize="small" />}
//                   label="Mobile"
//                   value={addr.mobile}
//                 />
//               )}
//               {addr.category && (
//                 <Typography
//                   variant="caption"
//                   sx={{
//                     display: "inline-block",
//                     mt: 0.5,
//                     px: 1.5,
//                     py: 0.4,
//                     bgcolor: "grey.100",
//                     borderRadius: 2,
//                     textTransform: "capitalize",
//                     fontWeight: 500,
//                   }}
//                 >
//                   {addr.category}
//                 </Typography>
//               )}
//             </Paper>

//             {/* Items breakdown */}
//             <Typography
//               variant="overline"
//               color="text.secondary"
//               sx={{ letterSpacing: 1.2, fontWeight: 600 }}
//             >
//               Items Ordered
//             </Typography>

//             <Box sx={{ mt: 1 }}>
//               {order.items.map((item, idx) => (
//                 <Box key={idx}>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 2,
//                       py: 1.5,
//                     }}
//                   >
//                     <Avatar
//                       src={item.image}
//                       variant="rounded"
//                       sx={{
//                         width: 56,
//                         height: 56,
//                         borderRadius: 2,
//                         border: "1px solid",
//                         borderColor: "grey.200",
//                         flexShrink: 0,
//                       }}
//                     >
//                       <ShoppingBagIcon />
//                     </Avatar>

//                     <Box flex={1} minWidth={0}>
//                       <Typography
//                         fontWeight={600}
//                         noWrap
//                         sx={{ fontSize: { xs: "0.85rem", sm: "0.95rem" } }}
//                       >
//                         {item.product_name}
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary">
//                         Qty: {item.quantity} &nbsp;·&nbsp; Weight: {item.weight}{" "}
//                         &nbsp;·&nbsp; Unit price: ₹{item.unit_price}
//                       </Typography>
//                     </Box>

//                     <Typography
//                       fontWeight={700}
//                       color="primary.main"
//                       sx={{ flexShrink: 0 }}
//                     >
//                       ₹{item.total_price}
//                     </Typography>
//                   </Box>

//                   {idx < order.items.length - 1 && (
//                     <Divider sx={{ borderColor: "grey.100" }} />
//                   )}
//                 </Box>
//               ))}
//             </Box>

//             {/* Total footer */}
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 mt: 2,
//                 pt: 2,
//                 borderTop: "2px solid",
//                 borderColor: "grey.200",
//               }}
//             >
//               <Typography color="text.secondary" fontWeight={500}>
//                 Total ({order.item_counts} items)
//               </Typography>
//               <Typography variant="h6" fontWeight={700} color="primary.main">
//                 ₹{order.grand_total}
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//       </Fade>
//     </Modal>
//   );
// };

// /* ═══════════════════════════════════════════════════════════════════ */
// /*  MAIN PAGE                                                           */
// /* ═══════════════════════════════════════════════════════════════════ */
// const OrdersPage = () => {
//   const [orders, setOrders]       = useState([]);
//   const [loading, setLoading]     = useState(true);
//   const [selected, setSelected]   = useState(null);   // order object for modal
//   const [modalOpen, setModalOpen] = useState(false);

//   const loadOrders = async () => {
//     try {
//       const user   = JSON.parse(localStorage.getItem("user"));
//       const userId = user?.user_id;
//       if (!userId) return;

//       const data = await fetchPurchaseHistory(userId);
//       setOrders(data);
//     } catch (error) {
//       console.error("Orders fetch failed", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadOrders();
//     const interval = setInterval(loadOrders, 15000);   // real-time polling
//     return () => clearInterval(interval);
//   }, []);

//   const openModal  = (order) => { setSelected(order); setModalOpen(true); };
//   const closeModal = ()      => { setModalOpen(false); };

//   /* ── loading ── */
//   if (loading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: 300,
//           gap: 2,
//         }}
//       >
//         <CircularProgress />
//         <Typography variant="body2" color="text.secondary">
//           Loading your orders…
//         </Typography>
//       </Box>
//     );
//   }

//   /* ── empty state ── */
//   if (orders.length === 0) {
//     return (
//       <Box
//         sx={{
//           textAlign: "center",
//           py: 10,
//           color: "text.secondary",
//         }}
//       >
//         <ShoppingBagIcon sx={{ fontSize: 64, opacity: 0.25, mb: 2 }} />
//         <Typography variant="h6">No orders yet</Typography>
//         <Typography variant="body2">
//           Start shopping to see your orders here.
//         </Typography>
//       </Box>
//     );
//   }

//   /* ── order list ── */
//   return (
//     <>
//       <Box
//         sx={{
//           maxWidth: 860,
//           mx: "auto",
//           px: { xs: 1.5, sm: 2, md: 0 },
//           py: { xs: 2, sm: 3 },
//         }}
//       >
//         {/* Header row */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             mb: 3,
//             flexWrap: "wrap",
//             gap: 1,
//           }}
//         >
//           <Typography
//             variant="h5"
//             fontWeight={700}
//             sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
//           >
//             Your Orders
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             {orders.length} order{orders.length !== 1 ? "s" : ""}
//           </Typography>
//         </Box>

//         {/* Cards */}
//         {orders.map((order) => (
//           <Card
//             key={order.order_id}
//             onClick={() => openModal(order)}
//             elevation={0}
//             sx={{
//               mb: 2,
//               borderRadius: 3,
//               cursor: "pointer",
//               border: "1px solid",
//               borderColor: "grey.200",
//               transition: "all 0.22s ease",
//               "&:hover": {
//                 transform: "translateY(-2px)",
//                 boxShadow: "0 6px 24px rgba(0,0,0,0.10)",
//                 borderColor: "primary.main",
//               },
//               "&:active": {
//                 transform: "translateY(0px)",
//               },
//             }}
//           >
//             <CardContent
//               sx={{
//                 px: { xs: 2, sm: 3 },
//                 py: { xs: 1.8, sm: 2 },
//                 "&:last-child": { pb: { xs: 1.8, sm: 2 } },
//               }}
//             >
//               <Grid
//                 container
//                 alignItems="center"
//                 justifyContent="space-between"
//                 spacing={1}
//                 wrap="wrap"
//               >
//                 {/* Left — order number + date */}
//                 <Grid item xs={12} sm={6}>
//                   <Typography
//                     fontWeight={700}
//                     sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
//                   >
//                     {order.order_number}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     {new Date(order.order_date).toLocaleString("en-IN", {
//                       day: "numeric",
//                       month: "short",
//                       year: "numeric",
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </Typography>
//                 </Grid>

//                 {/* Right — status + total + cta */}
//                 <Grid
//                   item
//                   xs={12}
//                   sm={6}
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     // justifyContent: "space-between",
//                     justifyContent: { xs: "flex-start", sm: "flex-end" },
//                     gap: { xs: 1.2, sm: 2 },
//                     flexWrap: "wrap",
//                   }}
//                 >
//                   <Typography variant="caption" color="text.secondary">
//                     {order.item_counts} item{order.item_counts !== 1 ? "s" : ""}
//                   </Typography>

//                   <Chip
//                     label={order.status}
//                     color={statusColor(order.status)}
//                     size="small"
//                     sx={{ fontWeight: 600, fontSize: "0.72rem" }}
//                   />

//                   <Typography fontWeight={700} sx={{ minWidth: 60, textAlign: "right" }}>
//                     ₹{order.grand_total}
//                   </Typography>

//                   <Typography
//                     variant="body2"
//                     color="primary.main"
//                     fontWeight={600}
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 0.3,
//                       whiteSpace: "nowrap",
//                     }}
//                   >
//                     View details →
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         ))}
//       </Box>

//       {/* Center modal */}
//       <OrderModal
//         order={selected}
//         open={modalOpen}
//         onClose={closeModal}
//       />
//     </>
//   );
// };

// export default OrdersPage;










import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Avatar,
  Chip,
  CircularProgress,
  Modal,
  IconButton,
  Container,
  Paper,
  Fade,
  Backdrop
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import InventoryIcon from "@mui/icons-material/Inventory";

import { useEffect, useState } from "react";
import { fetchPurchaseHistory } from "../../api/AllApi";

/* ─── status colour helper ─────────────────────────────────────────── */
const statusColor = (status) => {
  switch (status) {
    case "Delivered": return "success";
    case "Cancelled": return "error";
    case "Shipped":   return "info";
    default:          return "warning";
  }
};

/* ─── tiny info row used inside the modal ──────────────────────────── */
const InfoRow = ({ icon, label, value }) => (
  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.2, mb: 1 }}>
    <Box sx={{ color: "primary.main", mt: 0.2, flexShrink: 0 }}>{icon}</Box>
    <Box>
      <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1 }}>
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={500}>
        {value}
      </Typography>
    </Box>
  </Box>
);

/* ═══════════════════════════════════════════════════════════════════ */
/*  ORDER DETAIL MODAL — no logic changes, only width tweak           */
/* ═══════════════════════════════════════════════════════════════════ */
const OrderModal = ({ order, open, onClose }) => {
  if (!order) return null;

  const addr = order.address || {};
  const fullAddress = [
    addr.address_line1,
    addr.address_line2,
    addr.city,
    addr.state,
    addr.pincode,
    addr.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 300 } }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "94vw", sm: 560, md: 640 },
            maxHeight: { xs: "88vh", sm: "90vh" },
            overflowY: "auto",
            bgcolor: "background.paper",
            borderRadius: { xs: 3, sm: 4 },
            boxShadow: 24,
            outline: "none",
            "&::-webkit-scrollbar": { width: 6 },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "grey.300",
              borderRadius: 4,
            },
          }}
        >
          {/* ── MODAL HEADER ── */}
          <Box
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              bgcolor: "background.paper",
              px: { xs: 2, sm: 3 },
              pt: { xs: 2, sm: 3 },
              pb: 2,
              borderBottom: "1px solid",
              borderColor: "grey.100",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box>
              <Typography
                variant="h6"
                fontWeight={700}
                lineHeight={1.2}
                sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
              >
                {order.order_number}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {/* {new Date(order.order_date).toLocaleString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })} */}

                {new Date(order.order_date + " UTC").toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
                })}


              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
              <Chip
                label={order.status}
                color={statusColor(order.status)}
                size="small"
                sx={{ fontWeight: 600 }}
              />
              <IconButton size="small" onClick={onClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* ── MODAL BODY ── */}
          <Box sx={{ px: { xs: 2, sm: 3 }, py: 2.5 }}>

            {/* Summary pills */}
            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", mb: 3 }}>
              {[
                {
                  icon: <InventoryIcon fontSize="small" color="primary" />,
                  label: "Items",
                  value: `${order.item_counts} item${order.item_counts !== 1 ? "s" : ""}`,
                },
                {
                  icon: <ReceiptLongIcon fontSize="small" color="primary" />,
                  label: "Grand Total",
                  value: `₹${order.grand_total}`,
                },
                {
                  icon: <CalendarTodayIcon fontSize="small" color="primary" />,
                  label: "Order Ref",
                  value: order.order_number,
                },
              ].map(({ icon, label, value }) => (
                <Paper
                  key={label}
                  variant="outlined"
                  sx={{
                    px: { xs: 1.5, sm: 2 },
                    py: 1,
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    flex: "1 1 120px",
                    minWidth: 0,
                  }}
                >
                  {icon}
                  <Box minWidth={0}>
                    <Typography variant="caption" color="text.secondary">
                      {label}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      noWrap
                      sx={{ fontSize: { xs: "0.78rem", sm: "0.875rem" } }}
                    >
                      {value}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Box>

            {/* Delivery address */}
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ letterSpacing: 1.2, fontWeight: 600 }}
            >
              Delivery Address
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, mt: 1, mb: 3 }}>
              <InfoRow
                icon={<LocationOnIcon fontSize="small" />}
                label={addr.name || "Address"}
                value={fullAddress}
              />
              {addr.mobile && (
                <InfoRow
                  icon={<PhoneIcon fontSize="small" />}
                  label="Mobile"
                  value={addr.mobile}
                />
              )}
              {addr.category && (
                <Typography
                  variant="caption"
                  sx={{
                    display: "inline-block",
                    mt: 0.5,
                    px: 1.5,
                    py: 0.4,
                    bgcolor: "grey.100",
                    borderRadius: 2,
                    textTransform: "capitalize",
                    fontWeight: 500,
                  }}
                >
                  {addr.category}
                </Typography>
              )}
            </Paper>

            {/* Items breakdown */}
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ letterSpacing: 1.2, fontWeight: 600 }}
            >
              Items Ordered
            </Typography>

            <Box sx={{ mt: 1 }}>
              {order.items.map((item, idx) => (
                <Box key={idx}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 }, py: 1.5 }}>
                    <Avatar
                      src={item.image}
                      variant="rounded"
                      sx={{
                        width: { xs: 48, sm: 56 },
                        height: { xs: 48, sm: 56 },
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "grey.200",
                        flexShrink: 0,
                      }}
                    >
                      <ShoppingBagIcon />
                    </Avatar>

                    <Box flex={1} minWidth={0}>
                      <Typography
                        fontWeight={600}
                        noWrap
                        sx={{ fontSize: { xs: "0.82rem", sm: "0.95rem" } }}
                      >
                        {item.product_name}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                      >
                        Qty: {item.quantity} · Weight: {item.weight} · ₹{item.unit_price}/unit
                      </Typography>
                    </Box>

                    <Typography
                      fontWeight={700}
                      color="primary.main"
                      sx={{ flexShrink: 0, fontSize: { xs: "0.88rem", sm: "1rem" } }}
                    >
                      ₹{item.total_price}
                    </Typography>
                  </Box>

                  {idx < order.items.length - 1 && (
                    <Divider sx={{ borderColor: "grey.100" }} />
                  )}
                </Box>
              ))}
            </Box>

            {/* Total footer */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
                pt: 2,
                borderTop: "2px solid",
                borderColor: "grey.200",
              }}
            >
              <Typography color="text.secondary" fontWeight={500}>
                Total ({order.item_counts} items)
              </Typography>
              <Typography
                variant="h6"
                fontWeight={700}
                color="primary.main"
                sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
              >
                ₹{order.grand_total}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

// /* ═══════════════════════════════════════════════════════════════════ */
// /*  MAIN PAGE                                                           */
// /* ═══════════════════════════════════════════════════════════════════ */
// const OrdersPage = () => {
//   const [orders, setOrders]       = useState([]);
//   const [loading, setLoading]     = useState(true);
//   const [selected, setSelected]   = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   const loadOrders = async () => {
//     try {
//       const user   = JSON.parse(localStorage.getItem("user"));
//       const userId = user?.user_id;
//       if (!userId) return;

//       const data = await fetchPurchaseHistory(userId);
//       setOrders(data);
//     } catch (error) {
//       console.error("Orders fetch failed", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadOrders();
//     const interval = setInterval(loadOrders, 15000);
//     return () => clearInterval(interval);
//   }, []);

//   const openModal  = (order) => { setSelected(order); setModalOpen(true); };
//   const closeModal = ()      => { setModalOpen(false); };

//   /* ── loading ── */
//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 300, gap: 2 }}>
//         <CircularProgress />
//         <Typography variant="body2" color="text.secondary">Loading your orders…</Typography>
//       </Box>
//     );
//   }

//   /* ── empty state ── */
//   if (orders.length === 0) {
//     return (
//       <Box sx={{ textAlign: "center", py: 10, color: "text.secondary" }}>
//         <ShoppingBagIcon sx={{ fontSize: 64, opacity: 0.25, mb: 2 }} />
//         <Typography variant="h6">No orders yet</Typography>
//         <Typography variant="body2">Start shopping to see your orders here.</Typography>
//       </Box>
//     );
//   }

//   /* ── order list ── */
//   return (
//     <>
//       <Container
//         maxWidth="xl"
//         sx={{ px: { xs: 1.5, sm: 2, md: 3 }, py: { xs: 2, sm: 3, md: 4 } }}
//       >
//         {/* Header row */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             mb: { xs: 2, sm: 3 },
//           }}
//         >
//           <Typography
//             variant="h5"
//             fontWeight={700}
//             sx={{ fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" } }}
//           >
//             Your Orders
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             {orders.length} order{orders.length !== 1 ? "s" : ""}
//           </Typography>
//         </Box>

//         {/* ── 2-column grid on lg+, single column below ── */}
//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: {
//               xs: "1fr",          // mobile:  1 card full width
//               lg: "1fr 1fr",      // desktop: 2 cards side by side
//             },
//             gap: { xs: 1.5, sm: 2, md: 2.5 },
//           }}
//         >
//           {orders.map((order) => (
//             <Card
//               key={order.order_id}
//               onClick={() => openModal(order)}
//               elevation={0}
//               sx={{
//                 borderRadius: { xs: 2.5, sm: 3 },
//                 cursor: "pointer",
//                 border: "1px solid",
//                 borderColor: "grey.200",
//                 transition: "all 0.22s ease",
//                 "&:hover": {
//                   transform: "translateY(-2px)",
//                   boxShadow: "0 6px 24px rgba(0,0,0,0.10)",
//                   borderColor: "primary.main",
//                 },
//                 "&:active": { transform: "translateY(0px)" },
//               }}
//             >
//               <CardContent
//                 sx={{
//                   px: { xs: 2, sm: 2.5 },
//                   py: { xs: 1.8, sm: 2 },
//                   "&:last-child": { pb: { xs: 1.8, sm: 2 } },
//                 }}
//               >
//                 {/* Row 1 — order number + date */}
//                 <Box sx={{ mb: 1.2 }}>
//                   <Typography
//                     fontWeight={700}
//                     sx={{ fontSize: { xs: "0.92rem", sm: "1rem" } }}
//                   >
//                     {order.order_number}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     {new Date(order.order_date).toLocaleString("en-IN", {
//                       day: "numeric",
//                       month: "short",
//                       year: "numeric",
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </Typography>
//                 </Box>

//                 {/* Row 2 — items · status · price · cta — always ONE row, no wrap */}
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: { xs: 1, sm: 1.5 },
//                     flexWrap: "nowrap",      // ← key: never wraps
//                     overflow: "hidden",
//                   }}
//                 >
//                   <Typography
//                     variant="caption"
//                     color="text.secondary"
//                     sx={{ whiteSpace: "nowrap", flexShrink: 0 }}
//                   >
//                     {order.item_counts} item{order.item_counts !== 1 ? "s" : ""}
//                   </Typography>

//                   <Chip
//                     label={order.status}
//                     color={statusColor(order.status)}
//                     size="small"
//                     sx={{
//                       fontWeight: 600,
//                       fontSize: { xs: "0.68rem", sm: "0.72rem" },
//                       height: { xs: 22, sm: 24 },
//                       flexShrink: 0,
//                     }}
//                   />

//                   <Typography
//                     fontWeight={700}
//                     sx={{
//                       whiteSpace: "nowrap",
//                       flexShrink: 0,
//                       fontSize: { xs: "0.88rem", sm: "1rem" },
//                       ml: "auto",            // pushes price + cta to the right
//                     }}
//                   >
//                     ₹{order.grand_total}
//                   </Typography>

//                   <Typography
//                     variant="body2"
//                     color="primary.main"
//                     fontWeight={600}
//                     sx={{
//                       whiteSpace: "nowrap",
//                       flexShrink: 0,
//                       fontSize: { xs: "0.78rem", sm: "0.875rem" },
//                     }}
//                   >
//                     View details →
//                   </Typography>
//                 </Box>
//               </CardContent>
//             </Card>
//           ))}
//         </Box>
//       </Container>

//       <OrderModal order={selected} open={modalOpen} onClose={closeModal} />
//     </>
//   );
// };


/* ═══════════════════════════════════════════════════════════════════ */
/*  MAIN PAGE                                                           */
/* ═══════════════════════════════════════════════════════════════════ */
const OrdersPage = () => {
  const [orders, setOrders]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [selected, setSelected]   = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const loadOrders = async () => {
    try {
      const user   = JSON.parse(localStorage.getItem("user"));
      const userId = user?.user_id;
      if (!userId) return;

      const data = await fetchPurchaseHistory(userId);
      setOrders(data);
    } catch (error) {
      console.error("Orders fetch failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
    const interval = setInterval(loadOrders, 15000);
    return () => clearInterval(interval);
  }, []);

  const openModal  = (order) => { setSelected(order); setModalOpen(true); };
  const closeModal = ()      => { setModalOpen(false); };

  /* ── Group orders by "Month YYYY" ── */
  const groupedOrders = orders.reduce((acc, order) => {
    const date  = new Date(order.order_date);
    const label = date.toLocaleString("en-IN", { month: "long", year: "numeric" }); // e.g. "March 2026"
    if (!acc[label]) acc[label] = [];
    acc[label].push(order);
    return acc;
  }, {});

  // Keep months sorted newest first
  const sortedMonths = Object.keys(groupedOrders).sort((a, b) => {
    return new Date("1 " + b) - new Date("1 " + a);
  });

  /* ── loading ── */
  if (loading) {
    return (
      // <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 300, gap: 2 }}>
      //   <CircularProgress />
      //   <Typography variant="body2" color="text.secondary">Loading your orders…</Typography>
      // </Box>

      <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <CircularProgress />
        <Typography variant="body2" color="text.secondary">Loading your orders…</Typography>
      </Box>
    </Box>
    );
  }

  /* ── empty state ── */
  if (orders.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 10, color: "text.secondary" }}>
        <ShoppingBagIcon sx={{ fontSize: 64, opacity: 0.25, mb: 2 }} />
        <Typography variant="h6">No orders yet</Typography>
        <Typography variant="body2">Start shopping to see your orders here.</Typography>
      </Box>
    );
  }

  /* ── order list ── */
  return (
    <>
      <Container
        maxWidth="md"
        sx={{ px: { xs: 1.5, sm: 2, md: 3 }, py: { xs: 2, sm: 3, md: 4 } }}
      >
        {/* Header row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: { xs: 2, sm: 3 },
          }}
        >
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" } }}
          >
            Your Orders
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {orders.length} order{orders.length !== 1 ? "s" : ""}
          </Typography>
        </Box>

        {/* ── Month-grouped sections ── */}
        {sortedMonths.map((month) => (
          <Box key={month} sx={{ mb: 4 }}>

            {/* Month header */}
            <Typography
              variant="overline"
              fontWeight={700}
              sx={{
                display: "block",
                fontSize: { xs: "0.7rem", sm: "0.75rem" },
                letterSpacing: 1.4,
                color: "text.secondary",
                mb: 1.2,
                px: 0.5,
              }}
            >
              {month}
            </Typography>

            {/* Cards for that month — full width, stacked */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1.5, sm: 2 } }}>
              {groupedOrders[month].map((order) => (
                <Card
                  key={order.order_id}
                  onClick={() => openModal(order)}
                  elevation={0}
                  sx={{
                    borderRadius: { xs: 2.5, sm: 3 },
                    cursor: "pointer",
                    border: "1px solid",
                    borderColor: "grey.200",
                    transition: "all 0.22s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 24px rgba(0,0,0,0.10)",
                      borderColor: "primary.main",
                    },
                    "&:active": { transform: "translateY(0px)" },
                  }}
                >
                  <CardContent
                    sx={{
                      px: { xs: 2, sm: 2.5 },
                      py: { xs: 1.8, sm: 2 },
                      "&:last-child": { pb: { xs: 1.8, sm: 2 } },
                    }}
                  >
                    {/* Row 1 — order number + date */}
                    <Box sx={{ mb: 1.2 }}>
                      <Typography
                        fontWeight={700}
                        sx={{ fontSize: { xs: "0.92rem", sm: "1rem" } }}
                      >
                        {order.order_number}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(order.order_date).toLocaleString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Typography>
                    </Box>

                    {/* Row 2 — items · status · price · cta */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: { xs: 1, sm: 1.5 },
                        flexWrap: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ whiteSpace: "nowrap", flexShrink: 0 }}
                      >
                        {order.item_counts} item{order.item_counts !== 1 ? "s" : ""}
                      </Typography>

                      <Chip
                        label={order.status}
                        color={statusColor(order.status)}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          fontSize: { xs: "0.68rem", sm: "0.72rem" },
                          height: { xs: 22, sm: 24 },
                          flexShrink: 0,
                        }}
                      />

                      <Typography
                        fontWeight={700}
                        sx={{
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                          fontSize: { xs: "0.88rem", sm: "1rem" },
                          ml: "auto",
                        }}
                      >
                        ₹{order.grand_total}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="primary.main"
                        fontWeight={600}
                        sx={{
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                          fontSize: { xs: "0.78rem", sm: "0.875rem" },
                        }}
                      >
                        View details →
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        ))}
      </Container>

      <OrderModal order={selected} open={modalOpen} onClose={closeModal} />
    </>
  );
};

export default OrdersPage;