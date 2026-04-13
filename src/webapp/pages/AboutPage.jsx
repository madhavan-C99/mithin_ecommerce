import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import VerifiedIcon from "@mui/icons-material/Verified";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import GroupsIcon from "@mui/icons-material/Groups";
import NatureIcon from "@mui/icons-material/Nature";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// /* ─── TOKENS ─────────────────────────────── */
// const G     = "#4CAF50";
// const G_D   = "#2E7D32";
// const G_DD  = "#1B5E20";
// const G_L   = "#E8F5E9";
// const G_LL  = "#F1F8E9";
// const AMBER = "#F59E0B";
// const AMB_D = "#92400E";
// const TEXT  = "#0F2412";
// const MUTED = "#4B6350";

// /* ─── NEW REFINED TOKENS ─────────────────── */
// const G     = "#68A36B"; // Softer, more natural green
// const G_D   = "#2C4A32"; // Earthier deep green (less "neon")
// const G_DD  = "#1B2E20"; // Very deep forest (adds premium weight)
// const G_L   = "#F0F4F0"; // Very light mint-grey
// const G_LL  = "#FAFDFB"; // Clean white with a hint of nature
// const AMBER = "#D97706"; // Burnt orange/amber (better contrast on light)
// const AMB_D = "#92400E";
// const TEXT  = "#1A241E"; // Charcoal with a green tint
// const MUTED = "#5C6B61"; // Soft leaf-grey


// /* ─── CLEAN WHITE + PALE GREEN TOKENS ─────── */
// const G     = "#68A36B"; // Green for icons & accents
// const G_D   = "#4A7C59"; // Medium green for gradients
// const G_DD  = "#2C4A32"; // Deep green (founder panel only)
// const G_L   = "#F2F8F2"; // Very pale green (subtle section bg)
// const G_LL  = "#FFFFFF"; // Pure white (main bg)
// const AMBER = "#68A36B"; // Replaced with green
// const AMB_D = "#4A7C59"; // Replaced with green
// const TEXT  = "#1A1A1A"; // Clean dark text
// const MUTED = "#5A6B5C"; // Soft grey-green for body text


/* ─── #4CAF50 THEME TOKENS ─────────────── */
const G     = "#4CAF50"; // Primary green
const G_D   = "#388E3C"; // Slightly deeper green (borders, hover)
const G_DD  = "#2E7D32"; // Used only for founder dark panel
const G_L   = "#F1F8F1"; // Pale green (subtle section backgrounds)
const G_LL  = "#FFFFFF"; // Pure white (main bg)
const AMBER = "#4CAF50"; // Replaced — now green
const AMB_D = "#388E3C"; // Replaced — now green
const TEXT  = "#111111"; // Pure black text
const MUTED = "#444444"; // Dark grey for body text

