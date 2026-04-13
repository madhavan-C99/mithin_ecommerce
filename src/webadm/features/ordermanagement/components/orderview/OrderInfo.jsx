import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  IconButton,
  FormControl,
  Select,
//   OrderTable,
  Dialog,
  Chip,
//   Orders,
  MenuItem,
  TextField
} from "@mui/material";
import { red } from "@mui/material/colors";

const OrderInfo = ({order_info}) => {
    
    const statusColors = {
//   Success: "#4caf50",        // green
  Pending: "#9e7c49",        // orange
  Confirmed: "#61afef",      // blue
  Cancelled: "#ee594e",      // red
  Processing: "#c772d5",     // purple
  Packed: "#5566c7",
  Shipped: "#6fcdda",
  Out_For_Delivery: "#5ac397",
  Delivered: "#2e7d32"
};

const statusFlow = {
  Pending: ["Confirmed", "Cancelled"],
  Confirmed: ["Processing", "Cancelled"],
  Processing: ["Packed", "Cancelled"],
  Packed: ["Shipped"],
  Shipped: ["Out_For_Delivery"],
  Out_For_Delivery: ["Delivered"],
  Delivered: [],
  Cancelled: []
};
    return(
        <>
        <Box width={"100%"}>
            <Paper
            elevation={4}
            sx={{
                p: 2,
        
                // borderRadius: 3,
                // background: "linear-gradient(135deg, #b7cae6, #444c56)"
            }}
            >
           
           <Box  display="flex"  gap={5} marginBottom={2} >
                {/* ORDER NUMBER */}
                <Box display="flex" justifyContent="space-between">
                    <Typography sx={{ fontWeight: 600, marginTop:0.5}}>
                        Order Number :
                    </Typography>
                    <Typography  bgcolor={"#7ff190"} padding={0.5} fontSize={1} borderRadius={2} marginLeft={2} fontWeight={1000}>
                        {order_info?.order_number.toUpperCase() || " - "}
                    </Typography>
                </Box>

                {/* ORDER STATUS */}
                <Box display="flex" justifyContent="space-between">
                    <Typography sx={{ fontWeight: 600 ,marginTop:0.5}}>
                        Order Status :
                    </Typography>
                    <Typography  bgcolor={"#c2c4c3"} padding={0.5} fontSize={19} borderRadius={2} marginLeft={2} fontWeight={1000} >
                        {order_info?.status || "-"}
                       
                    </Typography>
                </Box>

           </Box>

            <Box display="flex"  gap={2} textAlign={"center"}>
                
                {/* ORDER DATE TIME  */}
                <Box display="flex" justifyContent="space-between">
                <Typography sx={{ fontWeight: 600 }}>
                    Order Date Time :
                </Typography>
                <Typography  marginLeft={2}>
                    {order_info?.order_date_time || " - "}
                </Typography>
                </Box>

                {/* UPDATE DATE TIME */}
                <Box display="flex" justifyContent="space-between">
                <Typography sx={{ fontWeight: 600 }}>
                    Update Time : 
                </Typography >
                  <Typography  marginLeft={2}>
                    {order_info?.update_date_time || " - "}
                </Typography>
                </Box>

            </Box>
            </Paper>
        </Box>

        </>
    )
}
export default OrderInfo