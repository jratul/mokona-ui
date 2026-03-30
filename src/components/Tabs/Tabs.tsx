import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../utils/cn";

export interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  items: TabItem[];
  variant?: "line" | "pill";
}

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({ className, items, variant = "line", ...props }, ref) => (
  <TabsPrimitive.Root ref={ref} className={cn("w-full", className)} {...props}>
    <TabsPrimitive.List
      className={cn(
        "flex",
        variant === "line"
          ? "border-b border-[var(--color-border)] gap-0"
          : "gap-2 bg-[var(--color-muted)] rounded-xl p-1"
      )}
    >
      {items.map((item) => (
        <TabsPrimitive.Trigger
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          className={cn(
            "transition-colors duration-150 select-none outline-none",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            variant === "line"
              ? cn(
                  "px-4 py-3 text-[15px] font-medium text-[var(--color-muted-foreground)]",
                  "border-b-2 border-transparent -mb-px",
                  "hover:text-[var(--color-foreground)]",
                  "data-[state=active]:text-[var(--color-primary)] data-[state=active]:border-[var(--color-primary)]",
                  "focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 rounded-t-md"
                )
              : cn(
                  "flex-1 rounded-lg px-4 py-2 text-[14px] font-medium text-[var(--color-muted-foreground)]",
                  "hover:text-[var(--color-foreground)]",
                  "data-[state=active]:bg-[var(--color-surface)] data-[state=active]:text-[var(--color-foreground)] data-[state=active]:shadow-sm",
                  "focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
                )
          )}
        >
          {item.label}
        </TabsPrimitive.Trigger>
      ))}
    </TabsPrimitive.List>

    {items.map((item) => (
      <TabsPrimitive.Content
        key={item.value}
        value={item.value}
        className="mt-4 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 rounded-md"
      >
        {item.content}
      </TabsPrimitive.Content>
    ))}
  </TabsPrimitive.Root>
));
Tabs.displayName = "Tabs";

export { Tabs };
