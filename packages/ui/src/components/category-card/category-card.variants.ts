import { cva, type VariantProps } from "class-variance-authority";

/**
 * Controls the image slot's aspect ratio — the one visually variable part of
 * the layout, same recipe as `productCardVariants`. Defaults to `landscape`
 * (category tiles read better wide than square).
 */
export const categoryCardVariants = cva(["relative w-full overflow-hidden bg-surface-raised"], {
  variants: {
    aspect: {
      square: "aspect-square",
      portrait: "aspect-[3/4]",
      landscape: "aspect-[4/3]",
    },
  },
  defaultVariants: {
    aspect: "landscape",
  },
});

export type CategoryCardVariantsProps = VariantProps<typeof categoryCardVariants>;
