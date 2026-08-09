import { cva, type VariantProps } from "class-variance-authority";

/** Size is the only visual variant — colour always comes from `currentColor`, so it inherits text colour / tokens for free. */
export const iconVariants = cva(["inline-block shrink-0"], {
  variants: {
    size: {
      xs: "size-3",
      sm: "size-3.5",
      md: "size-4",
      lg: "size-5",
      xl: "size-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type IconVariantsProps = VariantProps<typeof iconVariants>;
