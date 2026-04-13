import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  CircularProgress
} from "@mui/material";
// import CountUp from "react-countup";
import { dashboradAPI } from "./dashboradAPI";

export default function DataBoxes() {

  const [filterType, setFilterType] = useState("year");
  const [loading, setLoading] = useState(false);

  const [dashboardData, setDashboardData] = useState({
    total_products: 0,
    total_revenue: 0,
    total_customers: 0,
    pending_orders: 0
  });

  // ---------------- SINGLE API CALL ----------------
  const fetchDashboard = async () => {
  try {
    setLoading(true);

    const response = await dashboradAPI.topcards(
     filterType);


    setDashboardData(response.data.data[0]);

    setLoading(false);

  } catch (error) {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchDashboard();
  }, [filterType]);

  const cardStyle = {
  p: { xs: 2, sm: 3 },
  borderRadius: 3,
  boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
  height: { xs: 60, sm: 50, md: 100 },
  width: { xs: 80, sm: 100, md: 140, },
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  transition: "0.3s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
  }
};

  const filterstyle={
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px",
               backgroundColor: "#FFFFFF",
                transition: "0.3s"
              },
                 "& input::placeholder": {
      fontSize: {
        xs: "9px",
        sm: "12px",
        md: "14px",
        lg: "14px"
      },
      opacity: 0.5
    },
    "& .MuiSelect-select": {
      fontSize: {
        xs: "11px",
        sm: "12px",
        md: "13px",
        lg: "13px"
      },
      color: "#374151"
    },
          "& .MuiInputLabel-root": {
      fontSize: {
        xs: "12px",
        sm: "13px",
        md: "14px",
        lg: "14px"
      },
      color: "#6B7280",
      fontWeight: 500
    },
    color: "#84868a",
      fontSize: {
        xs: "10px",
        sm: "12px",
        md: "13px",
          lg: "13px"
          },
        fontWeight:600
}

  return (
    <Box sx={{ m: 3 }}>

      {/* FILTER DROPDOWN */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3}}>
        <FormControl size="small">
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            sx={filterstyle}
          >
            <MenuItem value="year" sx={filterstyle}>Yearly</MenuItem>
            {/* <MenuItem value="all">All</MenuItem> */}
            <MenuItem value="today" sx={filterstyle}>Today</MenuItem>
            <MenuItem value="yesterday" sx={filterstyle}>Yesterday</MenuItem>
            <MenuItem value="weekly" sx={filterstyle}>Weekly</MenuItem>
            <MenuItem value="monthly" sx={filterstyle}>Monthly</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* SUMMARY CARDS */}
      {/* <Grid container spacing={0} sx={{display:"flex", justifyContent:"space-evenly", alignItems:"center"}} > */}
<Grid
  container
  sx={{
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",           // mobile
      sm: "1fr 1fr 1fr",       // tablet
      md: "1fr 1fr 1fr 1fr",   // small laptop
      lg: "1fr 1fr 1fr 1fr" // desktop
    },
    gap: 3,
    rowGap:3,
    justifyContent:"center",
    alignItems: "center",

  }}
>

          <Paper sx={{ ...cardStyle, background: "#dae4f0", flexDirection: "column",height:"120px", alignItems:"center",textAlign:"center",width:'70%' }}>
            <Typography variant="h5" sx={{ fontSize: { xs: 14, md: 18 }, fontWeight: 700 ,marginBottom:2}}>
              Total Products
            </Typography>
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <Typography variant="h5" fontWeight="bold"  sx={{ fontSize: { xs: 20, md: 24 } }}>
                 {dashboardData.total_product || 0}
              </Typography>
            )}
          </Paper>
      

          <Paper sx={{ ...cardStyle, background: "#f0fdf4",height:"120px", flexDirection: "column",alignItems:"center",width:'70%'  }}>
            <Typography variant="h5" sx={{ fontSize: { xs: 14, md: 18 }, fontWeight: 700 ,marginBottom:2}}>
              Total Revenue
            </Typography>
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <Typography variant="h5" fontWeight="bold"  sx={{ fontSize: { xs: 20, md: 24 } }}>
                 ₹ {dashboardData.total_revenue || 0} 
              </Typography>
            )}
          </Paper>
        

          <Paper sx={{ ...cardStyle, background: "#fefce8",height:"120px",  flexDirection: "column",alignItems:"center",width:'70%'  }}>
            <Typography variant="h5" sx={{ fontSize: { xs: 14, md: 18 }, fontWeight: 700 ,marginBottom:2}}>
              Total Orders
            </Typography>
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <Typography variant="h5" fontWeight="bold"  sx={{ fontSize: { xs: 20, md: 24 } }}>
                {dashboardData.total_orders || 0}
              </Typography>
            )}
          </Paper>

          <Paper sx={{ ...cardStyle, background: "#fef2f2",height:"120px",  flexDirection: "column",alignItems:"center",width:'70%'  }}>
            <Typography variant="h5" sx={{ fontSize: { xs: 14, md: 18 }, fontWeight: 700 ,marginBottom:2}}>
              New Orders
            </Typography>
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <Typography variant="h5" fontWeight="bold"  sx={{ fontSize: { xs: 20, md: 24 } }}>
                {dashboardData.total_new_orders || 0}
              </Typography>
            )}
          </Paper>

      </Grid>

    </Box>
  );
}