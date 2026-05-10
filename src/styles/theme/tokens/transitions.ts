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

  colors: `
    background-color ${motion.duration.fast} ${motion.easing.luxury},
    border-color ${motion.duration.fast} ${motion.easing.luxury},
    color ${motion.duration.fast} ${motion.easing.luxury}
  `,

  transform: `
    transform ${motion.duration.hover} ${motion.easing.luxury}
  `,

  opacity: `
    opacity ${motion.duration.fast} ${motion.easing.luxury}
  `,

  interactive: `
    transform ${motion.duration.fast} ${motion.easing.luxury},
    background-color ${motion.duration.fast} ${motion.easing.luxury},
    border-color ${motion.duration.fast} ${motion.easing.luxury},
    color ${motion.duration.fast} ${motion.easing.luxury}
  `,

  card: `
    transform ${motion.duration.hover} ${motion.easing.luxury},
    border-color ${motion.duration.hover} ${motion.easing.luxury},
    box-shadow ${motion.duration.hover} ${motion.easing.luxury}
  `,

  reveal: `
    opacity ${motion.duration.hover} ${motion.easing.luxury},
    transform ${motion.duration.hover} ${motion.easing.luxury}
  `,
} as const;