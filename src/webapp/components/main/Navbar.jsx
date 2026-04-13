import { useState,  useMemo, useCallback } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Badge,
  InputBase,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Divider,
} from "@mui/material";

import {
  LocationOn,
  ShoppingCart,
  Person,
  Search,
  Menu as MenuIcon,
  Close as CloseIcon,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";

import { InputAdornment } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import useCategoryMenu from "../../hooks/UseCategoryMenu";

import logo from "../../../assets/logo.png";

import { useSelector, useDispatch } from "react-redux";
import { openCartDrawer } from "../../store/UiSlice";
import { useAuth } from "../../context/AuthContext";

import LocationPickerDialog from "../maps/LocationPickerDialog";
import { setDeliveryStatus } from "../../store/DeliverySlice";
import { findCustomerDistance } from "../../api/AllApi";

import { LocalShipping } from "@mui/icons-material";

import { showNotification } from "../../store/DistanceNotifySlice";
import useOrderTracking from "../../hooks/UseOrderTracking";

// global search 
import useAllProductsSearch from "../../hooks/useAllProductsSearch ";
import SearchDropdown from "../search/SearchDropDown";
import { useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const { categories, subCategories, fetchSubCategories } = useCategoryMenu();

  const { orders } = useOrderTracking();
  const activeOrderCount = orders?.length || 0;

  // Desktop dropdown state
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  // Mobile drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const primaryColor = "#4CAF50";
  const hoverBg = "rgba(76,175,80,0.15)";
  const borderColor = "rgba(76,175,80,0.3)";
  const shadowColor = "rgba(0,0,0,0.08)";

  const userInitial = user?.name?.[0]?.toUpperCase();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  // search dropdown
  // const { allProducts, loadingSearch } = useAllProductsSearch();
// const [searchQuery, setSearchQuery] = useState("");
// const [searchFocused, setSearchFocused] = useState(false);

const [mapOpen, setMapOpen] = useState(false);

// global search
const { products, loading } = useAllProductsSearch();

const [searchQuery, setSearchQuery] = useState("");
const [searchFocused, setSearchFocused] = useState(false);
const [mobileSearchOpen, setMobileSearchOpen] = useState(false);


const deliveryAddress = useSelector(
  (state) => state.delivery.address
);

const delivery = useSelector((state) => state.delivery);
// // ADD this after your existing delivery selectors
// const activeOrderCount = useSelector(
//   (state) => state.order.activeOrderCount
// );


// Auto-open map after login redirect
useEffect(() => {
  if (isAuthenticated && location.state?.openMap) {
    setMapOpen(true);
    // Clear the state so map doesn't reopen on next render
    navigate(location.pathname, { replace: true, state: {} });
  }
}, [isAuthenticated, location.state]);




// global filter logic
const searchResults = useMemo(() => {
  if (!searchQuery.trim()) return [];

  const q = searchQuery.toLowerCase();

  return products
    .filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.tamil_name?.toLowerCase().includes(q)
    )
    .slice(0, 8);
}, [searchQuery, products]);


const handleSearchClose = useCallback(() => {
  setSearchQuery("");
  setSearchFocused(false);
}, []);




  const handleProfileClick = () => {
    navigate(isAuthenticated ? "/account/profile" : "/login");
    setDrawerOpen(false);
  };

  const handleSubClick = (categoryId, subId) => {
    const category = categories.find((c) => c.id === categoryId);
    const subCategory = subCategories[categoryId]?.find((s) => s.id === subId);
    navigate("/products", {
      state: {
        categoryId,
        subCategoryId: subId,
        categoryName: category?.name,
        subCategoryName: subCategory?.name,
      },
    });
    setMenuOpen(false);
    setActiveCategory(null);
    setDrawerOpen(false);
  };

  const handleMobileCategoryExpand = (catId) => {
    if (!subCategories[catId]) fetchSubCategories(catId);
    setExpandedCategory(expandedCategory === catId ? null : catId);
  };

  // ─── Mobile Drawer ───────────────────────────────────────────────
  const MobileDrawer = (
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      PaperProps={{ sx: { width: 280 } }}
    >
      {/* Drawer Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1.5,
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{ height: 40, objectFit: "contain" }}
        />
        <IconButton onClick={() => setDrawerOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List disablePadding>
        {/* Home */}
        <ListItem
          button
          onClick={() => { navigate("/"); setDrawerOpen(false); }}
          sx={{ py: 1.5, "&:hover": { backgroundColor: hoverBg } }}
        >
          <ListItemText primary="Home" primaryTypographyProps={{ fontWeight: 600 }} />
        </ListItem>

        <Divider />

        {/* Categories with expand */}
        {categories.map((cat) => (
          <Box key={cat.id}>
            <ListItem
              button
              onClick={() => handleMobileCategoryExpand(cat.id)}
              sx={{ py: 1.5, "&:hover": { backgroundColor: hoverBg } }}
            >
              <ListItemText
                primary={cat.name}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
              {expandedCategory === cat.id ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={expandedCategory === cat.id} timeout="auto" unmountOnExit>
              <List disablePadding>
                {subCategories[cat.id]?.map((sub) => (
                  <ListItem
                    button
                    key={sub.id}
                    onClick={() => handleSubClick(cat.id, sub.id)}
                    sx={{
                      pl: 4,
                      py: 1.2,
                      "&:hover": { backgroundColor: hoverBg },
                    }}
                  >
                    <ListItemText
                      primary={sub.name}
                      primaryTypographyProps={{ fontSize: "0.875rem", color: "#555" }}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
            <Divider />
          </Box>
        ))}

        {/* About */}
        <ListItem
          button
          onClick={() => { navigate("/about"); setDrawerOpen(false); }}
          sx={{ py: 1.5, "&:hover": { backgroundColor: hoverBg } }}
        >
          <ListItemText primary="About" primaryTypographyProps={{ fontWeight: 600 }} />
        </ListItem>
      </List>
    </Drawer>
  );

  return (
    <Box sx={{ position: "sticky", top: 0, zIndex: 1200, backgroundColor: "#fff" }}>

      {/* ── PRIMARY NAVBAR ───────────────────────────────────────── */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#fff",
          color: "#000",
          boxShadow: "none",
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 1.5, sm: 2, md: 3 }, minHeight: { xs: 64, sm: 76 } }}>

          {/* Left — Hamburger (mobile only) + Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1 } }}>
            {/* Hamburger — mobile only */}
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { xs: "flex", md: "none" }, color: primaryColor }}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo */}
            <Box
              onClick={() => navigate("/")}
              sx={{ width: { xs: 110, sm: 110, md: 140 }, height: { xs: 64, sm: 52, md: 70 }, display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              <Box
                component="img"
                src={logo}
                alt="Logo"
                sx={{ height: "100%", width: "100%", objectFit: "contain" }}
              />
            </Box>
          </Box>

          {/* Deliver to — desktop only */}
          <Button
            startIcon={<LocationOn />}
            // onClick={() => setMapOpen(true)}
            onClick={() => {
              if (!isAuthenticated) {
                navigate("/login", { state: { openMap: true } });
                return;
              }
              setMapOpen(true);
            }}
            sx={{
              color: primaryColor,
              textTransform: "none",
              display: { xs: "none", md: "flex" },
              whiteSpace: "nowrap",
            }}
          >
            {/* Deliver to */}
             {deliveryAddress ? deliveryAddress.slice(0, 25) + "..." : "Deliver to"}
          </Button>

          {/* Search bar — desktop only (mobile gets its own row below) */}
          <Box
  sx={{
    flex: 1,
    mx: { sm: 2, md: 4 },
    position: "relative",
    display: { xs: "none", sm: "flex" },
    alignItems: "center",
  }}
>
  <Box
    sx={{
      width: "100%",
      backgroundColor: "#F7F9F7",
      px: 2,
      py: 0.5,
      borderRadius: 5,
      display: "flex",
      alignItems: "center",
    }}
  >
    <InputBase
      placeholder="Search products..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onFocus={() => setSearchFocused(true)}
      onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
      sx={{ flex: 1 }}
      startAdornment={
        <InputAdornment position="start">
          <Search sx={{ color: primaryColor }} />
        </InputAdornment>
      }
    />
  </Box>

  {searchFocused && (
    // <Box
    //   sx={{
    //     position: "absolute",
    //     top: "110%",
    //     width: "100%",
    //     backgroundColor: "#fff",
    //     border: "1px solid #ddd",
    //     borderRadius: 2,
    //     boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    //     zIndex: 1500,
    //     maxHeight: 300,
    //     overflowY: "auto",
    //   }}
    // >
    <Box
  sx={{
    position: "absolute",
    top: "110%",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 3,
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
    zIndex: 1500,
    maxHeight: 320,
    overflowY: "auto",
    border: "1px solid #eee",
  }}
>
      <SearchDropdown
        results={searchResults}
        loading={loading}
        onClose={() => {
          setSearchQuery("");
          setSearchFocused(false);
        }}
      />
    </Box>
  )}
</Box>

          
          {/* Right icons */}
          <Box sx={{ display: "flex", alignItems: "center" }}>

            {/* Profile */}
            <IconButton onClick={handleProfileClick} size="small">
              {userInitial ? (
                <Box
                  sx={{
                    width: { xs: 28, sm: 32 },
                    height: { xs: 28, sm: 32 },
                    backgroundColor: primaryColor,
                    color: "#fff",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  }}
                >
                  {userInitial}
                </Box>
              ) : (
                <Person sx={{ fontSize: { xs: 22, sm: 24 } }} />
              )}
            </IconButton>

            {/* Delivery icon — commented out as requested */}
            {/* <IconButton onClick={() => navigate("/order-tracking")}><LocalShipping /></IconButton> */}
            {/* Delivery icon — pulse ring + count badge */}
<IconButton
  onClick={() => navigate("/order-tracking")}
  sx={{ position: "relative", p: "8px" }}
>
  {/* Pulse ring — only shows when active orders exist */}
  {activeOrderCount > 0 && (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        borderRadius: "50%",
        "@keyframes ringPulse": {
          "0%": {
            boxShadow: "0 0 0 0px rgba(239,83,80,0.55)",
          },
          "70%": {
            boxShadow: "0 0 0 9px rgba(239,83,80,0)",
          },
          "100%": {
            boxShadow: "0 0 0 0px rgba(239,83,80,0)",
          },
        },
        animation: "ringPulse 1.8s ease-out infinite",
      }}
    />
  )}

  {/* Truck icon — glows red when active */}
  <LocalShipping
    sx={{
      fontSize: { xs: 22, sm: 24 },
      color: activeOrderCount > 0 ? "#EF5350" : "inherit",
      transition: "color 0.3s ease",
    }}
  />

  {/* Count badge — top right corner */}
  {activeOrderCount > 0 && (
    <Box
      sx={{
        position: "absolute",
        top: 2,
        right: 2,
        minWidth: 17,
        height: 17,
        backgroundColor: "#EF5350",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1.5px solid #fff",
        "@keyframes popIn": {
          "0%": { transform: "scale(0)" },
          "70%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
        animation: "popIn 0.3s ease forwards",
      }}
    >
      <Typography
        sx={{
          fontSize: "0.58rem",
          fontWeight: 700,
          color: "#fff",
          lineHeight: 1,
        }}
      >
        {activeOrderCount}
      </Typography>
    </Box>
  )}
</IconButton>


            {/* Cart */}
            <IconButton
            //  onClick={() => dispatch(openCartDrawer())} 
            onClick={() => navigate("/cart")}
             size="small">
              <Badge badgeContent={totalItems} color="error">
                <ShoppingCart sx={{ fontSize: { xs: 22, sm: 24 } }} />
              </Badge>
            </IconButton>

          </Box>
        </Toolbar>


        {/* ── DELIVER TO ROW — Option A, slim borderless text strip ── */}
<Box
  onClick={() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { openMap: true } });
      return;
    }
    setMapOpen(true);
  }}
  sx={{
    display: { xs: "flex", md: "none" },
    alignItems: "center",
    gap: 0.6,
    px: 2,
    pt: 0.5,
    pb: 0,
    cursor: "pointer",
  }}
