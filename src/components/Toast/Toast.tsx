import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const toastVariants = cva(
  [
    "flex items-center gap-3 w-full max-w-sm px-4 py-3.5 rounded-2xl shadow-lg",
    "text-[14px] font-medium",
    "data-[state=open]:animate-toast-in",
    "data-[state=closed]:animate-toast-out",
  ],
  {
    variants: {
      variant: {
        default: "bg-[var(--color-gray-800)] text-white",
        positive: "bg-[var(--color-positive)] text-white",
        negative: "bg-[var(--color-negative)] text-white",
        warning: "bg-[var(--color-warning)] text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>,
    VariantProps<typeof toastVariants> {
  description?: string;
  action?: React.ReactNode;
}

const ToastProvider = ToastPrimitive.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      "fixed bottom-0 left-1/2 -translate-x-1/2 z-[100]",
      "flex flex-col gap-2 p-5 w-full max-w-sm",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = "ToastViewport";

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  ToastProps
>(({ className, variant, description, action, children, ...props }, ref) => (
  <ToastPrimitive.Root
    ref={ref}
    className={cn(toastVariants({ variant }), className)}
    {...props}
  >
    <div className="flex-1 min-w-0">
      <ToastPrimitive.Title className="leading-snug">{children}</ToastPrimitive.Title>
      {description && (
        <ToastPrimitive.Description className="text-[12px] opacity-80 mt-0.5">
          {description}
        </ToastPrimitive.Description>
      )}
    </div>
    {action}
    <ToastPrimitive.Close className="shrink-0 opacity-70 hover:opacity-100 transition-opacity">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </ToastPrimitive.Close>
  </ToastPrimitive.Root>
));
Toast.displayName = "Toast";

export { ToastProvider, ToastViewport, Toast, toastVariants };
