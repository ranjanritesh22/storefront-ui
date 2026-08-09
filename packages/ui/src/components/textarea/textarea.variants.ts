import { cva, type VariantProps } from "class-variance-authority";

/** Mirrors input.variants.ts sizing/state so Textarea and Input line up in the same form. */
export const textareaVariants = cva(
  [
    "flex w-full min-w-0 resize-y border bg-surface font-sans text-foreground",
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
        sm: "px-2.5 py-1.5 text-sm",
        md: "px-3 py-2 text-sm",
        lg: "px-4 py-2.5 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type TextareaVariantsProps = VariantProps<typeof textareaVariants>;
