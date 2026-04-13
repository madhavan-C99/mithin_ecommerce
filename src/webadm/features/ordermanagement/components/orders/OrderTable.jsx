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
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,

//   Orders,
  MenuItem,
  TextField
} from "@mui/material";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import empty_box from '../../../../../assets/empty_box.gif'



//ICONS
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";
import { useState, useMemo } from "react";
//Api
import { orderAPI } from "../orderAPI.JS";
//pages
import OrderViewPage from "../../pages/OrderViewPage.jsx";
import { useNavigate } from "react-router-dom";




// css styles
const pageheading={
    fontSize: {
      xs: "16px",
      sm: "20px",
      md: "22px",
      lg: "22px"
    },
    fontWeight:"bold",
    minWidth:7,
    mb:2
}

const tablehead={
      color: "#4B5563",
      fontSize: {
      xs: "12px",
      sm: "13px",
      md: "14px",
      lg: "14px"
      },
      fontWeight: 700
}


const productname={
      
       color: "#081b36",
      fontSize: {
        xs: "12px",
        sm: "13px",
        md: "14px",
          lg: "15px"
          },
        fontWeight:600  
}

const tabledata={
       color: "#84868a",
      fontSize: {
        xs: "10px",
        sm: "12px",
        md: "13px",
          lg: "13px"
          },
        fontWeight:600  
}


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


