import { cva, type VariantProps } from "class-variance-authority";

export const breadcrumbVariants = cva(
  ["flex flex-wrap items-center gap-1.5 font-sans text-foreground-muted"],
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type BreadcrumbVariantsProps = VariantProps<typeof breadcrumbVariants>;
