import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as Label from "@radix-ui/react-label";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, id, ...props }, ref) => {
  const checkboxId = id ?? React.useId();

  return (
    <div className="flex items-center gap-2.5">
      <CheckboxPrimitive.Root
        ref={ref}
        id={checkboxId}
        className={cn(
          "h-5 w-5 rounded-md shrink-0",
          "border-2 border-[var(--color-border)]",
          "bg-[var(--color-background)]",
          "transition-colors duration-150",
          "data-[state=checked]:bg-[var(--color-primary)] data-[state=checked]:border-[var(--color-primary)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center">
          <motion.svg
            width="11"
            height="8"
            viewBox="0 0 11 8"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <motion.path
              d="M1 3.5L4 6.5L10 1"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <Label.Root
          htmlFor={checkboxId}
          className="text-[16px] text-[var(--color-foreground)] cursor-pointer select-none"
        >
          {label}
        </Label.Root>
      )}
    </div>
  );
});
Checkbox.displayName = "Checkbox";

export { Checkbox };
