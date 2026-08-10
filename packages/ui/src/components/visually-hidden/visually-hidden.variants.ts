import { cva, type VariantProps } from "class-variance-authority";

export const visuallyHiddenVariants = cva([]);

export type VisuallyHiddenVariantsProps = VariantProps<typeof visuallyHiddenVariants>;
