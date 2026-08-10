import { cva, type VariantProps } from "class-variance-authority";

/** Controls the width of the image column — the one thing that varies between list densities. */
export const productListItemVariants = cva([], {
  variants: {
    size: {
      sm: "w-20 sm:w-24",
      md: "w-32 sm:w-44",
      lg: "w-40 sm:w-56",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type ProductListItemVariantsProps = VariantProps<typeof productListItemVariants>;
