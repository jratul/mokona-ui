export const spacing = {
  1: "var(--spacing-1)",   // 4px
  2: "var(--spacing-2)",   // 8px
  3: "var(--spacing-3)",   // 12px
  4: "var(--spacing-4)",   // 16px
  5: "var(--spacing-5)",   // 20px
  6: "var(--spacing-6)",   // 24px
  8: "var(--spacing-8)",   // 32px
  10: "var(--spacing-10)", // 40px
  12: "var(--spacing-12)", // 48px
  16: "var(--spacing-16)", // 64px
} as const;

export type SpacingToken = keyof typeof spacing;
