import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "../../utils/cn";

export interface DropdownMenuItem {
  type?: "item" | "separator" | "label";
  label?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  destructive?: boolean;
  onSelect?: () => void;
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

const DropdownMenu = ({
  trigger,
  items,
  open,
  onOpenChange,
  align = "start",
  sideOffset = 6,
}: DropdownMenuProps) => (
  <DropdownMenuPrimitive.Root open={open} onOpenChange={onOpenChange}>
    <DropdownMenuPrimitive.Trigger asChild>{trigger}</DropdownMenuPrimitive.Trigger>

    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[180px] overflow-hidden rounded-2xl",
          "border border-[var(--color-border)] bg-[var(--color-background)] shadow-lg",
          "p-1.5",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
        )}
      >
        {items.map((item, i) => {
          if (item.type === "separator") {
            return (
              <DropdownMenuPrimitive.Separator
                key={i}
                className="my-1 h-px bg-[var(--color-border)]"
              />
            );
          }

          if (item.type === "label") {
            return (
              <DropdownMenuPrimitive.Label
                key={i}
                className="px-3 py-1.5 text-[12px] font-semibold text-[var(--color-muted-foreground)] select-none"
              >
                {item.label}
              </DropdownMenuPrimitive.Label>
            );
          }

          return (
            <DropdownMenuPrimitive.Item
              key={i}
              disabled={item.disabled}
              onSelect={item.onSelect}
              className={cn(
                "relative flex cursor-pointer select-none items-center gap-2.5 rounded-xl px-3 py-2.5",
                "text-[15px] outline-none transition-colors duration-100",
                "focus:bg-[var(--color-muted)] data-[highlighted]:bg-[var(--color-muted)]",
                item.destructive
                  ? "text-[var(--color-negative)]"
                  : "text-[var(--color-foreground)]",
                "data-[disabled]:opacity-40 data-[disabled]:pointer-events-none"
              )}
            >
              {item.icon && (
                <span className="shrink-0 text-[var(--color-muted-foreground)]">
                  {item.icon}
                </span>
              )}
              <span className="flex-1">{item.label}</span>
              {item.shortcut && (
                <span className="ml-auto text-[12px] text-[var(--color-muted-foreground)]">
                  {item.shortcut}
                </span>
              )}
            </DropdownMenuPrimitive.Item>
          );
        })}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  </DropdownMenuPrimitive.Root>
);

export { DropdownMenu };
