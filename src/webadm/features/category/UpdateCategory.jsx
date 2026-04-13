import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  IconButton,
  Avatar,
  Paper,
  Grid
} from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { categoryAPI } from "./categoryAPI";


const fromheading={
    fontWeight: 700,
    color: "#1F2937",
    fontSize: {
      xs: "16px",
      sm: "20px",
      md: "22px",
      lg: "22px"
    },
    minWidth:200
}
const inputLabelStyle = {
 "& .MuiInputLabel-root": {
    fontSize: {
      xs: "12px",
      sm: "13px",
      md: "14px",
      lg: "14px"
    },
    // color: "#073288"
    color: "#3679ff"
  },
    "& .MuiInputBase-input": {
          fontSize: {
      xs: "12px",
      sm: "13px",
      md: "14px",
      lg: "14px"
    },   
    color: "#6B7280"
    },
     "& .MuiFormControlLabel-label": {
      fontSize: {
        xs: "12px",
        sm: "13px",
        md: "14px"
      }
    },
  
};

export const buttonStyle = {
  mt: 2,
  borderRadius: "8px",
  fontWeight: 600,
  height: 40,
  fontSize: {
      xs: "12px",
      sm: "13px",
      md: "14px",
      lg: "15px"
    },
};




const UpdateCategory = ({ category, close, refresh }) => {
console.log("categorys for update category", category)
//   const { uploadFile } = useAuth();

  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    status: "",
    category_img: ""
  });

  const [preview, setPreview] = useState("");

  // ================= LOAD DATA =================
  useEffect(() => {
    if (category?.data) {

      // const imagePath = product.data.category_img;
        const category_selected = category.data[0]
        console.log("cat_img",category_selected.category_img)
      setForm({
        id: category_selected.id || "",
        name: category_selected.name || "",
        description: category_selected.description || "",
        status: category_selected.status ?? "",
        category_img : category_selected.category_img
        // category_img: product.data[0].category_img || ""
      });

      if (category_selected.category_img) {
      setPreview(category_selected.category_img);
      console.log(preview)
    }

      // if (imagePath) {
      //   loadSingleImage(imagePath);
      // }
    }
  }, [category]);

  // ================= CLEAN MEMORY =================
  useEffect(() => {
    return () => {
      if (preview) {
        
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);


  // ================= NAME VALIDATION (Letters Only) =================
  const handleNameChange = (e) => {
    const value = e.target.value;

    if (/^[A-Za-z\s]*$/.test(value)) {
      setForm({
        ...form,
        name: value
      });
    }
  };

  // ================= IMAGE CHANGE =================

  const handleImageChange = async (e) => {
     const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setForm((prev) => ({
      ...prev,
      category_img: file, //  store File directly
    }));
  };

  // ================= VALIDATION =================
  const validate = () => {

    let temp = {};

    if (!form.name.trim())
      temp.name = "Name is required";
    else if (!/^[A-Za-z\s]+$/.test(form.name))
      temp.name = "Only letters allowed";

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  // ================= SUBMIT =================
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  try {
    const formData = new FormData();

    formData.append("id", Number(form.id));
    formData.append("name", form.name);
    formData.append("status", form.status);
    formData.append("description", form.description);

    // send only if new image uploaded

  let imageFile;

if (form.category_img  instanceof File) {
  imageFile = form.category_img 
}

if (imageFile) {
  formData.append("category_img", imageFile);
}

    const res = await categoryAPI.updateCategoryApi(formData);

    if (res.status === 200) {
      close();
      refresh();
    }

  } catch (error) {
    console.error("Update error:", error.response?.data);
  }
};

  // ================= RESET =================
  const handleReset = () => {
    setForm({
      id: "",
      name: "",
      description: "",
      status: "",
      category_img: ""
    });
    setPreview("");
    setErrors({});
  };

  if (!category) return null;

  return (
         <Paper
    elevation={3}
    sx={{
      // width: "100%",
      minWidth: 200,
      maxWidth:300,
      // maxHeight: "80vh",
      p: 2.5,
      borderRadius: 0,
      // overflow:"hiden"
      overflowX:"hidden"
    }}
    >
    <Box

      component="form"
      onSubmit={handleSubmit}
    >
      {/* HEADER */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6"  sx={fromheading}>
          Update Category
        </Typography>

        <IconButton onClick={close}>
          <ClearIcon />
        </IconButton>
      </Box>

      {/* NAME */}
      <TextField
        label="Name"
        name="name"
        fullWidth
          size="small"
        margin="normal"
        value={form.name}
        onChange={handleNameChange}
        error={!!errors.name}
        helperText={errors.name}
         sx={inputLabelStyle}
      />

      {/* IMAGE */}
      <Box sx={{ mt: 2, mb: 2 }}>
        <Avatar
          src={preview}
          sx={{ width: 100, height: 100 }}
          variant="rounded"
        />

        <Button
          variant="outlined"
          component="label"
           sx={inputLabelStyle}
        >
          Change Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>
      </Box>

      {/* DESCRIPTION */}
      <TextField
        label="Description"
        name="description"
        fullWidth
          size="small"
        margin="normal"
        multiline
        rows={3}
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
         sx={inputLabelStyle}
      />

      {/* STATUS */}
      <TextField
        select
        label="Status"
        name="status"
        fullWidth
          size="small"
        margin="normal"
        value={form.status}
        onChange={(e) =>
          setForm({
            ...form,
            status: e.target.value === true || e.target.value === "true"
          })
        }
         sx={inputLabelStyle}
      >
        <MenuItem value={true} sx={{ color: "green", fontWeight: "bold",fontSize: {
                  xs: "12px",
                  sm: "13px",
                  md: "14px",
                  lg: "14px"
                }, }}>
          Active
        </MenuItem>

        <MenuItem value={false} sx={{ color: "red", fontWeight: "bold" ,fontSize: {
                  xs: "12px",
                  sm: "13px",
                  md: "14px",
                  lg: "14px"
                },}}>
          Inactive
        </MenuItem>
      </TextField>

      {/* BUTTONS */}
          <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                gap: "10px",
                justifyContent: "space-evenly"
              }}
              minWidth={"100%"}
            >
        <Button
          type="submit"
          variant="contained"
          fullWidth
           sx={buttonStyle}
        >
          Update
        </Button>

        <Button
          type="button"
          variant="contained"
          fullWidth
    
          onClick={handleReset}
           sx={buttonStyle}
        >
          Reset
        </Button>
      </Grid>

    </Box>
    </Paper>
  );
};

export default UpdateCategory;