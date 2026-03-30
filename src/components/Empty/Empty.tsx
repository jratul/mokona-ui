import * as React from "react";
import { cn } from "../../utils/cn";

export interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

const DefaultIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
    <circle cx="24" cy="24" r="20" stroke="var(--color-border)" strokeWidth="2" />
    <path d="M16 24h16M24 16v16" stroke="var(--color-border)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  ({ className, title = "데이터가 없습니다", description, icon, action, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col items-center justify-center gap-3 py-12 px-6 text-center", className)}
      {...props}
    >
      <div className="text-[var(--color-muted-foreground)]">
        {icon ?? <DefaultIcon />}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[16px] font-semibold text-[var(--color-foreground)]">{title}</p>
        {description && (
          <p className="text-[14px] text-[var(--color-muted-foreground)]">{description}</p>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
);
Empty.displayName = "Empty";

export { Empty };
