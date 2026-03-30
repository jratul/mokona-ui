import * as React from "react";
import { Popover } from "../Popover/Popover";
import { Calendar } from "../Calendar/Calendar";
import { cn } from "../../utils/cn";

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  isError?: boolean;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  formatDate?: (date: Date) => string;
  className?: string;
}

function defaultFormat(date: Date) {
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const DatePicker = ({
  value,
  onChange,
  placeholder = "날짜를 선택하세요",
  label,
  helperText,
  errorMessage,
  isError,
  disabled,
  minDate,
  maxDate,
  formatDate = defaultFormat,
  className,
}: DatePickerProps) => {
  const [open, setOpen] = React.useState(false);
  const id = React.useId();
  const showError = isError && errorMessage;

  function handleSelect(date: Date) {
    onChange?.(date);
    setOpen(false);
  }

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label
          htmlFor={id}
          className="text-[14px] font-medium text-[var(--color-foreground)]"
        >
          {label}
        </label>
      )}

      <Popover
        open={open}
        onOpenChange={disabled ? undefined : setOpen}
        trigger={
          <button
            id={id}
            type="button"
            disabled={disabled}
            aria-invalid={isError}
            aria-haspopup="dialog"
            aria-expanded={open}
            className={cn(
              "flex h-12 w-full items-center justify-between rounded-xl px-4",
              "border border-[var(--color-border)] bg-[var(--color-background)] text-[16px]",
              "transition-colors duration-150 text-left",
              "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-0 focus:border-[var(--color-primary)]",
              open && "ring-2 ring-[var(--color-primary)] border-[var(--color-primary)]",
              isError && "border-[var(--color-negative)] focus:ring-[var(--color-negative)]",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              !value && "text-[var(--color-muted-foreground)]"
            )}
          >
            <span>{value ? formatDate(value) : placeholder}</span>
            <CalendarIcon className="shrink-0 text-[var(--color-muted-foreground)]" />
          </button>
        }
      >
        <Calendar
          value={value}
          onChange={handleSelect}
          minDate={minDate}
          maxDate={maxDate}
        />
      </Popover>

      {showError ? (
        <p role="alert" className="text-[13px] text-[var(--color-negative)]">
          {errorMessage}
        </p>
      ) : helperText ? (
        <p className="text-[13px] text-[var(--color-muted-foreground)]">{helperText}</p>
      ) : null}
    </div>
  );
};

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

export { DatePicker };
