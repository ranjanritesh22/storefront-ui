import { cva, type VariantProps } from "class-variance-authority";

export const headerShellVariants = cva([
  "sticky top-0 z-[var(--ui-z-sticky)] w-full border-b border-border bg-surface",
]);

export const headerShellUtilityBarVariants = cva([
  "w-full border-b border-border bg-surface-raised font-sans text-xs text-foreground-muted",
]);

export type HeaderShellVariantsProps = VariantProps<typeof headerShellVariants>;
