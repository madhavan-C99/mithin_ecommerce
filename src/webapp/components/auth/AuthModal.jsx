import {
  Dialog,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import Login from "../../pages/LoginPage";
import VerifyOtp from "../../pages/VerifyOtpPage";
import Signup from "../../pages/SignUpPage";

const AuthModal = ({ type }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    navigate(-1);
  };

  const renderContent = () => {
    switch (type) {
      case "login":
        return <Login isModal />;
      case "otp":
        return <VerifyOtp isModal />;
      case "signup":
        return <Signup isModal />;
      default:
        return null;
    }
  };

  return (
    <Dialog
      open
      onClose={handleClose}
      fullScreen={isMobile}
      maxWidth="sm"
      fullWidth
      BackdropProps={{
        sx: {
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(0,0,0,0.4)",
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 4,
          overflow: "hidden",
        },
      }}
    >
      <Box sx={{ p: isMobile ? 2 : 3 }}>
        {renderContent()}
      </Box>
    </Dialog>
  );
};

export default AuthModal;