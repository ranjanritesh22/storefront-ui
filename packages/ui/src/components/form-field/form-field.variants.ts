import { cva, type VariantProps } from "class-variance-authority";

export const formFieldVariants = cva(["flex flex-col"], {
  variants: {
    gap: {
      sm: "gap-1",
      md: "gap-1.5",
    },
  },
  defaultVariants: {
    gap: "md",
  },
});

export type FormFieldVariantsProps = VariantProps<typeof formFieldVariants>;
