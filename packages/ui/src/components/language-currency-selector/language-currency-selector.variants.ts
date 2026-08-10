import { cva, type VariantProps } from "class-variance-authority";

export const languageCurrencySelectorTriggerVariants = cva([
  "flex items-center gap-1.5 rounded-md px-2 py-1.5",
  "font-sans text-sm font-medium text-foreground",
  "transition-colors duration-[var(--ui-duration-fast)] ease-[var(--ui-ease-standard)]",
  "hover:bg-surface-raised",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  "data-[state=open]:[&_svg:last-child]:rotate-180",
  "[&_svg:last-child]:transition-transform [&_svg:last-child]:duration-[var(--ui-duration-base)]",
]);

export const languageCurrencySelectorContentVariants = cva([
  "flex w-64 flex-col gap-4 rounded-md border border-border bg-surface p-4 shadow-lg",
]);

export type LanguageCurrencySelectorVariantsProps = VariantProps<
  typeof languageCurrencySelectorTriggerVariants
>;
