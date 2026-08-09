"use client";

import * as React from "react";
import { cn } from "../../lib/cn";
import { Button } from "../button/button";
import { useQuantity, type UseQuantityOptions } from "../../hooks/use-quantity";
import {
  quantityStepperVariants,
  type QuantityStepperVariantsProps,
} from "./quantity-stepper.variants";

export interface QuantityStepperClassNames {
  root?: string;
  decrementButton?: string;
  incrementButton?: string;
  input?: string;
}

export interface QuantityStepperProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue">,
    QuantityStepperVariantsProps,
    UseQuantityOptions {
  decrementLabel?: string;
  incrementLabel?: string;
  inputLabel?: string;
  classNames?: QuantityStepperClassNames;
}

export const QuantityStepper = React.forwardRef<HTMLDivElement, QuantityStepperProps>(
  (
    {
      className,
      classNames,
      size,
      defaultValue,
      value,
      min,
      max,
      step,
      onChange,
      disabled = false,
      decrementLabel = "Decrease quantity",
      incrementLabel = "Increase quantity",
      inputLabel = "Quantity",
      ...props
    },
    ref,
  ) => {
    const quantity = useQuantity({ defaultValue, value, min, max, step, onChange, disabled });

    return (
      <div
        ref={ref}
        data-disabled={disabled ? "true" : undefined}
        className={cn(quantityStepperVariants({ size }), classNames?.root, className)}
        {...props}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn(
            "h-full w-8 shrink-0 rounded-none border-0 border-e border-border",
            classNames?.decrementButton,
          )}
          aria-label={decrementLabel}
          disabled={disabled || !quantity.canDecrement}
          onClick={quantity.decrement}
        >
          −
        </Button>
        <input
          type="text"
          inputMode="numeric"
          aria-label={inputLabel}
          value={quantity.inputProps.value}
          onChange={quantity.inputProps.onChange}
          disabled={disabled}
          className={cn(
            "w-10 shrink-0 border-0 bg-transparent text-center font-sans text-sm text-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50",
            classNames?.input,
          )}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn(
            "h-full w-8 shrink-0 rounded-none border-0 border-s border-border",
            classNames?.incrementButton,
          )}
          aria-label={incrementLabel}
          disabled={disabled || !quantity.canIncrement}
          onClick={quantity.increment}
        >
          +
        </Button>
      </div>
    );
  },
);

QuantityStepper.displayName = "QuantityStepper";
