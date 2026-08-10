"use client";

import * as React from "react";
import { cn } from "../../lib/cn";
import { Select, type SelectProps, type SelectClassNames } from "../select/select";
import { getMessages } from "../../i18n/messages";
import { sortSelectVariants, type SortSelectVariantsProps } from "./sort-select.variants";

export interface SortOption {
  value: string;
  label: string;
}

export interface SortSelectClassNames extends SelectClassNames {
  /** The wrapper around the optional visible label + the `Select` trigger. */
  root?: string;
  /** The visible "Sort by" label text, shown when `showLabel` is true. */
  label?: string;
}

export interface SortSelectProps
  extends Omit<SelectProps, "options" | "classNames">,
    SortSelectVariantsProps {
  /** Flat `{ value, label }` list — a plain-string-label subset of `Select`'s `SelectOption`. */
  options: SortOption[];
  /** Renders a visible label (defaults to "Sort by") before the trigger. @default false */
  showLabel?: boolean;
  /** Overrides the default visible/aria label text. */
  labelText?: string;
  classNames?: SortSelectClassNames;
}

/**
 * Thin, domain-flavored wrapper around `Select` for the PLP/PLP-adjacent
 * "sort by" control — composes `Select` rather than re-wiring Radix Select
 * itself (CLAUDE.md: don't reimplement primitives another component in this
 * package already owns). `"use client"` because it renders `Select`, which
 * owns open/close state.
 */
export const SortSelect = React.forwardRef<HTMLButtonElement, SortSelectProps>(
  (
    {
      className,
      classNames,
      size,
      options,
      placeholder,
      showLabel = false,
      labelText,
      id,
      "aria-label": ariaLabel,
      ...selectProps
    },
    ref,
  ) => {
    const t = getMessages();
    const generatedId = React.useId();
    const controlId = id ?? generatedId;

    const selectOptions = React.useMemo(
      () => options.map((option) => ({ value: option.value, label: option.label })),
      [options],
    );

    return (
      <div className={cn(sortSelectVariants({ size }), classNames?.root)}>
        {showLabel ? (
          <label htmlFor={controlId} className={cn("text-foreground-muted", classNames?.label)}>
            {labelText ?? t.sortSelect.label}
          </label>
        ) : null}
        <Select
          ref={ref}
          id={controlId}
          size={size}
          options={selectOptions}
          placeholder={placeholder ?? t.sortSelect.placeholder}
          aria-label={ariaLabel ?? (showLabel ? undefined : (labelText ?? t.sortSelect.label))}
          classNames={classNames}
          className={className}
          {...selectProps}
        />
      </div>
    );
  },
);

SortSelect.displayName = "SortSelect";