const OrderTable = () => {

    const [allorders, setAllOrders] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    // UPDATE
    const [selectedOrder, setSelectedOrder] = useState(null);

    // SEARCH ORDERS
    const [sortField, setSortField] = useState("normal");
    const [sortOrder, setSortOrder] = useState("normal");
    const [statusFilter, setStatusFilter] = useState("normal");

    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("")
    
const [openDialog, setOpenDialog] = useState(false);
const [selectedStatus, setSelectedStatus] = useState("");

    // WEBSOCKET 
    useEffect( () => {
        // URL FOR BACKEND 
        const socket = new WebSocket(
          `${import.meta.env.VITE_WS_BASE_URL}/ws/fetch_all_order/`
        );
        
        // CONECTION
        socket.onopen = () => {
            console.log("Webockt are connected successfully...")
            socket.send(JSON.stringify({"action":"fetch_all_order"}));
        };

        socket.onmessage = (event) => {
            try{
                const orderData = JSON.parse(event.data);
                console.log("OrderTable Data",orderData)
                setAllOrders(orderData.payload || []);
            }catch(error){
                console.log("Invalid JSON", error)
            }
        };

        return () => socket.close();
    },[]);

     // Search debounce
      useEffect(() => {
        const timer = setTimeout(() => {
          setDebouncedSearch(searchTerm);
        }, 500);
        return () => clearTimeout(timer);
      }, [searchTerm]);
    
            const handleEditClick = async (id, order_number) => {
            try {
                const result = await orderAPI.getOrderById(Number(id) , order_number);

                setSelectedOrder(result.data);


                setOpenEdit(true);
            } catch (error) {
                console.error("API error:", error.response?.data);
                // alert(error.response?.data?.detail || "Failed to fetch order");
            }
            };
    
 
      const processedOrders = useMemo(() => {
        let updated = [...(allorders || [])];
    
        if (debouncedSearch) {
          const searchValue = debouncedSearch.toLowerCase();
          updated = updated.filter((orderuser) =>
            orderuser.name?.toLowerCase().includes(searchValue) ||
            orderuser.order_number?.toString().includes(searchValue) ||
            orderuser.total_amount?.toString().includes(searchValue) ||
            orderuser.s_no?.toString().includes(searchValue)
          );
        }

        // "",
        // "CONFIRMED",
        // "CANCELLED",
        // "PROCESSING",
        // "PACKED",
        // "SHIPPED",
        // "OUT_FOR_DELIVERY",
        // "DELIVERED"
        
            if (statusFilter !== "normal") {
            updated = updated.filter(
                (p) => p.status?.toLowerCase() === statusFilter?.toLowerCase()
            );
            }
        

    
        if (sortField !== "normal" && sortOrder !== "normal") {
          updated.sort((a, b) => {
            if (sortOrder === "asc") {
              return a[sortField] - b[sortField];
            } else {
              return b[sortField] - a[sortField];
            }
          });
        }
    
        return updated;
      }, [
        allorders,
        sortField,
        sortOrder,
        statusFilter,
        debouncedSearch
      ]);




    const navigate = useNavigate();



const handleStatusChange = (order) => (e) => {
  const newStatus = e.target.value;

  setSelectedOrder(order);
  setSelectedStatus(newStatus);
  setOpenDialog(true); // 🔥 dialog open
};

const confirmStatusChange = async () => {
  try {
    await orderAPI.updatestatusApi(selectedOrder.id, selectedStatus);

    setAllOrders((prev) =>
      prev.map((item) =>
        item.id === selectedOrder.id
          ? { ...item, status: selectedStatus }
          : item
      )
    );

    setOpenDialog(false);

  } catch (err) {
    console.error("Status update error", err);
  }
};

const statusColors = {
//   Success: "#4caf50",        // green
  Pending: "#9e7c49",        // orange
  Confirmed: "#61afef",      // blue
  Cancelled: "#ee594e",      // red
  Processing: "#c772d5",     // purple
  // Packed: "#5566c7",
  // Shipped: "#6fcdda",
  Out_For_Delivery: "#5ac397",
  Delivered: "#2e7d32"
};

const statusFlow = {
  Pending: ["Confirmed", "Cancelled"],
  Confirmed: [ "Out_For_Delivery","Cancelled"],
  Out_For_Delivery: ["Delivered"],
  // Delivered: [],
  // Cancelled: []
};

    return(   
        <>
        <Paper
        elevation={0}
        sx={{
            p: 4,
            borderRadius: 3,
            background: "#ffffff",
            boxShadow: "0 8px 30px rgba(0,0,0,0.05)"
        }}
        >
        {/* HEADER */}
        <Box
            sx={{
            mb: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
            }}
        >
            <Typography variant="h5" sx={pageheading}>
            {/* <Orders></Orders> */}Orders
            </Typography>

        </Box>

        {/*  STICKY FILTER BAR ONLY */}
        <Box
            sx={{
            display: "flex",
            flexWrap:"wrap",
          justifyContent:"flex-end",
            gap: 3,
            mb: 4,
            p: 3,
            borderRadius: 3,
            background: "linear-gradient(135deg,#f8fafc,#eef2ff)",
            position: "sticky",
            top: 0,
            zIndex: 5
            }}
        >
            <TextField
            select
            label="Sort By"
            size="small"
            value={sortField}
            sx={filterstyle}
            onChange={(e) => setSortField(e.target.value)}
            >
            <MenuItem value="normal" sx={filterstyle}>ALL</MenuItem>
            <MenuItem value="total_amount" sx={filterstyle}>Amount</MenuItem>
            <MenuItem value="order_number" sx={filterstyle}>Order ID</MenuItem>
            <MenuItem value="name" sx={filterstyle}>Name</MenuItem>
            </TextField>

            <TextField
            select
            label="Order"
            size="small"
            value={sortOrder}
             sx={filterstyle}
            onChange={(e) => setSortOrder(e.target.value)}
            >
            <MenuItem value="normal" sx={filterstyle}>ALL</MenuItem>
            <MenuItem value="asc" sx={filterstyle}>Ascending</MenuItem>
            <MenuItem value="desc" sx={filterstyle}>Descending</MenuItem>
            </TextField>

            <TextField
            select
            label="Status"
            size="small"
            value={statusFilter}
             sx={filterstyle}
            onChange={(e) => setStatusFilter(e.target.value)}
            >
            <MenuItem value = "normal" sx={filterstyle}>ALL</MenuItem>
            <MenuItem value = "Pending" sx={filterstyle}>PENDING</MenuItem>
            <MenuItem value = "Confirmed" sx={filterstyle}>CONFIRMED</MenuItem>
            <MenuItem value = "Cancelled" sx={filterstyle}>CANCELLED</MenuItem>
            {/* <MenuItem value = "Processing" sx={filterstyle}>PROCESSING</MenuItem> */}
            <MenuItem value = "Out_For_Delivery" sx={filterstyle}>OUT_FOR_DELIVERY</MenuItem>
            <MenuItem value = "Delivered" sx={filterstyle}>DELIVERED</MenuItem>
            {/* "<MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem> */}

            </TextField>

            <Box >
            <TextField
                // fullWidth
                placeholder="Search Orders..."
                size="small"
                value={searchTerm}
                 sx={filterstyle}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <SearchIcon />
                    </InputAdornment>
                ),
                endAdornment: searchTerm && (
                    <InputAdornment position="end">
                    <IconButton onClick={() => setSearchTerm("")}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                    </InputAdornment>
                ),
                }}
            />
            </Box>
        </Box>

        {/* TABLE */}
        <TableContainer sx={{ maxHeight: "65vh",            "&::-webkit-scrollbar": {
      display: "none",
    },
    msOverflowStyle: "none",     // IE
    scrollbarWidth: "none",  }}>
            <Table stickyHeader>
            {/*  STICKY TABLE HEADER */}
            <TableHead>
                <TableRow>
                <TableCell  sx={{...tablehead,
                      position: "sticky",
                      left: 0,
                      backgroundColor: "#fff",
                      zIndex: 10}}>S.No</TableCell>
                <TableCell sx={tablehead}>Order ID</TableCell>
                <TableCell sx={tablehead}>Customer Name</TableCell>
                <TableCell sx={tablehead}>Amount</TableCell>
                <TableCell sx={tablehead}>Staus</TableCell>
                <TableCell sx={tablehead}>Payment</TableCell>
                <TableCell align="center">Actions</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>


                <AnimatePresence>
                {processedOrders.length > 0 ?

                                
                (
                    processedOrders.map((orderuser) => (
                    <motion.tr
                        key={orderuser.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <TableCell sx={{
                            ...tabledata,
                            position: "sticky",
                            left: 0,
                            backgroundColor: "#fff",
                            zIndex: 9
                        }}>{orderuser.s_no}</TableCell>
                        <TableCell>
                        {/*ORDER ID */}
                        <Typography sx={tabledata}>
                            
                            {orderuser.order_number}
                            
                        </Typography>
                        </TableCell>
                        <TableCell sx={tabledata}>{orderuser.name || "-"}</TableCell>
                        <TableCell sx={tabledata}>{orderuser.total_amount}</TableCell>
                        <TableCell>


                                <FormControl size="small" sx={{ minWidth: 150 ,color:"#ffff"}}>
                                    <Select
                                        value={orderuser.status || ""}
                                        onChange={handleStatusChange(orderuser)}
                                            sx={{
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                border: "none",
                                            },
                                            }}

                                        renderValue={(selected) => (
                                              <Chip
                                                    label={selected}
                                                    size="small"
                                                    sx={{...tabledata,
                                                    backgroundColor: statusColors[selected],
                                                    color: "#fff"
                                                    }}
                                                />
                                        )}
                                    >
                                        {/* {[
                                       "Confirmed","Cancelled","Processing","Packed","Shipped","Out_For_Delivery","Delivered"
                                        ].map((status) => (
                                                    <MenuItem key={status} value={status}>
                                                        <Chip
                                                            label={status}
                                                            size="small"
                                                            sx={{
                                                                backgroundColor: statusColors[status],
                                                                color: "#fff"
                                                            }}
                                                            /> */}
                                        {statusFlow[orderuser.status]?.map((status) => (
                                                    <MenuItem key={status} value={status}>
                                                        <Chip
                                                            label={status}
                                                            size="small"
                                                            sx={{...tabledata,
                                                                backgroundColor: statusColors[status],
                                                                color: "#fff"
                                                            }}
                                                            />
                                    
                                        </MenuItem>
                                        ))
                                        }
                                    </Select>
                                </FormControl>
                        </TableCell>
                            {/* // ].map((status) => (
                                        // <MenuItem key={status} value={status}>
                                        //     {status.toUpperCase()} */}
                        {/* <TableCell>{orderuser.stock}</TableCell> */}

                        <TableCell>
                        <Chip
                            label={orderuser.payment_status ? "Paid" : "Unpaid"}
                            size="small"
                            sx={{...tabledata,
                            backgroundColor: orderuser.payment_status
                                ? "#dcfce7"
                                : "#fee2e2",
                            color: orderuser.payment_status
                                ? "#16a34a"
                                : "#dc2626",
                            fontWeight: 600
                            }}
                        />
                        </TableCell>





                        <TableCell align="center">
                        <IconButton onClick={() => handleEditClick(orderuser.id,orderuser.order_number)}>
                            {/* <EditIcon /> */}
                            <VisibilityIcon /> 
                            <Typography sx={{...tabledata, ml:1}}>View</Typography>
                          
                        </IconButton>
                            
                        </TableCell>
                    </motion.tr>
                    ))
                )  :   (
                  <TableRow>
                    <TableCell colSpan={10} align="center">

                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      height={200}
                      width={200}
                      marginLeft={45}
                      padding={4}
                      sx={{
                        opacity: 0.7
                      }}
                    >
                      {/* Animation */}
                      <img
                        src={empty_box}
                        alt="orders not found"
                        width={"100%"}
                        height={"100%"}
                        style={{
                          animation: "float 2s ease-in-out infinite"
                        }}
                      />

                      <Typography mt={2} color="text.secondary">
                       Orders Not Found 
                      </Typography>

                    </Box>
                      </TableCell>
                   </TableRow>

                  )}
                </AnimatePresence>
            </TableBody>
            </Table>
        </TableContainer>



        <Dialog open={openEdit} onClose={() => setOpenEdit(false)}
             maxWidth="md"
            fullWidth>
            {selectedOrder && ( 
            <OrderViewPage
                select={selectedOrder}
                
                close={() => setOpenEdit(false)}
                // refresh={setAllOrders}
            />
            )}
        </Dialog>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
  <DialogTitle>Confirm Status Change</DialogTitle>
  <DialogContent>
    Are you sure you want to change status to {selectedStatus}?
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
    <Button onClick={confirmStatusChange}>Confirm</Button>
  </DialogActions>
</Dialog>
        </Paper>        

        </>
    );
}
export default OrderTable


