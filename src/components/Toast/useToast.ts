import * as React from "react";
import type { ToastProps } from "./Toast";

type ToastInput = Omit<ToastProps, "open" | "onOpenChange"> & { id?: string };

interface ToastState extends ToastInput {
  id: string;
  open: boolean;
}

let toasts: ToastState[] = [];
const subscribers = new Set<() => void>();

function getSnapshot() {
  return toasts;
}

function subscribe(callback: () => void) {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

function notify() {
  subscribers.forEach((cb) => cb());
}

function dispatch(toast: ToastState) {
  toasts = [...toasts, toast];
  notify();
}

function dismiss(id: string) {
  toasts = toasts.map((t) => (t.id === id ? { ...t, open: false } : t));
  notify();
}

function remove(id: string) {
  toasts = toasts.filter((t) => t.id !== id);
  notify();
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
  const state = React.useSyncExternalStore(subscribe, getSnapshot);
  return { toasts: state, dismiss, remove };
}
