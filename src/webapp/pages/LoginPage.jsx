// LOGINPAGE.JSX
// ✅ All logic preserved — only JSX/styles redesigned

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { requestOtp } from "../api/AuthApi";
import { useAuth } from "../context/AuthContext";
import { LoadingButton } from "@mui/lab";
import { Box, TextField, Typography, InputAdornment } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalFloristOutlinedIcon from "@mui/icons-material/LocalFloristOutlined";

/* ─── Design tokens ─────────────────────────────── */
const G = {
  primary: "#2E7D32",
  primaryLight: "#4CAF50",
  primaryPale: "#F1F8F1",
  accent: "#81C784",
  text: "#1A2B1A",
  sub: "#5A7A5A",
  border: "#C8E6C9",
  white: "#FFFFFF",
};

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: G.white,
    fontSize: "0.95rem",
    "& fieldset": { borderColor: G.border, borderWidth: "1.5px" },
    "&:hover fieldset": { borderColor: G.primaryLight },
    "&.Mui-focused fieldset": { borderColor: G.primary, borderWidth: "2px" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: G.primary },
  "& .MuiInputLabel-root": { color: G.sub, fontSize: "0.9rem" },
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      setLoading(true);
      const response = await requestOtp(email);
      const otp_id = response.otp_id;
      navigate("/verify-otp", {
        state: {
          otp_id,
          email: email,  
          from: location.state?.from,
          openMap: location.state?.openMap,
        },
      });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      width: "100%", 
      fontFamily: "'DM Sans', sans-serif",
      my: { xs: "100px"},  
      }}>

    {/* <Box
    sx={{
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    // justifyContent: { xs: "center", md: "center" },
    justifyContent: "center",
    fontFamily: "'DM Sans', sans-serif",
  }}
> */}

      {/* Brand badge */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "10px",
            background: `linear-gradient(135deg, ${G.primary}, ${G.primaryLight})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 4px 12px ${G.primaryLight}55`,
          }}
        >
          <LocalFloristOutlinedIcon sx={{ color: "#fff", fontSize: 18 }} />
        </Box>
        <Typography
          sx={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 700,
            fontSize: "1rem",
            color: G.primary,
            letterSpacing: "-0.01em",
          }}
        >
          SM Veg Mart
        </Typography>
      </Box>

      {/* Heading */}
      <Typography
        sx={{
          fontFamily: "'Fraunces', serif",
          fontSize: "1.65rem",
          fontWeight: 700,
          color: G.text,
          lineHeight: 1.2,
          mb: 0.75,
        }}
      >
        Welcome back 👋
      </Typography>
      <Typography sx={{ fontSize: "0.88rem", color: G.sub, mb: 3.5 }}>
        Enter your email and we'll send you a one-time code
      </Typography>

      {/* Divider line */}
      <Box
        sx={{
          height: "1.5px",
          background: `linear-gradient(to right, ${G.border}, transparent)`,
          mb: 3,
        }}
      />

      {/* Form */}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <TextField
          label="Email Address"
          type="email"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlinedIcon sx={{ color: G.sub, fontSize: 18 }} />
              </InputAdornment>
            ),
          }}
          sx={inputSx}
        />

        <LoadingButton
          type="submit"
          variant="contained"
          fullWidth
          loading={loading}
          sx={{
            mt: 0.5,
            py: 1.4,
            borderRadius: "12px",
            fontSize: "0.95rem",
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.02em",
            background: `linear-gradient(135deg, ${G.primary} 0%, ${G.primaryLight} 100%)`,
            boxShadow: `0 6px 20px ${G.primaryLight}55`,
            textTransform: "none",
            "&:hover": {
              background: `linear-gradient(135deg, #1B5E20 0%, ${G.primary} 100%)`,
              boxShadow: `0 8px 24px ${G.primaryLight}77`,
              transform: "translateY(-1px)",
            },
            transition: "all 0.2s ease",
          }}
        >
          Send OTP →
        </LoadingButton>
      </Box>

      {/* Footer note */}
      <Typography
        sx={{
          mt: 3.5,
          fontSize: "0.78rem",
          color: G.sub,
          textAlign: "center",
          lineHeight: 1.6,
        }}
      >
        By continuing, you agree to our{" "}
        <Box component="span" sx={{ color: G.primary, cursor: "pointer", fontWeight: 600 }}>
          Terms
        </Box>{" "}
        &{" "}
        <Box component="span" sx={{ color: G.primary, cursor: "pointer", fontWeight: 600 }}>
          Privacy Policy
        </Box>
      </Typography>

    </Box>
  );
};

export default Login;
