import { cva, type VariantProps } from "class-variance-authority";

export const alertBannerVariants = cva(
  ["flex items-start gap-3 rounded-md border p-4 font-sans"],
  {
    variants: {
      variant: {
        info: "border-border bg-surface-raised text-foreground",
        success: "border-success/30 bg-success/10 text-foreground",
        warning: "border-warning/30 bg-warning/10 text-foreground",
        danger: "border-danger/30 bg-danger/10 text-foreground",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
);

export const alertBannerIconVariants = cva(["mt-0.5 shrink-0"], {
  variants: {
    variant: {
      info: "text-primary",
      success: "text-success",
      warning: "text-warning",
      danger: "text-danger",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

export type AlertBannerVariantsProps = VariantProps<typeof alertBannerVariants>;
