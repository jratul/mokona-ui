import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { m, LazyMotion, domAnimation } from "../../utils/motion";
import { cn } from "../../utils/cn";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center",
    "font-semibold rounded-xl",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-40",
    "select-none cursor-pointer",
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
        danger: [
          "bg-[var(--color-negative)] text-white",
          "hover:opacity-90",
        ],
      },
      size: {
        sm: "h-9 px-4 text-sm gap-1.5",
        md: "h-11 px-5 text-body1 gap-2",
        lg: "h-14 px-6 text-body1 gap-2",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <LazyMotion features={domAnimation}>
        <m.div
          whileTap={{ scale: disabled || loading ? 1 : 0.96 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          style={{ display: "inline-flex", width: fullWidth ? "100%" : undefined }}
        >
          <Comp
            ref={ref}
            className={cn(buttonVariants({ variant, size, fullWidth, className }))}
            disabled={disabled || loading}
            aria-disabled={disabled || loading}
            {...props}
          >
            {loading ? (
              <>
                <Spinner size={size === "sm" ? 14 : 16} />
                {children}
              </>
            ) : (
              children
            )}
          </Comp>
        </m.div>
      </LazyMotion>
    );
  }
);
Button.displayName = "Button";

function Spinner({ size = 16 }: { size?: number }) {
  return (
    <m.svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      aria-hidden="true"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="25 13"
        opacity="0.8"
      />
    </m.svg>
  );
}

export { Button, buttonVariants };
