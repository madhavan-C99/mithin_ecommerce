// import {
//   Box,
//   Container,
//   Typography,
//   IconButton,
// } from "@mui/material";
// import {
//   Facebook,
//   Instagram,
//   LinkedIn,
//   YouTube,
//   Email,
//   Phone,
//   LocationOn,
//   KeyboardArrowUp,
//   ArrowForward,
// } from "@mui/icons-material";
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";

// /* ─── DESIGN TOKENS ────────────────────────────────────── */
// const PRIMARY       = "#4CAF50";
// const PRIMARY_DARK  = "#388E3C";
// const PRIMARY_MID   = "#2E7D32";
// const PRIMARY_LIGHT = "#A5D6A7";
// const WHITE         = "#FFFFFF";
// const TEXT_DIM      = "rgba(255,255,255,0.60)";
// const TEXT_MID      = "rgba(255,255,255,0.82)";
// const BORDER        = "rgba(255,255,255,0.12)";

// /* ─── DATA ─────────────────────────────────────────────── */
// const SOCIAL = [
//   { icon: <Instagram sx={{ fontSize: 17 }} />, hover: "#E1306C", label: "Instagram" },
//   // { icon: <Facebook  sx={{ fontSize: 17 }} />, hover: "#1877F2", label: "Facebook"  },
//   // { icon: <YouTube   sx={{ fontSize: 17 }} />, hover: "#FF0000", label: "YouTube"   },
//   // { icon: <LinkedIn  sx={{ fontSize: 17 }} />, hover: "#0A66C2", label: "LinkedIn"  },
// ];

// const QUICK_LINKS = [
//   { to: "/",               label: "Home"        },
//   { to: "/about",          label: "Our Story"   },
//   { to: "/products",       label: "Shop Now"    },
//   { to: "/order-tracking", label: "Track Order" },
// ];

// const POLICIES = [
//   { to: "/shipping-policy", label: "Shipping Policy"    },
//   { to: "/terms",           label: "Terms & Conditions" },
//   { to: "/refund-policy",   label: "Refund Policy"      },
// ];

// /*
//   ─── RESPONSIVE LAYOUT PLAN ────────────────────────────
//   xs  (0–599px)   — Mobile
//     Row 1: Brand — full width
//     Row 2: Quick Links | Policies — 50% / 50%
//     Row 3: Contact — full width

//   sm  (600–899px) — Tablet
//     Row 1: Brand | Contact — 50% / 50%
//     Row 2: Quick Links | Policies — 50% / 50%

//   md+ (900px+)    — Desktop
//     Single row: Brand(32%) | Quick Links(18%) | Policies(22%) | Contact(28%)
//   ──────────────────────────────────────────────────────
// */

// export default function Footer() {
//   const year = new Date().getFullYear();
//   const [showScroll, setShowScroll] = useState(false);

//   useEffect(() => {
//     const fn = () => setShowScroll(window.scrollY > 400);
//     window.addEventListener("scroll", fn);
//     return () => window.removeEventListener("scroll", fn);
//   }, []);

//   return (
//     <Box component="footer">

//       {/* ═══════════════════════════════════════
//           UPPER BODY
//       ═══════════════════════════════════════ */}
//       <Box
//         sx={{
//           backgroundColor: PRIMARY_MID,
//           pt: { xs: 5, sm: 6, md: 8 },
//           pb: { xs: 5, sm: 6, md: 8 },
//           position: "relative",
//           overflow: "hidden",
//           marginTop:5,
//         }}
//       >
//         {/* Decorative glow */}
//         <Box sx={{
//           position: "absolute", top: -140, right: -120,
//           width: 400, height: 400, borderRadius: "50%",
//           background: "radial-gradient(circle, rgba(0,0,0,0.18) 0%, transparent 70%)",
//           pointerEvents: "none",
//         }} />

//         <Container maxWidth="lg">

