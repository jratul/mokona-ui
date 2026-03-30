import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as Label from "@radix-ui/react-label";
import { cn } from "../../utils/cn";

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label?: string;
  description?: string;
}

const Toggle = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  ToggleProps
>(({ className, label, description, id, ...props }, ref) => {
  const toggleId = id ?? React.useId();

  return (
    <div className="flex items-center justify-between gap-4 w-full">
      {(label || description) && (
        <div className="flex flex-col gap-0.5">
          {label && (
            <Label.Root
              htmlFor={toggleId}
              className="text-[16px] font-medium text-[var(--color-foreground)] cursor-pointer select-none"
            >
              {label}
            </Label.Root>
          )}
          {description && (
            <p className="text-[13px] text-[var(--color-muted-foreground)]">{description}</p>
          )}
        </div>
      )}
      <SwitchPrimitive.Root
        ref={ref}
        id={toggleId}
        className={cn(
          "relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full",
          "bg-[var(--color-gray-300)]",
          "transition-colors duration-200 ease-in-out",
          "data-[state=checked]:bg-[var(--color-primary)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-md",
            "transition-transform duration-200 ease-in-out",
            "translate-x-1",
            "data-[state=checked]:translate-x-6"
          )}
        />
      </SwitchPrimitive.Root>
    </div>
  );
});
Toggle.displayName = "Toggle";

export { Toggle };
