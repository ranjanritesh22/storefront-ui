"use client";

import * as React from "react";
import { Slot, Slottable } from "../../lib/slot";
import { cn } from "../../lib/cn";
import { buttonVariants, type ButtonVariantsProps } from "./button.variants";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantsProps {
  /** Render as the single child element (e.g. `next/link`) instead of a `<button>`. */
  asChild?: boolean;
  /** Shows a spinner, sets `data-loading`/`aria-busy`, and blocks interaction. */
  loading?: boolean;
}

function ButtonSpinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-4 shrink-0 motion-safe:animate-spin", className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
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
        {loading ? <ButtonSpinner /> : null}
        {asChild ? <Slottable>{children}</Slottable> : children}
      </Comp>
    );
  },
);

Button.displayName = "Button";
