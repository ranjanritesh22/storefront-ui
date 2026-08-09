import * as React from "react";
import { cn } from "../../lib/cn";
import { formFieldVariants, type FormFieldVariantsProps } from "./form-field.variants";

export interface FormFieldClassNames {
  root?: string;
  label?: string;
  control?: string;
  hint?: string;
  error?: string;
}

export interface FormFieldProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "id">,
    FormFieldVariantsProps {
  /** Id applied to the control; auto-generated via `useId()` when omitted. */
  id?: string;
  label?: React.ReactNode;
  hint?: React.ReactNode;
  /** Presence of `error` marks the field invalid and hides `hint`. */
  error?: React.ReactNode;
  required?: boolean;
  classNames?: FormFieldClassNames;
  /**
   * The form control, e.g. an `Input`. Cloned to receive `id`,
   * `aria-invalid`, `aria-describedby` and `data-invalid` — the control
   * itself doesn't need to know about `hint`/`error` to stay correctly wired.
   */
  children: React.ReactElement<any>;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    { label, hint, error, required = false, id, className, classNames, gap, children, ...props },
    ref,
  ) => {
    const generatedId = React.useId();
    const controlId = id ?? generatedId;
    const hintId = `${controlId}-hint`;
    const errorId = `${controlId}-error`;
    const invalid = Boolean(error);

    const describedBy =
      [invalid ? errorId : undefined, !invalid && hint ? hintId : undefined]
        .filter(Boolean)
        .join(" ") || undefined;

    const control = React.isValidElement<Record<string, unknown>>(children)
      ? React.cloneElement(children, {
          id: children.props.id ?? controlId,
          "aria-invalid": invalid || undefined,
          "aria-describedby": describedBy,
          "data-invalid": invalid ? "true" : undefined,
          className: cn(children.props.className as string | undefined, classNames?.control),
        })
      : children;

    return (
      <div
        ref={ref}
        data-invalid={invalid ? "true" : undefined}
        className={cn(formFieldVariants({ gap }), classNames?.root, className)}
        {...props}
      >
        {label ? (
          <label
            htmlFor={controlId}
            className={cn("font-sans text-sm font-medium text-foreground", classNames?.label)}
          >
            {label}
            {required ? (
              <span aria-hidden="true" className="text-danger">
                {" "}
                *
              </span>
            ) : null}
          </label>
        ) : null}
        {control}
        {invalid ? (
          <p id={errorId} role="alert" className={cn("text-sm text-danger", classNames?.error)}>
            {error}
          </p>
        ) : hint ? (
          <p id={hintId} className={cn("text-sm text-foreground-muted", classNames?.hint)}>
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);

FormField.displayName = "FormField";
