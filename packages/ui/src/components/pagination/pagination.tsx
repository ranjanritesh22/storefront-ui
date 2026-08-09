import * as React from "react";
import { cn } from "../../lib/cn";
import { Button } from "../button/button";
import { paginationVariants, type PaginationVariantsProps } from "./pagination.variants";

export type PaginationItemValue = number | "ellipsis";

export interface PaginationClassNames {
  root?: string;
  list?: string;
  item?: string;
  link?: string;
  ellipsis?: string;
  prev?: string;
  next?: string;
}

export interface PaginationLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
  "aria-current"?: "page";
  "data-state"?: "active";
}

export interface PaginationSlots {
  /** Swap the anchor for e.g. `next/link` — see ARCHITECTURE.md §4, layer 4. */
  Link?: React.ComponentType<PaginationLinkProps>;
}

export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange">,
    PaginationVariantsProps {
  /** Current page, 1-indexed. */
  page: number;
  totalPages: number;
  /** Pages kept on either side of the current page before collapsing to an ellipsis. @default 1 */
  siblingCount?: number;
  onPageChange?: (page: number) => void;
  /** When given, pages render as links (`hrefFor(3)` → `"?page=3"`) instead of buttons. */
  hrefFor?: (page: number) => string;
  label?: string;
  prevLabel?: string;
  nextLabel?: string;
  classNames?: PaginationClassNames;
  slots?: PaginationSlots;
}

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

/**
 * Computes the page window with ellipses, e.g. page 1 of 11 with
 * siblingCount 1 → `[1, 2, 3, 4, 5, "ellipsis", 11]`.
 */
export function getPaginationItems(
  page: number,
  totalPages: number,
  siblingCount = 1,
): PaginationItemValue[] {
  const totalNumbers = siblingCount * 2 + 5;
  if (totalPages <= totalNumbers) {
    return range(1, totalPages);
  }

  const leftSibling = Math.max(page - siblingCount, 1);
  const rightSibling = Math.min(page + siblingCount, totalPages);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    return [...range(1, 3 + 2 * siblingCount), "ellipsis", totalPages];
  }
  if (showLeftEllipsis && !showRightEllipsis) {
    return [1, "ellipsis", ...range(totalPages - (2 + 2 * siblingCount), totalPages)];
  }
  return [1, "ellipsis", ...range(leftSibling, rightSibling), "ellipsis", totalPages];
}

function DefaultPaginationLink({ href, className, children, ...rest }: PaginationLinkProps) {
  return (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  );
}

function ChevronIcon({ direction }: { direction: "start" | "end" }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4">
      <path
        d={direction === "start" ? "M12 4l-6 6 6 6" : "M8 4l6 6-6 6"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Data-driven page nav composed of `Button`s (or links, given `hrefFor`) — no
 * internal state, so it stays a Server Component (CLAUDE.md rule 2), same as
 * `ProductCard` composing `Button` for its CTA.
 */
export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      className,
      classNames,
      size,
      page,
      totalPages,
      siblingCount = 1,
      onPageChange,
      hrefFor,
      label = "Pagination",
      prevLabel = "Previous page",
      nextLabel = "Next page",
      slots,
      ...props
    },
    ref,
  ) => {
    const items = getPaginationItems(page, totalPages, siblingCount);
    const LinkSlot = slots?.Link ?? DefaultPaginationLink;

    const renderPageControl = (
      target: number,
      content: React.ReactNode,
      itemLabel: string,
      extraClassName?: string,
    ) => {
      const isActive = target === page;
      const disabled = target < 1 || target > totalPages;

      if (hrefFor && !disabled) {
        return (
          <Button
            asChild
            variant={isActive ? "primary" : "ghost"}
            size="icon"
            className={cn(classNames?.link, extraClassName)}
          >
            <LinkSlot
              href={hrefFor(target)}
              aria-label={itemLabel}
              aria-current={isActive ? "page" : undefined}
              data-state={isActive ? "active" : undefined}
            >
              {content}
            </LinkSlot>
          </Button>
        );
      }

      return (
        <Button
          type="button"
          variant={isActive ? "primary" : "ghost"}
          size="icon"
          disabled={disabled}
          aria-label={itemLabel}
          aria-current={isActive ? "page" : undefined}
          data-state={isActive ? "active" : undefined}
          onClick={() => onPageChange?.(target)}
          className={cn(classNames?.link, extraClassName)}
        >
          {content}
        </Button>
      );
    };

    return (
      <nav ref={ref} aria-label={label} className={cn(classNames?.root, className)} {...props}>
        <ul className={cn(paginationVariants({ size }), classNames?.list)}>
          <li className={classNames?.item}>
            {renderPageControl(page - 1, <ChevronIcon direction="start" />, prevLabel, classNames?.prev)}
          </li>
          {items.map((item, index) =>
            item === "ellipsis" ? (
              <li
                key={`ellipsis-${index}`}
                aria-hidden="true"
                className={cn(
                  "flex size-8 items-center justify-center text-foreground-muted",
                  classNames?.ellipsis,
                )}
              >
                &#8230;
              </li>
            ) : (
              <li key={item} className={classNames?.item}>
                {renderPageControl(item, item, `Page ${item}`)}
              </li>
            ),
          )}
          <li className={classNames?.item}>
            {renderPageControl(page + 1, <ChevronIcon direction="end" />, nextLabel, classNames?.next)}
          </li>
        </ul>
      </nav>
    );
  },
);

Pagination.displayName = "Pagination";
