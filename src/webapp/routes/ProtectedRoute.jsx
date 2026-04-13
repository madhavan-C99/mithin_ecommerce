// PROTECTEDROUTE.JSX

// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

/**
 * Protects private routes
 */
// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useAuth();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };


// const ProtectedRoute = ({ children, requireProfile = false }) => {
//   const { isAuthenticated, isProfileComplete } = useAuth();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace state={{ from: location.pathname }} />;
//   }

//   if (requireProfile && !isProfileComplete) {
//     return <Navigate to="/signup" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;






import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CircularProgress, Box } from "@mui/material";

const ProtectedRoute = ({
  children,
  requireProfile = false,
}) => {
  const { isAuthenticated, isProfileComplete, authLoading } = useAuth();
  const location = useLocation();

   // Wait until auth restoration finishes
  if (authLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  if (requireProfile && !isProfileComplete) {
    return <Navigate to="/signup" replace />;
  }

  // Support both nested and wrapped usage
  return children ? children : <Outlet />;
};

export default ProtectedRoute;