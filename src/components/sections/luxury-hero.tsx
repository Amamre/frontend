"use client";

import { AppButton, AppContainer, Eyebrow } from "@/components/ui/Primitives";
import { CinematicBackground } from "@/components/video/cinematic-background";
import { BRAND } from "@/constants/config";
import { brandColors } from "@/styles/theme";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Stack, Typography } from "@mui/material";
import { MotionConfig, motion } from "framer-motion";

const heroTransition = {
  duration: 0.95,
  ease: [0.22, 1, 0.36, 1] as const,
};

const campaignNotes = [
  { label: "Atelier", value: "Satin-lined essentials" },
  { label: "Origin", value: "Stuttgart, DE" },
  { label: "Position", value: "Accessible premium" },
] as const;

export function LuxuryHero() {
  return (
    <MotionConfig reducedMotion="user">
      <Box
        component="section"
        sx={{
          position: "relative",
          minHeight: {
            xs: "calc(100svh - var(--header-height))",
            md: "calc(100svh - var(--header-height))",
          },
          overflow: "hidden",
          isolation: "isolate",
          background: brandColors.obsidian,
          "&::before": {
            position: "absolute",
            inset: 0,
            zIndex: -1,
            content: '""',
            background:
              "linear-gradient(90deg, rgba(9, 9, 8, 0.94) 0%, rgba(9, 9, 8, 0.68) 42%, rgba(9, 9, 8, 0.18) 100%), linear-gradient(0deg, rgba(9, 9, 8, 0.96) 0%, rgba(9, 9, 8, 0.18) 46%, rgba(9, 9, 8, 0.72) 100%)",
          },
          "&::after": {
            position: "absolute",
            inset: 0,
            zIndex: -1,
            pointerEvents: "none",
            content: '""',
            background:
              "linear-gradient(90deg, rgba(216, 198, 165, 0.08) 1px, transparent 1px), linear-gradient(180deg, rgba(250, 248, 241, 0.035), transparent 34%)",
            backgroundSize: "112px 100%, 100% 100%",
            opacity: 0.42,
            mixBlendMode: "screen",
          },
        }}
      >
        <CinematicBackground
          posterAlt="AMAMBRA cinematic Afro-European atelier campaign"
          posterSrc="/editorial/amambra-hero-campaign.png"
          videoSrc="/videos/amambra-atelier-loop.mp4"
        />

        <AppContainer
          sx={{
            display: "grid",
            minHeight: {
              xs: "calc(100svh - var(--header-height))",
              md: "calc(100svh - var(--header-height))",
            },
            gridTemplateRows: "1fr auto",
            gap: 4,
            py: { xs: "64px 34px", md: "88px 56px" },
          }}
        >
          <Box
            sx={{
              display: "grid",
              alignContent: "end",
              maxWidth: 980,
            }}
          >
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 22 }}
              transition={heroTransition}
            >
              <Eyebrow sx={{ color: "rgba(216, 198, 165, 0.9)" }}>
                {BRAND.location} / Afro-European Atelier
              </Eyebrow>
              <Typography
                component="h1"
                sx={{
                  m: 0,
                  maxWidth: 940,
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: { xs: "3.1rem", md: "5.4rem", lg: "6.75rem" },
                  fontWeight: 500,
                  letterSpacing: 0,
                  lineHeight: { xs: 0.96, md: 0.9 },
                  textWrap: "balance",
                }}
              >
                Quiet luxury, cut between cultures.
              </Typography>
            </motion.div>

            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 18 }}
              transition={{ ...heroTransition, delay: 0.12 }}
            >
              <Typography
                component="p"
                sx={{
                  mt: { xs: 2.75, md: 3.25 },
                  mb: 0,
                  maxWidth: 620,
                  color: "rgba(250, 248, 241, 0.76)",
                  fontSize: { xs: "1rem", md: "1.08rem" },
                  lineHeight: 1.72,
                }}
              >
                Afro-European streetwear from Stuttgart: satin-lined essentials
                and sculpted layers for a modern European wardrobe with a
                restrained African textile memory.
              </Typography>
            </motion.div>

            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 16 }}
              transition={{ ...heroTransition, delay: 0.22 }}
            >
              <Stack
                direction="row"
                spacing={1.35}
                sx={{ flexWrap: "wrap", mt: { xs: 3, md: 4 } }}
              >
                <AppButton href="/shop" variant="primary">
                  Enter the atelier <ArrowForwardIcon fontSize="small" />
                </AppButton>
                <AppButton href="/collections">View the edit</AppButton>
              </Stack>
            </motion.div>
          </Box>

          <Box
            aria-label="AMAMBRA campaign notes"
            component="dl"
            sx={{
              display: { xs: "none", sm: "grid" },
              width: "min(100%, 760px)",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "1px",
              m: 0,
              background: "rgba(250, 248, 241, 0.12)",
            }}
          >
            {campaignNotes.map((note, index) => (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 14 }}
                key={note.label}
                transition={{ ...heroTransition, delay: 0.34 + index * 0.06 }}
              >
                <Box
                  sx={{
                    minHeight: 96,
                    p: 2.25,
                    background: "rgba(9, 9, 8, 0.72)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Typography
                    component="dt"
                    sx={{
                      color: "rgba(216, 198, 165, 0.9)",
                      fontSize: "0.66rem",
                      fontWeight: 800,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                    }}
                  >
                    {note.label}
                  </Typography>
                  <Typography
                    component="dd"
                    sx={{
                      m: "8px 0 0",
                      color: "rgba(250, 248, 241, 0.82)",
                      fontSize: "0.86rem",
                      lineHeight: 1.45,
                    }}
                  >
                    {note.value}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </AppContainer>
      </Box>
    </MotionConfig>
  );
}
