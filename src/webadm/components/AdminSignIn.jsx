import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/apiClient";
import { useEffect } from "react";

import logo from "../../assets/logo.png"


export default function AdminSignIn() {

  // console.log("sign_in")
  const navigate = useNavigate();
const adminPath = import.meta.env.VITE_ADMIN_PATH;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");




useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    navigate(`/${adminPath}/dashboard`);
  }
}, []);

  const handleSubmit = async (e) => {
  e.preventDefault();


    try {
    const response = await api.post("/adm/admin_email_verification", {
      email,
      password
    });

    console.log("API Response:", response.data); // ← இதை பாருங்க

    if (response.data.data.status === "success") {
      localStorage.setItem("token", response.data.data.token);
      console.log("Token saved:", localStorage.getItem("token")); // ← இதை பாருங்க
      console.log("Navigating to /admin/dashboard..."); // ← இதை பாருங்க
      navigate(`/${adminPath}/dashboard`);
      console.log("Navigate called"); // ← இது print ஆகுதா?
    }
  } catch (err) {
    console.log("Error:", err);
    setError("Login failed. Try again.");
  }

};
  const goToSignup = () => {
    navigate("/${adminPath}/signup");
  };

  return (
    <Container >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Paper elevation={0} sx={{ padding: 4, width: "30%" }}>
          
          <Box textAlign="center" mb={2}>
             <img
                                               src={logo}
                                               alt="orders not found"
                                               width={"50%"}
                                              //  height={"50%"}
                                               style={{
                                                 animation: "float 2s ease-in-out infinite"
                                               }}/>
            <Typography variant="h5" mt={1} fontWeight={600}>
              {/* Sign In */}Admin Login
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>

            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <Typography color="error" mt={1}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
            >
              Sign In
            </Button>

            <Typography
              textAlign="center"
              mt={2}
              sx={{ cursor: "pointer" }}
              onClick={goToSignup}
            >
              Don't have an account? Sign Up
            </Typography>

          </Box>

        </Paper>
      </Box>
    </Container>
  );
}