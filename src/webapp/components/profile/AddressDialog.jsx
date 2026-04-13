// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   Box,
//   Typography,
//   IconButton,
//   Button,
//   Grid,
//   ToggleButton,
//   ToggleButtonGroup
// } from "@mui/material";

// import CloseIcon from "@mui/icons-material/Close";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import MyLocationIcon from "@mui/icons-material/MyLocation";
// import HomeIcon from "@mui/icons-material/Home";
// import WorkIcon from "@mui/icons-material/Work";
// import PlaceIcon from "@mui/icons-material/Place";

// import { useState, useEffect } from "react";

// import {
//   addCustomerAddress,
//   getAddressFromCoordinates,
//   updateCustomerAddress
// } from "../../api/AllApi";

// import LocationPickerDialog from "../maps/LocationPickerDialog";

// import { useDispatch } from "react-redux";
// import { setDeliveryStatus } from "../../store/DeliverySlice";
// import { findCustomerDistance } from "../../api/AllApi";

// import { useSelector } from "react-redux";

// import { showNotification } from "../../store/DistanceNotifySlice";


// const AddressDialog = ({
//   open,
//   onClose,
//   onAddressAdded,
//   onAddressUpdated,
//   editAddress
// }) => {

//   const [mapOpen, setMapOpen] = useState(false);
//   const [coords, setCoords] = useState(null);
//   const [saveAs, setSaveAs] = useState("home");

//   const delivery = useSelector((state) => state.delivery);

//   const dispatch = useDispatch();

//   const [form, setForm] = useState({
//     contactName: "",
//     contactNumber: "",
//     addressLine1: "",
//     addressLine2: "",
//     landmark: "",
//     city: "",
//     state: "",
//     pincode: ""
//   });

//   useEffect(() => {

//   if (editAddress) {

//     setForm({
//       contactName: editAddress.name || "",
//       contactNumber: editAddress.mobile || "",
//       addressLine1: editAddress.address_line1 || "",
//       addressLine2: editAddress.address_line2 || "",
//       landmark: editAddress.landmark || "",
//       city: editAddress.city || "",
//       state: editAddress.state || "",
//       pincode: editAddress.pincode || ""
//     });

//     setSaveAs(editAddress.category || "home");

//   }

// }, [editAddress]);

//   const handleSaveAsChange = (event, newValue) => {
//     if (newValue !== null) {
//       setSaveAs(newValue);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   /*
//   MAP LOCATION CONFIRM
//   */
//   // const handleLocationConfirm = async ({ lat, lng }) => {

//   //   try {

//   //     setCoords({ lat, lng });

//   //     const data = await getAddressFromCoordinates(lat, lng);
//   //     console.log("ADDRESS API RESPONSE:", data);

//   //     setForm((prev) => ({
//   //       ...prev,
//   //       addressLine1: data.address_line || "",
//   //       addressLine2: data.area_or_nagar || "",
//   //       city: data.city || "",
//   //       state: data.state || "",
//   //       pincode: data.pincode || ""
//   //     }));

//   //   } catch (error) {
//   //     console.error("Failed to fetch address:", error);
//   //   }

//   // };




//   const handleLocationConfirm = async ({ lat, lng }) => {

//   try {

//     setCoords({ lat, lng });

//     /*
//     Get human readable address
//     */

//     const addressData = await getAddressFromCoordinates(lat, lng);

//     setForm((prev) => ({
//       ...prev,
//       addressLine1: addressData.address_line || "",
//       addressLine2: addressData.area_or_nagar || "",
//       city: addressData.city || "",
//       state: addressData.state || "",
//       pincode: addressData.pincode || ""
//     }));


//     /*
//     Check delivery eligibility
//     */

//     const formattedAddress =
//   `${addressData.address_line}, ${addressData.area_or_nagar}, ${addressData.city}, ${addressData.state} ${addressData.pincode}`;

// const distanceResponse = await findCustomerDistance(formattedAddress);

// // console.log("Distance API response:", distanceResponse);

// const eligibility = Boolean(distanceResponse.eligibility);

// if (!eligibility) {
//   dispatch(
//   showNotification({
//     message: "Delivery is available only within 3 km. Please select a nearby address.",
//     severity: "error"
//   })
// );

//   // alert("Delivery is available only within 3 km. Please select a nearby address.");
//   return;
// }


// dispatch(
//   setDeliveryStatus({
//     lat,
//     lng,
//     address: formattedAddress,
//     eligibility, 
//     source: "profile"
//   })
// );

// // console.log("Delivery eligibility:", eligibility);

//     // const distanceResponse = await findCustomerDistance(address);

//     // const eligibility =
//     //   distanceResponse?.data?.data?.eligibility === "True";

//     // dispatch(
//     //   setDeliveryStatus({
//     //     lat,
//     //     lng,
//     //     address: distanceResponse?.data?.data?.formatted_address,
//     //     eligibility
//     //   })
//     // );

//     console.log("Delivery eligibility:", eligibility);

//   } catch (error) {

//     console.error("Location processing failed:", error);

//   }
// };


