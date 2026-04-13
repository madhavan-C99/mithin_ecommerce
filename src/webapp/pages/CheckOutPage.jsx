  // // pages/CheckoutPage.jsx
  // // Changes from your version:
  // //   1. Passes userId and addressId down to PaymentFooter
  // //   2. addressId is extracted from the fetched default address
  // //   3. Everything else is identical to your current code

  // import { useEffect, useState } from "react";
  // import { Box, CircularProgress, Typography, Grid } from "@mui/material";
  // import { useNavigate } from "react-router-dom";

  // import AddressSection from "../components/checkout/AddressSection";
  // import DeliverySlot from "../components/checkout/DeliverySlot";
  // import BillSummary from "../components/checkout/BillSummary";
  // import PaymentFooter from "../components/checkout/PaymentFooter";
  // import AccountNavbar from "../components/account/AccountNavbar";
  // import { fetchDefaultAddress, fetchOrderSummary } from "../api/AllApi";

  // const CheckoutPage = () => {
  //   const userData = JSON.parse(localStorage.getItem("user"));
  //   const userId = userData?.user_id;
  //   const navigate = useNavigate();

  //   const [address, setAddress] = useState(null);
  //   const [summary, setSummary] = useState(null);
  //   const [loading, setLoading] = useState(true);

  //   const loadData = async (signal) => {
  //     try {
  //       setLoading(true);
  //       const [addrRes, summaryRes] = await Promise.all([
  //         fetchDefaultAddress(userId, signal),
  //         fetchOrderSummary(userId, signal),
  //       ]);
  //       setAddress(addrRes);
  //       setSummary(summaryRes);
  //     } catch (err) {
  //       if (err?.name !== "AbortError") console.error("Checkout load failed", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   useEffect(() => {
  //     const controller = new AbortController();
  //     loadData(controller.signal);
  //     return () => controller.abort();
  //   }, []);

  //   if (loading) {
  //     return (
  //       <Box sx={{ minHeight: "100vh", backgroundColor: "#eef2ee" }}>
  //         <AccountNavbar />
  //         <Box
  //           sx={{
  //             display: "flex",
  //             justifyContent: "center",
  //             alignItems: "center",
  //             height: "70vh",
  //           }}
  //         >
  //           <CircularProgress sx={{ color: "#2e7d32" }} />
  //         </Box>
  //       </Box>
  //     );
  //   }

  //   // ── Extract address_id from the fetched default address ──
  //   // Adjust the key name if your API returns a different field name
  //   // e.g. addrRes.address_id  OR  addrRes.id  OR  addrRes.data?.address_id
  //   const addressId = address?.address_id ?? address?.id ?? null;

  //   return (
  //     <Box
  //       sx={{
  //         minHeight: "100vh",
  //         backgroundColor: "#eef2ee",
  //         backgroundImage: "radial-gradient(circle, #c8d8c8 1px, transparent 1px)",
  //         backgroundSize: "28px 28px",
  //       }}
  //     >
  //       <AccountNavbar />

  //       <Box
  //         sx={{
  //           maxWidth: 900,
  //           mx: "auto",
  //           px: { xs: 1.5, sm: 3, md: 4 },
  //           pt: { xs: 2.5, md: 3.5 },
  //           pb: { xs: 5, md: 6 },
  //         }}
  //       >
  //         {/* Page heading */}
  //         <Box
  //           sx={{
  //             display: "flex",
  //             alignItems: "center",
  //             gap: 1.5,
  //             mb: { xs: 2.5, md: 3.5 },
  //             animation: "ckFadeDown 0.35s ease both",
  //             "@keyframes ckFadeDown": {
  //               from: { opacity: 0, transform: "translateY(-12px)" },
  //               to: { opacity: 1, transform: "translateY(0)" },
  //             },
  //           }}
  //         >
  //           <Box>
  //             <Typography
  //               sx={{
  //                 fontWeight: 800,
  //                 fontSize: { xs: 20, md: 23 },
  //                 color: "#1a2e1a",
  //                 letterSpacing: "-0.4px",
  //                 lineHeight: 1.1,
  //               }}
  //             >
  //               Checkout
  //             </Typography>
  //             <Typography fontSize={12} color="#6a8a6a" sx={{ mt: 0.2 }}>
  //               Review your order before paying
  //             </Typography>
  //           </Box>
  //         </Box>

  //         {/* Two-column grid */}
  //         <Grid
  //           container
  //           spacing={{ xs: 1.5, md: 2.5 }}
  //           alignItems="flex-start"
  //           justifyContent="center"
  //         >
  //           {/* LEFT COLUMN */}
  //           <Grid
  //             item
  //             xs={12}
  //             md={7}
  //             sx={{
  //               animation: "ckFadeUp 0.4s ease 0.05s both",
  //               "@keyframes ckFadeUp": {
  //                 from: { opacity: 0, transform: "translateY(18px)" },
  //                 to: { opacity: 1, transform: "translateY(0)" },
  //               },
  //             }}
  //           >
  //             <AddressSection address={address} refresh={loadData} />
  //             <DeliverySlot />

  //             {/* PaymentFooter — desktop only in left column */}
  //             <Box
  //               sx={{
  //                 animation: "ckFadeUp 0.4s ease 0.25s both",
  //                 display: { xs: "none", md: "block" },
  //               }}
  //             >
  //               <PaymentFooter
  //                 total={summary?.overall_total}
  //                 userId={userId}
  //                 addressId={addressId}
  //               />
  //             </Box>
  //           </Grid>

  //           {/* RIGHT COLUMN — Bill Summary */}
  //           <Grid
  //             item
  //             xs={12}
  //             md={5}
  //             sx={{ animation: "ckFadeUp 0.4s ease 0.15s both" }}
  //           >
  //             <BillSummary summary={summary} />
  //           </Grid>

  //           {/* PaymentFooter — mobile only, full width below BillSummary */}
  //           <Grid
  //             item
  //             xs={12}
  //             sx={{
  //               display: { xs: "block", md: "none" },
  //               animation: "ckFadeUp 0.4s ease 0.3s both",
  //             }}
  //           >
  //             <PaymentFooter
  //               total={summary?.overall_total}
  //               userId={userId}
  //               addressId={addressId}
  //             />
  //           </Grid>
  //         </Grid>
  //       </Box>
  //     </Box>
  //   );
  // };

  // export default CheckoutPage;










  // pages/CheckoutPage.jsx

  import { useEffect, useState } from "react";
  import { Box, CircularProgress, Typography, Grid } from "@mui/material";
  import { useNavigate } from "react-router-dom";

  import AddressSection from "../components/checkout/AddressSection";
  import DeliverySlot from "../components/checkout/DeliverySlot";
  import BillSummary from "../components/checkout/BillSummary";
  import PaymentFooter from "../components/checkout/PaymentFooter";
  import AccountNavbar from "../components/account/AccountNavbar";
  import { fetchDefaultAddress, fetchOrderSummary } from "../api/AllApi";

  const CheckoutPage = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData?.user_id;
    const navigate = useNavigate();

    const [address, setAddress] = useState(null);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    // ─────────────────────────────────────────────────────────────
    // FIX 1: Split into two independent fetches.
    // Earlier code used Promise.all — if fetchDefaultAddress failed
    // (because no default address exists), the catch block ran and
    // setSummary was never called, so BillSummary received null and
    // showed "Your cart is empty" even though the cart had items.
    // Now each fetch has its own try/catch, so summary always loads.
    // ─────────────────────────────────────────────────────────────
    const loadData = async (signal) => {
      setLoading(true);

      // Address fetch — allowed to fail independently
      try {
        const addrRes = await fetchDefaultAddress(userId, signal);
        setAddress(addrRes);
      } catch (err) {
        if (err?.name !== "AbortError") {
          console.error("Address fetch failed", err);
        }
        setAddress(null); // No address — that's fine, page still loads
      }

      // Summary fetch — independent, always runs
      try {
        const summaryRes = await fetchOrderSummary(userId, signal);
        setSummary(summaryRes);
      } catch (err) {
        if (err?.name !== "AbortError") {
          console.error("Summary fetch failed", err);
        }
      }

      setLoading(false);
    };

    useEffect(() => {
      const controller = new AbortController();
      loadData(controller.signal);
      return () => controller.abort();
    }, []);

    if (loading) {
      return (
        <Box sx={{ minHeight: "100vh", backgroundColor: "#eef2ee" }}>
          <AccountNavbar />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh",
            }}
          >
            <CircularProgress sx={{ color: "#2e7d32" }} />
          </Box>
        </Box>
      );
    }

    const addressId = address?.address_id ?? address?.id ?? null;

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
            maxWidth: 900,
            mx: "auto",
            px: { xs: 1.5, sm: 3, md: 4 },
            pt: { xs: 2.5, md: 3.5 },
            pb: { xs: 5, md: 6 },
          }}
        >
          {/* Page heading */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: { xs: 2.5, md: 3.5 },
              animation: "ckFadeDown 0.35s ease both",
              "@keyframes ckFadeDown": {
                from: { opacity: 0, transform: "translateY(-12px)" },
                to: { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: 20, md: 23 },
                  color: "#1a2e1a",
                  letterSpacing: "-0.4px",
                  lineHeight: 1.1,
                }}
              >
                Checkout
              </Typography>
              <Typography fontSize={12} color="#6a8a6a" sx={{ mt: 0.2 }}>
                Review your order before paying
              </Typography>
            </Box>
          </Box>

          {/* Two-column grid */}
          <Grid
            container
            spacing={{ xs: 1.5, md: 2.5 }}
            alignItems="flex-start"
            justifyContent="center"
          >
            {/* LEFT COLUMN */}
            <Grid
              item
              xs={12}
              md={7}
              sx={{
                animation: "ckFadeUp 0.4s ease 0.05s both",
                "@keyframes ckFadeUp": {
                  from: { opacity: 0, transform: "translateY(18px)" },
                  to: { opacity: 1, transform: "translateY(0)" },
                },
              }}
            >
              <AddressSection address={address} refresh={loadData} />
              <DeliverySlot />

              {/* PaymentFooter — desktop only */}
              <Box
                sx={{
                  animation: "ckFadeUp 0.4s ease 0.25s both",
                  display: { xs: "none", md: "block" },
                }}
              >
                <PaymentFooter
                  total={summary?.overall_total}
                  userId={userId}
                  addressId={addressId}
                />
              </Box>
            </Grid>

            {/* RIGHT COLUMN — Bill Summary */}
            <Grid
              item
              xs={12}
              md={5}
              sx={{ animation: "ckFadeUp 0.4s ease 0.15s both" }}
            >
              <BillSummary summary={summary} />
            </Grid>

            {/* PaymentFooter — mobile only */}
            <Grid
              item
              xs={12}
              sx={{
                display: { xs: "block", md: "none" },
                animation: "ckFadeUp 0.4s ease 0.3s both",
              }}
            >
              <PaymentFooter
                total={summary?.overall_total}
                userId={userId}
                addressId={addressId}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  };

  export default CheckoutPage;