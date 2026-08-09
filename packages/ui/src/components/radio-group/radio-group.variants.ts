import { cva, type VariantProps } from "class-variance-authority";

/** The `RadioGroup.Root` container — a plain flex stack, orientation controlled via `className`. */
export const radioGroupVariants = cva(["flex flex-col gap-2"]);

/** Wraps a single `Radio`'s circle plus its optional label/description text. */
export const radioVariants = cva(["inline-flex items-start gap-2 font-sans text-foreground"], {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * Styles the Radix `RadioGroup.Item` itself — like Checkbox's box, it's the
 * focusable element (`<button role="radio">`), so state reads off its own
 * `data-state`/`data-disabled` attributes.
 */
export const radioBoxVariants = cva(
  [
    "flex shrink-0 items-center justify-center rounded-full border bg-surface text-primary",
    "border-border",
    "transition-colors duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)]",
    "data-[state=checked]:border-primary",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-invalid:border-danger data-invalid:focus-visible:ring-danger",
  ],
  {
    variants: {
      size: {
        sm: "mt-0.5 size-4",
        md: "mt-0.5 size-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const radioIndicatorVariants = cva([
  "flex items-center justify-center after:block after:rounded-full after:bg-current",
  "after:size-2",
]);

export type RadioGroupVariantsProps = VariantProps<typeof radioGroupVariants>;
export type RadioVariantsProps = VariantProps<typeof radioVariants>;