// //   const handleSaveAddress = async () => {

// //   try {

// //     const storedUser = localStorage.getItem("user");

// //     if (!storedUser) {
// //       throw new Error("User not found");
// //     }

// //     const parsedUser = JSON.parse(storedUser);

// //     const payload = {
// //       user_id: parsedUser.user_id,
// //       name: form.contactName,
// //       mobile: form.contactNumber,
// //       category: saveAs,
// //       address_line1: form.addressLine1,
// //       address_line2: form.addressLine2,
// //       landmark: form.landmark,
// //       city: form.city,
// //       state: form.state,
// //       country: "India",
// //       pincode: form.pincode
// //     };

// //     if (editAddress) {

// //       await updateCustomerAddress({
// //         ...payload,
// //         address_id: editAddress.id
// //       });

// //       if (onAddressUpdated) {
// //         onAddressUpdated();
// //       }

// //     } else {

// //       await addCustomerAddress(payload);

// //       if (onAddressAdded) {
// //         onAddressAdded();
// //       }

// //     }

// //     onClose();

// //   } catch (err) {

// //     console.error("Address save failed:", err);

// //   }

// // };

// const handleSaveAddress = async () => {

//   try {

//     if (!delivery.checked) {
//       dispatch(
//   showNotification({
//     message: "Sorry, this address is outside our 3 km delivery area.",
//     severity: "error"
//   })
// );

//       // alert("Please select your location on the map first.");
//       return;
//     }

//     if (!delivery.eligibility) {
//       dispatch(
//   showNotification({
//     message: "Sorry, this address is outside our 3 km delivery area.",
//     severity: "error"
//   })
// );

//       // alert("Sorry, this address is outside our 3 km delivery area.");
//       return;
//     }

//     const storedUser = localStorage.getItem("user");

//     if (!storedUser) {
//       throw new Error("User not found");
//     }

//     const parsedUser = JSON.parse(storedUser);

//     const payload = {
//       user_id: parsedUser.user_id,
//       name: form.contactName,
//       mobile: form.contactNumber,
//       category: saveAs,
//       address_line1: form.addressLine1,
//       address_line2: form.addressLine2,
//       landmark: form.landmark,
//       city: form.city,
//       state: form.state,
//       country: "India",
//       pincode: form.pincode
//     };

//     if (editAddress) {

//       await updateCustomerAddress({
//         ...payload,
//         address_id: editAddress.id
//       });

//       if (onAddressUpdated) {
//         onAddressUpdated();
//       }

//     } else {

//       await addCustomerAddress(payload);

//       if (onAddressAdded) {
//         onAddressAdded();
//       }

//     }

//     onClose();

//   } catch (err) {

//     console.error("Address save failed:", err);

//   }

// };


//   return (
//     <>
//       <Dialog
//         open={open}
//         onClose={onClose}
//         fullWidth
//         maxWidth="sm"
//         scroll="paper"
//       >

//         <DialogTitle
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center"
//           }}
//         >
//           {/* Add Address */}
//           {editAddress ? "Edit Address" : "Add Address"}

//           <IconButton onClick={onClose}>
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>

//         <DialogContent dividers>

//           {/* Area Search (future enhancement) */}
//           {/* <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//             <LocationOnIcon sx={{ mr: 1, color: "#4CAF50" }} />

//             <TextField
//               fullWidth
//               variant="standard"
//               placeholder="Enter your area"
//             />
//           </Box> */}

//           {/* Map Location */}
//           <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//             <MyLocationIcon sx={{ mr: 1, color: "#4CAF50" }} />

//             <Typography
//               sx={{ color: "#4CAF50", cursor: "pointer" }}
//               onClick={() => setMapOpen(true)}
//             >
//               Use my Current Location
//             </Typography>
//           </Box>

//           <TextField
//             label="Contact name"
//             name="contactName"
//             value={form.contactName}
//             onChange={handleChange}
//             fullWidth
//             required
//             sx={{ mb: 2 }}
//           />

//           <TextField
//             label="Contact number"
//             name="contactNumber"
//             value={form.contactNumber}
//             onChange={handleChange}
//             fullWidth
//             required
//             sx={{ mb: 2 }}
//           />

//           <TextField
//             label="Address line 1"
//             name="addressLine1"
//             value={form.addressLine1}
//             onChange={handleChange}
//             fullWidth
//             required
//             sx={{ mb: 2 }}
//           />

//           <TextField
//             label="Address line 2"
//             name="addressLine2"
//             value={form.addressLine2}
//             onChange={handleChange}
//             fullWidth
//             required
//             sx={{ mb: 2 }}
//           />

//           <TextField
//             label="Landmark"
//             name="landmark"
//             value={form.landmark}
//             onChange={handleChange}
//             fullWidth
//             sx={{ mb: 2 }}
//           />

//           <Grid container spacing={2} sx={{ mb: 2 }}>

//             <Grid item xs={6}>
//               <TextField
//                 label="City"
//                 name="city"
//                 value={form.city}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//               />
//             </Grid>

//             <Grid item xs={6}>
//               <TextField
//                 label="State"
//                 name="state"
//                 value={form.state}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//               />
//             </Grid>

