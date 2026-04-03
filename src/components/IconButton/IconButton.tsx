import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { m, LazyMotion, domAnimation } from "../../utils/motion";
import { cn } from "../../utils/cn";

const iconButtonVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-xl transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-40",
    "select-none cursor-pointer flex-shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--color-primary)] text-white",
          "hover:bg-[var(--color-primary-hover)]",
          "focus-visible:ring-[var(--color-primary)]",
        ],
        secondary: [
          "bg-[var(--color-muted)] text-[var(--color-foreground)]",
          "hover:bg-[var(--color-gray-200)]",
        ],
        outline: [
          "border border-[var(--color-border)] bg-transparent text-[var(--color-foreground)]",
          "hover:bg-[var(--color-muted)]",
        ],
        ghost: [
          "bg-transparent text-[var(--color-foreground)]",
          "hover:bg-[var(--color-muted)]",
        ],
        danger: ["bg-[var(--color-negative)] text-white", "hover:opacity-90"],
      },
      size: {
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-12 h-12",
      },
      shape: {
        rounded: "rounded-xl",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
      shape: "rounded",
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
  "aria-label": string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, shape, asChild = false, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <LazyMotion features={domAnimation}>
        <m.div
          whileTap={{ scale: disabled ? 1 : 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          style={{ display: "inline-flex" }}
        >
          <Comp
            ref={ref}
            className={cn(iconButtonVariants({ variant, size, shape, className }))}
            disabled={disabled}
            {...props}
          />
        </m.div>
      </LazyMotion>
    );
  }
);
IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
