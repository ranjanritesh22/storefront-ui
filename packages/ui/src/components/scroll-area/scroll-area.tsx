"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "../../lib/cn";
import {
  scrollAreaVariants,
  scrollAreaViewportVariants,
  scrollAreaScrollbarVariants,
  scrollAreaThumbVariants,
} from "./scroll-area.variants";

export interface ScrollAreaClassNames {
  viewport?: string;
  scrollbar?: string;
  thumb?: string;
}

export interface ScrollAreaProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  classNames?: ScrollAreaClassNames;
  /** Which scrollbar(s) to render. @default "vertical" */
  orientation?: "vertical" | "horizontal" | "both";
}

/**
 * Custom-styled scrollbars over a native-feeling scroll container — used for
 * things like a horizontally-scrolling filter chip row or a long
 * MegaMenu/MobileNav column. Wraps Radix's primitive, which owns pointer,
 * touch and keyboard scroll handling.
 */
export const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className, classNames, orientation = "vertical", children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn(scrollAreaVariants(), className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className={cn(scrollAreaViewportVariants(), classNames?.viewport)}>
      {children}
    </ScrollAreaPrimitive.Viewport>
    {orientation === "vertical" || orientation === "both" ? (
      <ScrollAreaPrimitive.Scrollbar
        orientation="vertical"
        className={cn(scrollAreaScrollbarVariants(), classNames?.scrollbar)}
      >
        <ScrollAreaPrimitive.Thumb className={cn(scrollAreaThumbVariants(), classNames?.thumb)} />
      </ScrollAreaPrimitive.Scrollbar>
    ) : null}
    {orientation === "horizontal" || orientation === "both" ? (
      <ScrollAreaPrimitive.Scrollbar
        orientation="horizontal"
        className={cn(scrollAreaScrollbarVariants(), classNames?.scrollbar)}
      >
        <ScrollAreaPrimitive.Thumb className={cn(scrollAreaThumbVariants(), classNames?.thumb)} />
      </ScrollAreaPrimitive.Scrollbar>
    ) : null}
    {orientation === "both" ? <ScrollAreaPrimitive.Corner /> : null}
  </ScrollAreaPrimitive.Root>
));

ScrollArea.displayName = "ScrollArea";
