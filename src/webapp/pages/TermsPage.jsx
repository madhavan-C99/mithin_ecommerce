// // import { Box, Container, Typography } from "@mui/material";
// // import AccountNavbar from "../components/account/AccountNavbar";

// // const Section = ({ title, children }) => (
// //   <Box sx={{ mb: 4 }}>
// //     <Typography variant="h6" fontWeight={600} gutterBottom>
// //       {title}
// //     </Typography>
// //     <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
// //       {children}
// //     </Typography>
// //   </Box>
// // );

// // const TermsPage = () => {
// //   return (
// //     <>

// //     <AccountNavbar/>
    
// //     <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
      
// //       <Typography variant="h4" fontWeight={700} gutterBottom>
// //         Terms and Conditions
// //       </Typography>

// //       <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
// //         Last updated: March 2026
// //       </Typography>

// //       <Section title="Introduction">
// //         Welcome to Fresh2Day. By using our website and services, you agree to comply with the following terms.
// //       </Section>

// //       <Section title="Service Eligibility">
// //         Our delivery services are strictly limited to a 3km radius from our operating location. Orders outside this radius will be automatically cancelled and refunded.
// //       </Section>

// //       <Section title="Account Responsibility">
// //         Users are responsible for maintaining account security and providing accurate delivery details.
// //       </Section>

// //       <Section title="Pricing">
// //         All prices are inclusive of GST (if applicable) and listed in INR. Prices may change without prior notice.
// //       </Section>

// //       <Section title="Shipping & Delivery">
// //         We provide express delivery within 1–2 hours. Delivery timelines may vary based on traffic and weather conditions.
// //       </Section>

// //       <Section title="Order Acceptance">
// //         Orders are accepted only after admin confirmation. We may reject orders due to stock or technical issues.
// //       </Section>

// //       <Section title="Intellectual Property">
// //         All website content including logos, images, and text belongs to Fresh2Day and cannot be reused without permission.
// //       </Section>

// //       <Section title="Governing Law">
// //         These terms are governed by Indian law. Jurisdiction: Chennai, Tamil Nadu.
// //       </Section>

// //     </Container>
// //     </>
// //   );
// // };

// // export default TermsPage;









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

// const TermsPage = () => {
//   return (
//     <>
//       <AccountNavbar />

//       <Box sx={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
        
//         {/* HEADER */}
//         <Box
//           sx={{
//             background: "linear-gradient(135deg, #4CAF50, #81C784)",
//             color: "#fff",
//             py: { xs: 5, md: 6 },
//             textAlign: "center"
//           }}
//         >
//           <Typography variant="h4" fontWeight={700}>
//             Terms and Conditions
//           </Typography>
//         </Box>

//         {/* CONTENT */}
//         <Container maxWidth="md" sx={{ mt: -4, mb: 6 }}>
//           <Box
//             sx={{
//               backgroundColor: "#fff",
//               borderRadius: 3,
//               px: { xs: 3, md: 5 },
//               py: { xs: 4, md: 6 },
//               boxShadow: "0 10px 40px rgba(0,0,0,0.08)"
//             }}
//           >
//             <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
//               Last updated: March 2026
//             </Typography>

//             <Section title="Introduction">
//               Welcome to Fresh2Day. By using our website and services, you agree to comply with the following terms.
//             </Section>

//             <Section title="Service Eligibility">
//               Our delivery services are strictly limited to a 3km radius from our operating location. Orders outside this radius will be automatically cancelled and refunded.
//             </Section>

//             <Section title="Account Responsibility">
//               Users are responsible for maintaining account security and providing accurate delivery details.
//             </Section>

//             <Section title="Pricing">
//               All prices are inclusive of GST (if applicable) and listed in INR. Prices may change without prior notice.
//             </Section>

//             <Section title="Shipping & Delivery">
//               We provide express delivery within 1–2 hours. Delivery timelines may vary based on traffic and weather conditions.
//             </Section>

//             <Section title="Order Acceptance">
//               Orders are accepted only after admin confirmation. We may reject orders due to stock or technical issues.
//             </Section>

//             <Section title="Intellectual Property">
//               All website content including logos, images, and text belongs to Fresh2Day and cannot be reused without permission.
//             </Section>

//             <Section title="Governing Law">
//               These terms are governed by Indian law. Jurisdiction: Chennai, Tamil Nadu.
//             </Section>
//           </Box>
//         </Container>
//       </Box>
//     </>
//   );
// };

// export default TermsPage;










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

const TermsPage = () => {
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
            Terms and Conditions
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

            <Section title="1. Introduction">
              Welcome to SM Veg Mart. By accessing or using our website, mobile interface, or services,
              you agree to be bound by these Terms & Conditions. These terms govern your use of our
              platform for purchasing fruits, vegetables, and dairy products.
              {" "}If you do not agree with any part of these terms, you should not use our services.
            </Section>

            <Section title="2. Service Eligibility">
              Our delivery services are strictly limited to a 3 km radius from our operating location.
              Orders placed outside this serviceable area will be automatically cancelled, and any
              payments made for such orders will be refunded. It is the user's responsibility to
              ensure the delivery address falls within the serviceable radius.
            </Section>

            <Section title="3. Account Responsibility">
              Users are responsible for maintaining the confidentiality of their account credentials,
              providing accurate, complete, and up-to-date delivery details, and ensuring availability
              at the delivery location. SM Veg Mart is not responsible for failed deliveries due to
              incorrect or incomplete information provided by the user.
            </Section>

            <Section title="4. Pricing">
              All prices listed on the platform are in Indian Rupees (INR) and are inclusive of GST
              (if applicable). Prices are subject to change without prior notice. The final payable
              amount will be reflected at checkout before order confirmation.
            </Section>

            <Section title="5. Shipping & Delivery">
              We provide express delivery within 1–2 hours. Delivery timelines may vary due to traffic
              conditions, weather conditions, or operational constraints. While we aim for timely
              delivery, we do not guarantee fixed delivery times under all circumstances.
            </Section>

            <Section title="6. Order Acceptance">
              Orders are confirmed only after admin approval. SM Veg Mart reserves the right to accept
              or reject any order, and may cancel orders due to stock unavailability or technical and
              operational issues. In case of cancellation, applicable refunds will be processed.
            </Section>

            <Section title="7. Intellectual Property">
              All content on this platform — including logos, images, text, and design elements — is
              the intellectual property of SM Veg Mart and may not be copied, reproduced, or reused
              without prior written permission.
            </Section>

            <Section title="8. Governing Law & Jurisdiction">
              These Terms & Conditions are governed by the laws of India. Any disputes arising out of
              or relating to these terms shall fall under the jurisdiction of courts located in
              Chennai, Tamil Nadu.
            </Section>

          </Box>
        </Container>
      </Box>
    </>
  );
};

export default TermsPage;