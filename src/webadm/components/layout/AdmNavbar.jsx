import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Avatar
} from "@mui/material";


import NotificationsIcon from "@mui/icons-material/Notifications";
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from "@mui/icons-material/Close";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState, useMemo } from "react";
import { useContext } from "react";
import { NotificationContext } from "../../context/AuthContext";
import { DashboardContext } from "../../context/AuthContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "30px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(3),
  marginLeft: theme.spacing(3),
  width: "100%",
  maxWidth: 400,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.2, 1, 1.2, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

export default function PrimarySearchAppBar({ productname }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

const { setSelected } = useContext(DashboardContext); //dashborad navigate context

const { notifications, setNotifications } = useContext(NotificationContext);
  const [notificationAnchor, setNotificationAnchor] =useState(null);

const isNotificationOpen = Boolean(notificationAnchor);

const handleNotificationOpen = (event) => {
  setNotificationAnchor(event.currentTarget);
};

const handleNotificationClose = () => {
  setNotificationAnchor(null);
};


const user = JSON.parse(localStorage.getItem("user"));
const firstLetter = user?.name?.charAt(0).toUpperCase();

  useEffect(() => {


  const stockSocket = createSocket(

    `${import.meta.env.VITE_WS_BASE_URL}/ws/notification_data/`,
    "notification_all"
  );

  return () => {
    stockSocket.close();
  };

}, []);


const createSocket = (url, actionName) => {

  const socket = new WebSocket(url);

  socket.onopen = () => {
    console.log("url",url)
    if(actionName){   // action இருந்தா மட்டும் send
      socket.send(JSON.stringify({ action: actionName }));
    }
  };

  socket.onmessage = (event) => {

    try {

      const parsedData = JSON.parse(event.data);
      console.log('stock',parsedData)
      setNotifications((prev) => {

        const newData = parsedData.payload || [];

        const merged = [...newData, ...prev];

        const unique = merged.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.notification_id === item.notification_id)
        );

        return unique.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

      });

    } catch (error) {
      console.error("Invalid JSON:", event.data);
    }



  };

  return socket;

};




const unreadCount = notifications.filter(n=>!n.read).length;


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
    </Menu>
  );

      const renderNotificationMenu = (
<Menu
  anchorEl={notificationAnchor}
  open={isNotificationOpen}
  onClose={handleNotificationClose}
  PaperProps={{
    sx: {mt:2,
      height:500,
      width: 370,
      borderRadius: 3,
      "&::-webkit-scrollbar": {
        display: "none",
      },
      msOverflowStyle: "none",
      scrollbarWidth: "none",
    },
  }}
>
  <Box p={2}>
    <Typography fontWeight="bold">Notifications</Typography>
  </Box>

  {notifications.map((n) => (
    <MenuItem
      key={n.notification_id}
      onClick={() => {
        setSelected("Notifications");
        handleNotificationClose();
      }}
      sx={{
        background: n.is_read ? "#fff" : "#eef6ff",
        display: "block",
        margin: 1,
      }}
    >
      {/* STOCK ALERT */}

      {n.title === "Low Stock" && (
        <Box mt={1} display="flex" alignItems="center" gap={1}>
          <WarningIcon sx={{ color: "#d32f2f", fontSize: 18 }} />

          <Typography fontWeight="bold">{n.name}</Typography>

          <Typography
            sx={{
              background: "#ffebee",
              color: "#d32f2f",
              px: 1,
              borderRadius: 1,
              fontSize: 11,
            }}
          >
            {n.stock} Low stock
          </Typography>
                    <Typography fontSize={12} color="text.disabled" mt={1}>
            {n.time_ago}
          </Typography>
        </Box>
        
      )}

      {/* NEW ORDER */}

      {n.title === "New Order" && (
        <Box mt={1}>
          <Typography fontWeight="bold">{n.title}</Typography>

          <Typography fontSize={14} color="text.secondary" mt={0.5}>
            {n.message}
          </Typography>

          <Typography fontSize={12} color="text.disabled" mt={1}>
            {n.time_ago}
          </Typography>
        </Box>
      )}

      {/* TIME */}

      <Typography variant="caption" color="text.secondary">
        {n.time}
      </Typography>
    </MenuItem>
  ))}
</Menu>)


  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      open={isMobileMenuOpen}
      onClose={handleMenuClose}
      sx={{
        mt:2,
        mr:1
      }}
    >


      <MenuItem             
              onClick={(e) => {
              handleNotificationOpen(e);
              handleMenuClose(); // close mobile menu
            }}> 
        <IconButton
            color="inherit"
            >
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
           <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize:14,
              display: { xs: "none", sm: "block" },
            }}
          >
            Notifications
          </Typography>
        
      </MenuItem>
{/* onClick={handleProfileMenuOpen} */}
      <MenuItem >
         <IconButton  color="inherit">
              <Avatar
              
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: "orange",
                  fontSize: 14,
                }}
              >
               {firstLetter}
              </Avatar>
            </IconButton>
            <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize:14,
              display: { xs: "none", sm: "block" },
            }}
          >
            Profile
          </Typography>
            
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          // backgroundColor: "#1E293B" ,
          background: "linear-gradient(90deg, #1e3c72, #2a5298)",
          // backgroundColor: "#4CAF50",
          // backgroundColor: "#2E7D32",
borderBottom: "1px solid #E5E7EB",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}
      >
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit">
            {/* <MenuIcon /> */}
          </IconButton>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              letterSpacing: 1,
              display: { xs: "none", sm: "block" },
            }}
          >
            {productname}
          </Typography>

          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search products…" />
          </Search> */}

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>


          <IconButton color="inherit" onClick={handleNotificationOpen}>
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

            <IconButton  color="inherit">
              <Avatar
              
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: "orange",
                  fontSize: 14,
                }}
              >
               {firstLetter}
              </Avatar>
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={handleMobileMenuOpen} color="inherit">
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}
      {renderNotificationMenu}
      
    </Box>
  );
}
