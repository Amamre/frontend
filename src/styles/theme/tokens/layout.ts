export const layout = {
  cssVars: {
    tickerHeight: "32px",
    tickerHeightMobile: "30px",
    navHeight: "72px",
    navHeightMobile: "64px",
    headerHeight: "calc(var(--ticker-height) + var(--nav-height))",
    container: "1360px",
  },
  viewport: {
    full: "100vh",
    safeFull: "100svh",
  },
  zIndex: {
    background: -1,
    rail: 6,
    drawer: 35,
    mediaLayer: 2,
  },
  widths: {
    container: "var(--container)",
    full: "100%",
    fit: "fit-content",
    emptyState: 560,
    subhead: 680,
    displayHeading: 980,
  },
  controls: {
    iconButton: "42px",
    badge: "18px",
    swatch: "18px",
    buttonMinHeight: "46px",
  },
} as const;
