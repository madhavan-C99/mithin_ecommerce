import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Avatar,
  Typography,
  IconButton,
  Dialog,
  Chip,
  MenuItem,
  TextField
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";

import { motion, AnimatePresence } from "framer-motion";
import AddProduct from "./AddProduct";
import UpdateProducts from "./UpdateProduct";


import { useEffect, useState, useMemo } from "react";
import { productsAPI } from "./productAPI";

import empty_box from '../../../assets/empty_box.gif'


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


const AllProduct = () => {

  const [allproducts, setAllproducts] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [sortField, setSortField] = useState("normal");
  const [sortOrder, setSortOrder] = useState("normal");
  const [trendFilter, setTrendFilter] = useState("normal");

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  // delete popup open state
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);


  // loading state
  const [loading, setLoading] = useState(true);

  // Websocket
  useEffect(() => {
    const socket = new WebSocket(
  
        `${import.meta.env.VITE_WS_BASE_URL}/ws/fetch_all_product/`
      
    );

    socket.onopen = () => {
      socket.send(JSON.stringify({ action: "init_all" }));
    };

    socket.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        setAllproducts(parsedData.payload || []);
      } catch (error) {
        console.error("Invalid JSON:", event.data);
      }
    };

    return () => socket.close();
  }, []);

  //loading useeffect 
useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 2000);

  return () => clearTimeout(timer);
}, []);

  // Search debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleEditClick = async (id) => {
    const result = await productsAPI.getProductById(id);
    setSelectedProduct(result.data);
    setOpenEdit(true);
  };

  // const handleDeleteClick = async (id) => {
  //   await productsAPI.deleteProductApi(id);
  // };
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDelete(true);
  };

  const processedProducts = useMemo(() => {
    let updated = [...(allproducts || [])];

    if (debouncedSearch) {
      const searchValue = debouncedSearch.toLowerCase();
      updated = updated.filter((product) =>
        product.name?.toLowerCase().includes(searchValue) ||
        product.tamil_name?.toLowerCase().includes(searchValue) ||
        product.subcategory?.toLowerCase().includes(searchValue)
      );
    }

    if (trendFilter === "yes") {
      updated = updated.filter(
        (p) => p.current_trending_status === true
      );
    } else if (trendFilter === "no") {
      updated = updated.filter(
        (p) => p.current_trending_status === false
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
    allproducts,
    sortField,
    sortOrder,
    trendFilter,
    debouncedSearch
  ]);


  const confirmDelete = async () => {
  if (deleteId) {
    await productsAPI.deleteProductApi(deleteId);
  }
  setOpenDelete(false);
  setDeleteId(null);
};



// if (loading) {
//   return (
//     <Box
//       display="flex"
//       // justifyContent="center"
//       alignItems="center"
//       // height="100vh"
//       flexDirection="column"
//       bgcolor={"#FAFBFC"}
//     >
//       <img
       
//   src={pageload}
//   alt="loading"
//   style={{ width:"50%"}}
// />
  
//     </Box>
//   );
// }
return (
        <Paper
      elevation={0}
      sx={{
        p: 1,
        borderRadius: 3,
        background: "#ffffff",
        boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          mb: 0,
          p:2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,

        }}
                >
          <Typography
            sx={pageheading}
          >
          Products
        </Typography>

        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={() => setOpenAdd(true)}
          sx={{ borderRadius: 2, textTransform: "none" ,
                  fontSize: {
                    xs: "10px",
                    sm: "12px",
                    md: "16px",
                    lg: "16px"
                  },
                  height:40,
                  fontWeight:"bold"
                  

            }}
        >
          Add Product
        </Button>
      </Box>

      {/*  STICKY FILTER BAR ONLY */}
      <Box
        sx={{
          display: "flex",
          flexWrap:"wrap",
          justifyContent:"flex-end",
          gap: 3,
          mb: 4,
          p: 2,
          borderRadius: 3,
          background: "linear-gradient(135deg,#f8fafc,#eef2ff)",
          position: "sticky",
          top: 0,
          zIndex: 5,
         
        }}
      >
<TextField
  select
  label="Sort By"
  size="small"
  value={sortField}
  onChange={(e) => setSortField(e.target.value)}
  sx={filterstyle}
>
          <MenuItem value="normal" sx={filterstyle}>ALL</MenuItem>
          <MenuItem value="price" sx={filterstyle}>Price</MenuItem>
          <MenuItem value="weight" sx={filterstyle}>Weight</MenuItem>
          <MenuItem value="stock" sx={filterstyle}>Quantity</MenuItem>
        </TextField>

        <TextField
          select
          label="Order"
          size="small"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          sx={filterstyle}
        >
          <MenuItem value="normal" sx={filterstyle}>ALL</MenuItem>
          <MenuItem value="asc" sx={filterstyle}>Ascending</MenuItem>
          <MenuItem value="desc" sx={filterstyle}>Descending</MenuItem>
        </TextField>

        <TextField
          select
          label="Trending"
          size="small"
          value={trendFilter}
          onChange={(e) => setTrendFilter(e.target.value)}
          sx={filterstyle}
        >
          <MenuItem value="normal" sx={filterstyle}>ALL</MenuItem>
          <MenuItem value="yes" sx={filterstyle}>Yes</MenuItem>
          <MenuItem value="null" sx={filterstyle}>No</MenuItem>
        </TextField>

        <Box sx={{ minWidth: 180}}>
          <TextField
          
            placeholder="Search products..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            // minWidth={300}
            sx={filterstyle}
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
      <TableContainer sx={{ maxHeight: "60vh",width:"100%",
}}>
        <Table stickyHeader>
          {/*  STICKY TABLE HEADER */}
          <TableHead>
            <TableRow>
              <TableCell
 sx={{...tablehead,
                      position: "sticky",
                      left: 0,
                      backgroundColor: "#fff",
                      zIndex: 10}}
>S.No</TableCell>
              <TableCell
 sx={tablehead}
>Image</TableCell>
              <TableCell
 sx={tablehead}
>Product</TableCell>
              <TableCell
 sx={tablehead}
>SubCategory</TableCell>
             <TableCell
 sx={tablehead}
>Price(₹)</TableCell>
             <TableCell
 sx={tablehead}
>Weight</TableCell>
              <TableCell
 sx={tablehead}
>quantity</TableCell>
             <TableCell
 sx={tablehead}
>Status</TableCell>
              <TableCell
 sx={tablehead}
>Trend</TableCell>
              <TableCell
 sx={tablehead}
>Expiry</TableCell>
              <TableCell
 sx={tablehead}align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <AnimatePresence>
              
              
              {processedProducts.length > 0 ? (
                processedProducts.map((product) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <TableCell
                       sx={{
                            ...tabledata,
                            position: "sticky",
                            left: 0,
                            backgroundColor: "#fff",
                            zIndex: 9
                        }}
                    >{product.s_no}</TableCell>
                    <TableCell sx = {{width:"150px",height:"50px"}} >
                      <Avatar
                        src={product.product_img}
                        sx={{ width:"100%", height:"100%" }}
                        variant="square"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography 
                        
                        sx={tabledata}
                      >{product.name}</Typography>
                      <Typography 
                       sx={tabledata}
                      >{product.tamil_name}</Typography>
                    </TableCell>
                    <TableCell
                      sx={tabledata}
                    >{product.subcategory || "-"}</TableCell>
                    <TableCell
                      sx={tabledata}
                    >₹ {product.price}</TableCell>
                    <TableCell
                     sx={tabledata}
                    >{product.weight} {product.unit}</TableCell>
                    <TableCell
                       sx={tabledata}
                    >{product.stock}</TableCell>

                    <TableCell>
                      <Chip
                        label={product.status ? "Active" : "Inactive"}
                        size="small"
                        sx={{...tabledata,
                          backgroundColor: product.status
                            ? "#dcfce7"
                            : "#fee2e2",
                          color: product.status
                            ? "#16a34a"
                            : "#dc2626",
                          fontWeight: 600
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={
                          product.current_trending_status
                            ? "Trending"
                            : "Not Trending"
                        }
                        size="small"
                        sx={{...tabledata,
                          backgroundColor:
                            product.current_trending_status
                              ? "#dbeafe"
                              : "#f3f4f6",
                          color:
                            product.current_trending_status
                              ? "#2563eb"
                              : "#6b7280",
                          fontWeight: 600
                        }}
                      />
                    </TableCell>

                    <TableCell
                      sx={tabledata}
                    >{product.expiry_date}</TableCell>

                    <TableCell align="center">
                      <IconButton onClick={() => handleEditClick(product.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClick(product.id)}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    </TableCell>
                  </motion.tr>
                ))
              ) : (
                <TableRow>
                    <TableCell colSpan={10} align="center">

                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      height={200}
                      width={200}
                      marginLeft={50}
                      padding={2}
                      sx={{
                        opacity: 0.7
                      }}
                    >
                      {/* Animation */}
                      <img
                        src={empty_box}
                        alt="Products Not Found"
                        width={"100%"}
                        height={"100%"}
                        style={{
                          animation: "float 2s ease-in-out infinite"
                        }}
                      />

                      <Typography mt={2} color="text.secondary">
                       Products Not Found
                      </Typography>

                    </Box>
                      </TableCell>
                   </TableRow>
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <AddProduct close={() => setOpenAdd(false)} />
      </Dialog>

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}
      >
        {selectedProduct && (
          <UpdateProducts
            product={selectedProduct}
            close={() => setOpenEdit(false)}
            refresh={setAllproducts}
          />
        )}
      </Dialog>

         <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
            <Box sx={{ p: 4, width: 350 }}>

              <Typography variant="h6" mb={2}>
                Confirm Delete
              </Typography>

              <Typography mb={3}>
                Are you sure you want to delete this product?
              </Typography>

              <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button
                  variant="outlined"
                  onClick={() => setOpenDelete(false)}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  onClick={confirmDelete}
                >
                  Delete
                </Button>
              </Box>

            </Box>
        </Dialog>

    </Paper>
  );
};

export default AllProduct;

import { Card, CardContent, Skeleton, Grid } from "@mui/material";

const ProductSkeleton = () => {
  return (
    <Grid container spacing={2}>
      {[1,2,3,4].map((item) => (
        <Grid item xs={12} sm={6} md={3} key={item}>
          <Card>
            <Skeleton variant="rectangular" height={140} />
            <CardContent>
              <Skeleton variant="text" height={30} />
              <Skeleton variant="text" width="60%" />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export {ProductSkeleton};