//           </Grid>

//           <TextField
//             label="Pincode"
//             name="pincode"
//             value={form.pincode}
//             onChange={handleChange}
//             fullWidth
//             required
//             sx={{ mb: 3 }}
//           />

//           <Typography sx={{ mb: 1, fontWeight: 500 }}>
//             Save as
//           </Typography>

//           <ToggleButtonGroup
//             value={saveAs}
//             exclusive
//             onChange={handleSaveAsChange}
//             sx={{ mb: 3 }}
//           >

//             <ToggleButton value="home">
//               <HomeIcon sx={{ mr: 1 }} />
//               Home
//             </ToggleButton>

//             <ToggleButton value="work">
//               <WorkIcon sx={{ mr: 1 }} />
//               Work
//             </ToggleButton>

//             <ToggleButton value="other">
//               <PlaceIcon sx={{ mr: 1 }} />
//               Other
//             </ToggleButton>

//           </ToggleButtonGroup>

//           <Button
//             fullWidth
//             variant="contained"
//             onClick={handleSaveAddress}
//             sx={{
//               backgroundColor: "#4CAF50",
//               height: 48,
//               fontWeight: 600,
//               "&:hover": { backgroundColor: "#43A047" }
//             }}
//           >
//             Save Address
//           </Button>

//         </DialogContent>
//       </Dialog>

//       <LocationPickerDialog
//         open={mapOpen}
//         onClose={() => setMapOpen(false)}
//         onConfirm={handleLocationConfirm}
//       />
//     </>
//   );
// };

// export default AddressDialog;









// // // // COMPONENTS/PROFILE/ADDRESSDIALOG.JSX
// // // import {
// // //   Dialog,
// // //   DialogTitle,
// // //   DialogContent,
// // //   TextField,
// // //   Box,
// // //   Typography,
// // //   IconButton,
// // //   Button,
// // //   Grid,
// // //   ToggleButton,
// // //   ToggleButtonGroup
// // // } from "@mui/material";

// // // import CloseIcon from "@mui/icons-material/Close";
// // // import LocationOnIcon from "@mui/icons-material/LocationOn";
// // // import MyLocationIcon from "@mui/icons-material/MyLocation";
// // // import HomeIcon from "@mui/icons-material/Home";
// // // import WorkIcon from "@mui/icons-material/Work";
// // // import PlaceIcon from "@mui/icons-material/Place";

// // // import { useState, useEffect } from "react";

// // // import {
// // //   addCustomerAddress,
// // //   getAddressFromCoordinates,
// // //   updateCustomerAddress
// // // } from "../../api/AllApi";

// // // import LocationPickerDialog from "../maps/LocationPickerDialog";

// // // import { useDispatch, useSelector } from "react-redux";
// // // import { setDeliveryStatus } from "../../store/DeliverySlice";
// // // import { findCustomerDistance } from "../../api/AllApi";
// // // import { showNotification } from "../../store/DistanceNotifySlice";


// // // // ─── blank form ───────────────────────────────────────────────────────────────
// // // const EMPTY_FORM = {
// // //   contactName:   "",
// // //   contactNumber: "",
// // //   addressLine1:  "",
// // //   addressLine2:  "",
// // //   landmark:      "",
// // //   city:          "",
// // //   state:         "",
// // //   pincode:       ""
// // // };

// // // // ─── required fields and their display labels ─────────────────────────────────
// // // const REQUIRED_FIELDS = {
// // //   contactName:   "Contact name",
// // //   contactNumber: "Contact number",
// // //   addressLine1:  "Address line 1",
// // //   addressLine2:  "Address line 2",
// // //   city:          "City",
// // //   state:         "State",
// // //   pincode:       "Pincode"
// // // };


// // // const AddressDialog = ({
// // //   open,
// // //   onClose,
// // //   onAddressAdded,
// // //   onAddressUpdated,
// // //   editAddress
// // // }) => {

// // //   const [mapOpen, setMapOpen]   = useState(false);
// // //   const [coords, setCoords]     = useState(null);
// // //   const [saveAs, setSaveAs]     = useState("home");
// // //   const [form, setForm]         = useState(EMPTY_FORM);
// // //   const [errors, setErrors]     = useState({});

// // //   const dispatch = useDispatch();

// // // const delivery = useSelector((state) => state.delivery);


// // //   // ─── populate or reset form when dialog opens ─────────────────────────────
// // //   useEffect(() => {

// // //     if (open) {

// // //       if (editAddress) {
// // //         setForm({
// // //           contactName:   editAddress.name          || "",
// // //           contactNumber: editAddress.mobile        || "",
// // //           addressLine1:  editAddress.address_line1 || "",
// // //           addressLine2:  editAddress.address_line2 || "",
// // //           landmark:      editAddress.landmark      || "",
// // //           city:          editAddress.city          || "",
// // //           state:         editAddress.state         || "",
// // //           pincode:       editAddress.pincode       || ""
// // //         });
// // //         setSaveAs(editAddress.category || "home");
// // //       } else {
// // //         setForm(EMPTY_FORM);
// // //         setSaveAs("home");
// // //       }

