import { cva, type VariantProps } from "class-variance-authority";

/** The scrollable body wrapping `FacetPanel` inside `DrawerBody`. */
export const mobileFilterDrawerBodyVariants = cva(["flex flex-col"]);

export type MobileFilterDrawerVariantsProps = VariantProps<typeof mobileFilterDrawerBodyVariants>;
