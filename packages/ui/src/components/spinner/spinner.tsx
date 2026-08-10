import * as React from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon/icon";
import type { IconVariantsProps } from "../icon/icon.variants";
import { getMessages } from "../../i18n/messages";
import { spinnerVariants, type SpinnerVariantsProps } from "./spinner.variants";

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    IconVariantsProps,
    SpinnerVariantsProps {
  /** Accessible text announced (via a live region) while the spinner is visible. @default "Loading" (see `configureMessages`) */
  label?: string;
}

/**
 * A single glyph (`<Icon name="spinner">`) wrapped in a `role="status"` live
 * region so screen readers announce `label` once, rather than an icon
 * spinning forever with no accessible meaning. No internal state, stays a
 * Server Component.
 */
export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size, tone, className, label, ...props }, ref) => (
    <span ref={ref} role="status" aria-live="polite" className="inline-flex" {...props}>
      <Icon name="spinner" size={size} className={cn(spinnerVariants({ tone }), className)} />
      <span className="sr-only">{label ?? getMessages().spinner.loading}</span>
    </span>
  ),
);
Spinner.displayName = "Spinner";
