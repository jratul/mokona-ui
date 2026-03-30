import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  onRemove?: () => void;
}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, children, selected = false, onRemove, onClick, ...props }, ref) => (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full",
        "text-[14px] font-medium select-none",
        "border transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        selected
          ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-white"
          : "bg-[var(--color-background)] border-[var(--color-border)] text-[var(--color-foreground)] hover:bg-[var(--color-muted)]",
        className
      )}
      aria-pressed={selected}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="flex items-center justify-center w-4 h-4 rounded-full opacity-70 hover:opacity-100 transition-opacity"
          aria-label="제거"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
            <path d="M2 2L8 8M8 2L2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </motion.button>
  )
);
Chip.displayName = "Chip";

export { Chip };
