"use client";

import CloseIcon from "@mui/icons-material/Close";
import {
  alpha,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { GDPR_SETTINGS } from "@/constants/config";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import {
  type CookieConsentCategories,
  type CookieConsentCategory,
  createCookieConsent,
  readCookieConsent,
  type StoredCookieConsent,
  writeCookieConsent,
} from "@/lib/consent";
import {
  brandColors,
  motion as motionTokens,
  transitions,
} from "@/styles/theme";
import Link from "next/link";

type CookieConsentContextValue = {
  acceptAll: () => void;
  consent: StoredCookieConsent | null;
  hasAnswered: boolean;
  hasConsent: (category: CookieConsentCategory) => boolean;
  openPreferences: () => void;
  rejectOptional: () => void;
  savePreferences: (categories: Partial<CookieConsentCategories>) => void;
};

type CookieConsentProviderProps = {
  children: React.ReactNode;
};

const COOKIE_CATEGORY_OPTIONS = [
  {
    category: "essential",
    titleKey: "categories.essential.title",
    bodyKey: "categories.essential.body",
  },
  {
    category: "analytics",
    titleKey: "categories.analytics.title",
    bodyKey: "categories.analytics.body",
  },
  {
    category: "marketing",
    titleKey: "categories.marketing.title",
    bodyKey: "categories.marketing.body",
  },
  {
    category: "preferences",
    titleKey: "categories.preferences.title",
    bodyKey: "categories.preferences.body",
  },
] as const;

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null,
);

export function CookieConsentProvider({
  children,
}: CookieConsentProviderProps) {
  const [consent, setConsent] = useState<StoredCookieConsent | null>(null);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [draft, setDraft] = useState<CookieConsentCategories>(
    () => createCookieConsent().categories,
  );

  useEffect(() => {
    if (!GDPR_SETTINGS.cookieConsent) {
      return;
    }

    const storedConsent = readCookieConsent();
    setConsent(storedConsent);
    setDraft(storedConsent?.categories ?? createCookieConsent().categories);
    setBannerVisible(!storedConsent);
  }, []);

  const persistConsent = useCallback(
    (categories: Partial<CookieConsentCategories>) => {
      const nextConsent = createCookieConsent(categories);
      writeCookieConsent(nextConsent);
      setConsent(nextConsent);
      setDraft(nextConsent.categories);
      setBannerVisible(false);
      setPreferencesOpen(false);
    },
    [],
  );

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      acceptAll: () =>
        persistConsent({
          analytics: true,
          marketing: true,
          preferences: true,
        }),
      consent,
      hasAnswered: Boolean(consent),
      hasConsent: (category) =>
        consent?.categories[category] ?? category === "essential",
      openPreferences: () => {
        setDraft(consent?.categories ?? createCookieConsent().categories);
        setPreferencesOpen(true);
      },
      rejectOptional: () =>
        persistConsent({
          analytics: false,
          marketing: false,
          preferences: false,
        }),
      savePreferences: persistConsent,
    }),
    [consent, persistConsent],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      <LuxuryCookieConsent
        bannerVisible={bannerVisible}
        draft={draft}
        preferencesOpen={preferencesOpen}
        setDraft={setDraft}
        setPreferencesOpen={setPreferencesOpen}
      />
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const value = useContext(CookieConsentContext);

  if (!value) {
    throw new Error(
      "useCookieConsent must be used within CookieConsentProvider",
    );
  }

  return value;
}

