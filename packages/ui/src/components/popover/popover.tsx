"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "../../lib/cn";
import { popoverContentVariants, popoverArrowVariants } from "./popover.variants";

/** Radix Root/Trigger/Anchor/Close need no styling opinion — re-exported as-is. */
export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverAnchor = PopoverPrimitive.Anchor;
export const PopoverClose = PopoverPrimitive.Close;
export const PopoverPortal = PopoverPrimitive.Portal;

export interface PopoverClassNames {
  content?: string;
  arrow?: string;
}

export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  classNames?: PopoverClassNames;
  /** Renders the connecting arrow pointing at the trigger. @default true */
  showArrow?: boolean;
}

export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, classNames, showArrow = true, sideOffset = 8, children, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(popoverContentVariants(), classNames?.content, className)}
      {...props}
    >
      {children}
      {showArrow ? (
        <PopoverPrimitive.Arrow className={cn(popoverArrowVariants(), classNames?.arrow)} />
      ) : null}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = "PopoverContent";
