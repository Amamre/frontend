import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import type { CSSProperties } from "react";
import { customThemeTokens } from "./theme/custom";
import {
  alphaColors,
  borders,
  brandColors,
  gradients,
  layout,
  motion,
  opacity,
  radius,
  shadows,
  spacing as tokenSpacing,
  transitions,
  typographyTokens,
} from "./theme/tokens";

export * from "./theme/helpers";
export {
  alphaColors,
  blur,
  borders,
  brandColors,
  gradients,
  layout,
  motion,
  opacity,
  radius,
  semanticSpacing,
  shadows,
  transitions,
  typographyTokens,
  zIndex,
} from "./theme/tokens";

export const theme = responsiveFontSizes(
  createTheme({
    custom: customThemeTokens,
    palette: {
      mode: "dark",
      primary: {
        main: brandColors.gold,
        dark: customThemeTokens.colors.primaryDark,
        light: brandColors.goldSoft,
        contrastText: brandColors.obsidian,
      },
      secondary: {
        main: brandColors.olive,
        dark: customThemeTokens.colors.secondaryDark,
        light: customThemeTokens.colors.secondaryLight,
        contrastText: brandColors.ivory,
      },
      background: {
        default: brandColors.obsidian,
        paper: brandColors.ink,
      },
      text: {
        primary: brandColors.ivory,
        secondary: brandColors.muted,
      },
      divider: brandColors.border,
      error: {
        main: brandColors.error,
      },
      action: {
        hover: alphaColors.actionHover,
        selected: alphaColors.actionSelected,
      },
    },
    typography: {
      fontFamily: typographyTokens.fontFamily.body,
      h1: {
        fontSize: "clamp(2.5rem, 8vw, 5rem)",
        fontWeight: 500,
        letterSpacing: typographyTokens.tracking.none,
        lineHeight: 1.1,
      },
      h2: {
        fontSize: "clamp(2rem, 6vw, 3.5rem)",
        fontWeight: 500,
        letterSpacing: typographyTokens.tracking.none,
        lineHeight: 1.15,
      },
      h3: {
        fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
        fontWeight: 500,
        letterSpacing: typographyTokens.tracking.none,
        lineHeight: 1.2,
      },
      h4: {
        fontSize: "1.5rem",
        fontWeight: 500,
        letterSpacing: typographyTokens.tracking.none,
        lineHeight: 1.3,
      },
      h5: {
        fontSize: "1.25rem",
        fontWeight: 500,
        letterSpacing: typographyTokens.tracking.none,
        lineHeight: 1.4,
      },
      h6: {
        fontSize: "1rem",
        fontWeight: 700,
        letterSpacing: typographyTokens.tracking.none,
        lineHeight: 1.5,
      },
      body1: {
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.6,
        letterSpacing: typographyTokens.tracking.none,
      },
      body2: {
        fontSize: "0.875rem",
        fontWeight: 400,
        lineHeight: 1.7,
        letterSpacing: typographyTokens.tracking.none,
      },
      button: {
        fontSize: "0.9rem",
        fontWeight: 700,
        letterSpacing: typographyTokens.tracking.none,
        textTransform: "none",
        lineHeight: 1.5,
      },
      caption: {
        fontSize: "0.75rem",
        fontWeight: 400,
        letterSpacing: typographyTokens.tracking.none,
        lineHeight: 1.5,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ":root": {
            "--ticker-height": layout.cssVars.tickerHeight,
            "--nav-height": layout.cssVars.navHeight,
            "--header-height": layout.cssVars.headerHeight,
            "--container": layout.cssVars.container,
          },
          "*": {
            boxSizing: "border-box",
          },
          html: {
            minHeight: "100%",
            scrollBehavior: "smooth",
            colorScheme: "dark",
            background: brandColors.obsidian,
          },
          body: {
            minHeight: "100vh",
            margin: 0,
            overflowX: "hidden",
            color: brandColors.ivory,
            background: gradients.page,
            backgroundSize: "96px 96px, 100% 100%, 100% 100%",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            textRendering: "geometricPrecision",
          },
          "body::before": {
            position: "fixed",
            inset: 0,
            zIndex: -1,
            pointerEvents: "none",
            content: '""',
            backgroundImage: gradients.scanline,
            backgroundSize: "100% 4px",
            opacity: 0.18,
          },
          "button, input, select, textarea": {
            font: "inherit",
          },
          button: {
            cursor: "pointer",
          },
          "button:disabled": {
            cursor: "not-allowed",
          },
          a: {
            color: "inherit",
            textDecoration: "none",
          },
          img: {
            maxWidth: "100%",
          },
          "::selection": {
            color: brandColors.obsidian,
            background: brandColors.goldSoft,
          },
          ":focus-visible": {
            outline: `2px solid ${brandColors.gold}`,
            outlineOffset: "3px",
          },
          "@media (max-width: 680px)": {
            ":root": {
              "--ticker-height": layout.cssVars.tickerHeightMobile,
              "--nav-height": layout.cssVars.navHeightMobile,
            },
          },
          "@media (prefers-reduced-motion: reduce)": {
            "*, *::before, *::after": {
              scrollBehavior: "auto",
              transitionDuration: motion.duration.instant,
              animationDuration: motion.duration.instant,
              animationIterationCount: 1,
            },
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            minHeight: layout.controls.buttonMinHeight,
            gap: "10px",
            borderRadius: radius.button,
            textTransform: "none",
            fontWeight: 700,
            letterSpacing: 0,
            padding: "0 22px",
            fontSize: "0.9rem",
            transition: transitions.button,
            "&:hover": {
              transform: "translateY(-1px)",
            },
          },
          contained: {
            border: `1px solid ${brandColors.gold}`,
            backgroundColor: brandColors.goldSoft,
            color: brandColors.obsidian,
            "&:hover": {
              backgroundColor: brandColors.gold,
              color: brandColors.obsidian,
            },
          },
          outlined: {
            borderColor: brandColors.border,
            color: brandColors.ivory,
            backgroundColor: alphaColors.buttonSubtle,
            "&:hover": {
              borderColor: alphaColors.goldSoft72,
              backgroundColor: alphaColors.buttonHover,
            },
          },
          text: {
            color: brandColors.goldSoft,
            "&:hover": {
              backgroundColor: alphaColors.actionHover,
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            width: layout.controls.iconButton,
            height: layout.controls.iconButton,
            border: borders.hairline,
            color: brandColors.ivory,
            backgroundColor: alphaColors.iconSurface,
            transition: transitions.iconButton,
            "&:hover": {
              borderColor: alphaColors.goldSoft70,
              backgroundColor: alphaColors.iconHover,
              transform: "translateY(-1px)",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: borders.hairline,
            borderRadius: radius.card,
            backgroundColor: brandColors.panel,
            backgroundImage: "none",
            boxShadow: shadows.soft,
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: "outlined",
          fullWidth: true,
        },
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              backgroundColor: alphaColors.fieldSurface,
              color: brandColors.ivory,
              borderRadius: radius.sm,
              "& fieldset": {
                borderColor: brandColors.border,
              },
              "&:hover fieldset": {
                borderColor: brandColors.gold,
              },
              "&.Mui-focused fieldset": {
                borderColor: brandColors.gold,
              },
            },
            "& .MuiOutlinedInput-input": {
              color: brandColors.ivory,
              padding: tokenSpacing.field,
              "&::placeholder": {
                color: brandColors.muted,
                opacity: opacity.placeholder,
              },
            },
            "& .MuiInputLabel-root": {
              color: brandColors.muted,
              "&.Mui-focused": {
                color: brandColors.gold,
              },
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            borderRadius: radius.sm,
            color: brandColors.ivory,
            backgroundColor: alphaColors.fieldSurface,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: brandColors.border,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: brandColors.gold,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: "transparent",
            color: brandColors.goldSoft,
            borderRadius: radius.pill,
            border: borders.goldSoft,
            fontSize: "0.72rem",
            fontWeight: 800,
            textTransform: "uppercase",
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            border: borders.hairline,
            borderRadius: radius.card,
            background: alphaColors.panelSoft,
            backgroundImage: "none",
            boxShadow: "none",
            "&::before": {
              display: "none",
            },
            "&.Mui-expanded": {
              margin: 0,
            },
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            minHeight: "auto",
            padding: tokenSpacing.accordionSummary,
            fontWeight: 800,
            "&.Mui-expanded": {
              minHeight: "auto",
            },
          },
          content: {
            margin: 0,
            "&.Mui-expanded": {
              margin: 0,
            },
          },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: {
            borderTop: borders.hairline,
            padding: tokenSpacing.accordionDetails,
            color: brandColors.muted,
            lineHeight: 1.72,
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: brandColors.border,
            "&.Mui-checked": {
              color: brandColors.gold,
            },
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            color: brandColors.border,
            "&.Mui-checked": {
              color: brandColors.gold,
            },
          },
        },
      },
    },
  }),
);

export const spacing = tokenSpacing;

export const animations = {
  easeInOutQuad: motion.easing.easeInOutQuad,
  easeOutQuad: motion.easing.easeOutQuad,
  easeInQuad: motion.easing.easeInQuad,
  easeInOutCubic: motion.easing.easeInOutCubic,
};

export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

export const mixins = {
  hideScrollbar: {
    "-ms-overflow-style": "none",
    "scrollbar-width": "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  } as CSSProperties,

  flexCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as CSSProperties,

  flexBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  } as CSSProperties,

  absoluteCenter: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  } as CSSProperties,
};
