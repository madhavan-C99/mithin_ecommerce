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
  TextField,
  InputAdornment,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import { useEffect, useState, useMemo } from "react";

import AddCategories from "./AddCategory";
import UpdateCategory from "./UpdateCategory";
import { categoryAPI } from "./categoryAPI";

import empty_box from '../../../assets/empty_box.gif'


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
   
              minWidth:180,
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px",
                backgroundColor: "#f3f4f6",
                transition: "0.3s"
              },
              "& .MuiOutlinedInput-root.Mui-focused": {
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 15px rgba(99,102,241,0.3)"
              },
                 "& input::placeholder": {
      fontSize: {
        xs: "9px",
        sm: "12px",
        md: "14px",
        lg: "14px"
      },
      opacity: 0.5
    }
          
}
const AllCategory = () => {

  const [allcategory, setAllcategory] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [imageMap, setImageMap] = useState({});

  // SEARCH STATES
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // delete popup open state
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);


  // ---------------- FETCH CATEGORY ----------------
  const fetchAllcategory = async () => {
    try {
      const result = await categoryAPI.fetchAllcategory();
      const categoryData = result.data.data || result.data;
      setAllcategory(categoryData);
      loadCategoryImages(categoryData);
    } catch (error) {
      console.log("AllCategory Fetch Error");
    }
  };

  useEffect(() => {

      const timer = setTimeout(() => {
     fetchAllcategory();
  }, 2000);

  return () => clearTimeout(timer);
   
  }, []);

  // ---------------- DEBOUNCE SEARCH ----------------
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // ---------------- FILTER LOGIC ----------------
  const filteredCategories = useMemo(() => {
    if (!debouncedSearch) return allcategory || [];

    const value = debouncedSearch.toLowerCase();

    return (allcategory || []).filter((category) =>
      category.name?.toLowerCase().includes(value) ||
      category.description?.toLowerCase().includes(value)
    );
  }, [allcategory, debouncedSearch]);


  //  MEMORY LEAK FIX
  useEffect(() => {
    return () => {
      Object.values(imageMap).forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [imageMap]);

  // ---------------- EDIT ----------------
  const handleEditClick = async (id) => {
    try {
      const result = await categoryAPI.getCategoryById(id);
      setSelectedCategory(result.data);
      setOpenEdit(true);
    } catch (error) {
      console.log("Error fetching category");
    }
  };

  // ---------------- DELETE ----------------
  // const handleDeleteClick = async (id) => {
  //   try {
  //     await api.post("/delete_category", { id });
  //     fetchAllcategory();
  //   } catch (error) {
  //     console.error("Delete error:", error?.response?.data || error.message);
  //   }
  // };


      const handleDeleteClick = (id) => {
      setDeleteId(id);
      setOpenDelete(true);
    };
  
  
      const confirmDelete = async () => {
      if (deleteId) {
        await categoryAPI.DeleteCategory(deleteId)
        fetchAllcategory()
      }
      setOpenDelete(false);
      setDeleteId(null);
    }
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 3,
        background: "#ffffff",
        boxShadow: "0 5px 20px rgba(0,0,0,0.05)"
      }}
    >

     
      {/* HEADER */}
         <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          flexWrap:"wrap",
          alignItems: "center",
          bgcolor:"#cd414100",
          position: "sticky",
          top: 0,
        }}
      >
        <Typography variant="h5" fontWeight="bold" sx={pageheading} minWidth={7} mb={2}>
          All Category
        </Typography>

         {/*  SEARCH BAR */}
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
          zIndex: 5
        }}
      >        <TextField
          // fullWidth
          placeholder="Search by category"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        sx={filterstyle}
          
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#6b7280" }} />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setSearchTerm("")}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        {/* BUTTON */}
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
                  fontWeight:600,
                  height:40,
                  minWidth:100
            }}
        >
          Add Category
        </Button>
      </Box>


        
      </Box>

      {/* TABLE */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{...tablehead,
                      position: "sticky",
                      left: 0,
                      backgroundColor: "#fff",
                      zIndex: 10}}>S.No</TableCell>
              <TableCell sx={tablehead}>Image</TableCell>
              <TableCell sx={tablehead}>Category</TableCell>
              <TableCell sx={tablehead}>Description</TableCell>
              <TableCell sx={tablehead}>Status</TableCell>
              <TableCell align="center" sx={tablehead}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredCategories?.length > 0 ? (
              filteredCategories.map((category) => (
                <TableRow key={category.id} hover>
                  <TableCell  sx={{
                            ...tabledata,
                            position: "sticky",
                            left: 0,
                            backgroundColor: "#fff",
                            zIndex: 9
                        }}>{category.s_no}</TableCell>
                  <TableCell>
                    <Avatar
                      // src={imageMap[category.category_image]}
                      src={category.category_img}
                       sx={{ width: 70, height:70 }}
                        variant="square"
                    />
                  </TableCell>

                  <TableCell>
                    <Typography sx={tabledata}>
                      {category.name}
                    </Typography>
                  </TableCell>

                  <TableCell sx={tabledata}>
                    {category.description}
                  </TableCell>

                  <TableCell>

                    <Chip
                      label={category.status ? "Active" : "Inactive"}
                      size="small"
                      sx={{...tabledata,
                        backgroundColor: category.status
                          ? "#dcfce7"
                          : "#fee2e2",
                        color: category.status
                          ? "#16a34a"
                          : "#dc2626",
                        fontWeight: 600
                      }}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <IconButton onClick={() => handleEditClick(category.id)}>
                      <EditIcon />
                    </IconButton>

                    <IconButton onClick={() => handleDeleteClick(category.id)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </TableCell>

                </TableRow>
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
                      padding={3}
                      sx={{
                        opacity: 0.7
                      }}
                    >
                      {/* Animation */}
                      <img
                        src={empty_box}
                        alt="Categorys Not Found"
                        width={"100%"}
                        height={"100%"}
                        style={{
                          animation: "float 2s ease-in-out infinite"
                        }}
                      />

                      <Typography mt={2} color="text.secondary">
                       Categorys Not Found
                      </Typography>

                    </Box>
                      </TableCell>
                   </TableRow>
            )}
          </TableBody>

        </Table>
      </TableContainer>

      {/* ADD DIALOG */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <AddCategories
          close={() => setOpenAdd(false)}
          refresh={fetchAllcategory}
        />
      </Dialog>

      {/* EDIT DIALOG */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        {selectedCategory && (
          <UpdateCategory
            category={selectedCategory}
            close={() => setOpenEdit(false)}
            refresh={fetchAllcategory}
          />
        )}
      </Dialog>
                  {/* -----delete popup */}

          <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
            <Box sx={{ p: 4, width: 350 }}>

              <Typography variant="h6" mb={2}>
                Confirm Delete
              </Typography>

              <Typography mb={3}>
                Are you sure you want to delete this {} Category?
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

export default AllCategory;