// // //       setErrors({});
// // //       setCoords(null);

// // //     }

// // //   }, [open, editAddress]);


// // //   // ─── close: always reset everything ──────────────────────────────────────
// // //   const handleClose = () => {
// // //     setForm(EMPTY_FORM);
// // //     setSaveAs("home");
// // //     setErrors({});
// // //     setCoords(null);
// // //     onClose();
// // //   };


// // //   const handleSaveAsChange = (event, newValue) => {
// // //     if (newValue !== null) setSaveAs(newValue);
// // //   };


// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;

// // //     setForm((prev) => ({ ...prev, [name]: value }));

// // //     // clear error for this field as the user types
// // //     if (errors[name]) {
// // //       setErrors((prev) => ({ ...prev, [name]: "" }));
// // //     }
// // //   };


// // //   // ─── map confirm (optional flow) ─────────────────────────────────────────
// // //   // const handleLocationConfirm = async ({ lat, lng }) => {

// // //   //   try {

// // //   //     setCoords({ lat, lng });

// // //   //     const addressData = await getAddressFromCoordinates(lat, lng);

// // //   //     setForm((prev) => ({
// // //   //       ...prev,
// // //   //       addressLine1: addressData.address_line  || "",
// // //   //       addressLine2: addressData.area_or_nagar || "",
// // //   //       city:         addressData.city          || "",
// // //   //       state:        addressData.state         || "",
// // //   //       pincode:      addressData.pincode       || ""
// // //   //     }));

// // //   //     // clear field errors for auto-filled fields
// // //   //     setErrors((prev) => ({
// // //   //       ...prev,
// // //   //       addressLine1: "",
// // //   //       addressLine2: "",
// // //   //       city:         "",
// // //   //       state:        "",
// // //   //       pincode:      ""
// // //   //     }));

// // //   //     const formattedAddress =
// // //   //       `${addressData.address_line}, ${addressData.area_or_nagar}, ${addressData.city}, ${addressData.state} ${addressData.pincode}`;

// // //   //     const distanceResponse = await findCustomerDistance(formattedAddress);
// // //   //     const eligibility      = Boolean(distanceResponse.eligibility);

// // //   //     if (!eligibility) {
// // //   //       dispatch(showNotification({
// // //   //         message: "Delivery is available only within 3 km. Please select a nearby address.",
// // //   //         severity: "error"
// // //   //       }));
// // //   //       return;
// // //   //     }

// // //   //     dispatch(setDeliveryStatus({
// // //   //       lat,
// // //   //       lng,
// // //   //       address: formattedAddress,
// // //   //       eligibility,
// // //   //       source: "profile"
// // //   //     }));

// // //   //   } catch (error) {
// // //   //     console.error("Location processing failed:", error);
// // //   //   }

// // //   // };


// // //   const handleLocationConfirm = async ({ lat, lng }) => {
// // //   try {
// // //     setCoords({ lat, lng });

// // //     const addressData = await getAddressFromCoordinates(lat, lng);

// // //     setForm((prev) => ({
// // //       ...prev,
// // //       addressLine1: addressData.address_line || "",
// // //       addressLine2: addressData.area_or_nagar || "",
// // //       city: addressData.city || "",
// // //       state: addressData.state || "",
// // //       pincode: addressData.pincode || ""
// // //     }));

// // //     setErrors((prev) => ({
// // //       ...prev,
// // //       addressLine1: "",
// // //       addressLine2: "",
// // //       city: "",
// // //       state: "",
// // //       pincode: ""
// // //     }));

// // //     const formattedAddress =
// // //       `${addressData.address_line}, ${addressData.area_or_nagar}, ${addressData.city}, ${addressData.state} ${addressData.pincode}`;

// // //     const distanceResponse = await findCustomerDistance(formattedAddress);
// // //     const eligibility = Boolean(distanceResponse.eligibility);

// // //     if (!eligibility) {
// // //       dispatch(showNotification({
// // //         message: "Delivery is available only within 3 km. Please select a nearby address.",
// // //         severity: "error"
// // //       }));
// // //       return;
// // //     }

// // //     // ✅ FIX: add checked: true
// // //     dispatch(setDeliveryStatus({
// // //       lat,
// // //       lng,
// // //       address: formattedAddress,
// // //       eligibility,
// // //       source: "profile",
// // //       checked: true
// // //     }));

// // //   } catch (error) {
// // //     console.error("Location processing failed:", error);
// // //   }
// // // };


// // //   // ─── validation ───────────────────────────────────────────────────────────
// // //   const validate = () => {

// // //     const newErrors = {};

// // //     // empty check for all required fields
// // //     Object.entries(REQUIRED_FIELDS).forEach(([field, label]) => {
// // //       if (!form[field].trim()) {
// // //         newErrors[field] = `${label} is required`;
// // //       }
// // //     });

// // //     // contact number — must be exactly 10 digits
// // //     if (form.contactNumber.trim() && !/^\d{10}$/.test(form.contactNumber.trim())) {
// // //       newErrors.contactNumber = "Enter a valid 10-digit mobile number";
// // //     }

