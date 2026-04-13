// // import { useNavigate } from "react-router-dom";
// // import { Box, Typography } from "@mui/material";
// // import useCategories from "../../hooks/UseCategories";

// // const CategoriesSection = () => {
// //   const navigate = useNavigate();
// //   const { categories, error } = useCategories();

// //   const handleClick = (category) => {
// //     navigate(`/products/category/${category.id}`, {
// //       state: { categoryName: category.name }
// //     });
// //   };

// //   if (error) return <Typography>{error}</Typography>;

// //   return (
// //     <Box sx={{ mt: 6 }}>
// //       <Typography
// //         variant="h5"
// //         fontWeight={600}
// //         sx={{ mb: 4, textAlign: "center" }}
// //       >
// //         Categories
// //       </Typography>

// //       <Box
// //         sx={{
// //           display: "flex",
// //           gap: 20,
// //           flexWrap: "wrap",
// //           justifyContent: "center",
// //           alignContent: "center"
// //         }}
// //       >
// //         {categories.map((category) => (
// //           <Box
// //             key={category.id}
// //             onClick={() => handleClick(category)}
// //             sx={{
// //               width: 220,
// //               textAlign: "center",
// //               cursor: "pointer",
// //               transition: "0.3s",
// //               "&:hover": {
// //                 transform: "translateY(-6px)",
// //               },
// //             }}
// //           >
// //             <Box
// //               component="img"
// //               src={category.image}
// //               alt={category.name}
// //               sx={{
// //                 width: "100%",
// //                 height: 180,
// //                 objectFit: "contain",
// //                 backgroundColor: "#fff",
// //                 borderRadius: 3,
// //                 boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
// //                 p: 2,
// //               }}
// //             />

// //             <Typography mt={2} fontWeight={500}>
// //               {category.name}
// //             </Typography>
// //           </Box>
// //         ))}
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default CategoriesSection;






// import { useNavigate } from "react-router-dom";
// import { Box, Typography, CircularProgress } from "@mui/material";
// import { useEffect, useState } from "react";
// import { getAllCategories } from "../../api/AllApi";

// const CategoriesSection = () => {
//   const navigate = useNavigate();

//   const [categories, setCategories] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const controller = new AbortController();

//     const fetchCategories = async () => {
//       try {
//         setError(null);
//         const data = await getAllCategories(controller.signal);

//         if (!Array.isArray(data)) {
//           throw new Error("Invalid category format");
//         }

//         setCategories(data);
//       } catch (err) {
//         if (err.name !== "CanceledError" && err.name !== "AbortError") {
//           setError("Failed to load categories");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();

//     return () => controller.abort();
//   }, []);

//   const handleClick = (category) => {
//     navigate(`/products/category/${category.id}`, {
//       state: { categoryName: category.name }
//     });
//   };

//   if (loading) {
//     return (
//       <Box sx={{ textAlign: "center", mt: 6 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Typography sx={{ mt: 6, textAlign: "center" }} color="error">
//         {error}
//       </Typography>
//     );
//   }

//   return (
//     <Box sx={{ mt: 6 }}>
//       <Typography
//         variant="h5"
//         fontWeight={600}
//         sx={{ mb: 4, textAlign: "center" }}
//       >
//         Categories
//       </Typography>

//       <Box
//         sx={{
//           display: "flex",
//           gap: 20,
//           flexWrap: "wrap",
//           justifyContent: "center",
//           alignContent: "center"
//         }}
//       >
//         {categories.map((category) => (
//           <Box
//             key={category.id}
//             onClick={() => handleClick(category)}
//             sx={{
//               width: 220,
//               textAlign: "center",
//               cursor: "pointer",
//               transition: "0.3s",
//               "&:hover": {
//                 transform: "translateY(-6px)",
//               },
//             }}
//           >
//             <Box
//               component="img"
//               src={category.image}
//               alt={category.name}
//               sx={{
//                 width: "100%",
//                 height: 180,
//                 objectFit: "contain",
//                 backgroundColor: "#fff",
//                 borderRadius: 3,
//                 boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                 p: 2,
//               }}
//             />

//             <Typography mt={2} fontWeight={500}>
//               {category.name}
//             </Typography>
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default CategoriesSection;










import { useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../api/AllApi";

const CategoriesSection = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchCategories = async () => {
      try {
        setError(null);
        const data = await getAllCategories(controller.signal);
        if (!Array.isArray(data)) throw new Error("Invalid category format");
        setCategories(data);
      } catch (err) {
        if (err.name !== "CanceledError" && err.name !== "AbortError") {
          setError("Failed to load categories");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
    return () => controller.abort();
  }, []);

  const handleClick = (category) => {
    navigate(`/products/category/${category.id}`, {
      state: { categoryName: category.name },
    });
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 5, mb: 3 }}>
        <CircularProgress color="success" size={28} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography sx={{ mt: 5, textAlign: "center" }} color="error">
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: { xs: 0, md: 6 } }}>
      <Typography
        variant="h5"
        fontWeight={700}
        sx={{
          mb: { xs: 2, md: 3.5 },
          textAlign: "center",
          fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
        }}
      >
        Categories
      </Typography>

      {/* Centered flex row — cards have fixed width so they're equal & big */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {categories.map((category) => (
          <Box
            key={category.id}
            onClick={() => handleClick(category)}
            sx={{
              // Fixed card width per breakpoint — equal size, centered
              width: { xs: "calc(50% - 8px)", sm: 200, md: 220 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              borderRadius: { xs: 2, md: 3 },
              border: "1px solid",
              borderColor: "grey.100",
              backgroundColor: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              p: { xs: 1.5, sm: 2, md: 2.5 },
              transition: "all 0.22s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                borderColor: "success.light",
              },
              "&:active": { transform: "scale(0.97)" },
            }}
          >
            <Box
              component="img"
              src={category.image}
              alt={category.name}
              sx={{
                width: "100%",
                // Fixed height = all images same size regardless of source dimensions
                height: { xs: 100, sm: 140, md: 180 },
                objectFit: "contain",
              }}
            />
            <Typography
              mt={{ xs: 1, sm: 1.5 }}
              fontWeight={600}
              textAlign="center"
              sx={{
                fontSize: { xs: "0.78rem", sm: "0.9rem", md: "1rem" },
                color: "text.primary",
              }}
            >
              {category.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CategoriesSection;