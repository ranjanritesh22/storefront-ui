import * as React from "react";
import { cn } from "../../lib/cn";
import { inputVariants, type InputVariantsProps } from "./input.variants";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    InputVariantsProps {
  /** Marks the field invalid: sets `data-invalid` and `aria-invalid`. */
  invalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, invalid = false, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-invalid={invalid ? "true" : undefined}
        aria-invalid={invalid || undefined}
        className={cn(inputVariants({ size }), className)}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
