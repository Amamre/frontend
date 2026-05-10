"use client";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Stack, Typography } from "@mui/material";
import { MotionConfig, motion } from "framer-motion";
import { AppButton, AppContainer, Eyebrow } from "@/components/ui/Primitives";
import { CinematicBackground } from "@/components/video/cinematic-background";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import { brandColors } from "@/styles/theme";

const heroTransition = {
  duration: 0.95,
  ease: [0.22, 1, 0.36, 1] as const,
};

const campaignNotes = [
  { label: "campaignNotes.atelierLabel", value: "campaignNotes.atelierValue" },
  { label: "campaignNotes.originLabel", value: "campaignNotes.originValue" },
  {
    label: "campaignNotes.positionLabel",
    value: "campaignNotes.positionValue",
  },
] as const;

export function LuxuryHero() {
  const common = useTypedTranslations("common");
  const hero = useTypedTranslations("hero");

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
          posterAlt={hero("posterAlt")}
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
                {hero("eyebrow", { location: common("brand.location") })}
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
                {hero("headline")}
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
                {hero("body")}
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
                  {hero("actions.enterAtelier")}{" "}
                  <ArrowForwardIcon fontSize="small" />
                </AppButton>
                <AppButton href="/collections">
                  {hero("actions.viewEdit")}
                </AppButton>
              </Stack>
            </motion.div>
          </Box>

          <Box
            aria-label={hero("campaignNotesAria")}
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
                    {hero(note.label)}
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
                    {hero(note.value)}
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
