import { cva, type VariantProps } from "class-variance-authority";

/**
 * No variant axis — a compare bar is one fixed shape. `cva` is still used
 * (rather than a plain string) to keep the same override-friendly recipe
 * every component in this package uses: consumers can build their own
 * element on top of this exact styling via `compareBarVariants()` (layer 2
 * of the override model), same as `badgeVariants` documents.
 */
export const compareBarVariants = cva([
  "fixed inset-x-0 bottom-0 z-[var(--ui-z-sticky)]",
  "flex flex-wrap items-center gap-4 border-t border-border bg-surface px-4 py-3 shadow-lg",
]);

export type CompareBarVariantsProps = VariantProps<typeof compareBarVariants>;
