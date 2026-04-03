import * as React from "react";
import { CheckCircle2, XCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "../../utils/cn";

export type ResultStatus = "success" | "error" | "warning" | "info";

export interface ResultProps {
  status: ResultStatus;
  title: string;
  description?: string;
  /** 아이콘 영역 커스텀 */
  icon?: React.ReactNode;
  /** 하단 액션 버튼/컴포넌트 */
  extra?: React.ReactNode;
  className?: string;
}

const statusConfig: Record<
  ResultStatus,
  { Icon: React.ElementType; color: string; bg: string }
> = {
  success: {
    Icon: CheckCircle2,
    color: "var(--color-positive)",
    bg: "var(--color-positive)",
  },
  error: {
    Icon: XCircle,
    color: "var(--color-negative)",
    bg: "var(--color-negative)",
  },
  warning: {
    Icon: AlertCircle,
    color: "var(--color-warning)",
    bg: "var(--color-warning)",
  },
  info: {
    Icon: Info,
    color: "var(--color-primary)",
    bg: "var(--color-primary)",
  },
};

const Result = ({ status, title, description, icon, extra, className }: ResultProps) => {
  const { Icon, color, bg } = statusConfig[status];

  return (
    <div className={cn("flex flex-col items-center text-center px-6 py-10", className)}>
      {/* icon */}
      <div
        className="mb-6 flex items-center justify-center w-20 h-20 rounded-full"
        style={{ backgroundColor: `color-mix(in srgb, ${bg} 12%, transparent)` }}
      >
        {icon ?? <Icon size={40} color={color} strokeWidth={1.5} />}
      </div>

      {/* text */}
      <h2 className="text-[20px] font-bold text-[var(--color-foreground)] leading-snug">
        {title}
      </h2>
      {description && (
        <p className="mt-2 text-[14px] text-[var(--color-muted-foreground)] leading-relaxed max-w-xs">
          {description}
        </p>
      )}

      {/* extra */}
      {extra && <div className="mt-8 w-full">{extra}</div>}
    </div>
  );
};

export { Result };
