"use client";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { alpha, Box, Menu, MenuItem, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { useReducedMotion } from "framer-motion";
import { useLocale } from "next-intl";
import {
  type MouseEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/locales";
import { useRouter } from "@/i18n/navigation";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import { brandColors, motion, transitions } from "@/styles/theme";

type LanguageOption = {
  code: Locale;
  label: string;
  shortLabel: string;
};

type LanguageSwitcherProps = {
  onLocaleChange?: () => void;
  variant?: "desktop" | "mobile";
};

const LANGUAGE_OPTIONS: readonly LanguageOption[] = [
  {
    code: "en-US",
    label: "English",
    shortLabel: "EN",
  },
  {
    code: "de-DE",
    label: "Deutsch",
    shortLabel: "DE",
  },
];

export default function LanguageSwitcher({
  onLocaleChange,
  variant = "desktop",
}: LanguageSwitcherProps) {
  const rawLocale = useLocale();
  const activeLocale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  const router = useRouter();

  const t = useTypedTranslations("common");

  const prefersReducedMotion = useReducedMotion();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const activeLanguage = useMemo(
    () =>
      LANGUAGE_OPTIONS.find((option) => option.code === activeLocale) ??
      LANGUAGE_OPTIONS[0],
    [activeLocale],
  );

    const switchLocale = (nextLocale: Locale) => {
          if (nextLocale === activeLocale) {
            return;
          }

      // biome-ignore lint/suspicious/noDocumentCookie: egal
      document.cookie = `locale=${nextLocale}; path=/; max-age=31536000`;
      handleClose();
      router.refresh();

          onLocaleChange?.();
    };

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isMobile = variant === "mobile";

  if (isMobile) {
    return (
      <Stack spacing={1.4}>
        <Typography sx={mobileLabelSx}>{t("language.label")}</Typography>

        <Stack spacing={0.75}>
          {LANGUAGE_OPTIONS.map((option) => {
            const active = option.code === activeLocale;

            return (
              <Box
                component="button"
                key={option.code}
                onClick={() => switchLocale(option.code)}
                sx={mobileLanguageButtonSx(active)}
                type="button"
              >
                <Typography sx={mobileLanguageTextSx(active)}>
                  {option.label}
                </Typography>

                {active ? <Box sx={activeIndicatorSx} /> : null}
              </Box>
            );
          })}
        </Stack>
      </Stack>
    );
  }

  return (
    <>
      <Box
        ref={triggerRef}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={t("language.aria")}
        component="button"
        data-testid="language-switcher-desktop"
        onClick={handleOpen}
        sx={desktopTriggerSx({
          open,
          prefersReducedMotion,
        })}
        type="button"
      >
        <Typography component="span" sx={triggerTextSx}>
          {activeLanguage.shortLabel}
        </Typography>

        <KeyboardArrowDownRoundedIcon
          sx={{
            fontSize: "0.95rem",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: prefersReducedMotion
              ? "none"
              : `transform ${motion.duration.hover} ${motion.easing.luxury}`,
          }}
        />
      </Box>

      <Menu
        anchorEl={anchorEl}
        disableScrollLock
        keepMounted
        onClose={handleClose}
        open={open}
        slotProps={{
          paper: {
            sx: menuPaperSx,
          },
        }}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
      >
        <Box sx={menuHeaderSx}>
          <Typography sx={menuEyebrowSx}>{t("language.label")}</Typography>
        </Box>

        {LANGUAGE_OPTIONS.map((option) => {
          const active = option.code === activeLocale;

          return (
            <MenuItem
              key={option.code}
              onClick={() => {
                switchLocale(option.code);
                handleClose();
              }}
              sx={menuItemSx(active)}
            >
              <Typography sx={menuItemTextSx(active)}>
                {option.label}
              </Typography>

              {active ? <Box sx={activeIndicatorSx} /> : null}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}

const desktopTriggerSx = ({
  open,
  prefersReducedMotion,
}: {
  open: boolean;
  prefersReducedMotion: boolean | null;
}): SxProps<Theme> => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 0.15,
  border: 0,
  borderRadius: "999px",
  p: 0,
  color: open ? brandColors.ivory : alpha(brandColors.ivory, 0.72),
  background: "transparent",
  cursor: "pointer",
  transition: prefersReducedMotion
    ? "none"
    : `
      color ${motion.duration.hover} ${motion.easing.luxury},
      opacity ${motion.duration.hover} ${motion.easing.luxury}
    `,
  "&:hover": {
    color: brandColors.ivory,
  },
  "&:focus-visible": {
    outline: `1px solid ${alpha(brandColors.goldSoft, 0.55)}`,
    outlineOffset: "6px",
  },
  "&:disabled": {
    opacity: 0.45,
    cursor: "wait",
  },
});

const triggerTextSx: SxProps<Theme> = {
  fontSize: "0.72rem",
  fontWeight: 700,
  letterSpacing: "0.14em",
  lineHeight: 1,
  textTransform: "uppercase",
};

const menuPaperSx: SxProps<Theme> = {
  mt: 1.5,
  minWidth: 220,
  overflow: "hidden",
  border: `1px solid ${alpha(brandColors.ivory, 0.06)}`,
  borderRadius: "18px",
  background:
    "linear-gradient(180deg, rgba(18,18,17,0.96), rgba(10,10,10,0.98))",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  boxShadow: "0 24px 80px rgba(0,0,0,0.52)",
  color: brandColors.ivory,
};

const menuHeaderSx: SxProps<Theme> = {
  px: 2,
  pt: 1.8,
  pb: 0.9,
};

const menuEyebrowSx: SxProps<Theme> = {
  color: alpha(brandColors.goldSoft, 0.72),
  fontSize: "0.64rem",
  fontWeight: 700,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
};

const menuItemSx = (active: boolean): SxProps<Theme> => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 2,
  minHeight: 52,
  px: 2,
  background: active ? "rgba(255,255,255,0.03)" : "transparent",
  transition: `
    background ${motion.duration.fast} ${transitions.ease},
    color ${motion.duration.fast} ${transitions.ease}
  `,
  "&:hover": {
    background: "rgba(255,255,255,0.045)",
  },
});

const menuItemTextSx = (active: boolean): SxProps<Theme> => ({
  color: active ? brandColors.ivory : alpha(brandColors.ivory, 0.72),
  fontSize: "0.92rem",
  fontWeight: 500,
  letterSpacing: "0.01em",
  lineHeight: 1,
});

const activeIndicatorSx: SxProps<Theme> = {
  width: 6,
  height: 6,
  borderRadius: "999px",
  background: alpha(brandColors.goldSoft, 0.9),
};

const mobileLabelSx: SxProps<Theme> = {
  color: alpha(brandColors.goldSoft, 0.72),
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
};

const mobileLanguageButtonSx = (active: boolean): SxProps<Theme> => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: 52,
  border: `1px solid ${
    active ? alpha(brandColors.goldSoft, 0.22) : alpha(brandColors.ivory, 0.08)
  }`,
  borderRadius: "14px",
  px: 1.4,
  background: active ? "rgba(216,198,165,0.04)" : "rgba(255,255,255,0.015)",
  cursor: "pointer",
  transition: `
    border-color ${motion.duration.fast} ${transitions.ease},
    background ${motion.duration.fast} ${transitions.ease}
  `,
  "&:hover": {
    borderColor: alpha(brandColors.goldSoft, 0.32),
    background: "rgba(255,255,255,0.03)",
  },
});

const mobileLanguageTextSx = (active: boolean): SxProps<Theme> => ({
  color: active ? brandColors.ivory : alpha(brandColors.ivory, 0.72),
  fontSize: "0.92rem",
  fontWeight: 500,
  letterSpacing: "0.01em",
});
