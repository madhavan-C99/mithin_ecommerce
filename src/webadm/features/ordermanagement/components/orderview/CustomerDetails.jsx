

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



export const CustomerDetails = ({ customer }) => {


  return (
<Paper
  elevation={0}
  sx={{
    p: 2,
    // minHeight: "93%",
    backgroundColor:"#f8f8f8",
    borderRadius: 3,
  }}
>
  <Typography
    variant="h5"
    sx={{
      fontWeight: "bold",
      mb: 2,
      fontSize: {
        xs: "10px",
        sm: "12px",
        md: "13px",
        lg: "14px",
      },
      color: "#2c3e50",
    }}
  >
    Customer Details
  </Typography>

  <Box display="flex" flexDirection="column" gap={0.5}>
    
    {[
      { label: "Customer Name", value: customer?.customer_name },
      { label: "Mobile Number", value: customer?.mobile },
      { label: "Email", value: customer?.email },
    ].map((item, index) => (
      <Box
        key={index}
        display="grid"
        gridTemplateColumns="120px 10px 1fr"
        alignItems="start"
      >
        {/* Label */}
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: {
              xs: "10px",
              sm: "11px",
              md: "12px",
              lg: "12px",
            },
          }}
        >
          {item.label}
        </Typography>

        {/* Colon */}
        <Typography>:</Typography>

        {/* Value */}
        <Typography
          color="text.secondary"
          sx={{
            fontSize: {
              xs: "10px",
              sm: "11px",
              md: "12px",
              lg: "12px",
            },
            wordBreak: "break-word",
          }}
        >
          {item.value || " - "}
        </Typography>
      </Box>
    ))}
  </Box>
</Paper>
  );
};

export default CustomerDetails;