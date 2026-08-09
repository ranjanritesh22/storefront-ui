import { cva, type VariantProps } from "class-variance-authority";

/** Controls the image slot's aspect ratio — the one visually variable part of the layout. */
export const productCardVariants = cva(["relative w-full overflow-hidden bg-surface-raised"], {
  variants: {
    aspect: {
      square: "aspect-square",
      portrait: "aspect-[3/4]",
      landscape: "aspect-[4/3]",
    },
  },
  defaultVariants: {
    aspect: "square",
  },
});

export type ProductCardVariantsProps = VariantProps<typeof productCardVariants>;
