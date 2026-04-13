import {
  Paper,
  Box,
  Typography,
  MenuItem,
  FormControl,
  Select,
  Grid,
  CircularProgress,
} from "@mui/material";

import { useState, useEffect } from "react";

//api
import { orderAPI} from "../orderAPI.JS";


const OrderTiles = () =>{
    
    const [filterType, setFilterType] = useState("year");
    const [loading, setLoading] = useState(false);
    const [data , setData]= useState([]);

    // ===============WEBSOCKET===============
     useEffect(() => {
        const socket = new WebSocket(
          `${import.meta.env.VITE_WS_BASE_URL}/ws/order_top_tile/`
        );
    
        socket.onopen = () => {
            console.log("websocket connect succesfully")
          socket.send(JSON.stringify({"action":"order_tile"} ));
        };

        //  Here we us Optional Chain  
        socket.onmessage = (event) => {
            try {
                const parsedData = JSON.parse(event.data);
                console.log("data for order tile boxes", parsedData);

                setData(parsedData.payload?.[0] || {});
            } catch (error) {
                console.error("Invalid JSON:", event.data);
            }
            };
    
        return () => socket.close();
      }, []);

    //   FILTER
    const fetchFilter = async () => {

      try {
        setLoading(true);
        const response = await orderAPI.getfilterApi(filterType);

        setData(response.data.data[0]);
        setLoading(false);
    
      } catch (error) {
        console.error("Dashboard API Error:", error);
        setLoading(false);
      }
    };
    
      useEffect(() => {
        fetchFilter();
      }, [filterType]);

    //   CARD DESIGN 
 const cardStyle = {
  p: { xs: 2, sm: 3 },
  borderRadius: 3,
  boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
  height: { xs: 60, sm: 50, md: 100 },
  width: { xs: 80, sm: 100, md: 140, },
  display: "flex",
//   flexDirection: "row",
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
      
      return(
        <>
            <Box sx={{ mb: 5}}>

                {/* FILTER DROPDOWN */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
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
               <Grid
  container
  sx={{
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr 1fr 1fr",           // mobile
      sm: "1fr 1fr 1fr",       // tablet
      md: "1fr 1fr 1fr 1fr",   // small laptop
      lg: "1fr 1fr 1fr 1fr 1fr" // desktop
    },
    gap: 2,
    rowGap:3,
    justifyContent:"center",
    alignItems: "center"
  }}
>

  {/* TOTAL ORDER */}
  <Paper
    sx={{
      ...cardStyle,
      background: "#d9e1eb",
    //   height: 100,
      width: "70%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center"
    }}
  >
    <Typography sx={{ fontSize: { xs: 14, md: 18 }, fontWeight: 700 }}>
      Total Order
    </Typography>

    {loading ? (
      <CircularProgress size={24} />
    ) : (
      <Typography fontWeight="bold" sx={{ fontSize: { xs: 20, md: 24 } }}>
        {data.total_order}
      </Typography>
    )}
  </Paper>

  {/* NEW ORDER */}
  <Paper
    sx={{
      ...cardStyle,
      background: "#f0fdf4",
    //   height: 100,
      width: "70%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center"
    }}
  >
    <Typography sx={{ fontSize: { xs: 14, md: 18 }, fontWeight: 700 }}>
      New Order
    </Typography>

    {loading ? (
      <CircularProgress size={24} />
    ) : (
      <Typography fontWeight="bold" sx={{ fontSize: { xs: 20, md: 24 } }}>
        {data.new_orders}
      </Typography>
    )}
  </Paper>

  {/* COMPLETE ORDER */}
  <Paper
    sx={{
      ...cardStyle,
      background: "#fefce8",
    //   height: 100,
    //   width: "100%",
     width: "70%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center"
    }}
  >
    <Typography sx={{ fontSize: { xs: 14, md: 18 }, fontWeight: 700 }}>
      Complete Order
    </Typography>

    {loading ? (
      <CircularProgress size={24} />
    ) : (
      <Typography fontWeight="bold" sx={{ fontSize: { xs: 20, md: 24 } }}>
        {data.completed_orders}
      </Typography>
    )}
  </Paper>

  {/* PENDING ORDER */}
  <Paper
    sx={{
      ...cardStyle,
      background: "#fef2f2",
    //   height: 100,
    //   width: "100%",
     width: "70%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center"
    }}
  >
    <Typography sx={{ fontSize: { xs: 14, md: 18 }, fontWeight: 700 }}>
      Pending Order
    </Typography>

    {loading ? (
      <CircularProgress size={24} />
    ) : (
      <Typography fontWeight="bold" sx={{ fontSize: { xs: 20, md: 24 } }}>
        {data.pending_orders}
      </Typography>
    )}
  </Paper>

  {/* CANCELLED ORDER */}
  <Paper
    sx={{
      ...cardStyle,
      background: "#fafef2",
    //   height: 100,
    //   width: "100%",
     width: "70%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center"
    }}
  >
    <Typography sx={{ fontSize: { xs: 14, md: 18 }, fontWeight: 700 }}>
      Cancelled Order
    </Typography>

    {loading ? (
      <CircularProgress size={24} />
    ) : (
      <Typography fontWeight="bold" sx={{ fontSize: { xs: 20, md: 24 } }}>
        {data.cancelled_orders}
      </Typography>
    )}
  </Paper>

</Grid>
                {/* </Grid> */}

                </Box>
        </>   
      );
}
export default OrderTiles