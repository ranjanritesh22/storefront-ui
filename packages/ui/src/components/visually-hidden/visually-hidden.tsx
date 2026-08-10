"use client";

import * as React from "react";
import * as VisuallyHiddenPrimitive from "@radix-ui/react-visually-hidden";
import { cn } from "../../lib/cn";
import { visuallyHiddenVariants } from "./visually-hidden.variants";

export interface VisuallyHiddenProps
  extends React.ComponentPropsWithoutRef<typeof VisuallyHiddenPrimitive.Root> {}

/**
 * Renders content that's present for a screen reader but not visually — a
 * label for an icon-only control, or a heading that gives an unlabelled
 * region structure without adding visible chrome. Prefer a real prop (e.g. a
 * message from `getMessages()`) for anything that could just be an
 * `aria-label`; reach for this when the accessible text needs to be real
 * DOM content (e.g. inside a live region, or alongside decorative siblings).
 */
export const VisuallyHidden = React.forwardRef<
  React.ElementRef<typeof VisuallyHiddenPrimitive.Root>,
  VisuallyHiddenProps
>(({ className, ...props }, ref) => (
  <VisuallyHiddenPrimitive.Root
    ref={ref}
    className={cn(visuallyHiddenVariants(), className)}
    {...props}
  />
));

VisuallyHidden.displayName = "VisuallyHidden";
