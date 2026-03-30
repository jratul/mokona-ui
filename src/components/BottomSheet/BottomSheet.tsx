import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { m, LazyMotion, domAnimation, AnimatePresence } from "../../utils/motion";
import { cn } from "../../utils/cn";

export interface BottomSheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  trigger?: React.ReactNode;
}

function BottomSheet({
  open: openProp,
  onOpenChange,
  title,
  description,
  children,
  trigger,
}: BottomSheetProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : internalOpen;

  const handleOpenChange = (value: boolean) => {
    if (!isControlled) setInternalOpen(value);
    onOpenChange?.(value);
  };

  return (
    <LazyMotion features={domAnimation}>
      <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
        {trigger && (
          <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
        )}
        <AnimatePresence>
          {open && (
            <DialogPrimitive.Portal>
              <DialogPrimitive.Overlay asChild>
                <m.div
                  className="fixed inset-0 z-50 bg-[var(--color-overlay)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </DialogPrimitive.Overlay>
              <DialogPrimitive.Content asChild>
                <m.div
                  className={cn(
                    "fixed bottom-0 left-0 right-0 z-50",
                    "bg-[var(--color-background)] rounded-t-3xl",
                    "shadow-[var(--shadow-overlay)]",
                    "px-5 pb-safe"
                  )}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  drag="y"
                  dragConstraints={{ top: 0 }}
                  dragElastic={{ top: 0, bottom: 0.3 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.y > 80) handleOpenChange(false);
                  }}
                >
                  {/* 드래그 핸들 */}
                  <div className="flex justify-center pt-3 pb-4">
                    <div className="w-9 h-1 rounded-full bg-[var(--color-gray-300)]" />
                  </div>

                  {title && (
                    <DialogPrimitive.Title className="text-[18px] font-bold text-[var(--color-foreground)] mb-1">
                      {title}
                    </DialogPrimitive.Title>
                  )}
                  {description && (
                    <DialogPrimitive.Description className="text-[14px] text-[var(--color-muted-foreground)] mb-4">
                      {description}
                    </DialogPrimitive.Description>
                  )}
                  <div className="pb-8">{children}</div>
                </m.div>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          )}
        </AnimatePresence>
      </DialogPrimitive.Root>
    </LazyMotion>
  );
}

export { BottomSheet };
