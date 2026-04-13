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
  MenuItem,
  DialogContent,
  DialogActions
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import empty_box from '../../../../assets/empty_box.gif'

//api

import { cususerAPI } from "../cususerAPI";


import { useEffect, useState, useMemo } from "react";
import { UpdateUser } from "./UpdateUser";
import AddAdmin from "./AddAdmin";


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
    //   minWidth:180,
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
      
      opacity: 0.5,
        "& .MuiInputLabel-root": {
    fontSize: {
      xs: "12px",
      sm: "13px",
      md: "14px",
      lg: "14px"
    },}
    },"& .MuiSelect-select": {
      fontSize: {
        xs: "13px",
        sm: "14px",
        md: "14px",
        lg: "15px"
      },
      color: "#374151"
    },      "& .MuiInputLabel-root": {
      fontSize: {
        xs: "12px",
        sm: "13px",
        md: "14px",
        lg: "14px"
      },
      color: "#6B7280",
      fontWeight: 500
    },
}
const CusUser = () => {
    const[allUsers,setAllUsers]=useState([])

    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [sortField, setSortField] = useState("normal");
    const [sortOrder, setSortOrder] = useState("normal");

    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [openStatusDialog, setOpenStatusDialog] = useState(false);
const [selectedUserId, setSelectedUserId] = useState(null);
const [newStatus, setNewStatus] = useState("");
const [selectedRole, setSelectedRole] = useState("");


    // DATA FETCH
const fetchAllUserDetails = async () => {
  try {
    const result = await cususerAPI.fetchAllCustomers();


    const mergedUsers = result?.data?.data?.users || [];
    const uniqueUsers = Array.from(
  new Map(mergedUsers.map(user => [user.user_id, user])).values()
);

    // setAllUsers(mergedUsers);

setAllUsers(uniqueUsers);
console.log("all",uniqueUsers)
console.log("API Result", result);
console.log("Admins", result?.data?.data?.users);

  } catch (error) {
    console.log("Invalid Error", error);
  }
};
    
    useEffect(() => {
        fetchAllUserDetails();
    },[]);

    // Search debounce
    useEffect(() => {
        const timer = setTimeout(() => {
        setDebouncedSearch(searchTerm);
        }, 400);
        return () => clearTimeout(timer);
    }, [searchTerm]);





    const handleEditClick = (id,role) => {
        console.log('role',role)
        console.log('id',id)

    setSelectedUserId(id);
    setSelectedRole(role)
    setOpenStatusDialog(true);
  
};




const confirmStatusChange = async (status) => {
  try {
    
    const payload = {
      user_id: selectedUserId,
      status: status,
      role: selectedRole 
    };

    console.log("Sending data:", payload);


    const result = await cususerAPI.updateCustomerStatus(payload);

    console.log(result.data);
  

    setAllUsers((prev) =>
  prev.map((user) =>
    user.user_id === selectedUserId
      ? { ...user, user_status: status }
      : user
  )
);


    setOpenStatusDialog(false);

  } catch (err) {
    console.error("Status update error", err);
  }
};


const processedUsers = useMemo(() => {

  let updated = [...(allUsers || [])];

  
  if (debouncedSearch) {
    const searchValue = debouncedSearch.toLowerCase();

    updated = updated.filter((user) =>
      user.name?.toLowerCase().includes(searchValue) ||
      user.role?.toLowerCase().includes(searchValue) ||
      user.email?.toLowerCase().includes(searchValue)
    );
  }


  if (sortField !== "normal" && sortOrder !== "normal") {

    updated.sort((a, b) => {

      if (sortField === "user_status") {
        return sortOrder === "asc"
          ? a.user_status - b.user_status
          : b.user_status - a.user_status;
      }

      const valA = a[sortField]?.toString().toLowerCase() || "";
      const valB = b[sortField]?.toString().toLowerCase() || "";

      if (sortOrder === "asc") return valA.localeCompare(valB);
      if (sortOrder === "desc") return valB.localeCompare(valA);

      return 0;
    });
  }

  return updated;

}, [allUsers, sortField, sortOrder, debouncedSearch]);

 
    return (
        <>
        <Paper
        elevation={0}
        sx={{
            p: 4,
            borderRadius: 3,
            background: "#ffffff",
            boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
            overflow:"hidden"
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
                    <Typography
            sx={pageheading}
                >
            User Management
            </Typography>

            <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={() => setOpenAdd(true)}
                      sx={{ borderRadius: 2, textTransform: "none" ,
                  fontSize: {
                    xs: "10px",
                    sm: "12px",
                    md: "15px",
                    lg: "15px"
                  },
                  height:40,
                  fontWeight:600
                  

            }}
            >
            Add User
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
            <MenuItem value="normal">Normal</MenuItem>
            <MenuItem value="role">Role</MenuItem>
            <MenuItem value="user_status">Status</MenuItem>
            <MenuItem value="name">Name</MenuItem>
            </TextField>

            <TextField
            select
            label="Order"
            size="small"
            value={sortOrder}
            sx={filterstyle}
            onChange={(e) => setSortOrder(e.target.value)}
            >
            <MenuItem value="normal" >Normal</MenuItem>
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
            </TextField>

            <Box >
            <TextField
                // fullWidth
                placeholder="Search products..."
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
        <TableContainer sx={{ maxHeight: "65vh",overflowX:"auto" }}>
            <Table stickyHeader>
            {/*  STICKY TABLE HEADER */}
            <TableHead >
                <TableRow backgroundColor="#F5F7FA">
                <TableCell    sx={{
                        ...tablehead,
                        position: "sticky",
                        left: 0,
                        backgroundColor: "#fff",
                        zIndex: 10
                    }}>S.No</TableCell>
                <TableCell 
                   sx={tablehead}>Name</TableCell>
                <TableCell   sx={tablehead}>Email</TableCell>
                <TableCell  sx={tablehead}>Mobile Number</TableCell>
                <TableCell   sx={tablehead}>Role Name</TableCell>
                <TableCell   sx={tablehead}>Status</TableCell>
                
                <TableCell align="center"   sx={tablehead}>Actions</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                <AnimatePresence>
                {processedUsers.length > 0 ? (
                  
                    processedUsers.map((user) => (
                      
                    
                    <motion.tr
                        key={user.user_id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                       
                    >
                        <TableCell    sx={{
                            ...tabledata,
                            position: "sticky",
                            left: 0,
                            backgroundColor: "#fff",
                            zIndex: 9
                        }}>{user.s_no}</TableCell>
                        <TableCell>
                        <Typography  sx={tabledata}>{user.name}</Typography>
                        </TableCell>
                        <TableCell   sx={tabledata}>
                            {user.email}
                        </TableCell>
                        <TableCell   sx={tabledata}>
                            {user.user__mobile || "-"} </TableCell>
                        <TableCell  sx={tabledata}>
                            {user.role}</TableCell>

                        <TableCell>
                        <Chip
                            label={user.user_status ? "Active" : "Inactive"}
                            // label={user.is_active === "Active" ? "Active" : "Inactive"}
                            size="small"
                            sx={{...tabledata,
                            backgroundColor: user.user_status
                                ? "#dcfce7"
                                : "#fee2e2",
                            color: user.user_status
                                ? "#16a34a"
                                : "#dc2626",
                            
                            }}
                        />
                        </TableCell>

                        

                        

                        <TableCell align="center" sx={{color:"#555"}}>
                        <IconButton  onClick={() => handleEditClick(user.id,user.role)}>
                            <EditIcon />
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
                                          Users Not Found 
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
            <AddAdmin close={() => setOpenAdd(false)} />
        </Dialog>

        <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
            {selectedUser && (
            <UpdateUser
                user={selectedUser}
                close={() => setOpenEdit(false)}
                refresh={setAllUsers}
            />
            )}
        </Dialog> 


        <Dialog open={openStatusDialog} onClose={() => setOpenStatusDialog(false)}>

                <DialogContent>
                    <Typography>
                     Are you sure you want to change status ?
                    </Typography>
                </DialogContent>

                <DialogActions>

                    <Button
                    variant="contained"
                    color="success"
                    onClick={() => confirmStatusChange(true)}
                    >
                    Active
                    </Button>

                    <Button
                    variant="contained"
                    color="error"
                    onClick={() => confirmStatusChange(false)}
                    >
                    Inactive
                    </Button>

                </DialogActions>

                </Dialog>
        </Paper>
        </>
    );
}
export default CusUser