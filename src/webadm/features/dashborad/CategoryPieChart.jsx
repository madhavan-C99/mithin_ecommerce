
import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { dashboradAPI } from "./dashboradAPI";


import empty_box from '../../../assets/empty_box.gif'

export default function CategoryPieChart() {
  const [filterType, setFilterType] = useState("year");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchChartData = async () => {
    try {
      setLoading(true);

    const response = await dashboradAPI.categoryrevenue(filterType,);
      const colors = [ "#ed6c02", "#80a882","#677b8f", "#9c27b0", "#d32f2f"];
      const formatted = response.data.data
        .filter((item) => item.total_revenue > 0)
        .map((item, index) => ({
          id: index,
          value: item.total_revenue,
          label: item.category_name,
          color: colors[index % colors.length],
        }));
      setChartData(formatted);
    } catch (error) {
      console.error("Pie API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [filterType]);

  const totalRevenue = chartData.reduce(
    (sum, item) => sum + item.value,
    0
  );



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
    <Box sx={{ width: "50%", }}>
      {/* Header */}
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          
        }}
      >
       
      </Box> */}

      {/* Chart Card */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
        }}
      >
        {/* ---------------- ---- */}
        <Box sx={{display:"flex",justifyContent:"space-between"}}>
           <Typography variant="h6" fontWeight="bold">
              Revenue Distribution
            </Typography>

            <FormControl size="small">
              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                sx={filterstyle}
              >
                <MenuItem value="year" sx={filterstyle}>Yearly</MenuItem>
                <MenuItem value="today" sx={filterstyle}>Today</MenuItem>
                <MenuItem value="yesterday" sx={filterstyle}>Yesterday</MenuItem>
                <MenuItem value="weekly" sx={filterstyle}>Weekly</MenuItem>
                <MenuItem value="monthly" sx={filterstyle}>Monthly</MenuItem>
              </Select>
            </FormControl>
        </Box>
        {/* ----------------------- */}
        {loading ? (
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        ) : chartData.length === 0 ? (
          <Typography align="center" color="text.secondary">
                               <Box
                                 display="flex"
                                 flexDirection="column"
                                 alignItems="center"
                                 justifyContent="center"
                                 height={280}
                                 marginTop={5}
                                 sx={{
                                   opacity: 0.7
                                 }}
                               >
                                 {/* Animation */}
                                 <img
                                   src={empty_box}
                                   alt="orders not found"
                                  //  width={"100%"}
                                   height={"100%"}
                                   style={{
                                     animation: "float 2s ease-in-out infinite"
                                   }}
                                 />
           
                                 <Typography mt={2} color="text.secondary">
                                  Revenue Not Found 
                                 </Typography>
           
                               </Box>
          </Typography>
        ) : (
          <Box position="relative">
            <PieChart
              height={320}
              series={[
                {
                  data: chartData,
                  outerRadius: 140,
                  innerRadius: 50, // donut style
                  paddingAngle: 3,
                  cornerRadius: 8,

                  // category_img Animation logic (like your first example)
                  highlightScope: {
                    fade: "global",
                    highlight: "item",
                  },

                  faded: {
                    innerRadius: 40,
                    additionalRadius: -20,
                    color: "#d1d5db",
                  },

                  highlighted: {
                    additionalRadius: 15,
                  },

                  // Percentage label inside arc
                  arcLabel: (item) => {
                    const percentage = (
                      (item.value / totalRevenue) *
                      100
                    ).toFixed(0);
                    return `${percentage}%`;
                  },
                },
              ]}
              slotProps={{
                legend: {
                  direction: "column",
                  position: {
                    vertical: "middle",
                    horizontal: "right",
                  },
                },
              }}
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
}