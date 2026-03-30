import * as React from "react";
import { motion } from "framer-motion";
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
  ({ className, variant, padding, interactive, onClick, children, ...props }, ref) => {
    if (interactive || onClick) {
      return (
        <motion.div
          ref={ref}
          className={cn(cardVariants({ variant, padding, interactive: true }), className)}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          onClick={onClick as React.MouseEventHandler<HTMLDivElement>}
          role={onClick ? "button" : undefined}
          tabIndex={onClick ? 0 : undefined}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, interactive }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

export { Card, cardVariants };
