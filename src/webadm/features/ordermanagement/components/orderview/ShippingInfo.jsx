
import { Box, Paper, Typography } from "@mui/material";
const ShippingInfo = ({shipping}) =>{
    return(
        <>
        {/* <Box > */}
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
      color: "#2c3e50",
       fontSize: {
        xs: "10px",
        sm: "12px",
        md: "13px",
        lg: "14px",
      },
    }}
  >
    Shipping Address
  </Typography>

  <Box display="flex" flexDirection="column" gap={0.5}>
    
    {/* Common Row Style */}
    {[
      { label: "Address Line 1", value: shipping?.address_line1 },
      { label: "", value: shipping?.address_line2 },
      { label: "Address Type", value: shipping?.address_type },
      { label: "City", value: shipping?.city },
      { label: "Mobile", value: shipping?.mobile },
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
        {/* </Box> */}
        </>
    )
}
export default ShippingInfo;