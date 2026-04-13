// // // components/checkout/AddressModal.jsx

// // import {
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   RadioGroup,
// //   FormControlLabel,
// //   Radio,
// //   Button,
// //   CircularProgress
// // } from "@mui/material";

// // import { useEffect, useState } from "react";
// // import {
// //   fetchAllAddresses,
// //   setDefaultAddress
// // } from "../../api/AllApi";

// // const AddressModal = ({ open, onClose, refresh }) => {

// //     const userData = JSON.parse(localStorage.getItem("user")); 
// //     const userId = userData?.user_id;

// // //   const userId = Number(localStorage.getItem("user_id"));

// //   const [addresses, setAddresses] = useState([]);
// //   const [selected, setSelected] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     if (!open) return;

// //     const controller = new AbortController();

// //     const load = async () => {
// //       try {
// //         setLoading(true);
// //         const res = await fetchAllAddresses(userId, controller.signal);
// //         setAddresses(res);
// //       } catch (err) {
// //         console.error(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     load();
// //     return () => controller.abort();
// //   }, [open]);

// //   const handleChange = async () => {
// //     if (!selected) return;

// //     try {
// //       setLoading(true);
// //       await setDefaultAddress(userId, selected);

// //       await refresh(); // 🔥 critical sync

// //       onClose();
// //     } catch (err) {
// //       console.error("Set default failed", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <Dialog open={open} onClose={onClose} fullWidth>
// //       <DialogTitle>Select Address</DialogTitle>

// //       <DialogContent>
// //         {loading ? (
// //           <CircularProgress />
// //         ) : (
// //           <>
// //             <RadioGroup
// //               value={selected}
// //               onChange={(e) => setSelected(Number(e.target.value))}
// //             >
// //               {addresses.map((addr) => (
// //                 <FormControlLabel
// //                   key={addr.id}
// //                   value={addr.id}
// //                   control={<Radio />}
// //                   label={`${addr.address_line1}, ${addr.city}`}
// //                 />
// //               ))}
// //             </RadioGroup>

// //             <Button
// //               variant="contained"
// //               fullWidth
// //               sx={{ mt: 2 }}
// //               onClick={handleChange}
// //               disabled={!selected || loading}
// //             >
// //               Confirm Address
// //             </Button>
// //           </>
// //         )}
// //       </DialogContent>
// //     </Dialog>
// //   );
// // };

// // export default AddressModal;







// // ─────────────────────────────────────────────
// // FILE: components/checkout/AddressModal.jsx
// // ─────────────────────────────────────────────

// import {
//   Dialog, DialogTitle, DialogContent, DialogActions,
//   RadioGroup, FormControlLabel, Radio,
//   Button, CircularProgress, Box, Typography, Divider, Chip
// } from "@mui/material";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import { useEffect, useState } from "react";
// import { fetchAllAddresses, setDefaultAddress } from "../../api/AllApi";
 
// const AddressModal = ({ open, onClose, refresh }) => {
//   const userData = JSON.parse(localStorage.getItem("user"));
//   const userId = userData?.user_id;
 
//   const [addresses, setAddresses] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [loading, setLoading] = useState(false);
 
//   useEffect(() => {
//     if (!open) return;
//     const controller = new AbortController();
//     const load = async () => {
//       try {
//         setLoading(true);
//         const res = await fetchAllAddresses(userId, controller.signal);
//         setAddresses(res);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//     return () => controller.abort();
//   }, [open]);
 
//   const handleChange = async () => {
//     if (!selected) return;
//     try {
//       setLoading(true);
//       await setDefaultAddress(userId, selected);
//       await refresh();
//       onClose();
//     } catch (err) {
//       console.error("Set default failed", err);
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm"
//       PaperProps={{ sx: { borderRadius: 3, pb: 1 } }}>
 
//       <DialogTitle sx={{ fontWeight: 700, fontSize: 17, pb: 1 }}>
//         Select Delivery Address
//       </DialogTitle>
//       <Divider />
 
