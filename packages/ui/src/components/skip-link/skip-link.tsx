import * as React from "react";
import { cn } from "../../lib/cn";
import { getMessages } from "../../i18n/messages";
import { skipLinkVariants } from "./skip-link.variants";

export interface SkipLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

/**
 * The first focusable element on a page — invisible until it receives
 * keyboard focus, then jumps straight to `href` (typically `#main-content`
 * on the element `HeaderShell`'s consumer renders `<main id="main-content">`
 * as). No internal state, so it stays a Server Component.
 */
export const SkipLink = React.forwardRef<HTMLAnchorElement, SkipLinkProps>(
  ({ className, href = "#main-content", children, ...props }, ref) => (
    <a
      ref={ref}
      href={href}
      className={cn(skipLinkVariants(), className)}
      {...props}
    >
      {children ?? getMessages().skipLink.label}
    </a>
  ),
);

SkipLink.displayName = "SkipLink";
