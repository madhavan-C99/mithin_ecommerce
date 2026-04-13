// import {
//   Box,
//   List,
//   ListItemButton,
//   ListItemText,
//   Drawer,
//   useMediaQuery,
// } from "@mui/material";
// import { NavLink } from "react-router-dom";
// import { useTheme } from "@mui/material/styles";
// import { useState } from "react";

// const AccountSidebar = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
//   const [open, setOpen] = useState(false);

//   const content = (
//     <List>
//       <ListItemButton
//         component={NavLink}
//         to="/account/profile"
//       >
//         <ListItemText primary="Profile" />
//       </ListItemButton>

//       <ListItemButton
//         component={NavLink}
//         to="/account/orders"
//       >
//         <ListItemText primary="Orders" />
//       </ListItemButton>

//       <ListItemButton
//         component={NavLink}
//         to="/account/wishlist"
//       >
//         <ListItemText primary="Wishlist" />
//       </ListItemButton>
//     </List>
//   );

//   if (isMobile) {
//     return (
//       <Drawer open={open} onClose={() => setOpen(false)}>
//         <Box sx={{ width: 250 }}>{content}</Box>
//       </Drawer>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         width: 250,
//         bgcolor: "white",
//         borderRight: "1px solid #e0e0e0",
//         minHeight: "calc(100vh - 64px)",
//       }}
//     >
//       {content}
//     </Box>
//   );
// };

// export default AccountSidebar;







import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { NavLink } from "react-router-dom";

const menu = [
  {
    label: "Profile",
    icon: <PersonIcon />,
    path: "/account/profile"
  },
  {
    label: "Orders",
    icon: <ReceiptLongIcon />,
    path: "/account/orders"
  },
  {
    label: "Wishlist",
    icon: <FavoriteBorderIcon />,
    path: "/account/wishlist"
  }
];

const AccountSidebar = () => {

  return (
    <Box
      sx={{
        width: 260,
        bgcolor: "white",
        borderRight: "1px solid #e0e0e0",
        minHeight: "calc(100vh - 64px)",
        pt: 2
      }}
    >
      <List>

        {menu.map((item) => (

          <ListItemButton
            key={item.label}
            component={NavLink}
            to={item.path}
            sx={{
              mx: 1,
              mb: 1,
              borderRadius: 2,

              "&.active": {
                backgroundColor: "#E8F5E9",
                color: "#4CAF50"
              },

              "&.active .MuiListItemIcon-root": {
                color: "#4CAF50"
              }
            }}
          >

            <ListItemIcon>
              {item.icon}
            </ListItemIcon>

            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontWeight: 500
              }}
            />

          </ListItemButton>

        ))}

      </List>
    </Box>
  );
};

export default AccountSidebar;