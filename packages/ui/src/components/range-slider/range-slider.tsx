"use client";

import * as React from "react";
import { cn } from "../../lib/cn";
import { getMessages } from "../../i18n/messages";
import { useRangeSlider, type UseRangeSliderOptions } from "../../hooks/use-range-slider";
import {
  rangeSliderVariants,
  rangeSliderTrackVariants,
  rangeSliderRangeVariants,
  rangeSliderThumbVariants,
  type RangeSliderVariantsProps,
} from "./range-slider.variants";

export interface RangeSliderClassNames {
  root?: string;
  track?: string;
  range?: string;
  thumb?: string;
  output?: string;
}

export interface RangeSliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange">,
    UseRangeSliderOptions,
    RangeSliderVariantsProps {
  lowerLabel?: string;
  upperLabel?: string;
  /** Formats each thumb's value for the output row below the track, e.g. a currency symbol. */
  formatValue?: (value: number) => string;
  /** Hides the "$999 — $15,999+" text row, keeping just the track. @default false */
  hideOutput?: boolean;
  classNames?: RangeSliderClassNames;
}

const defaultFormatValue = (value: number) => String(value);

/**
 * A dual-thumb range slider built on the headless `useRangeSlider` hook — a
 * price-range facet. Client component (owns drag/state), matching
 * QuantityStepper's split between hook and markup.
 */
export const RangeSlider = React.forwardRef<HTMLDivElement, RangeSliderProps>(
  (
    {
      className,
      classNames,
      size,
      min = 0,
      max = 100,
      step,
      defaultValue,
      value,
      minStepsBetweenThumbs,
      onChange,
      disabled = false,
      lowerLabel,
      upperLabel,
      formatValue = defaultFormatValue,
      hideOutput = false,
      ...props
    },
    ref,
  ) => {
    const t = getMessages();
    const slider = useRangeSlider({
      min,
      max,
      step,
      defaultValue,
      value,
      minStepsBetweenThumbs,
      onChange,
      disabled,
    });
    const [lowerPct, upperPct] = slider.percentages;

    return (
      <div ref={ref} className={cn("flex w-full flex-col gap-3", className)} {...props}>
        <div className={cn(rangeSliderVariants({ size }), classNames?.root)}>
          <div className={cn(rangeSliderTrackVariants({ size }), classNames?.track)} />
          <div
            className={cn(rangeSliderRangeVariants({ size }), classNames?.range)}
            style={{ insetInlineStart: `${lowerPct}%`, insetInlineEnd: `${100 - upperPct}%` }}
          />
          <input
            type="range"
            aria-label={lowerLabel ?? t.rangeSlider.minimum}
            disabled={disabled}
            className={cn("z-10", rangeSliderThumbVariants({ size }), classNames?.thumb)}
            {...slider.lowerInputProps}
          />
          <input
            type="range"
            aria-label={upperLabel ?? t.rangeSlider.maximum}
            disabled={disabled}
            className={cn("z-20", rangeSliderThumbVariants({ size }), classNames?.thumb)}
            {...slider.upperInputProps}
          />
        </div>
        {hideOutput ? null : (
          <div
            className={cn(
              "flex items-center justify-between font-sans text-sm text-foreground",
              classNames?.output,
            )}
          >
            <span>{formatValue(slider.value[0])}</span>
            <span>{formatValue(slider.value[1])}</span>
          </div>
        )}
      </div>
    );
  },
);

RangeSlider.displayName = "RangeSlider";
