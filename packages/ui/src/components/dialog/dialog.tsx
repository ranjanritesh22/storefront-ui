"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "../../lib/cn";
import {
  dialogOverlayVariants,
  dialogContentVariants,
  type DialogContentVariantsProps,
} from "./dialog.variants";

/** Radix Root/Trigger/Close/Portal need no styling opinion — re-exported as-is. */
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogPortal = DialogPrimitive.Portal;

export interface DialogClassNames {
  overlay?: string;
  content?: string;
  header?: string;
  footer?: string;
}

/**
 * `DialogContent` is the only place the `classNames` slot map is set; header
 * and footer read their slice back out here so `DialogHeader`/`DialogFooter`
 * stay ordinary composable children instead of requiring props threaded
 * through by hand.
 */
const DialogSlotContext = React.createContext<Pick<DialogClassNames, "header" | "footer">>({});

export type DialogOverlayProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>;

export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  DialogOverlayProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay ref={ref} className={cn(dialogOverlayVariants(), className)} {...props} />
));
DialogOverlay.displayName = "DialogOverlay";

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    DialogContentVariantsProps {
  classNames?: DialogClassNames;
  /** Hides the default top-end close button. @default false */
  hideCloseButton?: boolean;
}

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, classNames, size, hideCloseButton = false, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay className={classNames?.overlay} />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(dialogContentVariants({ size }), classNames?.content, className)}
      {...props}
    >
      <DialogSlotContext.Provider value={{ header: classNames?.header, footer: classNames?.footer }}>
        {children}
      </DialogSlotContext.Provider>
      {hideCloseButton ? null : (
        <DialogPrimitive.Close
          className={cn(
            "absolute end-4 top-4 rounded-md p-1 text-foreground-muted outline-none",
            "transition-colors duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)]",
            "hover:bg-surface-raised hover:text-foreground",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          )}
          aria-label="Close"
        >
          <CloseIcon />
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = "DialogContent";

function CloseIcon() {
  return (
    <svg
      className="size-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

export type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => {
    const { header } = React.useContext(DialogSlotContext);
    return <div ref={ref} className={cn("flex flex-col gap-1.5 pe-6", header, className)} {...props} />;
  },
);
DialogHeader.displayName = "DialogHeader";

export type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

export const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, ...props }, ref) => {
    const { footer } = React.useContext(DialogSlotContext);
    return (
      <div
        ref={ref}
        className={cn("mt-6 flex items-center justify-end gap-2", footer, className)}
        {...props}
      />
    );
  },
);
DialogFooter.displayName = "DialogFooter";

export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("font-sans text-lg font-semibold text-foreground", className)}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn("text-sm text-foreground-muted", className)} {...props} />
));
DialogDescription.displayName = "DialogDescription";
