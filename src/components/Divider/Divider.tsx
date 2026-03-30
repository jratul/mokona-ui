import * as React from "react";
import { cn } from "../../utils/cn";

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
  spacing?: "none" | "sm" | "md" | "lg";
}

const spacingMap = {
  none: "",
  sm: "my-2",
  md: "my-4",
  lg: "my-6",
};

const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ className, orientation = "horizontal", spacing = "none", ...props }, ref) => {
    if (orientation === "vertical") {
      return (
        <div
          className={cn("inline-block w-px self-stretch bg-[var(--color-border)]", className)}
          role="separator"
          aria-orientation="vertical"
        />
      );
    }

    return (
      <hr
        ref={ref}
        className={cn(
          "border-none h-px bg-[var(--color-border)]",
          spacingMap[spacing],
          className
        )}
        {...props}
      />
    );
  }
);
Divider.displayName = "Divider";

export { Divider };
