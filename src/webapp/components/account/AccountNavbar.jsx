// // import {
// //   AppBar,
// //   Toolbar,
// //   Typography,
// //   Box,
// //   IconButton,
// //   Badge,
// //   Button
// // } from "@mui/material";

// // import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// // import HomeIcon from "@mui/icons-material/Home";

// // import { useNavigate } from "react-router-dom";

// // import { useSelector, useDispatch } from "react-redux";
// // import { openCartDrawer } from "../../store/UiSlice";

// // import { useAuth } from "../../context/AuthContext";

// // const AccountNavbar = () => {

// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();

// //   const { logout } = useAuth();

// //   const items = useSelector((state) => state.cart.items);

// //   const totalItems = items.reduce(
// //     (acc, item) => acc + item.quantity,
// //     0
// //   );

// //   const handleLogout = () => {
// //     logout();
// //     navigate("/", { replace: true });
// //   };

// //   return (
// //     <AppBar
// //       position="static"
// //       sx={{
// //         bgcolor: "#4CAF50",
// //         boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
// //       }}
// //     >
// //       <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

// //         {/* LEFT SECTION : Breadcrumb */}
// //         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

// //           <Box
// //             onClick={() => navigate("/")}
// //             sx={{
// //               display: "flex",
// //               alignItems: "center",
// //               gap: 0.5,
// //               cursor: "pointer",
// //               opacity: 0.95,
// //               "&:hover": { opacity: 1 }
// //             }}
// //           >
// //             <HomeIcon sx={{ fontSize: 18 }} />

// //             <Typography
// //               sx={{
// //                 fontWeight: 500
// //               }}
// //             >
// //               Home
// //             </Typography>
// //           </Box>

// //           <Typography sx={{ mx: 1, opacity: 0.6 }}>
// //             |
// //           </Typography>

// //           <Typography
// //             variant="h6"
// //             sx={{
// //               fontWeight: 600,
// //               letterSpacing: 0.3
// //             }}
// //           >
// //             My Account
// //           </Typography>

// //         </Box>


// //         {/* RIGHT SECTION */}
// //         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

// //           <IconButton
// //             color="inherit"
// //             onClick={() => dispatch(openCartDrawer())}
// //             sx={{
// //               backgroundColor: "rgba(255,255,255,0.15)",
// //               "&:hover": {
// //                 backgroundColor: "rgba(255,255,255,0.25)"
// //               }
// //             }}
// //           >
// //             <Badge badgeContent={totalItems} color="error">
// //               <ShoppingCartIcon />
// //             </Badge>
// //           </IconButton>

// //           <Button
// //             variant="contained"
// //             onClick={handleLogout}
// //             sx={{
// //               textTransform: "none",
// //               fontWeight: 600,
// //               backgroundColor: "#ffffff",
// //               color: "#4CAF50",
// //               px: 2.5,
// //               "&:hover": {
// //                 backgroundColor: "#f5f5f5"
// //               }
// //             }}
// //           >
// //             Logout
// //           </Button>

// //         </Box>

// //       </Toolbar>
// //     </AppBar>
// //   );
// // };

// // export default AccountNavbar;







// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   IconButton,
//   Badge,
//   Button,
//   useMediaQuery
// } from "@mui/material";

// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import HomeIcon from "@mui/icons-material/Home";

// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { openCartDrawer } from "../../store/UiSlice";

// import { useAuth } from "../../context/AuthContext";
// import { useTheme } from "@mui/material/styles";

// const AccountNavbar = () => {

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { logout } = useAuth();

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   const items = useSelector((state) => state.cart.items);

//   const totalItems = items.reduce(
//     (acc, item) => acc + item.quantity,
//     0
//   );

//   const handleLogout = () => {
//     logout();
//     navigate("/", { replace: true });
//   };

//   return (
//     <AppBar
//       position="sticky"
//       sx={{
//         bgcolor: "#4CAF50",
//         boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
//       }}
//     >
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

//         {/* LEFT SECTION */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

//           <IconButton
//             color="inherit"
//             onClick={() => navigate("/")}
//           >
//             <HomeIcon />
//           </IconButton>

//           {!isMobile && (
//             <>
//               <Typography sx={{ mx: 1, opacity: 0.6 }}>
//                 |
//               </Typography>

//               <Typography
//                 variant="h6"
//                 sx={{
//                   fontWeight: 600,
//                   letterSpacing: 0.3
//                 }}
//               >
//                 My Account
//               </Typography>
//             </>
//           )}

//         </Box>


//         {/* RIGHT SECTION */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

//           <IconButton
//             color="inherit"
//             onClick={() => dispatch(openCartDrawer())}
//             sx={{
//               backgroundColor: "rgba(255,255,255,0.15)",
//               "&:hover": {
//                 backgroundColor: "rgba(255,255,255,0.25)"
//               }
//             }}
//           >
//             <Badge badgeContent={totalItems} color="error">
//               <ShoppingCartIcon />
//             </Badge>
//           </IconButton>

//           {!isMobile && (
//             <Button
//               variant="contained"
//               onClick={handleLogout}
//               sx={{
//                 textTransform: "none",
//                 fontWeight: 600,
//                 backgroundColor: "#ffffff",
//                 color: "#4CAF50",
//                 px: 2.5,
//                 "&:hover": {
//                   backgroundColor: "#f5f5f5"
//                 }
//               }}
//             >
//               Logout
//             </Button>
//           )}

//         </Box>

//       </Toolbar>
//     </AppBar>
//   );
// };

// export default AccountNavbar;







import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Button
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { openCartDrawer } from "../../store/UiSlice";

import { useAuth } from "../../context/AuthContext";

const AccountNavbar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logout } = useAuth();

  const items = useSelector((state) => state.cart.items);

  const totalItems = items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "#4CAF50",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: { xs: 56, md: 64 }
        }}
      >

        {/* LEFT SECTION */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

          <IconButton
            color="inherit"
            onClick={() => navigate("/")}
          >
            <HomeIcon />
          </IconButton>

          <Typography sx={{ mx: 1, opacity: 0.6 }}>
            |
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              letterSpacing: 0.3,
              fontSize: { xs: "1rem", md: "1.25rem" }
            }}
          >
            My Account
          </Typography>

        </Box>


        {/* RIGHT SECTION */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>

          <IconButton
            color="inherit"
            // onClick={() => dispatch(openCartDrawer())}
            onClick={() => navigate("/cart")}
            sx={{
              backgroundColor: "rgba(255,255,255,0.15)",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.25)"
              }
            }}
          >
            <Badge badgeContent={totalItems} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <Button
            variant="contained"
            onClick={handleLogout}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              backgroundColor: "#ffffff",
              color: "#4CAF50",
              px: { xs: 1.5, md: 2.5 },
              fontSize: { xs: "0.8rem", md: "0.9rem" },
              "&:hover": {
                backgroundColor: "#f5f5f5"
              }
            }}
          >
            Logout
          </Button>

        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default AccountNavbar;