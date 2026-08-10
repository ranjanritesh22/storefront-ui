"use client";

import * as React from "react";

export type ToastVariant = "default" | "info" | "success" | "warning" | "danger";

export interface ToastActionOptions {
  label: string;
  onClick: () => void;
}

export interface ToastOptions {
  /** Reuse an existing toast's id to update it in place instead of enqueuing a new one. */
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** @default "default" */
  variant?: ToastVariant;
  /** Milliseconds before auto-dismiss. Pass `Infinity` to require manual dismissal. @default 5000 */
  duration?: number;
  action?: ToastActionOptions;
}

export interface ToastState extends Omit<ToastOptions, "id" | "variant" | "duration"> {
  id: string;
  variant: ToastVariant;
  duration: number;
  /** Flips to `false` to run the exit transition before the toast is removed from the list. */
  open: boolean;
}

type Listener = (toasts: ToastState[]) => void;

/** Oldest toast is dropped once the queue exceeds this — keeps the stack readable. */
const TOAST_LIMIT = 4;
const DEFAULT_DURATION = 5000;
/** Matches --ui-duration-base (tokens.css) — how long the exit transition runs before removal. */
const EXIT_ANIMATION_MS = 200;

let toasts: ToastState[] = [];
const listeners = new Set<Listener>();
const timeouts = new Map<string, ReturnType<typeof setTimeout>>();
let idCounter = 0;

function emit(): void {
  listeners.forEach((listener) => listener(toasts));
}

function clearScheduled(id: string): void {
  const timeout = timeouts.get(id);
  if (timeout) {
    clearTimeout(timeout);
    timeouts.delete(id);
  }
}

function scheduleRemove(id: string, delay: number): void {
  clearScheduled(id);
  if (!Number.isFinite(delay)) return;
  timeouts.set(
    id,
    setTimeout(() => {
      timeouts.delete(id);
      toasts = toasts.filter((t) => t.id !== id);
      emit();
    }, delay),
  );
}

/** Enqueues a toast (or updates one in place if `options.id` matches an existing toast). */
export function toast(options: ToastOptions): string {
  const id = options.id ?? `toast-${(idCounter += 1)}`;
  const duration = options.duration ?? DEFAULT_DURATION;
  const next: ToastState = { ...options, id, variant: options.variant ?? "default", duration, open: true };

  toasts = [next, ...toasts.filter((t) => t.id !== id)].slice(0, TOAST_LIMIT);
  emit();
  scheduleRemove(id, duration);
  return id;
}

/** Starts the exit transition for one toast (or every open toast, if no id is given). */
export function dismissToast(id?: string): void {
  const targetIds = id === undefined ? toasts.map((t) => t.id) : [id];
  toasts = toasts.map((t) => (targetIds.includes(t.id) ? { ...t, open: false } : t));
  emit();
  targetIds.forEach((toastId) => scheduleRemove(toastId, EXIT_ANIMATION_MS));
}

/** Removes every toast immediately, with no exit transition — e.g. on route change or logout. */
export function clearToasts(): void {
  toasts.forEach((t) => clearScheduled(t.id));
  toasts = [];
  emit();
}

export interface UseToastResult {
  toasts: ToastState[];
  toast: typeof toast;
  dismiss: typeof dismissToast;
}

/**
 * Subscribes to the module-level toast queue. `toast()`/`dismissToast()` can
 * be called from anywhere (an event handler, a data-fetching callback) with
 * no hook and no context provider — only rendering the queue needs this
 * hook, which is what `Toaster` does. That split is what lets a consumer
 * trigger toasts from plain application code without importing any UI.
 */
export function useToast(): UseToastResult {
  const [state, setState] = React.useState(toasts);

  React.useEffect(() => {
    listeners.add(setState);
    setState(toasts);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  return { toasts: state, toast, dismiss: dismissToast };
}
