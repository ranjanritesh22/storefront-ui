import { cva, type VariantProps } from "class-variance-authority";

export const priceVariants = cva(["inline-flex items-baseline gap-1.5 font-sans"], {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-xl font-semibold",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type PriceVariantsProps = VariantProps<typeof priceVariants>;
