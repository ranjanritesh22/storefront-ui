import { cva, type VariantProps } from "class-variance-authority";

/** Color is the only variant Spinner adds on top of Icon's own size scale — currentColor by default. */
export const spinnerVariants = cva([], {
  variants: {
    tone: {
      current: "text-current",
      primary: "text-primary",
      muted: "text-foreground-muted",
    },
  },
  defaultVariants: {
    tone: "current",
  },
});

export type SpinnerVariantsProps = VariantProps<typeof spinnerVariants>;
