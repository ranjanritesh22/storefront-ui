"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "../../lib/cn";
import { tooltipContentVariants, tooltipArrowVariants } from "./tooltip.variants";

/**
 * Re-exported as-is. A consumer with several tooltips on one page should
 * wrap them in a single `TooltipProvider` (Radix skips the open delay for
 * every tooltip after the first while the pointer stays within
 * `skipDelayDuration` of the last one closing) — this package doesn't add
 * its own implicit provider so that choice stays explicit.
 */
export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;
export const TooltipPortal = TooltipPrimitive.Portal;

export interface TooltipClassNames {
  content?: string;
  arrow?: string;
}

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  classNames?: TooltipClassNames;
  /** Renders the connecting arrow pointing at the trigger. @default true */
  showArrow?: boolean;
}

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, classNames, showArrow = true, sideOffset = 6, children, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(tooltipContentVariants(), classNames?.content, className)}
      {...props}
    >
      {children}
      {showArrow ? (
        <TooltipPrimitive.Arrow className={cn(tooltipArrowVariants(), classNames?.arrow)} />
      ) : null}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = "TooltipContent";