//           {/* ── DESKTOP: single flex row (md+) ── */}
//           <Box
//             sx={{
//               display: { xs: "none", md: "flex" },
//               flexDirection: "row",
//               alignItems: "flex-start",
//               gap: 0,
//             }}
//           >
//             <BrandCol />
//             <Box sx={{ flex: "0 0 18%", maxWidth: "18%" }}>
//               <ColTitle>Quick Links</ColTitle>
//               {QUICK_LINKS.map(({ to, label }) => (
//                 <NavLink key={to} to={to}>{label}</NavLink>
//               ))}
//             </Box>
//             <Box sx={{ flex: "0 0 22%", maxWidth: "22%" }}>
//               <ColTitle>Policies</ColTitle>
//               {POLICIES.map(({ to, label }) => (
//                 <NavLink key={to} to={to}>{label}</NavLink>
//               ))}
//             </Box>
//             <ContactCol />
//           </Box>

//           {/* ── TABLET: two rows of two cols (sm only) ── */}
//           <Box sx={{ display: { xs: "none", sm: "flex", md: "none" }, flexDirection: "column", gap: 5 }}>
//             {/* Tablet row 1: Brand + Contact */}
//             <Box sx={{ display: "flex", gap: 4, alignItems: "flex-start" }}>
//               <Box sx={{ flex: "0 0 50%", maxWidth: "50%" }}>
//                 <BrandCol />
//               </Box>
//               <Box sx={{ flex: 1 }}>
//                 <ContactCol />
//               </Box>
//             </Box>
//             {/* Tablet row 2: Quick Links + Policies */}
//             <Box sx={{ display: "flex", gap: 4, alignItems: "flex-start" }}>
//               <Box sx={{ flex: "0 0 50%", maxWidth: "50%" }}>
//                 <ColTitle>Quick Links</ColTitle>
//                 {QUICK_LINKS.map(({ to, label }) => (
//                   <NavLink key={to} to={to}>{label}</NavLink>
//                 ))}
//               </Box>
//               <Box sx={{ flex: 1 }}>
//                 <ColTitle>Policies</ColTitle>
//                 {POLICIES.map(({ to, label }) => (
//                   <NavLink key={to} to={to}>{label}</NavLink>
//                 ))}
//               </Box>
//             </Box>
//           </Box>

//           {/* ── MOBILE: stacked (xs only) ── */}
//           <Box sx={{ display: { xs: "flex", sm: "none" }, flexDirection: "column", gap: 4 }}>
//             {/* Mobile row 1: Brand full width */}
//             <BrandCol />

//             {/* Mobile row 2: Quick Links | Policies side by side */}
//             <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
//               <Box sx={{ flex: 1 }}>
//                 <ColTitle>Quick Links</ColTitle>
//                 {QUICK_LINKS.map(({ to, label }) => (
//                   <NavLink key={to} to={to}>{label}</NavLink>
//                 ))}
//               </Box>
//               <Box sx={{ flex: 1 }}>
//                 <ColTitle>Policies</ColTitle>
//                 {POLICIES.map(({ to, label }) => (
//                   <NavLink key={to} to={to}>{label}</NavLink>
//                 ))}
//               </Box>
//             </Box>

//             {/* Mobile row 3: Contact full width */}
//             <ContactCol />
//           </Box>

//         </Container>
//       </Box>

//       {/* ═══════════════════════════════════════
//           BOTTOM STRIP
//       ═══════════════════════════════════════ */}
//       <Box sx={{ backgroundColor: "#F5F7F2", borderTop: `3px solid ${PRIMARY}` }}>
//         <Container maxWidth="lg">
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: { xs: "column", sm: "row" },
//               justifyContent: "space-between",
//               alignItems: "center",
//               gap: { xs: 1, sm: 0 },
//               py: { xs: 2, sm: 1.8 },
//               textAlign: "center",
//             }}
//           >
//             <Typography sx={{ fontSize: "0.8rem", color: "#888" }}>
//               © {year} SM Veg Mart. All rights reserved.
//             </Typography>

