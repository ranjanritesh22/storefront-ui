import * as React from "react";
import { cn } from "../../lib/cn";
import { getMessages } from "../../i18n/messages";
import {
  progressBarTrackVariants,
  progressBarFillVariants,
  type ProgressBarTrackVariantsProps,
  type ProgressBarFillVariantsProps,
} from "./progress-bar.variants";

export interface ProgressBarClassNames {
  track?: string;
  fill?: string;
  value?: string;
}

export interface ProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ProgressBarTrackVariantsProps,
    Pick<ProgressBarFillVariantsProps, "tone"> {
  /** 0–100. Ignored when `indeterminate` is set. @default 0 */
  value?: number;
  /** @default 100 */
  max?: number;
  /** Renders a sliding indicator instead of a value-driven fill, for a duration that isn't known yet. */
  indeterminate?: boolean;
  /** aria-label on the progressbar element. @default "Progress" (see `configureMessages`) */
  label?: string;
  /** Renders the rounded percentage next to the track. Ignored when `indeterminate` is set. */
  showValue?: boolean;
  classNames?: ProgressBarClassNames;
}

/**
 * No internal state — the consumer owns `value` (e.g. upload progress from
 * `FileUpload`'s own state, or a multi-step checkout's current step). Stays
 * a Server Component.
 */
export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value = 0,
      max = 100,
      indeterminate = false,
      size,
      tone,
      label,
      showValue = false,
      classNames,
      className,
      ...props
    },
    ref,
  ) => {
    const percent = Math.min(100, Math.max(0, (value / max) * 100));
    return (
      <div ref={ref} className={cn("flex items-center gap-2", className)} {...props}>
        <div
          role="progressbar"
          aria-label={label ?? getMessages().progressBar.label}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={indeterminate ? undefined : value}
          className={cn(progressBarTrackVariants({ size }), classNames?.track)}
        >
          <div
            className={cn(progressBarFillVariants({ tone, indeterminate }), classNames?.fill)}
            style={indeterminate ? undefined : { width: `${percent}%` }}
          />
        </div>
        {showValue && !indeterminate ? (
          <span className={cn("shrink-0 font-sans text-xs text-foreground-muted", classNames?.value)}>
            {Math.round(percent)}%
          </span>
        ) : null}
      </div>
    );
  },
);
ProgressBar.displayName = "ProgressBar";
