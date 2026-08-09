import { cva, type VariantProps } from "class-variance-authority";

export const quantityStepperVariants = cva(
  ["inline-flex items-stretch rounded-md border border-border bg-surface overflow-hidden"],
  {
    variants: {
      size: {
        sm: "h-8",
        md: "h-10",
        lg: "h-12",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type QuantityStepperVariantsProps = VariantProps<typeof quantityStepperVariants>;
