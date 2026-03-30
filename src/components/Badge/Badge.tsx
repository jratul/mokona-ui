import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const badgeVariants = cva(
  "inline-flex items-center justify-center font-semibold rounded-full select-none",
  {
    variants: {
      variant: {
        primary: "bg-[var(--color-primary)] text-white",
        positive: "bg-[var(--color-positive)] text-white",
        negative: "bg-[var(--color-negative)] text-white",
        warning: "bg-[var(--color-warning)] text-white",
        neutral: "bg-[var(--color-muted)] text-[var(--color-muted-foreground)]",
        outline: "border border-[var(--color-border)] text-[var(--color-foreground)] bg-transparent",
      },
      size: {
        sm: "text-[10px] px-1.5 h-4",
        md: "text-[12px] px-2 h-5",
        lg: "text-[13px] px-2.5 h-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
