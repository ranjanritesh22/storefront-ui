import * as React from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon/icon";
import { getMessages } from "../../i18n/messages";
import { Button } from "../button/button";
import { errorStateVariants, errorStateIconVariants } from "./error-state.variants";

export interface ErrorStateClassNames {
  icon?: string;
  title?: string;
  description?: string;
  retry?: string;
}

export interface ErrorStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** @default "Something went wrong" (see `configureMessages`) */
  title?: React.ReactNode;
  /** @default "We couldn't load this content. Please try again." (see `configureMessages`) */
  description?: React.ReactNode;
  /** Shows a retry button wired to this handler. Omit to render no retry button. */
  onRetry?: () => void;
  /** Label on the retry button. @default "Try again" (see `configureMessages`) */
  retryLabel?: string;
  /** Suppresses the default status icon. */
  hideIcon?: boolean;
  classNames?: ErrorStateClassNames;
}

/**
 * A failed-to-load placeholder — a rejected fetch, a broken widget. Unlike
 * `EmptyState`, an error always means the same thing, so `ErrorState` owns a
 * default icon/title/description (all overridable) rather than requiring
 * every call site to supply them. No internal state, stays a Server
 * Component; `onRetry` is wired by the consumer exactly like `AlertBanner`'s
 * `onDismiss`.
 */
export const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  (
    { title, description, onRetry, retryLabel, hideIcon = false, classNames, className, ...props },
    ref,
  ) => {
    const t = getMessages().errorState;
    return (
      <div ref={ref} role="alert" className={cn(errorStateVariants(), className)} {...props}>
        {hideIcon ? null : (
          <Icon
            name="alert-circle"
            size="xl"
            className={cn(errorStateIconVariants(), classNames?.icon)}
          />
        )}
        <p className={cn("font-sans text-base font-semibold text-foreground", classNames?.title)}>
          {title ?? t.title}
        </p>
        <p className={cn("max-w-sm font-sans text-sm text-foreground-muted", classNames?.description)}>
          {description ?? t.description}
        </p>
        {onRetry ? (
          <Button variant="outline" onClick={onRetry} className={cn("mt-1", classNames?.retry)}>
            <Icon name="refresh" size="sm" />
            {retryLabel ?? t.retry}
          </Button>
        ) : null}
      </div>
    );
  },
);
ErrorState.displayName = "ErrorState";
