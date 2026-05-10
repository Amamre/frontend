import type { SxProps, Theme } from "@mui/material/styles";
import { alphaColors, blur, borders } from "../tokens";

export const luxuryGlass: SxProps<Theme> = {
  border: borders.hairline,
  backgroundColor: alphaColors.iconSurface,
  backdropFilter: blur.glass,
  WebkitBackdropFilter: blur.glass,
};

export const railGlass: SxProps<Theme> = {
  border: "1px solid rgba(216, 198, 165, 0.18)",
  background: "rgba(9, 9, 8, 0.58)",
  backdropFilter: blur.rail,
  WebkitBackdropFilter: blur.rail,
};
