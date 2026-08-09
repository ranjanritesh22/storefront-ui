import * as React from "react";
import { Slot } from "../../lib/slot";
import { cn } from "../../lib/cn";
import { badgeVariants, type BadgeVariantsProps } from "./badge.variants";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    BadgeVariantsProps {
  /** Render as the single child element (e.g. a filter link) instead of a `<span>`. */
  asChild?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span";

    return (
      <Comp
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);

Badge.displayName = "Badge";