// // //     // pincode — must be exactly 6 digits
// // //     if (form.pincode.trim() && !/^\d{6}$/.test(form.pincode.trim())) {
// // //       newErrors.pincode = "Enter a valid 6-digit pincode";
// // //     }

// // //     setErrors(newErrors);

// // //     return Object.keys(newErrors).length === 0; // true = valid
// // //   };


// // //   // ─── save ─────────────────────────────────────────────────────────────────
// // //   // const handleSaveAddress = async () => {

// // //   //   const isValid = validate();
// // //   //   if (!isValid) return; // stop if any validation failed

// // //   //   try {

// // //   //     const storedUser = localStorage.getItem("user");
// // //   //     if (!storedUser) throw new Error("User not found");

// // //   //     const parsedUser = JSON.parse(storedUser);

// // //   //     const payload = {
// // //   //       user_id:       parsedUser.user_id,
// // //   //       name:          form.contactName,
// // //   //       mobile:        form.contactNumber,
// // //   //       category:      saveAs,
// // //   //       address_line1: form.addressLine1,
// // //   //       address_line2: form.addressLine2,
// // //   //       landmark:      form.landmark,
// // //   //       city:          form.city,
// // //   //       state:         form.state,
// // //   //       country:       "India",
// // //   //       pincode:       form.pincode
// // //   //     };

// // //   //     if (editAddress) {
// // //   //       await updateCustomerAddress({ ...payload, address_id: editAddress.id });
// // //   //       if (onAddressUpdated) onAddressUpdated();
// // //   //     } else {
// // //   //       await addCustomerAddress(payload);
// // //   //       if (onAddressAdded) onAddressAdded();
// // //   //     }

// // //   //     handleClose(); // reset everything after successful save

// // //   //   } catch (err) {
// // //   //     console.error("Address save failed:", err);
// // //   //   }

// // //   // };


// // //   const handleSaveAddress = async () => {

// // //   const isValid = validate();
// // //   if (!isValid) return;

// // //   try {

// // //     // ✅ FIRST CHECK: location selected
// // //     if (!delivery?.checked) {
// // //       dispatch(showNotification({
// // //         message: "Please select your location on the map first.",
// // //         severity: "error"
// // //       }));
// // //       return;
// // //     }

// // //     // ✅ SECOND CHECK: eligibility
// // //     if (!delivery?.eligibility) {
// // //       dispatch(showNotification({
// // //         message: "Sorry, this address is outside our 3 km delivery area.",
// // //         severity: "error"
// // //       }));
// // //       return;
// // //     }

// // //     const storedUser = localStorage.getItem("user");
// // //     if (!storedUser) throw new Error("User not found");

// // //     const parsedUser = JSON.parse(storedUser);

// // //     const payload = {
// // //       user_id: parsedUser.user_id,
// // //       name: form.contactName,
// // //       mobile: form.contactNumber,
// // //       category: saveAs,
// // //       address_line1: form.addressLine1,
// // //       address_line2: form.addressLine2,
// // //       landmark: form.landmark,
// // //       city: form.city,
// // //       state: form.state,
// // //       country: "India",
// // //       pincode: form.pincode
// // //     };

// // //     if (editAddress) {
// // //       await updateCustomerAddress({
// // //         ...payload,
// // //         address_id: editAddress.id
// // //       });
// // //       if (onAddressUpdated) onAddressUpdated();
// // //     } else {
// // //       await addCustomerAddress(payload);
// // //       if (onAddressAdded) onAddressAdded();
// // //     }

// // //     handleClose();

// // //   } catch (err) {
// // //     console.error("Address save failed:", err);
// // //   }

// // // };


// // //   // ─── render ───────────────────────────────────────────────────────────────
// // //   return (
// // //     <>
// // //       <Dialog
// // //         open={open}
// // //         onClose={handleClose}
// // //         fullWidth
// // //         maxWidth="sm"
// // //         scroll="paper"
// // //       >

// // //         <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// // //           {editAddress ? "Edit Address" : "Add Address"}
// // //           <IconButton onClick={handleClose}>
// // //             <CloseIcon />
// // //           </IconButton>
// // //         </DialogTitle>

// // //         <DialogContent dividers>

// // //           {/* Area search (future enhancement) */}
// // //           <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
// // //             <LocationOnIcon sx={{ mr: 1, color: "#4CAF50" }} />
// // //             <TextField fullWidth variant="standard" placeholder="Enter your area" />
// // //           </Box>

// // //           {/* Map location picker — optional */}
// // //           <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
// // //             <MyLocationIcon sx={{ mr: 1, color: "#4CAF50" }} />
// // //             <Typography
// // //               sx={{ color: "#4CAF50", cursor: "pointer" }}
// // //               onClick={() => setMapOpen(true)}
// // //             >
// // //               {coords
// // //                 ? "✓ Location selected — change location"
// // //                 : "Use my Current Location (optional)"}
// // //             </Typography>
// // //           </Box>