//       <DialogContent sx={{ pt: 2, pb: 1 }}>
//         {loading ? (
//           <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
//             <CircularProgress sx={{ color: "#4CAF50" }} />
//           </Box>
//         ) : (
//           <RadioGroup
//             value={selected}
//             onChange={(e) => setSelected(Number(e.target.value))}
//           >
//             {addresses.map((addr, index) => (
//               <Box
//                 key={addr.id}
//                 onClick={() => setSelected(addr.id)}
//                 sx={{
//                   mb: 1.5,
//                   p: 2,
//                   border: selected === addr.id ? "1.5px solid #4CAF50" : "1px solid #e5e7eb",
//                   borderRadius: 2,
//                   cursor: "pointer",
//                   backgroundColor: selected === addr.id ? "#f1f8f1" : "#fff",
//                   transition: "all 0.15s ease",
//                   "&:hover": { borderColor: "#81c784" }
//                 }}
//               >
//                 <FormControlLabel
//                   value={addr.id}
//                   control={
//                     <Radio size="small" sx={{
//                       color: "#ccc",
//                       "&.Mui-checked": { color: "#4CAF50" }
//                     }} />
//                   }
//                   label={
//                     <Box sx={{ ml: 0.5 }}>
//                       <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.3 }}>
//                         <Typography fontWeight={700} fontSize={14}>
//                           {addr.name}
//                         </Typography>
//                         <Typography fontSize={13} color="text.secondary">
//                           +91 {addr.mobile}
//                         </Typography>
//                         {index === 0 && (
//                           <Chip label="Default" size="small"
//                             sx={{ height: 18, fontSize: 10, backgroundColor: "#e8f5e9", color: "#2e7d32", fontWeight: 600 }} />
//                         )}
//                       </Box>
//                       <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, fontSize: 13 }}>
//                         {addr.address_line1}
//                         {addr.address_line2 ? `, ${addr.address_line2}` : ""},&nbsp;
//                         {addr.city}, {addr.state} — {addr.pincode}
//                       </Typography>
//                     </Box>
//                   }
//                   sx={{ m: 0, alignItems: "flex-start", width: "100%" }}
//                 />
//               </Box>
//             ))}
//           </RadioGroup>
//         )}
//       </DialogContent>
 
//       <DialogActions sx={{ px: 3, pb: 2 }}>
//         <Button onClick={onClose} sx={{ color: "text.secondary", textTransform: "none" }}>
//           Cancel
//         </Button>
//         <Button
//           variant="contained"
//           onClick={handleChange}
//           disabled={!selected || loading}
//           sx={{
//             backgroundColor: "#4CAF50",
//             textTransform: "none",
//             fontWeight: 700,
//             px: 3,
//             "&:hover": { backgroundColor: "#388e3c" }
//           }}
//         >
//           Deliver Here
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };
 
// export default AddressModal;










// components/checkout/AddressModal.jsx

import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  RadioGroup, FormControlLabel, Radio,
  Button, CircularProgress, Box, Typography, Divider, Chip,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import { useEffect, useState } from "react";
import { fetchAllAddresses, setDefaultAddress } from "../../api/AllApi";

const categoryIcon = {
  home: <HomeOutlinedIcon sx={{ fontSize: 13, color: "#777" }} />,
  work: <BusinessOutlinedIcon sx={{ fontSize: 13, color: "#777" }} />,
  other: <FmdGoodOutlinedIcon sx={{ fontSize: 13, color: "#777" }} />,
};

