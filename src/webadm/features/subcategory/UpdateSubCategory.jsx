import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  IconButton,
  Paper
} from "@mui/material";


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


import ClearIcon from "@mui/icons-material/Clear";
import { useState, useEffect } from "react";
import { dropdownAPI } from "../../services/dropdownAPI";
import { subCategoryAPI } from "./subcategoryAPI";







const UpdateCategory = ({ subcategory, close, refresh }) => {
console.log("subcategory data subcategory",subcategory)
console.log("subcategory data subcategory ....",subcategory.category_name)
//   const { updateProductApi } = useAuth();

  const [form, setForm] = useState({
    id: "",
    name: "",
    category_id:"",
    description: "",
    status: "",
  });
  const [errors, setErrors] = useState({});

   const [catdrop, setCatdrop] = useState([]); // drop down api for cate
  useEffect(() => {
    console.log("useEffect is running")
    const fetchDropCategory = async () => {
      try {
        console.log("try catch method start")
        const catData = await dropdownAPI.fetchDropCategory();
        console.log("FULL RESPONSE:", catData);
        console.log("fetch here")
        console.log("result for dropdown catdrop", catData);
        setCatdrop(catData.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchDropCategory();
  }, []);
  
  const getcatLabel = (categoryId) => {
    const selected = catdrop.find(s => s.value === categoryId);
    return selected?.label || "";
  };
    // =============================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMsg = "";

    // NAME VALIDATION
    if (name === "name") {
      if (!value.trim()) {
        errorMsg = "Category name is required";
      } else if (!/^[A-Za-z\s]+$/.test(value)) {
        errorMsg = "Only letters and spaces allowed";
      }
    }

    // CATEGORY VALIDATION
    if (name === "category_id") {
      if (!value) {
        errorMsg = "Please select category";
      }
    }

    // STATUS VALIDATION
    if (name === "status") {
      if (value === "") {
        errorMsg = "Please select status";
      }
    }

    // setForm({
    //   ...form,
    //   [name]: name === "category_id" ? Number(value) : value,
    // });
    setForm({
    ...form,
    [name]: value, //  no Number conversion here
  });

    setErrors({
      ...errors,
      [name]: errorMsg,
    });
  };

  // VALIDATION 
  const validate = () => {
  let tempErrors = {};

  if (!form.name.trim()) {
    tempErrors.name = "Category name is required";
  }

  if (!form.category_id) {
    tempErrors.category_id = "Please select category";
  }

  if (form.status === "") {
    tempErrors.status = "Please select status";
  }

  setErrors(tempErrors);

  return Object.keys(tempErrors).length === 0;
};

  // Load product data when dialog opens

  useEffect(() => {
    if (subcategory?.data && catdrop.length > 0) {

      const matchedCategory = catdrop.find(
        (cat) => cat.label === subcategory.data.category_name
      );

      setForm({
        id: subcategory.data.id || "",
        name: subcategory.data.name || "",
        category_id: matchedCategory ? String(matchedCategory.value) : "",
        description: subcategory.data.description || "",
        status: subcategory.data.status ?? false,
      });
    }
  }, [subcategory, catdrop]);

// --------------------------------
 console.log("form category_id:", form.category_id);
console.log("dropdown values:", catdrop);

  if (!subcategory) return null;

  const handleSubmit = async (e) => {
    if(!validate()) return;
  e.preventDefault();

  const payload = {
    id: form.id,
    name: form.name,
    category_id: Number(form.category_id),
    description: form.description,
    status: form.status,
  };

  console.log("updateCategory", payload);

  try {
    const res = await subCategoryAPI.updateSubCategoryApi(payload);

    if (res.status === 200) {
      close();
      refresh();
    }
  } catch (error) {
    console.log("Update error:", error.response);
  }
};

     // RESET ALL DATA
 const RefreshData = () => {
  setForm({
      id:  "",
      name: "",
      category_id: "",
      description:  "",
      status:  false,
    });
}


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
    <Box component="form" onSubmit={handleSubmit} >

      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
             <Typography   sx={fromheading}>
          Update SubCategory
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
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        sx={inputLabelStyle}
      />

      {/* CATEGORY FIELD */}
      <TextField
        select
        label="Select Category"
        name="category_id"
        fullWidth
        size="small"
        margin="normal"
        value={form.category_id}
        onChange={handleChange}
                sx={inputLabelStyle}
      >
        {catdrop.map((s) => (
          <MenuItem key={s.value} value={String(s.value)}   sx={{    fontSize: {
                  xs: "12px",
                  sm: "13px",
                  md: "14px",
                  lg: "14px"
                },
                color: "#6B7280"}}>
            {s.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="description"
        name="description"
        fullWidth
            size="small"
        margin="normal"
        value={form.description}
        onChange={handleChange}
        sx={inputLabelStyle}        />

     
      <TextField
        select
        label="Status"
        name="status"
        fullWidth
            size="small"
        margin="normal"
        value={form.status}
        // onChange={(e) =>
        //   setForm({
        //     ...form,
        //     status: e.target.value === "true" || e.target.value === true
        //   })
        // }
        onChange={handleChange}
        error={!!errors.status}
        helperText={errors.status}
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

        <MenuItem value={false} sx={{ color: "red", fontWeight: "bold",fontSize: {
                  xs: "12px",
                  sm: "13px",
                  md: "14px",
                  lg: "14px"
                }, }}>
          Inactive
        </MenuItem>
      </TextField>

      <Box sx={{display:"flex",gap:"10px",justifyContent:"space-evenly",alignItems:"center", width:"100%"}}>
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
          sx={buttonStyle}
          onClick={RefreshData}
        >
          Reset
        </Button>
      </Box>
    </Box>
    </Paper>
  );
};

export default UpdateCategory;