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
  Typography,
  IconButton,
  Dialog,
  Chip,
  TextField,
  InputAdornment,
  Fade
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import { useEffect, useState, useMemo } from "react";
import AddSubCategories from "./AddSubCategory";
import UpdateSubCategory from "./UpdateSubCategory";
import { subCategoryAPI } from "./subcategoryAPI";
import { wrap } from "framer-motion";

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

const AllSubCategory = () => {
  const [allsubcategory, setAllSubcategory] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedsubProduct, setSelectedsubProduct] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // delete popup open state
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // ================= FETCH =================
  const fetchAllSubcategory = async () => {
    try {
      const result = await subCategoryAPI.fetchAllSubcategory();
      setAllSubcategory(result.data.data || result.data);
    } catch (error) {
      console.log("Fetch Error:", error.response);
    }
  };

  useEffect(() => {
          const timer = setTimeout(() => {
      fetchAllSubcategory();
  }, 2000);

  return () => clearTimeout(timer);
   
  }, []);

  // ================= DEBOUNCE =================
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // ================= FILTER =================
  const filteredCategories = useMemo(() => {
    if (!debouncedSearch) return allsubcategory;

    const value = debouncedSearch.toLowerCase();

    return allsubcategory.filter((item) =>
      item.name?.toLowerCase().includes(value) ||
      item.category_name?.toLowerCase().includes(value)
    );
  }, [allsubcategory, debouncedSearch]);

  // ================= EDIT =================
  const handleEditClick = async (id) => {
    try {
      const result = await subCategoryAPI.getSubCategoryById(id);
      setSelectedsubProduct(result.data);
      setOpenEdit(true);
    } catch (error) {
      console.log("Edit Fetch Error");
    }
  };

  // ================= DELETE =================
  // const handleDeleteClick = async (id) => {
  //   try {
  //     await subCategoryAPI.DeleteSubCategories(id);
  //     fetchAllSubcategory();
  //   } catch (error) {
  //     console.log("Delete Error");
  //   }
  // };

    const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDelete(true);
  };


    const confirmDelete = async () => {
    if (deleteId) {
      await subCategoryAPI.DeleteSubCategories(deleteId)
      fetchAllSubcategory()
    }
    setOpenDelete(false);
    setDeleteId(null);
  };
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        background: "#ffffff",
        boxShadow: "0 8px 24px rgba(0,0,0,0.05)"
      }}
    >
      {/* ================= HEADER ================= */}
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
          All SubCategory
        </Typography>
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
      >
          {/* SEARCH */}
          <TextField
            placeholder="Search by name or category..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
              )
            }}
          />

          {/* ADD BUTTON */}
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
                  minWidth:100,
                  fontWeight:"bold"
            }}
          >
            Add SubCategory
          </Button>
        </Box>
      </Box>

      {/* ================= TABLE ================= */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={tablehead}>
              <TableCell  sx={{...tablehead,
                      position: "sticky",
                      left: 0,
                      backgroundColor: "#fff",
                      zIndex: 10}}>S.No</TableCell>
              <TableCell sx={tablehead}>Name</TableCell>
              <TableCell sx={tablehead}>Status</TableCell>
              <TableCell sx={tablehead}>Category</TableCell>
              <TableCell align="center" sx={tablehead}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((item) => (
                <Fade in timeout={400} key={item.id}>
                  <TableRow hover>
                    <TableCell  sx={{
                            ...tabledata,
                            position: "sticky",
                            left: 0,
                            backgroundColor: "#fff",
                            zIndex: 9
                        }}>{item.s_no}</TableCell>

                    <TableCell>
                      <Typography sx={tabledata}>
                        {item.name}
                      </Typography>
                    </TableCell>

                    <TableCell sx={tabledata}>
                      <Chip
                        label={item.status ? "Active" : "Inactive"}
                        size="small"
                        sx={{
                          backgroundColor: item.status
                            ? "#dcfce7"
                            : "#fee2e2",
                          color: item.status
                            ? "#16a34a"
                            : "#dc2626",
                          fontWeight: 600
                        }}
                      />
                    </TableCell>

                    <TableCell sx={tabledata}>{item.category_name}</TableCell>

                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleEditClick(item.id)}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        onClick={() => handleDeleteClick(item.id)}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </Fade>
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
                        alt="Products Not Found"
                        width={"100%"}
                        height={"100%"}
                        style={{
                          animation: "float 2s ease-in-out infinite"
                        }}
                      />

                      <Typography mt={2} color="text.secondary">
                       Subcategorys  Not Found
                      </Typography>

                    </Box>
                      </TableCell>
                   </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ================= ADD DIALOG ================= */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <AddSubCategories
          close={() => setOpenAdd(false)}
          refersh={fetchAllSubcategory}
        />
      </Dialog>

      {/* ================= EDIT DIALOG ================= */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        {selectedsubProduct && (
          <UpdateSubCategory
            subcategory={selectedsubProduct}
            close={() => setOpenEdit(false)}
            refresh={fetchAllSubcategory}
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
                Are you sure you want to delete this {} Subcategory?
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

export default AllSubCategory;