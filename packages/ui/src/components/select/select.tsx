import * as React from "react";
import { cn } from "../../lib/cn";
import { selectVariants, type SelectVariantsProps } from "./select.variants";

export interface SelectClassNames {
  root?: string;
  select?: string;
  icon?: string;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    SelectVariantsProps {
  /** Marks the field invalid: sets `data-invalid` and `aria-invalid`. */
  invalid?: boolean;
  classNames?: SelectClassNames;
}

/**
 * A styled wrapper over a native `<select>` — the chevron is a sibling icon,
 * not a background-image, so it can be restyled/removed via `classNames.icon`.
 * No internal state: a transparent passthrough, so it stays a Server
 * Component (CLAUDE.md rule 2).
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, classNames, size, invalid = false, children, ...props }, ref) => {
    return (
      <span className={cn("relative inline-flex w-full", classNames?.root)}>
        <select
          ref={ref}
          data-invalid={invalid ? "true" : undefined}
          aria-invalid={invalid || undefined}
          className={cn(selectVariants({ size }), classNames?.select, className)}
          {...props}
        >
          {children}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={cn(
            "pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-foreground-muted",
            classNames?.icon,
          )}
        >
          <path d="M5 7.5l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  },
);

Select.displayName = "Select";
