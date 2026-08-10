import { cva, type VariantProps } from "class-variance-authority";

/**
 * z-index reads --ui-z-popover directly — like Dialog's z-index, this scale
 * isn't aliased into Tailwind's theme namespace (see tokens.css Tier 2 comment).
 * `origin-[--radix-popover-content-transform-origin]` makes the scale-in
 * animation pivot from whichever edge Radix docked the popover against.
 */
export const popoverContentVariants = cva([
  "z-[var(--ui-z-popover)] w-72 rounded-md border border-border bg-surface p-4 text-foreground shadow-md",
  "origin-[var(--radix-popover-content-transform-origin)]",
  "transition-[opacity,transform] duration-[var(--ui-duration-fast)] ease-[var(--ui-ease-standard)] motion-reduce:transition-none",
  "data-[state=open]:opacity-100 data-[state=open]:scale-100",
  "data-[state=closed]:opacity-0 data-[state=closed]:scale-95",
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
]);

export const popoverArrowVariants = cva(["fill-surface"]);

export type PopoverContentVariantsProps = VariantProps<typeof popoverContentVariants>;
