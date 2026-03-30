import * as React from "react";
import * as Label from "@radix-ui/react-label";
import { cn } from "../../utils/cn";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  isError?: boolean;
  showCount?: boolean;
  maxLength?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, label, helperText, errorMessage, isError, showCount, maxLength, id, value, onChange, ...props },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const hasError = isError || !!errorMessage;
    const [count, setCount] = React.useState(
      typeof value === "string" ? value.length : 0
    );

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCount(e.target.value.length);
      onChange?.(e);
    };

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
        <textarea
          ref={ref}
          id={inputId}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          className={cn(
            "w-full min-h-[100px] px-4 py-3 rounded-xl resize-none",
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
        <div className="flex justify-between items-start">
          <div>
            {hasError && errorMessage && (
              <p id={`${inputId}-error`} className="text-[12px] text-[var(--color-negative)]" role="alert">
                {errorMessage}
              </p>
            )}
            {!hasError && helperText && (
              <p id={`${inputId}-helper`} className="text-[12px] text-[var(--color-muted-foreground)]">
                {helperText}
              </p>
            )}
          </div>
          {showCount && maxLength && (
            <p className="text-[12px] text-[var(--color-muted-foreground)] shrink-0 ml-auto">
              {count}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
