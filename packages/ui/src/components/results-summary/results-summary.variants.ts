import { cva, type VariantProps } from "class-variance-authority";

export const resultsSummaryVariants = cva(["font-sans text-foreground-muted"], {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type ResultsSummaryVariantsProps = VariantProps<typeof resultsSummaryVariants>;
