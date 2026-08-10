import { cva, type VariantProps } from "class-variance-authority";

export const ratingStarsVariants = cva(["inline-flex items-center gap-0.5 font-sans text-foreground"], {
  variants: {
    size: {
      sm: "[&_svg]:size-4",
      md: "[&_svg]:size-5",
      lg: "[&_svg]:size-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

/** A single interactive star button. Read-only mode renders a plain `<span>` instead — see rating-stars.tsx. */
export const ratingStarButtonVariants = cva(
  [
    "relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm outline-none",
    "transition-transform duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)] motion-reduce:transition-none",
    "hover:scale-110",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  ],
);

export type RatingStarsVariantsProps = VariantProps<typeof ratingStarsVariants>;
