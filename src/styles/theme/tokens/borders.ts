import { alphaColors, brandColors } from "./colors";

export const borders = {
  hairline: "1px solid rgba(250, 248, 241, 0.12)",
  hairlineIvory: "1px solid rgba(250, 248, 241, 0.34)",
  gold: `1px solid ${brandColors.gold}`,
  goldSoft: "1px solid rgba(216, 198, 165, 0.32)",
  mutedGold: `1px solid ${alphaColors.goldSoft32}`,
  transparent: "1px solid transparent",
} as const;
