"use client";

import * as React from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon/icon";
import { getMessages } from "../../i18n/messages";
import {
  viewToggleVariants,
  viewToggleButtonVariants,
  type ViewToggleVariantsProps,
} from "./view-toggle.variants";

export type ViewMode = "grid" | "list";

export interface ViewToggleClassNames {
  root?: string;
  button?: string;
  icon?: string;
}

export interface ViewToggleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    ViewToggleVariantsProps {
  value?: ViewMode;
  defaultValue?: ViewMode;
  onValueChange?: (value: ViewMode) => void;
  /** aria-label on the `role="radiogroup"` root. */
  label?: string;
  /** aria-label on the grid button (it's icon-only). */
  gridLabel?: string;
  /** aria-label on the list button (it's icon-only). */
  listLabel?: string;
  disabled?: boolean;
  classNames?: ViewToggleClassNames;
}

const OTHER_MODE: Record<ViewMode, ViewMode> = { grid: "list", list: "grid" };

/**
 * A two-state segmented control for switching a PLP between grid and list
 * view. Hand-rolled `role="radiogroup"` of `role="radio"` buttons with
 * roving tabindex (Radix has no plain segmented-control primitive, and
 * pulling in `@radix-ui/react-radio-group` for exactly two icon-only
 * options would be more machinery than the interaction needs). Necessarily
 * a Client Component (CLAUDE.md rule 2: owns the roving-tabindex focus
 * state).
 */
export const ViewToggle = React.forwardRef<HTMLDivElement, ViewToggleProps>(
  (
    {
      className,
      classNames,
      size,
      value,
      defaultValue = "grid",
      onValueChange,
      label,
      gridLabel,
      listLabel,
      disabled = false,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const t = getMessages();
    const isControlled = value !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = React.useState<ViewMode>(defaultValue);
    const current = isControlled ? (value as ViewMode) : uncontrolledValue;

    const buttonRefs = React.useRef<Partial<Record<ViewMode, HTMLButtonElement | null>>>({});

    function commit(next: ViewMode) {
      if (!isControlled) setUncontrolledValue(next);
      onValueChange?.(next);
      buttonRefs.current[next]?.focus();
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown": {
          event.preventDefault();
          commit(OTHER_MODE[current]);
          break;
        }
        case "ArrowLeft":
        case "ArrowUp": {
          event.preventDefault();
          commit(OTHER_MODE[current]);
          break;
        }
        case "Home": {
          event.preventDefault();
          commit("grid");
          break;
        }
        case "End": {
          event.preventDefault();
          commit("list");
          break;
        }
        default:
          break;
      }
      onKeyDown?.(event);
    };

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label={label ?? t.viewToggle.label}
        aria-disabled={disabled || undefined}
        onKeyDown={handleKeyDown}
        className={cn(viewToggleVariants({ size }), classNames?.root, className)}
        {...props}
      >
        <button
          ref={(node) => {
            buttonRefs.current.grid = node;
          }}
          type="button"
          role="radio"
          aria-checked={current === "grid"}
          aria-label={gridLabel ?? t.viewToggle.gridView}
          data-state={current === "grid" ? "active" : "inactive"}
          tabIndex={current === "grid" ? 0 : -1}
          disabled={disabled}
          onClick={() => commit("grid")}
          className={cn(viewToggleButtonVariants({ size }), classNames?.button)}
        >
          <Icon name="grid" className={classNames?.icon} />
        </button>
        <button
          ref={(node) => {
            buttonRefs.current.list = node;
          }}
          type="button"
          role="radio"
          aria-checked={current === "list"}
          aria-label={listLabel ?? t.viewToggle.listView}
          data-state={current === "list" ? "active" : "inactive"}
          tabIndex={current === "list" ? 0 : -1}
          disabled={disabled}
          onClick={() => commit("list")}
          className={cn(viewToggleButtonVariants({ size }), classNames?.button)}
        >
          <Icon name="list" className={classNames?.icon} />
        </button>
      </div>
    );
  },
);

ViewToggle.displayName = "ViewToggle";
