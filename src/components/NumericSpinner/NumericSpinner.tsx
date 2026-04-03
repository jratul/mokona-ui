import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "../../utils/cn";

export interface NumericSpinnerProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { btn: "w-7 h-7", text: "text-[14px] min-w-[28px]", icon: 14 },
  md: { btn: "w-9 h-9", text: "text-[16px] min-w-[36px]", icon: 16 },
  lg: { btn: "w-11 h-11", text: "text-[18px] min-w-[44px]", icon: 18 },
};

const NumericSpinner = ({
  value: controlledValue,
  defaultValue = 0,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  size = "md",
  disabled = false,
  className,
}: NumericSpinnerProps) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const update = (next: number) => {
    const clamped = Math.min(max, Math.max(min, next));
    if (!isControlled) setInternalValue(clamped);
    onChange?.(clamped);
  };

  const { btn, text, icon } = sizeMap[size];

  return (
    <div
      className={cn("inline-flex items-center gap-1", className)}
      role="group"
      aria-label="수량 조절"
    >
      <button
        type="button"
        aria-label="감소"
        disabled={disabled || value <= min}
        onClick={() => update(value - step)}
        className={cn(
          btn,
          "flex items-center justify-center rounded-full",
          "bg-[var(--color-muted)] text-[var(--color-foreground)]",
          "hover:bg-[var(--color-gray-200)] transition-colors duration-150",
          "disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
        )}
      >
        <Minus size={icon} strokeWidth={2.5} />
      </button>

      <span
        className={cn(
          text,
          "text-center font-semibold text-[var(--color-foreground)] select-none tabular-nums"
        )}
        aria-live="polite"
        aria-atomic="true"
      >
        {value}
      </span>

      <button
        type="button"
        aria-label="증가"
        disabled={disabled || value >= max}
        onClick={() => update(value + step)}
        className={cn(
          btn,
          "flex items-center justify-center rounded-full",
          "bg-[var(--color-muted)] text-[var(--color-foreground)]",
          "hover:bg-[var(--color-gray-200)] transition-colors duration-150",
          "disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
        )}
      >
        <Plus size={icon} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export { NumericSpinner };