//             <Box sx={{ display: "flex", gap: { xs: 2, sm: 3 }, flexWrap: "wrap", justifyContent: "center" }}>
//               {[
//                 { to: "/terms",           label: "Terms"    },
//                 { to: "/refund-policy",   label: "Refunds"  },
//                 { to: "/shipping-policy", label: "Shipping" },
//               ].map(({ to, label }) => (
//                 <Typography
//                   key={to}
//                   component={Link}
//                   to={to}
//                   sx={{
//                     fontSize: "0.8rem",
//                     color: "#888",
//                     textDecoration: "none",
//                     transition: "color 0.18s",
//                     "&:hover": { color: PRIMARY },
//                   }}
//                 >
//                   {label}
//                 </Typography>
//               ))}
//             </Box>
//           </Box>
//         </Container>
//       </Box>

//       {/* ═══════════════════════════════════════
//           SCROLL TO TOP
//       ═══════════════════════════════════════ */}
//       {showScroll && (
//         <Box
//           onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//           role="button"
//           aria-label="Scroll to top"
//           sx={{
//             position: "fixed",
//             bottom: { xs: 20, md: 30 },
//             right:  { xs: 20, md: 30 },
//             width: 42, height: 42,
//             borderRadius: "50%",
//             backgroundColor: PRIMARY,
//             color: WHITE,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             cursor: "pointer",
//             boxShadow: "0 4px 16px rgba(76,175,80,0.45)",
//             transition: "all 0.22s ease",
//             zIndex: 1300,
//             "&:hover": {
//               backgroundColor: PRIMARY_DARK,
//               transform: "translateY(-3px)",
//             },
//           }}
//         >
//           <KeyboardArrowUp />
//         </Box>
//       )}

//     </Box>
//   );
// }

// /* ─── BRAND COLUMN ─────────────────────────────────────── */
// function BrandCol() {
//   return (
//     <Box sx={{ flex: { md: "0 0 32%" }, maxWidth: { md: "32%" } }}>
//       {/* Logo + Name */}
//       <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 0.4 }}>
//         <Box
//           component="svg"
//           viewBox="0 0 26 26"
//           sx={{ width: 26, height: 26, flexShrink: 0 }}
//         >
//           <ellipse cx="13" cy="13" rx="11" ry="11" fill="#C8E6C9" opacity="0.25" />
//           <path d="M13 3C7.5 3 3 8 3 13c0 3.8 2 7 5 9"
//             stroke="#A5D6A7" strokeWidth="1.4" strokeLinecap="round" fill="none" />
//           <path d="M13 5c0 0 6 5.5 6 10s-2.5 7-6 8"
//             stroke="#C8E6C9" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
//         </Box>
//         <Typography sx={{
//           fontWeight: 700,
//           fontSize: { xs: "1.2rem", md: "1.3rem" },
//           color: WHITE,
//           letterSpacing: "-0.2px",
//           lineHeight: 1,
//         }}>
//           SM Veg Mart
//         </Typography>
//       </Box>

//       {/* Tagline */}
//       <Typography sx={{
//         fontSize: "0.68rem",
//         fontWeight: 600,
//         letterSpacing: "2px",
//         textTransform: "uppercase",
//         color: PRIMARY_LIGHT,
//         mb: 2.5,
//         ml: "38px",
//       }}>
//         Farm Fresh · Delivered Daily
//       </Typography>

//       {/* Description */}
//       <Typography sx={{
//         fontSize: "0.875rem",
//         color: TEXT_DIM,
//         lineHeight: 1.9,
//         mb: 3,
//         maxWidth: { xs: "100%", sm: 260, md: 270 },
//       }}>
//         Your trusted neighbourhood store for fresh fruits and
//         vegetables. 200+ products sourced directly — simple,
//         honest, and always fresh.
//       </Typography>

