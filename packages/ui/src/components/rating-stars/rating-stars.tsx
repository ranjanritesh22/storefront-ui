"use client";

import * as React from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon/icon";
import { getMessages } from "../../i18n/messages";
import {
  ratingStarsVariants,
  ratingStarButtonVariants,
  type RatingStarsVariantsProps,
} from "./rating-stars.variants";

export interface RatingStarsClassNames {
  root?: string;
  star?: string;
}

export interface RatingStarsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "children">,
    RatingStarsVariantsProps {
  /**
   * Current (read-only mode) or selected (interactive mode) rating. Always
   * controlled — pass `onValueChange` in interactive mode and feed the
   * result back in, the same pattern as `Select`'s `value`/`onValueChange`.
   * Fractional values render partial stars only in read-only mode.
   */
  value: number;
  max?: number;
  /**
   * `true` renders a static, non-focusable display (fractional fill, same
   * technique as `Rating`, but this component's own implementation — see
   * CLAUDE.md: this is a distinct component from `Rating`, not a
   * replacement for it). `false` (default) renders a keyboard- and
   * mouse-operable star picker for review-submission forms.
   */
  readOnly?: boolean;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
  /** aria-label on the interactive `role="radiogroup"`, or the read-only `role="img"`. */
  label?: string;
  classNames?: RatingStarsClassNames;
}

function StarVisual({ fraction, className }: { fraction: number; className?: string }) {
  return (
    <span className={cn("relative inline-block shrink-0", className)}>
      <Icon name="star" className="text-border" />
      <span
        aria-hidden="true"
        className="absolute inset-y-0 start-0 overflow-hidden text-warning"
        style={{ width: `${fraction * 100}%` }}
      >
        <Icon name="star" className="size-full" />
      </span>
    </span>
  );
}

/**
 * Star rating that supports both a read-only display mode and an
 * interactive input mode (e.g. a review-submission form) — distinct from
 * the display-only `Rating` component used inside `ProductCard`; this
 * component neither modifies nor replaces that usage (CLAUDE.md task scope).
 * Interactive mode is necessarily a Client Component (CLAUDE.md rule 2:
 * owns hover-preview state).
 */
export const RatingStars = React.forwardRef<HTMLDivElement, RatingStarsProps>(
  (
    { className, classNames, size, value, max = 5, readOnly = false, onValueChange, disabled = false, label, onKeyDown, ...props },
    ref,
  ) => {
    const t = getMessages();
    const [hoverValue, setHoverValue] = React.useState<number | null>(null);
    const buttonRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

    if (readOnly) {
      const clamped = Math.min(max, Math.max(0, value));
      const stars = Array.from({ length: max }, (_, index) => Math.min(1, Math.max(0, clamped - index)));

      return (
        <div
          ref={ref}
          role="img"
          aria-label={label ?? t.ratingStars.readOnlyLabel({ value: clamped, max })}
          className={cn(ratingStarsVariants({ size }), classNames?.root, className)}
          {...props}
        >
          {stars.map((fraction, index) => (
            <StarVisual key={index} fraction={fraction} className={classNames?.star} />
          ))}
        </div>
      );
    }

    const displayValue = hoverValue ?? value;

    function commit(next: number) {
      onValueChange?.(Math.min(max, Math.max(1, next)));
    }

    function focusStar(index: number) {
      buttonRefs.current[index]?.focus();
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      switch (event.key) {
        case "ArrowRight":
        case "ArrowUp": {
          event.preventDefault();
          const next = Math.min(max, (value || 0) + 1);
          commit(next);
          focusStar(next - 1);
          break;
        }
        case "ArrowLeft":
        case "ArrowDown": {
          event.preventDefault();
          const next = Math.max(1, value - 1);
          commit(next);
          focusStar(next - 1);
          break;
        }
        case "Home": {
          event.preventDefault();
          commit(1);
          focusStar(0);
          break;
        }
        case "End": {
          event.preventDefault();
          commit(max);
          focusStar(max - 1);
          break;
        }
        default:
          break;
      }
      onKeyDown?.(event);
    };

    const rovingIndex = Math.max(0, Math.min(max - 1, value - 1));

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label={label ?? t.ratingStars.groupLabel}
        aria-disabled={disabled || undefined}
        onKeyDown={disabled ? undefined : handleKeyDown}
        onMouseLeave={() => setHoverValue(null)}
        className={cn(ratingStarsVariants({ size }), classNames?.root, className)}
        {...props}
      >
        {Array.from({ length: max }, (_, index) => {
          const starValue = index + 1;
          const filled = starValue <= displayValue;
          return (
            <button
              key={starValue}
              ref={(node) => {
                buttonRefs.current[index] = node;
              }}
              type="button"
              role="radio"
              aria-checked={starValue === value}
              aria-label={t.ratingStars.starLabel({ star: starValue, max })}
              tabIndex={index === rovingIndex ? 0 : -1}
              disabled={disabled}
              onMouseEnter={() => setHoverValue(starValue)}
              onFocus={() => setHoverValue(starValue)}
              onBlur={() => setHoverValue(null)}
              onClick={() => commit(starValue)}
              className={cn(ratingStarButtonVariants(), classNames?.star)}
            >
              <StarVisual fraction={filled ? 1 : 0} />
            </button>
          );
        })}
      </div>
    );
  },
);

RatingStars.displayName = "RatingStars";
