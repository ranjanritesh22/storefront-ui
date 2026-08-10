import * as React from "react";
import { cn } from "../../lib/cn";
import { skeletonVariants, type SkeletonVariantsProps } from "./skeleton.variants";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>, SkeletonVariantsProps {}

/**
 * The single placeholder primitive — `shape` picks text/circle/rect
 * defaults, `className` overrides size. No internal state, stays a Server
 * Component. Decorative by definition (`aria-hidden`); pair it with a
 * `role="status"` live region elsewhere (see `Spinner`) if the loading
 * state itself needs to be announced.
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ shape = "rect", className, ...props }, ref) => (
    <div ref={ref} aria-hidden="true" className={cn(skeletonVariants({ shape }), className)} {...props} />
  ),
);
Skeleton.displayName = "Skeleton";

export interface SkeletonTextProps extends Omit<SkeletonProps, "shape"> {
  /** Number of lines to render. @default 3 */
  lines?: number;
  /** Width utility applied to the last line only, so the block reads as a natural paragraph end. @default "w-3/4" */
  lastLineClassName?: string;
}

/**
 * The one multi-line composition common enough to ship pre-built — for
 * anything shaped differently (a card, a table row), compose plain
 * `Skeleton` primitives directly; see "Building a per-component skeleton"
 * in skeleton.mdx for a worked example.
 */
export const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ lines = 3, lastLineClassName = "w-3/4", className, ...props }, ref) => (
    <div ref={ref} aria-hidden="true" className={cn("flex flex-col gap-2", className)} {...props}>
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton
          key={index}
          shape="text"
          className={index === lines - 1 ? lastLineClassName : undefined}
        />
      ))}
    </div>
  ),
);
SkeletonText.displayName = "SkeletonText";
