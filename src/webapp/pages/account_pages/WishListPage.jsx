// import { useSelector } from "react-redux";
// import { Grid, Card, Typography, Box } from "@mui/material";

// const WishlistPage = () => {

//   const wishlist = useSelector((state) => state.wishlist.items);

//   return (
//     <Grid container spacing={3}>

//       {wishlist.map((item) => (

//         <Grid item xs={12} sm={6} md={4} key={item.wishlist_id}>

//           <Card sx={{ p: 2 }}>

//             <Box
//               component="img"
//               src={item.image}
//               sx={{
//                 width: "100%",
//                 height: 200,
//                 objectFit: "contain"
//               }}
//             />

//             <Typography fontWeight={600}>
//               {item.product_name}
//             </Typography>

//             <Typography>
//               ₹ {item.price}
//             </Typography>

//           </Card>

//         </Grid>

//       ))}

//     </Grid>
//   );
// };

// export default WishlistPage;









// import { useSelector } from "react-redux";
// import { Grid } from "@mui/material";
// import ProductCard from "../../components/product/ProductCard";

// const WishlistPage = () => {

//   const wishlist = useSelector((state) => state.wishlist.items);

//   return (
//     <Grid container spacing={3}>

//       {wishlist.map((item) => {

//         const product = {
//           id: item.product_id,
//           name: item.product_name,
//           productimage: item.image,
//           pricePerKg: item.price,
//           tamilname: item.tamilname || "",
//           unit: item.unit || "kg",   // dynamic fallback
//         };

//         return (
//           <Grid item xs={12} sm={6} md={4} key={item.wishlist_id}>
//             <ProductCard
//               product={product}
//               showRemoveButton={true}
//               wishlistId={item.wishlist_id}
//             />
//           </Grid>
//         );
//       })}

//     </Grid>
//   );
// };

// export default WishlistPage;










import { useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";
import ProductCard from "../../components/product/ProductCard";

const WishlistPage = () => {

  const wishlist = useSelector((state) => state.wishlist.items);

  if (!wishlist || wishlist.length === 0) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="text.secondary">
          Your wishlist is empty
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        // 4 equal columns on desktop, 3 on tablet, 2 on mobile, 1 on very small
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        gap: 3,
        // make all rows the same height — each row stretches to tallest card
        alignItems: "stretch",
      }}
    >
      {wishlist.map((item) => {

        const product = {
          id: item.product_id,
          name: item.product_name,
          productimage: item.image || "",
          pricePerKg: Number(item.price || 0),
          tamilname: item.tamilname || "",
          unit: item.unit || "kg",
        };

        return (
          // No wrapper div needed — CSS Grid children are always equal width by definition
          <ProductCard
            key={item.wishlist_id}
            product={product}
            showRemoveButton={true}
            wishlistId={item.wishlist_id}
            source="wishlist"
          />
        );
      })}
    </Box>
  );
};

export default WishlistPage;