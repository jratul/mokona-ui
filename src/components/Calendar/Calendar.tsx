import * as React from "react";
import { cn } from "../../utils/cn";

export interface CalendarProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
const MONTHS = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isDisabled(date: Date, min?: Date, max?: Date) {
  if (min && date < new Date(min.getFullYear(), min.getMonth(), min.getDate())) return true;
  if (max && date > new Date(max.getFullYear(), max.getMonth(), max.getDate())) return true;
  return false;
}

const Calendar = ({ value, defaultValue, onChange, minDate, maxDate, className }: CalendarProps) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(value ?? defaultValue);
  const [viewDate, setViewDate] = React.useState(() => {
    const d = value ?? defaultValue ?? new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  React.useEffect(() => {
    if (value !== undefined) setSelectedDate(value);
  }, [value]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [
    ...Array<null>(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  const today = new Date();

  function handleSelect(date: Date) {
    if (isDisabled(date, minDate, maxDate)) return;
    setSelectedDate(date);
    onChange?.(date);
  }

  function prevMonth() {
    setViewDate(new Date(year, month - 1, 1));
  }

  function nextMonth() {
    setViewDate(new Date(year, month + 1, 1));
  }

  return (
    <div className={cn("w-fit rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={prevMonth}
          aria-label="이전 달"
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg",
            "text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]",
            "transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          )}
        >
          <ChevronLeftIcon />
        </button>
        <span className="text-[15px] font-semibold text-[var(--color-foreground)]">
          {year}년 {MONTHS[month]}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          aria-label="다음 달"
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg",
            "text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]",
            "transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          )}
        >
          <ChevronRightIcon />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((day, i) => (
          <div
            key={day}
            className={cn(
              "flex h-8 items-center justify-center text-[12px] font-medium",
              i === 0 ? "text-[var(--color-negative)]" : i === 6 ? "text-[var(--color-primary)]" : "text-[var(--color-muted-foreground)]"
            )}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} />;

          const disabled = isDisabled(date, minDate, maxDate);
          const selected = selectedDate ? isSameDay(date, selectedDate) : false;
          const isToday = isSameDay(date, today);
          const dayOfWeek = date.getDay();

          return (
            <button
              key={date.toISOString()}
              type="button"
              onClick={() => handleSelect(date)}
              disabled={disabled}
              aria-label={`${year}년 ${month + 1}월 ${date.getDate()}일`}
              aria-pressed={selected}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-xl text-[14px] font-medium mx-auto",
                "transition-colors duration-100 select-none",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-1",
                "disabled:opacity-30 disabled:cursor-not-allowed",
                selected
                  ? "bg-[var(--color-primary)] text-white"
                  : isToday
                  ? "border border-[var(--color-primary)] text-[var(--color-primary)]"
                  : dayOfWeek === 0
                  ? "text-[var(--color-negative)] hover:bg-[var(--color-muted)]"
                  : dayOfWeek === 6
                  ? "text-[var(--color-primary)] hover:bg-[var(--color-muted)]"
                  : "text-[var(--color-foreground)] hover:bg-[var(--color-muted)]"
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export { Calendar };
