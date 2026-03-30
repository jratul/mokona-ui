import * as React from "react";
import { cn } from "../../utils/cn";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
  lines?: number;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = "rectangular", width, height, lines = 1, style, ...props }, ref) => {
    const baseClass = cn(
      "animate-pulse bg-[var(--color-muted)] overflow-hidden relative",
      "before:absolute before:inset-0",
      "before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
      "before:animate-[shimmer_1.5s_infinite]",
      variant === "circular" && "rounded-full",
      variant === "text" && "rounded-md",
      variant === "rectangular" && "rounded-xl",
      className
    );

    if (variant === "text" && lines > 1) {
      return (
        <div ref={ref} className="flex flex-col gap-2" {...props}>
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className={baseClass}
              style={{
                width: i === lines - 1 ? "70%" : "100%",
                height: height ?? 16,
              }}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={baseClass}
        style={{ width, height: height ?? (variant === "text" ? 16 : undefined), ...style }}
        aria-hidden="true"
        {...props}
      />
    );
  }
);
Skeleton.displayName = "Skeleton";

export { Skeleton };
