// // VERIFYOTPPAGE.JSX

// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { verifyOtp } from "../api/AuthApi";
// import { useAuth } from "../context/AuthContext";

// import {
//   Box,
//   Container,
//   Paper,
//   Typography,
//   TextField,
//   Slide,
// } from "@mui/material";
// import { LoadingButton } from "@mui/lab";

// const VerifyOtp = () => {
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const navigate = useNavigate();
//   const location = useLocation();
//   const { login } = useAuth();

//   const otp_id = location.state?.otp_id;

//   useEffect(() => {
//     if (!otp_id) {
//       navigate("/login");
//     }
//   }, [otp_id, navigate]);


//   const handleVerify = async (e) => {
//   e.preventDefault();
//   if (!otp) return;

//   try {
//     setLoading(true);
//     setErrorMessage("");

//     const response = await verifyOtp(otp, otp_id);
//     console.log("VERIFY OTP PAGE RESPONSE", response)

//     // ❌ Wrong OTP
//     if (response.verify === false) {
//       setErrorMessage(response.message || "Invalid OTP.");
//       return;
//     }

//     // ✅ Success
//     if (!response.token || !response.user) {
//       setErrorMessage("Authentication failed. Please try again.");
//       return;
//     }

//     login(response.token, response.user);

//     // if (response.is_new_user) {
//     //   navigate("/signup");
//     // } else {
//     //   // redirect to the same page after authentication
//     //   const redirectPath = location.state?.from || "/";
//     //   navigate(redirectPath);
//     // }
// if (response.is_new_user) {
//   navigate("/signup", { 
//     state: { openMap: location.state?.openMap } // 👈 forward for new users too
//   });
// } else {
//   const redirectPath = location.state?.from?.pathname || "/";
//   navigate(redirectPath, { 
//     state: { openMap: location.state?.openMap } // 👈 this is what Navbar reads
//   });
// }

//   } catch (error) {
//     setErrorMessage(error.message || "Something went wrong.");
//   } finally {
//     setLoading(false);
//   }
// };
  

//   // return (
//   //   <Container maxWidth="sm">
//   //     <Box
//   //       minHeight="100vh"
//   //       display="flex"
//   //       alignItems="center"
//   //       justifyContent="center"
//   //     >
//   //       <Slide direction="right" in timeout={500}>
//   //         <Paper
//   //           elevation={6}
//   //           sx={{
//   //             p: 4,
//   //             width: "100%",
//   //             borderRadius: 3,
//   //           }}
//   //         >
//   //           <Typography variant="h5" fontWeight="bold" gutterBottom>
//   //             Verify OTP
//   //           </Typography>

//   //           <Box component="form" onSubmit={handleVerify}>
//   //             <TextField
//   //               label="Enter OTP"
//   //               fullWidth
//   //               required
//   //               margin="normal"
//   //               value={otp}
//   //               onChange={(e) => {
//   //                 setOtp(e.target.value);
//   //                 setErrorMessage(""); // clear error when typing
//   //               }}
//   //               error={Boolean(errorMessage)}
//   //               helperText={errorMessage}
//   //             />

//   //             <LoadingButton
//   //               type="submit"
//   //               variant="contained"
//   //               fullWidth
//   //               loading={loading}
//   //               sx={{ mt: 2 }}
//   //             >
//   //               Verify OTP
//   //             </LoadingButton>
//   //           </Box>
//   //         </Paper>
//   //       </Slide>
//   //     </Box>
//   //   </Container>
//   // );

//   return (
//   <Box sx={{ width: "100%" }}>
    
//     <Typography variant="h5" fontWeight="bold" mb={1}>
//       Verify OTP
//     </Typography>

//     <Typography variant="body2" color="text.secondary" mb={3}>
//       Enter the 6-digit code sent to your email
//     </Typography>

//     <Box component="form" onSubmit={handleVerify}>
      
