import { cva, type VariantProps } from "class-variance-authority";

/** Mirrors selectVariants — the trigger is a button that opens the calendar popover. */
export const datePickerTriggerVariants = cva(
  [
    "flex w-full min-w-0 items-center justify-between gap-2 border bg-surface font-sans text-foreground",
    "rounded-md border-border",
    "transition-colors duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)]",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "data-invalid:border-danger data-invalid:focus-visible:ring-danger",
    "data-placeholder:text-foreground-muted",
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

export const datePickerContentVariants = cva([
  "z-[var(--ui-z-dropdown)] w-72 rounded-md border border-border bg-surface p-3 shadow-md",
  "transition-[opacity,transform] duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)] motion-reduce:transition-none",
  "data-[state=open]:opacity-100 data-[state=open]:scale-100",
  "data-[state=closed]:opacity-0 data-[state=closed]:scale-95",
]);

export const datePickerNavButtonVariants = cva([
  "flex size-8 items-center justify-center rounded-md text-foreground-muted outline-none",
  "hover:bg-surface-raised hover:text-foreground",
  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
]);

export const datePickerDayVariants = cva(
  [
    "flex size-9 items-center justify-center rounded-md font-sans text-sm text-foreground outline-none",
    "hover:bg-surface-raised",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    "data-[outside-month]:text-foreground-muted",
    "data-[today]:font-semibold data-[today]:underline data-[today]:underline-offset-4",
    "data-[selected]:bg-primary data-[selected]:text-primary-fg data-[selected]:hover:bg-primary",
    "data-disabled:pointer-events-none data-disabled:text-foreground-muted data-disabled:opacity-40",
  ],
);

export type DatePickerVariantsProps = VariantProps<typeof datePickerTriggerVariants>;
