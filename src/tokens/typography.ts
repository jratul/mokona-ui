export const typography = {
  display1: { fontSize: "28px", lineHeight: "1.3", fontWeight: 700 },
  title1: { fontSize: "22px", lineHeight: "1.4", fontWeight: 700 },
  title2: { fontSize: "20px", lineHeight: "1.4", fontWeight: 700 },
  title3: { fontSize: "18px", lineHeight: "1.4", fontWeight: 600 },
  body1: { fontSize: "16px", lineHeight: "1.5", fontWeight: 400 },
  body2: { fontSize: "14px", lineHeight: "1.5", fontWeight: 400 },
  caption1: { fontSize: "12px", lineHeight: "1.4", fontWeight: 400 },
} as const;

export type TypographyVariant = keyof typeof typography;
