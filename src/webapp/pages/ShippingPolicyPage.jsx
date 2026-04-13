// import { Box, Container, Typography } from "@mui/material";
// import AccountNavbar from "../components/account/AccountNavbar";

// const Section = ({ title, children }) => (
//   <Box sx={{ mb: 4 }}>
//     <Typography variant="h6" fontWeight={600} gutterBottom>
//       {title}
//     </Typography>
//     <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
//       {children}
//     </Typography>
//   </Box>
// );

// const ShippingPolicy = () => {
//   return (
//     <>
//     <AccountNavbar/>

//     <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>

//       <Typography variant="h4" fontWeight={700} gutterBottom>
//         Shipping Policy
//       </Typography>

//       <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
//         Last updated: March 2026
//       </Typography>

//       <Section title="Delivery Area">
//         We currently deliver only within a 3km radius of our store in Chennai.
//       </Section>

//       <Section title="Delivery Time">
//         Orders are typically delivered within 1 to 2 hours after confirmation.
//       </Section>

//       <Section title="Maximum Delivery Time">
//         We aim to deliver within 1 hour from dispatch, depending on external conditions.
//       </Section>

//       <Section title="Shipping Charges">
//         Delivery charges (if applicable) will be shown during checkout before payment.
//       </Section>

//       <Section title="Order Tracking">
//         Real-time tracking updates are provided via SMS, WhatsApp, or app notifications.
//       </Section>

//       <Section title="Failed Delivery">
//         If delivery fails due to incorrect address or customer unavailability, the order will not be refunded.
//       </Section>

//     </Container>
//     </>
//   );
// };

// export default ShippingPolicy;









import { Box, Container, Typography } from "@mui/material";
import AccountNavbar from "../components/account/AccountNavbar";

const Section = ({ title, children }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h6" fontWeight={600} gutterBottom>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
      {children}
    </Typography>
  </Box>
);

const ShippingPolicy = () => {
  return (
    <>
      <AccountNavbar />

      <Box sx={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>

        {/* HEADER */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #4CAF50, #81C784)",
            color: "#fff",
            py: { xs: 5, md: 6 },
            textAlign: "center"
          }}
        >
          <Typography variant="h4" fontWeight={700}>
            Shipping Policy
          </Typography>
        </Box>

        {/* CONTENT */}
        <Container maxWidth="md" sx={{ mt: -4, mb: 6 }}>
          <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: 3,
              px: { xs: 3, md: 5 },
              py: { xs: 4, md: 6 },
              boxShadow: "0 10px 40px rgba(0,0,0,0.08)"
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Last updated: March 2026
            </Typography>

            <Section title="Delivery Area">
              We currently deliver only within a 3km radius of our store in Puducherry.
            </Section>

            <Section title="Delivery Time">
              Orders are typically delivered within 40 minutes after confirmation.
            </Section>

            <Section title="Maximum Delivery Time">
              We aim to deliver within 1 hour from dispatch, depending on external conditions.
            </Section>

            <Section title="Shipping Charges">
              Delivery charges (if applicable) will be shown during checkout before payment.
            </Section>

            <Section title="Order Tracking">
              Real-time tracking updates are provided via SMS, WhatsApp, or app notifications.
            </Section>

            <Section title="Failed Delivery">
              If delivery fails due to incorrect address or customer unavailability, the order will not be refunded.
            </Section>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ShippingPolicy;