// // //           <TextField
// // //             label="Contact name"
// // //             name="contactName"
// // //             value={form.contactName}
// // //             onChange={handleChange}
// // //             fullWidth
// // //             required
// // //             error={!!errors.contactName}
// // //             helperText={errors.contactName}
// // //             sx={{ mb: 2 }}
// // //           />

// // //           <TextField
// // //             label="Contact number"
// // //             name="contactNumber"
// // //             value={form.contactNumber}
// // //             onChange={handleChange}
// // //             fullWidth
// // //             required
// // //             inputProps={{ maxLength: 10 }}
// // //             error={!!errors.contactNumber}
// // //             helperText={errors.contactNumber}
// // //             sx={{ mb: 2 }}
// // //           />

// // //           <TextField
// // //             label="Address line 1"
// // //             name="addressLine1"
// // //             value={form.addressLine1}
// // //             onChange={handleChange}
// // //             fullWidth
// // //             required
// // //             error={!!errors.addressLine1}
// // //             helperText={errors.addressLine1}
// // //             sx={{ mb: 2 }}
// // //           />

// // //           <TextField
// // //             label="Address line 2"
// // //             name="addressLine2"
// // //             value={form.addressLine2}
// // //             onChange={handleChange}
// // //             fullWidth
// // //             required
// // //             error={!!errors.addressLine2}
// // //             helperText={errors.addressLine2}
// // //             sx={{ mb: 2 }}
// // //           />

// // //           <TextField
// // //             label="Landmark (optional)"
// // //             name="landmark"
// // //             value={form.landmark}
// // //             onChange={handleChange}
// // //             fullWidth
// // //             sx={{ mb: 2 }}
// // //           />

// // //           <Grid container spacing={2} sx={{ mb: 2 }}>
// // //             <Grid item xs={6}>
// // //               <TextField
// // //                 label="City"
// // //                 name="city"
// // //                 value={form.city}
// // //                 onChange={handleChange}
// // //                 fullWidth
// // //                 required
// // //                 error={!!errors.city}
// // //                 helperText={errors.city}
// // //               />
// // //             </Grid>
// // //             <Grid item xs={6}>
// // //               <TextField
// // //                 label="State"
// // //                 name="state"
// // //                 value={form.state}
// // //                 onChange={handleChange}
// // //                 fullWidth
// // //                 required
// // //                 error={!!errors.state}
// // //                 helperText={errors.state}
// // //               />
// // //             </Grid>
// // //           </Grid>

// // //           <TextField
// // //             label="Pincode"
// // //             name="pincode"
// // //             value={form.pincode}
// // //             onChange={handleChange}
// // //             fullWidth
// // //             required
// // //             inputProps={{ maxLength: 6 }}
// // //             error={!!errors.pincode}
// // //             helperText={errors.pincode}
// // //             sx={{ mb: 3 }}
// // //           />

// // //           <Typography sx={{ mb: 1, fontWeight: 500 }}>Save as</Typography>

// // //           <ToggleButtonGroup
// // //             value={saveAs}
// // //             exclusive
// // //             onChange={handleSaveAsChange}
// // //             sx={{ mb: 3 }}
// // //           >
// // //             <ToggleButton value="home">
// // //               <HomeIcon sx={{ mr: 1 }} /> Home
// // //             </ToggleButton>
// // //             <ToggleButton value="work">
// // //               <WorkIcon sx={{ mr: 1 }} /> Work
// // //             </ToggleButton>
// // //             <ToggleButton value="other">
// // //               <PlaceIcon sx={{ mr: 1 }} /> Other
// // //             </ToggleButton>
// // //           </ToggleButtonGroup>

// // //           <Button
// // //             fullWidth
// // //             variant="contained"
// // //             onClick={handleSaveAddress}
// // //             sx={{
// // //               backgroundColor: "#4CAF50",
// // //               height: 48,
// // //               fontWeight: 600,
// // //               "&:hover": { backgroundColor: "#43A047" }
// // //             }}
// // //           >
// // //             Save Address
// // //           </Button>

// // //         </DialogContent>
// // //       </Dialog>

// // //       <LocationPickerDialog
// // //         open={mapOpen}
// // //         onClose={() => setMapOpen(false)}
// // //         onConfirm={handleLocationConfirm}
// // //       />
// // //     </>
// // //   );
// // // };

// // // export default AddressDialog;













import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  Typography,
  IconButton,
  Button,
  Grid,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import PlaceIcon from "@mui/icons-material/Place";

import { useState, useEffect } from "react";

import {
  addCustomerAddress,
  getAddressFromCoordinates,
  updateCustomerAddress
} from "../../api/AllApi";

import LocationPickerDialog from "../maps/LocationPickerDialog";

import { useDispatch } from "react-redux";
import { setDeliveryStatus } from "../../store/DeliverySlice";
import { findCustomerDistance } from "../../api/AllApi";

import { useSelector } from "react-redux";

import { showNotification } from "../../store/DistanceNotifySlice";


