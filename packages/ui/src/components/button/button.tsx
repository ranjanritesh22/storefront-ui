"use client";

import * as React from "react";
import { Slot, Slottable } from "../../lib/slot";
import { cn } from "../../lib/cn";
import { Icon } from "../icon/icon";
import { buttonVariants, type ButtonVariantsProps } from "./button.variants";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantsProps {
  /** Render as the single child element (e.g. `next/link`) instead of a `<button>`. */
  asChild?: boolean;
  /** Shows a spinner, sets `data-loading`/`aria-busy`, and blocks interaction. */
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      disabled = false,
      type = "button",
      onClick,
      tabIndex,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;
    const Comp = asChild ? Slot : "button";

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      onClick?.(event);
    };

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type}
        disabled={asChild ? undefined : isDisabled}
        aria-disabled={isDisabled || undefined}
        aria-busy={loading}
        data-loading={loading ? "true" : undefined}
        tabIndex={asChild && isDisabled ? -1 : tabIndex}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        onClick={handleClick}
        {...props}
      >
        {loading ? <Icon name="spinner" /> : null}
        {asChild ? <Slottable>{children}</Slottable> : children}
      </Comp>
    );
  },
);

Button.displayName = "Button";
