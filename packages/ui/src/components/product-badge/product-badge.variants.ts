import { cva, type VariantProps } from "class-variance-authority";

/**
 * Colour comes entirely from the underlying `Badge` (see `defaultVariantForType`
 * in product-badge.tsx) — this file only owns the one thing that's genuinely
 * ProductBadge's own: a typographic emphasis per merchandising `type`, so it
 * doesn't duplicate Badge's colour classes.
 */
export const productBadgeVariants = cva([], {
  variants: {
    type: {
      sale: "uppercase tracking-wide",
      new: "",
      "out-of-stock": "",
      custom: "",
    },
  },
  defaultVariants: {
    type: "custom",
  },
});

export type ProductBadgeVariantsProps = VariantProps<typeof productBadgeVariants>;
