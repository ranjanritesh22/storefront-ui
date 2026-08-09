import { cva, type VariantProps } from "class-variance-authority";

export const paginationVariants = cva(["flex items-center gap-1 font-sans"], {
  variants: {
    size: {
      sm: "[&_button]:size-8 [&_button]:text-xs",
      md: "[&_button]:size-10 [&_button]:text-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type PaginationVariantsProps = VariantProps<typeof paginationVariants>;
