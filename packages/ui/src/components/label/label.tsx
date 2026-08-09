"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "../../lib/cn";
import { labelVariants } from "./label.variants";

export interface LabelProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  /** Appends a visual `*`; the asterisk is `aria-hidden` — pair with a real `required` attribute on the control. */
  required?: boolean;
}

/**
 * A standalone field label built on `@radix-ui/react-label` — clicking it
 * focuses/activates the associated control even when that control is a
 * Radix primitive rendered as a `<button>` (Checkbox, Switch, Select
 * trigger), not just a native input. `FormField` renders its own `<label>`
 * internally for the common case; reach for this component directly when
 * labelling a control outside `FormField` (e.g. a bare `RadioGroup` in a
 * toolbar) or inside a `Fieldset`.
 */
export const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
  ({ className, required = false, children, ...props }, ref) => (
    <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props}>
      {children}
      {required ? (
        <span aria-hidden="true" className="text-danger">
          {" "}
          *
        </span>
      ) : null}
    </LabelPrimitive.Root>
  ),
);

Label.displayName = "Label";
