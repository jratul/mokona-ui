import * as React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { m, LazyMotion, domAnimation } from "../../utils/motion";
import { cn } from "../../utils/cn";

// ── Shared overlay & panel ─────────────────────────────────────────────────

function DialogOverlay() {
  return (
    <RadixDialog.Overlay asChild>
      <m.div
        className="fixed inset-0 z-50 bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
    </RadixDialog.Overlay>
  );
}

// ── AlertDialog ────────────────────────────────────────────────────────────

export interface AlertDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  onConfirm?: () => void;
  className?: string;
}

const AlertDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "확인",
  onConfirm,
  className,
}: AlertDialogProps) => (
  <LazyMotion features={domAnimation}>
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <DialogOverlay />
        <RadixDialog.Content asChild>
          <m.div
            className={cn(
              "fixed left-1/2 top-1/2 z-50 w-[calc(100%-48px)] max-w-sm -translate-x-1/2 -translate-y-1/2",
              "bg-[var(--color-background)] rounded-2xl p-6 shadow-xl",
              "focus:outline-none",
              className
            )}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <RadixDialog.Title className="text-[17px] font-bold text-[var(--color-foreground)] text-center">
              {title}
            </RadixDialog.Title>
            {description && (
              <RadixDialog.Description className="mt-2 text-[14px] text-[var(--color-muted-foreground)] text-center leading-relaxed">
                {description}
              </RadixDialog.Description>
            )}
            <div className="mt-6">
              <RadixDialog.Close asChild>
                <button
                  type="button"
                  onClick={onConfirm}
                  className={cn(
                    "w-full h-12 rounded-xl font-semibold text-[15px]",
                    "bg-[var(--color-primary)] text-white",
                    "hover:bg-[var(--color-primary-hover)] transition-colors duration-150",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                  )}
                >
                  {confirmLabel}
                </button>
              </RadixDialog.Close>
            </div>
          </m.div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  </LazyMotion>
);

// ── ConfirmDialog ──────────────────────────────────────────────────────────

export interface ConfirmDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  destructive?: boolean;
  className?: string;
}

const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "확인",
  cancelLabel = "취소",
  onConfirm,
  onCancel,
  destructive = false,
  className,
}: ConfirmDialogProps) => (
  <LazyMotion features={domAnimation}>
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <DialogOverlay />
        <RadixDialog.Content asChild>
          <m.div
            className={cn(
              "fixed left-1/2 top-1/2 z-50 w-[calc(100%-48px)] max-w-sm -translate-x-1/2 -translate-y-1/2",
              "bg-[var(--color-background)] rounded-2xl p-6 shadow-xl",
              "focus:outline-none",
              className
            )}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <RadixDialog.Title className="text-[17px] font-bold text-[var(--color-foreground)] text-center">
              {title}
            </RadixDialog.Title>
            {description && (
              <RadixDialog.Description className="mt-2 text-[14px] text-[var(--color-muted-foreground)] text-center leading-relaxed">
                {description}
              </RadixDialog.Description>
            )}
            <div className="mt-6 flex gap-2">
              <RadixDialog.Close asChild>
                <button
                  type="button"
                  onClick={onCancel}
                  className={cn(
                    "flex-1 h-12 rounded-xl font-semibold text-[15px]",
                    "bg-[var(--color-muted)] text-[var(--color-foreground)]",
                    "hover:bg-[var(--color-gray-200)] transition-colors duration-150",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border)]"
                  )}
                >
                  {cancelLabel}
                </button>
              </RadixDialog.Close>
              <RadixDialog.Close asChild>
                <button
                  type="button"
                  onClick={onConfirm}
                  className={cn(
                    "flex-1 h-12 rounded-xl font-semibold text-[15px]",
                    "transition-colors duration-150",
                    "focus-visible:outline-none focus-visible:ring-2",
                    destructive
                      ? "bg-[var(--color-negative)] text-white hover:opacity-90 focus-visible:ring-[var(--color-negative)]"
                      : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] focus-visible:ring-[var(--color-primary)]"
                  )}
                >
                  {confirmLabel}
                </button>
              </RadixDialog.Close>
            </div>
          </m.div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  </LazyMotion>
);

export { AlertDialog, ConfirmDialog };
