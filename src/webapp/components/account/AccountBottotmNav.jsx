import {
  BottomNavigation,
  BottomNavigationAction,
  Paper
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useLocation, useNavigate } from "react-router-dom";

const AccountBottomNav = () => {

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: "1px solid #e0e0e0"
      }}
      elevation={3}
    >
      <BottomNavigation
        value={location.pathname}
        onChange={(e, value) => navigate(value)}
        showLabels
      >

        <BottomNavigationAction
          label="Profile"
          value="/account/profile"
          icon={<PersonIcon />}
        />

        <BottomNavigationAction
          label="Orders"
          value="/account/orders"
          icon={<ReceiptLongIcon />}
        />

        <BottomNavigationAction
          label="Wishlist"
          value="/account/wishlist"
          icon={<FavoriteBorderIcon />}
        />

      </BottomNavigation>

    </Paper>
  );
};

export default AccountBottomNav;