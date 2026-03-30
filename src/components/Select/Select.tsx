import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "../../utils/cn";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  isError?: boolean;
  disabled?: boolean;
  className?: string;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      value,
      defaultValue,
      onValueChange,
      placeholder = "선택하세요",
      label,
      helperText,
      errorMessage,
      isError,
      disabled,
      className,
    },
    ref
  ) => {
    const id = React.useId();
    const showError = isError && errorMessage;

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        {label && (
          <label htmlFor={id} className="text-[14px] font-medium text-[var(--color-foreground)]">
            {label}
          </label>
        )}
        <SelectPrimitive.Root
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          disabled={disabled}
        >
          <SelectPrimitive.Trigger
            ref={ref}
            id={id}
            aria-invalid={isError}
            aria-describedby={showError ? `${id}-error` : helperText ? `${id}-helper` : undefined}
            className={cn(
              "flex h-12 w-full items-center justify-between rounded-xl px-4",
              "border border-[var(--color-border)] bg-[var(--color-input)] text-[16px]",
              "transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-0 focus:border-[var(--color-primary)]",
              "data-[placeholder]:text-[var(--color-muted-foreground)]",
              isError && "border-[var(--color-negative)] focus:ring-[var(--color-negative)]",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              "select-none"
            )}
          >
            <SelectPrimitive.Value placeholder={placeholder} />
            <SelectPrimitive.Icon className="ml-2 shrink-0 text-[var(--color-muted-foreground)]">
              <ChevronDownIcon />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>

          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              position="popper"
              sideOffset={6}
              className={cn(
                "relative z-50 min-w-[8rem] w-[var(--radix-select-trigger-width)] overflow-hidden",
                "rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg",
                "data-[state=open]:animate-in data-[state=closed]:animate-out",
                "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
              )}
            >
              <SelectPrimitive.Viewport className="p-1.5">
                {options.map((option) => (
                  <SelectPrimitive.Item
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className={cn(
                      "relative flex w-full cursor-pointer select-none items-center rounded-lg px-3 py-2.5",
                      "text-[15px] text-[var(--color-foreground)]",
                      "outline-none transition-colors duration-100",
                      "focus:bg-[var(--color-muted)] data-[highlighted]:bg-[var(--color-muted)]",
                      "data-[state=checked]:text-[var(--color-primary)] data-[state=checked]:font-medium",
                      "data-[disabled]:opacity-40 data-[disabled]:pointer-events-none"
                    )}
                  >
                    <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                    <SelectPrimitive.ItemIndicator className="ml-auto pl-2">
                      <CheckIcon />
                    </SelectPrimitive.ItemIndicator>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>

        {showError ? (
          <p id={`${id}-error`} role="alert" className="text-[13px] text-[var(--color-negative)]">
            {errorMessage}
          </p>
        ) : helperText ? (
          <p id={`${id}-helper`} className="text-[13px] text-[var(--color-muted-foreground)]">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);
Select.displayName = "Select";

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export { Select };
