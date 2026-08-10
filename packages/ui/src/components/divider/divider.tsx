import * as React from "react";
import { cn } from "../../lib/cn";
import { dividerVariants, type DividerVariantsProps } from "./divider.variants";

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    DividerVariantsProps {
  /**
   * Purely visual (default) vs. a real content boundary a screen reader
   * should announce. Mirrors the ARIA `separator` role's own distinction —
   * decorative dividers are `aria-hidden`, semantic ones get
   * `role="separator"` (and `aria-orientation` when vertical).
   * @default true
   */
  decorative?: boolean;
}

/**
 * A single rule for separating content — no internal state, so it stays a
 * Server Component.
 */
export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => {
    const semanticProps = decorative
      ? { role: "none" as const, "aria-hidden": true as const }
      : {
          role: "separator" as const,
          "aria-orientation": orientation === "vertical" ? ("vertical" as const) : undefined,
        };

    return (
      <div
        ref={ref}
        className={cn(dividerVariants({ orientation }), className)}
        {...semanticProps}
        {...props}
      />
    );
  },
);

Divider.displayName = "Divider";
