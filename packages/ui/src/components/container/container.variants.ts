import { cva, type VariantProps } from "class-variance-authority";

export const containerVariants = cva(["mx-auto w-full px-4 sm:px-6 lg:px-8"], {
  variants: {
    size: {
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      full: "max-w-none",
    },
  },
  defaultVariants: {
    size: "xl",
  },
});

export type ContainerVariantsProps = VariantProps<typeof containerVariants>;
