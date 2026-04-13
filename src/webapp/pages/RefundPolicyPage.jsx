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

// const RefundPolicy = () => {
//   return (
//     <>

//     <AccountNavbar/>

//     <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>

//       <Typography variant="h4" fontWeight={700} gutterBottom>
//         Refund and Cancellation Policy
//       </Typography>

//       <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
//         Last updated: March 2026
//       </Typography>

//       <Section title="Cancellation Policy">
//         Orders can be cancelled only before admin confirmation. Once confirmed, cancellation is not allowed due to immediate processing.
//       </Section>

//       <Section title="Return Policy">
//         Returns are accepted only for damaged, expired, or incorrect items. Customers must check items at delivery time.
//       </Section>

//       <Section title="Refund Policy">
//         Eligible refunds will be initiated automatically and credited to the original payment method.
//       </Section>

//       <Section title="Refund Timeline">
//         Refunds typically take 5–7 working days depending on your bank.
//       </Section>

//       <Section title="Non-Refundable Cases">
//         No refund will be provided if delivery fails due to incorrect address or customer unavailability.
//       </Section>

//     </Container>
//     </>
//   );
// };

// export default RefundPolicy;









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

const RefundPolicy = () => {
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
            Refund and Cancellation Policy
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

            <Section title="Cancellation Policy">
              Orders can be cancelled only before admin confirmation. Once confirmed, cancellation is not allowed due to immediate processing.
            </Section>

            <Section title="Return Policy">
              Returns are accepted only for damaged, expired, or incorrect items. Customers must check items at delivery time.
            </Section>

            <Section title="Refund Policy">
              Eligible refunds will be initiated automatically and credited to the original payment method.
            </Section>

            <Section title="Refund Timeline">
              Refunds typically take 5–7 working days depending on your bank.
            </Section>

            <Section title="Non-Refundable Cases">
              No refund will be provided if delivery fails due to incorrect address or customer unavailability.
            </Section>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default RefundPolicy;