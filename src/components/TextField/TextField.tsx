import * as React from "react";
import * as Label from "@radix-ui/react-label";
import { cn } from "../../utils/cn";

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  isError?: boolean;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, label, helperText, errorMessage, isError, id, ...props }, ref) => {
    const inputId = id ?? React.useId();
    const hasError = isError || !!errorMessage;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <Label.Root
            htmlFor={inputId}
            className="text-[14px] font-semibold text-[var(--color-foreground)]"
          >
            {label}
          </Label.Root>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full h-12 px-4 rounded-xl",
            "text-[16px] text-[var(--color-foreground)]",
            "bg-[var(--color-muted)] outline-none",
            "border-2 border-transparent",
            "placeholder:text-[var(--color-muted-foreground)]",
            "transition-colors duration-150",
            "focus:border-[var(--color-primary)] focus:bg-[var(--color-background)]",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            hasError && "border-[var(--color-negative)] bg-[var(--color-background)]",
            className
          )}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
        {hasError && errorMessage && (
          <p
            id={`${inputId}-error`}
            className="text-[12px] text-[var(--color-negative)]"
            role="alert"
          >
            {errorMessage}
          </p>
        )}
        {!hasError && helperText && (
          <p
            id={`${inputId}-helper`}
            className="text-[12px] text-[var(--color-muted-foreground)]"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
TextField.displayName = "TextField";

export { TextField };
