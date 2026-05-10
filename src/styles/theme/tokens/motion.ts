export const motion = {
  easing: {
    luxury: "cubic-bezier(0.22, 1, 0.36, 1)",
    easeInOutQuad: "cubic-bezier(0.4, 0, 0.2, 1)",
    easeOutQuad: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    easeInQuad: "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
    easeInOutCubic: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  },
  duration: {
    instant: "0.001ms",
    fast: "180ms",
    base: "220ms",
    hover: "240ms",
    calm: "320ms",
    reveal: "550ms",
    editorial: "720ms",
    cinematic: "740ms",
  },
  framer: {
    luxury: [0.22, 1, 0.36, 1],
    reveal: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
    cinematic: { duration: 0.74, ease: [0.22, 1, 0.36, 1] },
  },
} as const;
