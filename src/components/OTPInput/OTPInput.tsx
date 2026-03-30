import * as React from "react";
import { cn } from "../../utils/cn";

export interface OTPInputProps {
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  masked?: boolean;
  disabled?: boolean;
  isError?: boolean;
  autoFocus?: boolean;
  className?: string;
}

const OTPInput = ({
  length = 6,
  value,
  defaultValue: defaultValueProp,
  onChange,
  onComplete,
  masked = false,
  disabled = false,
  isError = false,
  autoFocus = false,
  className,
}: OTPInputProps) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValueProp ?? "");
  const current = isControlled ? value : internalValue;

  const refs = React.useRef<(HTMLInputElement | null)[]>([]);

  const digits = Array.from({ length }, (_, i) => current[i] ?? "");

  function update(next: string) {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
    if (next.length === length) onComplete?.(next);
  }

  function handleChange(index: number, raw: string) {
    // 숫자만 허용
    const char = raw.replace(/\D/g, "").slice(-1);
    if (!char) return;

    const arr = digits.slice();
    arr[index] = char;
    const next = arr.join("");
    update(next);

    // 다음 셀로 포커스 이동
    if (index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      e.preventDefault();
      const arr = digits.slice();
      if (digits[index]) {
        // 현재 셀에 값 있으면 지우고 이전으로 이동
        arr[index] = "";
        update(arr.join(""));
        if (index > 0) refs.current[index - 1]?.focus();
      } else if (index > 0) {
        // 현재 셀 비어있으면 이전 셀 지우고 이동
        arr[index - 1] = "";
        update(arr.join(""));
        refs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      refs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    update(pasted.padEnd(length, "").slice(0, length).replace(/\s/g, ""));
    // 실제로는 붙여넣은 길이만큼 채우고 마지막 셀로 포커스
    const focusIndex = Math.min(pasted.length, length - 1);
    refs.current[focusIndex]?.focus();
  }

  return (
    <div className={cn("flex gap-3", className)}>
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          type={masked ? "password" : "text"}
          inputMode="numeric"
          maxLength={1}
          value={digit}
          disabled={disabled}
          autoFocus={autoFocus && i === 0}
          aria-label={`${i + 1}번째 입력`}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          className={cn(
            "h-14 w-12 rounded-2xl border-2 text-center text-[20px] font-semibold",
            "text-[var(--color-foreground)] bg-[var(--color-background)]",
            "transition-colors duration-150 outline-none",
            "caret-transparent select-none",
            isError
              ? "border-[var(--color-negative)] focus:border-[var(--color-negative)]"
              : [
                  "border-[var(--color-border)]",
                  "focus:border-[var(--color-primary)]",
                  digit && "border-[var(--color-primary)]",
                ],
            "disabled:opacity-40 disabled:cursor-not-allowed"
          )}
        />
      ))}
    </div>
  );
};

export { OTPInput };
