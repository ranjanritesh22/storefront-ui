import * as React from "react";
import { cn } from "../../lib/cn";
import { backdropVariants, type BackdropVariantsProps } from "./backdrop.variants";

export interface BackdropProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BackdropVariantsProps {
  /** Drives `data-state` and the fade transition. @default true */
  open?: boolean;
}

/**
 * A standalone, full-viewport overlay for custom modal/loading surfaces
 * that aren't built on Radix Dialog (which renders its own overlay — see
 * `DialogOverlay`/`DrawerOverlay` for that case). No open/close logic of
 * its own: `open` only drives the CSS transition, so mount/unmount timing
 * (and matching it to the exit transition) stays the consumer's call, the
 * same as `AlertBanner`'s `onDismiss`. No internal state, stays a Server
 * Component.
 */
export const Backdrop = React.forwardRef<HTMLDivElement, BackdropProps>(
  ({ open = true, blur, className, ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden="true"
      data-state={open ? "open" : "closed"}
      className={cn(backdropVariants({ blur }), className)}
      {...props}
    />
  ),
);
Backdrop.displayName = "Backdrop";
