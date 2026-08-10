import { cva, type VariantProps } from "class-variance-authority";

export const errorStateVariants = cva([
  "flex flex-col items-center justify-center gap-3 rounded-lg p-8 text-center",
]);

export const errorStateIconVariants = cva(["text-danger"]);

export type ErrorStateVariantsProps = VariantProps<typeof errorStateVariants>;
