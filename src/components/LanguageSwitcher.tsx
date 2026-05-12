"use client";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import {
  alpha,
  Box,
  Divider,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { type MouseEvent, useMemo, useState, useTransition } from "react";
import {
  LOCALE_COOKIE_MAX_AGE,
  LOCALE_COOKIE_NAME,
  LOCALE_COOKIE_PATH,
} from "@/constants/cookie";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/locales";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import { setCookie } from "@/lib/cookies";
import { brandColors, motion } from "@/styles/theme";

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
    code: "en",
    label: "English",
    shortLabel: "EN",
  },
  {
    code: "de",
    label: "Deutsch",
    shortLabel: "DE",
  },
] as const;

export default function LanguageSwitcher({
  onLocaleChange,
  variant = "desktop",
}: LanguageSwitcherProps) {
  const rawLocale = useLocale();

  const activeLocale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  const router = useRouter();

  const t = useTypedTranslations("common");

  const prefersReducedMotion = useReducedMotion();

  const [pending, startTransition] = useTransition();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const activeLanguage = useMemo(
    () =>
      LANGUAGE_OPTIONS.find((option) => option.code === activeLocale) ??
      LANGUAGE_OPTIONS[0],
    [activeLocale],
  );

  const switchLocale = (nextLocale: Locale) => {
    if (nextLocale === activeLocale || pending) {
      return;
    }

    startTransition(() => {
      setCookie(LOCALE_COOKIE_NAME, nextLocale, {
        path: LOCALE_COOKIE_PATH,
        maxAge: LOCALE_COOKIE_MAX_AGE,
      });

      router.refresh();

      onLocaleChange?.();
    });
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
      <Stack spacing={1.6}>
        <Typography sx={mobileLabelSx}>{t("language.label")}</Typography>

        <Stack divider={<Divider sx={mobileDividerSx} />}>
          {LANGUAGE_OPTIONS.map((option) => {
            const active = option.code === activeLocale;

            return (
              <Box
                aria-pressed={active}
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
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={t("language.aria")}
        component="button"
        data-testid="language-switcher-desktop"
        disabled={pending}
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
            fontSize: "0.78rem",
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
        onClose={handleClose}
        open={open}
        slotProps={{
          paper: {
            sx: menuPaperSx,
          },
          list: {
            role: "menu",
            sx: {
              p: 0,
            },
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

        <Divider sx={menuDividerSx} />

        {LANGUAGE_OPTIONS.map((option) => {
          const active = option.code === activeLocale;

          return (
            <MenuItem
              key={option.code}
              onClick={() => {
                switchLocale(option.code);
                handleClose();
              }}
              role="menuitem"
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
  gap: 0.35,
  minHeight: 34,
  border: 0,
  borderRadius: "999px",
  px: 1,
  py: 0.55,
  color: open ? brandColors.ivory : alpha(brandColors.ivory, 0.68),
  background: open ? "rgba(255,255,255,0.035)" : "rgba(255,255,255,0.018)",
  cursor: "pointer",
  transition: prefersReducedMotion
    ? "none"
    : `
      background ${motion.duration.fast} ${motion.easing.luxury},
      color ${motion.duration.fast} ${motion.easing.luxury},
      opacity ${motion.duration.fast} ${motion.easing.luxury}
    `,
  "&:hover": {
    color: brandColors.ivory,
    background: "rgba(255,255,255,0.03)",
  },
  "&:focus-visible": {
    outline: `1px solid ${alpha(brandColors.goldSoft, 0.55)}`,
    outlineOffset: "4px",
  },
  "&:disabled": {
    opacity: 0.42,
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
  mt: 1.25,
  minWidth: 180,
  overflow: "hidden",
  border: `1px solid ${alpha(brandColors.ivory, 0.05)}`,
  borderRadius: "24px",
  background:
    "linear-gradient(180deg, rgba(17,17,16,0.96), rgba(10,10,10,0.985))",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  boxShadow: "0 24px 80px rgba(0,0,0,0.52)",
  color: brandColors.ivory,
};

const menuHeaderSx: SxProps<Theme> = {
  px: 2,
  pt: 1.8,
  pb: 1,
};

const menuEyebrowSx: SxProps<Theme> = {
  color: alpha(brandColors.goldSoft, 0.68),
  fontSize: "0.64rem",
  fontWeight: 700,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
};

const menuDividerSx: SxProps<Theme> = {
  borderColor: alpha(brandColors.ivory, 0.05),
};

const menuItemSx = (active: boolean): SxProps<Theme> => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 2,
  minHeight: 54,
  px: 2,
  background: active ? "rgba(255,255,255,0.02)" : "transparent",
  transition: `
    background ${motion.duration.fast} ${motion.easing.luxury},
    color ${motion.duration.fast} ${motion.easing.luxury}
  `,
  "&:hover": {
    background: "rgba(255,255,255,0.028)",
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
  background: alpha(brandColors.goldSoft, 0.88),
};

const mobileLabelSx: SxProps<Theme> = {
  color: alpha(brandColors.goldSoft, 0.72),
  fontSize: "0.68rem",
  fontWeight: 700,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
};

const mobileDividerSx: SxProps<Theme> = {
  borderColor: alpha(brandColors.ivory, 0.06),
};

const mobileLanguageButtonSx = (active: boolean): SxProps<Theme> => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: 54,
  border: 0,
  px: 0,
  py: 1.2,
  color: active ? brandColors.ivory : alpha(brandColors.ivory, 0.72),
  background: "transparent",
  cursor: "pointer",
  transition: `
    color ${motion.duration.fast} ${motion.easing.luxury},
    opacity ${motion.duration.fast} ${motion.easing.luxury}
  `,
  "&:hover": {
    color: brandColors.ivory,
  },
});

const mobileLanguageTextSx = (active: boolean): SxProps<Theme> => ({
  color: active ? brandColors.ivory : alpha(brandColors.ivory, 0.72),
  fontSize: "0.98rem",
  fontWeight: 500,
  letterSpacing: "0.01em",
  lineHeight: 1,
});