>
  {/* Pin icon — green if address set, grey if not */}
  <LocationOn
    sx={{
      fontSize: 14,
      color: deliveryAddress ? primaryColor : "#bdbdbd",
      flexShrink: 0,
    }}
  />

  {/* Label + address inline */}
  <Typography
    sx={{
      fontSize: "0.72rem",
      color: "#aaa",
      fontWeight: 500,
      flexShrink: 0,
    }}
  >
    {deliveryAddress ? "Delivering to" : "Deliver to"}
  </Typography>

  {/* Address or prompt — bold, truncated */}
  <Typography
    sx={{
      fontSize: "0.72rem",
      fontWeight: 700,
      color: deliveryAddress ? "#1a1a1a" : "#757575",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: 160,
    }}
  >
    {deliveryAddress ? deliveryAddress.slice(0, 22) + "…" : "Set location"}
  </Typography>

  {/* Subtle chevron */}
  <ExpandMore
    sx={{
      fontSize: 15,
      color: deliveryAddress ? primaryColor : "#bdbdbd",
      flexShrink: 0,
      ml: -0.3,
    }}
  />
</Box>





        {/* Search bar — mobile only, full width row */}
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },   // only on mobile
            px: 2,
            pb: 1.5,
            pt: 0.5,
          }}
        >
          {/* <Box
            sx={{
              flex: 1,
              backgroundColor: "#F7F9F7",
              px: 2,
              py: 0.8,
              borderRadius: 5,
              display: "flex",
              alignItems: "center",
              border: `1px solid ${borderColor}`,
            }}
          >
            <InputBase
              placeholder="Search products..."
              sx={{ flex: 1, fontSize: "0.85rem" }}
              startAdornment={
                <InputAdornment position="start">
                  <Search sx={{ color: primaryColor, fontSize: 20 }} />
                </InputAdornment>
              }
            />
          </Box> */}

          <Box
  onClick={() => setMobileSearchOpen(true)}
  sx={{
    flex: 1,
    backgroundColor: "#F7F9F7",
    px: 2,
    py: 0.8,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
  }}
