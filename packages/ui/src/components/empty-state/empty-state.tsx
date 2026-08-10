import * as React from "react";
import { cn } from "../../lib/cn";
import { emptyStateVariants, emptyStateIconVariants } from "./empty-state.variants";

export interface EmptyStateClassNames {
  icon?: string;
  title?: string;
  description?: string;
  action?: string;
}

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /**
   * A decorative icon or illustration, e.g. `<Icon name="search" size="xl" />`.
   * Rendered as given — "no results", "empty cart", and "no orders yet" all
   * want a different glyph, so this component makes no icon choice of its
   * own (unlike `ErrorState`, which always means the same thing).
   */
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Rendered below the description — typically a `Button` ("Clear filters", "Start shopping"). */
  action?: React.ReactNode;
  classNames?: EmptyStateClassNames;
}

/**
 * A "nothing here yet" placeholder — no results, an empty cart, no saved
 * items. No internal state, stays a Server Component.
 */
export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, action, classNames, className, ...props }, ref) => (
    <div ref={ref} className={cn(emptyStateVariants(), className)} {...props}>
      {icon ? (
        <div className={cn(emptyStateIconVariants(), classNames?.icon)}>{icon}</div>
      ) : null}
      <p className={cn("font-sans text-base font-semibold text-foreground", classNames?.title)}>
        {title}
      </p>
      {description ? (
        <p className={cn("max-w-sm font-sans text-sm text-foreground-muted", classNames?.description)}>
          {description}
        </p>
      ) : null}
      {action ? <div className={cn("mt-1", classNames?.action)}>{action}</div> : null}
    </div>
  ),
);
EmptyState.displayName = "EmptyState";
