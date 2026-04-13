// // import { useEffect, useRef, useState } from "react";
// // import { Box, IconButton, Typography } from "@mui/material";
// // import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
// // import usePopularProductsSocket from "../../hooks/UsePopularProductsSocket";
// // import ProductCard from "../product/ProductCard";

// // const CARD_WIDTH = 300;
// // const GAP = 24;

// // const PopularProductsSection = () => {
// //   const { products, error } = usePopularProductsSocket();
// //   const scrollRef = useRef(null);
// //   const intervalRef = useRef(null);
// //   const [isHovered, setIsHovered] = useState(false);

// //   const scrollByOne = (direction = "right") => {
// //     if (!scrollRef.current) return;

// //     const scrollAmount = CARD_WIDTH + GAP;

// //     scrollRef.current.scrollBy({
// //       left: direction === "right" ? scrollAmount : -scrollAmount,
// //       behavior: "smooth",
// //     });
// //   };

// //   useEffect(() => {
// //     if (!scrollRef.current || products.length === 0) return;

// //     intervalRef.current = setInterval(() => {
// //       if (!isHovered) {
// //         scrollByOne("right");
// //       }
// //     }, 3000);

// //     return () => clearInterval(intervalRef.current);
// //   }, [products, isHovered]);

// //   if (error) return <Typography>{error}</Typography>;

// //   return (
// //     <Box sx={{ position: "relative", mt: 5 }}>
// //       <Typography variant="h5" fontWeight={600} sx={{ mb: 2, textAlign:"center" }}>
// //         Popular Products
// //       </Typography>

// //       <IconButton
// //         onClick={() => scrollByOne("left")}
// //         sx={{
// //           position: "absolute",
// //           top: "55%",
// //           left: 0,
// //           transform: "translateY(-50%)",
// //           zIndex: 2,
// //           backgroundColor: "#fff",
// //         }}
// //       >
// //         <ArrowBackIos fontSize="small" />
// //       </IconButton>

// //       <Box
// //         ref={scrollRef}
// //         onMouseEnter={() => setIsHovered(true)}
// //         onMouseLeave={() => setIsHovered(false)}
// //         sx={{
// //           display: "flex",
// //           gap: `${GAP}px`,
// //           overflowX: "auto",
// //           scrollSnapType: "x mandatory",
// //           scrollBehavior: "smooth",
// //           "&::-webkit-scrollbar": { display: "none" },
// //           height:"455px"
// //         }}
// //       >
// //         {products.map((product) => (
// //           <Box
// //             key={product.id}
// //             sx={{
// //               flex: "0 0 auto",
// //               scrollSnapAlign: "start",
// //             }}
// //           >
// //             <ProductCard
// //               product={product}
// //               // image={imageMap[product.product_image]}
// //             />
// //           </Box>
// //         ))}
// //       </Box>

// //       <IconButton
// //         onClick={() => scrollByOne("right")}
// //         sx={{
// //           position: "absolute",
// //           top: "55%",
// //           right: 0,
// //           transform: "translateY(-50%)",
// //           zIndex: 2,
// //           backgroundColor: "#fff",
// //         }}
// //       >
// //         <ArrowForwardIos fontSize="small" />
// //       </IconButton>
// //     </Box>
// //   );
// // };

// // export default PopularProductsSection;






// import { useEffect, useMemo, useRef } from "react";
// import { Box, IconButton, Typography } from "@mui/material";
// import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
// import usePopularProductsSocket from "../../hooks/UsePopularProductsSocket";
// import ProductCard from "../product/ProductCard";

// const CARD_WIDTH = 300;
// const GAP = 24;
// const SPEED = 0.5;

// const PopularProductsSection = () => {
//   const { products, error } = usePopularProductsSocket();

//   const trackRef = useRef(null);
//   const animationRef = useRef(null);
//   const positionRef = useRef(0);
//   const pausedRef = useRef(false);