//       {/* Social icons */}
//       <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//         {SOCIAL.map(({ icon, hover, label }) => (
//           <IconButton
//             key={label}
//             aria-label={label}
//             size="small"
//             sx={{
//               width: 36, height: 36,
//               border: `1.5px solid ${BORDER}`,
//               backgroundColor: "rgba(255,255,255,0.06)",
//               color: TEXT_MID,
//               transition: "all 0.22s cubic-bezier(0.34,1.56,0.64,1)",
//               "&:hover": {
//                 backgroundColor: hover,
//                 borderColor: hover,
//                 color: WHITE,
//                 transform: "translateY(-4px) scale(1.1)",
//                 boxShadow: "0 8px 18px rgba(0,0,0,0.25)",
//               },
//             }}
//           >
//             {icon}
//           </IconButton>
//         ))}
//       </Box>
//     </Box>
//   );
// }

// /* ─── CONTACT COLUMN ───────────────────────────────────── */
// function ContactCol() {
//   return (
//     <Box sx={{ flex: 1 }}>
//       <ColTitle>Get In Touch</ColTitle>

//       <ContactItem icon={<LocationOn sx={{ fontSize: 15 }} />} multiLine>
//         No 182, Pillayarkuppam Rd,<br />
//         Kirumampakkam, Puducherry 607403
//       </ContactItem>

//       <ContactItem icon={<Email sx={{ fontSize: 15 }} />}>
//         info@smvegmart.com
//       </ContactItem>

//       <ContactItem icon={<Phone sx={{ fontSize: 15 }} />}>
//         +91 99445 80901
//       </ContactItem>
//     </Box>
//   );
// }

// /* ─── COL TITLE ────────────────────────────────────────── */
// function ColTitle({ children }) {
//   return (
//     <Box sx={{ mb: 2.5 }}>
//       <Typography sx={{
//         fontSize: "0.7rem",
//         fontWeight: 700,
//         letterSpacing: "2.2px",
//         textTransform: "uppercase",
//         color: PRIMARY_LIGHT,
//         mb: 0.8,
//       }}>
//         {children}
//       </Typography>
//       <Box sx={{
//         width: 22, height: "2px",
//         borderRadius: 1,
//         backgroundColor: PRIMARY,
//         opacity: 0.7,
//       }} />
//     </Box>
//   );
// }

// /* ─── NAV LINK ─────────────────────────────────────────── */
// function NavLink({ to, children }) {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         gap: 0.6,
//         mb: 1.3,
//         "& .arrow": {
//           opacity: 0,
//           transform: "translateX(-5px)",
//           transition: "all 0.16s ease",
//           color: PRIMARY_LIGHT,
//         },
//         "&:hover .arrow": { opacity: 1, transform: "translateX(0)" },
//         "&:hover .txt":   { color: WHITE },
//       }}
//     >
//       <ArrowForward className="arrow" sx={{ fontSize: "13px !important" }} />
//       <Typography
//         component={Link}
//         to={to}
//         className="txt"
//         sx={{
//           textDecoration: "none",
//           fontSize: "0.9rem",
//           color: TEXT_DIM,
//           lineHeight: 1.5,
//           transition: "color 0.16s ease",
//         }}
//       >
//         {children}
//       </Typography>
//     </Box>
//   );
// }

// /* ─── CONTACT ITEM ─────────────────────────────────────── */
// function ContactItem({ icon, children, multiLine }) {
//   return (
//     <Box sx={{
//       display: "flex",
//       gap: 1.5,
//       mb: 1.8,
//       alignItems: multiLine ? "flex-start" : "center",
//     }}>
//       <Box sx={{
//         width: 28, height: 28,
//         borderRadius: "7px",
//         backgroundColor: "rgba(255,255,255,0.09)",
//         border: `1px solid ${BORDER}`,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         color: PRIMARY_LIGHT,
//         flexShrink: 0,
//         mt: multiLine ? "2px" : 0,
//       }}>
//         {icon}
//       </Box>
//       <Typography sx={{
//         fontSize: "0.875rem",
//         color: TEXT_MID,
//         lineHeight: 1.75,
//       }}>
//         {children}
//       </Typography>
//     </Box>
//   );
// }










