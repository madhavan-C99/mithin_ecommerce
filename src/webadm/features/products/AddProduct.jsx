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
import { useAuth } from "../../context/AuthContext";
import { productsAPI } from "./productAPI";
import { dropdownAPI } from "../../services/dropdownAPI";
// import { authAPI } from "../api/Index";

const fromheading={
    fontWeight: 700,
    color: "#1F2937",
    fontSize: {
      xs: "16px",
      sm: "20px",
      md: "22px",
      lg: "22px"
    },
    minWidth:200,
mb:4
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
    }
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



const AddProduct = ({ close, refresh }) => {
  const { addProductApi, uploadFile } = useAuth();

  const [subcatdrop, setsubCatdrop] = useState([]);
  const [accepted, setAccepted] = useState(false);
  const [preview, setPreview] = useState("");
   const [catdrop, setCatdrop] = useState([]);

  const [form, setForm] = useState({
    name: "",
    tamil_name: "",
    price: "",
    stock: "",
    is_active: "",
    subcategory_id: "",
    expiry_date: "",
    trend_status: false,
    weight: "",
    description: "",
    product_img: "",
  });

  const [errors, setErrors] = useState({});

  // ================= LOAD CATEGORY DROP =================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await dropdownAPI.fetchDropSub();
        setsubCatdrop(res.data.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

    // ---------------- FETCH CATEGORY DROPDOWN ----------------
    useEffect(() => {
      const categorydrop = async () => {
        try {
          const catData = await dropdownAPI.fetchDropCategory();
          setCatdrop(catData.data.data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
      categorydrop();
    }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Numbers only validation for numeric fields
    if (["price", "stock", "weight"].includes(name)) {
      if (value === "" || /^[0-9]*$/.test(value)) {
        setForm({ ...form, [name]: value });
      }
    }
    // Tamil + English letters for tamil_name
    else if (name === "tamil_name") {
      if (/^[\u0B80-\u0BFFa-zA-Z\s]*$/.test(value)) {
        setForm({ ...form, [name]: value });
      }
    }
    // Letters only for name
    else if (name === "name") {
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setForm({ ...form, [name]: value });
      }
    }
    // Other fields
    else {
      setForm({ ...form, [name]: value });
    }
  };

  // ================= IMAGE UPLOAD =================
  const handleImageChange = async (e) => {
     const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setForm((prev) => ({
      ...prev,
      product_img: file, //  store File directly
    }));
  };

  // ================= VALIDATION =================
  const validate = () => {
    let temp = {};

    if (!form.name.trim()) temp.name = "Product Name is required";
    if (!form.tamil_name.trim()) temp.tamil_name = "Tamil Name is required";
    if (!form.price) temp.price = "Price is required";
    if (!form.stock) temp.stock = "Stock is required";
    if (!form.weight) temp.weight = "Weight is required";
    if (!form.unit) temp.unit = "Unit is required";
    if (!form.is_active && form.is_active !== false)
      temp.is_active = "Select status";
    if (!form.category_id) temp.category_id = "Select category";
    if (!form.expiry_date) temp.expiry_date = "Select expiry date";
    if (!accepted) temp.accepted = "You must accept details";
    if (!form.product_img) temp.product_img = "Upload product image";

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("tamil_name", form.tamil_name);
    formData.append("price", parseInt(form.price, 10));
    formData.append("stock", parseInt(form.stock, 10));
    formData.append("category_id", parseInt(form.category_id, 10));
    formData.append("weight", parseInt(form.weight, 10));
    formData.append("is_active", form.is_active);
    formData.append("unit",form.unit);
    formData.append("trend_status", form.trend_status);
    formData.append("expiry_date", form.expiry_date);
    formData.append("description", form.description);
    formData.append("product_img", form.product_img);
    if (form.subcategory_id) {
      formData.append("subcategory_id", parseInt(form.subcategory_id, 10));
    }

    try {
      await productsAPI.addProductApi(formData);
      close();
      // refresh();
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  // ================= RESET =================
  const RefreshForm = () => {
    setForm({
      name: "",
      tamil_name: "",
      price: "",
      stock: "",
      is_active: "",
      subcategory_id: "",
      expiry_date: "",
      trend_status: false,
      weight: "",
      description: "",
      product_img: "",
    });
    setPreview("");
    setAccepted(false);
    setErrors({});
  };

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        flexWrap:"wrap",
        alignItems: "center",
        zIndex: 999,
        borderRadius:3,
        // minWidth:300,
        maxWidth:"100%",
        // overflowY:"auto",
        // p:2
      }}
    >
      <Paper sx={{ width: "100%", maxWidth:800,maxHeight:"80vh",m:4, p: 3, borderRadius: 3,overflowY:'auto' }}>
        <Box display="flex" justifyContent="space-between" mt={0}>
          <Typography
          sx={fromheading}>
    
    Add Product</Typography>
          <IconButton onClick={close}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>

            {/* NAME */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Product Name"
                name="name"
                fullWidth
                size="small"
                value={form.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
           sx={inputLabelStyle}
              />
            </Grid>

            {/* TAMIL NAME */}
            <Grid item xs={12} md={6} minWidth={220} >
              <TextField
                label="Tamil Name"
                name="tamil_name"
                fullWidth
                size="small"
                value={form.tamil_name}
                onChange={handleChange}
                error={!!errors.tamil_name}
                helperText={errors.tamil_name}
                sx={inputLabelStyle}
              />
            </Grid>

            {/* PRICE */}
            <Grid item xs={12} md={6} minWidth={220}>
              <TextField
                label="Price"
                name="price"
                type="number"
                fullWidth
                size="small"
                value={form.price}
                onChange={handleChange}
                error={!!errors.price}
                helperText={errors.price}
                sx={inputLabelStyle}              
              />
            </Grid>
              <Grid item xs={12} md={6} minWidth={220} >
              <TextField
                select
                label="Select Category"
                fullWidth
                 size="small"
                value={form.category_id}
                onChange={(e) =>
                  setForm({ ...form, category_id: Number(e.target.value) })
                }
                error={!!errors.subcategory_id}
                helperText={errors.subcategory_id}
                sx={inputLabelStyle}              
              >
                {catdrop.length > 0 ? (
                  catdrop.map((s) => (
                    <MenuItem key={s.value} value={s.value} sx={{    fontSize: {
                  xs: "12px",
                  sm: "13px",
                  md: "14px",
                  lg: "14px"
                },
                color: "#6B7280"}}>
                      {s.label}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Category found</MenuItem>
                )}
              </TextField>
            </Grid>

            {/* STOCK */}
            <Grid item xs={12} md={6} minWidth={220} >
              <TextField
                label="Stock"
                name="stock"
                type="number"
                fullWidth
                size="small"
                value={form.stock}
                onChange={handleChange}
                error={!!errors.stock}
                helperText={errors.stock}
                sx={inputLabelStyle}
/>
            </Grid>

            {/* STATUS */}
            {/* <Grid  item xs={12} md={6} minWidth={220}>
              <TextField
                select
                label="Status"
                name="is_active"
                fullWidth
                size="small"
                value={form.is_active}
                onChange={(e) =>
                  setForm({ ...form, is_active: e.target.value === "true" })
                }
                error={!!errors.is_active}
                helperText={errors.is_active}
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
            </Grid> */}
                       <Grid item xs={12} md={6} minWidth={220}>
                         <TextField
                              select
                label="Status"
                // name="is_active"
                fullWidth
                size="small"
                value={form.is_active}
                onChange={(e) =>
                  setForm({ ...form, is_active: e.target.value})
                }
                error={!!errors.is_active}
                helperText={errors.is_active}
               sx={inputLabelStyle} >
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
                       </Grid>


            {/* SUBCATEGORY */}
            <Grid item xs={12} md={6} minWidth={220}>
              <TextField
                select
                label="Select SubCategory"
                fullWidth
                 size="small"
                value={form.subcategory_id }
                onChange={(e) =>
                  setForm({ ...form, subcategory_id: Number(e.target.value) })
                }
                error={!!errors.subcategory_id}
                helperText={errors.subcategory_id}
                sx={inputLabelStyle}              
              >
                {subcatdrop.length > 0 ? (
                  subcatdrop.map((s) => (
                    <MenuItem key={s.value} value={s.value} sx={{    fontSize: {
                  xs: "12px",
                  sm: "13px",
                  md: "14px",
                  lg: "14px"
                },
                color: "#6B7280"}}>
                      {s.label }
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No SubCategory found</MenuItem>
                )}
              </TextField>
            </Grid>
                        

            {/* EXPIRY DATE */}
            <Grid item xs={12} md={6} minWidth={220}>
              <TextField
                type="Date"
                name="expiry_date"
                fullWidth
                size="small"
                value={form.expiry_date}
                onChange={handleChange}
                error={!!errors.expiry_date}
                helperText={errors.expiry_date}
                sx={inputLabelStyle}
              />
            </Grid>

            {/* WEIGHT */}
            <Grid item xs={12} md={6} minWidth={220} >
              <TextField
                label="Weight"
                name="weight"
                fullWidth
                size="small"
                value={form.weight}
                onChange={handleChange}
                error={!!errors.weight}
                helperText={errors.weight}
                sx={inputLabelStyle}               
              />
            </Grid>

            {/* TREND STATUS */}
            <Grid item xs={12} minWidth={220}>
              <TextField
                select
                label="Trend Status"
                name="trend_status"
                fullWidth
                size="small"
                value={form.trend_status}
               sx={inputLabelStyle}               
                onChange={(e) =>
                  setForm({ ...form, trend_status: e.target.value })
                }
              >

                <MenuItem value={true} sx={{    fontSize: {
                  xs: "12px",
                  sm: "13px",
                  md: "14px",
                  lg: "14px"
                },
                color: "#6B7280"}}>Trending</MenuItem>
                <MenuItem value={false} sx={{    fontSize: {
                  xs: "12px",
                  sm: "13px",
                  md: "14px",
                  lg: "14px"
                },
                color: "#6B7280"}}>Not Trending</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6} minWidth={220}>
              <TextField
                label="Unit"
                name="unit"
                fullWidth
                size="small"
                value={form.unit}
                onChange={handleChange}
                error={!!errors.unit}
                helperText={errors.unit}
                sx={inputLabelStyle}
              />
            </Grid>

            {/* IMAGE */}
            <Grid item xs={12} >
              <Button component="label" variant="outlined"   sx={{
    fontSize: {
      xs: "12px",
      sm: "13px",
      md: "14px"
    },
    textTransform: "none"
  }}>
                Upload Product Image
                <input
                  type="file"
                  name="product_img"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
          
                />
              </Button>

              {preview && (
                  <Box
    mt={2}
    sx={{
      width: {
        xs: "100%",
        sm: 200,
        md: 250
      },
      height: 150,
      border: "1px solid #e5e7eb",
      borderRadius: 2,
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f9fafb"
    }}
  >
                  <img src={preview} width="100%" />
                </Box>
              )}

              {errors.product_img && (
                <Typography color="error" variant="caption">
                  {errors.product_img}
                </Typography>
              )}
            </Grid>

            {/* DESCRIPTION */}
            <Grid item xs={12} width={"95%"} >
              <TextField
                label="Description"
                name="description"
                multiline
                rows={3}
                fullWidth
                size="small"
                value={form.description}
                onChange={handleChange}
               sx={inputLabelStyle}
              />
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
                  sx={inputLabelStyle}
                />
              </FormGroup>
              {errors.accepted && (
                <Typography color="error" variant="caption">
                  {errors.accepted}
                </Typography>
              )}
            </Grid>

            {/* BUTTONS */}
        <Grid  item xs={12} sx={{display:"flex",gap:"20px",justifyContent:"space-evenly",alignItems:"center", width:"50%",margin:"auto"}}>

              <Button
                type="submit"
                variant="contained"
                fullWidth
sx={buttonStyle}              >
                Save Product
              </Button>

              <Button
                variant="contained"
                onClick={RefreshForm}
                fullWidth
              sx={buttonStyle}              >
                Reset
              </Button>
            </Grid>

          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddProduct;
