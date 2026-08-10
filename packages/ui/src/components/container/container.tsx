import * as React from "react";
import { Slot } from "../../lib/slot";
import { cn } from "../../lib/cn";
import { containerVariants, type ContainerVariantsProps } from "./container.variants";

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ContainerVariantsProps {
  /** Render as the single child element instead of a `<div>`. */
  asChild?: boolean;
}

/**
 * Centered max-width wrapper with responsive gutters — the outermost layout
 * primitive every page-level section sits inside. No internal state, so it
 * stays a Server Component.
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp ref={ref} className={cn(containerVariants({ size }), className)} {...props} />
    );
  },
);

Container.displayName = "Container";
