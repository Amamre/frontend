import type { SxProps, Theme } from "@mui/material/styles";

export const cinematicOverlay: SxProps<Theme> = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
};

export const fixedOverlay: SxProps<Theme> = {
  position: "fixed",
  inset: 0,
  pointerEvents: "none",
};
