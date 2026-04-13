// // import { Box } from "@mui/material";
// // import bannerImage from "../../../assets/home_page_banner.jpg"; 

// // export default function BannerSection() {
// //   return (
// //     <Box
// //       sx={{
// //         // mt: 0,
// //         width: "100%",
// //         // aspectRatio: "16 / 6",
// //         overflow: "hidden",
// //       }}
// //     >
// //       <Box
// //         component="img"
// //         src={bannerImage}
// //         alt="Promotional Banner"
// //         sx={{
// //           width: "100%",
// //           height: "100%",
// //           objectFit: "cover",
// //           display: "block",
// //         }}
// //       />
// //     </Box>
// //   );
// // }









// import { Box } from "@mui/material";
// import bannerImage from "../../../assets/home_page_banner.jpg";

// export default function BannerSection() {
//   return (
//     <Box
//       sx={{
//         width: "100%",
//         // overflow: "hidden",
//         lineHeight: 0, // removes any inline gap below the image
//       }}
//     >
//       <Box
//         component="img"
//         src={bannerImage}
//         alt="Promotional Banner"
//         sx={{
//           width: "100vw",
//           height: "30vh",        // ← scales naturally, never clips
//           display: "block",
//           objectFit: "fill",     // ← uses every pixel of the image as-is
//         }}
//       />
//     </Box>
//   );
// }










import { Box } from "@mui/material";
import bannerImage from "../../../assets/home_page_banner_final.jpg";

export default function BannerSection() {
  return (
    <Box
      sx={{
        // mt: "7",
        width: "100%",
        lineHeight: 0,
        // backgroundColor: "#4caf1a", // match your banner's green exactly
        // Vertical padding gives height on mobile, removed on desktop
        // p: { xs: 2, sm: 1, md: 0 },
      }}
    >
      <Box
        component="img"
        src={bannerImage}
        alt="Promotional Banner"
        sx={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
      />
    </Box>
  );
}