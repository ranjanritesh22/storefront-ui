import { cva, type VariantProps } from "class-variance-authority";

/** Mirrors input.variants.ts sizing; extra end-padding clears the clear/chevron icon cluster. */
export const comboboxInputVariants = cva(
  [
    "flex w-full min-w-0 border bg-surface font-sans text-foreground",
    "rounded-md border-border",
    "placeholder:text-foreground-muted",
    "transition-colors duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)]",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "data-invalid:border-danger data-invalid:focus-visible:ring-danger",
  ],
  {
    variants: {
      size: {
        sm: "h-8 ps-2.5 pe-16 text-sm",
        md: "h-10 ps-3 pe-16 text-sm",
        lg: "h-12 ps-4 pe-16 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

/** Radix sizes the popper content to the anchor's width via this CSS var (same mechanism as Select's trigger-width var). */
export const comboboxContentVariants = cva([
  "relative z-[var(--ui-z-dropdown)] w-[var(--radix-popover-trigger-width)] max-h-72 overflow-auto p-1",
  "rounded-md border border-border bg-surface shadow-md",
  "transition-[opacity,transform] duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)] motion-reduce:transition-none",
  "data-[state=open]:opacity-100 data-[state=open]:scale-100",
  "data-[state=closed]:opacity-0 data-[state=closed]:scale-95",
]);

export const comboboxOptionVariants = cva([
  "relative flex w-full cursor-pointer scroll-my-1 select-none items-center gap-2 rounded-sm px-2 py-1.5",
  "font-sans text-sm text-foreground",
  "data-highlighted:bg-surface-raised data-highlighted:text-foreground",
  "aria-selected:font-medium",
  "data-disabled:pointer-events-none data-disabled:opacity-50",
]);

export type ComboboxVariantsProps = VariantProps<typeof comboboxInputVariants>;