import {
  Box,
  Container,
  Typography,
  IconButton,
} from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  KeyboardArrowUp,
  ArrowForward,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

/* ─── DESIGN TOKENS ────────────────────────────────────── */
const PRIMARY       = "#4CAF50";
const PRIMARY_DARK  = "#388E3C";
const PRIMARY_MID   = "#2E7D32";
const PRIMARY_LIGHT = "#A5D6A7";
const WHITE         = "#FFFFFF";
const TEXT_DIM      = "rgba(255,255,255,0.58)";
const TEXT_MID      = "rgba(255,255,255,0.82)";
const BORDER        = "rgba(255,255,255,0.12)";

/* ─── DATA ─────────────────────────────────────────────── */
const QUICK_LINKS = [
  { to: "/",               label: "Home"        },
  { to: "/about",          label: "Our Story"   },
  { to: "/products",       label: "Shop Now"    },
  { to: "/order-tracking", label: "Track Order" },
];

const POLICIES = [
  { to: "/shipping-policy", label: "Shipping Policy"    },
  { to: "/terms",           label: "Terms & Conditions" },
  { to: "/refund-policy",   label: "Refund Policy"      },
];

/*
  ─── RESPONSIVE LAYOUT PLAN ────────────────────────────
  xs  (0–599px)   — Mobile
    Row 1: Brand — full width
    Row 2: Quick Links | Policies — 50% / 50%
    Row 3: Contact — full width

  sm  (600–899px) — Tablet
    Row 1: Brand | Contact — 50% / 50%
    Row 2: Quick Links | Policies — 50% / 50%

  md+ (900px+)    — Desktop
    Single row: Brand(32%) | Quick Links(18%) | Policies(22%) | Contact(28%)
  ──────────────────────────────────────────────────────
*/

