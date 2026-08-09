"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "../../lib/cn";
import {
  switchVariants,
  switchTrackVariants,
  switchThumbVariants,
  type SwitchVariantsProps,
} from "./switch.variants";

export interface SwitchClassNames {
  root?: string;
  track?: string;
  thumb?: string;
  label?: string;
  description?: string;
}

export interface SwitchProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>, "asChild">,
    SwitchVariantsProps {
  label?: React.ReactNode;
  /** Rendered after the label in muted text, e.g. "Currently off". */
  description?: React.ReactNode;
  /** Marks the field invalid: sets `data-invalid`/`aria-invalid` on the track. */
  invalid?: boolean;
  classNames?: SwitchClassNames;
}

/**
 * Built on `@radix-ui/react-switch` — a boolean on/off toggle distinct from
 * `Checkbox` (immediate-effect settings like "Email me order updates", not a
 * form-submission value picked from a list). Necessarily a Client Component
 * (CLAUDE.md rule 2).
 */
export const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  ({ className, classNames, size, label, description, id, invalid = false, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <label
        htmlFor={inputId}
        className={cn(switchVariants({ size }), classNames?.root, className)}
      >
        <SwitchPrimitive.Root
          ref={ref}
          id={inputId}
          data-invalid={invalid ? "true" : undefined}
          aria-invalid={invalid || undefined}
          className={cn(switchTrackVariants({ size }), classNames?.track)}
          {...props}
        >
          <SwitchPrimitive.Thumb className={cn(switchThumbVariants({ size }), classNames?.thumb)} />
        </SwitchPrimitive.Root>
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

Switch.displayName = "Switch";
