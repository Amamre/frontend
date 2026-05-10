"use client";

import { GDPR_SETTINGS } from "@/constants/config";
import { brandColors, transitions } from "@/styles/theme";
import { Box, Button, Stack, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import NextLink from "next/link";
import { useEffect, useState } from "react";

const CONSENT_KEY = "amambra-consent";
const CONSENT_VERSION = 1;
const DAY_IN_MS = 24 * 60 * 60 * 1000;

type StoredConsent = {
  analytics: boolean;
  essential: true;
  expiresAt: string;
  marketing: boolean;
  updatedAt: string;
  version: number;
};

export function LuxuryCookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!GDPR_SETTINGS.cookieConsent) {
      return;
    }

    setVisible(!hasStoredConsent());
  }, []);

  const chooseConsent = (analytics: boolean, marketing: boolean) => {
    const consent = createConsent(analytics, marketing);

    try {
      window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
      window.dispatchEvent(
        new CustomEvent("amambra:consent", { detail: consent }),
      );
    } catch {
      // Consent still dismisses for the current session if storage is blocked.
    }

    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible ? (
        <Box
          component={motion.aside}
          aria-label="Cookie consent"
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          sx={{
            position: "fixed",
            right: 0,
            bottom: { xs: 14, md: 24 },
            left: 0,
            zIndex: 1500,
            display: "flex",
            justifyContent: "center",
            px: { xs: 1.5, sm: 3 },
            pointerEvents: "none",
          }}
        >
          <Box
            sx={{
              width: "min(100%, 760px)",
              overflow: "hidden",
              border: "1px solid rgba(216, 198, 165, 0.2)",
              borderRadius: "8px",
              background:
                "linear-gradient(135deg, rgba(216, 198, 165, 0.085), transparent 42%), rgba(9, 9, 8, 0.9)",
              boxShadow:
                "0 24px 80px rgba(0, 0, 0, 0.42), 0 0 0 1px rgba(250, 248, 241, 0.035)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              pointerEvents: "auto",
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={{ xs: 1.55, md: 2.75 }}
              sx={{
                alignItems: { xs: "stretch", md: "center" },
                justifyContent: "space-between",
                p: { xs: "13px", sm: "18px 20px" },
              }}
            >
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  component="p"
                  sx={{
                    m: { xs: "0 0 4px", sm: "0 0 7px" },
                    color: "rgba(216, 198, 165, 0.88)",
                    fontSize: "0.66rem",
                    fontWeight: 900,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  Privacy
                </Typography>
                <Typography
                  sx={{
                    maxWidth: 390,
                    color: "rgba(250, 248, 241, 0.82)",
                    fontSize: { xs: "0.8rem", sm: "0.84rem" },
                    lineHeight: 1.48,
                  }}
                >
                  Essential cookies. Analytics only with consent.
                </Typography>
              </Box>

              <Stack
                direction="row"
                spacing={1}
                sx={{
                  flexWrap: "nowrap",
                  justifyContent: { xs: "flex-start", md: "flex-end" },
                  overflowX: "auto",
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": { display: "none" },
                }}
              >
                <Button
                  component={NextLink}
                  href="/cookies"
                  sx={textButtonSx}
                  type="button"
                >
                  Manage
                </Button>
                <Button
                  onClick={() => chooseConsent(false, false)}
                  sx={secondaryButtonSx}
                  type="button"
                >
                  Decline
                </Button>
                <Button
                  onClick={() => chooseConsent(true, true)}
                  sx={primaryButtonSx}
                  type="button"
                >
                  Accept
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Box>
      ) : null}
    </AnimatePresence>
  );
}

function hasStoredConsent() {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);

    if (!raw) {
      return false;
    }

    const consent = JSON.parse(raw) as Partial<StoredConsent>;
    const expiresAt = consent.expiresAt
      ? new Date(consent.expiresAt).getTime()
      : Number.NaN;

    if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
      window.localStorage.removeItem(CONSENT_KEY);
      return false;
    }

    return typeof consent.analytics === "boolean";
  } catch {
    return false;
  }
}

function createConsent(analytics: boolean, marketing: boolean): StoredConsent {
  const updatedAt = new Date();
  const expiresAt = new Date(
    updatedAt.getTime() + GDPR_SETTINGS.consentExpiryDays * DAY_IN_MS,
  );

  return {
    analytics,
    essential: true,
    expiresAt: expiresAt.toISOString(),
    marketing,
    updatedAt: updatedAt.toISOString(),
    version: CONSENT_VERSION,
  };
}

const buttonBaseSx = {
  minHeight: { xs: 34, sm: 38 },
  borderRadius: "999px",
  px: { xs: 1.35, sm: 2 },
  fontSize: { xs: "0.66rem", sm: "0.72rem" },
  fontWeight: 900,
  letterSpacing: "0.12em",
  lineHeight: 1,
  textTransform: "uppercase",
  transition: `border-color 220ms ${transitions.ease}, background 220ms ${transitions.ease}, color 220ms ${transitions.ease}, opacity 220ms ${transitions.ease}, transform 220ms ${transitions.ease}`,
  "&:hover": {
    transform: "translateY(-1px)",
  },
  "&:focus-visible": {
    outline: "none",
    boxShadow: "0 0 0 3px rgba(216, 198, 165, 0.18)",
  },
} as const;

const textButtonSx = {
  ...buttonBaseSx,
  color: "rgba(250, 248, 241, 0.68)",
  "&:hover": {
    ...buttonBaseSx["&:hover"],
    color: brandColors.ivory,
    background: "rgba(250, 248, 241, 0.045)",
  },
};

const secondaryButtonSx = {
  ...buttonBaseSx,
  border: `1px solid ${brandColors.border}`,
  color: "rgba(250, 248, 241, 0.78)",
  background: "rgba(250, 248, 241, 0.025)",
  "&:hover": {
    ...buttonBaseSx["&:hover"],
    borderColor: "rgba(216, 198, 165, 0.52)",
    background: "rgba(250, 248, 241, 0.055)",
  },
};

const primaryButtonSx = {
  ...buttonBaseSx,
  minWidth: { xs: 96, sm: 108 },
  border: "1px solid rgba(229, 210, 176, 0.84)",
  color: "#0b0b0a",
  background: "#e5d2b0",
  "&:hover": {
    ...buttonBaseSx["&:hover"],
    borderColor: "rgba(229, 210, 176, 1)",
    background: "#efdcbc",
  },
};
