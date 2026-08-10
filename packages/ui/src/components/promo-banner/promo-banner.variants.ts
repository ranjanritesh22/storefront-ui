import { cva, type VariantProps } from "class-variance-authority";

/**
 * `inverted` is the one place this component intentionally flips the
 * palette (foreground bg / surface text) — same documented pattern as
 * `tooltipContentVariants` — for a banner that needs to read as a strong
 * marketing moment rather than blend into the surrounding surface.
 */
export const promoBannerVariants = cva(
  [
    "relative isolate flex flex-col items-start justify-center gap-4 overflow-hidden",
    "rounded-lg p-8 sm:p-12",
  ],
  {
    variants: {
      tone: {
        default: "bg-surface-raised text-foreground",
        inverted: "bg-foreground text-surface",
      },
    },
    defaultVariants: {
      tone: "default",
    },
  },
);

export type PromoBannerVariantsProps = VariantProps<typeof promoBannerVariants>;