//   const extendedProducts = useMemo(() => {
//     if (!products.length) return [];
//     return [...products, ...products, ...products];
//   }, [products]);

//   useEffect(() => {
//     if (products.length === 0) return;

//     const singleSetWidth = (CARD_WIDTH + GAP) * products.length;

//     const animate = () => {
//       // Always re-queue first — loop never dies
//       animationRef.current = requestAnimationFrame(animate);

//       // Skip movement if paused or ref not ready
//       if (pausedRef.current || !trackRef.current) return;

//       positionRef.current += SPEED;
//       if (positionRef.current >= singleSetWidth) {
//         positionRef.current = 0;
//       }
//       trackRef.current.style.transform = `translateX(-${positionRef.current}px)`;
//     };

//     // ✅ This line actually starts the loop
//     animationRef.current = requestAnimationFrame(animate);

//     return () => cancelAnimationFrame(animationRef.current);
//   }, [products]);

//   const manualMove = (direction) => {
//     const singleSetWidth = (CARD_WIDTH + GAP) * products.length;
//     const moveAmount = CARD_WIDTH + GAP;

//     if (direction === "right") {
//       positionRef.current += moveAmount;
//     } else {
//       positionRef.current -= moveAmount;
//     }

//     if (positionRef.current < 0) {
//       positionRef.current += singleSetWidth;
//     }
//     if (positionRef.current >= singleSetWidth) {
//       positionRef.current -= singleSetWidth;
//     }

//     trackRef.current.style.transform = `translateX(-${positionRef.current}px)`;
//   };

//   if (error) return <Typography>{error}</Typography>;

//   return (
//     <Box
//       sx={{ position: "relative", mt: 6 }}
//       onMouseEnter={() => { pausedRef.current = true; }}
//       onMouseLeave={() => { pausedRef.current = false; }}
//     >
//       <Typography
//         variant="h5"
//         fontWeight={600}
//         sx={{ mb: 2, textAlign: "center" }}
//       >
//         Popular Products
//       </Typography>

//       <IconButton
//         onClick={() => manualMove("left")}
//         sx={{
//           position: "absolute",
//           top: "55%",
//           left: 0,
//           transform: "translateY(-50%)",
//           zIndex: 2,
//           backgroundColor: "#fff",
//         }}
//       >
//         <ArrowBackIos fontSize="small" />
//       </IconButton>

//       {/* VIEWPORT */}
//       <Box
//         sx={{
//           overflow: "hidden",
//           width: "100%",
//           height: "465px",
//         }}
//       >
//         {/* TRACK */}
//         <Box
//           ref={trackRef}
//           sx={{
//             display: "flex",
//             gap: `${GAP}px`,
//             willChange: "transform",
//             mt: 1,
//           }}
//         >
//           {extendedProducts.map((product, index) => (
//             <Box
//               key={`${product.id}-${index}`}
//               sx={{ flex: `0 0 ${CARD_WIDTH}px` }}
//             >
//               <ProductCard product={product} />
//             </Box>
//           ))}
//         </Box>
//       </Box>

//       <IconButton
//         onClick={() => manualMove("right")}
//         sx={{
//           position: "absolute",
//           top: "55%",
//           right: 0,
//           transform: "translateY(-50%)",
//           zIndex: 2,
//           backgroundColor: "#fff",
//         }}
//       >
//         <ArrowForwardIos fontSize="small" />
//       </IconButton>
//     </Box>
//   );
// };

// export default PopularProductsSection;










