import { cva, type VariantProps } from "class-variance-authority";

/** Base layout for the root wrapper — column-count/gap variance is delegated entirely to `Grid`. */
export const productGridVariants = cva(["w-full"]);

export type ProductGridVariantsProps = VariantProps<typeof productGridVariants>;