//       <TextField
//         label="OTP"
//         fullWidth
//         required
//         margin="normal"
//         value={otp}
//         onChange={(e) => {
//           setOtp(e.target.value);
//           setErrorMessage("");
//         }}
//         error={Boolean(errorMessage)}
//         helperText={errorMessage}
//         inputProps={{
//           maxLength: 6,
//           style: {
//             letterSpacing: "0.5em",
//             textAlign: "center",
//             fontSize: "1.2rem",
//           },
//         }}
//       />

//       <LoadingButton
//         type="submit"
//         variant="contained"
//         fullWidth
//         loading={loading}
//         sx={{
//           mt: 2,
//           borderRadius: 2,
//           py: 1.2,
//         }}
//       >
//         Verify OTP
//       </LoadingButton>

//       {/* subtle resend hint */}
//       <Typography
//         variant="caption"
//         display="block"
//         textAlign="center"
//         mt={2}
//         color="text.secondary"
//       >
//         Didn’t receive the code? Try again in a few seconds
//       </Typography>

//     </Box>
//   </Box>
// );


// };

// export default VerifyOtp;










// VERIFYOTPPAGE.JSX
// ✅ All logic preserved — only JSX/styles redesigned

import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOtp } from "../api/AuthApi";
import { useAuth } from "../context/AuthContext";
import { LoadingButton } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import LocalFloristOutlinedIcon from "@mui/icons-material/LocalFloristOutlined";
import { requestOtp } from "../api/AuthApi";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

/* ─── Design tokens ─────────────────────────────── */
const G = {
  primary: "#2E7D32",
  primaryLight: "#4CAF50",
  primaryPale: "#F1F8F1",
  accent: "#81C784",
  text: "#1A2B1A",
  sub: "#5A7A5A",
  border: "#C8E6C9",
  error: "#C62828",
  errorPale: "#FFEBEE",
  white: "#FFFFFF",
};

const OTP_LENGTH = 6;

