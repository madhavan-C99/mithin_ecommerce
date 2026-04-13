import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  IconButton,
  Grid,
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { cususerAPI } from "../cususerAPI";



const AddAdmin=({close})=>{
    const [accepted, setAccepted] = useState(false);
    const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirm_password: ""
  });
    const [errors, setErrors] = useState({});

  // ================= HANDLE CHANGE =================
const handleChange = (e) => {
  const { name, value } = e.target;

  // Mobile - numbers only
  if (name === "mobile") {
    if (value === "" || /^[0-9]*$/.test(value)) {
      setForm({ ...form, [name]: value });
    }
  }

  // Name - letters only
  else if (name === "name") {
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setForm({ ...form, [name]: value });
    }
  }

  // Email validation
  else if (name === "email") {
    setForm({ ...form, [name]: value });

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailPattern.test(value)) {
      // console.log("Invalid email format");
    }
  }

  // Password validation (min 6 characters)
  else if (name === "password") {
    if (value.length <= 12) {
      setForm({ ...form, [name]: value });
    }
  }

  // Confirm password validation
  else if (name === "confirm_password") {
    setForm({ ...form, [name]: value });

    if (form.password !== value) {
      console.log("Password does not match");
    }
  }

  // Other fields
  else {
    setForm({ ...form, [name]: value });
  }
};

  // ================= VALIDATION =================
  const validate = () => {
  let temp = {};

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!form.name.trim()) temp.name = "Name is required";

  if (!form.email.trim()) {
    temp.email = "Email is required";
  } else if (!emailPattern.test(form.email)) {
    temp.email = "Invalid email format";
  }

  if (!form.mobile) temp.mobile = "Mobile is required";
  else if (form.mobile.length !== 10)
    temp.mobile = "Mobile must be 10 digits";

  if (!form.password) temp.password = "Password is required";

  if (!form.confirm_password)
    temp.confirm_password = "Confirm Password is required";
  else if (form.password !== form.confirm_password)
    temp.confirm_password = "Passwords do not match";

  if (!accepted) temp.accepted = "Please accept the details";

  setErrors(temp);
  return Object.keys(temp).length === 0;
};


  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("mobile", parseInt(form.mobile));
    formData.append("password",(form.password));
    formData.append("confirm_password",(form.confirm_password));
    formData.append("is_active", form.is_active);
  
    try {
      await cususerAPI.adduserAPI(formData);
      close();
      // refresh();
    } catch (err) {
      console.error(err.response?.data);
    }
  };


const RefreshForm = () => {
  setForm({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirm_password: "",
  });
  setAccepted(false);
  setErrors({});
};

    return (
        <>
<Box
      sx={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
        // overflowY:"auto",
        p:2
      }}
    >
  <Paper sx={{ width: "100%", maxWidth: 450,maxHeight:"90vh",m:9, p: 3, borderRadius: 3,overflowY:'auto' }}>
        <Box display="flex" justifyContent="space-between" mt={0}>
          <Typography variant="h6" fontWeight={600}>Add New User</Typography>
          <IconButton onClick={close}>
            <CloseIcon />
          </IconButton>
        </Box>
          <Box component="form" onSubmit={handleSubmit} mb={0} >
          <Grid container spacing={1} mb={1}>
                        {/* NAME */}
            <Grid item xs={12} md={6} minWidth={"100%"} >
              <TextField
                label="*Name"
                name="name"
                fullWidth
                size="small"
                value={form.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>

            {/* TAMIL NAME */}
            <Grid item xs={12} md={6} minWidth={"100%"} mb={1}>
              <TextField
                label="*Email"
                name="email"
                fullWidth
                size="small"
                value={form.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
          </Grid>
  
          <Grid container spacing={1} mb={1}>
                        {/* NAME */}
            <Grid item xs={12} md={6} minWidth={"100%"} >
              <TextField
                label="Mobile"
                name="mobile"
                fullWidth
                size="small"
                value={form.mobile}
                onChange={handleChange}
                error={!!errors.mobile}
                helperText={errors.mobile}
              />
            </Grid>

            {/* TAMIL NAME */}
            <Grid item xs={12} md={6} minWidth={"100%"}>
              <TextField
                label="*Password"
                name="password"
                fullWidth
                size="small"
                value={form.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} mb={1}>
                        {/* NAME */}
            <Grid item xs={12} md={6} minWidth={"100%"}>
              <TextField
                label="*Confirm Password"
                name="confirm_password"
                fullWidth
                size="small"
                value={form.confirm_password}
                onChange={handleChange}
                error={!!errors.confirm_password}
                helperText={errors.confirm_password}
              />
            </Grid>

           </Grid>
                       {/* ACCEPT CHECKBOX */}
                       <Grid item xs={12} width={"100%"}>
                         <FormGroup>
                           <FormControlLabel
                             control={
                               <Checkbox
                                 checked={accepted}
                                 onChange={(e) => setAccepted(e.target.checked)}
                               />
                             }
                             label="Accept the above given details"
                           />
                         </FormGroup>
                         {errors.accepted && (
                           <Typography color="error" variant="caption">
                             {errors.accepted}
                           </Typography>
                         )}
                       </Grid>
                      {/* BUTTONS */}
            <Grid
              item
              xs={12}
              width={"100%"}
              marginTop={2}
              sx={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ height: 45, borderRadius: 2, fontWeight: 600, width: 120 }}
              >
                Save User
              </Button>

              <Button
                variant="contained"
                onClick={RefreshForm}
                fullWidth
                sx={{ height: 45, borderRadius: 2, fontWeight: 600, width: 120 }}
              >
                Reset
              </Button>
            </Grid>
          </Box>


     </Paper>   

    </Box>
        
        </>
    )
}

export default AddAdmin