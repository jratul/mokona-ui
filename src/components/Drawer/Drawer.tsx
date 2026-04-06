import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { m, LazyMotion, domAnimation, AnimatePresence } from "../../utils/motion";
import { cn } from "../../utils/cn";

export interface DrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: "left" | "right";
  title?: string;
  description?: string;
  children?: React.ReactNode;
  trigger?: React.ReactNode;
}

function Drawer({
  open: openProp,
  onOpenChange,
  side = "left",
  title,
  description,
  children,
  trigger,
}: DrawerProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : internalOpen;

  const handleOpenChange = (value: boolean) => {
    if (!isControlled) setInternalOpen(value);
    onOpenChange?.(value);
  };

  const isLeft = side === "left";

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
                    "fixed top-0 bottom-0 z-50 w-72",
                    "bg-[var(--color-background)]",
                    "shadow-[var(--shadow-overlay)]",
                    "flex flex-col",
                    isLeft ? "left-0 rounded-r-2xl" : "right-0 rounded-l-2xl"
                  )}
                  initial={{ x: isLeft ? "-100%" : "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: isLeft ? "-100%" : "100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  drag="x"
                  dragConstraints={isLeft ? { right: 0 } : { left: 0 }}
                  dragElastic={isLeft ? { right: 0, left: 0.3 } : { left: 0, right: 0.3 }}
                  onDragEnd={(_, info) => {
                    const threshold = 80;
                    if (isLeft && info.offset.x < -threshold) handleOpenChange(false);
                    if (!isLeft && info.offset.x > threshold) handleOpenChange(false);
                  }}
                >
                  {/* 헤더 */}
                  <div className="flex items-center justify-between px-5 pt-5 pb-4 shrink-0">
                    <div className="flex-1">
                      {title && (
                        <DialogPrimitive.Title className="text-[18px] font-bold text-[var(--color-foreground)]">
                          {title}
                        </DialogPrimitive.Title>
                      )}
                      {description && (
                        <DialogPrimitive.Description className="text-[14px] text-[var(--color-muted-foreground)] mt-1">
                          {description}
                        </DialogPrimitive.Description>
                      )}
                    </div>
                    <DialogPrimitive.Close
                      className={cn(
                        "rounded-full p-1.5 shrink-0",
                        "text-[var(--color-muted-foreground)]",
                        "hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]",
                        "transition-colors",
                        title ? "self-start" : ""
                      )}
                      aria-label="닫기"
                    >
                      <X size={20} />
                    </DialogPrimitive.Close>
                  </div>

                  {/* 콘텐츠 */}
                  <div className="flex-1 overflow-y-auto px-5 pb-8">
                    {children}
                  </div>
                </m.div>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          )}
        </AnimatePresence>
      </DialogPrimitive.Root>
    </LazyMotion>
  );
}

export { Drawer };
