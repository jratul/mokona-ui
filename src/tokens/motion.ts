export const duration = {
  fast: "var(--duration-fast)",     // 100ms
  normal: "var(--duration-normal)", // 200ms
  slow: "var(--duration-slow)",     // 300ms
} as const;

export const easing = {
  in: "var(--ease-in)",
  out: "var(--ease-out)",
  inOut: "var(--ease-in-out)",
  spring: "var(--ease-spring)",
} as const;

export const motion = { duration, easing } as const;

export type DurationToken = keyof typeof duration;
export type EasingToken = keyof typeof easing;
