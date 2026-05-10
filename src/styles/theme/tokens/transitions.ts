import { motion } from "./motion";

const luxury = motion.easing.luxury;

export const transitions = {
  ease: luxury,
  button: `transform 180ms ${luxury}, border-color 180ms ${luxury}, background 180ms ${luxury}, color 180ms ${luxury}`,
  iconButton: `transform 180ms ${luxury}, border-color 180ms ${luxury}, background 180ms ${luxury}`,
  productCard: `transform 240ms ${luxury}, border-color 240ms ${luxury}, box-shadow 240ms ${luxury}`,
  productImage: `transform 240ms ${luxury}`,
  underline: `transform 320ms ${luxury}`,
  opacityTransform: `opacity 220ms ${luxury}, transform 220ms ${luxury}`,
  borderShadowTransform: `border-color 220ms ${luxury}, box-shadow 220ms ${luxury}, transform 220ms ${luxury}`,
} as const;
