// // productspage.jsx

// import { useLocation, useNavigate } from "react-router-dom";
// import { Box, Typography, Breadcrumbs, Link, Container } from "@mui/material";
// import useProductsSocket from "../hooks/UseProductsSocket";
// import ProductCard from "../components/product/ProductCard";
// import { useEffect } from "react";
// import {CircularProgress} from "@mui/material";

// const ProductsPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const categoryId = location.state?.categoryId;
//   const subCategoryId = location.state?.subCategoryId;
//   const categoryName = location.state?.categoryName;
//   const subCategoryName = location.state?.subCategoryName;

//   useEffect(() => {
//     if (!categoryId || !subCategoryId) navigate("/");
//   }, [categoryId, subCategoryId, navigate]);

//   const { products, isInitialLoadDone, error } = useProductsSocket(categoryId, subCategoryId);

//   // if (loading) return (
//   //   <Typography sx={{ p: 4, textAlign: "center" }}>Loading products...</Typography>
//   // );
//   // if (error) return (
//   //   <Typography sx={{ p: 4, textAlign: "center", color: "error.main" }}>{error}</Typography>
//   // );


//   if (!isInitialLoadDone) {
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

//   return (
//     <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", py: { xs: 2, sm: 3, md: 4 } }}>
//       <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>

//         {/* Breadcrumb */}
//         <Box sx={{ mb: { xs: 1.5, sm: 2.5 } }}>
//           <Breadcrumbs separator="›">
//             <Link
//               underline="hover"
//               color="inherit"
//               sx={{ cursor: "pointer", fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
//               onClick={() => navigate("/")}
//             >
//               Home
//             </Link>
//             <Typography color="inherit" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
//               {categoryName}
//             </Typography>
//             <Typography color="text.primary" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" }, fontWeight: 600 }}>
//               {subCategoryName}
//             </Typography>
//           </Breadcrumbs>
//         </Box>

//         {/* Page Title */}
//         <Typography
//           variant="h5"
//           sx={{
//             fontWeight: 700,
//             mb: { xs: 2, sm: 3 },
//             fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
//             color: "#1a1a1a",
//           }}
//         >
//           {subCategoryName}
//           <Box component="span" sx={{ color: "text.secondary", fontWeight: 400, ml: 1, fontSize: "0.8em" }}>
//             ({products.length} items)
//           </Box>
//         </Typography>

//         {/* Product Grid */}
//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: {
//               xs: "repeat(2, 1fr)",   // Mobile:        2 cards
//               sm: "repeat(2, 1fr)",   // Small tablet:  2 cards
//               md: "repeat(3, 1fr)",   // Tablet:        3 cards
//               lg: "repeat(4, 1fr)",   // Desktop:       4 cards
//               xl: "repeat(5, 1fr)",   // Wide screen:   5 cards
//             },
//             // gap: { xs: 2, sm: 2.5, md: 3 },   // row + column gap together
//             // With this:
//             rowGap: { xs: 4, sm: 5, md: 6 },       // vertical gap between card rows
//             columnGap: { xs: 1.5, sm: 2, md: 2.5 }, // horizontal gap between cards
//             pb: 4,                             // space at bottom for cart button overflow
//           }}
//         >
//           {products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </Box>

//         {/* Empty State */}
//         {/* {products.length === 0 && (
//           <Box sx={{ textAlign: "center", py: 10 }}>
//             <Typography variant="h6" color="text.secondary">No products found.</Typography>
//           </Box>
//         )} */}

//       </Container>
//     </Box>
//   );
// };

// export default ProductsPage;










// ProductsPage.jsx

import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Breadcrumbs, Link, Container, CircularProgress } from "@mui/material";
import useProductsSocket from "../hooks/UseProductsSocket";
import ProductCard from "../components/product/ProductCard";
import { useEffect } from "react";

const ProductsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const categoryId = location.state?.categoryId;
  const subCategoryId = location.state?.subCategoryId;
  const categoryName = location.state?.categoryName;
  const subCategoryName = location.state?.subCategoryName;

  useEffect(() => {
    if (!categoryId || !subCategoryId) navigate("/");
  }, [categoryId, subCategoryId, navigate]);

  const { products, isInitialLoadDone, error } = useProductsSocket(categoryId, subCategoryId);

  if (!isInitialLoadDone) {
    return (
      <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", py: { xs: 2, sm: 3, md: 4 } }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>

        {/* Breadcrumb */}
        <Box sx={{ mb: { xs: 1.5, sm: 2.5 } }}>
          <Breadcrumbs separator="›">

            {/* Home */}
            <Link
              underline="hover"
              color="inherit"
              sx={{ cursor: "pointer", fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              onClick={() => navigate("/")}
            >
              Home
            </Link>

            {/* ✅ CHANGE 1: Category — now clickable, navigates to CategoryProductsPage */}
            <Link
              underline="hover"
              color="inherit"
              sx={{ cursor: "pointer", fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              onClick={() =>
                navigate(`/products/category/${categoryId}`, {
                  state: { categoryName },
                })
              }
            >
              {categoryName}
            </Link>

            {/* SubCategory — current page, not clickable */}
            <Typography
              color="text.primary"
              sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" }, fontWeight: 600 }}
            >
              {subCategoryName}
            </Typography>

          </Breadcrumbs>
        </Box>

        {/* Page Title */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: { xs: 2, sm: 3 },
            fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
            color: "#1a1a1a",
          }}
        >
          {subCategoryName}
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
            // ✅ CHANGE 2: pass category info as props to ProductCard
            <ProductCard
              key={product.id}
              product={product}
              categoryId={categoryId}
              categoryName={categoryName}
              subCategoryId={subCategoryId}
              subCategoryName={subCategoryName}
              source="category" 
            />
          ))}
        </Box>

      </Container>
    </Box>
  );
};

export default ProductsPage;