export default function Footer() {
  const year = new Date().getFullYear();
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const fn = () => setShowScroll(window.scrollY > 400);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <Box component="footer">

      {/* ═══════════════════════════════════════
          UPPER BODY
      ═══════════════════════════════════════ */}
      <Box
        sx={{
          backgroundColor: PRIMARY_MID,
          pt: { xs: 5, sm: 6, md: 8 },
          pb: { xs: 5, sm: 6, md: 8 },
          position: "relative",
          overflow: "hidden",
          mt: 5,
        }}
      >

        {/* ── Dot grid texture overlay ── */}
        <Box sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
          zIndex: 0,
        }} />

        {/* ── Top-right ambient glow ── */}
        <Box sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(76,175,80,0.30) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }} />

        {/* ── Bottom-left subtle glow ── */}
        <Box sx={{
          position: "absolute",
          bottom: -80,
          left: -60,
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(165,214,167,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }} />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>

          {/* ── DESKTOP: single flex row (md+) ── */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "row",
              alignItems: "flex-start",
              gap: 0,
            }}
          >
            <BrandCol />

            {/* Vertical divider between brand and nav cols */}
            <Box sx={{
              width: "1px",
              alignSelf: "stretch",
              backgroundColor: BORDER,
              mx: 0,
              flexShrink: 0,
            }} />

            <Box sx={{
              flex: 1,
              display: "flex",
              paddingLeft: "40px",
              gap: 0,
            }}>
              <Box sx={{ flex: "0 0 28%", maxWidth: "28%" }}>
                <ColTitle>Quick Links</ColTitle>
                {QUICK_LINKS.map(({ to, label }) => (
                  <NavLink key={to} to={to}>{label}</NavLink>
                ))}
              </Box>
              <Box sx={{ flex: "0 0 30%", maxWidth: "30%" }}>
                <ColTitle>Policies</ColTitle>
                {POLICIES.map(({ to, label }) => (
                  <NavLink key={to} to={to}>{label}</NavLink>
                ))}
              </Box>
              <ContactCol />
            </Box>
          </Box>

          {/* ── TABLET: two rows of two cols (sm only) ── */}
          <Box sx={{ display: { xs: "none", sm: "flex", md: "none" }, flexDirection: "column", gap: 5 }}>
            {/* Tablet row 1: Brand + Contact */}
            <Box sx={{ display: "flex", gap: 4, alignItems: "flex-start" }}>
              <Box sx={{ flex: "0 0 50%", maxWidth: "50%" }}>
                <BrandCol />
              </Box>
              <Box sx={{ flex: 1 }}>
                <ContactCol />
              </Box>
            </Box>
            {/* Tablet row 2: Quick Links + Policies */}
            <Box sx={{ display: "flex", gap: 4, alignItems: "flex-start" }}>
              <Box sx={{ flex: "0 0 50%", maxWidth: "50%" }}>
                <ColTitle>Quick Links</ColTitle>
                {QUICK_LINKS.map(({ to, label }) => (
                  <NavLink key={to} to={to}>{label}</NavLink>
                ))}
              </Box>
              <Box sx={{ flex: 1 }}>
                <ColTitle>Policies</ColTitle>
                {POLICIES.map(({ to, label }) => (
                  <NavLink key={to} to={to}>{label}</NavLink>
                ))}
              </Box>
            </Box>
          </Box>

          {/* ── MOBILE: stacked (xs only) ── */}
          <Box sx={{ display: { xs: "flex", sm: "none" }, flexDirection: "column", gap: 4 }}>
            {/* Mobile row 1: Brand full width */}
            <BrandCol />

            {/* Mobile row 2: Quick Links | Policies side by side */}
            <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
              <Box sx={{ flex: 1 }}>
                <ColTitle>Quick Links</ColTitle>
                {QUICK_LINKS.map(({ to, label }) => (
                  <NavLink key={to} to={to}>{label}</NavLink>
                ))}
              </Box>
              <Box sx={{ flex: 1 }}>
                <ColTitle>Policies</ColTitle>
                {POLICIES.map(({ to, label }) => (
                  <NavLink key={to} to={to}>{label}</NavLink>
                ))}
              </Box>
            </Box>

            {/* Mobile row 3: Contact full width */}
            <ContactCol />
          </Box>

        </Container>
      </Box>

      {/* ═══════════════════════════════════════
          BOTTOM STRIP
      ═══════════════════════════════════════ */}
      <Box sx={{ backgroundColor: "#F5F7F2", borderTop: `3px solid ${PRIMARY}` }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              gap: { xs: 1, sm: 0 },
              py: { xs: 2, sm: 1.8 },
              textAlign: "center",
            }}
          >
            <Typography sx={{ fontSize: "0.8rem", color: "#888" }}>
              © {year} SM Veg Mart. All rights reserved.
            </Typography>

            <Box sx={{ display: "flex", gap: { xs: 2, sm: 3 }, flexWrap: "wrap", justifyContent: "center" }}>
              {[
                { to: "/terms",           label: "Terms"    },
                { to: "/refund-policy",   label: "Refunds"  },
                { to: "/shipping-policy", label: "Shipping" },
              ].map(({ to, label }) => (
                <Typography
                  key={to}
                  component={Link}
                  to={to}
                  sx={{
                    fontSize: "0.8rem",
                    color: "#888",
                    textDecoration: "none",
                    transition: "color 0.18s",
                    "&:hover": { color: PRIMARY },
                  }}
                >
                  {label}
                </Typography>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ═══════════════════════════════════════
          SCROLL TO TOP
      ═══════════════════════════════════════ */}
      {showScroll && (
        <Box
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          role="button"
          aria-label="Scroll to top"
          sx={{
            position: "fixed",
            bottom: { xs: 20, md: 30 },
            right:  { xs: 20, md: 30 },
            width: 42, height: 42,
            borderRadius: "50%",
            backgroundColor: PRIMARY,
            color: WHITE,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(76,175,80,0.45)",
            transition: "all 0.22s ease",
            zIndex: 1300,
            "&:hover": {
              backgroundColor: PRIMARY_DARK,
              transform: "translateY(-3px)",
            },
          }}
        >
          <KeyboardArrowUp />
        </Box>
      )}

    </Box>
  );
}

