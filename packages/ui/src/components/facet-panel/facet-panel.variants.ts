import { cva, type VariantProps } from "class-variance-authority";

export const facetPanelVariants = cva(["flex w-full flex-col"]);

export const facetPanelHeaderVariants = cva([
  "flex items-center justify-between gap-2 pb-3",
]);

export const facetPanelSkeletonVariants = cva(["flex w-full flex-col gap-6"]);

export const facetPanelSkeletonGroupVariants = cva([
  "flex flex-col gap-3 border-b border-border pb-4 last:border-b-0 last:pb-0",
]);

export type FacetPanelVariantsProps = VariantProps<typeof facetPanelVariants>;