/* ─── ANIMATED COUNTER ───────────────────── */
function Counter({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref     = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || started.current) return;
        started.current = true;
        const end  = parseInt(target);
        const step = Math.max(1, Math.ceil(end / (1800 / 16)));
        let cur    = 0;
        const t    = setInterval(() => {
          cur += step;
          if (cur >= end) { setVal(end); clearInterval(t); }
          else setVal(cur);
        }, 16);
      },
      { threshold: 0.4 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── STAT CARD (hero) ───────────────────── */
function StatCard({ icon, value, suffix, label, color }) {
  return (
    <Box sx={{
      borderRadius: 4,
      background: "rgba(255,255,255,0.13)",
      border: "1px solid rgba(255,255,255,0.22)",
      backdropFilter: "blur(8px)",
      p: { xs: 2.5, sm: 3, md: 3.5 },
      textAlign: "center",
      transition: "transform .25s, background .25s",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      "&:hover": {
        transform: "translateY(-6px)",
        background: "rgba(255,255,255,0.22)",
      },
    }}>
      <Box sx={{
        width: 56, height: 56, borderRadius: "50%",
        background: "rgba(255,255,255,0.18)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", mb: 1.5, fontSize: 26,
      }}>
        {icon}
      </Box>
      <Typography sx={{
        // fontFamily: "'Playfair Display', serif",
        fontWeight: 900,
        fontSize: { xs: "2.2rem", sm: "2.6rem", md: "3rem" },
        color: "#fff",
        lineHeight: 1,
        mb: 0.5,
        textShadow: "0 2px 12px rgba(0,0,0,0.18)",
      }}>
        <Counter target={parseInt(value)} suffix={suffix} />
      </Typography>
      <Typography sx={{
        fontSize: { xs: "0.75rem", md: "0.82rem" },
        fontWeight: 600,
        color: "rgba(255,255,255,0.78)",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
      }}>
        {label}
      </Typography>
    </Box>
  );
}

/* ─── VALUE ROW CARD ─────────────────────── */
function ValueCard({ icon, title, desc, accent, index }) {
  return (
    <Box sx={{
      display: "flex",
      gap: 2.5,
      p: { xs: 2.5, md: 3 },
      borderRadius: 4,
      background: index % 2 === 0
        ? `linear-gradient(135deg, #fff 70%, ${accent}0A)`
        : `linear-gradient(135deg, ${accent}08 0%, #fff 60%)`,
      border: `1.5px solid ${accent}28`,
      transition: "transform .22s, box-shadow .22s",
      "&:hover": {
        transform: "translateX(8px)",
        boxShadow: `0 6px 28px ${accent}22`,
      },
    }}>
      <Box sx={{
        minWidth: 52, height: 52, borderRadius: 3,
        background: `linear-gradient(135deg, ${accent}22, ${accent}10)`,
        border: `1.5px solid ${accent}30`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: accent, flexShrink: 0,
      }}>
        {icon}
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 700, fontSize: { xs: "0.95rem", md: "1rem" }, color: TEXT, mb: 0.4 }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: { xs: "0.83rem", md: "0.88rem" }, color: MUTED, lineHeight: 1.7 }}>
          {desc}
        </Typography>
      </Box>
    </Box>
  );
}