function LuxuryCookieConsent({
  bannerVisible,
  draft,
  preferencesOpen,
  setDraft,
  setPreferencesOpen,
}: {
  bannerVisible: boolean;
  draft: CookieConsentCategories;
  preferencesOpen: boolean;
  setDraft: React.Dispatch<React.SetStateAction<CookieConsentCategories>>;
  setPreferencesOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const t = useTypedTranslations("cookies");
  const prefersReducedMotion = useReducedMotion();
  const {
    acceptAll,
    consent,
    openPreferences,
    rejectOptional,
    savePreferences,
  } = useCookieConsent();
  const showSettingsButton = Boolean(consent) && !bannerVisible;

  return (
    <>
      <AnimatePresence>
        {bannerVisible && !preferencesOpen ? (
          <Box
            component={motion.aside}
            aria-label={t("banner.aria")}
            data-testid="cookie-consent-banner"
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 18, filter: "blur(8px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 14, filter: "blur(6px)" }
            }
            transition={motionTokens.framer.reveal}
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
            <Box sx={bannerSurfaceSx}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 1.55, md: 2.75 }}
                sx={{
                  alignItems: { xs: "stretch", md: "center" },
                  justifyContent: "space-between",
                  p: { xs: "24px", md: "34px" },
                }}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Typography component="p" sx={eyebrowSx}>
                    {t("banner.eyebrow")}
                  </Typography>
                  <Typography sx={bannerBodySx}>{t("banner.body")}</Typography>
                </Box>

                <Stack direction="column" spacing={1} sx={bannerActionsSx}>
                  <Button
                    onClick={openPreferences}
                    sx={textButtonSx}
                    type="button"
                  >
                    {t("banner.manage")}
                  </Button>
                  <Button
                    onClick={rejectOptional}
                    sx={secondaryButtonSx}
                    type="button"
                  >
                    {t("banner.decline")}
                  </Button>
                  <Button
                    onClick={acceptAll}
                    sx={primaryButtonSx}
                    type="button"
                  >
                    {t("banner.accept")}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Box>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {showSettingsButton ? (
          <Box
            aria-label={t("settings.reopen")}
            component={motion.button}
            data-testid="cookie-settings-button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            onClick={openPreferences}
            transition={motionTokens.framer.reveal}
            sx={settingsButtonSx}
            type="button"
          >
            {t("settings.shortLabel")}
          </Box>
        ) : null}
      </AnimatePresence>

      <Dialog
        aria-describedby="cookie-settings-description"
        aria-labelledby="cookie-settings-title"
        fullWidth
        maxWidth="sm"
        onClose={() => setPreferencesOpen(false)}
        open={preferencesOpen}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.68)",
            },
          },
          paper: {
            sx: dialogPaperSx,
          },
        }}
      >
        <DialogTitle
          id="cookie-settings-title"
          sx={{
            p: { xs: "20px 20px 0", sm: "26px 28px 0" },
          }}
        >
          <Stack
            direction="row"
            sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
          >
            <Box>
              <Typography component="p" sx={eyebrowSx}>
                {t("settings.eyebrow")}
              </Typography>
              <Typography component="span" sx={dialogTitleTextSx}>
                {t("settings.title")}
              </Typography>
            </Box>
            <IconButton
              aria-label={t("settings.close")}
              onClick={() => setPreferencesOpen(false)}
              sx={dialogCloseSx}
              type="button"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent
          sx={{
            p: { xs: "14px 20px 20px", sm: "18px 28px 28px" },
          }}
        >
          <Typography id="cookie-settings-description" sx={dialogBodySx}>
            {t("settings.description")}
          </Typography>

          <Stack spacing={1.35} sx={{ mt: 2.6 }}>
            {COOKIE_CATEGORY_OPTIONS.map((option) => {
              const checked = draft[option.category];
              const disabled = option.category === "essential";

              return (
                <Box component="section" key={option.category} sx={categorySx}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={checked}
                        disabled={disabled}
                        slotProps={{
                          input: {
                            "aria-label": t(option.titleKey),
                          },
                        }}
                        onChange={(event) =>
                          setDraft((current) => ({
                            ...current,
                            [option.category]: event.target.checked,
                            essential: true,
                          }))
                        }
                      />
                    }
                    label={
                      <Box>
                        <Typography component="span" sx={categoryTitleSx}>
                          {t(option.titleKey)}
                        </Typography>
                        {disabled ? (
                          <Typography component="span" sx={alwaysActiveSx}>
                            {t("settings.alwaysActive")}
                          </Typography>
                        ) : null}
                        <Typography component="p" sx={categoryBodySx}>
                          {t(option.bodyKey)}
                        </Typography>
                      </Box>
                    }
                    labelPlacement="start"
                    sx={categoryControlSx}
                  />
                </Box>
              );
            })}
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            sx={{
              justifyContent: "flex-end",
              mt: 2.7,
            }}
          >
            <Button
              component={Link}
              href="/cookies"
              onClick={() => setPreferencesOpen(false)}
              sx={textButtonSx}
              type="button"
            >
              {t("settings.policy")}
            </Button>
            <Button
              onClick={rejectOptional}
              sx={secondaryButtonSx}
              type="button"
            >
              {t("banner.decline")}
            </Button>
            <Button
              onClick={() => savePreferences(draft)}
              sx={primaryButtonSx}
              type="button"
            >
              {t("settings.save")}
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}

