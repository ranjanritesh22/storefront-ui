"use client";

import * as React from "react";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import { cn } from "../../lib/cn";
import { aspectRatioVariants } from "./aspect-ratio.variants";

export interface AspectRatioProps
  extends React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> {
  /** width / height, e.g. `16 / 9`, `1`, `4 / 3`. @default 1 */
  ratio?: number;
}

/**
 * Locks a child (typically an `<Image>`) to a fixed width/height ratio —
 * product tiles, hero banners. Thin wrapper around Radix's primitive, which
 * owns the cross-browser padding-box trick so this stays correct without a
 * hand-rolled `aspect-ratio` CSS fallback.
 */
export const AspectRatio = React.forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  AspectRatioProps
>(({ className, ratio = 1, ...props }, ref) => (
  <AspectRatioPrimitive.Root
    ref={ref}
    ratio={ratio}
    className={cn(aspectRatioVariants(), className)}
    {...props}
  />
));

AspectRatio.displayName = "AspectRatio";
