import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "../../utils/cn";

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "positive" | "negative" | "warning";
  showLabel?: boolean;
}

const sizeMap = { sm: "h-1", md: "h-2", lg: "h-3" };
const colorMap = {
  primary: "bg-[var(--color-primary)]",
  positive: "bg-[var(--color-positive)]",
  negative: "bg-[var(--color-negative)]",
  warning: "bg-[var(--color-warning)]",
};

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, size = "md", color = "primary", showLabel = false, ...props }, ref) => (
  <div className="w-full flex flex-col gap-1.5">
    {showLabel && (
      <div className="flex justify-between text-[12px] text-[var(--color-muted-foreground)]">
        <span>진행률</span>
        <span>{Math.round(value)}%</span>
      </div>
    )}
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative w-full overflow-hidden rounded-full bg-[var(--color-muted)]",
        sizeMap[size],
        className
      )}
      value={value}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full transition-all duration-500 ease-out rounded-full",
          colorMap[color]
        )}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </ProgressPrimitive.Root>
  </div>
));
Progress.displayName = "Progress";

export { Progress };
