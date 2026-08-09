"use client";

import * as React from "react";

export interface UseRangeSliderOptions {
  min?: number;
  max?: number;
  step?: number;
  /** Uncontrolled initial value. @default [min, max] */
  defaultValue?: [number, number];
  /** Controlled value — when provided, the hook mirrors it instead of owning state. */
  value?: [number, number];
  /** Minimum gap (in steps) enforced between the two thumbs. @default 0 */
  minStepsBetweenThumbs?: number;
  onChange?: (value: [number, number]) => void;
  disabled?: boolean;
}

export interface UseRangeSliderResult {
  value: [number, number];
  min: number;
  max: number;
  step: number;
  /** Thumb positions as percentages of the track, for absolute-positioning the fill/thumbs. */
  percentages: [number, number];
  setLower: (next: number) => void;
  setUpper: (next: number) => void;
  lowerInputProps: {
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  upperInputProps: {
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

function toPercent(value: number, min: number, max: number): number {
  return max === min ? 0 : ((value - min) / (max - min)) * 100;
}

/**
 * Headless dual-thumb range state: clamping (each thumb is bounded by the
 * other, minus `minStepsBetweenThumbs`), percentage math for track
 * positioning, and controlled/uncontrolled mirroring — same shape as
 * `useQuantity`. `RangeSlider` is one UI built on top of it.
 */
export function useRangeSlider(options: UseRangeSliderOptions = {}): UseRangeSliderResult {
  const {
    min = 0,
    max = 100,
    step = 1,
    defaultValue,
    value: controlledValue,
    minStepsBetweenThumbs = 0,
    onChange,
    disabled = false,
  } = options;

  const gap = minStepsBetweenThumbs * step;

  const [uncontrolledValue, setUncontrolledValue] = React.useState<[number, number]>(
    () => defaultValue ?? [min, max],
  );
  const isControlled = controlledValue !== undefined;
  const rawValue = isControlled ? controlledValue : uncontrolledValue;
  const value: [number, number] = [
    clamp(rawValue[0], min, max - gap),
    clamp(rawValue[1], min + gap, max),
  ];

  const commit = React.useCallback(
    (next: [number, number]) => {
      if (!isControlled) {
        setUncontrolledValue(next);
      }
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const setLower = React.useCallback(
    (next: number) => {
      if (disabled || Number.isNaN(next)) return;
      const clamped = clamp(next, min, value[1] - gap);
      commit([clamped, value[1]]);
    },
    [commit, disabled, gap, min, value],
  );

  const setUpper = React.useCallback(
    (next: number) => {
      if (disabled || Number.isNaN(next)) return;
      const clamped = clamp(next, value[0] + gap, max);
      commit([value[0], clamped]);
    },
    [commit, disabled, gap, max, value],
  );

  return {
    value,
    min,
    max,
    step,
    percentages: [toPercent(value[0], min, max), toPercent(value[1], min, max)],
    setLower,
    setUpper,
    lowerInputProps: {
      value: value[0],
      min,
      max,
      step,
      onChange: (event) => setLower(Number(event.target.value)),
    },
    upperInputProps: {
      value: value[1],
      min,
      max,
      step,
      onChange: (event) => setUpper(Number(event.target.value)),
    },
  };
}
