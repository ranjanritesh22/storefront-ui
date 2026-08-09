import { cva, type VariantProps } from "class-variance-authority";

export const cardVariants = cva(
  ["rounded-lg border bg-surface text-foreground", "border-border"],
  {
    variants: {
      variant: {
        default: "shadow-none",
        outlined: "shadow-none",
        elevated: "border-transparent shadow-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type CardVariantsProps = VariantProps<typeof cardVariants>;
