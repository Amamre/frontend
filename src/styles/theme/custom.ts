import {
  alphaColors,
  blur,
  borders,
  brandColors,
  colorPrimitives,
  gradients,
  layout,
  motion,
  opacity,
  radius,
  semanticSpacing,
  shadows,
  spacing,
  transitions,
  typographyTokens,
  zIndex,
} from "./tokens";

export const customThemeTokens = {
  colors: colorPrimitives,
  brandColors,
  alpha: alphaColors,
  spacing,
  semanticSpacing,
  radius,
  motion,
  transitions,
  shadows,
  borders,
  opacity,
  blur,
  layout,
  typography: typographyTokens,
  gradients,
  zIndex,
} as const;

export type CustomThemeTokens = typeof customThemeTokens;
