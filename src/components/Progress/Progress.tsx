import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "../../utils/cn";

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "positive" | "negative" | "warning";
  showLabel?: boolean;
  /** 값(진행률) 자체를 아직 모를 때 — 트랙 전체가 줄무늬로 채워지고 value는 무시된다. */
  indeterminate?: boolean;
  /** 값은 알지만(determinate) 채워진 부분 안에서 줄무늬가 계속 움직이는 효과를 추가한다. */
  animated?: boolean;
}

const sizeMap = { sm: "h-1", md: "h-2", lg: "h-3" };
const colorMap = {
  primary: "bg-[var(--color-primary)]",
  positive: "bg-[var(--color-positive)]",
  negative: "bg-[var(--color-negative)]",
  warning: "bg-[var(--color-warning)]",
};

const stripeStyle: React.CSSProperties = {
  backgroundImage: `repeating-linear-gradient(
    -45deg,
    rgba(255,255,255,0) 0px,
    rgba(255,255,255,0) 10px,
    rgba(255,255,255,0.25) 10px,
    rgba(255,255,255,0.25) 20px
  )`,
  backgroundSize: "28px 28px",
  animation: "progress-stripe 0.5s linear infinite",
};

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      value = 0,
      size = "md",
      color = "primary",
      showLabel = false,
      indeterminate = false,
      animated = false,
      ...props
    },
    ref
  ) => (
    <div className="w-full flex flex-col gap-1.5">
      {showLabel && !indeterminate && (
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
        value={indeterminate ? undefined : value}
        {...props}
      >
        {indeterminate ? (
          <div className={cn("absolute inset-0 rounded-full", colorMap[color])} style={stripeStyle} />
        ) : (
          <ProgressPrimitive.Indicator
            className={cn("h-full rounded-full transition-all duration-500 ease-out", colorMap[color])}
            style={{
              width: `${Math.min(100, Math.max(0, value))}%`,
              ...(animated ? stripeStyle : {}),
            }}
          />
        )}
      </ProgressPrimitive.Root>
    </div>
  )
);
Progress.displayName = "Progress";

export { Progress };