/* ─── BRAND COLUMN ─────────────────────────────────────── */
function BrandCol() {
  return (
    <Box sx={{
      flex: { md: "0 0 32%" },
      maxWidth: { md: "32%" },
      pr: { md: "40px" },
    }}>

      {/* Logo + Name */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 0.4 }}>

        {/* Leaf badge icon */}
        {/* <Box sx={{
          width: 32,
          height: 32,
          borderRadius: "50% 50% 50% 0",
          backgroundColor: "rgba(255,255,255,0.11)",
          border: `1.5px solid rgba(255,255,255,0.20)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}>
          <Box
            component="svg"
            viewBox="0 0 22 22"
            sx={{ width: 16, height: 16 }}
          >
            <path
              d="M11 2C6 2 2 7 2 12c0 3.2 1.6 6 4 7.5"
              stroke="#A5D6A7"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M11 4c0 0 5 4.5 5 8.5S13.5 19 11 20"
              stroke="#C8E6C9"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />
            <circle cx="11" cy="12" r="2" fill="#A5D6A7" opacity="0.4" />
          </Box>
        </Box> */}

        <Typography sx={{
          fontWeight: 700,
          fontSize: { xs: "1.2rem", md: "1.3rem" },
          color: WHITE,
          letterSpacing: "-0.2px",
          lineHeight: 1,
        }}>
          SM Veg Mart
        </Typography>
      </Box>

      {/* Tagline */}
      <Typography sx={{
        fontSize: "0.62rem",
        fontWeight: 700,
        letterSpacing: "2.5px",
        textTransform: "uppercase",
        color: PRIMARY_LIGHT,
        mb: 2.5,
        // ml: "44px",
      }}>
        Farm Fresh · Delivered Daily
      </Typography>

      {/* Description */}
      <Typography sx={{
        fontSize: "0.875rem",
        color: TEXT_DIM,
        lineHeight: 1.9,
        mb: 3,
        maxWidth: { xs: "100%", sm: 260, md: 270 },
      }}>
        Your trusted neighbourhood store for fresh fruits and
        vegetables. 200+ products sourced directly — simple,
        honest, and always fresh.
      </Typography>

      {/* ── Follow Us section ── */}
      <Typography sx={{
        fontSize: "0.62rem",
        fontWeight: 700,
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: PRIMARY_LIGHT,
        mb: 1.2,
      }}>
        Follow Us
      </Typography>

      {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
      href= "https://www.instagram.com/smvegmart?igsh=MnJhbGNtOHc3MzAy"
      target="_blank"
      rel="noopener noreferrer"
      > */}
      <Box
  component="a"
  href="https://www.instagram.com/smvegmart?igsh=MnJhbGNtOHc3MzAy"
  target="_blank"
  rel="noopener noreferrer"
  sx={{ display: "flex", alignItems: "center", gap: 1.5, textDecoration: "none" }}
>
        {/* Instagram icon button */}
        <IconButton
          aria-label="Instagram"
          size="small"
          sx={{
            width: 38,
            height: 38,
            borderRadius: "10px",
            border: `1.5px solid ${BORDER}`,
            backgroundColor: "rgba(255,255,255,0.07)",
            color: "rgba(255,255,255,0.70)",
            transition: "all 0.22s cubic-bezier(0.34,1.56,0.64,1)",
            "&:hover": {
              backgroundColor: "#E1306C",
              borderColor: "#E1306C",
              color: WHITE,
              transform: "translateY(-3px) scale(1.08)",
              boxShadow: "0 8px 18px rgba(0,0,0,0.25)",
            },
          }}
        >
          {/* Custom Instagram SVG */}
          <Box
            component="svg"
            viewBox="0 0 24 24"
            sx={{ width: 17, height: 17, fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" }}
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
          </Box>
        </IconButton>

        {/* Handle label */}
        <Typography sx={{
          fontSize: "0.8rem",
          color: "rgba(255,255,255,0.45)",
        }}>
          @<Box component="span" sx={{ color: "rgba(255,255,255,0.80)", fontWeight: 600 }}>smvegmart</Box>
        </Typography>
      </Box>

    </Box>
  );
}

/* ─── CONTACT COLUMN ───────────────────────────────────── */
function ContactCol() {
  return (
    <Box sx={{ flex: 1 }}>
      <ColTitle>Get In Touch</ColTitle>

      <ContactItem icon={<LocationOn sx={{ fontSize: 14 }} />} multiLine>
        No 182, Pillayarkuppam Rd,<br />
        Kirumampakkam, Puducherry 607403
      </ContactItem>

      <ContactItem icon={<Email sx={{ fontSize: 14 }} />}>
        info@smvegmart.com
      </ContactItem>

      <ContactItem icon={<Phone sx={{ fontSize: 14 }} />}>
        +91 99445 80901
      </ContactItem>
    </Box>
  );
}

/* ─── COL TITLE ────────────────────────────────────────── */
function ColTitle({ children }) {
  return (
    <Box sx={{ mb: 2.5 }}>
      <Typography sx={{
        fontSize: "0.62rem",
        fontWeight: 700,
        letterSpacing: "2.5px",
        textTransform: "uppercase",
        color: PRIMARY_LIGHT,
        mb: 0.8,
      }}>
        {children}
      </Typography>
      <Box sx={{
        width: 24,
        height: "2px",
        borderRadius: 1,
        backgroundColor: PRIMARY,
        opacity: 0.8,
      }} />
    </Box>
  );
}

/* ─── NAV LINK ─────────────────────────────────────────── */
function NavLink({ to, children }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.6,
        mb: 1.3,
        "& .arrow": {
          opacity: 0,
          transform: "translateX(-5px)",
          transition: "all 0.16s ease",
          color: PRIMARY_LIGHT,
        },
        "&:hover .arrow": { opacity: 1, transform: "translateX(0)" },
        "&:hover .txt":   { color: WHITE },
      }}
    >
      <ArrowForward className="arrow" sx={{ fontSize: "13px !important" }} />
      <Typography
        component={Link}
        to={to}
        className="txt"
        sx={{
          textDecoration: "none",
          fontSize: "0.9rem",
          color: TEXT_DIM,
          lineHeight: 1.5,
          transition: "color 0.16s ease",
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}

/* ─── CONTACT ITEM ─────────────────────────────────────── */
function ContactItem({ icon, children, multiLine }) {
  return (
    <Box sx={{
      display: "flex",
      gap: 1.5,
      mb: 1.8,
      alignItems: multiLine ? "flex-start" : "center",
    }}>
      <Box sx={{
        width: 30,
        height: 30,
        borderRadius: "8px",
        backgroundColor: "rgba(255,255,255,0.08)",
        border: `1px solid ${BORDER}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: PRIMARY_LIGHT,
        flexShrink: 0,
        mt: multiLine ? "2px" : 0,
      }}>
        {icon}
      </Box>
      <Typography sx={{
        fontSize: "0.875rem",
        color: TEXT_MID,
        lineHeight: 1.75,
      }}>
        {children}
      </Typography>
    </Box>
  );
}