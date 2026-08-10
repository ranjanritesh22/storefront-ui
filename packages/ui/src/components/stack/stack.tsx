import * as React from "react";
import { Slot } from "../../lib/slot";
import { cn } from "../../lib/cn";
import { stackVariants, type StackVariantsProps } from "./stack.variants";

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    StackVariantsProps {
  /** Render as the single child element instead of a `<div>`. */
  asChild?: boolean;
}

/**
 * Flexbox layout primitive for one-dimensional stacking — `direction="vertical"`
 * (default) or `"horizontal"`, with a token-driven `gap`. No internal state,
 * so it stays a Server Component.
 */
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction, gap, align, justify, wrap, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        className={cn(stackVariants({ direction, gap, align, justify, wrap }), className)}
        {...props}
      />
    );
  },
);

Stack.displayName = "Stack";
