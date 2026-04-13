import { Outlet } from "react-router-dom";
import Navbar from "../main/Navbar";
import Footer from "../main/Footer";
import { Box } from "@mui/material";
import AnnouncementBar from "../main/AnnouncementBar";

const MainLayout = () => {
  return (
    <Box>
      <AnnouncementBar/>
      <Navbar />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default MainLayout;