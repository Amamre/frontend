import { brandColors } from "./colors";

export const gradients = {
  page:
    `linear-gradient(90deg, rgba(184, 149, 106, 0.045) 1px, transparent 1px), ` +
    `linear-gradient(180deg, rgba(79, 95, 63, 0.04), transparent 38rem), ${brandColors.obsidian}`,
  scanline: "linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px)",
  editorialCard:
    "linear-gradient(145deg, rgba(184, 149, 106, 0.14), transparent 44%), rgba(17, 16, 14, 0.86)",
  swatch:
    "radial-gradient(circle at 34% 24%, rgba(255, 255, 255, 0.42), transparent 30%), linear-gradient(145deg, rgba(255, 255, 255, 0.16), rgba(0, 0, 0, 0.28))",
} as const;
