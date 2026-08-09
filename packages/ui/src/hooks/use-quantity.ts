"use client";

import * as React from "react";

export interface UseQuantityOptions {
  /** Uncontrolled initial value. @default 1 */
  defaultValue?: number;
  /** Controlled value — when provided, the hook mirrors it instead of owning state. */
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
}

export interface UseQuantityResult {
  value: number;
  min: number;
  max: number;
  step: number;
  canDecrement: boolean;
  canIncrement: boolean;
  increment: () => void;
  decrement: () => void;
  setValue: (next: number) => void;
  /** Spreadable onto a native `<input>` for a minimal headless build. */
  inputProps: {
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * Headless quantity state: clamping, step math, and controlled/uncontrolled
 * mirroring, with no rendered markup. `QuantityStepper` is one UI built on
 * top of it; consumers needing different markup can call this directly.
 */
export function useQuantity(options: UseQuantityOptions = {}): UseQuantityResult {
  const {
    defaultValue = 1,
    value: controlledValue,
    min = 1,
    max = Infinity,
    step = 1,
    onChange,
    disabled = false,
  } = options;

  const [uncontrolledValue, setUncontrolledValue] = React.useState(() =>
    clamp(defaultValue, min, max),
  );
  const isControlled = controlledValue !== undefined;
  const value = clamp(isControlled ? controlledValue : uncontrolledValue, min, max);

  const commit = React.useCallback(
    (next: number) => {
      const clamped = clamp(next, min, max);
      if (!isControlled) {
        setUncontrolledValue(clamped);
      }
      onChange?.(clamped);
    },
    [isControlled, max, min, onChange],
  );

  const increment = React.useCallback(() => {
    if (disabled) return;
    commit(value + step);
  }, [commit, disabled, step, value]);

  const decrement = React.useCallback(() => {
    if (disabled) return;
    commit(value - step);
  }, [commit, disabled, step, value]);

  const setValue = React.useCallback(
    (next: number) => {
      if (disabled || Number.isNaN(next)) return;
      commit(next);
    },
    [commit, disabled],
  );

  return {
    value,
    min,
    max,
    step,
    canDecrement: !disabled && value - step >= min,
    canIncrement: !disabled && value + step <= max,
    increment,
    decrement,
    setValue,
    inputProps: {
      value,
      min,
      max,
      step,
      onChange: (event) => setValue(Number(event.target.value)),
    },
  };
}
