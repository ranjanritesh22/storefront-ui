import * as React from "react";
import { cn } from "../../lib/cn";
import { getMessages } from "../../i18n/messages";
import { Button, type ButtonProps } from "../button/button";
import { Icon } from "../icon/icon";
import {
  activeFiltersVariants,
  activeFiltersChipVariants,
  activeFiltersRemoveButtonVariants,
  type ActiveFiltersVariantsProps,
} from "./active-filters.variants";

export interface ActiveFilter {
  id: string;
  label: React.ReactNode;
}

export interface ActiveFiltersClassNames {
  root?: string;
  chip?: string;
  chipLabel?: string;
  removeButton?: string;
  clearAllButton?: string;
}

export interface ActiveFiltersSlots {
  /** Swap the "clear all" action. See ARCHITECTURE.md §4, layer 4. */
  ClearAllButton?: React.ComponentType<ButtonProps>;
}

export interface ActiveFiltersProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    ActiveFiltersVariantsProps {
  filters: ActiveFilter[];
  onRemove: (id: string) => void;
  /** Presence of this callback is what shows the "clear all" action — same pattern as `ProductCard`'s wishlist toggle. */
  onClearAll?: () => void;
  clearAllLabel?: string;
  /** aria-label on a chip's remove button. Defaults to `t.activeFilters.remove(label)`, e.g. "Remove Red filter". */
  removeLabel?: (label: string) => string;
  classNames?: ActiveFiltersClassNames;
  slots?: ActiveFiltersSlots;
}

/**
 * A row of removable chips for the filters currently applied to a listing,
 * plus an optional "clear all" action. Pure props-in/callbacks-out — no
 * internal state, so it stays a Server Component (the remove/clear-all
 * buttons work the same way `ProductCard`'s wishlist toggle does: a native
 * element forwarding an `onClick` the consumer supplied from its own client
 * boundary). Renders nothing when `filters` is empty.
 */
export const ActiveFilters = React.forwardRef<HTMLDivElement, ActiveFiltersProps>(
  (
    { className, classNames, slots, filters, onRemove, onClearAll, clearAllLabel, removeLabel, ...props },
    ref,
  ) => {
    const t = getMessages().activeFilters;

    if (filters.length === 0) {
      return null;
    }

    const ClearAllButtonSlot = slots?.ClearAllButton ?? Button;

    return (
      <div
        ref={ref}
        role="list"
        aria-label={t.label}
        className={cn(activeFiltersVariants(), classNames?.root, className)}
        {...props}
      >
        {filters.map((filter) => {
          const plainLabel = typeof filter.label === "string" ? filter.label : String(filter.id);
          return (
            <span
              key={filter.id}
              role="listitem"
              data-state="active"
              className={cn(activeFiltersChipVariants(), classNames?.chip)}
            >
              <span className={cn("truncate", classNames?.chipLabel)}>{filter.label}</span>
              <button
                type="button"
                onClick={() => onRemove(filter.id)}
                aria-label={removeLabel ? removeLabel(plainLabel) : t.remove(plainLabel)}
                className={cn(activeFiltersRemoveButtonVariants(), classNames?.removeButton)}
              >
                <Icon name="close" size="sm" className="size-3" />
              </button>
            </span>
          );
        })}
        {onClearAll ? (
          <ClearAllButtonSlot
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className={cn("shrink-0", classNames?.clearAllButton)}
          >
            {clearAllLabel ?? t.clearAll}
          </ClearAllButtonSlot>
        ) : null}
      </div>
    );
  },
);

ActiveFilters.displayName = "ActiveFilters";