const AddressModal = ({ open, onClose, refresh }) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData?.user_id;

  const [addresses, setAddresses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetchAllAddresses(userId, controller.signal);
        setAddresses(res);
        if (res?.length) {
          // ✅ FIX: pre-select the address where is_default is true, not just index 0
          const defaultAddr = res.find((a) => a.is_default) ?? res[0];
          setSelected(defaultAddr.id);
        }
      } catch (err) {
        if (err?.name !== "AbortError") console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => controller.abort();
  }, [open]);

  const handleConfirm = async () => {
    if (!selected) return;
    try {
      setSaving(true);
      await setDefaultAddress(userId, selected);
      await refresh();
      onClose();
    } catch (err) {
      console.error("Set default failed", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: "20px",
          pb: 0.5,
          margin: { xs: 1.5, sm: 2 },
          width: { xs: "calc(100% - 24px)", sm: "100%" },
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          fontWeight: 800,
          fontSize: 16,
          pb: 0,
          pt: 2.5,
          px: 3,
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: "#1a2e1a",
        }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            backgroundColor: "#e3f4e3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LocationOnIcon sx={{ fontSize: 16, color: "#2e7d32" }} />
        </Box>
        Select Delivery Address
      </DialogTitle>

      <Typography fontSize={12.5} color="#8a9e8a" px={3} pb={1.5} pt={0.3}>
        Choose where you'd like your order delivered
      </Typography>

      <Divider sx={{ borderColor: "#eef4ee" }} />

      {/* Content */}
      <DialogContent sx={{ pt: 2, pb: 1, px: { xs: 2, sm: 2.5 } }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
            <CircularProgress sx={{ color: "#4CAF50" }} />
          </Box>
        ) : addresses.length === 0 ? (
          <Typography color="text.secondary" fontSize={14} textAlign="center" py={3}>
            No saved addresses found.
          </Typography>
        ) : (
          <RadioGroup
            value={selected}
            onChange={(e) => setSelected(Number(e.target.value))}
          >
            {addresses.map((addr) => {
              const isSelected = selected === addr.id;
              const icon = categoryIcon[addr.category?.toLowerCase()] ?? categoryIcon.other;
              const catLabel = addr.category
                ? addr.category.charAt(0).toUpperCase() + addr.category.slice(1)
                : "Other";

              return (
                <Box
                  key={addr.id}
                  onClick={() => setSelected(addr.id)}
                  sx={{
                    mb: 1.5,
                    p: 2,
                    border: isSelected ? "2px solid #4CAF50" : "1.5px solid #e8ece8",
                    borderRadius: "14px",
                    cursor: "pointer",
                    backgroundColor: isSelected ? "#f4faf4" : "#fafafa",
                    transition: "all 0.15s ease",
                    boxShadow: isSelected
                      ? "0 2px 12px rgba(76,175,80,0.15)"
                      : "none",
                    "&:hover": {
                      borderColor: "#a5d6a7",
                      backgroundColor: "#f9fcf9",
                    },
                  }}
                >
                  <FormControlLabel
                    value={addr.id}
                    control={
                      <Radio
                        size="small"
                        sx={{
                          color: "#ccc",
                          p: 0,
                          mr: 1.2,
                          "&.Mui-checked": { color: "#4CAF50" },
                        }}
                      />
                    }
                    label={
                      <Box>
                        {/* Name + mobile + tags */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 0.7,
                            mb: 0.6,
                          }}
                        >
                          <Typography fontWeight={700} fontSize={13.5} color="#1a2e1a">
                            {addr.name}
                          </Typography>
                          <Typography fontSize={12.5} color="#8a9e8a">
                            +91 {addr.mobile}
                          </Typography>

                          {/* ✅ FIX: use is_default from API, not index === 0 */}
                          {addr.is_default && (
                            <Chip
                              label="Default"
                              size="small"
                              sx={{
                                height: 18,
                                fontSize: 10,
                                backgroundColor: "#e3f4e3",
                                color: "#2e7d32",
                                fontWeight: 700,
                                borderRadius: "6px",
                              }}
                            />
                          )}

                          <Chip
                            icon={icon}
                            label={catLabel}
                            size="small"
                            sx={{
                              height: 18,
                              fontSize: 10,
                              backgroundColor: "#f4f4f4",
                              color: "#666",
                              fontWeight: 600,
                              borderRadius: "6px",
                              "& .MuiChip-icon": { fontSize: 12 },
                            }}
                          />
                        </Box>

                        {/* Address */}
                        <Typography fontSize={12.5} color="#6a8a6a" lineHeight={1.65}>
                          {addr.address_line1}
                          {addr.address_line2 ? `, ${addr.address_line2}` : ""}
                          {addr.landmark ? ` • Near: ${addr.landmark}` : ""}, {addr.city},{" "}
                          {addr.state} — {addr.pincode}
                        </Typography>
                      </Box>
                    }
                    sx={{ m: 0, alignItems: "center", width: "100%" }}
                  />
                </Box>
              );
            })}
          </RadioGroup>
        )}
      </DialogContent>

      {/* Actions */}
      <DialogActions sx={{ px: { xs: 2, sm: 2.5 }, pb: 2.5, pt: 1, gap: 1 }}>
        <Button
          onClick={onClose}
          sx={{
            color: "#8a9e8a",
            textTransform: "none",
            fontSize: 13.5,
            fontWeight: 600,
            borderRadius: "10px",
            px: 2,
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirm}
          disabled={!selected || saving || loading}
          sx={{
            background: "linear-gradient(135deg, #2e7d32, #43a047)",
            textTransform: "none",
            fontWeight: 700,
            fontSize: 14,
            px: 3.5,
            py: 1.1,
            borderRadius: "10px",
            boxShadow: "0 4px 14px rgba(46,125,50,0.3)",
            "&:hover": {
              background: "linear-gradient(135deg, #255b27, #388e3c)",
              boxShadow: "0 6px 18px rgba(46,125,50,0.38)",
            },
          }}
        >
          {saving ? (
            <CircularProgress size={18} sx={{ color: "#fff" }} />
          ) : (
            "Deliver Here"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressModal;