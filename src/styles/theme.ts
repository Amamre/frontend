import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import type { CSSProperties } from "react";

export const brandColors = {
  obsidian: "#090908",
  ink: "#11100e",
  charcoal: "#22211f",
  cocoa: "#574235",
  olive: "#4f5f3f",
  ivory: "#faf8f1",
  muted: "#c9c1b3",
  gold: "#b8956a",
  goldSoft: "#d8c6a5",
  border: "rgba(250, 248, 241, 0.12)",
  panel: "rgba(17, 16, 14, 0.86)",
  error: "#f2b8a0",
};

export const transitions = {
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
};

export const shadows = {
  soft: "0 24px 80px rgba(0, 0, 0, 0.32)",
};

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: brandColors.gold,
        dark: "#9d7e52",
        light: brandColors.goldSoft,
        contrastText: brandColors.obsidian,
      },
      secondary: {
        main: brandColors.olive,
        dark: "#4a5a3a",
        light: "#758a59",
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
        hover: "rgba(184, 149, 106, 0.08)",
        selected: "rgba(184, 149, 106, 0.12)",
      },
    },
    typography: {
      fontFamily: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "sans-serif",
      ].join(","),
      h1: {
        fontSize: "clamp(2.5rem, 8vw, 5rem)",
        fontWeight: 500,
        letterSpacing: 0,
        lineHeight: 1.1,
      },
      h2: {
        fontSize: "clamp(2rem, 6vw, 3.5rem)",
        fontWeight: 500,
        letterSpacing: 0,
        lineHeight: 1.15,
      },
      h3: {
        fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
        fontWeight: 500,
        letterSpacing: 0,
        lineHeight: 1.2,
      },
      h4: {
        fontSize: "1.5rem",
        fontWeight: 500,
        letterSpacing: 0,
        lineHeight: 1.3,
      },
      h5: {
        fontSize: "1.25rem",
        fontWeight: 500,
        letterSpacing: 0,
        lineHeight: 1.4,
      },
      h6: {
        fontSize: "1rem",
        fontWeight: 700,
        letterSpacing: 0,
        lineHeight: 1.5,
      },
      body1: {
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.6,
        letterSpacing: 0,
      },
      body2: {
        fontSize: "0.875rem",
        fontWeight: 400,
        lineHeight: 1.7,
        letterSpacing: 0,
      },
      button: {
        fontSize: "0.9rem",
        fontWeight: 700,
        letterSpacing: 0,
        textTransform: "none",
        lineHeight: 1.5,
      },
      caption: {
        fontSize: "0.75rem",
        fontWeight: 400,
        letterSpacing: 0,
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
            "--ticker-height": "32px",
            "--nav-height": "72px",
            "--header-height": "calc(var(--ticker-height) + var(--nav-height))",
            "--container": "1360px",
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
            background: `linear-gradient(90deg, rgba(184, 149, 106, 0.045) 1px, transparent 1px), linear-gradient(180deg, rgba(79, 95, 63, 0.04), transparent 38rem), ${brandColors.obsidian}`,
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
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px)",
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
              "--ticker-height": "30px",
              "--nav-height": "64px",
            },
          },
          "@media (prefers-reduced-motion: reduce)": {
            "*, *::before, *::after": {
              scrollBehavior: "auto",
              transitionDuration: "0.001ms",
              animationDuration: "0.001ms",
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
            minHeight: "46px",
            gap: "10px",
            borderRadius: "999px",
            textTransform: "none",
            fontWeight: 700,
            letterSpacing: 0,
            padding: "0 22px",
            fontSize: "0.9rem",
            transition:
              "transform 180ms cubic-bezier(0.22, 1, 0.36, 1), border-color 180ms cubic-bezier(0.22, 1, 0.36, 1), background 180ms cubic-bezier(0.22, 1, 0.36, 1), color 180ms cubic-bezier(0.22, 1, 0.36, 1)",
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
            backgroundColor: "rgba(250, 248, 241, 0.04)",
            "&:hover": {
              borderColor: "rgba(216, 198, 165, 0.72)",
              backgroundColor: "rgba(216, 198, 165, 0.1)",
            },
          },
          text: {
            color: brandColors.goldSoft,
            "&:hover": {
              backgroundColor: "rgba(184, 149, 106, 0.08)",
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            width: "42px",
            height: "42px",
            border: `1px solid ${brandColors.border}`,
            color: brandColors.ivory,
            backgroundColor: "rgba(9, 9, 8, 0.42)",
            transition:
              "transform 180ms cubic-bezier(0.22, 1, 0.36, 1), border-color 180ms cubic-bezier(0.22, 1, 0.36, 1), background 180ms cubic-bezier(0.22, 1, 0.36, 1)",
            "&:hover": {
              borderColor: "rgba(216, 198, 165, 0.7)",
              backgroundColor: "rgba(216, 198, 165, 0.12)",
              transform: "translateY(-1px)",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: `1px solid ${brandColors.border}`,
            borderRadius: "8px",
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
              backgroundColor: "rgba(250, 248, 241, 0.055)",
              color: brandColors.ivory,
              borderRadius: "8px",
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
              padding: "13px 14px",
              "&::placeholder": {
                color: brandColors.muted,
                opacity: 0.7,
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
            borderRadius: "8px",
            color: brandColors.ivory,
            backgroundColor: "rgba(250, 248, 241, 0.055)",
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
            borderRadius: "999px",
            border: "1px solid rgba(216, 198, 165, 0.32)",
            fontSize: "0.72rem",
            fontWeight: 800,
            textTransform: "uppercase",
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            border: `1px solid ${brandColors.border}`,
            borderRadius: "8px",
            background: "rgba(17, 16, 14, 0.82)",
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
            padding: "18px",
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
            borderTop: `1px solid ${brandColors.border}`,
            padding: "0 18px 18px",
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

export const spacing = {
  xs: "0.5rem",
  sm: "1rem",
  md: "1.5rem",
  lg: "2rem",
  xl: "3rem",
  "2xl": "4rem",
  "3xl": "6rem",
  "4xl": "8rem",
};

export const animations = {
  easeInOutQuad: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeOutQuad: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  easeInQuad: "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
  easeInOutCubic: "cubic-bezier(0.645, 0.045, 0.355, 1)",
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
