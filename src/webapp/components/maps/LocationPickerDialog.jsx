// import { Dialog, DialogTitle, DialogContent, Button, Box } from "@mui/material";
// import { useEffect, useRef, useState } from "react";

// const LocationPickerDialog = ({ open, onClose, onConfirm }) => {

//   const mapRef = useRef(null);
//   const markerRef = useRef(null);
//   const [coords, setCoords] = useState(null);

//   useEffect(() => {

//     if (!open || !window.google) return;

//     navigator.geolocation.getCurrentPosition(
//       (position) => {

//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;

//         const center = { lat, lng };

//         const map = new window.google.maps.Map(mapRef.current, {
//           center,
//           zoom: 17
//         });

//         const marker = new window.google.maps.Marker({
//           position: center,
//           map,
//           draggable: true
//         });

//         markerRef.current = marker;
//         setCoords(center);

//         map.addListener("click", (event) => {

//           const lat = event.latLng.lat();
//           const lng = event.latLng.lng();

//           marker.setPosition(event.latLng);
//           setCoords({ lat, lng });

//         });

//         marker.addListener("dragend", (event) => {

//           const lat = event.latLng.lat();
//           const lng = event.latLng.lng();

//           setCoords({ lat, lng });

//         });

//       },
//       () => {
//         alert("Location permission denied");
//       }
//     );

//   }, [open]);

//   const handleConfirm = () => {

//     if (!coords) return;

//     onConfirm(coords);
//     onClose();

//   };

//   return (

//     <Dialog open={open} fullWidth maxWidth="md">

//       <DialogTitle>Select Location</DialogTitle>

//       <DialogContent>

//         <Box
//           ref={mapRef}
//           sx={{
//             width: "100%",
//             height: 400,
//             borderRadius: 2,
//             mb: 2
//           }}
//         />

//         <Button
//           variant="contained"
//           fullWidth
//           onClick={handleConfirm}
//           sx={{
//             height: 48,
//             fontWeight: 600,
//             backgroundColor: "#4CAF50"
//           }}
//         >
//           Confirm Location
//         </Button>

//       </DialogContent>

//     </Dialog>

//   );
// };

// export default LocationPickerDialog;









import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  IconButton,
  Typography,
  Divider
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { useEffect, useRef, useState } from "react";

const LocationPickerDialog = ({ open, onClose, onConfirm }) => {

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const [coords, setCoords] = useState(null);
  const [address, setAddress] = useState("");

  const geocoderRef = useRef(null);

  /*
  Reverse geocode lat/lng → readable address
  */
  const fetchAddress = (lat, lng) => {

    if (!geocoderRef.current) return;

    geocoderRef.current.geocode(
      { location: { lat, lng } },
      (results, status) => {

        if (status === "OK" && results[0]) {
          setAddress(results[0].formatted_address);
        } else {
          setAddress("Address not found");
        }

      }
    );
  };

  useEffect(() => {

    if (!open || !window.google) return;

    geocoderRef.current = new window.google.maps.Geocoder();

    navigator.geolocation.getCurrentPosition(

      (position) => {

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const center = { lat, lng };

        const map = new window.google.maps.Map(mapRef.current, {
          center,
          zoom: 17
        });

        const marker = new window.google.maps.Marker({
          position: center,
          map,
          draggable: true
        });

        markerRef.current = marker;

        setCoords(center);

        fetchAddress(lat, lng);

        /*
        Map click
        */
        map.addListener("click", (event) => {

          const lat = event.latLng.lat();
          const lng = event.latLng.lng();

          marker.setPosition(event.latLng);

          setCoords({ lat, lng });

          fetchAddress(lat, lng);

        });

        /*
        Marker drag
        */
        marker.addListener("dragend", (event) => {

          const lat = event.latLng.lat();
          const lng = event.latLng.lng();

          setCoords({ lat, lng });

          fetchAddress(lat, lng);

        });

      },

      () => {
        alert("Location permission denied");
      }

    );

  }, [open]);

  // const handleConfirm = () => {

  //   if (!coords) return;

  //   onConfirm(coords);
  //   onClose();

  // };



  const handleConfirm = () => {

  if (!coords || !address) return;

  onConfirm({
    lat: coords.lat,
    lng: coords.lng,
    address: address
  });

  onClose();

};

  return (

    <Dialog open={open} fullWidth maxWidth="md">

      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >

        Select Location

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>

      </DialogTitle>

      <Divider />

      <DialogContent>

        {/* MAP */}

        <Box
          ref={mapRef}
          sx={{
            width: "100%",
            height: 420,
            borderRadius: 2,
            mb: 2
          }}
        />

        {/* ADDRESS PREVIEW */}

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1,
            background: "#f5f5f5",
            p: 2,
            borderRadius: 2,
            mb: 2
          }}
        >

          <LocationOnIcon sx={{ color: "#4CAF50", mt: "2px" }} />

          <Box>

            <Typography
              variant="body2"
              sx={{ fontWeight: 600 }}
            >
              Selected Location
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "text.secondary" }}
            >
              {address || "Move the marker to select location"}
            </Typography>

          </Box>

        </Box>

        {/* CONFIRM BUTTON */}

        <Button
          variant="contained"
          fullWidth
          onClick={handleConfirm}
          sx={{
            height: 48,
            fontWeight: 600,
            backgroundColor: "#4CAF50",
            "&:hover": {
              backgroundColor: "#43A047"
            }
          }}
        >
          Confirm Location
        </Button>

      </DialogContent>

    </Dialog>

  );

};

export default LocationPickerDialog;