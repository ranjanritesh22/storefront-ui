import { cva, type VariantProps } from "class-variance-authority";

export const emptyStateVariants = cva([
  "flex flex-col items-center justify-center gap-3 rounded-lg p-8 text-center",
]);

export const emptyStateIconVariants = cva(["text-foreground-muted"]);

export type EmptyStateVariantsProps = VariantProps<typeof emptyStateVariants>;
