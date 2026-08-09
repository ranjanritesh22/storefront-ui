import * as React from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon/icon";
import { getMessages } from "../../i18n/messages";
import { breadcrumbVariants, type BreadcrumbVariantsProps } from "./breadcrumb.variants";

export interface BreadcrumbItem {
  label: React.ReactNode;
  /** Omit on the last item to render it as the (non-linked) current page. */
  href?: string;
}

export interface BreadcrumbClassNames {
  root?: string;
  list?: string;
  item?: string;
  link?: string;
  current?: string;
  separator?: string;
}

export interface BreadcrumbLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export interface BreadcrumbSlots {
  /** Swap the anchor for e.g. `next/link` — see ARCHITECTURE.md §4, layer 4. */
  Link?: React.ComponentType<BreadcrumbLinkProps>;
}

export interface BreadcrumbProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children">,
    BreadcrumbVariantsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  label?: string;
  classNames?: BreadcrumbClassNames;
  slots?: BreadcrumbSlots;
}

function DefaultBreadcrumbLink({ href, className, children }: BreadcrumbLinkProps) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

function DefaultSeparator() {
  return <Icon name="chevron-right" size="sm" />;
}

/**
 * Data-driven — no internal state, so it stays a Server Component (CLAUDE.md
 * rule 2). The last item with no `href` renders as the current page.
 */
export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, classNames, size, items, separator, label, slots, ...props }, ref) => {
    const LinkSlot = slots?.Link ?? DefaultBreadcrumbLink;

    return (
      <nav
        ref={ref}
        aria-label={label ?? getMessages().breadcrumb.nav}
        className={cn(classNames?.root, className)}
        {...props}
      >
        <ol className={cn(breadcrumbVariants({ size }), classNames?.list)}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isCurrent = isLast || !item.href;

            return (
              <li key={index} className={cn("flex items-center gap-1.5", classNames?.item)}>
                {index > 0 ? (
                  <span aria-hidden="true" className={cn("text-foreground-muted", classNames?.separator)}>
                    {separator ?? <DefaultSeparator />}
                  </span>
                ) : null}
                {isCurrent ? (
                  <span
                    aria-current="page"
                    className={cn("font-medium text-foreground", classNames?.current)}
                  >
                    {item.label}
                  </span>
                ) : (
                  <LinkSlot
                    href={item.href as string}
                    className={cn("hover:text-foreground hover:underline", classNames?.link)}
                  >
                    {item.label}
                  </LinkSlot>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);

Breadcrumb.displayName = "Breadcrumb";
