import * as React from "react";
import { cn } from "../../lib/cn";
import { ratingVariants, type RatingVariantsProps } from "./rating.variants";

export interface RatingClassNames {
  root?: string;
  star?: string;
  count?: string;
}

export interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children">,
    RatingVariantsProps {
  /** Rating out of `max`, e.g. `4.5`. Fractional stars render partially filled. */
  value: number;
  max?: number;
  /** Review count, e.g. `1234`. Formatted compactly ("1.2k") and wrapped in parens. */
  count?: number;
  locale?: string;
  classNames?: RatingClassNames;
}

const STAR_PATH =
  "M10 1.5l2.59 5.25 5.79.84-4.19 4.09.99 5.77L10 14.77l-5.18 2.68.99-5.77L1.62 7.59l5.79-.84L10 1.5z";

function Star({ fraction, className }: { fraction: number; className?: string }) {
  return (
    <span className={cn("relative inline-block shrink-0", className)}>
      <svg viewBox="0 0 20 20" fill="currentColor" className="text-border">
        <path d={STAR_PATH} />
      </svg>
      <span
        aria-hidden="true"
        className="absolute inset-y-0 start-0 overflow-hidden text-warning"
        style={{ width: `${fraction * 100}%` }}
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="size-full">
          <path d={STAR_PATH} />
        </svg>
      </span>
    </span>
  );
}

/**
 * Read-only star rating, pure presentation (no interaction, no hooks) — stays
 * a Server Component (CLAUDE.md rule 2). Fractional stars fill via a clipped
 * overlay rather than rounding, so 4.5 reads visually as a half star.
 */
export const Rating = React.forwardRef<HTMLSpanElement, RatingProps>(
  ({ className, classNames, size, value, max = 5, count, locale = "en-US", ...props }, ref) => {
    const clamped = Math.min(max, Math.max(0, value));
    const stars = Array.from({ length: max }, (_, index) =>
      Math.min(1, Math.max(0, clamped - index)),
    );
    const formattedCount =
      typeof count === "number"
        ? new Intl.NumberFormat(locale, { notation: "compact" }).format(count)
        : undefined;

    return (
      <span
        ref={ref}
        role="img"
        aria-label={`Rated ${clamped} out of ${max} stars${
          formattedCount ? `, ${count} reviews` : ""
        }`}
        className={cn(ratingVariants({ size }), classNames?.root, className)}
        {...props}
      >
        <span className="flex items-center gap-0.5" aria-hidden="true">
          {stars.map((fraction, index) => (
            <Star key={index} fraction={fraction} className={classNames?.star} />
          ))}
        </span>
        {formattedCount ? (
          <span className={cn("text-foreground-muted", classNames?.count)}>
            ({formattedCount})
          </span>
        ) : null}
      </span>
    );
  },
);

Rating.displayName = "Rating";