>
  <Search sx={{ color: primaryColor, mr: 1 }} />
  <Typography fontSize="0.85rem" color="text.secondary">
    Search products...
  </Typography>
</Box>

        </Box>

        {/* Search bar — mobile full width row */}
{/* <Box sx={{ display: { xs: "flex", sm: "none" }, px: 2, pb: 1.5, pt: 0.5 }}>
  <Box sx={{ flex: 1, position: "relative" }}>
    <Box
      sx={{
        backgroundColor: "#F7F9F7",
        px: 2,
        py: 0.8,
        borderRadius: 5,
        display: "flex",
        alignItems: "center",
        border: `1px solid ${searchFocused ? primaryColor : borderColor}`,
        transition: "border 0.2s ease",
      }}
    >
      <InputBase
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
        sx={{ flex: 1, fontSize: "0.85rem" }}
        startAdornment={
          <InputAdornment position="start">
            <Search sx={{ color: primaryColor, fontSize: 20 }} />
          </InputAdornment>
        }
      />
    </Box> */}

    {/* Dropdown */}
    {/* {searchFocused && (
      <SearchDropdown
        results={searchResults}
        query={searchQuery}
        loading={loadingSearch}
        onClose={handleSearchClose}
      />
    )}
  </Box>
</Box> */}
      </AppBar>

      {/* ── SECONDARY NAVBAR — desktop only ─────────────────────── */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },   // hidden on mobile (hamburger handles it)
          justifyContent: "center",
          gap: 4,
          py: 1.8,
          backgroundColor: "#fff",
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        <Typography
          sx={{ cursor: "pointer", fontWeight: 600 }}
          onClick={() => navigate("/")}
        >
          Home
        </Typography>

        <Box
          sx={{ position: "relative" }}
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => { setMenuOpen(false); setActiveCategory(null); }}
        >
          <Typography sx={{ cursor: "pointer", fontWeight: 600 }}>
            Categories
          </Typography>

          {menuOpen && (
            <Box
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                display: "flex",
                backgroundColor: "#fff",
                border: `1px solid ${borderColor}`,
                boxShadow: `0 10px 25px ${shadowColor}`,
                zIndex: 1300,
              }}
            >
              <Box sx={{ width: 220, borderRight: `1px solid ${borderColor}` }}>
                {categories.map((cat) => (
                  <Box
                    key={cat.id}
                    onMouseEnter={() => {
                      setActiveCategory(cat.id);
                      if (!subCategories[cat.id]) fetchSubCategories(cat.id);
                    }}
                    sx={{ px: 3, py: 1.8, cursor: "pointer", "&:hover": { backgroundColor: hoverBg } }}
                  >
                    {cat.name}
                  </Box>
                ))}
              </Box>

              {activeCategory && (
                <Box sx={{ width: 240 }}>
                  {subCategories[activeCategory]?.map((sub) => (
                    <Box
                      key={sub.id}
                      onClick={() => handleSubClick(activeCategory, sub.id)}
                      sx={{ px: 3, py: 1.8, cursor: "pointer", "&:hover": { backgroundColor: hoverBg } }}
                    >
                      {sub.name}
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          )}
        </Box>

        <Typography
        onClick={() => { navigate("/about") }}
         sx={{ cursor: "pointer", fontWeight: 600 }}>
          About
        </Typography>
      </Box>

      {/* Mobile Drawer */}
      {MobileDrawer}



      <LocationPickerDialog
  open={mapOpen}
  onClose={() => setMapOpen(false)}

//   onConfirm={async ({ lat, lng, address }) => {

//     try {

//   const response = await findCustomerDistance(address);

//   const data = response?.data?.data;

//   if (!data) throw new Error("Invalid distance response");

//   const eligibility = data.eligibility === "True";

//   dispatch(
//     setDeliveryStatus({
//       lat,
//       lng,
//       address: data.formatted_address || address,
//       eligibility
//     })
//   );

//   setMapOpen(false);

// } catch (error) {

//   console.error("Distance check failed:", error);
//   alert("Unable to verify delivery availability. Please try again.");

// }

//   }

onConfirm={async ({ lat, lng, address }) => {

  try {

    const data = await findCustomerDistance(address);

    const eligibility = Boolean(data.eligibility);

//     if (delivery.source === "profile") {
//   alert("Please change your delivery address from your saved addresses in Profile.");
//   setMapOpen(false);
//   return;
// }

//  if (!eligibility) {
//   dispatch(
//   showNotification({
//     message: "Delivery is available only within 3 km. Please select a nearby address.",
//     severity: "error"
//   })
// );

//       // alert("Delivery is available only within 3 km. Please select a nearby address.");
//       return;
//     }



if (!eligibility) {
  dispatch(
    showNotification({
      message: "Delivery is available only within 3 km. Please select a nearby address.",
      severity: "error"
    })
  );

  // ← Reset delivery state so navbar shows "Deliver to" again
  dispatch(
    setDeliveryStatus({
      lat: null,
      lng: null,
      address: null,
      eligibility: false,
      source: null
    })
  );

  return;
}


    dispatch(
      setDeliveryStatus({
        lat,
        lng,
        address: data.formatted_address || address,
        eligibility,
        source: "navbar"
      })
    );

    // if (!eligibility) {
    //   alert("Sorry, we currently deliver only within 3 km radius.");
    // }

    setMapOpen(false);

  } catch (error) {

    console.error("Distance check failed:", error);
    dispatch(
  showNotification({
    message: error.message || "Unable to verify delivery availability.",
    severity: "error"
  })
);
    // alert(error.message || "Unable to verify delivery availability.");

  }

}}

/>


{mobileSearchOpen && (
  <Box
    sx={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "#fff",
      zIndex: 2000,
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* Header */}
    <Box sx={{ display: "flex", p: 2, gap: 1 }}>
      <InputBase
        autoFocus
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          flex: 1,
          backgroundColor: "#F7F9F7",
          px: 2,
          py: 1,
          borderRadius: 2,
        }}
      />

      <Typography
        onClick={() => {
          setMobileSearchOpen(false);
          setSearchQuery("");
        }}
        sx={{ cursor: "pointer", alignSelf: "center" }}
      >
        Cancel
      </Typography>
    </Box>

    {/* Results */}
    <Box sx={{ flex: 1, overflowY: "auto" }}>
      <SearchDropdown
        results={searchResults}
        loading={loading}
        onClose={() => {
          setMobileSearchOpen(false);
          setSearchQuery("");
        }}
      />
    </Box>
  </Box>
)}



    </Box>
  );
}

