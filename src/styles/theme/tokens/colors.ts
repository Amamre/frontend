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
} as const;

export const colorPrimitives = {
  ...brandColors,
  primaryDark: "#9d7e52",
  secondaryDark: "#4a5a3a",
  secondaryLight: "#758a59",
  transparent: "transparent",
  white: "#ffffff",
  black: "#000000",
} as const;

export const alphaColors = {
  actionHover: "rgba(184, 149, 106, 0.08)",
  actionSelected: "rgba(184, 149, 106, 0.12)",
  buttonSubtle: "rgba(250, 248, 241, 0.04)",
  buttonHover: "rgba(216, 198, 165, 0.1)",
  iconSurface: "rgba(9, 9, 8, 0.42)",
  iconHover: "rgba(216, 198, 165, 0.12)",
  fieldSurface: "rgba(250, 248, 241, 0.055)",
  panelSoft: "rgba(17, 16, 14, 0.82)",
  panelTranslucent: "rgba(17, 16, 14, 0.72)",
  black32: "rgba(0, 0, 0, 0.32)",
  ivory34: "rgba(250, 248, 241, 0.34)",
  goldSoft32: "rgba(216, 198, 165, 0.32)",
  goldSoft45: "rgba(216, 198, 165, 0.45)",
  goldSoft70: "rgba(216, 198, 165, 0.7)",
  goldSoft72: "rgba(216, 198, 165, 0.72)",
} as const;
