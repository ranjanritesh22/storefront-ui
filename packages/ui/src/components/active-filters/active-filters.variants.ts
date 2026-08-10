import { cva, type VariantProps } from "class-variance-authority";

export const activeFiltersVariants = cva(["flex flex-wrap items-center gap-2"]);

export const activeFiltersChipVariants = cva([
  "inline-flex max-w-full items-center gap-1.5 rounded-full border border-border bg-surface-raised ps-3 pe-1.5 py-1",
  "font-sans text-sm text-foreground",
]);

export const activeFiltersRemoveButtonVariants = cva([
  "flex shrink-0 items-center justify-center rounded-full p-1 text-foreground-muted",
  "outline-none transition-colors duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)]",
  "hover:bg-border/70 hover:text-foreground",
  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
]);

export type ActiveFiltersVariantsProps = VariantProps<typeof activeFiltersVariants>;
