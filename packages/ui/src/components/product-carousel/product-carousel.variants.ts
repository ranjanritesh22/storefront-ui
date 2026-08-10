import { cva, type VariantProps } from "class-variance-authority";

/**
 * The scroll-snap track. `scroll-p-4` keeps a snapped-to slide clear of the
 * track's own padding; `gap` is the one visually variable part of the
 * layout, same recipe as `productCardVariants`' `aspect`.
 */
export const productCarouselTrackVariants = cva(
  ["flex snap-x snap-mandatory overflow-x-auto scroll-p-4 pb-2", "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"],
  {
    variants: {
      gap: {
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-6",
      },
    },
    defaultVariants: {
      gap: "md",
    },
  },
);

/** Each slide's width — fixed so `scrollIntoView`-based paging lands predictably. */
export const productCarouselItemVariants = cva(["w-64 shrink-0 snap-start sm:w-72"]);

export type ProductCarouselVariantsProps = VariantProps<typeof productCarouselTrackVariants>;
