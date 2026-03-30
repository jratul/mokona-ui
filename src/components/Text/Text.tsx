import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const textVariants = cva("", {
  variants: {
    variant: {
      display1: "text-[28px] leading-[1.3] font-bold",
      title1: "text-[22px] leading-[1.4] font-bold",
      title2: "text-[20px] leading-[1.4] font-bold",
      title3: "text-[18px] leading-[1.4] font-semibold",
      body1: "text-[16px] leading-[1.5] font-normal",
      body2: "text-[14px] leading-[1.5] font-normal",
      caption1: "text-[12px] leading-[1.4] font-normal",
    },
    color: {
      default: "text-[var(--color-foreground)]",
      muted: "text-[var(--color-muted-foreground)]",
      primary: "text-[var(--color-primary)]",
      positive: "text-[var(--color-positive)]",
      negative: "text-[var(--color-negative)]",
      warning: "text-[var(--color-warning)]",
    },
  },
  defaultVariants: {
    variant: "body1",
    color: "default",
  },
});

export type TextProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof textVariants> & {
    as?: React.ElementType;
  };

function Text({ className, variant, color, as, ...props }: TextProps) {
  const defaultTag: React.ElementType =
    variant === "display1" ? "h1"
    : variant === "title1" ? "h2"
    : variant === "title2" ? "h3"
    : variant === "title3" ? "h4"
    : variant === "caption1" ? "span"
    : "p";

  const Tag = as ?? defaultTag;

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag className={cn(textVariants({ variant, color, className }))} {...(props as any)} />
  );
}
Text.displayName = "Text";

export { Text, textVariants };
