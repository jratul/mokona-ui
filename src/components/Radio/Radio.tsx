import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "../../utils/cn";

export interface RadioItem {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  items: RadioItem[];
  orientation?: "horizontal" | "vertical";
}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, items, orientation = "vertical", ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn(
      "flex gap-3",
      orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
      className
    )}
    {...props}
  >
    {items.map((item) => (
      <RadioItem key={item.value} item={item} />
    ))}
  </RadioGroupPrimitive.Root>
));
RadioGroup.displayName = "RadioGroup";

function RadioItem({ item }: { item: RadioItem }) {
  const id = React.useId();
  return (
    <div className={cn("flex items-start gap-2.5", item.disabled && "opacity-40")}>
      <RadioGroupPrimitive.Item
        id={id}
        value={item.value}
        disabled={item.disabled}
        className={cn(
          "mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 border-[var(--color-border)]",
          "transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
          "data-[state=checked]:border-[var(--color-primary)]",
          "disabled:cursor-not-allowed"
        )}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center w-full h-full relative">
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      <label htmlFor={id} className="flex flex-col gap-0.5 cursor-pointer select-none">
        <span className="text-[16px] text-[var(--color-foreground)]">{item.label}</span>
        {item.description && (
          <span className="text-[13px] text-[var(--color-muted-foreground)]">{item.description}</span>
        )}
      </label>
    </div>
  );
}

export { RadioGroup };
