import { cva, type VariantProps } from "class-variance-authority";

export const tabsListVariants = cva([
  "inline-flex items-center gap-1 border-b border-border",
]);

export const tabsTriggerVariants = cva([
  "inline-flex items-center justify-center whitespace-nowrap px-3 py-2",
  "border-b-2 border-transparent font-sans text-sm font-medium text-foreground-muted",
  "transition-colors duration-[var(--ui-duration-fast)] ease-[var(--ui-ease-standard)]",
  "hover:text-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  "disabled:pointer-events-none disabled:opacity-50",
  "data-[state=active]:border-primary data-[state=active]:text-foreground",
]);

export const tabsContentVariants = cva([
  "pt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
]);

export type TabsListVariantsProps = VariantProps<typeof tabsListVariants>;
export type TabsTriggerVariantsProps = VariantProps<typeof tabsTriggerVariants>;
export type TabsContentVariantsProps = VariantProps<typeof tabsContentVariants>;
