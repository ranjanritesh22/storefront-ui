import { cva, type VariantProps } from "class-variance-authority";

/**
 * z-index reads --ui-z-toast directly — like Dialog/Popover's z-index, this
 * scale isn't aliased into Tailwind's theme namespace (see tokens.css Tier 2
 * comment). Docked to the inline-end corner so it flips with `dir="rtl"`.
 */
export const toastViewportVariants = cva([
  "fixed inset-x-4 bottom-4 z-[var(--ui-z-toast)] flex flex-col gap-2 sm:inset-x-auto sm:end-4 sm:w-full sm:max-w-sm",
]);

export const toastVariants = cva(
  [
    "relative flex w-full items-start gap-3 rounded-md border bg-surface p-4 shadow-lg",
    "transition-[opacity,transform] duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)] motion-reduce:transition-none",
    "data-[state=open]:opacity-100 data-[state=open]:translate-x-0",
    "data-[state=closed]:opacity-0 data-[state=closed]:translate-x-4 rtl:data-[state=closed]:-translate-x-4",
  ],
  {
    variants: {
      variant: {
        default: "border-border",
        info: "border-border",
        success: "border-success/30",
        warning: "border-warning/30",
        danger: "border-danger/30",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export const toastIconVariants = cva(["mt-0.5 shrink-0"], {
  variants: {
    variant: {
      default: "text-foreground-muted",
      info: "text-primary",
      success: "text-success",
      warning: "text-warning",
      danger: "text-danger",
    },
  },
  defaultVariants: { variant: "default" },
});

export type ToastVariantsProps = VariantProps<typeof toastVariants>;
