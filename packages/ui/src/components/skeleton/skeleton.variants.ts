import { cva, type VariantProps } from "class-variance-authority";

/**
 * Dimensions (width/height/size) are deliberately left to the consumer's
 * `className` — a skeleton's size always mirrors a specific piece of real
 * content (an avatar, a card image, a line of text), so there's no sensible
 * package-wide default to bake in here (CLAUDE.md rule 1 still holds: reach
 * for Tailwind's spacing-scale utilities — `h-48`, `size-10` — not literal px).
 */
export const skeletonVariants = cva(["animate-pulse bg-surface-raised motion-reduce:animate-none"], {
  variants: {
    shape: {
      text: "h-4 w-full rounded-sm",
      circle: "size-10 rounded-full",
      rect: "h-24 w-full rounded-md",
    },
  },
  defaultVariants: {
    shape: "rect",
  },
});

export type SkeletonVariantsProps = VariantProps<typeof skeletonVariants>;
