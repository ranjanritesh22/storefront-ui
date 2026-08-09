"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "../../lib/cn";
import { Icon } from "../icon/icon";
import {
  checkboxVariants,
  checkboxBoxVariants,
  type CheckboxVariantsProps,
} from "./checkbox.variants";

export interface CheckboxClassNames {
  root?: string;
  box?: string;
  label?: string;
  description?: string;
}

export interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, "asChild">,
    CheckboxVariantsProps {
  label?: React.ReactNode;
  /** Rendered after the label in muted text, e.g. a facet count like "(45)". */
  description?: React.ReactNode;
  /**
   * Marks the field invalid: sets `data-invalid`/`aria-invalid` on the box.
   * Set automatically when this component is a `FormField` child with an
   * `error`; pass explicitly for standalone use.
   */
  invalid?: boolean;
  classNames?: CheckboxClassNames;
}

/**
 * Built on `@radix-ui/react-checkbox` for correct keyboard/aria-checked
 * behaviour (including the tri-state `indeterminate`) — necessarily a Client
 * Component (CLAUDE.md rule 2 allows `"use client"` here because the
 * component owns interactive state, unlike the plain-input version this
 * replaced).
 */
export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, classNames, size, label, description, id, invalid = false, ...props }, ref) => {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  return (
    <label
      htmlFor={inputId}
      className={cn(checkboxVariants({ size }), classNames?.root, className)}
    >
      <CheckboxPrimitive.Root
        ref={ref}
        id={inputId}
        data-invalid={invalid ? "true" : undefined}
        aria-invalid={invalid || undefined}
        className={cn(checkboxBoxVariants({ size }), classNames?.box)}
        {...props}
      >
        <CheckboxPrimitive.Indicator asChild>
          <Icon name="check" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
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
});

Checkbox.displayName = "Checkbox";
