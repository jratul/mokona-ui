import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "../../utils/cn";

export interface SearchFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
}

const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
  ({ className, value, onChange, onClear, placeholder = "검색", ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    const handleClear = () => {
      onChange?.("");
      onClear?.();
    };

    return (
      <div className={cn("relative flex items-center w-full", className)}>
        <Search
          className="absolute left-3.5 text-[var(--color-muted-foreground)] pointer-events-none"
          size={18}
          aria-hidden="true"
        />
        <input
          ref={ref}
          type="search"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            "w-full h-11 pl-10 pr-10 rounded-xl",
            "text-[15px] text-[var(--color-foreground)]",
            "bg-[var(--color-muted)] outline-none",
            "border-2 border-transparent",
            "placeholder:text-[var(--color-muted-foreground)]",
            "transition-colors duration-150",
            "focus:border-[var(--color-primary)] focus:bg-[var(--color-background)]",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            "[&::-webkit-search-cancel-button]:hidden"
          )}
          {...props}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 flex items-center justify-center w-5 h-5 rounded-full bg-[var(--color-muted-foreground)] opacity-50 hover:opacity-70 transition-opacity"
            aria-label="검색어 지우기"
          >
            <X size={12} color="white" strokeWidth={3} />
          </button>
        )}
      </div>
    );
  }
);
SearchField.displayName = "SearchField";

export { SearchField };
