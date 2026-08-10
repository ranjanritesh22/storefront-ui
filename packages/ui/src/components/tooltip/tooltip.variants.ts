import { cva, type VariantProps } from "class-variance-authority";

/**
 * Inverted surface (foreground bg / surface text) — the one place this
 * package intentionally flips the palette, since a tooltip bubble needs to
 * read clearly floating over arbitrary page content rather than blend into
 * the surrounding surface like Popover/Dialog do.
 */
export const tooltipContentVariants = cva([
  "z-[var(--ui-z-popover)] max-w-64 rounded-md bg-foreground px-2.5 py-1.5 font-sans text-xs text-surface shadow-md",
  "origin-[var(--radix-tooltip-content-transform-origin)]",
  "transition-[opacity,transform] duration-[var(--ui-duration-fast)] ease-[var(--ui-ease-standard)] motion-reduce:transition-none",
  "data-[state=delayed-open]:opacity-100 data-[state=delayed-open]:scale-100",
  "data-[state=instant-open]:opacity-100 data-[state=instant-open]:scale-100",
  "data-[state=closed]:opacity-0 data-[state=closed]:scale-95",
]);

export const tooltipArrowVariants = cva(["fill-foreground"]);

export type TooltipContentVariantsProps = VariantProps<typeof tooltipContentVariants>;
