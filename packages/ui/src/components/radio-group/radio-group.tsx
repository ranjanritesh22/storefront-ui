"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "../../lib/cn";
import {
  radioGroupVariants,
  radioVariants,
  radioBoxVariants,
  radioIndicatorVariants,
  type RadioVariantsProps,
} from "./radio-group.variants";

export interface RadioGroupClassNames {
  root?: string;
}

export interface RadioGroupProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>, "asChild"> {
  /** Marks the group invalid: sets `data-invalid`/`aria-invalid` on the root. */
  invalid?: boolean;
  classNames?: RadioGroupClassNames;
}

/**
 * Built on `@radix-ui/react-radio-group` — the root owns roving tabindex
 * across its `Radio` children (arrow keys move selection, Tab enters/exits
 * the whole group once). Necessarily a Client Component (CLAUDE.md rule 2).
 */
export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, classNames, invalid = false, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      data-invalid={invalid ? "true" : undefined}
      aria-invalid={invalid || undefined}
      className={cn(radioGroupVariants(), classNames?.root, className)}
      {...props}
    />
  );
});
RadioGroup.displayName = "RadioGroup";

export interface RadioClassNames {
  root?: string;
  box?: string;
  label?: string;
  description?: string;
}

export interface RadioProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>, "asChild">,
    RadioVariantsProps {
  label?: React.ReactNode;
  /** Rendered after the label in muted text, e.g. a swatch note. */
  description?: React.ReactNode;
  classNames?: RadioClassNames;
}

/** A single option within a `RadioGroup` — renders as `<button role="radio">`. */
export const Radio = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Item>, RadioProps>(
  ({ className, classNames, size, label, description, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <label
        htmlFor={inputId}
        className={cn(radioVariants({ size }), classNames?.root, className)}
      >
        <RadioGroupPrimitive.Item
          ref={ref}
          id={inputId}
          className={cn(radioBoxVariants({ size }), classNames?.box)}
          {...props}
        >
          <RadioGroupPrimitive.Indicator className={radioIndicatorVariants()} />
        </RadioGroupPrimitive.Item>
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
Radio.displayName = "Radio";
