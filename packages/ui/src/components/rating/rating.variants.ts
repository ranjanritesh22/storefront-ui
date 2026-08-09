import { cva, type VariantProps } from "class-variance-authority";

export const ratingVariants = cva(["inline-flex items-center gap-1.5 font-sans text-foreground"], {
  variants: {
    size: {
      sm: "[&_svg]:size-3.5 text-xs",
      md: "[&_svg]:size-4 text-sm",
      lg: "[&_svg]:size-5 text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type RatingVariantsProps = VariantProps<typeof ratingVariants>;
