import { ToastProvider, ToastViewport, Toast } from "./Toast";
import { useToast } from "./useToast";

export function Toaster() {
  const { toasts, remove } = useToast();

  return (
    <ToastProvider swipeDirection="down">
      {toasts.map(({ id, open, children, ...props }) => (
        <Toast
          key={id}
          open={open}
          onOpenChange={(o) => { if (!o) remove(id); }}
          {...props}
        >
          {children}
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
