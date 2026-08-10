import * as React from "react";
import { cn } from "../../lib/cn";
import { Icon, type IconName } from "../icon/icon";
import { getMessages } from "../../i18n/messages";
import {
  alertBannerVariants,
  alertBannerIconVariants,
  type AlertBannerVariantsProps,
} from "./alert-banner.variants";

const variantIcon: Record<NonNullable<AlertBannerVariantsProps["variant"]>, IconName> = {
  info: "info",
  success: "check-circle",
  warning: "alert-triangle",
  danger: "alert-circle",
};

export interface AlertBannerClassNames {
  icon?: string;
  title?: string;
  description?: string;
  dismiss?: string;
}

export interface AlertBannerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    AlertBannerVariantsProps {
  title?: React.ReactNode;
  /** Suppresses the default per-variant status icon. */
  hideIcon?: boolean;
  classNames?: AlertBannerClassNames;
  /** Rendered after the description — e.g. a "Retry" or "Learn more" link. */
  action?: React.ReactNode;
  /** Shows a dismiss button wired to this handler. Omit to render no close button. */
  onDismiss?: () => void;
  /** aria-label on the dismiss button. @default "Dismiss" (see `configureMessages`) */
  dismissLabel?: string;
}

/**
 * A persistent, page-level status message — no queueing or auto-dismiss
 * (that's `Toast`). No internal state, so it stays a Server Component
 * (CLAUDE.md rule 2); dismissal is fully owned by the consumer via
 * `onDismiss` (they decide whether/how to stop rendering it).
 */
export const AlertBanner = React.forwardRef<HTMLDivElement, AlertBannerProps>(
  (
    {
      variant = "info",
      title,
      hideIcon = false,
      classNames,
      action,
      onDismiss,
      dismissLabel,
      className,
      children,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      data-variant={variant}
      className={cn(alertBannerVariants({ variant }), className)}
      {...props}
    >
      {hideIcon ? null : (
        <Icon
          name={variantIcon[variant ?? "info"]}
          size="sm"
          className={cn(alertBannerIconVariants({ variant }), classNames?.icon)}
        />
      )}
      <div className="flex-1 space-y-1">
        {title ? (
          <p className={cn("font-sans text-sm font-semibold text-foreground", classNames?.title)}>
            {title}
          </p>
        ) : null}
        {children ? (
          <div className={cn("font-sans text-sm text-foreground-muted", classNames?.description)}>
            {children}
          </div>
        ) : null}
        {action}
      </div>
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          aria-label={dismissLabel ?? getMessages().alertBanner.dismiss}
          className={cn(
            "shrink-0 rounded-md p-1 text-foreground-muted outline-none",
            "transition-colors duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)]",
            "hover:bg-surface hover:text-foreground",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
            classNames?.dismiss,
          )}
        >
          <Icon name="close" size="sm" />
        </button>
      ) : null}
    </div>
  ),
);
AlertBanner.displayName = "AlertBanner";