const VerifyOtp = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [shake, setShake] = useState(false);
  const [otpId, setOtpId] = useState(location.state?.otp_id);
  const email = location.state?.email;
  const inputRefs = useRef([]);


  // const otp_id = location.state?.otp_id;

  useEffect(() => {
    if (!otpId || !email) navigate("/login");
  }, [otpId, email, navigate]);

  /* focus first box on mount */
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (digits[idx]) {
        const next = [...digits];
        next[idx] = "";
        setDigits(next);
      } else if (idx > 0) {
        inputRefs.current[idx - 1]?.focus();
      }
    }
  };

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[idx] = val;
    setDigits(next);
    setErrorMessage("");
    if (val && idx < OTP_LENGTH - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    const next = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((c, i) => (next[i] = c));
    setDigits(next);
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const otp = digits.join("");

  const handleVerify = async (e) => {
    e?.preventDefault();
    if (otp.length < OTP_LENGTH) return;

    try {
      setLoading(true);
      setErrorMessage("");

      const response = await verifyOtp(otp, otpId);

      if (response.verify === false) {
        setErrorMessage(response.message || "Invalid OTP. Please try again.");
        setShake(true);
        setTimeout(() => setShake(false), 600);
        return;
      }

      if (!response.token || !response.user) {
        setErrorMessage("Authentication failed. Please try again.");
        return;
      }

      login(response.token, response.user);

      if (response.is_new_user) {
        navigate("/signup", { state: { openMap: location.state?.openMap } });
      } else {
        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath, { state: { openMap: location.state?.openMap } });
      }
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };


  const handleResendOtp = async () => {
  try {
    if (!email) {
      setErrorMessage("Session expired. Please login again.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    const response = await requestOtp(email);

    // 🔥 CRITICAL: update otp_id
    if (response?.otp_id) {
      setOtpId(response.otp_id);
    }

  } catch (error) {
    setErrorMessage("Failed to resend OTP. Try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <Box sx={{ 
      width: "100%", 
      fontFamily: "'DM Sans', sans-serif",
      my: { xs: "100px"},
      // minHeight: "100vh",
      // display: "flex",
      // flexDirection: "column",
      // // justifyContent: { xs: "center", md: "center" },
      // justifyContent: "center", 
      }}>

      {/* Brand badge */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3}}>
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

      {/* Lock icon illustration */}
      {/* <Box
        sx={{
          width: 60, height: 60, borderRadius: "18px",
          background: G.primaryPale,
          border: `2px solid ${G.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          mb: 2.5,
        }}
      >
        <LockOutlinedIcon sx={{ color: G.primary, fontSize: 28 }} />
      </Box> */}

      <Typography
        sx={{ fontFamily: "'Fraunces', serif", fontSize: "1.65rem", fontWeight: 700, color: G.text, lineHeight: 1.2, mb: 0.75 }}
      >
        Check your inbox
      </Typography>
      <Typography sx={{ fontSize: "0.88rem", color: G.sub, mb: 3.5 }}>
        We've sent a 6-digit code to your email. It expires in 5 minutes.
      </Typography>

      <Box sx={{ height: "1.5px", background: `linear-gradient(to right, ${G.border}, transparent)`, mb: 3 }} />

      {/* OTP Boxes */}
      <Box
        component="form"
        onSubmit={handleVerify}
        sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1.2,
            mb: errorMessage ? 1.5 : 3,
            animation: shake ? "shake 0.5s ease" : "none",
            "@keyframes shake": {
              "0%, 100%": { transform: "translateX(0)" },
              "20%": { transform: "translateX(-8px)" },
              "40%": { transform: "translateX(8px)" },
              "60%": { transform: "translateX(-6px)" },
              "80%": { transform: "translateX(6px)" },
            },
          }}
        >
          {digits.map((d, idx) => (
            <Box
              key={idx}
              component="input"
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              ref={(el) => (inputRefs.current[idx] = el)}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onPaste={handlePaste}
              sx={{
                width: 46,
                height: 56,
                borderRadius: "12px",
                border: `2px solid ${errorMessage ? G.error : d ? G.primary : G.border}`,
                background: errorMessage ? G.errorPale : d ? G.primaryPale : G.white,
                fontSize: "1.5rem",
                fontWeight: 700,
                textAlign: "center",
                color: errorMessage ? G.error : G.text,
                outline: "none",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.18s ease",
                cursor: "text",
                caretColor: G.primary,
                "&:focus": {
                  border: `2px solid ${errorMessage ? G.error : G.primary}`,
                  background: errorMessage ? G.errorPale : G.primaryPale,
                  boxShadow: `0 0 0 3px ${errorMessage ? G.error : G.primaryLight}22`,
                },
              }}
            />
          ))}
        </Box>

        {/* Error message */}
        {errorMessage && (
          <Typography
            sx={{
              fontSize: "0.82rem",
              color: G.error,
              mb: 2.5,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            ✕ {errorMessage}
          </Typography>
        )}

        <LoadingButton
          type="submit"
          variant="contained"
          fullWidth
          loading={loading}
          disabled={otp.length < OTP_LENGTH}
          sx={{
            py: 1.4,
            borderRadius: "12px",
            fontSize: "0.95rem",
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.02em",
            background: `linear-gradient(135deg, ${G.primary} 0%, ${G.primaryLight} 100%)`,
            boxShadow: `0 6px 20px ${G.primaryLight}55`,
            textTransform: "none",
            "&:not(:disabled):hover": {
              background: `linear-gradient(135deg, #1B5E20 0%, ${G.primary} 100%)`,
              boxShadow: `0 8px 24px ${G.primaryLight}77`,
              transform: "translateY(-1px)",
            },
            "&:disabled": {
              background: "#E0E0E0",
              color: "#9E9E9E",
              boxShadow: "none",
            },
            transition: "all 0.2s ease",
          }}
        >
          Verify & Continue →
        </LoadingButton>

        {/* Resend */}
        <Typography sx={{ mt: 3, fontSize: "0.82rem", color: G.sub, textAlign: "center" }}>
          Didn't receive the code?{" "}
          <Box
            component="span"
            // onClick={() => navigate("/login")}
            onClick={handleResendOtp}
            sx={{
              color: G.primary, fontWeight: 600, cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Resend OTP
          </Box>
        </Typography>
      </Box>

    </Box>
  );
};

export default VerifyOtp;
