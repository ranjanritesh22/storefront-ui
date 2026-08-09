import { cva, type VariantProps } from "class-variance-authority";

/** Matches FormField's own inline label styling (form-field.tsx) so a standalone `Label` lines up next to it. */
export const labelVariants = cva([
  "font-sans text-sm font-medium text-foreground",
  "select-none",
  "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
]);

export type LabelVariantsProps = VariantProps<typeof labelVariants>;
