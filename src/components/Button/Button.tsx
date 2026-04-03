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
            className={cn(
              buttonVariants({ variant, size, fullWidth, className }),
              "relative overflow-hidden"
            )}
            disabled={disabled || loading}
            aria-disabled={disabled || loading}
            aria-busy={loading}
            {...props}
          >
            {/* 실제 컨텐츠 — loading 중에는 투명하게 숨김 (레이아웃 유지) */}
            <span
              className={cn(
                "inline-flex items-center gap-[inherit] transition-opacity duration-150",
                loading ? "opacity-0" : "opacity-100"
              )}
              aria-hidden={loading}
            >
              {children}
            </span>

            {/* loading 오버레이 + 도트 */}
            {loading && (
              <span className="absolute inset-0 flex items-center justify-center rounded-[inherit] bg-black/10">
                <ButtonDots size={size} />
              </span>
            )}
          </Comp>
        </m.div>
      </LazyMotion>
    );
  }
);
Button.displayName = "Button";

// ── 3-dot sequential loader ─────────────────────────────────────────────────
const dotSizeMap = { sm: 5, md: 6, lg: 7 };
const dotGapMap = { sm: 4, md: 5, lg: 6 };

function ButtonDots({ size }: { size?: "sm" | "md" | "lg" | null }) {
  const dotSize = dotSizeMap[size ?? "md"];
  const gap = dotGapMap[size ?? "md"];

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap }}>
      {[0, 1, 2].map((i) => (
        <m.span
          key={i}
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            backgroundColor: "currentColor",
            display: "inline-block",
            flexShrink: 0,
          }}
          animate={{ y: [0, -(dotSize * 0.8), 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
}

export { Button, buttonVariants };
