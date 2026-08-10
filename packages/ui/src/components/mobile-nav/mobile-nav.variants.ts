import { cva, type VariantProps } from "class-variance-authority";

export const mobileNavTriggerVariants = cva([
  "flex size-10 items-center justify-center rounded-md text-foreground",
  "transition-colors duration-[var(--ui-duration-fast)] ease-[var(--ui-ease-standard)]",
  "hover:bg-surface-raised",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
]);

export const mobileNavBackVariants = cva([
  "flex items-center gap-2 font-sans text-sm font-medium text-foreground",
  "transition-colors duration-[var(--ui-duration-fast)] ease-[var(--ui-ease-standard)]",
  "hover:text-primary",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
]);

export const mobileNavItemVariants = cva([
  "flex w-full items-center justify-between gap-2 rounded-md px-3 py-2.5",
  "font-sans text-sm font-medium text-foreground text-start",
  "transition-colors duration-[var(--ui-duration-fast)] ease-[var(--ui-ease-standard)]",
  "hover:bg-surface-raised",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
]);

export type MobileNavVariantsProps = VariantProps<typeof mobileNavTriggerVariants>;
