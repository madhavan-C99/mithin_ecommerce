// import { Box, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const SearchDropdown = ({ results, onClose }) => {
//   const navigate = useNavigate();

//   if (!results.length) {
//     return (
//       <Box sx={{ p: 2 }}>
//         <Typography>No products found</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box>
//       {results.map((item) => (
//         <Box
//           key={item.id}
//           onClick={() => {
//             navigate(`/products/${item.id}`);
//             onClose();
//           }}
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 1,
//             p: 1,
//             cursor: "pointer",
//             "&:hover": { backgroundColor: "#f5f5f5" },
//           }}
//         >
//           <img
//             src={item.product_img}
//             alt={item.name}
//             style={{ width: 40, height: 40, objectFit: "cover" }}
//           />

//           <Box>
//             <Typography fontSize="0.9rem">
//               {item.name}
//             </Typography>
//             <Typography fontSize="0.75rem" color="gray">
//               {item.tamil_name}
//             </Typography>
//           </Box>
//         </Box>
//       ))}
//     </Box>
//   );
// };

// export default SearchDropdown;









import { Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SearchDropdown = ({ results, loading, onClose }) => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* 🔄 Loading */}
      {loading && (
        <Box sx={{ p: 2, textAlign: "center" }}>
          <CircularProgress size={20} />
        </Box>
      )}

      {/* ❌ No results */}
      {!loading && results.length === 0 && (
        <Box sx={{ p: 2 }}>
          <Typography fontSize="0.9rem" color="text.secondary">
            No products found
          </Typography>
        </Box>
      )}

      {/* ✅ Results */}
      {results.map((item) => (
        <Box
          key={item.id}
          onMouseDown={() => {
            navigate(`/products/${item.id}`,  { state: { source: "search" }});
            onClose();
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: 2,
            py: 1.2,
            cursor: "pointer",
            transition: "all 0.2s ease",
            borderBottom: "1px solid #f0f0f0",
            "&:hover": {
              backgroundColor: "#f9faf9",
            },
          }}
        >
          {/* Product Image */}
          <Box
            component="img"
            src={item.product_img}
            alt={item.name}
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              objectFit: "cover",
              border: "1px solid #eee",
            }}
          />

          {/* Product Info */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              fontSize="0.9rem"
              fontWeight={500}
              noWrap
            >
              {item.name}
            </Typography>

            <Typography
              fontSize="0.75rem"
              color="text.secondary"
              noWrap
            >
              {item.tamil_name}
            </Typography>
          </Box>

          {/* Price */}
          <Typography
            fontSize="0.85rem"
            fontWeight={600}
            color="#2e7d32"
          >
            ₹{item.price}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default SearchDropdown;