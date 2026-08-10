import { cva, type VariantProps } from "class-variance-authority";

export const footerShellVariants = cva([
  "w-full border-t border-border bg-surface-raised",
]);

export const footerShellColumnHeadingVariants = cva([
  "mb-3 font-sans text-sm font-semibold text-foreground",
]);

export const footerShellBottomBarVariants = cva([
  "flex flex-col items-center justify-between gap-3 border-t border-border py-4",
  "font-sans text-xs text-foreground-muted sm:flex-row",
]);

export type FooterShellVariantsProps = VariantProps<typeof footerShellVariants>;
