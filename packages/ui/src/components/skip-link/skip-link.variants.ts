import { cva, type VariantProps } from "class-variance-authority";

export const skipLinkVariants = cva([
  "sr-only focus:not-sr-only",
  "focus-visible:fixed focus-visible:start-4 focus-visible:top-4 focus-visible:z-[var(--ui-z-toast)]",
  "focus-visible:rounded-md focus-visible:bg-surface focus-visible:px-4 focus-visible:py-2",
  "focus-visible:text-sm focus-visible:font-medium focus-visible:text-foreground",
  "focus-visible:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
]);

export type SkipLinkVariantsProps = VariantProps<typeof skipLinkVariants>;
