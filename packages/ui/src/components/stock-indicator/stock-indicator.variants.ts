import { cva, type VariantProps } from "class-variance-authority";

/** Text colour is intentionally left to `text-foreground` — only the dot carries status colour. */
export const stockIndicatorVariants = cva(["inline-flex items-center gap-1.5 font-sans text-sm text-foreground"], {
  variants: {
    status: {
      "in-stock": "",
      "low-stock": "",
      "out-of-stock": "",
    },
  },
  defaultVariants: {
    status: "in-stock",
  },
});

/** The coloured dot — the one part that actually varies by status, mapped to semantic tokens. */
export const stockIndicatorDotVariants = cva(["size-2 shrink-0 rounded-full"], {
  variants: {
    status: {
      "in-stock": "bg-success",
      "low-stock": "bg-warning",
      "out-of-stock": "bg-danger",
    },
  },
  defaultVariants: {
    status: "in-stock",
  },
});

export type StockIndicatorVariantsProps = VariantProps<typeof stockIndicatorVariants>;
