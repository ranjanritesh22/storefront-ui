import { cva, type VariantProps } from "class-variance-authority";

/** Sizes the visible box; the native input stays full-size but visually hidden (sr-only). */
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

export const checkboxBoxVariants = cva(
  [
    "flex shrink-0 items-center justify-center border bg-surface text-primary-fg",
    "rounded-sm border-border",
    "transition-colors duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)]",
    "peer-checked:border-primary peer-checked:bg-primary",
    "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface",
    "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
    "[&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100",
  ],
  {
    variants: {
      size: {
        sm: "mt-0.5 size-4 [&>svg]:size-3",
        md: "mt-0.5 size-5 [&>svg]:size-3.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type CheckboxVariantsProps = VariantProps<typeof checkboxVariants>;
