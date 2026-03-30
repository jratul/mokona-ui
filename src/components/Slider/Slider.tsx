import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../../utils/cn";

export interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  label?: string;
  showValue?: boolean;
  formatValue?: (value: number) => string;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, label, showValue, formatValue, value, defaultValue, onValueChange, ...props }, ref) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState<number[]>(
    (defaultValue as number[]) ?? [0]
  );

  const currentValue = isControlled ? (value as number[]) : internalValue;

  const displayValue = formatValue
    ? currentValue.map(formatValue).join(" – ")
    : currentValue.join(" – ");

  function handleValueChange(next: number[]) {
    if (!isControlled) setInternalValue(next);
    onValueChange?.(next);
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="text-[14px] font-medium text-[var(--color-foreground)]">{label}</span>
          )}
          {showValue && (
            <span className="text-[14px] text-[var(--color-muted-foreground)] ml-auto">{displayValue}</span>
          )}
        </div>
      )}
      <SliderPrimitive.Root
        ref={ref}
        value={currentValue}
        onValueChange={handleValueChange}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          "data-[disabled]:opacity-40 data-[disabled]:cursor-not-allowed"
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-[var(--color-muted)]">
          <SliderPrimitive.Range className="absolute h-full bg-[var(--color-primary)]" />
        </SliderPrimitive.Track>
        {currentValue.map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className={cn(
              "block h-5 w-5 rounded-full border-2 border-[var(--color-primary)] bg-[var(--color-background)]",
              "shadow-sm transition-transform duration-100",
              "hover:scale-110 active:scale-95",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
            )}
          />
        ))}
      </SliderPrimitive.Root>
    </div>
  );
});
Slider.displayName = "Slider";

export { Slider };
