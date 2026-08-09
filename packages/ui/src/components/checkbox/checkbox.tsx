import * as React from "react";
import { cn } from "../../lib/cn";
import {
  checkboxVariants,
  checkboxBoxVariants,
  type CheckboxVariantsProps,
} from "./checkbox.variants";

export interface CheckboxClassNames {
  root?: string;
  input?: string;
  box?: string;
  label?: string;
  description?: string;
}

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    CheckboxVariantsProps {
  label?: React.ReactNode;
  /** Rendered after the label in muted text, e.g. a facet count like "(45)". */
  description?: React.ReactNode;
  classNames?: CheckboxClassNames;
}

/**
 * A transparent passthrough over a native `<input type="checkbox">` — no
 * internal state, so it stays a Server Component (CLAUDE.md rule 2). Visual
 * box is a sibling `<span>` painted via the `peer-checked` variant, matching
 * the pattern in tokens.css for state-driven styling without JS.
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, classNames, size, label, description, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <label
        htmlFor={inputId}
        className={cn(checkboxVariants({ size }), classNames?.root, className)}
      >
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          className={cn("peer sr-only", classNames?.input)}
          {...props}
        />
        <span aria-hidden="true" className={cn(checkboxBoxVariants({ size }), classNames?.box)}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        {label ? (
          <span className={cn("flex flex-1 items-center justify-between gap-2", classNames?.label)}>
            <span>{label}</span>
            {description ? (
              <span className={cn("text-foreground-muted", classNames?.description)}>
                {description}
              </span>
            ) : null}
          </span>
        ) : null}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
