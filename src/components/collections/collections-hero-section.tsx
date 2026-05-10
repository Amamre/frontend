"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import { brandColors } from "@/styles/theme";

export function CollectionsHeroSection() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        borderBottom: `1px solid ${alpha(brandColors.ivory, 0.1)}`,
        background:
          `linear-gradient(118deg, ${alpha(brandColors.olive, 0.22)} 0%, transparent 38%), ` +
          `linear-gradient(180deg, ${alpha(brandColors.obsidian, 0.94)}, ${brandColors.obsidian})`,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          width: "min(100% - 32px, var(--container))",
          minHeight: { xs: "68svh", md: "76svh" },
          display: "grid",
          alignItems: "end",
          mx: "auto",
          py: { xs: 8, md: 12 },
        }}
      >
        <Stack
          component={motion.div}
          initial={{ opacity: 0, y: 24 }}
          spacing={{ xs: 3, md: 4 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-80px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Typography
            component="p"
            sx={{
              m: 0,
              color: alpha(brandColors.goldSoft, 0.9),
              fontSize: "0.72rem",
              fontWeight: 900,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
            }}
          >
            Three lineages
          </Typography>
          <Typography
            component="h1"
            sx={{
              maxWidth: 980,
              m: 0,
              color: brandColors.ivory,
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: {
                xs: "clamp(4.25rem, 20vw, 6.7rem)",
                md: "clamp(7rem, 13vw, 12.6rem)",
              },
              fontWeight: 500,
              letterSpacing: 0,
              lineHeight: { xs: 0.86, md: 0.82 },
            }}
          >
            Collections
          </Typography>
          <Typography
            sx={{
              maxWidth: 650,
              color: alpha(brandColors.ivory, 0.7),
              fontSize: { xs: "1rem", md: "1.16rem" },
              lineHeight: 1.8,
            }}
          >
            Each collection carries its own discipline: atelier outer layers,
            heritage rhythm, and essential foundations designed to move through
            a modern European wardrobe with restraint.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
