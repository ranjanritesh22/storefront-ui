import { cva, type VariantProps } from "class-variance-authority";

/** Mirrors combobox.variants.ts's input sizing; extra start-padding clears the leading search icon. */
export const searchBoxInputVariants = cva(
  [
    "flex w-full min-w-0 border bg-surface font-sans text-foreground",
    "rounded-md border-border",
    "placeholder:text-foreground-muted",
    "transition-colors duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)]",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      size: {
        sm: "h-8 ps-8 pe-8 text-sm",
        md: "h-10 ps-9 pe-9 text-sm",
        lg: "h-12 ps-10 pe-10 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

/** Radix sizes the popper content to the anchor's width via this CSS var — same mechanism as Combobox. */
export const searchBoxContentVariants = cva([
  "relative z-[var(--ui-z-dropdown)] w-[var(--radix-popover-trigger-width)] max-h-96 overflow-auto p-1",
  "rounded-md border border-border bg-surface shadow-md",
  "transition-[opacity,transform] duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)] motion-reduce:transition-none",
  "data-[state=open]:opacity-100 data-[state=open]:scale-100",
  "data-[state=closed]:opacity-0 data-[state=closed]:scale-95",
]);

export const searchBoxOptionVariants = cva([
  "relative flex w-full cursor-pointer scroll-my-1 select-none items-center gap-2 rounded-sm px-2 py-1.5",
  "font-sans text-sm text-foreground",
  "data-highlighted:bg-surface-raised data-highlighted:text-foreground",
]);

export const searchBoxRecentItemVariants = cva([
  "group/recent relative flex w-full items-center gap-1 rounded-sm",
  "data-highlighted:bg-surface-raised",
]);

export type SearchBoxVariantsProps = VariantProps<typeof searchBoxInputVariants>;
