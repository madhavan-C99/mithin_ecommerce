          {/* BUTTONS */}
//      <Grid item xs={12} display="flex" justifyContent="center" gap={4} sx={{width:"100%"}}>
//   <Button variant="contained" sx={{ width: 200 }}>
//     Save Product
//   </Button>

//   <Button variant="contained" sx={{ width: 200 }}>
//     Reset
//   </Button>
// </Grid>


import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Tooltip,
  Collapse,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

import AllProduct from "../../features/products/AllProduct";
import AllCategory from "../../features/category/AllCategory";
import AllSubCategory from "../../features/subcategory/AllSubCategory";
import OrderPage from "../../features/ordermanagement/pages/OrderPage";
import Notification from "../../features/notification/Notification";
import Navbar from "./AdmNavbar"
import { DashboardContext } from "../../context/AuthContext";
// Icons
import logo from "../../../assets/adm_logo.png"

import StreamSharpIcon from "@mui/icons-material/StreamSharp";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import ApprovalIcon from "@mui/icons-material/Approval";
import CategoryIcon from "@mui/icons-material/Category";
import PaymentIcon from "@mui/icons-material/Payment";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import GroupIcon from "@mui/icons-material/Group";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import BusinessIcon from "@mui/icons-material/Business";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CusUser from "../../features/usermanagement/components/CusUser";
import DashboradView from "../../features/dashborad/DashboradView";