const bannerSurfaceSx = {
  width: "min(100%, 560px)",
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
} as const;

const eyebrowSx = {
  m: { xs: "0 0 4px", sm: "0 0 7px" },
  color: "rgba(216, 198, 165, 0.88)",
  fontSize: "0.66rem",
  fontWeight: 700,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
} as const;

const bannerBodySx = {
  maxWidth: 440,
  color: "rgba(250, 248, 241, 0.82)",
  fontSize: { xs: "0.8rem", sm: "0.98rem" },
  lineHeight: 1.7,
} as const;

const bannerActionsSx = {
  flexWrap: "nowrap",
  justifyContent: { xs: "flex-start", md: "flex-end" },
  overflowX: "auto",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": { display: "none" },
} as const;

const buttonBaseSx = {
  minHeight: { xs: 34, sm: 52 },
  borderRadius: "16px",
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

const settingsButtonSx = {
  position: "fixed",
  bottom: { xs: 12, md: 18 },
  left: { xs: 12, md: 18 },
  zIndex: 1250,
  minHeight: 32,
  border: `1px solid ${alpha(brandColors.ivory, 0.12)}`,
  borderRadius: "999px",
  px: 1.4,
  color: alpha(brandColors.ivory, 0.62),
  background: "rgba(9, 9, 8, 0.7)",
  backdropFilter: "blur(12px)",
  fontSize: "0.62rem",
  fontWeight: 800,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  transition: `border-color 220ms ${transitions.ease}, color 220ms ${transitions.ease}, background 220ms ${transitions.ease}`,
  "&:hover": {
    borderColor: alpha(brandColors.goldSoft, 0.42),
    color: brandColors.goldSoft,
    background: "rgba(17, 16, 14, 0.86)",
  },
  "&:focus-visible": {
    outline: `1px solid ${alpha(brandColors.goldSoft, 0.72)}`,
    outlineOffset: "4px",
  },
} as const;

const dialogPaperSx = {
  overflow: "hidden",
  border: "1px solid rgba(216, 198, 165, 0.18)",
  borderRadius: "8px",
  color: brandColors.ivory,
  background:
    "linear-gradient(135deg, rgba(216, 198, 165, 0.08), transparent 42%), rgba(9, 9, 8, 0.98)",
  boxShadow: "0 28px 90px rgba(0, 0, 0, 0.58)",
} as const;

const dialogTitleTextSx = {
  display: "block",
  color: brandColors.ivory,
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: { xs: "1.45rem", sm: "1.8rem" },
  fontWeight: 500,
  letterSpacing: 0,
  lineHeight: 1.08,
} as const;

const dialogCloseSx = {
  width: 34,
  height: 34,
  border: `1px solid ${brandColors.border}`,
  color: alpha(brandColors.ivory, 0.72),
  background: "transparent",
  "&:hover": {
    borderColor: alpha(brandColors.goldSoft, 0.52),
    color: brandColors.goldSoft,
    background: "rgba(250, 248, 241, 0.045)",
  },
} as const;

const dialogBodySx = {
  maxWidth: 540,
  color: alpha(brandColors.ivory, 0.74),
  fontSize: "0.88rem",
  lineHeight: 1.68,
} as const;

const categorySx = {
  border: `1px solid ${brandColors.border}`,
  borderRadius: "8px",
  background: "rgba(250, 248, 241, 0.028)",
} as const;

const categoryControlSx = {
  display: "flex",
  width: "100%",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 2,
  m: 0,
  p: { xs: 1.45, sm: 1.75 },
  "& .MuiFormControlLabel-label": {
    flex: "1 1 auto",
  },
} as const;

const categoryTitleSx = {
  display: "inline-block",
  color: brandColors.ivory,
  fontSize: "0.88rem",
  fontWeight: 800,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
} as const;

const alwaysActiveSx = {
  display: "inline-block",
  ml: 1,
  color: alpha(brandColors.goldSoft, 0.72),
  fontSize: "0.64rem",
  fontWeight: 900,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
} as const;

const categoryBodySx = {
  m: "8px 0 0",
  color: alpha(brandColors.ivory, 0.62),
  fontSize: "0.82rem",
  lineHeight: 1.58,
} as const;
