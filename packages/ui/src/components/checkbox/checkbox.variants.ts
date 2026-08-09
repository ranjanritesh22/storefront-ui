import { cva, type VariantProps } from "class-variance-authority";

/** Wraps the Radix `Root` (the focusable element) plus the optional label/description text. */
export const checkboxVariants = cva(["inline-flex items-start gap-2 font-sans text-foreground"], {
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
 * Styles the Radix `Checkbox.Root` itself — it renders as a `<button
 * role="checkbox">` and is the focusable element, so state reads off its own
 * `data-state`/`data-disabled` attributes rather than a sibling `peer-*`
 * selector (there's no separate native input to peer against once the box
 * itself owns focus).
 */
export const checkboxBoxVariants = cva(
  [
    "flex shrink-0 items-center justify-center border bg-surface text-primary-fg",
    "rounded-sm border-border",
    "transition-colors duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)]",
    "data-[state=checked]:border-primary data-[state=checked]:bg-primary",
    "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-invalid:border-danger data-invalid:focus-visible:ring-danger",
  ],
  {
    variants: {
      size: {
        sm: "mt-0.5 size-4 [&_svg]:size-3",
        md: "mt-0.5 size-5 [&_svg]:size-3.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type CheckboxVariantsProps = VariantProps<typeof checkboxVariants>;
