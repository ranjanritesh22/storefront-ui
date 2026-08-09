import { cva, type VariantProps } from "class-variance-authority";

/** Styles the Radix `Select.Trigger` — mirrors input.variants.ts sizing so Select and Input line up in a filter bar. */
export const selectVariants = cva(
  [
    "flex w-full min-w-0 items-center justify-between gap-2 border bg-surface font-sans text-foreground",
    "rounded-md border-border",
    "transition-colors duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)]",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "data-invalid:border-danger data-invalid:focus-visible:ring-danger",
    "data-[placeholder]:text-foreground-muted",
  ],
  {
    variants: {
      size: {
        sm: "h-8 px-2.5 text-sm",
        md: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

/** Radix sizes the popper content to the trigger's width via this CSS var. */
export const selectContentVariants = cva([
  "relative z-[var(--ui-z-dropdown)] w-[var(--radix-select-trigger-width)] overflow-hidden",
  "rounded-md border border-border bg-surface shadow-md",
  "transition-[opacity,transform] duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)] motion-reduce:transition-none",
  "data-[state=open]:opacity-100 data-[state=open]:scale-100",
  "data-[state=closed]:opacity-0 data-[state=closed]:scale-95",
]);

export const selectItemVariants = cva([
  "relative flex w-full cursor-pointer scroll-my-1 select-none items-center rounded-sm py-1.5 ps-8 pe-2",
  "font-sans text-sm text-foreground outline-none",
  "data-[highlighted]:bg-surface-raised data-[highlighted]:text-foreground",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  "data-[state=checked]:font-medium",
]);

export type SelectVariantsProps = VariantProps<typeof selectVariants>;
