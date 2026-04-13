import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const DeliveryInfoDialog = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogContent>
        <Box textAlign="center" p={2}>

          <Typography variant="h6" fontWeight={600} gutterBottom>
            Check Delivery Availability
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            mb={3}
          >
            We currently deliver within a <b>3 km radius</b>.
            Please login to verify if delivery is available in your location.
            <br /><br />
            <i>If you are already logged in, you may ignore this message.</i>
          </Typography>

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleLogin}
          >
            Login to Continue
          </Button>

        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DeliveryInfoDialog;









// import { Dialog, DialogContent, Typography, Button, Box } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// function DeliveryInfoDialog({ open, onClose }) {
//   const navigate = useNavigate();

//   const handleLoginRedirect = () => {
//     onClose();
//     navigate("/login");
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
//       <DialogContent>
//         <Box textAlign="center" p={2}>
//           <Typography variant="h6" fontWeight={600} gutterBottom>
//             Check Delivery Availability
//           </Typography>

//           <Typography variant="body2" color="text.secondary" mb={3}>
//             We currently deliver only within a <b>3 km radius</b>.
//             Please login to verify whether delivery is available in your area.
//             <br /><br />
//             <i>If you are already logged in, you may ignore this message.</i>
//           </Typography>

//           <Button
//             variant="contained"
//             size="large"
//             fullWidth
//             onClick={handleLoginRedirect}
//           >
//             Login to Continue
//           </Button>
//         </Box>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default DeliveryInfoDialog;