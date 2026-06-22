import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as Label from "@radix-ui/react-label";
import { cn } from "../../utils/cn";

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { track: "h-6 w-10", thumb: "h-4 w-4 data-[state=checked]:translate-x-5", label: "text-[14px]", description: "text-[12px]" },
  md: { track: "h-7 w-12", thumb: "h-5 w-5 data-[state=checked]:translate-x-6", label: "text-[16px]", description: "text-[13px]" },
  lg: { track: "h-8 w-14", thumb: "h-6 w-6 data-[state=checked]:translate-x-7", label: "text-[18px]", description: "text-[14px]" },
};

const Toggle = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  ToggleProps
>(({ className, label, description, size = "md", id, ...props }, ref) => {
  const toggleId = id ?? React.useId();
  const { track, thumb, label: labelSize, description: descriptionSize } = sizeMap[size];

  return (
    <div className="flex items-center justify-between gap-4 w-full">
      {(label || description) && (
        <div className="flex flex-col gap-0.5">
          {label && (
            <Label.Root
              htmlFor={toggleId}
              className={cn(labelSize, "font-medium text-[var(--color-foreground)] cursor-pointer select-none")}
            >
              {label}
            </Label.Root>
          )}
          {description && (
            <p className={cn(descriptionSize, "text-[var(--color-muted-foreground)]")}>{description}</p>
          )}
        </div>
      )}
      <SwitchPrimitive.Root
        ref={ref}
        id={toggleId}
        className={cn(
          track,
          "relative inline-flex shrink-0 cursor-pointer rounded-full",
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
            thumb,
            "pointer-events-none block rounded-full bg-white shadow-md",
            "transition-transform duration-200 ease-in-out",
            "translate-x-1"
          )}
        />
      </SwitchPrimitive.Root>
    </div>
  );
});
Toggle.displayName = "Toggle";

export { Toggle };