export default function DashboardLayout() {
  const [selected, setSelected] = useState("Dashboard");
  const [hover, setHover] = useState(false);
  const [openMaster, setOpenMaster] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <SpaceDashboardIcon /> },
    { name: "User Management", icon: <GroupIcon /> },
    {
      name: "Master Management",
      icon: <CatchingPokemonIcon />,
      children: [
        { name: "Categories", icon: <AllInboxIcon /> },
        { name: "SubCategory", icon: <ApprovalIcon /> },
        { name: "All Products", icon: <CategoryIcon /> },
      ],
    },
    // { name: "Business Management", icon: <BusinessIcon /> },
    { name: "Order Management", icon: <PaymentIcon /> },
    { name: "Notifications", icon: <NotificationsNoneIcon /> },
  ];



  const navigate = useNavigate();
  
  // ✅ Token check - இல்லன்னா signin-க்கு அனுப்பு
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/${adminPath}/signin");
    }
  }, []);

  // Logout fix
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/${adminPath}/signin");  // ✅ "/" இல்ல, "/admin/signin"
  };





  useEffect(() => {
    const masterChildren = ["Categories", "SubCategory", "All Products"];
    if (masterChildren.includes(selected)) {
      setOpenMaster(true);
    }
  }, [selected]);

  const renderComponent = () => {
    switch (selected) {
      case "Categories":
        return <AllCategory />;
      case "SubCategory":
        return <AllSubCategory />;
      case "All Products":
        return <AllProduct />;
      case "Dashboard":
        return <DashboradView />;
      case "Order Management":
        return <OrderPage/>;
      case "Notifications":
        return <Notification/>
      case "User Management":
        return <CusUser/>
 
      default:
        return (
          <Typography variant="h5" sx={{ p: 4 }}>
            {selected} Page
          </Typography>
        );
    }
  };

  return (
    <DashboardContext.Provider value={{selected, setSelected}}>
       <Box sx={{ display: "flex", height: "100%",zIndex:-999, background: "#f5f6f8" , overflowY:"hidden"}}>
      
      {/* Sidebar */}
      <Box
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        sx={{
          width: hover ? 240 : 80,
          transition: "all 0.4s ease",
          // backgroundColor: "#111827",
          backgroundColor: "#095c90",
          //  backgroundColor: "#095c90",
          //  backgroundColor: "#4CAF50",
          // backgroundColor: "#2E7D32",
          color: "#ffff",
          display: "flex",
          flexDirection: "column",
          p: 1,
          position:"fixed",   //me 
          left: 0,
          top: 0,
          height: "100%",     // full height
          zIndex: 1200 ,
          overflowY:"auto",
            "&::-webkit-scrollbar": {
      display: "none",
    },
    msOverflowStyle: "none",     // IE
    scrollbarWidth: "none",  
    
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: hover ? "flex-start" : "center",
            mb: 3,
            // backgroundColor:"#fbfbfba5"
          }}
        >
              <img
              src={logo}
              alt="orders not found"
              width={hover ?70:100}
               height={hover ?70:80}
              style={{
              animation: "float 2s ease-in-out infinite"
              }}/>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    ml: 0,
                    opacity: hover ? 1 : 0,   // 🔥 முக்கியம்
                    width: hover ? "auto" : 0, // 👉 space occupy ஆகாதே
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    transition: "all 0.3s ease",
                    color:"#f7f9f6"
                  }}
                >
                  SM Veg Mart
                </Typography>
          
        </Box>

        {/* Menu Section */}
        <Box sx={{ flexGrow: 1 }}>
          <List>
            {menuItems.map((item) => {
              if (item.children) {
                return (
                  <Box key={item.name}>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => setOpenMaster(!openMaster)}
                        sx={{
                          borderRadius: 2,
                          mb: 1,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            color: "#9ca3af",
                            // color:"#FFf",
                            minWidth: 0,
                          mr: hover ? 2 : 2 ,
                            justifyContent: "center",
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>

                        
                                              <ListItemText
                        primary={item.name}
                        sx={{
                          opacity: hover ? 1 : 0,
                          whiteSpace: "nowrap",
                          transition: "opacity 0.3s ease",
                        }}
                      />
                       
                      </ListItemButton>
                    </ListItem>
                          {/* sidebar la parent ull erukka child hover */}
                    <Collapse in={openMaster && hover}>
                      <List component="div" disablePadding>
                        {item.children.map((sub) => (
                          <ListItem key={sub.name} disablePadding>
                            <ListItemButton
                              onClick={() => setSelected(sub.name)}
                              sx={{
                                pl: 5,
                                borderRadius: 2,
                                mb: 1,
                                backgroundColor:
                                  selected === sub.name
                                    // ? "#2E7D32"
                                    // ? "#1c521d"
                                     ? "#1e1f4f"
                                    : "transparent",
                              }}
                            >
                              <ListItemIcon
                                sx={{
                                  color:
                                    selected === sub.name
                                      ? "#fff"
                                      : "#9ca3af",
                                  minWidth: 0,
                                 mr: hover ? 2 : 2 ,
                                }}
                              >
                                {sub.icon}
                              </ListItemIcon>

                              <ListItemText
                                primary={sub.name}
                                sx={{
                                  color:
                                    selected === sub.name
                                      ? "#fff"
                                      : "#E8F5E9",
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  </Box>
                );
              }

              return (
                <ListItem key={item.name} disablePadding>
                  <Tooltip title={!hover ? item.name : ""} placement="right">
                    <ListItemButton
                      onClick={() => setSelected(item.name)}
                      sx={{
                        borderRadius: 2,
                        mb: 1,
                        backgroundColor:
                        selected === item.name
                          // ? "#2E7D32"
                          // ? "#1c521d"
                          ? "#1c2a52"
                          : "transparent",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color:
                          selected === item.name
                            ? "#FFFFFF"
                             : "#ffffff",
                            // : "#C8E6C9",
                          minWidth: 0,
                          mr: hover ? 2 : 2 ,
                          justifyContent: "center",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>

                   <ListItemText
  primary={item.name}
  sx={{
    opacity: hover ? 1 : 0,
    whiteSpace: "nowrap",
    transition: "opacity 0.3s ease",
  }}
/>
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              );
            })}
          </List>
        </Box>

        {/* Bottom Section */}
        <Box>
          <Divider sx={{ backgroundColor: "#374151",backgroundColor: "#0b2d48", my: 2 }} />

          <List>
        

            <ListItem disablePadding>
                <ListItemButton onClick={handleLogout}>
                  <LogoutIcon sx={{ mr: hover ? 2 : 0 }} />
                  {hover && <ListItemText primary="Logout" />}
                </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" ,width:"91vw", ml: "90px",
          overflow:"hidden",
      }}>
        <Box sx={{ backgroundColor: "#fff", px: 1, py: 0 , overflowX:"hidden"}}>
          <Navbar />
        </Box>

        <Box sx={{ flexGrow: 1, p: 3, overflowY: "auto" ,position: "sticky",
          top: 250,
          zIndex: 5}}>
            
          {renderComponent()}
        </Box>
      </Box>
    </Box>
    </DashboardContext.Provider>
  );
}