/* ─── STORY CARD ─────────────────────────── */
function StoryCard({ number, text, accent }) {
  return (
    <Card elevation={0} sx={{
      borderRadius: 4,
      border: `1.5px solid ${accent}25`,
      background: "#fff",
      overflow: "hidden",
      height: "100%",
      transition: "transform .22s, box-shadow .22s",
      "&:hover": {
        transform: "translateY(-6px)",
        boxShadow: `0 16px 44px ${accent}28`,
      },
    }}>
      <Box sx={{ height: 6, background: `linear-gradient(90deg, ${accent}, ${accent}55)` }} />
      <CardContent sx={{ p: { xs: 3, md: 3.5 } }}>
        <Typography sx={{
          // fontFamily: "'Playfair Display', serif",
          fontSize: "4rem", fontWeight: 900,
          lineHeight: 1, mb: 2,
          background: `linear-gradient(135deg, ${accent}25, ${accent}08)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          userSelect: "none",
        }}>
          {String(number).padStart(2, "0")}
        </Typography>
        <Typography sx={{
          fontSize: { xs: "0.9rem", md: "0.95rem" }, color: MUTED, lineHeight: 1.88,
        }}>
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
export default function AboutPage() {
  const theme = useTheme();
  const isMd  = useMediaQuery(theme.breakpoints.up("md"));
  const isSm  = useMediaQuery(theme.breakpoints.up("sm"));

  const stats = [
    { icon: <VerifiedIcon sx={{ fontSize: 28 }} />,    value: "8",    suffix: "+",  label: "Years of Experience",  color: G },
    { icon: <StorefrontIcon sx={{ fontSize: 28 }} />,  value: "1000", suffix: "",   label: "Sq. Ft. Facility",     color: AMBER },
    { icon: <AgricultureIcon sx={{ fontSize: 28 }} />, value: "100",  suffix: "%",  label: "Farm-Fresh Produce",   color: G },
    { icon: <GroupsIcon sx={{ fontSize: 28 }} />,      value: "2018", suffix: "",   label: "Founded in January",   color: AMBER },
  ];

  const values = [
    { icon: <NatureIcon />,         title: "Farm-Fresh Always",   desc: "Direct sourcing from trusted farmers ensures every vegetable reaches you at peak freshness.",                        accent: G },
    { icon: <VerifiedIcon />,       title: "Quality & Hygiene",   desc: "Our 1000 sq. ft. facility maintains strict standards of storage, handling, and cleanliness.",                       accent: G_D },
    { icon: <GroupsIcon />,         title: "Community Trust",     desc: "Built over 8 years, our relationships with customers and farmers are our greatest strength.",                       accent: AMBER },
    { icon: <LocalShippingIcon />,  title: "Fair Pricing",        desc: "We bridge farmers and consumers — delivering the best quality at prices that are always fair.",                     accent: G },
  ];

  const stories = [
    { n: 1, accent: G,     text: "What started as a focused initiative soon grew into a trusted name in the local community. With over 8 years of experience in the vegetable business, Sugumar understood the importance of quality, consistency, and customer trust. This deep industry knowledge became the foundation of SMVegMart's success." },
    { n: 2, accent: AMBER, text: "Located in Kirumampakkam, Puducherry, SMVegMart operates from a well-organized 1000 sq. ft. facility, ensuring proper storage and handling to maintain freshness from farm to customer. By building strong relationships with farmers and suppliers, the brand ensures that only the best produce reaches its customers." },
    { n: 3, accent: G_D,   text: "SMVegMart was created to bridge the gap between farmers and consumers — delivering fresh vegetables at fair prices while maintaining high standards of hygiene and service. Over the years, the business has grown steadily, earning the loyalty of customers who value quality and reliability." },
    { n: 4, accent: AMBER, text: "Today, SMVegMart continues to evolve with a clear focus on customer satisfaction, freshness, and affordability. With a commitment to healthy living and community trust, the brand aims to expand its reach and bring a better vegetable shopping experience to more people." },
  ];

  return (
    <Box sx={{ backgroundColor: G_LL, minHeight: "100vh" }}>

      {/* ══════════════════════════════════════
          HERO — full bleed green, no half-empty
      ══════════════════════════════════════ */}
      <Box sx={{
        background: `linear-gradient(135deg, ${G_DD} 0%, ${G_D} 50%, ${G} 100%)`,
        position: "relative",
        overflow: "hidden",
        pt: { xs: 6, md: 8 },
        pb: { xs: 0, md: 0 },
      }}>
        {/* decorative rings */}
        {[
          { s: 500, op: 0.05, top: -160, right: -160 },
          { s: 280, op: 0.06, top:  60,  right:  80  },
          { s: 200, op: 0.05, bottom: -80, left: -60 },
        ].map((r, i) => (
          <Box key={i} sx={{
            position: "absolute", pointerEvents: "none",
            width: r.s, height: r.s, borderRadius: "50%",
            border: `2px solid rgba(255,255,255,${r.op})`,
            top: r.top, right: r.right, bottom: r.bottom, left: r.left,
          }} />
        ))}

        <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2, sm: 3, md: 4 } }}>

          {/* ── TOP: badge + headline + description ── */}
          <Box sx={{ textAlign: "center", pb: { xs: 4, md: 6 } }}>
            <Box sx={{
              display: "inline-flex", alignItems: "center", gap: 1,
              border: "1px solid rgba(255,255,255,0.3)", borderRadius: "100px",
              px: 2.5, py: 0.8, mb: 3,
              backgroundColor: "rgba(255,255,255,0.12)",
            }}>
              <StarIcon sx={{ fontSize: 14, color: AMBER }} />
              <Typography sx={{
                fontSize: "0.72rem", color: "rgba(255,255,255,0.92)",
                fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
              }}>
                Trusted Since January 2018 · Puducherry
              </Typography>
            </Box>

            <Typography variant="h1" sx={{
              // fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: { xs: "2.8rem", sm: "3.6rem", md: "4.4rem", lg: "5rem" },
              color: "#fff",
              lineHeight: 1.08,
              mb: 3,
              px: { xs: 0, md: 4 },
            }}>
              About{" "}
              <Box component="span" sx={{
                background: "linear-gradient(90deg, #A5D6A7, #DCEDC8, #A5D6A7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                SMVegMart
              </Box>
            </Typography>

            <Typography sx={{
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.18rem" },
              color: "rgba(255,255,255,0.82)",
              lineHeight: 1.85,
              maxWidth: 720,
              mx: "auto",
              mb: 4,
            }}>
              SMVegMart is a trusted name in fresh and quality vegetables, proudly serving customers
              with over 8 years of experience since our journey began in January 2018. Founded by
              Sugumar, our mission has always been to provide farm-fresh produce with reliability,
              affordability, and care.
            </Typography>

            {/* info pills */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, justifyContent: "center", mb: { xs: 4, md: 6 } }}>
              {[
                { icon: <LocationOnIcon sx={{ fontSize: 15 }} />, text: "Kirumampakkam, Puducherry" },
                { icon: <CalendarMonthIcon sx={{ fontSize: 15 }} />, text: "Est. January 2018" },
                { icon: <AgricultureIcon sx={{ fontSize: 15 }} />, text: "Farm Direct Sourcing" },
              ].map((p, i) => (
                <Box key={i} sx={{
                  display: "flex", alignItems: "center", gap: 0.8,
                  px: 2, py: 0.8, borderRadius: "100px",
                  backgroundColor: "rgba(255,255,255,0.14)",
                  border: "1px solid rgba(255,255,255,0.24)",
                  color: "rgba(255,255,255,0.9)",
                }}>
                  {p.icon}
                  <Typography sx={{ fontSize: "0.8rem", fontWeight: 500 }}>{p.text}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* ── STAT CARDS: full-width flex strip ── */}
          <Box sx={{
            background: "rgba(0,0,0,0.22)",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(6px)",
            mx: { xs: -2, sm: -3, md: -4 },
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 3, md: 4 },
          }}>
            <Box sx={{
              display: "flex",
              flexWrap: { xs: "wrap", sm: "nowrap" },
              gap: { xs: 2, md: 3 },
            }}>
              {stats.map((s, i) => (
                <Box key={i} sx={{ flex: "1 1 calc(50% - 8px)", minWidth: 0 }}>
                  <StatCard {...s} />
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ══════════════════════════════════════
          ABOUT BODY — tight 2-col, no dead space
      ══════════════════════════════════════ */}
      <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 6, md: 9 } }}>
        <Grid container spacing={{ xs: 4, md: 5 }} alignItems="stretch">

          {/* Left: story paragraphs */}
          <Grid item xs={12} md={6}>
            <Box sx={{
              height: "100%",
              background: "#fff",
              borderRadius: 4,
              border: `1.5px solid ${G}20`,
              p: { xs: 3, md: 4 },
              display: "flex",
              flexDirection: "column",
              gap: 0,
              backgroundColor: "#fff", // REQUIRED
              borderRadius: 2,
              boxShadow: 1, // MUI predefined shadow
            }}>
              <Box sx={{ display: "flex", 
                alignItems: "center", 
                gap: 1.5, mb: 3,
                }}>
                <Box sx={{ width: 5, height: 40, background: `linear-gradient(180deg, ${G}, ${G_D})`, borderRadius: 3 }} />
                <Typography sx={{
                  // fontFamily: "'Playfair Display', serif",
                  fontWeight: 800, fontSize: { xs: "1.5rem", md: "1.85rem" }, color: TEXT, lineHeight: 1.25,
                }}>
                  Our Story & Commitment
                </Typography>
              </Box>

              {[
                "Operating from a spacious 1000 sq. ft. facility, we ensure proper handling, storage, and distribution of vegetables to maintain freshness and hygiene at every step. Over the years, SMVegMart has built strong relationships with farmers and suppliers, allowing us to deliver the best quality products directly to our customers.",
                "At SMVegMart, we believe that healthy living starts with fresh food. Our commitment is to make high-quality vegetables easily accessible while maintaining excellent customer service and trust.",
                "We continue to grow with the support of our valued customers, striving every day to serve better and expand our reach.",
              ].map((para, i) => (
                <Box key={i} sx={{ display: "flex", gap: 2, mb: i < 2 ? 3 : 0 }}>
                  <CheckCircleIcon sx={{ fontSize: 20, color: G, mt: 0.3, flexShrink: 0 }} />
                  <Typography sx={{ fontSize: { xs: "0.93rem", md: "0.98rem" }, color: MUTED, lineHeight: 1.9 }}>
                    {para}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Right: values */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, height: "100%" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                <Box sx={{ width: 5, height: 40, background: `linear-gradient(180deg, ${AMBER}, ${AMB_D})`, borderRadius: 3 }} />
                <Typography sx={{
                  // fontFamily: "'Playfair Display', serif",
                  fontWeight: 800, fontSize: { xs: "1.5rem", md: "1.85rem" }, color: TEXT, lineHeight: 1.25,
                }}>
                  What We Stand For
                </Typography>
              </Box>
              {values.map((v, i) => <ValueCard key={i} {...v} index={i} />)}
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* ══════════════════════════════════════
          FOUNDER'S JOURNEY — dark green bg strip
      ══════════════════════════════════════ */}
      <Box sx={{ background: `linear-gradient(180deg, ${G_D} 0%, ${G_DD} 100%)`, py: { xs: 7, md: 10 }, position: "relative", overflow: "hidden" }}>
        {/* bg rings */}
        {[{ s: 400, t: -100, r: -100 }, { s: 250, b: -80, l: -60 }].map((r, i) => (
          <Box key={i} sx={{
            position: "absolute", pointerEvents: "none",
            width: r.s, height: r.s, borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.06)",
            top: r.t, right: r.r, bottom: r.b, left: r.l,
          }} />
        ))}

        <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2, sm: 3, md: 4 }, position: "relative", zIndex: 1 }}>

          {/* section label */}
          <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
            <Box sx={{
              display: "inline-block", px: 3, py: 0.8, borderRadius: "100px",
              background: `${AMBER}22`, border: `1px solid ${AMBER}50`, mb: 2,
            }}>
              <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: AMBER, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Founder's Journey
              </Typography>
            </Box>
            <Typography variant="h2" sx={{
              // fontFamily: "'Playfair Display', serif", fontWeight: 900,
              fontSize: { xs: "1.85rem", sm: "2.4rem", md: "3rem" },
              color: "#fff", lineHeight: 1.2, maxWidth: 700, mx: "auto",
            }}>
              How a Vision for Freshness Built SMVegMart
            </Typography>
          </Box>

          {/* pull quote */}
          <Box sx={{
            position: "relative",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: 5,
            px: { xs: 4, md: 8 },
            py: { xs: 4, md: 5.5 },
            mb: { xs: 5, md: 7 },
            overflow: "hidden",
            backdropFilter: "blur(4px)",
          }}>
            <FormatQuoteRoundedIcon sx={{
              position: "absolute", fontSize: 180, color: "rgba(255,255,255,0.05)",
              top: -40, left: -20, pointerEvents: "none",
            }} />
            <FormatQuoteRoundedIcon sx={{
              position: "absolute", fontSize: 180, color: "rgba(255,255,255,0.05)",
              bottom: -40, right: -20, transform: "rotate(180deg)", pointerEvents: "none",
            }} />
            <Typography sx={{
              // fontFamily: "'Playfair Display', serif",
              fontSize: { xs: "1.1rem", sm: "1.32rem", md: "1.55rem" },
              fontStyle: "italic", color: "#fff", lineHeight: 1.75,
              textAlign: "center", position: "relative", zIndex: 1,
            }}>
              "In January 2018, driven by a passion for delivering fresh and high-quality vegetables,
              Sugumar founded SMVegMart with a simple yet powerful vision — to make farm-fresh produce
              easily accessible to every household."
            </Typography>
          </Box>

          {/* 2×2 story cards */}
          <Grid container spacing={{ xs: 2.5, md: 3 }}>
            {stories.map((s) => (
              <Grid item xs={12} sm={6} key={s.n}>
                <StoryCard number={s.n} text={s.text} accent={s.accent} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ══════════════════════════════════════
          FOUNDER SPOTLIGHT — flex row, no empty space
      ══════════════════════════════════════ */}
      <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 6, md: 9 } }}>
        <Box sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          borderRadius: 5,
          overflow: "hidden",
          boxShadow: `0 24px 64px ${G_DD}30`,
          minHeight: { sm: 340 },
        }}>

          {/* Left — green identity panel */}
          <Box sx={{
            flex: { xs: "none", sm: "0 0 38%", md: "0 0 34%" },
            background: `linear-gradient(160deg, ${G_DD} 0%, ${G} 100%)`,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            p: { xs: 4, md: 5 },
            position: "relative", overflow: "hidden",
            textAlign: "center",
          }}>
            <Box sx={{
              position: "absolute", width: 220, height: 220, borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.08)", top: -60, right: -60, pointerEvents: "none",
            }} />
            <Box sx={{
              width: { xs: 96, md: 120 }, height: { xs: 96, md: 120 },
              borderRadius: "50%",
              border: "4px solid rgba(255,255,255,0.35)",
              background: "rgba(255,255,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              mb: 2.5,
            }}>
              <Typography sx={{
                // fontFamily: "'Playfair Display', serif",
                fontSize: { xs: "2.4rem", md: "3rem" }, fontWeight: 900, color: "#fff",
              }}>S</Typography>
            </Box>
            <Typography sx={{
              fontFamily: "'Playfair Display', serif",
              fontSize: { xs: "1.7rem", md: "2rem" }, fontWeight: 800, color: "#fff", mb: 0.5,
            }}>
              Sugumar
            </Typography>
            <Box sx={{
              px: 2.5, py: 0.6, borderRadius: "100px",
              background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.28)",
              mt: 0.5,
            }}>
              <Typography sx={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.88)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Founder & Owner
              </Typography>
            </Box>

            {/* mini stat chips — flex row */}
            <Box sx={{ display: "flex", gap: 1, mt: 3, width: "100%" }}>
              {[
                { n: "8+",   label: "Years" },
                { n: "1000", label: "Sq. Ft." },
                { n: "2018", label: "Founded" },
              ].map((m, i) => (
                <Box key={i} sx={{
                  flex: 1,
                  borderRadius: 2.5,
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  py: 1.5, px: 0.5, textAlign: "center",
                }}>
                  <Typography sx={{
                    // fontFamily: "'Playfair Display', serif",
                    fontSize: { xs: "1.1rem", md: "1.35rem" }, fontWeight: 900, color: "#fff", lineHeight: 1,
                  }}>{m.n}</Typography>
                  <Typography sx={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.7)", fontWeight: 600, mt: 0.3 }}>{m.label}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Right — story content, fills remaining width */}
          <Box sx={{
            flex: 1,
            background: "#fff",
            p: { xs: 3.5, md: 5 },
            display: "flex", flexDirection: "column", justifyContent: "center",
          }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
              <Box sx={{ width: 5, height: 36, background: `linear-gradient(180deg, ${G}, ${G_D})`, borderRadius: 3 }} />
              <Typography sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 800, fontSize: { xs: "1.4rem", md: "1.75rem" }, color: TEXT,
              }}>
                The Man Behind SMVegMart
              </Typography>
            </Box>

            <Typography sx={{
              fontSize: { xs: "0.95rem", md: "1.02rem" }, color: MUTED, lineHeight: 1.9, mb: 3,
            }}>
              With over 8 years of hands-on experience in the vegetable business, Sugumar built
              SMVegMart from the ground up — rooted in the belief that every household deserves
              access to fresh, quality produce at fair prices.
            </Typography>

            {/* highlight bullets */}
            {[
              "Founded SMVegMart in January 2018 in Kirumampakkam, Puducherry",
              "Built a 1000 sq. ft. facility for proper storage, handling & distribution",
              "Forged strong direct relationships with local farmers and suppliers",
              "Committed to fair pricing, freshness, and community trust",
            ].map((pt, i) => (
              <Box key={i} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start", mb: i < 3 ? 1.5 : 0 }}>
                <Box sx={{
                  minWidth: 22, height: 22, borderRadius: "50%",
                  background: G_L, border: `1.5px solid ${G}40`,
                  display: "flex", alignItems: "center", justifyContent: "center", mt: 0.15,
                }}>
                  <CheckCircleIcon sx={{ fontSize: 14, color: G }} />
                </Box>
                <Typography sx={{ fontSize: { xs: "0.87rem", md: "0.93rem" }, color: MUTED, lineHeight: 1.65 }}>
                  {pt}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      {/* ══════════════════════════════════════
          CLOSING TAGLINE — full-bleed green strip
      ══════════════════════════════════════ */}
      <Box sx={{
        background: `linear-gradient(135deg, ${G_D}, ${G_DD})`,
        py: { xs: 6, md: 8 },
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <Box sx={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.05)", top: -100, left: -60, pointerEvents: "none" }} />
        <Box sx={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.06)", bottom: -60, right: 80, pointerEvents: "none" }} />
        <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
          <NatureIcon sx={{ fontSize: 52, color: "rgba(255,255,255,0.85)", mb: 2 }} />
          <Typography sx={{
            // fontFamily: "'Playfair Display', serif",
            fontSize: { xs: "1.55rem", md: "2rem" }, fontWeight: 800,
            color: "#fff", mb: 1.5, lineHeight: 1.3,
          }}>
            Healthy living starts with fresh food.
          </Typography>
          <Typography sx={{
            fontSize: { xs: "0.93rem", md: "1rem" },
            color: "rgba(255,255,255,0.78)", lineHeight: 1.8,
          }}>
            From our facility in Kirumampakkam, Puducherry — serving you fresh, every day.
          </Typography>
        </Container>
      </Box>

    </Box>
  );
}