import { useEffect, useMemo, useRef } from "react";
import {
  Box,
  IconButton,
  Typography,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import usePopularProductsSocket from "../../hooks/UsePopularProductsSocket";
import ProductCard from "../product/ProductCard";

const GAP = 12;
const SPEED = 0.6;

const PopularProductsSection = () => {
  const { products, error } = usePopularProductsSocket();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // 210px on mobile gives enough room for card content without overflow
  const CARD_WIDTH = isMobile ? 200 : isTablet ? 230 : 290;
  const TRACK_HEIGHT = isMobile ? 350 : isTablet ? 400 : 455;

  const trackRef = useRef(null);
  const animationRef = useRef(null);
  const positionRef = useRef(0);
  const pausedRef = useRef(false);

  const extendedProducts = useMemo(() => {
    if (!products.length) return [];
    return [...products, ...products, ...products];
  }, [products]);

  useEffect(() => {
    if (!products.length) return;
    positionRef.current = 0;
    const singleSetWidth = (CARD_WIDTH + GAP) * products.length;

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      if (pausedRef.current || !trackRef.current) return;
      positionRef.current += SPEED;
      if (positionRef.current >= singleSetWidth) positionRef.current = 0;
      trackRef.current.style.transform = `translateX(-${positionRef.current}px)`;
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [products, CARD_WIDTH]);

  const manualMove = (direction) => {
    const singleSetWidth = (CARD_WIDTH + GAP) * products.length;
    positionRef.current +=
      direction === "right" ? CARD_WIDTH + GAP : -(CARD_WIDTH + GAP);
    if (positionRef.current < 0) positionRef.current += singleSetWidth;
    if (positionRef.current >= singleSetWidth) positionRef.current -= singleSetWidth;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${positionRef.current}px)`;
    }
  };

  if (error) {
    return (
      <Typography sx={{ mt: 4, textAlign: "center" }} color="error">
        {error}
      </Typography>
    );
  }

  if (!products.length) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress color="success" size={28} />
      </Box>
    );
  }

  return (
    <Box
      sx={{ position: "relative", mt: { xs: 3, md: 5 }, mb: 0,   }}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      onTouchStart={() => { pausedRef.current = true; }}
      onTouchEnd={() => {
        setTimeout(() => { pausedRef.current = false; }, 1200);
      }}
    >
      <Typography
        variant="h5"
        fontWeight={700}
        sx={{
          mb: { xs: 1.5, md: 2 },
          textAlign: "center",
          fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
        }}
      >
        Popular Products
      </Typography>

      {!isMobile && (
        <IconButton
          onClick={() => manualMove("left")}
          sx={{
            position: "absolute",
            top: "55%",
            left: -4,
            transform: "translateY(-50%)",
            zIndex: 2,
            backgroundColor: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            "&:hover": { backgroundColor: "#f9f9f9" },
          }}
        >
          <ArrowBackIos fontSize="small" />
        </IconButton>
      )}

      {/* VIEWPORT */}
      <Box
        sx={{
          overflow: "hidden",
          width: "100%",
          height: `${TRACK_HEIGHT}px`,
          px: { xs: 0, sm: 4, md: 5 },
        }}
      >
        {/* TRACK */}
        <Box
          ref={trackRef}
          sx={{
            display: "flex",
            gap: `${GAP}px`,
            willChange: "transform",
            pt: 1,
          }}
        >
          {extendedProducts.map((product, index) => (
            <Box
              key={`${product.id}-${index}`}
              sx={{ flex: `0 0 ${CARD_WIDTH}px` }}
            >
              <ProductCard
               product={product}
               source="popular" 
                />
            </Box>
          ))}
        </Box>
      </Box>

      {!isMobile && (
        <IconButton
          onClick={() => manualMove("right")}
          sx={{
            position: "absolute",
            top: "55%",
            right: -4,
            transform: "translateY(-50%)",
            zIndex: 2,
            backgroundColor: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            "&:hover": { backgroundColor: "#f9f9f9" },
          }}
        >
          <ArrowForwardIos fontSize="small" />
        </IconButton>
      )}

      {/* {isMobile && (
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "0.7rem",
            color: "text.disabled",
            mt: 0.5,
          }}
        >
          Auto-scrolling • touch to pause
        </Typography>
      )} */}
    </Box>
  );
};

export default PopularProductsSection;