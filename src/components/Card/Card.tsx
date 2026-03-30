import * as React from "react";
import { m, LazyMotion, domAnimation } from "../../utils/motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const cardVariants = cva(
  "rounded-2xl bg-[var(--color-background)] overflow-hidden",
  {
    variants: {
      variant: {
        elevated: "shadow-[var(--shadow-md)]",
        outlined: "border border-[var(--color-border)]",
        filled: "bg-[var(--color-muted)]",
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-5",
        lg: "p-6",
      },
      interactive: {
        true: "cursor-pointer",
      },
    },
    defaultVariants: {
      variant: "elevated",
      padding: "md",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, interactive, onClick, children, style, id, "aria-label": ariaLabel }, ref) => {
    const isInteractive = interactive || !!onClick;

    return (
      <LazyMotion features={domAnimation}>
        <m.div
          ref={ref}
          id={id}
          aria-label={ariaLabel}
          style={style}
          className={cn(cardVariants({ variant, padding, interactive: isInteractive || undefined }), className)}
          whileTap={isInteractive ? { scale: 0.98 } : undefined}
          transition={isInteractive ? { type: "spring", stiffness: 400, damping: 20 } : undefined}
          onClick={onClick as React.MouseEventHandler<HTMLDivElement>}
          role={onClick ? "button" : undefined}
          tabIndex={onClick ? 0 : undefined}
        >
          {children}
        </m.div>
      </LazyMotion>
    );
  }
);
Card.displayName = "Card";

export { Card, cardVariants };
