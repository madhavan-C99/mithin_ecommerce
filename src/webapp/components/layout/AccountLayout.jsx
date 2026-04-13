// import { Box, useMediaQuery } from "@mui/material";
// import { Outlet } from "react-router-dom";

// import AccountNavbar from "../account/AccountNavbar";
// import AccountSidebar from "../account/AcccountSidebar";
// import AccountBottomNav from "../account/AccountBottotmNav";

// const AccountLayout = () => {

//   const isMobile = useMediaQuery("(max-width:900px)");

//   return (
//     <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>

//       <AccountNavbar />

//       <Box sx={{ display: "flex" }}>

//         {!isMobile && <AccountSidebar />}

//         <Box
//           sx={{
//             flex: 1,
//             p: { xs: 2, md: 4 },
//             pb: { xs: 10, md: 4 }
//           }}
//         >
//           <Outlet />
//         </Box>

//       </Box>

//       {isMobile && <AccountBottomNav />}

//     </Box>
//   );
// };

// export default AccountLayout;






import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import AccountNavbar from "../account/AccountNavbar";
import AccountSidebar from "../account/AcccountSidebar";
import AccountBottomNav from "../account/AccountBottotmNav";

import { fetchWishlist } from "../../api/AllApi";
import { setWishlist } from "../../store/WishListSlice";

const AccountLayout = () => {

  const isMobile = useMediaQuery("(max-width:900px)");
  const dispatch = useDispatch();

  useEffect(() => {

    const loadWishlist = async () => {

      try {

        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.user_id;

        if (!userId) return;

        const data = await fetchWishlist(userId);

        // dispatch(setWishlist(data.data));
        dispatch(setWishlist(Array.isArray(data) ? data : []));

      } catch (error) {
        console.error("Wishlist fetch failed", error);
      }

    };

    loadWishlist();

  }, [dispatch]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>

      <AccountNavbar />

      <Box sx={{ display: "flex" }}>

        {!isMobile && <AccountSidebar />}

        {/* <Box
          sx={{
            flex: 1,
            p: { xs: 2, md: 4 },
            pb: { xs: 10, md: 4 }
          }}
        >
          <Outlet />
        </Box> */}


        <Box
        sx={{
          flex: 1,
          p: { xs: 2, md: 4 },
          pb: { xs: 10, md: 4 },
          overflow: "hidden",   // ✅ prevents cart button bleed from breaking layout
          minWidth: 0,          // ✅ flex child must have this to shrink properly
          }}
          >
  <Outlet />
</Box>

      </Box>

      {isMobile && <AccountBottomNav />}

    </Box>
  );
};

export default AccountLayout;