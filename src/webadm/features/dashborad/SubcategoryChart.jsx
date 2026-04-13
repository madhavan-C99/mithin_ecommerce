import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
//   BarChart
} from "@mui/material";
import { BarChart } from "@mui/x-charts";

import { dashboradAPI } from "./dashboradAPI";

export default function SubCategoryChart() {

  const [filterType, setFilterType] = useState("year");
  const [chartdata, setChartData] = useState([]);
  
  // ---------------- SINGLE API CALL ----------------
  const fetchChartData  = async () => {
  try {
    // setLoading(true);

    const response = await dashboradAPI.piechart( 
   filterType
    );


    setChartData(response.data.data);

    // setLoading(false);
  } catch (error) {
    console.error("Dashboard API Error:", error);
    // setLoading(false);
  }
};

  useEffect(() => {
    fetchChartData();
  }, [filterType]);

  const StockValue = chartdata.map(item => item.total_stock_qty)
  const CategoryName = chartdata.map ( item => item.subcategory_name)
  const SalesValue = chartdata.map(item => item.total_sales_qty);

  const cardStyle = {
    p: 3,
    borderRadius: 3,
    boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
    height: 120,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
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
    <Box sx={{ mb: 4, width:"50%" }}>
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
            <MenuItem value="week" sx={filterstyle}>Weekly</MenuItem>
            <MenuItem value="month" sx={filterstyle}>Monthly</MenuItem>
            </Select>
        </FormControl>
        </Box>

      
           
            <BarChart
  height={400}
  xAxis={[
    {
      scaleType: "band",
      data: CategoryName,
      categoryGapRatio: 0.4,
      barGapRatio: 0.2,
      tickLabelStyle: {
        angle: -45,
        textAnchor: "end",
      }
    }
  ]}
  yAxis={[
    { label: "Quantity" }
  ]}
  series={[
    {
      data: StockValue,
      label: "Stock",
      color: "#1976d2"
    },
    {
      data: SalesValue,
      label: "Sales",
      color: "#2e7d32"
    }
  ]}
  grid={{ horizontal: true }}
/>

    </Box>
  );
}