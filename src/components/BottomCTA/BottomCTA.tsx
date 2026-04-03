import * as React from "react";
import { cn } from "../../utils/cn";

export interface BottomCTAProps {
  /** 단일 버튼 or 주요 버튼 */
  primaryLabel: string;
  onPrimary?: () => void;
  primaryDisabled?: boolean;
  /** 보조 버튼 (없으면 단일 레이아웃) */
  secondaryLabel?: string;
  onSecondary?: () => void;
  secondaryDisabled?: boolean;
  /** 고정 위치 (fixed bottom) 여부 */
  fixed?: boolean;
  className?: string;
}

const BottomCTA = ({
  primaryLabel,
  onPrimary,
  primaryDisabled,
  secondaryLabel,
  onSecondary,
  secondaryDisabled,
  fixed = false,
  className,
}: BottomCTAProps) => {
  const isDouble = !!secondaryLabel;

  return (
    <div
      className={cn(
        "w-full bg-[var(--color-background)]",
        fixed && "fixed bottom-0 left-0 right-0 z-40",
        // safe area for mobile
        "pb-[env(safe-area-inset-bottom)]",
        className
      )}
    >
      <div className={cn("px-5 py-3 flex gap-2", isDouble ? "flex-row" : "flex-col")}>
        {isDouble && (
          <button
            type="button"
            disabled={secondaryDisabled}
            onClick={onSecondary}
            className={cn(
              "flex-1 h-14 rounded-2xl font-semibold text-[16px]",
              "bg-[var(--color-muted)] text-[var(--color-foreground)]",
              "hover:bg-[var(--color-gray-200)] transition-colors duration-150",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border)]"
            )}
          >
            {secondaryLabel}
          </button>
        )}
        <button
          type="button"
          disabled={primaryDisabled}
          onClick={onPrimary}
          className={cn(
            isDouble ? "flex-[2]" : "w-full",
            "h-14 rounded-2xl font-semibold text-[16px]",
            "bg-[var(--color-primary)] text-white",
            "hover:bg-[var(--color-primary-hover)] transition-colors duration-150",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          )}
        >
          {primaryLabel}
        </button>
      </div>
    </div>
  );
};

export { BottomCTA };
