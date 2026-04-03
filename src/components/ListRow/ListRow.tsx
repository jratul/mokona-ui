import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../../utils/cn";

export interface ListRowProps {
  /** 왼쪽 아이콘/아바타 영역 */
  left?: React.ReactNode;
  /** 메인 타이틀 */
  title: string;
  /** 타이틀 아래 부제목 */
  subtitle?: string;
  /** 오른쪽 텍스트 (금액, 날짜 등) */
  rightLabel?: string;
  /** 오른쪽 텍스트 아래 보조 텍스트 */
  rightSubLabel?: string;
  /** 오른쪽 커스텀 영역 */
  right?: React.ReactNode;
  /** chevron 화살표 표시 여부 */
  chevron?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const ListRow = ({
  left,
  title,
  subtitle,
  rightLabel,
  rightSubLabel,
  right,
  chevron = false,
  onClick,
  disabled = false,
  className,
}: ListRowProps) => {
  const isClickable = !!onClick && !disabled;

  return (
    <div
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={isClickable ? onClick : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      className={cn(
        "flex items-center gap-3 px-5 py-4",
        isClickable && [
          "cursor-pointer",
          "hover:bg-[var(--color-muted)] active:bg-[var(--color-muted)]",
          "transition-colors duration-100",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-primary)]",
        ],
        disabled && "opacity-40 cursor-not-allowed",
        className
      )}
    >
      {/* left slot */}
      {left && <div className="flex-shrink-0">{left}</div>}

      {/* main content */}
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-medium text-[var(--color-foreground)] truncate">{title}</p>
        {subtitle && (
          <p className="text-[13px] text-[var(--color-muted-foreground)] truncate mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      {/* right slot */}
      {(rightLabel || rightSubLabel || right) && (
        <div className="flex-shrink-0 flex flex-col items-end gap-0.5">
          {right ?? (
            <>
              {rightLabel && (
                <span className="text-[15px] font-medium text-[var(--color-foreground)]">
                  {rightLabel}
                </span>
              )}
              {rightSubLabel && (
                <span className="text-[12px] text-[var(--color-muted-foreground)]">
                  {rightSubLabel}
                </span>
              )}
            </>
          )}
        </div>
      )}

      {/* chevron */}
      {chevron && (
        <ChevronRight
          size={18}
          className="flex-shrink-0 text-[var(--color-muted-foreground)]"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export { ListRow };
