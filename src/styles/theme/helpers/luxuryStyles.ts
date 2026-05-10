import type { SxProps, Theme } from "@mui/material/styles";
import {
  alphaColors,
  borders,
  brandColors,
  gradients,
  radius,
  shadows,
  transitions,
  typographyTokens,
} from "../tokens";

export const mutedGoldBorder = borders.mutedGold;

export const editorialHeading: SxProps<Theme> = {
  m: 0,
  color: brandColors.ivory,
  fontFamily: typographyTokens.fontFamily.editorial,
  fontWeight: typographyTokens.weight.medium,
  letterSpacing: typographyTokens.tracking.none,
};

export const luxuryCard: SxProps<Theme> = {
  border: borders.hairline,
  borderRadius: radius.card,
  background: alphaColors.panelSoft,
  backgroundImage: "none",
  boxShadow: shadows.soft,
};

export const luxuryEditorialCard: SxProps<Theme> = {
  minHeight: 280,
  background: gradients.editorialCard,
  boxShadow: shadows.none,
};

export const luxuryHover: SxProps<Theme> = {
  transition: transitions.productCard,
  "&:hover": {
    borderColor: alphaColors.goldSoft45,
    boxShadow: shadows.soft,
    transform: "translateY(-4px)",
  },
};

export const luxuryButton: SxProps<Theme> = {
  minHeight: "46px",
  borderRadius: radius.button,
  transition: transitions.button,
};
