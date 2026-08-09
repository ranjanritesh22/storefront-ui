import * as React from "react";
import { cn } from "../../lib/cn";
import { fieldsetVariants, legendVariants, type FieldsetVariantsProps } from "./fieldset.variants";

export interface FieldsetClassNames {
  legend?: string;
  description?: string;
}

export interface FieldsetProps
  extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, "id">,
    FieldsetVariantsProps {
  /** Id applied to the fieldset; auto-generated via `useId()` when omitted. */
  id?: string;
  legend?: React.ReactNode;
  /** Muted line under the legend, e.g. "Choose the size that fits you best." */
  description?: React.ReactNode;
  required?: boolean;
  /** Marks the group invalid: sets `data-invalid`/`aria-invalid`. */
  invalid?: boolean;
  classNames?: FieldsetClassNames;
}

/**
 * Groups related controls — a `RadioGroup`, a run of `Checkbox`es — under one
 * `<legend>`, the native way to give a set of inputs a single accessible
 * name without repeating it per control. No internal state, so it stays a
 * Server Component (CLAUDE.md rule 2). Setting the native `disabled`
 * attribute disables every descendant form control for free.
 */
export const Fieldset = React.forwardRef<HTMLFieldSetElement, FieldsetProps>(
  (
    {
      className,
      classNames,
      gap,
      id,
      legend,
      description,
      required = false,
      invalid = false,
      disabled = false,
      children,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const fieldsetId = id ?? generatedId;
    const descriptionId = `${fieldsetId}-description`;

    return (
      <fieldset
        ref={ref}
        id={fieldsetId}
        disabled={disabled}
        data-disabled={disabled ? "true" : undefined}
        data-invalid={invalid ? "true" : undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={description ? descriptionId : undefined}
        className={cn(fieldsetVariants({ gap }), className)}
        {...props}
      >
        {legend ? (
          <legend className={cn(legendVariants(), classNames?.legend)}>
            {legend}
            {required ? (
              <span aria-hidden="true" className="text-danger">
                {" "}
                *
              </span>
            ) : null}
          </legend>
        ) : null}
        {description ? (
          <p
            id={descriptionId}
            className={cn("-mt-2 font-sans text-sm text-foreground-muted", classNames?.description)}
          >
            {description}
          </p>
        ) : null}
        {children}
      </fieldset>
    );
  },
);

Fieldset.displayName = "Fieldset";
