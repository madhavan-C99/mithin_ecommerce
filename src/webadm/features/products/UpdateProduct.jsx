import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  IconButton,
  Avatar,
  Grid,
  FormControlLabel,
  Checkbox,
  Paper
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useState, useEffect } from "react";
// import api, { authAPI } from "../api/Index";
import { productsAPI } from "./productAPI";
import { dropdownAPI } from "../../services/dropdownAPI";
import { useAuth } from "../../context/AuthContext";
// import { useAuth } from "../authcontext/AuthContext";

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
    mb:3
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



const UpdateProducts = ({ product, close, refresh }) => {
console.log("update product click", product.category_img)
  const [form, setForm] = useState({
    id: "",
    tamil_name: "",
    name: "",
    price: "",
    stock: "",
    subcategory_id: "",
    category_id:"",
    current_trending_status: false,
    status: false,
    expiry_date: "",
    weight: "",
    description: "",
    product_img:""

  });
  const [subcatdrop, setsubCatdrop] = useState([]);
  const [catdrop, setCatdrop] = useState([]);
  const [preview, setPreview] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  // const { uploadFile } = useAuth();

  //  Load product data into form

// ---------------------
useEffect(() => {
  if (!product?.data || catdrop.length === 0) return;

const products_select = product.data[0]
  const matchedSubcategory = subcatdrop.find(
    (item) =>
      item.label.trim() === products_select.subcategory?.trim()
  );
  const matchedCategory = catdrop.find(
    (item) =>
      item.label.trim() === products_select.category?.trim()
  );
  console.log("product_data",product.data)

  console.log("string",product.data[0].id)
  console.log("string cate name",product.data[0].subcategory)
  console.log("string cat name for subcat",product.data[0].subcategory)
  
  setForm({
    id: products_select.id || "",
    name: products_select.name || "",
    tamil_name: products_select.tamil_name || "",
    price: products_select.price || "",
    stock: products_select.stock || "",
    subcategory_id: matchedSubcategory
      ? String(matchedSubcategory.value)
      : "",
    category_id: matchedCategory
      ? String(matchedCategory.value)
      : "",  
    status: products_select.status ?? false,
    current_trending_status:
      products_select.current_trending_status ?? false,
    expiry_date: products_select.expiry_date || "",
    weight: products_select.weight || "",
    description: products_select.description || "",
    product_img: products_select.product_img || "",
    unit:products_select.unit || ""
  });
  console.log("SetForm Here %%%%",form)

  console.log("Product subcategory:", product.data.category_img);
  console.log("Dropdown:", catdrop);
  if (products_select.product_img) {
      setPreview(products_select.product_img);
    }
    console.log("preview 1 for image",preview)

}, [product, catdrop]);


  //========================= REFRESH  ================================
  const RefreshContent = () => {
  setForm((prev) => ({
    ...prev,
    name: "",
    tamil_name: "",
    price: "",
    stock: "",
    subcategory_id: "",
    category_id:"",
    expiry_date: "",
    weight: "",
    unit:"",
    description: "",
    product_img: "",
  }));

  setAccepted(false);
  setPreview("");
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


  //====================  Fetch dropdown categories======================
  useEffect(() => {
    const fetchDropdown = async () => {
      try {
        const res = await dropdownAPI.fetchDropSub();
        setsubCatdrop(res?.data?.data || []);
      } catch (error) {
        console.log("Dropdown error:", error);
      }
    };
    fetchDropdown();
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
  const handleChange = (e) => {
  const { name, value } = e.target;

  let errorMsg = "";

  // NAME VALIDATION (Only letters & spaces)
  if (name === "name") {
    if (!value.trim()) {
      errorMsg = "Product name is required";
    } else if (!/^[A-Za-z\s]+$/.test(value)) {
      errorMsg = "Only letters and spaces allowed";
    }
  }

  // TAMIL NAME
  // TAMIL NAME VALIDATION
  if (name === "tamil_name") {
    if (!value.trim()) {
      errorMsg = "Tamil name is required";
    } 
    else if (!/^[\u0B80-\u0BFF\s]+$/.test(value)) {
      errorMsg = "Only Tamil letters allowed";
    }
  }

  // PRICE VALIDATION
  if (name === "price") {
    if (value === "") {
      errorMsg = "Price is required";
    } else if (!/^\d+(\.\d+)?$/.test(value)) {
      errorMsg = "Only numbers allowed";
    } else if (Number(value) < 0) {
      errorMsg = "Price cannot be negative";
    }
  }

  // STOCK VALIDATION
  if (name === "stock") {
    if (value === "") {
      errorMsg = "Stock is required";
    } else if (!/^\d+$/.test(value)) {
      errorMsg = "Only whole numbers allowed";
    } else if (Number(value) < 0) {
      errorMsg = "Stock cannot be negative";
    }
  }

  // WEIGHT VALIDATION
  if (name === "weight") {
    if (value === "") {
      errorMsg = "Weight is required";
    } else if (!/^\d+(\.\d+)?$/.test(value)) {
      errorMsg = "Only numbers allowed";
    } else if (Number(value) < 0) {
      errorMsg = "Weight cannot be negative";
    }
  }

  if (name === "category_id") {
  if (!value) {
    errorMsg = "Select a category";
  }
}

  setForm({
    ...form,
    [name]: value,
  });

  setErrors({
    ...errors,
    [name]: errorMsg,
  });
};
// ================= VALIDATION =================
const validate = () => {
  let tempErrors = {};

  if (!form.name.trim()) {
    tempErrors.name = "Product name is required";
  }

  if (!form.tamil_name.trim()) {
    tempErrors.tamil_name = "Tamil name is required";
  }

  if (!form.price) {
    tempErrors.price = "Price is required";
  }

  if (!form.stock) {
    tempErrors.stock = "Stock is required";
  }

  if (!form.category_id) {
    tempErrors.category_id = "Select a category";
  }

  if (!form.expiry_date) {
    tempErrors.expiry_date = "Select expiry date";
  }

  if (!form.weight) {
    tempErrors.weight = "Weight is required";
  }

  if (!form.unit) {
    tempErrors.unit = "Unit is required";
  }

  // if (!form.product_img) {
  //   tempErrors.product_img = "Please upload product image";
  // }
  if (!form.product_img && !preview) {
    tempErrors.product_img = "Please upload product image";
  }

  if (!accepted) {
    tempErrors.accepted = "You must accept the details";
  }

  setErrors(tempErrors);

  return Object.keys(tempErrors).length === 0;
};

// ============================
  //CHANGE OLD IMAGE STRING INTO PATH 
//   const convertUrlToFile = async (url) => {
//   const response = await fetch(url);
//   const blob = await response.blob();
//   const fileName = url.split("/").pop();

//   return new File([blob], fileName, { type: blob.type });
// }; 
// // ============================
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  try {
    const formData = new FormData();

    formData.append("id", Number(form.id));
    formData.append("name", form.name);
    formData.append("tamil_name", form.tamil_name);
    formData.append("price", Number(form.price));
    formData.append("stock", Number(form.stock));
    formData.append("category_id", Number(form.category_id));
    formData.append("weight", Number(form.weight));
    formData.append("expiry_date", form.expiry_date);
    formData.append("status", form.status);
    formData.append("current_trending_status", form.current_trending_status);
    formData.append("description", form.description);
    formData.append("unit",form.unit);
console.log("oriduct image", form.product_img)

    if (form.subcategory_id) {
      formData.append("subcategory_id", parseInt(form.subcategory_id, 10));
    }
    // if (form.product_img instanceof File) {
    //   formData.append("product_img", form.product_img);
    // }
//     if (form.product_img instanceof File) {
//   // New image selected
//   formData.append("product_img", form.product_img);
// } else if (typeof form.product_img === "string" && form.product_img !== "") {
//   // Old image path send in SAME KEY
//   formData.append("product_img", form.product_img);
// }

// alex img code remove 
//  let imageFile;

// if (form.product_img instanceof File) {
//   imageFile = form.product_img;
// } else {
//   imageFile = await convertUrlToFile(form.product_img);
// }



let imageFile;

if (form.product_img instanceof File) {
  imageFile = form.product_img;
}

if (imageFile) {
  formData.append("product_img", imageFile);
}


    await productsAPI.updateProduct(formData);

    close();
    // refresh();

  } catch (error) {
    console.error("Update error:", error.response?.data);
    console.error("FULL ERROR:", error);
console.error("RESPONSE:", error.response);
console.error("DATA:", error.response?.data);
  }
};
// =============================
  
 const handleImageChange = async (e) => {
     const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setForm((prev) => ({
      ...prev,
      product_img: file, //  store File directly
    }));


  };

  if (!product) return null;
return (
  <>
  {console.log("preview",preview)}
  <Box
  sx={{
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  }}
>
      <Paper sx={{ width: "100%", maxWidth:800,maxHeight:"80vh",m:4, p: 3, borderRadius: 3,overflowY:'auto'}}>

    {/* HEADER */}
        <Box display="flex" justifyContent="space-between" mt={0}>
   <Typography   sx={fromheading}>
        Update Product
      </Typography>
      <IconButton onClick={close}>
        <ClearIcon />
      </IconButton>
    </Box>

    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={3}>

        {/* ROW 1 */}
        <Grid item xs={12} md={6} >
          <TextField
            label="Product Name"
            name="name"
            fullWidth
            size="small"
            value={form.name}
            onChange={handleChange}
            error={!!errors?.name}
            helperText={errors?.name}
sx={inputLabelStyle}
          />
        </Grid>

        <Grid item xs={12} md={6} minWidth={220}>
          <TextField
            label="Tamil Name"
            name="tamil_name"
            fullWidth
            size="small"
            value={form.tamil_name}
            onChange={handleChange}
            error={!!errors?.tamil_name}
            helperText={errors?.tamil_name}
sx={inputLabelStyle}
          />
        </Grid>
          <Grid item xs={12} md={6} minWidth={220}>
          <TextField
          select
          label="Category"
          name="category_id"
          fullWidth
          size="small"
          value={form.category_id}
          onChange={handleChange}
          error={!!errors?.category_id}
          helperText={errors?.category_id}
          sx={inputLabelStyle}
        >
          {catdrop.length > 0 ? (
            catdrop.map((item) => (
              <MenuItem key={item.value} value={String(item.value)} sx={{    fontSize: {
                  xs: "12px",
                  sm: "13px",
                  md: "14px",
                  lg: "14px"
                },
                color: "#6B7280"}}>
                {item.label}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No Category Found</MenuItem>
          )}
        </TextField>
        </Grid>

        {/* ROW 2 */}
        <Grid item xs={12} md={6} minWidth={220}>
          <TextField
            label="Price"
            name="price"
            type="number"
            fullWidth
            size="small"
            value={form.price}
            onChange={handleChange}
            error={!!errors?.price}
            helperText={errors?.price}
sx={inputLabelStyle}
          />
        </Grid>

        <Grid item xs={12} md={6} minWidth={220}>
          <TextField
            label="Stock"
            name="stock"
            type="number"
            fullWidth
            size="small"
            value={form.stock}
            onChange={handleChange}
            error={!!errors?.stock}
            helperText={errors?.stock}
sx={inputLabelStyle}
          />
        </Grid>

        {/* ROW 3 */}
        <Grid item xs={12} md={6} minWidth={220}>
          <TextField
            select
            label="Status"
            fullWidth
            size="small"
            value={form.status}
            onChange={(e) =>
            setForm({
              ...form,
              status: e.target.value,
            })
          }
sx={inputLabelStyle}
          >
        <MenuItem value={true} sx={{ color: "green", fontWeight: "bold" ,fontSize: {
                  xs: "12px",
                  sm: "13px",
                  md: "14px",
                  lg: "14px"
                },}}>
          Active
        </MenuItem>

        <MenuItem value={false} sx={{ color: "red", fontWeight: "bold",fontSize: {
                  xs: "12px",
                  sm: "13px",
                  md: "14px",
                  lg: "14px"
                },}}>
          Inactive
        </MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} md={6} minWidth={220}>
          <TextField
          select
          label="Subcategory"
          name="subcategory_id"
          fullWidth
          size="small"
          value={form.subcategory_id}
          onChange={handleChange}
          error={!!errors?.subcategory_id}
          helperText={errors?.subcategory_id}
          sx={inputLabelStyle}
        >
          {subcatdrop.length > 0 ? (
            subcatdrop.map((item) => (
              <MenuItem key={item.value} value={String(item.value)} sx={{    fontSize: {
                  xs: "12px",
                  sm: "13px",
                  md: "14px",
                  lg: "14px"
                },
                color: "#6B7280"}}>
                {item.label}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No subCategory Found</MenuItem>
          )}
        </TextField>
        </Grid>

        {/* ROW 4 */}
        <Grid item xs={12} md={6} minWidth={220}>
          <TextField
            label="Expiry Date"
            type="date"
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
            value={form.expiry_date}
            onChange={handleChange}
            name="expiry_date"
            error={!!errors?.expiry_date}
            helperText={errors?.expiry_date}
sx={inputLabelStyle}
          />
        </Grid>

        <Grid item xs={12} md={6} minWidth={220}>
          <TextField
            label="Weight"
            name="weight"
            fullWidth
            size="small"
            value={form.weight}
            onChange={handleChange}
            error={!!errors?.weight}
            helperText={errors?.weight}
sx={inputLabelStyle}
          />
        </Grid>

        {/* TRENDING */}
        <Grid item xs={12} md={6} minWidth={220}>
          <TextField
            select
            label="Trending Status"
            fullWidth
            size="small"
            value={form.current_trending_status}
            onChange={(e) =>
              setForm({
                ...form,
                current_trending_status:
                  e.target.value === "true",
              })
            }
sx={inputLabelStyle}
          >
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
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
            error={!!errors?.weight}
            helperText={errors?.unit}
            InputLabelProps={{ shrink: true }}
sx={inputLabelStyle}
          />
        </Grid>

       

        {/* DESCRIPTION */}
        <Grid item xs={12} minWidth={"100%"} maxHeight={"350px"}>
          <TextField
            label="Description"
            name="description"
            multiline
            rows={4}
            fullWidth
            size="small"
            value={form.description}
            onChange={handleChange}
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
              hidden
              accept="image/*"
              // value={from.product_img}
              onChange={handleImageChange}
            />
          </Button>

          {preview && (
            <Box mt={2}>
              <img
                
                src={preview}
                width="120"
                style={{ borderRadius: 8 }}
              />
            </Box>
          )}
          {errors?.product_img && (
            <Typography color="error" variant="caption">
              {errors.product_img}
            </Typography>
          )}
        </Grid>

        {/* ACCEPT CHECKBOX */}
        
        <Grid item xs={12} minWidth={220} sx = {{width:"100%"}}>
          <FormControlLabel
            control={
              <Checkbox
                checked={accepted}
                onChange={(e) =>
                  setAccepted(e.target.checked)
                }
              />
            }
            label="I confirm that the above details are correct."
            sx={inputLabelStyle}
          />
          {errors?.accepted && (
            <Typography color="error" variant="caption">
              {errors.accepted}
            </Typography>
          )}
        </Grid>

        {/* SUBMIT */}
        {/* <Grid item xs={12} sx={{display:"flex",gap:"10px",justifyContent:"space-evenly",alignItems:"center", width:"100%"}}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
          sx={buttonStyle}
          >
            Submit
          </Button>

           <Button
            
            variant="contained"
            fullWidth
          sx={buttonStyle}
            onClick={RefreshContent}
          >
            Reset All
          </Button>
        </Grid> */}

        {/* new */}
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
</>
);
};

export default UpdateProducts;

