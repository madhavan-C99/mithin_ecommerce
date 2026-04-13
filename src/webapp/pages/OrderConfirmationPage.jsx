// pages/OrderConfirmationPage.jsx
// Shown after successful Razorpay payment + verification
// Receives: order_number, order_id, total_amount, payment_id via React Router state

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Divider } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import AccountNavbar from "../components/account/AccountNavbar";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Data passed from PaymentFooter after successful payment
  const {
    order_number,
    order_id,
    total_amount,
    payment_id,
  } = location.state || {};

  // Guard: if someone lands here directly without state, redirect to home
  useEffect(() => {
    if (!order_number) {
      navigate("/", { replace: true });
    }
  }, [order_number, navigate]);

  if (!order_number) return null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#eef2ee",
        backgroundImage: "radial-gradient(circle, #c8d8c8 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <AccountNavbar />

      <Box
        sx={{
          maxWidth: 520,
          mx: "auto",
          px: { xs: 2, sm: 3 },
          pt: { xs: 4, md: 6 },
          pb: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* ── Success card ── */}
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#fff",
            borderRadius: "20px",
            border: "1px solid #d4e8d4",
            boxShadow: "0 4px 32px rgba(46,125,50,0.10)",
            overflow: "hidden",
            animation: "cfFadeUp 0.45s ease both",
            "@keyframes cfFadeUp": {
              from: { opacity: 0, transform: "translateY(22px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          {/* Green top strip */}
          <Box
            sx={{
              height: 5,
              background: "linear-gradient(90deg, #1b5e20, #4CAF50, #81c784)",
            }}
          />

          <Box sx={{ px: { xs: 2.5, sm: 3.5 }, pt: 4, pb: 3.5 }}>
            {/* Animated check icon */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 2.5,
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  backgroundColor: "#e8f5e9",
                  border: "2.5px solid #a5d6a7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  animation: "cfPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.15s both",
                  "@keyframes cfPop": {
                    from: { opacity: 0, transform: "scale(0.5)" },
                    to: { opacity: 1, transform: "scale(1)" },
                  },
                }}
              >
                <CheckCircleOutlineIcon
                  sx={{ fontSize: 44, color: "#2e7d32" }}
                />
              </Box>
            </Box>

            {/* Heading */}
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: 800,
                fontSize: { xs: 21, sm: 24 },
                color: "#1a2e1a",
                letterSpacing: "-0.4px",
                lineHeight: 1.2,
                mb: 0.6,
              }}
            >
              Order Placed!
            </Typography>

            {/* <Typography
              sx={{
                textAlign: "center",
                fontSize: 18,
                color: "#6a8a6a",
                fontWeight: 800,
                mb: 3,
              }}
            >
              This is Test mode. This is not your real amount (Testing payment)
            </Typography> */}
            
            <Typography
              sx={{
                textAlign: "center",
                fontSize: 13.5,
                color: "#6a8a6a",
                mb: 3,
              }}
            >
              Your payment was successful. We're preparing your order.
            </Typography>

            <Divider sx={{ borderColor: "#e8f0e8", mb: 2.5 }} />

            {/* Order details */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.6 }}>
              {/* Order number */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  backgroundColor: "#f0f8f0",
                  borderRadius: "12px",
                  border: "1px solid #c8e6c9",
                  px: 2,
                  py: 1.4,
                }}
              >
                <ReceiptLongOutlinedIcon
                  sx={{ fontSize: 20, color: "#2e7d32", flexShrink: 0 }}
                />
                <Box>
                  <Typography fontSize={11} color="#8a9e8a" fontWeight={500}>
                    Order Number
                  </Typography>
                  <Typography
                    fontSize={15}
                    fontWeight={800}
                    color="#1b5e20"
                    letterSpacing={0.5}
                  >
                    {order_number}
                  </Typography>
                </Box>
              </Box>

              {/* Amount paid */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 0.5,
                }}
              >
                <Typography fontSize={13} color="#6a8a6a">
                  Amount paid
                </Typography>
                <Typography fontSize={14.5} fontWeight={700} color="#1a2e1a">
                  ₹ {total_amount}
                </Typography>
              </Box>

              {/* Payment ID */}
              {payment_id && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 0.5,
                  }}
                >
                  <Typography fontSize={13} color="#6a8a6a">
                    Payment ID
                  </Typography>
                  <Typography
                    fontSize={11.5}
                    fontWeight={600}
                    color="#555"
                    sx={{
                      maxWidth: 180,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {payment_id}
                  </Typography>
                </Box>
              )}
            </Box>

            <Divider sx={{ borderColor: "#e8f0e8", mt: 2.5, mb: 3 }} />

            {/* CTA buttons */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {/* Track Order — primary */}
              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={<LocalShippingOutlinedIcon />}
                onClick={() =>
                  navigate("/order-tracking", {
                    state: { order_id, order_number },
                  })
                }
                sx={{
                  background:
                    "linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #43a047 100%)",
                  fontWeight: 800,
                  fontSize: 15,
                  textTransform: "none",
                  py: 1.6,
                  borderRadius: "12px",
                  letterSpacing: 0.2,
                  boxShadow: "0 6px 20px rgba(46,125,50,0.35)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #163d18 0%, #255b27 50%, #388e3c 100%)",
                    boxShadow: "0 8px 26px rgba(46,125,50,0.45)",
                    transform: "translateY(-1px)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                Track Your Order
              </Button>

              {/* Continue shopping — secondary */}
              <Button
                variant="outlined"
                fullWidth
                size="large"
                onClick={() => navigate("/")}
                sx={{
                  borderColor: "#c8e6c9",
                  color: "#2e7d32",
                  fontWeight: 700,
                  fontSize: 14.5,
                  textTransform: "none",
                  py: 1.5,
                  borderRadius: "12px",
                  "&:hover": {
                    borderColor: "#2e7d32",
                    backgroundColor: "#f0f8f0",
                  },
                  transition: "all 0.18s ease",
                }}
              >
                Continue Shopping
              </Button>
            </Box>
          </Box>
        </Box>

        {/* ── Estimated delivery note ── */}
        <Box
          sx={{
            mt: 2.5,
            display: "flex",
            alignItems: "center",
            gap: 1,
            animation: "cfFadeUp 0.4s ease 0.25s both",
          }}
        >
          <LocalShippingOutlinedIcon sx={{ fontSize: 16, color: "#6a8a6a" }} />
          <Typography fontSize={12.5} color="#6a8a6a">
            Estimated delivery: <strong style={{ color: "#2e7d32" }}> 50 minutes</strong>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderConfirmationPage;