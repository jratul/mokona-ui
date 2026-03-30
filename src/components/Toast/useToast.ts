import * as React from "react";
import type { ToastProps } from "./Toast";

type ToastInput = Omit<ToastProps, "open" | "onOpenChange"> & { id?: string };

interface ToastState extends ToastInput {
  id: string;
  open: boolean;
}

let listeners: Array<(toasts: ToastState[]) => void> = [];
let toasts: ToastState[] = [];

function dispatch(toast: ToastState) {
  toasts = [...toasts, toast];
  listeners.forEach((l) => l(toasts));
}

function dismiss(id: string) {
  toasts = toasts.map((t) => (t.id === id ? { ...t, open: false } : t));
  listeners.forEach((l) => l(toasts));
}

function remove(id: string) {
  toasts = toasts.filter((t) => t.id !== id);
  listeners.forEach((l) => l(toasts));
}

export function toast(input: ToastInput) {
  const id = input.id ?? Math.random().toString(36).slice(2);
  dispatch({ ...input, id, open: true });
  return { id, dismiss: () => dismiss(id) };
}

toast.positive = (children: React.ReactNode, opts?: Partial<ToastInput>) =>
  toast({ ...opts, children, variant: "positive" });

toast.negative = (children: React.ReactNode, opts?: Partial<ToastInput>) =>
  toast({ ...opts, children, variant: "negative" });

toast.warning = (children: React.ReactNode, opts?: Partial<ToastInput>) =>
  toast({ ...opts, children, variant: "warning" });

export function useToast() {
  const [state, setState] = React.useState<ToastState[]>(toasts);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      listeners = listeners.filter((l) => l !== setState);
    };
  }, []);

  return {
    toasts: state,
    dismiss,
    remove,
  };
}
