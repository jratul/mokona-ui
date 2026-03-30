import * as React from "react";
import { m, LazyMotion, domAnimation } from "../../utils/motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const spinnerVariants = cva("", {
  variants: {
    size: {
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
      xl: "w-12 h-12",
    },
    color: {
      primary: "text-[var(--color-primary)]",
      white: "text-white",
      muted: "text-[var(--color-muted-foreground)]",
    },
  },
  defaultVariants: {
    size: "md",
    color: "primary",
  },
});

export type SpinnerProps = VariantProps<typeof spinnerVariants> & {
  label?: string;
  className?: string;
};

function Spinner({ className, size, color, label = "로딩 중" }: SpinnerProps) {
  return (
    <LazyMotion features={domAnimation}>
      <m.svg
        className={cn(spinnerVariants({ size, color }), className)}
        viewBox="0 0 24 24"
        fill="none"
        aria-label={label}
        role="status"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="40 16"
          opacity="0.9"
        />
      </m.svg>
    </LazyMotion>
  );
}
Spinner.displayName = "Spinner";

export { Spinner };
