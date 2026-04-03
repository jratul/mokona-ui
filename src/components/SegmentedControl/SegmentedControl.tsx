import * as React from "react";
import { m, LazyMotion, domAnimation } from "../../utils/motion";
import { cn } from "../../utils/cn";

export interface SegmentedControlItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  items: SegmentedControlItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: "sm" | "md";
  fullWidth?: boolean;
  className?: string;
}

const SegmentedControl = ({
  items,
  value: controlledValue,
  defaultValue,
  onChange,
  size = "md",
  fullWidth = false,
  className,
}: SegmentedControlProps) => {
  const [internalValue, setInternalValue] = React.useState(
    defaultValue ?? items[0]?.value ?? ""
  );
  const isControlled = controlledValue !== undefined;
  const activeValue = isControlled ? controlledValue : internalValue;

  const handleSelect = (val: string) => {
    if (!isControlled) setInternalValue(val);
    onChange?.(val);
  };

  const activeIndex = items.findIndex((item) => item.value === activeValue);

  return (
    <LazyMotion features={domAnimation}>
      <div
        role="tablist"
        className={cn(
          "relative flex items-center gap-1 p-1 rounded-xl bg-[var(--color-muted)]",
          fullWidth ? "w-full" : "inline-flex",
          className
        )}
      >
        {/* sliding pill */}
        {activeIndex >= 0 && (
          <m.div
            className="absolute top-1 bottom-1 rounded-lg bg-[var(--color-background)] shadow-sm"
            style={{ width: `calc((100% - 8px) / ${items.length} - 4px / ${items.length})` }}
            animate={{
              x: `calc(${activeIndex} * (100% + 4px))`,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
            aria-hidden="true"
          />
        )}

        {items.map((item) => (
          <button
            key={item.value}
            role="tab"
            aria-selected={item.value === activeValue}
            disabled={item.disabled}
            onClick={() => !item.disabled && handleSelect(item.value)}
            className={cn(
              "relative z-10 flex-1 rounded-lg font-medium transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
              "disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer",
              size === "sm" ? "h-7 text-[13px]" : "h-8 text-[14px]",
              item.value === activeValue
                ? "text-[var(--color-foreground)]"
                : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </LazyMotion>
  );
};

export { SegmentedControl };
