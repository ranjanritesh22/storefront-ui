import * as React from "react";
import { cn } from "../../lib/cn";
import { textareaVariants, type TextareaVariantsProps } from "./textarea.variants";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    TextareaVariantsProps {
  /** Marks the field invalid: sets `data-invalid` and `aria-invalid`. */
  invalid?: boolean;
}

/**
 * A styled wrapper over a native `<textarea>` — no internal state, so it
 * stays a Server Component (CLAUDE.md rule 2), same as `Input`.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size, invalid = false, rows = 4, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        data-invalid={invalid ? "true" : undefined}
        aria-invalid={invalid || undefined}
        className={cn(textareaVariants({ size }), className)}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";
