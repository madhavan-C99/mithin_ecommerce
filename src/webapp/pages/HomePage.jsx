// import BannerSection from "../components/home/BannerSection";
// import PopularProductsSection from "../components/home/PopularProductsSection";
// import CategoriesSection from "../components/home/CategoriesSection";

// const HomePage = () => {
//   return (
//     <div>
//       <BannerSection />
//       <PopularProductsSection />
//       <CategoriesSection />
//       {console.log("HOME PAGE token",localStorage.getItem("access_token"))}
//       {console.log("HOME PAGE token",localStorage.getItem("user"))}
//     </div>
//   );
// };

// export default HomePage;











import { Box } from "@mui/material";
import BannerSection from "../components/home/BannerSection";
import PopularProductsSection from "../components/home/PopularProductsSection";
import CategoriesSection from "../components/home/CategoriesSection";


const HomePage = () => {

  return (
    <Box>
      <BannerSection />
      <Box sx={{ px: { xs: 1.5, sm: 3, md: 5, lg: 8 }, pb: { xs: 5, md: 8 } }}>
        <PopularProductsSection />
        <CategoriesSection />
      </Box>
    </Box>
  );
};

export default HomePage;