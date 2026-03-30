export const shadows = {
  sm: "var(--shadow-sm)",
  md: "var(--shadow-md)",
  lg: "var(--shadow-lg)",
  overlay: "var(--shadow-overlay)",
} as const;

export type ShadowToken = keyof typeof shadows;
