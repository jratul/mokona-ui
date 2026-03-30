import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "../../utils/cn";

export interface AccordionItem {
  value: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: ((value: string) => void) & ((value: string[]) => void);
  collapsible?: boolean;
  className?: string;
}

const Accordion = ({
  items,
  type = "single",
  defaultValue,
  collapsible = true,
  className,
  ...props
}: AccordionProps) => {
  const rootProps =
    type === "single"
      ? {
          type: "single" as const,
          defaultValue: defaultValue as string | undefined,
          collapsible,
        }
      : {
          type: "multiple" as const,
          defaultValue: defaultValue as string[] | undefined,
        };

  return (
    <AccordionPrimitive.Root
      {...rootProps}
      className={cn("w-full divide-y divide-[var(--color-border)]", className)}
    >
      {items.map((item) => (
        <AccordionPrimitive.Item
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          className="group"
        >
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger
              className={cn(
                "flex w-full items-center justify-between py-4 px-0",
                "text-[15px] font-medium text-[var(--color-foreground)]",
                "transition-colors duration-150 text-left",
                "hover:text-[var(--color-primary)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 rounded-md",
                "disabled:opacity-40 disabled:cursor-not-allowed",
                "[&[data-state=open]>svg]:rotate-180"
              )}
            >
              <span className="flex-1 pr-4">{item.trigger}</span>
              <ChevronDownIcon className="shrink-0 text-[var(--color-muted-foreground)] transition-transform duration-200" />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content
            className={cn(
              "overflow-hidden text-[14px] text-[var(--color-muted-foreground)]",
              "data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
            )}
          >
            <div className="pb-4">{item.content}</div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
};

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export { Accordion };
