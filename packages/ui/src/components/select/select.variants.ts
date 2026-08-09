import { cva, type VariantProps } from "class-variance-authority";

/** Mirrors input.variants.ts sizing so Select and Input line up in a filter bar. */
export const selectVariants = cva(
  [
    "flex w-full min-w-0 appearance-none border bg-surface font-sans text-foreground",
    "rounded-md border-border",
    "transition-colors duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)]",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "data-invalid:border-danger data-invalid:focus-visible:ring-danger",
  ],
  {
    variants: {
      size: {
        sm: "h-8 ps-2.5 pe-8 text-sm",
        md: "h-10 ps-3 pe-9 text-sm",
        lg: "h-12 ps-4 pe-10 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type SelectVariantsProps = VariantProps<typeof selectVariants>;
