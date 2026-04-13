// SIGNUPPAGE.JSX
// ✅ All logic preserved — only JSX/styles redesigned

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { completeProfile } from "../api/AuthApi";
import { useAuth } from "../context/AuthContext";
import { LoadingButton } from "@mui/lab";
import { Box, TextField, Typography, InputAdornment } from "@mui/material";
import LocalFloristOutlinedIcon from "@mui/icons-material/LocalFloristOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";

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

const Signup = () => {
  const { user, login, accessToken } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", email: user?.email || "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.user_id) {
      alert("User not authenticated properly.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        user_id: user.user_id,
        username: formData.username,
        email: formData.email,
      };

      await completeProfile(payload);

      login(accessToken, {
        user_id: payload.user_id,
        name: payload.username,
        email: payload.email,
      });

      navigate("/");
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
       my: { xs: "50px"}, 
      //  minHeight: "90vh",
      //  display: "flex",
      //  flexDirection: "column",
      // //  justifyContent: { xs: "center", md: "center" },
      // justifyContent: "center",
       }}>

      {/* Brand badge */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <Box
          sx={{
            width: 36, height: 36, borderRadius: "10px",
            background: `linear-gradient(135deg, ${G.primary}, ${G.primaryLight})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 4px 12px ${G.primaryLight}55`,
          }}
        >
          <LocalFloristOutlinedIcon sx={{ color: "#fff", fontSize: 18 }} />
        </Box>
        <Typography sx={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "1rem", color: G.primary }}>
          SM Veg Mart
        </Typography>
      </Box>

      {/* Spark icon illustration */}
      <Box
        sx={{
          width: 60, height: 60, borderRadius: "18px",
          background: G.primaryPale,
          border: `2px solid ${G.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          mb: 2.5,
        }}
      >
        <AutoAwesomeOutlinedIcon sx={{ color: G.primary, fontSize: 28 }} />
      </Box>

      <Typography
        sx={{ fontFamily: "'Fraunces', serif", fontSize: "1.65rem", fontWeight: 700, color: G.text, lineHeight: 1.2, mb: 0.75 }}
      >
        You're almost in ✨
      </Typography>
      <Typography sx={{ fontSize: "0.88rem", color: G.sub, mb: 3.5 }}>
        Tell us a little about yourself to complete your account
      </Typography>

      <Box sx={{ height: "1.5px", background: `linear-gradient(to right, ${G.border}, transparent)`, mb: 3 }} />

      {/* Form */}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <TextField
          label="Username"
          name="username"
          fullWidth
          required
          value={formData.username}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineOutlinedIcon sx={{ color: G.sub, fontSize: 18 }} />
              </InputAdornment>
            ),
          }}
          sx={inputSx}
        />

        <TextField
          label="Email Address"
          name="email"
          type="email"
          fullWidth
          required
          value={formData.email}
          onChange={handleChange}
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlinedIcon sx={{ color: G.sub, fontSize: 18 }} />
              </InputAdornment>
            ),
          }}
          sx={{inputSx,
          "& .MuiOutlinedInput-root": {
          ...inputSx["& .MuiOutlinedInput-root"],
          backgroundColor: G.primaryPale,
          cursor: "not-allowed",
    },

          }}
        />

        {/* Green trust strip */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.2,
            px: 2,
            py: 1.4,
            borderRadius: "10px",
            background: G.primaryPale,
            border: `1px solid ${G.border}`,
          }}
        >
          <Box sx={{ fontSize: "1.1rem" }}>🥦</Box>
          <Typography sx={{ fontSize: "0.78rem", color: G.sub, lineHeight: 1.5 }}>
            Fresh groceries, delivered daily. Your data stays private &amp; secure.
          </Typography>
        </Box>

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
          Complete Signup →
        </LoadingButton>
      </Box>

      {/* Footer */}
      <Typography sx={{ mt: 3.5, fontSize: "0.78rem", color: G.sub, textAlign: "center" }}>
        By signing up you agree to our{" "}
        <Box component="span" sx={{ color: G.primary, cursor: "pointer", fontWeight: 600 }}>Terms</Box>
        {" "}&amp;{" "}
        <Box component="span" sx={{ color: G.primary, cursor: "pointer", fontWeight: 600 }}>Privacy Policy</Box>
      </Typography>

    </Box>
  );
};

export default Signup;
