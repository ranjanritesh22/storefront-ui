import { cva, type VariantProps } from "class-variance-authority";

/**
 * Styles the wrapper around the visible "Sort by" label + the composed
 * `Select` trigger. `Select`'s own sizing (`selectVariants`) still owns the
 * trigger itself — this only sizes the label text so it lines up with it.
 */
export const sortSelectVariants = cva(["inline-flex items-center gap-2 font-sans text-foreground"], {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type SortSelectVariantsProps = VariantProps<typeof sortSelectVariants>;
