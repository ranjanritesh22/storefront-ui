import { cva, type VariantProps } from "class-variance-authority";

/**
 * `variant` carries no classes of its own here — `AccordionItem` (see
 * facet-group.tsx) already supplies the border that separates groups when
 * several are stacked in a `FacetPanel`. The variant only exists on this cva
 * so the `data-variant` attribute and the public `FacetGroupVariantsProps`
 * type stay consistent with every other component's CVA pattern.
 */
export const facetGroupVariants = cva([], {
  variants: {
    variant: {
      checkbox: "",
      radio: "",
      "color-swatch": "",
      "price-range": "",
      rating: "",
    },
  },
  defaultVariants: {
    variant: "checkbox",
  },
});

/** Layout for the option list — a column for checkbox/radio/rating, a wrapping grid for swatches. */
export const facetGroupOptionsVariants = cva(["w-full"], {
  variants: {
    variant: {
      checkbox: "flex flex-col gap-2.5",
      radio: "flex flex-col gap-2.5",
      "color-swatch": "flex flex-wrap gap-2.5",
      "price-range": "flex flex-col gap-4",
      rating: "flex flex-col gap-2.5",
    },
  },
  defaultVariants: {
    variant: "checkbox",
  },
});

/** A single round swatch toggle in the `color-swatch` variant. */
export const facetGroupSwatchVariants = cva([
  "relative flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-border bg-surface-raised p-0.5",
  "outline-none transition-colors duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)]",
  "hover:border-primary/50",
  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
  "data-[state=checked]:border-primary",
  "disabled:cursor-not-allowed disabled:opacity-50",
]);

export type FacetGroupVariantsProps = VariantProps<typeof facetGroupVariants>;