const AddressDialog = ({
  open,
  onClose,
  onAddressAdded,
  onAddressUpdated,
  editAddress
}) => {

  const [mapOpen, setMapOpen] = useState(false);
  const [coords, setCoords] = useState(null);
  const [saveAs, setSaveAs] = useState("home");

  const delivery = useSelector((state) => state.delivery);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    contactName: "",
    contactNumber: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    state: "",
    pincode: ""
  });

  // ✅ NEW: errors state
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editAddress) {
      setForm({
        contactName: editAddress.name || "",
        contactNumber: editAddress.mobile || "",
        addressLine1: editAddress.address_line1 || "",
        addressLine2: editAddress.address_line2 || "",
        landmark: editAddress.landmark || "",
        city: editAddress.city || "",
        state: editAddress.state || "",
        pincode: editAddress.pincode || ""
      });
      setSaveAs(editAddress.category || "home");
    }
  }, [editAddress]);

  // ✅ NEW: validate a single field or all fields
  const validateField = (name, value) => {
    switch (name) {
      case "contactName":
        return value.trim() ? "" : "Contact name is required";
      case "contactNumber":
        return /^\d{10}$/.test(value.trim())
          ? ""
          : "Enter a valid 10-digit mobile number";
      case "addressLine1":
        return value.trim() ? "" : "Address line 1 is required";
      case "addressLine2":
        return value.trim() ? "" : "Address line 2 is required";
      case "city":
        return value.trim() ? "" : "City is required";
      case "state":
        return value.trim() ? "" : "State is required";
      case "pincode":
        return /^\d{6}$/.test(value.trim())
          ? ""
          : "Enter a valid 6-digit pincode";
      default:
        return "";
    }
  };

  // ✅ NEW: validate all required fields, returns true if form is valid
  const validateAll = () => {
    const requiredFields = [
      "contactName",
      "contactNumber",
      "addressLine1",
      "addressLine2",
      "city",
      "state",
      "pincode"
    ];

    const newErrors = {};
    let isValid = true;

    requiredFields.forEach((field) => {
      const error = validateField(field, form[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSaveAsChange = (event, newValue) => {
    if (newValue !== null) {
      setSaveAs(newValue);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // ✅ NEW: clear error as user starts typing again
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ✅ NEW: validate on blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleLocationConfirm = async ({ lat, lng }) => {
  try {
    setCoords({ lat, lng });

    const addressData = await getAddressFromCoordinates(lat, lng);

    setForm((prev) => ({
      ...prev,
      addressLine1: addressData.address_line || "",
      addressLine2: addressData.area_or_nagar || "",
      city: addressData.city || "",
      state: addressData.state || "",
      pincode: addressData.pincode || ""
    }));

    setErrors((prev) => ({
      ...prev,
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: ""
    }));

    const formattedAddress = `${addressData.address_line}, ${addressData.area_or_nagar}, ${addressData.city}, ${addressData.state} ${addressData.pincode}`;

    const distanceResponse = await findCustomerDistance(formattedAddress);
    const eligibility = Boolean(distanceResponse.eligibility);

    if (!eligibility) {
      dispatch(
        showNotification({
          message: "Delivery is available only within 3 km. Please select a nearby address.",
          severity: "error"
        })
      );

      // ✅ FIX: reset delivery state so Save is blocked even if user had a previously valid location
      dispatch(
        setDeliveryStatus({
          lat,
          lng,
          address: formattedAddress,
          eligibility: false,   // explicitly false
          source: "profile"
        })
      );

      return;
    }

    dispatch(
      setDeliveryStatus({
        lat,
        lng,
        address: formattedAddress,
        eligibility: true,
        source: "profile"
      })
    );

    console.log("Delivery eligibility:", eligibility);

  } catch (error) {
    console.error("Location processing failed:", error);
  }
};



  // const handleLocationConfirm = async ({ lat, lng }) => {
  //   try {
  //     setCoords({ lat, lng });

  //     const addressData = await getAddressFromCoordinates(lat, lng);

  //     setForm((prev) => ({
  //       ...prev,
  //       addressLine1: addressData.address_line || "",
  //       addressLine2: addressData.area_or_nagar || "",
  //       city: addressData.city || "",
  //       state: addressData.state || "",
  //       pincode: addressData.pincode || ""
  //     }));

  //     // ✅ NEW: clear errors for map-filled fields
  //     setErrors((prev) => ({
  //       ...prev,
  //       addressLine1: "",
  //       addressLine2: "",
  //       city: "",
  //       state: "",
  //       pincode: ""
  //     }));

  //     const formattedAddress =
  //       `${addressData.address_line}, ${addressData.area_or_nagar}, ${addressData.city}, ${addressData.state} ${addressData.pincode}`;

  //     const distanceResponse = await findCustomerDistance(formattedAddress);
  //     const eligibility = Boolean(distanceResponse.eligibility);

  //     if (!eligibility) {
  //       dispatch(
  //         showNotification({
  //           message: "Delivery is available only within 3 km. Please select a nearby address.",
  //           severity: "error"
  //         })
  //       );
  //       return;
  //     }

  //     dispatch(
  //       setDeliveryStatus({
  //         lat,
  //         lng,
  //         address: formattedAddress,
  //         eligibility,
  //         source: "profile"
  //       })
  //     );

  //     console.log("Delivery eligibility:", eligibility);

  //   } catch (error) {
  //     console.error("Location processing failed:", error);
  //   }
  // };

  const handleSaveAddress = async () => {
    // ✅ NEW: run full validation before proceeding
    if (!validateAll()) return;

    try {
      if (!delivery.checked) {
        dispatch(
          showNotification({
            message: "Sorry, this address is outside our 3 km delivery area.",
            severity: "error"
          })
        );
        return;
      }

      if (!delivery.eligibility) {
        dispatch(
          showNotification({
            message: "Sorry, this address is outside our 3 km delivery area.",
            severity: "error"
          })
        );
        return;
      }

      const storedUser = localStorage.getItem("user");
      if (!storedUser) throw new Error("User not found");

      const parsedUser = JSON.parse(storedUser);

      const payload = {
        user_id: parsedUser.user_id,
        name: form.contactName,
        mobile: form.contactNumber,
        category: saveAs,
        address_line1: form.addressLine1,
        address_line2: form.addressLine2,
        landmark: form.landmark,
        city: form.city,
        state: form.state,
        country: "India",
        pincode: form.pincode
      };

      if (editAddress) {
        await updateCustomerAddress({ ...payload, address_id: editAddress.id });
        if (onAddressUpdated) onAddressUpdated();
      } else {
        await addCustomerAddress(payload);
        if (onAddressAdded) onAddressAdded();
      }

      onClose();

    } catch (err) {
      console.error("Address save failed:", err);
    }
  };


  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" scroll="paper">

        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {editAddress ? "Edit Address" : "Add Address"}
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>

          {/* Map Location */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <MyLocationIcon sx={{ mr: 1, color: "#4CAF50" }} />
            <Typography
              sx={{ color: "#4CAF50", cursor: "pointer" }}
              onClick={() => setMapOpen(true)}
            >
              Use my Current Location
            </Typography>
          </Box>

          <TextField
            label="Contact name"
            name="contactName"
            value={form.contactName}
            onChange={handleChange}
            onBlur={handleBlur}                          // ✅
            error={Boolean(errors.contactName)}          // ✅
            helperText={errors.contactName || ""}        // ✅
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          <TextField
            label="Contact number"
            name="contactNumber"
            value={form.contactNumber}
            onChange={handleChange}
            onBlur={handleBlur}                          // ✅
            error={Boolean(errors.contactNumber)}        // ✅
            helperText={errors.contactNumber || ""}      // ✅
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          <TextField
            label="Address line 1"
            name="addressLine1"
            value={form.addressLine1}
            onChange={handleChange}
            onBlur={handleBlur}                          // ✅
            error={Boolean(errors.addressLine1)}         // ✅
            helperText={errors.addressLine1 || ""}       // ✅
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          <TextField
            label="Address line 2"
            name="addressLine2"
            value={form.addressLine2}
            onChange={handleChange}
            onBlur={handleBlur}                          // ✅
            error={Boolean(errors.addressLine2)}         // ✅
            helperText={errors.addressLine2 || ""}       // ✅
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          <TextField
            label="Landmark"
            name="landmark"
            value={form.landmark}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <TextField
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
                onBlur={handleBlur}                      // ✅
                error={Boolean(errors.city)}             // ✅
                helperText={errors.city || ""}           // ✅
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="State"
                name="state"
                value={form.state}
                onChange={handleChange}
                onBlur={handleBlur}                      // ✅
                error={Boolean(errors.state)}            // ✅
                helperText={errors.state || ""}          // ✅
                fullWidth
                required
              />
            </Grid>
          </Grid>

          <TextField
            label="Pincode"
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            onBlur={handleBlur}                          // ✅
            error={Boolean(errors.pincode)}              // ✅
            helperText={errors.pincode || ""}            // ✅
            fullWidth
            required
            sx={{ mb: 3 }}
          />

          <Typography sx={{ mb: 1, fontWeight: 500 }}>Save as</Typography>

          <ToggleButtonGroup
            value={saveAs}
            exclusive
            onChange={handleSaveAsChange}
            sx={{ mb: 3 }}
          >
            <ToggleButton value="home"><HomeIcon sx={{ mr: 1 }} />Home</ToggleButton>
            <ToggleButton value="work"><WorkIcon sx={{ mr: 1 }} />Work</ToggleButton>
            <ToggleButton value="other"><PlaceIcon sx={{ mr: 1 }} />Other</ToggleButton>
          </ToggleButtonGroup>

          <Button
            fullWidth
            variant="contained"
            onClick={handleSaveAddress}
            sx={{
              backgroundColor: "#4CAF50",
              height: 48,
              fontWeight: 600,
              "&:hover": { backgroundColor: "#43A047" }
            }}
          >
            Save Address
          </Button>

        </DialogContent>
      </Dialog>

      <LocationPickerDialog
        open={mapOpen}
        onClose={() => setMapOpen(false)}
        onConfirm={handleLocationConfirm}
      />
    </>
  );
};

export default AddressDialog;