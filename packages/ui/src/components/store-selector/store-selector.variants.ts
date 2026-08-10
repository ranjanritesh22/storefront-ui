import { cva, type VariantProps } from "class-variance-authority";

export const storeSelectorTriggerVariants = cva([
  "flex items-center gap-1.5 rounded-md px-2 py-1.5",
  "font-sans text-sm font-medium text-foreground",
  "transition-colors duration-[var(--ui-duration-fast)] ease-[var(--ui-ease-standard)]",
  "hover:bg-surface-raised",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  "data-[state=open]:[&_svg:last-child]:rotate-180",
  "[&_svg:last-child]:transition-transform [&_svg:last-child]:duration-[var(--ui-duration-base)]",
]);

export const storeSelectorContentVariants = cva([
  "flex w-80 max-h-96 flex-col gap-1 overflow-y-auto rounded-md border border-border bg-surface p-2 shadow-lg",
]);

export type StoreSelectorVariantsProps = VariantProps<typeof storeSelectorTriggerVariants>;
