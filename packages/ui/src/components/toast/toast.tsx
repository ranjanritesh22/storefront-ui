"use client";

import * as React from "react";
import { cn } from "../../lib/cn";
import { Icon, type IconName } from "../icon/icon";
import { getMessages } from "../../i18n/messages";
import { useToast, type ToastVariant } from "../../hooks/use-toast";
import { toastViewportVariants, toastVariants, toastIconVariants } from "./toast.variants";

const variantIcon: Partial<Record<ToastVariant, IconName>> = {
  info: "info",
  success: "check-circle",
  warning: "alert-triangle",
  danger: "alert-circle",
};

export interface ToastClassNames {
  icon?: string;
  title?: string;
  description?: string;
  action?: string;
  close?: string;
}

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default "default" */
  variant?: ToastVariant;
  /** Drives `data-state` and the enter/exit transition. @default true */
  open?: boolean;
  /** Suppresses the default per-variant status icon. */
  hideIcon?: boolean;
  classNames?: ToastClassNames;
  /** Shows a dismiss button wired to this handler. Omit to render no close button. */
  onDismiss?: () => void;
  /** aria-label on the dismiss button. @default "Dismiss notification" (see `configureMessages`) */
  closeLabel?: string;
}

/**
 * A single notification. Presentational — no queueing, timing, or portal
 * logic; `Toaster` below is what renders the live queue produced by
 * `useToast()`/`toast()`. Reach for `Toast` directly to hand-roll a custom
 * viewport instead of `Toaster`'s.
 */
export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ variant = "default", open = true, hideIcon = false, classNames, onDismiss, closeLabel, className, children, ...props }, ref) => {
    const iconName = hideIcon ? undefined : variantIcon[variant];
    return (
      <div
        ref={ref}
        role={variant === "danger" ? "alert" : "status"}
        aria-live={variant === "danger" ? "assertive" : "polite"}
        aria-atomic="true"
        data-state={open ? "open" : "closed"}
        data-variant={variant}
        className={cn(toastVariants({ variant }), className)}
        {...props}
      >
        {iconName ? (
          <Icon name={iconName} size="sm" className={cn(toastIconVariants({ variant }), classNames?.icon)} />
        ) : null}
        <div className="flex flex-1 flex-col gap-1">{children}</div>
        {onDismiss ? (
          <button
            type="button"
            onClick={onDismiss}
            aria-label={closeLabel ?? getMessages().toast.close}
            className={cn(
              "shrink-0 rounded-md p-1 text-foreground-muted outline-none",
              "transition-colors duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)]",
              "hover:bg-surface-raised hover:text-foreground",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
              classNames?.close,
            )}
          >
            <Icon name="close" size="sm" />
          </button>
        ) : null}
      </div>
    );
  },
);
Toast.displayName = "Toast";

export type ToastTitleProps = React.HTMLAttributes<HTMLParagraphElement>;

export const ToastTitle = React.forwardRef<HTMLParagraphElement, ToastTitleProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("font-sans text-sm font-semibold text-foreground", className)} {...props} />
  ),
);
ToastTitle.displayName = "ToastTitle";

export type ToastDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export const ToastDescription = React.forwardRef<HTMLParagraphElement, ToastDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("font-sans text-sm text-foreground-muted", className)} {...props} />
  ),
);
ToastDescription.displayName = "ToastDescription";

export type ToastActionProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ToastAction = React.forwardRef<HTMLButtonElement, ToastActionProps>(
  ({ className, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "mt-1 inline-flex w-fit items-center rounded-sm font-sans text-sm font-medium text-primary outline-none",
        "underline underline-offset-2 hover:no-underline",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        className,
      )}
      {...props}
    />
  ),
);
ToastAction.displayName = "ToastAction";

export interface ToasterProps {
  classNames?: ToastClassNames;
}

/**
 * Renders the live queue produced by `useToast()`/the standalone `toast()`
 * function as a fixed, inline-end-docked stack. Mount exactly one per app
 * (e.g. once in the root layout) — every `toast()` call anywhere in the
 * app reaches whichever `Toaster` instances are mounted.
 */
export function Toaster({ classNames }: ToasterProps) {
  const { toasts, dismiss } = useToast();
  const t = getMessages();

  return (
    <div role="region" aria-label={t.toast.region} className={toastViewportVariants()}>
      {toasts.map(({ id, title, description, action, variant, open }) => (
        <Toast key={id} variant={variant} open={open} onDismiss={() => dismiss(id)} classNames={classNames}>
          {title ? <ToastTitle className={classNames?.title}>{title}</ToastTitle> : null}
          {description ? (
            <ToastDescription className={classNames?.description}>{description}</ToastDescription>
          ) : null}
          {action ? (
            <ToastAction className={classNames?.action} onClick={action.onClick}>
              {action.label}
            </ToastAction>
          ) : null}
        </Toast>
      ))}
    </div>
  );
}
