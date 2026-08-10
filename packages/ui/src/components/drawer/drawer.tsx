"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "../../lib/cn";
import { Icon } from "../icon/icon";
import { getMessages } from "../../i18n/messages";
import {
  drawerOverlayVariants,
  drawerContentVariants,
  type DrawerContentVariantsProps,
} from "./drawer.variants";

/**
 * Built on `@radix-ui/react-dialog` — same modal semantics (focus trap,
 * Escape/outside-click dismissal, scroll lock) as `Dialog`; only the
 * positioning and motion differ, via `side` on `DrawerContent`.
 */
export const Drawer = DialogPrimitive.Root;
export const DrawerTrigger = DialogPrimitive.Trigger;
export const DrawerClose = DialogPrimitive.Close;
export const DrawerPortal = DialogPrimitive.Portal;

export interface DrawerClassNames {
  overlay?: string;
  content?: string;
  header?: string;
  footer?: string;
}

/** Mirrors `DialogSlotContext` — see dialog.tsx for the rationale. */
const DrawerSlotContext = React.createContext<Pick<DrawerClassNames, "header" | "footer">>({});

export type DrawerOverlayProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>;

export const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  DrawerOverlayProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay ref={ref} className={cn(drawerOverlayVariants(), className)} {...props} />
));
DrawerOverlay.displayName = "DrawerOverlay";

export interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    DrawerContentVariantsProps {
  classNames?: DrawerClassNames;
  /** Hides the default top-end close button. @default false */
  hideCloseButton?: boolean;
  /** aria-label on the default close button. @default "Close" (see `configureMessages`) */
  closeLabel?: string;
}

export const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DrawerContentProps
>(
  (
    { className, classNames, side, hideCloseButton = false, closeLabel, children, ...props },
    ref,
  ) => (
    <DrawerPortal>
      <DrawerOverlay className={classNames?.overlay} />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(drawerContentVariants({ side }), classNames?.content, className)}
        {...props}
      >
        <DrawerSlotContext.Provider value={{ header: classNames?.header, footer: classNames?.footer }}>
          {children}
        </DrawerSlotContext.Provider>
        {hideCloseButton ? null : (
          <DialogPrimitive.Close
            className={cn(
              "absolute end-4 top-4 rounded-md p-1 text-foreground-muted outline-none",
              "transition-colors duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)]",
              "hover:bg-surface-raised hover:text-foreground",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
            )}
            aria-label={closeLabel ?? getMessages().drawer.close}
          >
            <Icon name="close" size="sm" />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DrawerPortal>
  ),
);
DrawerContent.displayName = "DrawerContent";

export type DrawerHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ className, ...props }, ref) => {
    const { header } = React.useContext(DrawerSlotContext);
    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-1.5 border-b border-border p-4 pe-10", header, className)}
        {...props}
      />
    );
  },
);
DrawerHeader.displayName = "DrawerHeader";

export type DrawerFooterProps = React.HTMLAttributes<HTMLDivElement>;

export const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ className, ...props }, ref) => {
    const { footer } = React.useContext(DrawerSlotContext);
    return (
      <div
        ref={ref}
        className={cn(
          "mt-auto flex items-center justify-end gap-2 border-t border-border p-4",
          footer,
          className,
        )}
        {...props}
      />
    );
  },
);
DrawerFooter.displayName = "DrawerFooter";

export const DrawerBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex-1 overflow-y-auto p-4", className)} {...props} />
  ),
);
DrawerBody.displayName = "DrawerBody";

export const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("font-sans text-lg font-semibold text-foreground", className)}
    {...props}
  />
));
DrawerTitle.displayName = "DrawerTitle";

export const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn("text-sm text-foreground-muted", className)} {...props} />
));
DrawerDescription.displayName = "DrawerDescription";
