// import { Box } from "@mui/material";

// const AnnouncementBar = () => {

//   const primaryColor = "#4CAF50";

//   return (
//     <Box
//       sx={{
//         backgroundColor: primaryColor,
//         color: "#fff",
//         overflow: "hidden",
//         whiteSpace: "nowrap",
//         height: "30px",
//         display: "flex",
//         alignItems: "center"
//       }}
//     >
//       <Box
//         sx={{
//           display: "inline-block",
//           paddingLeft: "100%",
//           animation: "scrollText 20s linear infinite",
//           fontSize: "17px"
//         }}
//       >
//         Fresh Fruits | Vegetables | Spices | Bakery | Beverages | Delivered Fast
//       </Box>

//       <style>
//         {`
//           @keyframes scrollText {
//             0% { transform: translateX(0); }
//             100% { transform: translateX(-100%); }
//           }
//         `}
//       </style>

//     </Box>
//   );
// };

// export default AnnouncementBar;









import { Box } from "@mui/material";

const AnnouncementBar = () => {
  const primaryColor = "#4CAF50";

  return (
    <Box
      sx={{
        backgroundColor: primaryColor,
        color: "#fff",
        overflow: "hidden",
        whiteSpace: "nowrap",
        height: { xs: "26px", sm: "30px" },
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "inline-block",
          paddingLeft: "100%",
          animation: "scrollText 20s linear infinite",
          fontSize: { xs: "13px", sm: "15px", md: "17px" },
        }}
      >
        Fresh Fruits | Vegetables | Spices | Bakery | Beverages | Delivered Fast
      </Box>

      <style>
        {`
          @keyframes scrollText {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
    </Box>
  );
};

export default AnnouncementBar;