import { cva, type VariantProps } from "class-variance-authority";

/**
 * `data-invalid` (not `aria-invalid`) drives the error styling per
 * CLAUDE.md rule 6 — state lives on data-* attributes. `aria-invalid` is
 * still set on the element for assistive tech (see input.tsx) but isn't
 * what Tailwind selects on, so the two can't drift out of sync silently.
 */
export const inputVariants = cva(
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

export type InputVariantsProps = VariantProps<typeof inputVariants>;
