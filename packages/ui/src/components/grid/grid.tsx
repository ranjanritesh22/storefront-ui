import * as React from "react";
import { Slot } from "../../lib/slot";
import { cn } from "../../lib/cn";
import {
  gridVariants,
  gridColsClassNames,
  gridColsSmClassNames,
  gridColsMdClassNames,
  gridColsLgClassNames,
  gridColsXlClassNames,
  type GridVariantsProps,
  type GridCols,
} from "./grid.variants";

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    GridVariantsProps {
  /** Column count at the base breakpoint. @default 1 */
  cols?: GridCols;
  /** Column count from the `sm` breakpoint up. */
  colsSm?: GridCols;
  /** Column count from the `md` breakpoint up. */
  colsMd?: GridCols;
  /** Column count from the `lg` breakpoint up. */
  colsLg?: GridCols;
  /** Column count from the `xl` breakpoint up. */
  colsXl?: GridCols;
  /** Render as the single child element instead of a `<div>`. */
  asChild?: boolean;
}

/**
 * Responsive CSS grid — a PLP/category grid is the canonical use, e.g.
 * `<Grid cols={2} colsMd={3} colsLg={4}>`. No internal state, so it stays a
 * Server Component.
 */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    { className, gap, cols = 1, colsSm, colsMd, colsLg, colsXl, asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        className={cn(
          gridVariants({ gap }),
          gridColsClassNames[cols],
          colsSm ? gridColsSmClassNames[colsSm] : null,
          colsMd ? gridColsMdClassNames[colsMd] : null,
          colsLg ? gridColsLgClassNames[colsLg] : null,
          colsXl ? gridColsXlClassNames[colsXl] : null,
          className,
        )}
        {...props}
      />
    );
  },
);

Grid.displayName = "Grid";
