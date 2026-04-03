import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "../../utils/cn";

export interface RatingProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: "sm" | "md" | "lg";
  readOnly?: boolean;
  className?: string;
}

const sizeMap = { sm: 16, md: 22, lg: 30 };

const Rating = ({
  value: controlledValue,
  defaultValue = 0,
  onChange,
  max = 5,
  size = "md",
  readOnly = false,
  className,
}: RatingProps) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [hovered, setHovered] = React.useState(0);
  const isControlled = controlledValue !== undefined;
  const activeValue = isControlled ? controlledValue : internalValue;

  const iconSize = sizeMap[size];
  const gap = size === "sm" ? 2 : size === "md" ? 3 : 4;

  const handleClick = (val: number) => {
    if (readOnly) return;
    if (!isControlled) setInternalValue(val);
    onChange?.(val);
  };

  return (
    <div
      className={cn("inline-flex items-center", className)}
      style={{ gap }}
      role={readOnly ? "img" : "radiogroup"}
      aria-label={`${activeValue}점 / ${max}점`}
    >
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        const isFilled = (hovered || activeValue) >= starValue;

        return (
          <button
            key={i}
            type="button"
            role={readOnly ? undefined : "radio"}
            aria-checked={readOnly ? undefined : activeValue === starValue}
            aria-label={readOnly ? undefined : `${starValue}점`}
            disabled={readOnly}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => !readOnly && setHovered(starValue)}
            onMouseLeave={() => !readOnly && setHovered(0)}
            className={cn(
              "transition-transform duration-100",
              !readOnly && "hover:scale-110 cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded",
              readOnly && "cursor-default pointer-events-none"
            )}
          >
            <Star
              size={iconSize}
              fill={isFilled ? "var(--color-warning)" : "transparent"}
              color={isFilled ? "var(--color-warning)" : "var(--color-muted-foreground)"}
              strokeWidth={1.5}
            />
          </button>
        );
      })}
    </div>
  );
};

export { Rating };
