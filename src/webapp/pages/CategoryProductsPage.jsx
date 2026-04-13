// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   Breadcrumbs,
//   Link
// } from "@mui/material";
// import useCategoryProductsSocket from "../hooks/UseCategoryProductsSocket";
// import ProductCard from "../components/product/ProductCard";

// const CategoryProductsPage = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const categoryName = location.state?.categoryName || "Category";

//   const { products, loading, error } = useCategoryProductsSocket(id);

//   if (loading)
//     return <Typography sx={{ p: 4 }}>Loading products...</Typography>;

//   if (error)
//     return <Typography sx={{ p: 4 }}>{error}</Typography>;

//   return (
//     <Box sx={{ p: 4 }}>

//       {/* Breadcrumb */}
//       <Box sx={{ mb: 4 }}>
//         <Breadcrumbs separator="/">
//           <Link
//             underline="hover"
//             color="inherit"
//             sx={{ cursor: "pointer" }}
//             onClick={() => navigate("/")}
//           >
//             Home
//           </Link>

//           <Typography color="text.primary">
//             {categoryName}
//           </Typography>
//         </Breadcrumbs>
//       </Box>

//       {/* Title */}
//       <Typography
//         variant="h5"
//         fontWeight={600}
//         sx={{ mb: 4, textAlign: "center" }}
//       >
//         {categoryName}
//       </Typography>

//       {/* Product Grid */}
//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: "repeat(4, 1fr)",
//           gap: 3,
//           justifyContent: "center",
//           maxWidth: 1200,
//           margin: "0 auto"
//         }}
//       >
//         {products.map((product) => (
//           <ProductCard
//             key={product.id}
//             product={product}
            
//           />
//         ))}
//         {console.log("CATEGORY PRODUCTS PAGE RESPONSE", products)}
//       </Box>

//     </Box>
//   );
// };

// export default CategoryProductsPage;









import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Container
} from "@mui/material";
import useCategoryProductsSocket from "../hooks/UseCategoryProductsSocket";
import ProductCard from "../components/product/ProductCard";
import { useState, useEffect } from "react";
import {CircularProgress} from "@mui/material";

const CategoryProductsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const categoryName = location.state?.categoryName || "Category";

  const { products, error, isInitialLoadDone } = useCategoryProductsSocket(id);

  // const [loading, setLoading] = useState(true);

//   useEffect(() => {
//   if (products) {
//     setLoading(false);
//   }
// }, [products]);



// useEffect(() => {
//   if (products !== undefined && products !== null) {
//     setLoading(false);
//   }
// }, [products]);

if (!isInitialLoadDone) {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <CircularProgress />
      </Box>
    </Box>
  );
}

// if (loading) {
//   return (
//     <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "70vh",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     </Box>
//   );
// }

if (error) {
  return (
    <Typography sx={{ p: 4, textAlign: "center", color: "error.main" }}>
      {error}
    </Typography>
  );
}

  // if (loading)
  //   return <Typography sx={{ p: 4, textAlign: "center" }}>Loading products...</Typography>;

  if (error)
    return <Typography sx={{ p: 4, textAlign: "center", color: "error.main" }}>{error}</Typography>;

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", py: { xs: 2, sm: 3, md: 4 } }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>

        {/* Breadcrumb */}
        <Box sx={{ mb: { xs: 1.5, sm: 2.5 }}}>
          <Breadcrumbs separator="›">
            <Link
              underline="hover"
              color="inherit"
              sx={{ cursor: "pointer", fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              onClick={() => navigate("/")}
            >
              Home
            </Link>
            <Typography color="text.primary" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" }, fontWeight: 600 }}>
              {categoryName}
            </Typography>
          </Breadcrumbs>
         {/* <div>
            <button>Type1</button>
            <button>Type2</button>
            <button>Type3</button>
            <button>Type4</button>
          </div>*/}
        </Box>

        {/* Title */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: { xs: 2, sm: 3 },
            fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
            color: "#1a1a1a",
          }}
        >
          {categoryName}
          <Box component="span" sx={{ color: "text.secondary", fontWeight: 400, ml: 1, fontSize: "0.8em" }}>
            ({products.length} items)
          </Box>
        </Typography>

        {/* Product Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
              xl: "repeat(5, 1fr)",
            },
            rowGap: { xs: 4, sm: 5, md: 6 },
            columnGap: { xs: 1.5, sm: 2, md: 2.5 },
            pb: 4,
          }}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              categoryId={id}           
              categoryName={categoryName}
              source="categoryProducts"
            />
          ))}
          {console.log("CATEGORY PRODUCTS PAGE RESPONSE", products)}
        </Box>

        {/* Empty State */}
        {products.length === 0 && (
          <Box sx={{ textAlign: "center", py: 10 }}>
            <Typography variant="h6" color="text.secondary">No products found.</Typography>
          </Box>
        )}

      </Container>
    </Box>
  );
};

export default CategoryProductsPage;